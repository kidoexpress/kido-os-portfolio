import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── ASCII logo ──────────────────────────────────────── */
const ASCII_ART = `
 ██╗  ██╗██╗██████╗  ██████╗
 ██║ ██╔╝██║██╔══██╗██╔═══██╗
 █████╔╝ ██║██║  ██║██║   ██║
 ██╔═██╗ ██║██║  ██║██║   ██║
 ██║  ██╗██║██████╔╝╚██████╔╝
 ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝`.trim();

/* ── Sequence ────────────────────────────────────────── */
type LT = 'ok' | 'cmd' | 'blank';
type BL = { text: string; type: LT; gap: number };

const SEQ: BL[] = [
  { text: '[ OK ]  Mounting /dev/portfolio',        type: 'ok',    gap: 0   },
  { text: '[ OK ]  Syncing project metadata',       type: 'ok',    gap: 210 },
  { text: '[ OK ]  Loading caffeine reserves',       type: 'ok',    gap: 210 },
  { text: '[ OK ]  Launching desktop environment',  type: 'ok',    gap: 220 },
  { text: '',                                        type: 'blank', gap: 110 },
  { text: 'boot@kido:~$ starting session...',       type: 'cmd',   gap: 90  },
];

// t=80  → logo fade in
// t=320 → subtitle
// t=640 → lines start  (gap sum = 840ms → last at ~1480ms)
// t=1680 → progress fills (900ms)
// t=2780 → READY
// t=3400 → onComplete  ≈ 3.4s

/* ── Component ───────────────────────────────────────── */
export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [showLogo,     setShowLogo]     = useState(false);
  const [showSub,      setShowSub]      = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress,     setProgress]     = useState<number | null>(null);
  const [showReady,    setShowReady]    = useState(false);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ticker   = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = timeouts.current;

    t.push(setTimeout(() => setShowLogo(true), 80));
    t.push(setTimeout(() => setShowSub(true),  320));

    let cum = 640;
    SEQ.forEach((line, i) => {
      cum += line.gap;
      t.push(setTimeout(() => setVisibleCount(i + 1), cum));
    });

    t.push(setTimeout(() => {
      setProgress(0);
      let p = 0;
      ticker.current = setInterval(() => {
        p += 2;
        setProgress(Math.min(p, 100));
        if (p >= 100 && ticker.current) {
          clearInterval(ticker.current);
          ticker.current = null;
        }
      }, 18);
    }, 1680));

    t.push(setTimeout(() => setShowReady(true), 2780));
    t.push(setTimeout(onComplete,               3400));

    return () => {
      t.forEach(clearTimeout);
      if (ticker.current) clearInterval(ticker.current);
    };
  }, [onComplete]);

  const filled = progress != null ? Math.floor(progress / 5) : 0;
  const bar    = '█'.repeat(filled) + '░'.repeat(20 - filled);
  const pct    = progress != null ? `${String(progress).padStart(3)}%` : '';

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        background: '#000',
        overflow: 'hidden',
        fontFamily: '"JetBrains Mono", "Cascadia Code", Consolas, monospace',
        WebkitFontSmoothing: 'antialiased',
        /* true viewport centering */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/*
        ── Content column ───────────────────────────────
        alignItems: flex-start  → children start at the
        natural left edge of the column.
        The column itself has no explicit width, so it
        auto-sizes to its widest child (the terminal lines).
        The outer flex-center then centers THAT block on screen.
        Logo + subtitle override with alignSelf: center.
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {/* ── ASCII logo (override: centered) ── */}
        <AnimatePresence>
          {showLogo && (
            <motion.pre
              key="logo"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                alignSelf: 'center',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 11,
                lineHeight: 1.44,
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                marginBottom: 20,
                userSelect: 'none',
              }}
            >
              {ASCII_ART}
            </motion.pre>
          )}
        </AnimatePresence>

        {/* ── Subtitle (override: centered) ── */}
        <AnimatePresence>
          {showSub && (
            <motion.div
              key="sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.38 }}
              style={{
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 11,
                marginBottom: 44,
              }}
            >
              <span
                style={{
                  fontSize: 10.5,
                  letterSpacing: '0.30em',
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Kido OS &nbsp;·&nbsp; v1.0
              </span>
              <div
                style={{
                  width: 160,
                  height: 1,
                  background: 'rgba(255,255,255,0.07)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Boot lines (left-aligned in the centered block) ── */}
        <div style={{ fontSize: 12.5, marginBottom: 28 }}>
          {SEQ.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
            >
              {line.type === 'blank' ? (
                <div style={{ height: '0.55em' }} />
              ) : line.type === 'ok' ? (
                <div style={{ lineHeight: 1.85 }}>
                  <span style={{ color: 'rgba(255,255,255,0.22)' }}>
                    {'[ OK ]'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {'  '}{line.text.replace(/^\[ OK \]\s*/, '')}
                  </span>
                </div>
              ) : (
                <div style={{ lineHeight: 1.85 }}>
                  <span style={{ color: 'rgba(255,255,255,0.26)' }}>
                    {line.text.slice(0, line.text.indexOf('$') + 1)}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {line.text.slice(line.text.indexOf('$') + 1)}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <AnimatePresence>
          {progress != null && (
            <motion.div
              key="bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
              style={{ marginBottom: 24 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 7,
                  fontSize: 10.5,
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.20)', letterSpacing: '0.03em' }}>
                  system init
                </span>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.04em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pct}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.36)',
                  fontFamily: 'inherit',
                }}
              >
                [{bar}]
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── READY ── */}
        <AnimatePresence>
          {showReady && (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              style={{
                fontSize: 12.5,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1,
              }}
            >
              READY{' '}
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 13,
                  background: 'rgba(255,255,255,0.68)',
                  verticalAlign: 'middle',
                  marginLeft: 2,
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
