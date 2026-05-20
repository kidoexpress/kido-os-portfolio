import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LineType = 'header' | 'check' | 'spacer' | 'identity' | 'sub';

type BootLine = {
  text: string;
  delay: number;
  type: LineType;
};

const LINES: BootLine[] = [
  { text: 'WORKSPACE / v2.0', delay: 0, type: 'header' },
  { text: '', delay: 180, type: 'spacer' },
  { text: 'checking environment....................... ✓', delay: 360, type: 'check' },
  { text: 'loading research archive................... ✓', delay: 680, type: 'check' },
  { text: 'indexing 6 experiments..................... ✓', delay: 1000, type: 'check' },
  { text: 'syncing project graph...................... ✓', delay: 1320, type: 'check' },
  { text: 'mounting interface modules................. ✓', delay: 1640, type: 'check' },
  { text: 'calibrating workspace...................... ✓', delay: 1960, type: 'check' },
  { text: '', delay: 2200, type: 'spacer' },
  { text: 'JOÃO KIDO', delay: 2380, type: 'identity' },
  { text: 'CS · Builder · Researcher', delay: 2580, type: 'sub' },
];

const PROGRESS_START = 2800;
const PROGRESS_DURATION = 900;
const COMPLETE_DELAY = PROGRESS_START + PROGRESS_DURATION + 400;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showReady, setShowReady] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => timers.current.forEach(clearTimeout);

    LINES.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => setVisibleCount((n) => Math.max(n, i + 1)), line.delay)
      );
    });

    timers.current.push(setTimeout(() => setShowProgress(true), PROGRESS_START));
    timers.current.push(
      setTimeout(() => setShowReady(true), PROGRESS_START + PROGRESS_DURATION)
    );
    timers.current.push(setTimeout(onComplete, COMPLETE_DELAY));

    return clear;
  }, [onComplete]);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-void overflow-hidden">
      {/* Very subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,6,10,0.7) 100%)',
        }}
      />

      <div className="relative w-full max-w-md px-8">
        {/* Lines */}
        <div className="space-y-0 font-mono">
          {LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={[
                'leading-7',
                line.type === 'header'
                  ? 'text-[0.8rem] tracking-[0.2em] text-zinc-200 font-medium'
                  : '',
                line.type === 'check' ? 'text-[0.72rem] text-zinc-500' : '',
                line.type === 'identity'
                  ? 'text-[0.85rem] tracking-[0.28em] text-signal font-medium mt-1'
                  : '',
                line.type === 'sub'
                  ? 'text-[0.65rem] tracking-[0.18em] text-zinc-500 uppercase mt-0.5'
                  : '',
                line.type === 'spacer' ? 'h-2' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <div className="mb-1.5 flex justify-between font-mono text-[0.6rem] text-zinc-600 uppercase tracking-[0.15em]">
                <span>loading workspace</span>
              </div>
              <div className="h-px w-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full bg-signal/60"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: PROGRESS_DURATION / 1000,
                    ease: [0.2, 0.8, 0.4, 1],
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready */}
        <AnimatePresence>
          {showReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-4 font-mono text-[0.65rem] tracking-[0.35em] text-zinc-400 uppercase"
            >
              ready
              <span className="boot-cursor ml-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
