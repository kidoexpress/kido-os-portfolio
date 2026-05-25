import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  minimized: boolean;
  focused: boolean;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

export function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  initialX,
  initialY,
  width,
  height,
  minimized,
  focused,
}: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [maximized, setMaximized] = useState(false);
  const drag = useRef({ active: false, ox: 0, oy: 0, mx: 0, my: 0 });

  /* ── Pointer-capture titlebar drag ───────────────────── */

  const onPtrDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (maximized) return;
    onFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, ox: pos.x, oy: pos.y, mx: e.clientX, my: e.clientY };
  }, [maximized, onFocus, pos]);

  const onPtrMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    setPos({
      x: Math.max(-width + 80,  drag.current.ox + e.clientX - drag.current.mx),
      y: Math.max(0,            drag.current.oy + e.clientY - drag.current.my),
    });
  }, [width]);

  const onPtrUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  /* ── Animate state ───────────────────────────────────── */
  // Three visual states, all owned by Framer (no CSS opacity/transform conflicts):
  //   minimized  → hidden, scaled down, no pointer events
  //   visible+focused   → full opacity
  //   visible+unfocused → slightly dimmed
  const animTarget = minimized
    ? { opacity: 0, scale: 0.90, y: 24 }
    : focused
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0.72, scale: 1, y: 0 };

  const animTransition = minimized
    ? { duration: 0.18, ease: [0.4, 0, 1, 1] as const }
    : { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const };

  /* ── Render ───────────────────────────────────────────── */

  return (
    <motion.div
      /* Open: scale up + fade in — no blur (too expensive, causes jank) */
      initial={{ opacity: 0, scale: 0.95, y: 14 }}
      animate={animTarget}
      /* Close: fast fade + slight scale-down — driven by AnimatePresence in Desktop */
      exit={{ opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.13, ease: [0.4, 0, 1, 1] } }}
      transition={animTransition}
      onPointerDown={onFocus}
      className={`win-window${maximized ? ' maximized' : ''}${focused ? ' focused' : ' inactive'}`}
      data-app-id={id}
      style={{
        ...(maximized
          ? { position: 'absolute', left: 0, top: 0, right: 0, bottom: 58, width: '100%', height: 'auto', zIndex, borderRadius: 0 }
          : { left: pos.x, top: pos.y, width, height: height + 44, zIndex }
        ),
        /* Disable interaction while minimised — Framer sets opacity:0 but DOM is still there */
        pointerEvents: minimized ? 'none' : undefined,
      }}
    >
      {/* Title bar — drag handle */}
      <div
        className="win-titlebar"
        onPointerDown={onPtrDown}
        onPointerMove={onPtrMove}
        onPointerUp={onPtrUp}
        onPointerCancel={onPtrUp}
        onDoubleClick={() => setMaximized((v) => !v)}
        style={{ cursor: maximized ? 'default' : 'move' }}
      >
        {icon && <span className="win-titlebar-icon">{icon}</span>}
        <span className="win-titlebar-title">{title}</span>

        <div className="win-controls">
          <button
            className="win-ctrl"
            title="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            <Minus size={11} strokeWidth={2} />
          </button>
          <button
            className="win-ctrl"
            title={maximized ? 'Restore' : 'Maximize'}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setMaximized((v) => !v); }}
          >
            {maximized
              ? (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <rect x="3" y="0" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <rect x="0" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"
                    style={{ fill: 'rgba(18,18,22,0.98)' }} />
                </svg>
              )
              : <Square size={10} strokeWidth={1.6} />
            }
          </button>
          <button
            className="win-ctrl close"
            title="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <X size={12} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="win-body">
        {children}
      </div>
    </motion.div>
  );
}
