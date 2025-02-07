import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user);

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    user.forgotPasswordToken = undefined;
    user.ForgotPasswordTokenExpiry = undefined;
    await user.save();

    console.log(user);
    return NextResponse.json({
      message: "user found",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
