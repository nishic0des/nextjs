export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl">
        Profile Page{" "}
        <span className="p-2 rounded bg-gray-600 text-white text-2xl">
          {params.id}
        </span>
      </p>
    </div>
  );
}
