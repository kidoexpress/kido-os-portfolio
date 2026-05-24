import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import {
  Mail, Briefcase, Folder,
  Terminal as TerminalIcon, Trash2, Monitor, User, Download,
  FlaskConical, ShieldAlert, Trophy, AlertTriangle, Moon, Star, Cloud,
} from 'lucide-react';
import { Window } from './Window';
import { Taskbar, type WinAppId } from './Taskbar';
import { StartMenu } from './StartMenu';
import { Terminal } from './apps/Terminal';
import { FileExplorer } from './apps/FileExplorer';
import { SpotifyMiniApp } from './apps/SpotifyMiniApp';
import { RecycleBinApp } from './apps/RecycleBinApp';
import { WorldCupSimulator } from './apps/WorldCupSimulator';
import { ResearchLabApp } from './apps/ResearchLabApp';
import { FakeSystemApp } from './apps/FakeSystemApp';
import { ChaosApp } from './apps/ChaosApp';

/* ── Viewport-aware terminal dimensions ───────────────── */
const TERM_W = Math.min(620, window.innerWidth  - 96);
const TERM_H = Math.min(410, window.innerHeight - 120);
const SPOTIFY_W = Math.min(640, window.innerWidth - 96);
const SPOTIFY_H = Math.min(600, Math.max(460, window.innerHeight - 172));

/* ── Icon drop-shadow helper ──────────────────────────── */
const shadow = (color: string) =>
  `drop-shadow(0 2px 8px ${color}) drop-shadow(0 1px 3px rgba(0,0,0,0.7))`;

/* ── Terminal CMD icon ────────────────────────────────── */
function CmdIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="1.5" y="3.5" width="41" height="33" rx="5" fill="#111" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"/>
      <rect x="1.5" y="3.5" width="41" height="11" rx="5" fill="#1e1e1e"/>
      <rect x="1.5" y="10" width="41" height="5" fill="#1e1e1e"/>
      <text x="7" y="30" fill="#f5f5f5" fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700">&gt;_</text>
    </svg>
  );
}

function PixelIcon({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <div
      className="pixel-icon"
      style={{
        background: bg,
        color: fg,
        boxShadow: `0 8px 18px ${bg}55, inset -4px -4px 0 rgba(0,0,0,0.18), inset 4px 4px 0 rgba(255,255,255,0.18)`,
      }}
    >
      {label}
    </div>
  );
}

/* ── App registry ─────────────────────────────────────── */

type AppConfig = {
  id: WinAppId;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<{
    onOpenApp?: (app: string) => void;
    onChaos?: () => void;
  }>;
  width: number;
  height: number;
};

