import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AppId =
  | 'terminal' | 'about' | 'projects' | 'contact'
  | 'research' | 'notes' | 'experience' | 'archive'
  | 'finder' | 'trash';

/* ── SVG Icons ────────────────────────────────────────── */

const Gloss = () => (
  <defs>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="rgba(255,255,255,0.24)" />
      <stop offset="1" stopColor="rgba(255,255,255,0)" />
    </linearGradient>
  </defs>
);

function FinderIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="fi-l" x1="0" y1="0" x2="28" y2="56"><stop stopColor="#4a9ef8" /><stop offset="1" stopColor="#1a60d8" /></linearGradient>
        <linearGradient id="fi-r" x1="28" y1="0" x2="56" y2="56"><stop stopColor="#edf2f7" /><stop offset="1" stopColor="#c8d4e0" /></linearGradient>
        <linearGradient id="fi-g" x1="0" y1="0" x2="0" y2="1"><stop stopColor="rgba(255,255,255,0.22)" /><stop offset="1" stopColor="rgba(255,255,255,0)" /></linearGradient>
        <clipPath id="fi-sq"><rect width="56" height="56" rx="13.5" /></clipPath>
      </defs>
      <g clipPath="url(#fi-sq)">
        <rect width="28" height="56" fill="url(#fi-l)" />
        <rect x="28" width="28" height="56" fill="url(#fi-r)" />
        <rect x="17" y="20" width="3.5" height="8" rx="1.75" fill="rgba(255,255,255,0.9)" />
        <rect x="35.5" y="20" width="3.5" height="8" rx="1.75" fill="rgba(30,60,100,0.65)" />
        <path d="M15 37 Q28 46 41 37" stroke="rgba(0,0,0,0.3)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M15 36.2 Q28 45.2 41 36.2" stroke="rgba(255,255,255,0.7)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <rect width="56" height="26" rx="13.5" fill="url(#fi-g)" />
      </g>
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="ti-bg" x1="0" y1="0" x2="0" y2="56"><stop stopColor="#424244" /><stop offset="1" stopColor="#1c1c1e" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#ti-bg)" />
      <path d="M13 21.5 L20.5 28 L13 34.5" stroke="#34d399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24" y="31" width="12" height="2.5" rx="1.25" fill="rgba(255,255,255,0.8)" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="pi-bg" x1="4" y1="4" x2="52" y2="52"><stop stopColor="#60a5fa" /><stop offset="1" stopColor="#1e40af" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#pi-bg)" />
      <path d="M22 13 L22 26 L12 43 C10.5 46.5 12.5 48.5 17 48.5 L39 48.5 C43.5 48.5 45.5 46.5 44 43 L34 26 L34 13" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M15 41 Q14 46 17 47 L39 47 Q42 46 41 41 Z" fill="rgba(255,255,255,0.38)" />
      <rect x="20" y="11" width="16" height="2.5" rx="1.25" fill="rgba(255,255,255,0.92)" />
      <circle cx="24" cy="43" r="2" fill="rgba(255,255,255,0.55)" />
      <circle cx="31" cy="44.5" r="1.4" fill="rgba(255,255,255,0.42)" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="ri-bg" x1="4" y1="4" x2="52" y2="52"><stop stopColor="#818cf8" /><stop offset="1" stopColor="#4338ca" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#ri-bg)" />
      <circle cx="24" cy="25" r="9.5" stroke="white" strokeWidth="2.2" fill="none" />
      <line x1="30.5" y1="31.5" x2="41" y2="42" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="ni-bg" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#fbbf24" /><stop offset="1" stopColor="#b45309" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#ni-bg)" />
      <rect x="13" y="11" width="30" height="35" rx="3.5" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
      <line x1="19" y1="20" x2="37" y2="20" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="19" y1="26.5" x2="37" y2="26.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="19" y1="33" x2="29" y2="33" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="ci-bg" x1="4" y1="4" x2="52" y2="52"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#0369a1" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#ci-bg)" />
      <rect x="9" y="16" width="38" height="26" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.88)" strokeWidth="2" />
      <path d="M9 16 L28 32 L47 16" stroke="rgba(255,255,255,0.88)" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="ei-bg" x1="4" y1="4" x2="52" y2="52"><stop stopColor="#34d399" /><stop offset="1" stopColor="#059669" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#ei-bg)" />
      {/* Timeline line */}
      <line x1="19" y1="14" x2="19" y2="44" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Three timeline dots with labels */}
      <circle cx="19" cy="18" r="3.5" fill="white" fillOpacity="0.9" />
      <rect x="26" y="15.5" width="14" height="5" rx="1.5" fill="rgba(255,255,255,0.22)" />
      <circle cx="19" cy="30" r="3.5" fill="white" fillOpacity="0.7" />
      <rect x="26" y="27.5" width="10" height="5" rx="1.5" fill="rgba(255,255,255,0.18)" />
      <circle cx="19" cy="42" r="2.5" fill="white" fillOpacity="0.45" />
      <rect x="26" y="39.5" width="12" height="5" rx="1.5" fill="rgba(255,255,255,0.12)" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <Gloss />
      <defs>
        <linearGradient id="tri-bg" x1="0" y1="0" x2="0" y2="56"><stop stopColor="#9ca3af" /><stop offset="1" stopColor="#4b5563" /></linearGradient>
      </defs>
      <rect width="56" height="56" rx="13.5" fill="url(#tri-bg)" />
      <rect x="13" y="17" width="30" height="2.5" rx="1.25" fill="rgba(255,255,255,0.85)" />
      <rect x="22" y="12" width="12" height="6" rx="2" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" />
      <path d="M17 20.5 L19 44 H37 L39 20.5 Z" stroke="rgba(255,255,255,0.78)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.08)" />
      <line x1="24" y1="26" x2="24" y2="39" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="28" y1="26" x2="28" y2="39" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="32" y1="26" x2="32" y2="39" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" strokeLinecap="round" />
      <rect width="56" height="26" rx="13.5" fill="url(#gloss)" />
    </svg>
  );
}

