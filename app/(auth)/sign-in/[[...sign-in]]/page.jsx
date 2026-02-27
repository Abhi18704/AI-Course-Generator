import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left branding section */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to AI Course Generator
        </h1>
        <p className="text-lg text-indigo-100">
          Build smarter learning paths powered by AI.
        </p>
      </div>

      {/* Right auth section */}
      <div className="flex items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-white",
                card: "shadow-none",
              },
            }}
          />

        </div>
      </div>
    </div>
  );
}
