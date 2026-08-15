"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: string;
  top: string;
  backgroundColor: string;
  animationDelay: string;
  animationDuration: string;
};

export default function ModernLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // Generated after mount: randomising during render makes the server and
  // client markup disagree, which React reports as a hydration mismatch.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#f97316", "#eab308", "#3b82f6"];
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 10) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-200/10 via-yellow-500/30 to-black-500/20 backdrop-blur-sm transition-opacity duration-500 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-yellow-500 to-black-500 animate-spin-reverse"></div>
            <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                R
              </span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
            Welcome.... 🙏
          </h2>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress Percentage */}
          <p className="text-sm text-muted-foreground font-mono">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float-particle"
              style={particle}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
