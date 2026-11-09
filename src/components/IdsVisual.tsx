import { motion, useReducedMotion } from "motion/react";
import { Bug, Cctv, Check, Lightbulb, ShieldCheck, Speaker, Thermometer, X, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// Illustrations for the IoT Intrusion Detection project, shown as cards instead of device screenshots.

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{children}</p>
);

const SizeBar = ({ label, value, width, highlight }: { label: string; value: string; width: string; highlight?: boolean }) => (
  <div>
    <div className="flex justify-between text-[11px] md:text-xs font-bold uppercase tracking-wide mb-1.5 md:mb-2">
      <span className={highlight ? "text-[var(--accent)]" : "text-[var(--muted)]"}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
    <div className="h-2.5 md:h-3 rounded-full bg-[var(--border)] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full rounded-full ${highlight ? "bg-[var(--accent)] min-w-1.5" : "bg-[var(--muted)]"}`}
      />
    </div>
  </div>
);

const SizeBars = () => (
  <div className="space-y-3 md:space-y-4">
    <SizeBar label="This detector" value="0.1 MB" width="0.13%" highlight />
    <SizeBar label="Typical model" value="77 MB" width="100%" />
  </div>
);

/* ---------- How it works: traffic flowing through the detector ---------- */

// Both paths reach the detector about halfway along, so the colour change happens at keyTime 0.5.
const NORMAL_PATH = "M10 100 L350 100";
// The dashed guide stops at the flagged box's edge; flagged dots carry on into the box.
const FLAGGED_GUIDE = "M10 100 L170 100 C 205 100 215 190 255 190";
const FLAGGED_PATH = `${FLAGGED_GUIDE} L302 190`;

// One in four connections in the stream is an attack.
const DOTS = Array.from({ length: 8 }, (_, i) => ({ flagged: i % 4 === 2, begin: i * 0.5 }));
const DURATION = 4;

