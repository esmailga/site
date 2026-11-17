import { useEffect, useState } from "react";

type Props = {
  text: string;
  // Milliseconds per character.
  speed?: number;
  // Milliseconds before typing starts.
  delay?: number;
  className?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types `text` out one character at a time. The full text sits invisibly underneath
// so the block keeps its final size and the layout doesn't shift while typing.
export const TypewriterText = ({ text, speed = 40, delay = 800, className = "" }: Props) => {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c + 1 >= text.length && interval) clearInterval(interval);
          return Math.min(c + 1, text.length);
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [done, text, speed, delay]);

  return (
    <p className={`grid ${className}`} aria-label={text}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {text.slice(0, count)}
        {!done && (
          <span className="inline-block w-[2px] h-[1em] -mb-[0.15em] ml-0.5 bg-[var(--accent)]" />
        )}
      </span>
    </p>
  );
};
