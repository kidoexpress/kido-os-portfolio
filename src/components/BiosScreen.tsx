import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LineType = 'header' | 'dim' | 'info' | 'system' | 'check' | 'ready' | 'spacer';

type BiosLine = { text: string; delay: number; type: LineType };

const LINES: BiosLine[] = [
  { text: 'WORKSPACE BIOS v3.0', delay: 0, type: 'header' },
  { text: 'Copyright (C) 2025 João Kido. All Rights Reserved.', delay: 80, type: 'dim' },
  { text: '', delay: 160, type: 'spacer' },
  { text: 'CPU   : Neural Core i9 [Berkeley Edition]', delay: 240, type: 'info' },
  { text: 'RAM   : 32768MB ......................................... OK', delay: 340, type: 'info' },
  { text: 'DRIVE : /dev/research-archive ................... MOUNTED', delay: 440, type: 'info' },
  { text: '', delay: 540, type: 'spacer' },
  { text: 'Initializing POST sequence...', delay: 620, type: 'system' },
  { text: '', delay: 700, type: 'spacer' },
  { text: '[ OK ] CPU integrity check', delay: 850, type: 'check' },
  { text: '[ OK ] Memory diagnostics', delay: 1100, type: 'check' },
  { text: '[ OK ] Neural interface driver', delay: 1350, type: 'check' },
  { text: '[ OK ] Project filesystem', delay: 1600, type: 'check' },
  { text: '[ OK ] Research archive index', delay: 1850, type: 'check' },
  { text: '[ OK ] Workspace kernel', delay: 2100, type: 'check' },
  { text: '', delay: 2200, type: 'spacer' },
  { text: 'All systems nominal. Booting workspace...', delay: 2350, type: 'ready' },
];

const COMPLETE_DELAY = 3400;

const TYPE_CLASS: Record<LineType, string> = {
  header: 'text-white font-medium tracking-widest text-[0.8rem]',
  dim: 'text-zinc-600 text-[0.72rem]',
  info: 'text-zinc-400 text-[0.72rem]',
  system: 'text-zinc-300 text-[0.72rem]',
  check: 'text-zinc-500 text-[0.72rem]',
  ready: 'text-cyan-400 text-[0.75rem] tracking-[0.1em]',
  spacer: 'h-2',
};

export function BiosScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;

    LINES.forEach((line, i) => {
      t.push(setTimeout(() => setVisibleCount(i + 1), line.delay));
    });

    t.push(setTimeout(() => setShowCursor(true), 2400));
    t.push(setTimeout(onComplete, COMPLETE_DELAY));

    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="w-full max-w-lg px-8 font-mono">
        <div className="space-y-0">
          {LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12 }}
              className={TYPE_CLASS[line.type]}
              style={{ lineHeight: line.type === 'spacer' ? undefined : '1.8' }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 inline-block h-[14px] w-[7px] bg-cyan-400 align-middle animate-[blink_1s_step-end_infinite]"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