const Dot = ({ flagged, begin }: { flagged: boolean; begin: number }) => (
  <g opacity="0">
    <animateMotion dur={`${DURATION}s`} begin={`${begin}s`} repeatCount="indefinite" path={flagged ? FLAGGED_PATH : NORMAL_PATH} />
    <animate attributeName="opacity" dur={`${DURATION}s`} begin={`${begin}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.08;0.9;1" />
    {/* Unchecked: grey until it reaches the detector */}
    <circle r="6" style={{ fill: "var(--muted)" }}>
      <animate attributeName="opacity" dur={`${DURATION}s`} begin={`${begin}s`} repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.48;0.52;1" />
    </circle>
    {/* Checked: accent if normal, red if flagged */}
    <circle r="6" opacity="0" style={{ fill: flagged ? "var(--danger)" : "var(--accent)" }}>
      <animate attributeName="opacity" dur={`${DURATION}s`} begin={`${begin}s`} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.48;0.52;1" />
    </circle>
  </g>
);

// Shown instead of the animation when the visitor prefers reduced motion.
const StaticDots = () => (
  <>
    {[40, 80, 120].map((x) => <circle key={x} cx={x} cy={100} r="6" style={{ fill: "var(--muted)" }} />)}
    {[250, 300, 340].map((x) => <circle key={x} cx={x} cy={100} r="6" style={{ fill: "var(--accent)" }} />)}
    <circle cx={302} cy={190} r="6" style={{ fill: "var(--danger)" }} />
  </>
);

const TrafficFlow = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className={className}>
      <svg
        viewBox="0 55 360 180"
        className="w-full h-full"
        role="img"
        aria-label="Network connections flow into the detector. Normal ones continue to the devices; unusual ones are flagged and set aside."
      >
        <text x="10" y="70" fontSize="11" fontWeight="700" style={{ fill: "var(--muted)" }}>INCOMING</text>
        <text x="350" y="70" fontSize="11" fontWeight="700" textAnchor="end" style={{ fill: "var(--muted)" }}>YOUR DEVICES</text>

        <path d={NORMAL_PATH} fill="none" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" style={{ stroke: "var(--muted)" }} />
        <path d={FLAGGED_GUIDE} fill="none" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" style={{ stroke: "var(--muted)" }} />

        <rect x="255" y="170" width="95" height="40" rx="12" fill="none" strokeWidth="2" style={{ stroke: "var(--danger)" }} />
        <text x="302" y="225" fontSize="11" fontWeight="700" textAnchor="middle" style={{ fill: "var(--danger)" }}>FLAGGED</text>

        {reduceMotion ? <StaticDots /> : DOTS.map((d, i) => <Dot key={i} {...d} />)}

        {/* Detector, drawn last so dots pass underneath it */}
        <circle cx="180" cy="100" r="34" strokeWidth="2.5" style={{ fill: "var(--card)", stroke: "var(--accent)" }} />
        <ShieldCheck x={162} y={82} width={36} height={36} strokeWidth={1.75} style={{ color: "var(--accent)" }} />
        <text x="180" y="155" fontSize="11" fontWeight="700" textAnchor="middle" style={{ fill: "var(--fg)" }}>DETECTOR</text>
      </svg>
    </div>
  );
};

const FlowLegend = () => (
  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />Normal: let through</span>
    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]" />Unusual: flagged</span>
  </div>
);

/* ---------- The problem: an attacker reaching into a home network ---------- */

// The house spans x 150–340 and y 50–265; the walls start at y 120.
const DEVICES: { Icon: LucideIcon; cx: number; cy: number }[] = [
  { Icon: Cctv, cx: 205, cy: 158 },
  { Icon: Lightbulb, cx: 285, cy: 158 },
  { Icon: Thermometer, cx: 205, cy: 226 },
  { Icon: Speaker, cx: 285, cy: 226 },
];

const HomeUnderAttack = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className={className}>
      <svg
        viewBox="0 40 350 240"
        className="w-full h-full"
        role="img"
        aria-label="An attacker outside a home gets into its camera, then spreads to the light bulb, thermostat and speaker."
      >
        {/* House: one outline, roof and walls meeting at the eaves */}
        <path
          d="M150 120 L245 50 L340 120 V255 Q340 265 330 265 H160 Q150 265 150 255 Z"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ stroke: "var(--muted)", fill: "var(--border)", fillOpacity: 0.35 }}
        />
        <text x="245" y="106" fontSize="11" fontWeight="700" textAnchor="middle" style={{ fill: "var(--muted)" }}>HOME</text>

        {/* The attacker gets into the camera, then spreads from it to the other devices.
            Drawn first so the devices sit on top. */}
        {[{ x1: 62, y1: DEVICES[0].cy }, ...DEVICES.slice(1).map(() => ({ x1: DEVICES[0].cx, y1: DEVICES[0].cy }))].map(({ x1, y1 }, i) => {
          const target = DEVICES[i];
          return (
            <line key={i} x1={x1} y1={y1} x2={target.cx} y2={target.cy} strokeWidth="2" strokeDasharray="5 5" style={{ stroke: "var(--danger)" }}>
              {!reduceMotion && <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />}
            </line>
          );
        })}

        {/* Attacker */}
        <circle cx="40" cy="158" r="26" strokeWidth="2.5" style={{ fill: "var(--card)", stroke: "var(--danger)" }} />
        <Bug x={26} y={144} width={28} height={28} strokeWidth={1.75} style={{ color: "var(--danger)" }} />
        <text x="40" y="203" fontSize="11" fontWeight="700" textAnchor="middle" style={{ fill: "var(--danger)" }}>ATTACKER</text>

        {/* Devices, each with a red ring that pulses as it is hit */}
        {DEVICES.map(({ Icon, cx, cy }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="24" strokeWidth="2" style={{ fill: "var(--card)", stroke: "var(--muted)" }} />
            <circle cx={cx} cy={cy} r="24" fill="none" strokeWidth="2.5" opacity={reduceMotion ? 1 : 0} style={{ stroke: "var(--danger)" }}>
              {!reduceMotion && (
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              )}
            </circle>
            <Icon x={cx - 12} y={cy - 12} width={24} height={24} strokeWidth={1.75} style={{ color: "var(--fg)" }} />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ---------- Cards ---------- */

const StageCard = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="h-full glossy-card rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col gap-3 md:gap-5 transition-colors duration-500">
    <Label>{label}</Label>
    {children}
  </div>
);

const Pill = ({ children, ok }: { children: ReactNode; ok: boolean }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glossy-card text-[11px] md:text-xs font-bold">
    {ok ? <Check className="w-3 h-3 text-[var(--accent)]" /> : <X className="w-3 h-3 text-[var(--danger)]" />}
    {children}
  </span>
);

const ProblemCard = () => (
  <StageCard label="The problem">
    <HomeUnderAttack className="flex-1 min-h-0" />
    <div className="flex flex-wrap gap-2 justify-center">
      {["Always online", "Little memory", "No antivirus"].map((t) => (
        <span key={t} className="px-3 py-1 rounded-full glossy-card text-[11px] md:text-xs font-bold text-[var(--muted)] uppercase">{t}</span>
      ))}
    </div>
  </StageCard>
);

const HowCard = () => (
  <StageCard label="How it works">
    <TrafficFlow className="flex-1 min-h-0" />
    <FlowLegend />
    <p className="text-xs md:text-sm text-[var(--muted)] leading-snug border-t border-[var(--border)] pt-3 md:pt-5">
      It learned from normal traffic only. It never saw an attack while training.
    </p>
  </StageCard>
);

const ResultCard = () => (
  <StageCard label="The result">
    <div className="flex-1 min-h-0 flex flex-col justify-center gap-4 md:gap-7">
      <div className="flex items-baseline gap-3">
        <span className="text-5xl md:text-7xl font-black italic tracking-tighter text-[var(--accent)]">89%</span>
        <span className="text-xs md:text-sm text-[var(--muted)] leading-snug">of attacks caught on real smart-device traffic</span>
      </div>
      <SizeBars />
      <div className="space-y-2 border-t border-[var(--border)] pt-3 md:pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-[11px] md:text-xs font-bold uppercase text-[var(--muted)]">Good at</span>
          <Pill ok>Floods</Pill>
          <Pill ok>Break-ins</Pill>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-[11px] md:text-xs font-bold uppercase text-[var(--muted)]">Harder</span>
          <Pill ok={false}>Quiet scouting</Pill>
        </div>
      </div>
    </div>
    <p className="hidden md:block text-[11px] text-[var(--muted)] leading-snug">
      Sizes measured on the UNSW-NB15 dataset; the typical model is a Random Forest.
    </p>
  </StageCard>
);

// Steps for the scroll-driven tour.
export const idsSteps = [
  {
    title: "The problem",
    desc: "Smart home devices like cameras, bulbs and sensors are easy to hack, and too small to run normal security software. One weak device can let an attacker into the whole home network.",
    visual: <ProblemCard />,
  },
  {
    title: "How it works",
    desc: "Instead of memorising every known attack, the detector learns what normal traffic looks like and flags anything that doesn't fit, like a doorman who knows every regular by sight.",
    visual: <HowCard />,
  },
  {
    title: "The result",
    desc: "Under 0.1 MB, up to 700 times smaller than a typical model, and it caught 89% of attacks on real smart-device traffic. Floods and break-ins are easy for it to spot; quiet scouting attacks are harder.",
    visual: <ResultCard />,
  },
];

/* ---------- Single-section version (kept while the tour is being compared) ---------- */

export const IdsVisual = () => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-[420px] shrink-0 glossy-card rounded-[2.5rem] p-6 md:p-8 transition-colors duration-500"
  >
    <div className="mb-4"><Label>How it works</Label></div>
    <TrafficFlow />
    <div className="mt-4"><FlowLegend /></div>
    <div className="border-t border-[var(--border)] mt-6 pt-6 space-y-4">
      <Label>Model size</Label>
      <SizeBars />
      <p className="text-[11px] text-[var(--muted)] leading-snug">
        Both tested on the same network-traffic dataset (UNSW-NB15). The typical model is a Random Forest.
      </p>
    </div>
  </motion.div>
);
