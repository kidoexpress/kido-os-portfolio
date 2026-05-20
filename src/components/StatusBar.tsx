import { useEffect, useState } from 'react';
import { Wifi, Cpu } from 'lucide-react';

type StatusBarProps = {
  activeModule: string;
  onCommandPalette: () => void;
};

const MODULE_LABELS: Record<string, string> = {
  overview: 'Overview',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
};

export function StatusBar({ activeModule, onCommandPalette }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="workspace-topbar flex items-center justify-between border-b border-line bg-void/90 backdrop-blur-md px-4">
      {/* Left: system identity */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] text-zinc-500 uppercase select-none">
          JK.workspace
        </span>
        <span className="h-3 w-px bg-line" />
        <span className="font-mono text-[0.6rem] tracking-[0.15em] text-zinc-600 uppercase select-none">
          v2.0
        </span>
      </div>

      {/* Center: breadcrumb */}
      <div className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
        <span className="text-zinc-600">workspace</span>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-400">{MODULE_LABELS[activeModule] ?? activeModule}</span>
      </div>

      {/* Right: status + cmd */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCommandPalette}
          className="hidden sm:flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-zinc-600 hover:text-zinc-400 transition-colors duration-150 cursor-pointer"
        >
          <span className="border border-line px-1.5 py-0.5">⌘K</span>
        </button>
        <div className="flex items-center gap-1.5 text-zinc-600">
          <Cpu size={11} />
          <Wifi size={11} />
        </div>
        <span className="font-mono text-[0.6rem] text-zinc-500 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
