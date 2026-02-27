import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-md rounded-2xl border-none shadow-xl">
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">

          {/* Animation */}
          <div className="mb-6">
            <Image
              src="/rocket.gif"
              width={120}
              height={120}
              alt="AI generating course"
              priority
            />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900">
            Generating Your Course
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Our AI is creating a personalized course structure for you.
            This may take a few moments.
          </p>

          {/* Progress hint */}
          <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>Analyzing content & building lessons</span>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