const APPS: AppConfig[] = [
  { id: 'about',      title: 'About Me',        icon: <User size={13} />,         component: () => <FileExplorer initialSection="home" />,       width: 800, height: 570 },
  { id: 'terminal',   title: 'Command Prompt',  icon: <TerminalIcon size={13} />, component: Terminal,                                            width: TERM_W, height: TERM_H },
  { id: 'projects',   title: 'Projects',        icon: <Folder size={13} />,       component: () => <FileExplorer initialSection="projects" />,   width: 820, height: 520 },
  { id: 'research',   title: 'Research',        icon: <Folder size={13} />,       component: () => <FileExplorer initialSection="research" />,   width: 720, height: 480 },
  { id: 'experience', title: 'Experience',      icon: <Briefcase size={13} />,    component: () => <FileExplorer initialSection="experience" />, width: 720, height: 520 },
  { id: 'contact',    title: 'Contact',         icon: <Mail size={13} />,         component: () => <FileExplorer initialSection="contact" />,    width: 560, height: 440 },
  { id: 'spotify',    title: 'Spotify',         icon: <img className="spotify-titlebar-logo" src="/spotify-icon.png" alt="" />, component: SpotifyMiniApp, width: SPOTIFY_W, height: SPOTIFY_H },
  { id: 'downloads',  title: 'Downloads',       icon: <Download size={13} />,     component: () => <FakeSystemApp title="Downloads" subtitle="Recently downloaded lore" lines={['resume_actual_latest.pdf', 'berkeley_deadline_survival_kit.zip', 'tiny_product_ideas.txt', 'worldcup_model_notes.csv']} />, width: 520, height: 380 },
  { id: 'recycle',    title: 'Recycle Bin',     icon: <Trash2 size={13} />,       component: RecycleBinApp,                                       width: 560, height: 400 },
  { id: 'researchLab', title: 'Research Lab',   icon: <FlaskConical size={13} />, component: ResearchLabApp,                                      width: 660, height: 500 },
  { id: 'conspiracy', title: 'Conspiracy.exe',  icon: <ShieldAlert size={13} />,  component: () => <FakeSystemApp title="Conspiracy.exe" subtitle="Totally normal project board" lines={['Why do all TODOs reproduce after midnight?', 'Is the perfect README hiding in plain sight?', 'Evidence suggests football analytics can predict vibes.', 'Conclusion: more coffee required.']} />, width: 520, height: 420 },
  { id: 'worldCupSim', title: 'WorldCupSim.exe', icon: <Trophy size={13} />,       component: WorldCupSimulator,                                   width: 560, height: 480 },
  { id: 'chaos',      title: 'DO_NOT_OPEN.exe', icon: <AlertTriangle size={13} />, component: ChaosApp,                                            width: 420, height: 320 },
];

/* ── Desktop icon ─────────────────────────────────────── */

type IconDef = {
  id: string;
  label: string;
  iconEl: React.ReactNode;
  action: () => void;
  initialX: number;
  initialY: number;
};

const ICON_W = 96;
const ICON_H = 96;
const GRID_X = 108;
const GRID_Y = 112;
const GRID_ORIGIN_X = 24;
const GRID_ORIGIN_Y = 22;

const snapToGrid = (value: number, origin: number, step: number) =>
  Math.round((value - origin) / step) * step + origin;

