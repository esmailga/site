import { useEffect, useMemo, useState } from "react";

type Tone = "strong" | "accent";

// A typing script: type some text (optionally emphasised), pause, or erase characters.
export type Step = { type: string; tone?: Tone } | { pause: number } | { erase: number };

type Props = {
  script: Step[];
  // Milliseconds before typing starts.
  delay?: number;
  className?: string;
};

type Char = { ch: string; tone?: Tone };
type Action = { wait: number; add?: Char; erase?: true };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Small seeded random, so the rhythm is the same on every render.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

// Turns the script into one action per keystroke, with a human rhythm: uneven key timing,
// short pauses after commas and longer ones at the end of sentences and lines.
const toActions = (script: Step[]): Action[] => {
  const rand = seeded(7);
  const actions: Action[] = [];
  let carry = 0; // extra wait added to the next keystroke
  for (const step of script) {
    if ("pause" in step) carry += step.pause;
    else if ("erase" in step) {
      for (let i = 0; i < step.erase; i++) {
        actions.push({ wait: carry + 30 + rand() * 20, erase: true });
        carry = 0;
      }
    } else {
      for (const ch of step.type) {
        actions.push({ wait: carry + 28 + rand() * 42, add: { ch, tone: step.tone } });
        carry = ch === "," ? 170 : ch === "." ? 380 : ch === "\n" ? 260 : 0;
      }
    }
  }
  return actions;
};

// The text left once the whole script has run.
const finalChars = (actions: Action[]) =>
  actions.reduce<Char[]>((out, a) => (a.erase ? out.slice(0, -1) : [...out, a.add!]), []);

// Groups neighbouring characters with the same tone so each run renders as one span.
const Runs = ({ chars }: { chars: Char[] }) => {
  const runs: Char[] = [];
  for (const c of chars) {
    const last = runs[runs.length - 1];
    if (last && last.tone === c.tone) last.ch += c.ch;
    else runs.push({ ...c });
  }
  return (
    <>
      {runs.map((r, i) =>
        r.tone ? (
          <span key={i} className={r.tone === "accent" ? "text-[var(--accent)] font-semibold" : "text-[var(--fg)] font-semibold"}>
            {r.ch}
          </span>
        ) : (
          r.ch
        ),
      )}
    </>
  );
};

// Types a script out like a person would. The final text sits invisibly underneath so the block
// keeps its size and the layout doesn't shift while typing.
export const TypewriterText = ({ script, delay = 800, className = "" }: Props) => {
  const actions = useMemo(() => toActions(script), [script]);
  const final = useMemo(() => finalChars(actions), [actions]);
  const [step, setStep] = useState(() => (prefersReducedMotion() ? actions.length : 0));
  const done = step >= actions.length;
  // The caret holds still while keys are being pressed and blinks while waiting for the next one.
  const typing = !done && step > 0 && actions[step].wait < 120;

  const shown = useMemo(() => finalChars(actions.slice(0, step)), [actions, step]);

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setStep((s) => s + 1), (step === 0 ? delay : 0) + actions[step].wait);
    return () => clearTimeout(timer);
  }, [step, done, actions, delay]);

  return (
    <p className={`grid ${className}`} aria-label={final.map((c) => c.ch).join("")}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        <Runs chars={final} />
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <Runs chars={shown} />
        {!done && (
          <span
            key={typing ? "typing" : "idle"}
            className={`inline-block w-[2px] h-[1em] -mb-[0.15em] ml-0.5 bg-[var(--accent)] ${typing ? "" : "animate-caret"}`}
          />
        )}
      </span>
    </p>
  );
};
