"use client";

import { useEffect, useState } from "react";

type TypedProps = {
  lines: string[];
  speed?: number;
  delayBetween?: number;
  className?: string;
  loop?: boolean;
};

export default function Typed({
  lines,
  speed = 30,
  delayBetween = 900,
  className,
  loop = true,
}: TypedProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">(
    "typing",
  );

  useEffect(() => {
    const target = lines[lineIndex] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < target.length) {
        timer = setTimeout(() => {
          setText(target.slice(0, text.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setPhase("erasing"), delayBetween);
      }
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(target.slice(0, text.length - 1));
        }, Math.max(12, speed / 2));
      } else {
        const isLast = lineIndex === lines.length - 1;
        if (!loop && isLast) return;
        timer = setTimeout(() => {
          setPhase("typing");
          setLineIndex((i) => (i + 1) % lines.length);
        }, 50);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, lineIndex, lines, speed, delayBetween, loop]);

  return (
    <span className={className} aria-label={lines[lineIndex]}>
      <span aria-hidden="true">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}
