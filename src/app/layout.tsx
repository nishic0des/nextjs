import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css"; // Ensure global styles are included

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        <Toaster />
        <main className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
