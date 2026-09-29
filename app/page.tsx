"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Workspace } from "@/components/Workspace";
import { RangoliStrip } from "@/components/RangoliStrip";
import { Footer } from "@/components/Footer";

export default function Home() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#F8F4EC] text-[#141414] overflow-x-hidden">
      {/* Background Architectural Drafting Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-grid-pattern z-0" />

      {/* Floating Pill Top Navbar */}
      <Navbar onRoastNow={scrollToWorkspace} />

      {/* Main Content Area */}
      <main className="flex-grow z-10">
        <Hero />
        <div ref={workspaceRef}>
          <Workspace />
        </div>
        <RangoliStrip />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