/* ── Dock ─────────────────────────────────────────────── */

type DockApp = { id: AppId; label: string; icon: React.ReactNode };

const APPS: DockApp[] = [
  { id: 'finder',     label: 'Finder',     icon: <FinderIcon /> },
  { id: 'terminal',   label: 'Terminal',   icon: <TerminalIcon /> },
  { id: 'projects',   label: 'Projects',   icon: <ProjectsIcon /> },
  { id: 'experience', label: 'Experience', icon: <ExperienceIcon /> },
  { id: 'research',   label: 'Research',   icon: <ResearchIcon /> },
  { id: 'notes',      label: 'Notes',      icon: <NotesIcon /> },
  { id: 'contact',    label: 'Contact',    icon: <ContactIcon /> },
  { id: 'trash',      label: 'Trash',      icon: <TrashIcon /> },
];

const BASE = 60;
const MAX_S = 1.55;
const SPREAD = 100;

function quartic(t: number) {
  return 1 + (MAX_S - 1) * t * t * (2 - t * t);
}

type Props = {
  openApps: Set<AppId>;
  focusedApp: AppId | null;
  minimizedApps: Set<AppId>;
  onAppClick: (id: AppId) => void;
};

export function Dock({ openApps, focusedApp, minimizedApps, onAppClick }: Props) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hovered, setHovered] = useState<AppId | null>(null);

  const getScale = (i: number): number => {
    if (mouseX === null || !dockRef.current) return 1;
    const rect = dockRef.current.getBoundingClientRect();
    const SLOT = BASE + 12;
    const totalW = APPS.length * SLOT - 12;
    const startX = rect.left + (rect.width - totalW) / 2;
    const cx = startX + i * SLOT + BASE / 2;
    const dist = Math.abs(mouseX - cx);
    if (dist > SPREAD) return 1;
    return quartic(1 - dist / SPREAD);
  };

  return (
    <div className="dock-wrapper">
      <div
        ref={dockRef}
        className="dock"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => { setMouseX(null); setHovered(null); }}
      >
        {APPS.map((app, i) => {
          const scale = getScale(i);
          const size = Math.round(BASE * scale);
          const lift = Math.max(0, (size - BASE) * 0.32);
          const isOpen = openApps.has(app.id);
          const isFocused = focusedApp === app.id && !minimizedApps.has(app.id);

          return (
            <div
              key={app.id}
              className="dock-item-wrapper"
              style={{ width: BASE + 12 }}
              onMouseEnter={() => setHovered(app.id)}
            >
              <AnimatePresence>
                {hovered === app.id && mouseX !== null && (
                  <motion.div
                    key="tip"
                    initial={{ opacity: 0, y: 6, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.13 }}
                    className="dock-tooltip"
                  >
                    {app.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => onAppClick(app.id)}
                animate={{ width: size, height: size, y: -lift }}
                transition={{ type: 'spring', stiffness: 550, damping: 30, mass: 0.4 }}
                className="dock-icon"
                style={{
                  boxShadow: isFocused
                    ? '0 10px 36px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.2) inset'
                    : '0 5px 18px rgba(0,0,0,0.45)',
                }}
                whileTap={{ scale: 0.86, transition: { duration: 0.09 } }}
              >
                {app.icon}
              </motion.button>

              {isOpen && app.id !== 'trash' && (
                <div className={`dock-dot${isFocused ? ' dock-dot-focused' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
