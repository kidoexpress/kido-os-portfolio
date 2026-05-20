import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mail, Briefcase, Folder,
  Terminal as TerminalIcon, Trash2, Monitor, User,
} from 'lucide-react';
import { Window } from './Window';
import { Taskbar, type WinAppId } from './Taskbar';
import { StartMenu } from './StartMenu';
import { Terminal } from './apps/Terminal';
import { FileExplorer } from './apps/FileExplorer';

/* ── Viewport-aware terminal dimensions ───────────────── */
const TERM_W = Math.min(720, window.innerWidth  - 96);
const TERM_H = Math.min(460, window.innerHeight - 120);

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
      <text x="7" y="30" fill="#3ddc84" fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700">&gt;_</text>
    </svg>
  );
}

/* ── App registry ─────────────────────────────────────── */

type AppConfig = {
  id: WinAppId;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<{ onOpenApp?: (app: string) => void }>;
  width: number;
  height: number;
};

const APPS: AppConfig[] = [
  { id: 'about',      title: 'About Me',        icon: <User size={13} />,         component: () => <FileExplorer initialSection="home" />,       width: 680, height: 480 },
  { id: 'terminal',   title: 'Command Prompt',  icon: <TerminalIcon size={13} />, component: Terminal,                                            width: TERM_W, height: TERM_H },
  { id: 'projects',   title: 'Projects',        icon: <Folder size={13} />,       component: () => <FileExplorer initialSection="projects" />,   width: 820, height: 520 },
  { id: 'research',   title: 'Research',        icon: <Folder size={13} />,       component: () => <FileExplorer initialSection="research" />,   width: 720, height: 480 },
  { id: 'experience', title: 'Experience',      icon: <Briefcase size={13} />,    component: () => <FileExplorer initialSection="experience" />, width: 720, height: 520 },
  { id: 'contact',    title: 'Contact',         icon: <Mail size={13} />,         component: () => <FileExplorer initialSection="contact" />,    width: 560, height: 440 },
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

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onDragStart={() => { hasDragged.current = true; }}
      onDragEnd={() => { setTimeout(() => { hasDragged.current = false; }, 80); }}
      onClick={(e) => { e.stopPropagation(); if (!hasDragged.current) onSelect(icon.id); }}
      onDoubleClick={(e) => { e.stopPropagation(); if (!hasDragged.current) { icon.action(); onSelect(null); } }}
      className={`desktop-icon${selected === icon.id ? ' selected' : ''}`}
      style={{ left: icon.initialX, top: icon.initialY, zIndex: 10 }}
      whileTap={{ scale: 0.93 }}
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
            y: Math.max(20,  Math.round((vh - cfg.height) / 2) + c),
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

  useEffect(() => {
    const t1 = setTimeout(() => openApp('terminal'), 500);
    const t2 = setTimeout(() => showNotif('Welcome to KidoOS — double-click icons to open apps.'), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [openApp, showNotif]);

  const focusedApp = (focusOrder[focusOrder.length - 1] as WinAppId) ?? null;

  const DESKTOP_ICONS: IconDef[] = [
    {
      id: 'about', label: 'About Me', initialX: 14, initialY: 14,
      action: () => openApp('about'),
      iconEl: <User size={42} style={{ color: '#90caf9', filter: shadow('rgba(0,80,200,0.45)') }} />,
    },
    {
      id: 'projects', label: 'Projects', initialX: 14, initialY: 114,
      action: () => openApp('projects'),
      iconEl: <Folder size={42} style={{ color: '#ffb74d', filter: shadow('rgba(200,100,0,0.45)') }} />,
    },
    {
      id: 'experience', label: 'Experience', initialX: 14, initialY: 214,
      action: () => openApp('experience'),
      iconEl: <Briefcase size={42} style={{ color: '#81c784', filter: shadow('rgba(0,120,60,0.4)') }} />,
    },
    {
      id: 'terminal', label: 'Terminal', initialX: 14, initialY: 314,
      action: () => openApp('terminal'),
      iconEl: <CmdIcon />,
    },
    {
      id: 'contact', label: 'Contact', initialX: 14, initialY: 414,
      action: () => openApp('contact'),
      iconEl: <Mail size={42} style={{ color: '#64b5f6', filter: shadow('rgba(0,80,200,0.4)') }} />,
    },
    {
      id: 'recycle', label: 'Recycle Bin', initialX: 14, initialY: 514,
      action: () => showNotif('Recycle Bin is empty.'),
      iconEl: <Trash2 size={42} style={{ color: 'rgba(255,255,255,0.52)', filter: shadow('rgba(0,0,0,0.5)') }} />,
    },
  ];

  return (
    <div
      className="win-desktop"
      ref={constraintsRef}
      onClick={() => { setSelected(null); if (startOpen) setStartOpen(false); }}
    >
      <div className="win-wallpaper" />

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
            <AppComp onOpenApp={(id) => openApp(id as WinAppId)} />
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
