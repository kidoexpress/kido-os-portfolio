import { useEffect, useState } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';
import type { AppId } from './Dock';

type Props = {
  onOpenApp: (id: AppId) => void;
  onSearch?: () => void;
  activeApp?: string;
};

const NAV: { label: string; id: AppId }[] = [
  { label: 'Portfolio', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export function MenuBar({ onOpenApp, onSearch, activeApp = 'KidoOS' }: Props) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDate(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="menubar">
      {/* Left */}
      <div className="flex items-center">
        {/* Logo / brand */}
        <button className="menubar-logo" onClick={() => onOpenApp('terminal')}>⌘</button>

        {/* Active app name */}
        <span className="menubar-app-name">{activeApp}</span>

        {/* Divider */}
        <div className="menubar-divider" />

        {/* Nav items */}
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenApp(item.id)}
            className="menubar-item"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: system tray */}
      <div className="menubar-tray">
        <Wifi size={13} strokeWidth={1.7} className="menubar-tray-icon" />
        <Battery size={14} strokeWidth={1.7} className="menubar-tray-icon" />
        <Search
          size={12}
          strokeWidth={1.7}
          className="menubar-tray-icon"
          onClick={() => onSearch?.()}
          style={{ cursor: 'pointer' }}
          title="⌘K"
        />
        <div className="menubar-tray-divider" />
        <span className="menubar-clock">{date}&nbsp;&nbsp;{time}</span>
      </div>
    </div>
  );
}
