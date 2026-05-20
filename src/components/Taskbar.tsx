import { useEffect, useState } from 'react';
import { User, Terminal, Folder, BookOpen, Briefcase, Mail, Wifi, Volume2, Battery } from 'lucide-react';

export type WinAppId =
  | 'about' | 'terminal' | 'projects' | 'research' | 'experience' | 'contact'
  | 'spotify' | 'downloads' | 'recycle' | 'researchLab' | 'conspiracy' | 'worldCupSim' | 'chaos';

type TaskbarApp = { id: WinAppId; label: string; icon: React.ReactNode };

const APPS: TaskbarApp[] = [
  { id: 'about',      label: 'About Me',       icon: <User size={18} /> },
  { id: 'terminal',   label: 'Command Prompt', icon: <Terminal size={18} /> },
  { id: 'projects',   label: 'Projects',       icon: <Folder size={18} /> },
  { id: 'research',   label: 'Research',       icon: <BookOpen size={18} /> },
  { id: 'experience', label: 'Experience',     icon: <Briefcase size={18} /> },
  { id: 'contact',    label: 'Contact',        icon: <Mail size={18} /> },
  { id: 'spotify',    label: 'Spotify.exe',    icon: <img className="spotify-taskbar-logo" src="/spotify-icon.png" alt="" /> },
];

type Props = {
  openApps: Set<WinAppId>;
  focusedApp: WinAppId | null;
  startOpen: boolean;
  onAppClick: (id: WinAppId) => void;
  onStartClick: () => void;
};

export function Taskbar({ openApps, focusedApp, startOpen, onAppClick, onStartClick }: Props) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-taskbar">
      {/* Start button — absolutely left */}
      <button
        className={`taskbar-start${startOpen ? ' open' : ''}`}
        onClick={onStartClick}
        title="Start"
      >
        <WindowsLogo />
      </button>

      {/* App icons — absolutely centered */}
      <div className="taskbar-center">
        {APPS.map((app) => {
          const isOpen    = openApps.has(app.id);
          const isFocused = focusedApp === app.id;
          return (
            <button
              key={app.id}
              className={`taskbar-btn${isFocused ? ' active' : ''} ${isOpen ? 'has-dot' : ''}`}
              onClick={() => onAppClick(app.id)}
              title={app.label}
            >
              {app.icon}
              {isOpen && <span className="taskbar-btn-indicator" />}
            </button>
          );
        })}
      </div>

      {/* System tray — absolutely right */}
      <div className="taskbar-tray">
        <button className="tray-btn" title="Wi-Fi"><Wifi size={14} strokeWidth={1.8} /></button>
        <button className="tray-btn" title="Volume"><Volume2 size={14} strokeWidth={1.8} /></button>
        <button className="tray-btn" title="Battery"><Battery size={14} strokeWidth={1.8} /></button>
        <div className="tray-clock">
          <span style={{ fontSize: 12 }}>{time}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{date}</span>
        </div>
      </div>
    </div>
  );
}

function WindowsLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0"   y="0"   width="8.3" height="8.3" rx="1" fill="rgba(255,255,255,0.85)" />
      <rect x="9.7" y="0"   width="8.3" height="8.3" rx="1" fill="rgba(255,255,255,0.85)" />
      <rect x="0"   y="9.7" width="8.3" height="8.3" rx="1" fill="rgba(255,255,255,0.85)" />
      <rect x="9.7" y="9.7" width="8.3" height="8.3" rx="1" fill="rgba(255,255,255,0.85)" />
    </svg>
  );
}
