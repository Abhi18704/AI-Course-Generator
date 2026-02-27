"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={48} 
            height={48} 
          />
          <span className="font-bold text-lg tracking-tight text-gray-900">
            AI Course Generator
          </span>
        </div>

        {/* Nav (optional future links) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <span className="hover:text-indigo-600 cursor-pointer">Features</span>
          <span className="hover:text-indigo-600 cursor-pointer">Explore</span>
          <span className="hover:text-indigo-600 cursor-pointer">Pricing</span>
        </nav>

        {/* CTA */}
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition cursor-pointer"
        >
          Get Started
        </Button>

      </div>
    </header>
  );
}

export default Header;
