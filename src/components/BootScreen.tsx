import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ASCII art for "KIDO"
const KIDO_ASCII = `
 ██╗  ██╗██╗██████╗  ██████╗
 ██║ ██╔╝██║██╔══██╗██╔═══██╗
 █████╔╝ ██║██║  ██║██║   ██║
 ██╔═██╗ ██║██║  ██║██║   ██║
 ██║  ██╗██║██████╔╝╚██████╔╝
 ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝
`.trim();

type CheckLine = { label: string; delay: number };

const CHECKS: CheckLine[] = [
  { label: 'Initializing JoãoOS', delay: 180 },
  { label: 'Loading caffeine', delay: 420 },
  { label: 'Loading unfinished side projects', delay: 660 },
  { label: 'Loading football analytics', delay: 900 },
];

const PROGRESS_START = 1040;
const COMPLETE_DELAY = 1500;

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [showAscii, setShowAscii] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [visibleChecks, setVisibleChecks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showReady, setShowReady] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;

    t.push(setTimeout(() => setShowAscii(true), 100));
    t.push(setTimeout(() => setShowSub(true), 280));

    CHECKS.forEach((_, i) => {
      t.push(setTimeout(() => setVisibleChecks(i + 1), CHECKS[i].delay));
    });

    t.push(setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 4;
        setProgress(Math.min(p, 100));
        if (p >= 100) {
          clearInterval(interval);
          setShowReady(true);
        }
      }, 12);
      t.push(interval as unknown as ReturnType<typeof setTimeout>);
    }, PROGRESS_START));

    t.push(setTimeout(onComplete, COMPLETE_DELAY));

    return () => { t.forEach(clearTimeout); t.forEach(clearInterval as never); };
  }, [onComplete]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black font-mono">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)',
        }}
      />

      <div className="relative z-20 flex flex-col items-center gap-6 px-8">
        {/* ASCII art */}
        <AnimatePresence>
          {showAscii && (
            <motion.pre
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.55rem] leading-[1.4] text-white/80 sm:text-[0.65rem]"
              style={{ fontFamily: 'monospace' }}
            >
              {KIDO_ASCII}
            </motion.pre>
          )}
        </AnimatePresence>

        {/* KIDO OS label */}
        <AnimatePresence>
          {showSub && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-[0.65rem] tracking-[0.35em] text-white/60 uppercase">
                KIDO OS  v1.0
              </span>
              <div className="h-px w-40 bg-white/10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* System checks */}
        <div className="w-64 space-y-1.5">
          {CHECKS.slice(0, visibleChecks).map((check, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-[0.65rem]"
            >
              <span className="text-white/40">{check.label}...</span>
              <span className="text-emerald-400/80">✓</span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {progress > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-64"
            >
              <div className="mb-1.5 flex justify-between text-[0.55rem] text-white/25">
                <span>System ready</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[1px] w-full bg-white/10">
                <div
                  className="h-full bg-white/50 transition-all duration-75"
                  style={{ width: `${progress}%` }}
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
              transition={{ duration: 0.4 }}
              className="text-[0.6rem] tracking-[0.3em] text-white/35 uppercase"
            >
              Ready
              <span
                className="ml-1 inline-block h-2.5 w-1.5 bg-white/50 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
