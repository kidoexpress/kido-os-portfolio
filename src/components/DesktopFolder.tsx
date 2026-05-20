import { motion } from 'framer-motion';
import type { RefObject } from 'react';

type Props = {
  label: string;
  color?: string;
  onClick?: () => void;
  initialX: number;
  initialY: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

function FolderSVG({ color = '#3b82f6' }: { color?: string }) {
  const id = color.replace('#', 'f');
  return (
    <svg viewBox="0 0 72 58" width="72" height="58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`fb-${id}`} x1="0" y1="0" x2="0" y2="58">
          <stop stopColor={color} stopOpacity="0.9" />
          <stop offset="1" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`ft-${id}`} x1="0" y1="0" x2="72" y2="0">
          <stop stopColor={color} stopOpacity="0.7" />
          <stop offset="1" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`fg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="rgba(255,255,255,0.18)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={`fs-${id}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.35)" />
        </filter>
      </defs>
      <g filter={`url(#fs-${id})`}>
        {/* Tab */}
        <path
          d="M2 16 Q2 10 8 10 H26 Q30 10 31.5 14 L34 18 H2 Z"
          fill={`url(#ft-${id})`}
        />
        {/* Body */}
        <rect x="0" y="16" width="72" height="38" rx="5" fill={`url(#fb-${id})`} />
        {/* Top edge depth */}
        <rect x="0" y="16" width="72" height="2.5" rx="0" fill="rgba(0,0,0,0.1)" />
        {/* Inner highlight line */}
        <line x1="5" y1="22" x2="67" y2="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Gloss */}
        <rect x="0" y="16" width="72" height="38" rx="5" fill="url(#fg-${id})" />
      </g>
    </svg>
  );
}

export function DesktopFolder({ label, color = '#3b82f6', onClick, initialX, initialY, constraintsRef }: Props) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.06}
      initial={{ x: initialX, y: initialY }}
      whileHover={{ scale: 1.06 }}
      whileDrag={{
        scale: 1.1,
        filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.55))',
        cursor: 'grabbing',
        zIndex: 9000,
      }}
      style={{ position: 'absolute', top: 0, left: 0, cursor: 'grab', zIndex: 8, userSelect: 'none' }}
      onTap={onClick}
    >
      <div className="desktop-folder">
        <div className="desktop-folder-icon">
          <FolderSVG color={color} />
        </div>
        <span className="desktop-folder-label">{label}</span>
      </div>
    </motion.div>
  );
}