function DraggableIcon({
  icon,
  selected,
  onSelect,
  constraintsRef,
}: {
  icon: IconDef;
  selected: string | null;
  onSelect: (id: string | null) => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const hasDragged = useRef(false);
  const x = useMotionValue(icon.initialX);
  const y = useMotionValue(icon.initialY);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={constraintsRef}
      onDragStart={() => { hasDragged.current = true; }}
      onDragEnd={() => {
        const maxX = Math.max(GRID_ORIGIN_X, window.innerWidth - ICON_W - 18);
        const maxY = Math.max(GRID_ORIGIN_Y, window.innerHeight - ICON_H - 78);
        x.set(Math.min(maxX, Math.max(GRID_ORIGIN_X, snapToGrid(x.get(), GRID_ORIGIN_X, GRID_X))));
        y.set(Math.min(maxY, Math.max(GRID_ORIGIN_Y, snapToGrid(y.get(), GRID_ORIGIN_Y, GRID_Y))));
        setTimeout(() => { hasDragged.current = false; }, 100);
      }}
      onClick={(e) => { e.stopPropagation(); if (!hasDragged.current) onSelect(icon.id); }}
      onDoubleClick={(e) => { e.stopPropagation(); if (!hasDragged.current) { icon.action(); onSelect(null); } }}
      className={`desktop-icon${selected === icon.id ? ' selected' : ''}`}
      style={{ x, y, zIndex: 10 }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="desktop-icon-img">{icon.iconEl}</div>
      <span className="desktop-icon-label">{icon.label}</span>
    </motion.div>
  );
}

/* ── Desktop ──────────────────────────────────────────── */

export function Desktop() {
  const [openApps, setOpenApps]     = useState<Set<WinAppId>>(new Set());
  const [minimized, setMinimized]   = useState<Set<WinAppId>>(new Set());
  const [focusOrder, setFocusOrder] = useState<WinAppId[]>([]);
  const [startOpen, setStartOpen]   = useState(false);
  const [selected, setSelected]     = useState<string | null>(null);
  const [notification, setNotification] = useState<{ msg: string; id: number } | null>(null);
  const [chaosActive, setChaosActive] = useState(false);
  const constraintsRef  = useRef<HTMLDivElement>(null);
  const notifId         = useRef(0);
  const windowPosMap    = useRef<Map<WinAppId, { x: number; y: number }>>(new Map());
  const openCount       = useRef(0);

  const focusApp = useCallback((id: WinAppId) =>
    setFocusOrder((prev) => [...prev.filter((x) => x !== id), id]), []);

  const openApp = useCallback((id: WinAppId) => {
    setOpenApps((prev) => {
      if (!prev.has(id)) {
        const cfg = APPS.find((a) => a.id === id);
        if (cfg && !windowPosMap.current.has(id)) {
          const vw = window.innerWidth;
          const vh = window.innerHeight - 54;
          const c  = (openCount.current % 6) * 28;
          windowPosMap.current.set(id, {
            x: Math.max(100, Math.round((vw - cfg.width)  / 2) + c),
            y: Math.max(20,  Math.round((vh - (cfg.height + 44)) / 2) + c),
          });
          openCount.current++;
        }
      }
      return new Set([...prev, id]);
    });
    setMinimized((prev) => { const s = new Set(prev); s.delete(id); return s; });
    focusApp(id);
    setStartOpen(false);
  }, [focusApp]);

  const closeApp = useCallback((id: WinAppId) => {
    setOpenApps((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setMinimized((prev) => { const s = new Set(prev); s.delete(id); return s; });
    setFocusOrder((prev) => prev.filter((x) => x !== id));
    windowPosMap.current.delete(id);
  }, []);

  const toggleMinimize = useCallback((id: WinAppId) => {
    if (minimized.has(id)) {
      setMinimized((prev) => { const s = new Set(prev); s.delete(id); return s; });
      focusApp(id);
    } else {
      setMinimized((prev) => new Set([...prev, id]));
    }
  }, [minimized, focusApp]);

  const handleTaskbarClick = useCallback((id: WinAppId) => {
    if (!openApps.has(id)) { openApp(id); return; }
    const topVisible = focusOrder[focusOrder.length - 1] === id && !minimized.has(id);
    if (topVisible) toggleMinimize(id);
    else {
      setMinimized((prev) => { const s = new Set(prev); s.delete(id); return s; });
      focusApp(id);
    }
  }, [openApps, focusOrder, minimized, openApp, toggleMinimize, focusApp]);

  const showNotif = useCallback((msg: string) => {
    const id = ++notifId.current;
    setNotification({ msg, id });
    setTimeout(() => setNotification((n) => n?.id === id ? null : n), 4500);
  }, []);

  const triggerChaos = useCallback(() => {
    setChaosActive(true);
    showNotif('Relax. Just testing your reflexes.');
    setTimeout(() => setChaosActive(false), 1800);
  }, [showNotif]);

  useEffect(() => {
    const t1 = setTimeout(() => openApp('terminal'), 500);
    const t2 = setTimeout(() => showNotif('Welcome to KidoOS — double-click icons to open apps.'), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [openApp, showNotif]);

  const focusedApp = (focusOrder[focusOrder.length - 1] as WinAppId) ?? null;

  const DESKTOP_ICONS: IconDef[] = [
    {
      id: 'about', label: 'About Me', initialX: 24, initialY: 22,
      action: () => openApp('about'),
      iconEl: <User size={42} style={{ color: '#90caf9', filter: shadow('rgba(0,80,200,0.45)') }} />,
    },
    {
      id: 'projects', label: 'Projects', initialX: 24, initialY: 134,
      action: () => openApp('projects'),
      iconEl: <Folder size={42} style={{ color: '#ffb74d', filter: shadow('rgba(200,100,0,0.45)') }} />,
    },
    {
      id: 'experience', label: 'Experience', initialX: 24, initialY: 246,
      action: () => openApp('experience'),
      iconEl: <Briefcase size={42} style={{ color: '#81c784', filter: shadow('rgba(0,120,60,0.4)') }} />,
    },
    {
      id: 'terminal', label: 'Terminal', initialX: 24, initialY: 358,
      action: () => openApp('terminal'),
      iconEl: <CmdIcon />,
    },
    {
      id: 'spotify', label: 'Spotify', initialX: 132, initialY: 22,
      action: () => openApp('spotify'),
      iconEl: <img className="spotify-desktop-logo" src="/spotify-icon.png" alt="" />,
    },
    {
      id: 'contact', label: 'Contact', initialX: 24, initialY: 470,
      action: () => openApp('contact'),
      iconEl: <Mail size={42} style={{ color: '#64b5f6', filter: shadow('rgba(0,80,200,0.4)') }} />,
    },
    {
      id: 'recycle', label: 'Recycle Bin', initialX: 24, initialY: 582,
      action: () => openApp('recycle'),
      iconEl: <Trash2 size={42} style={{ color: 'rgba(255,255,255,0.52)', filter: shadow('rgba(0,0,0,0.5)') }} />,
    },
  ];

  return (
    <div
      className={`win-desktop${chaosActive ? ' chaos-active' : ''}`}
      ref={constraintsRef}
      onClick={() => { setSelected(null); if (startOpen) setStartOpen(false); }}
    >
      <div className="win-wallpaper" />
      <button
        className="wallpaper-hotspot moon"
        title="moon"
        onClick={(e) => { e.stopPropagation(); showNotif('Moon says: ship small, iterate honestly.'); }}
      >
        <Moon size={16} />
      </button>
      <button
        className="wallpaper-hotspot star"
        title="star"
        onClick={(e) => { e.stopPropagation(); showNotif('Tiny star opened a suspicious playlist.'); openApp('spotify'); }}
      >
        <Star size={13} />
      </button>
      <button
        className="wallpaper-hotspot cloud"
        title="cloud"
        onClick={(e) => { e.stopPropagation(); showNotif('Cloud backup failed: too many unfinished side projects.'); }}
      >
        <Cloud size={18} />
      </button>

      {DESKTOP_ICONS.map((icon) => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          selected={selected}
          onSelect={setSelected}
          constraintsRef={constraintsRef}
        />
      ))}

      {APPS.map((cfg) => {
        if (!openApps.has(cfg.id)) return null;
        const zIndex    = 20 + focusOrder.indexOf(cfg.id);
        const isFocused = focusedApp === cfg.id;
        const pos       = windowPosMap.current.get(cfg.id) ?? { x: 100, y: 60 };
        const AppComp   = cfg.component;
        return (
          <Window
            key={cfg.id}
            id={cfg.id}
            title={cfg.title}
            icon={cfg.icon}
            zIndex={zIndex}
            initialX={pos.x}
            initialY={pos.y}
            width={cfg.width}
            height={cfg.height}
            minimized={minimized.has(cfg.id)}
            focused={isFocused}
            onClose={() => closeApp(cfg.id)}
            onMinimize={() => toggleMinimize(cfg.id)}
            onFocus={() => focusApp(cfg.id)}
            constraintsRef={constraintsRef}
          >
            <AppComp
              onOpenApp={(id) => openApp(id as WinAppId)}
              onChaos={triggerChaos}
            />
          </Window>
        );
      })}

      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            className="win-notification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.22 }}
          >
            <div className="win-notif-icon"><Monitor size={13} style={{ color: 'white' }} /></div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 2 }}>KidoOS</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)' }}>{notification.msg}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onOpenApp={(id) => openApp(id)} />

      <Taskbar
        openApps={openApps}
        focusedApp={focusedApp}
        startOpen={startOpen}
        onAppClick={handleTaskbarClick}
        onStartClick={() => setStartOpen((v) => !v)}
      />
    </div>
  );
}
