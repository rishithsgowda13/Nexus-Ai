"use client";
import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-8 text-[10px] text-accent font-black tracking-[0.5em] uppercase animate-pulse">Initializing Neural Link...</p>
    </div>
  );
}
