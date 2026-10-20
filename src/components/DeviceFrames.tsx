import type { ReactNode } from "react";
import iphoneFrame from "../assets/iphone-frame.webp";
import macbookFrame from "../assets/macbook-frame.webp";

// Device frames from esmailga/shams-solutions. Each frame image has a transparent screen opening;
// content sits behind it, positioned in percentages of the image's pixel geometry so the frame scales to any size.
const IPHONE = { w: 732, h: 1410, screen: { x: 54, y: 32, w: 621, h: 1346, r: 90 } };
const MACBOOK = { w: 1347, h: 784, hinge: 737, screen: { x: 97, y: 19, w: 1148, h: 684, r: 12 } };

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

const IPHONE_STYLE = { aspectRatio: `${IPHONE.w} / ${IPHONE.h}` };
const IPHONE_SCREEN_STYLE = {
  left: pct(IPHONE.screen.x, IPHONE.w), top: pct(IPHONE.screen.y, IPHONE.h),
  width: pct(IPHONE.screen.w, IPHONE.w), height: pct(IPHONE.screen.h, IPHONE.h),
  borderRadius: `${pct(IPHONE.screen.r, IPHONE.screen.w)} / ${pct(IPHONE.screen.r, IPHONE.screen.h)}`,
};

const MACBOOK_STYLE = { aspectRatio: `${MACBOOK.w} / ${MACBOOK.h}` };
const MACBOOK_LID_STYLE = { height: pct(MACBOOK.hinge, MACBOOK.h) };
const MACBOOK_BASE_STYLE = { height: pct(MACBOOK.h - MACBOOK.hinge + 1, MACBOOK.h) };
const MACBOOK_SCREEN_STYLE = {
  left: pct(MACBOOK.screen.x, MACBOOK.w), top: pct(MACBOOK.screen.y, MACBOOK.hinge),
  width: pct(MACBOOK.screen.w, MACBOOK.w), height: pct(MACBOOK.screen.h, MACBOOK.hinge),
  borderRadius: `${pct(MACBOOK.screen.r, MACBOOK.screen.w)} / ${pct(MACBOOK.screen.r, MACBOOK.screen.h)}`,
};

// Fills the width of its parent; children are laid out inside the screen.
export function IphoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full" style={IPHONE_STYLE}>
      <div className="absolute isolate overflow-hidden bg-[var(--card)] shadow-[0_0_0_3px_#000]" style={IPHONE_SCREEN_STYLE}>
        {children}
      </div>
      <FrameImage src={iphoneFrame} className="top-0" />
    </div>
  );
}

// The lid is split from the base at the hinge so it can swing open: pass `open={false}` to start it closed.
export function MacbookFrame({ children, open = true }: { children: ReactNode; open?: boolean }) {
  return (
    <div className="relative w-full perspective-[3000px]" style={MACBOOK_STYLE}>
      <div
        className={`absolute inset-x-0 top-0 origin-bottom overflow-hidden transition-transform duration-[1500ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${open ? "" : "motion-safe:-rotate-x-60"}`}
        style={MACBOOK_LID_STYLE}
      >
        <div className="absolute isolate overflow-hidden bg-[var(--card)] shadow-[0_0_0_1.5px_#000] md:shadow-[0_0_0_3px_#000]" style={MACBOOK_SCREEN_STYLE}>
          {children}
        </div>
        <FrameImage src={macbookFrame} className="top-0" />
      </div>
      <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={MACBOOK_BASE_STYLE}>
        <FrameImage src={macbookFrame} className="bottom-0" />
      </div>
    </div>
  );
}

function FrameImage({ src, className }: { src: string; className: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      decoding="async"
      className={`absolute inset-x-0 w-full pointer-events-none select-none ${className}`}
    />
  );
}
