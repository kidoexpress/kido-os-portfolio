import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, FlaskConical, BookOpen, Mail, Briefcase,
  Terminal, FolderOpen, Globe, BarChart2, Brain, Leaf,
} from 'lucide-react';
import type { WinAppId } from './Taskbar';

type PinnedApp = { id: WinAppId; label: string; icon: React.ReactNode; bg: string };
type RecItem  = { label: string; sub: string; icon: React.ReactNode; bg: string };

const PINNED: PinnedApp[] = [
  { id: 'projects',   label: 'Projects',   icon: <FlaskConical size={20} />, bg: '#0078d4' },
  { id: 'research',   label: 'Research',   icon: <BookOpen size={20} />,     bg: '#5c2d91' },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={20} />,    bg: '#107c10' },
  { id: 'contact',    label: 'Contact',    icon: <Mail size={20} />,          bg: '#0099bc' },
  { id: 'terminal',   label: 'Terminal',   icon: <Terminal size={20} />,      bg: '#1a1a1a' },
  { id: 'spotify',    label: 'Spotify.exe', icon: <Globe size={20} />,        bg: '#1db954' },
];

const RECOMMENDED: RecItem[] = [
  { label: 'World Cup Performance Lab', sub: 'Sports analytics · React + D3', icon: <BarChart2 size={16} />, bg: '#0078d4' },
  { label: 'What If? Economic Simulator', sub: 'Policy simulation · Live demo', icon: <Globe size={16} />,    bg: '#107c10' },
  { label: 'NeuroDetectAI', sub: 'AI healthcare research · Python', icon: <Brain size={16} />,              bg: '#5c2d91' },
  { label: 'Salvar o Amanhã', sub: 'Climate education initiative', icon: <Leaf size={16} />,                bg: '#d83b01' },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: WinAppId) => void;
};

export function StartMenu({ open, onClose, onOpenApp }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 60); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  const filteredPins = query
    ? PINNED.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : PINNED;

  const filteredRec = query
    ? RECOMMENDED.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()))
    : RECOMMENDED;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Click-away backdrop */}
          <div
            className="fixed inset-0 z-[489]"
            onClick={onClose}
          />

          <motion.div
            className="win-startmenu"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.34, 1.1, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="startmenu-search" style={{ margin: '20px 24px 16px' }}>
              <Search size={15} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for apps, files, settings"
              />
            </div>

            {/* Pinned */}
            {filteredPins.length > 0 && (
              <>
                <div className="startmenu-section-title">Pinned</div>
                <div className="startmenu-pinned">
                  {filteredPins.map((app) => (
                    <button
                      key={app.id}
                      className="startmenu-pin"
                      onClick={() => { onOpenApp(app.id); onClose(); }}
                    >
                      <div
                        className="startmenu-pin-icon"
                        style={{ background: app.bg, color: 'white' }}
                      >
                        {app.icon}
                      </div>
                      <span className="startmenu-pin-label">{app.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="startmenu-divider" />

            {/* Recommended */}
            {filteredRec.length > 0 && (
              <>
                <div className="startmenu-section-title">Recommended</div>
                <div className="startmenu-recommended">
                  {filteredRec.map((item) => (
                    <div key={item.label} className="startmenu-rec-item">
                      <div
                        className="startmenu-rec-icon"
                        style={{ background: item.bg, color: 'white' }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', fontWeight: 400 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {query && filteredPins.length === 0 && filteredRec.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                No results for "{query}"
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 24px 14px', borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center',
                  fontSize: 12, fontWeight: 500, color: 'white',
                }}>JK</div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>João Kido</span>
              </div>
              <button className="win-btn" style={{ fontSize: 12 }}>
                <FolderOpen size={13} />
                Explorer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
