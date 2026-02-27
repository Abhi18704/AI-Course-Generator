"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  return (
    <section className="relative bg-linear-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Blur Decoration */}
      <div className="absolute w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      <div className="relative w-full max-w-6xl px-6 py-20 text-center">

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            AI-Powered Course Generation
          </span>
          <br />
          <span className="text-gray-900">
            Build Personalized Learning
            <br />
            Paths in Seconds
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Generate structured, AI-crafted courses tailored to your goals.
          Instantly create chapters, explanations, examples, and video-guided
          learning paths — all powered by intelligent automation.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started 🚀
          </button>

          <button
            onClick={() => router.push("dashboard/explore")}
            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Explore Courses
          </button>

        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600">
              Smart AI Curriculum
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Automatically structured chapters with detailed explanations,
              code examples, and real-world use cases.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600">
              Personalized Learning
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Tailored course paths based on skill level, topic, and
              professional goals.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600">
              Interactive Experience
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Integrated video lessons, structured explanations, and guided
              progression.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
