"use client";

import React, { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 🏆",
  "Bhau, roast tayyar ho raha hai… 🌶️",
  "Panchavati Express se bhi late hai tumhara code… 🚂",
  "Evaluating computational complexity and architectural purity… 🧠",
  "Misal Pav me extra rassa add kar rahe hain… 🔥",
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[380px]">
      {/* Tilted Outlined Square / Diamond Loader */}
      <div className="relative w-16 h-16 mb-6">
        <div className="w-14 h-14 rounded-xl border-3 border-[#141414] bg-[#EDB13E] shadow-[4px_4px_0px_#141414] rotate-12 animate-pulse flex items-center justify-center">
          <span className="font-mono text-xl font-black text-[#141414] animate-spin">
            /
          </span>
        </div>
      </div>

      <h3 className="font-mono text-sm font-black uppercase tracking-wider text-[#141414] mb-2 animate-pulse">
        Analyzing Code // Bhau Thoda Ruk...
      </h3>

      <div className="h-8 flex items-center justify-center">
        <p className="text-xs text-[#504535] font-medium transition-all duration-300">
          {LOADING_MESSAGES[msgIndex]}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1.5 opacity-60">
        <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-bounce"></span>
        <span className="w-2 h-2 rounded-full bg-[#4285FA] animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 rounded-full bg-[#F9AB00] animate-bounce [animation-delay:0.4s]"></span>
        <span className="w-2 h-2 rounded-full bg-[#34A853] animate-bounce [animation-delay:0.6s]"></span>
      </div>
    </div>
  );
}
