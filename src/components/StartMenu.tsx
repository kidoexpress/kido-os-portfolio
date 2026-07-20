import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search, FlaskConical, BookOpen, Mail, Briefcase,
  Terminal, FolderOpen, Globe, BarChart2, Brain, Leaf, Github, Linkedin,
} from 'lucide-react';
import type { WinAppId } from './Taskbar';
import { profile } from '../data/portfolio';

type PinnedApp = { id: WinAppId; label: string; icon: React.ReactNode; bg: string };
type RecItem  = { label: string; sub: string; icon: React.ReactNode; bg: string };
type SocialResult = { label: string; sub: string; icon: React.ReactNode; action: () => void };

const PINNED: PinnedApp[] = [
  { id: 'projects',   label: 'Projects',   icon: <FlaskConical size={20} />, bg: '#0078d4' },
  { id: 'research',   label: 'Research',   icon: <BookOpen size={20} />,     bg: '#5c2d91' },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={20} />,    bg: '#107c10' },
  { id: 'contact',    label: 'Contact',    icon: <Mail size={20} />,          bg: '#0099bc' },
  { id: 'terminal',   label: 'Terminal',   icon: <Terminal size={20} />,      bg: '#1a1a1a' },
  { id: 'spotify',    label: 'Spotify',    icon: <img className="startmenu-spotify-logo" src="/spotify-icon.png" alt="" />, bg: 'rgba(255,255,255,0.04)' },
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

  const socialResults: SocialResult[] = query
    ? [
        {
          label: 'GitHub',
          sub: 'github.com/kidoexpress',
          icon: <Github size={16} />,
          action: () => window.open(profile.github, '_blank', 'noopener,noreferrer'),
        },
        {
          label: 'LinkedIn',
          sub: 'linkedin.com/in/joao-guilherme-kido-carvalho',
          icon: <Linkedin size={16} />,
          action: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
        },
        {
          label: 'Contact',
          sub: 'Open contact app',
          icon: <Mail size={16} />,
          action: () => onOpenApp('contact'),
        },
      ].filter((item) => `${item.label} ${item.sub}`.toLowerCase().includes(query.toLowerCase()))
    : [];

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
            initial={{ opacity: 0, y: 14, scale: 0.976 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.984, transition: { duration: 0.12, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="startmenu-search">
              <Search size={14} style={{ color: 'rgba(255,255,255,0.32)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, files, settings"
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

            {socialResults.length > 0 && (
              <>
                <div className="startmenu-section-title">Search results</div>
                <div className="startmenu-recommended">
                  {socialResults.map((item) => (
                    <button
                      key={item.label}
                      className="startmenu-rec-item startmenu-action-result"
                      onClick={() => { item.action(); onClose(); }}
                    >
                      <div className="startmenu-rec-icon social">
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
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Recommended */}
            {filteredRec.length > 0 && socialResults.length === 0 && (
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

            {query && filteredPins.length === 0 && filteredRec.length === 0 && socialResults.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                No results for "{query}"
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 20px 14px', borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0078d4, #005a9e)',
                  display: 'grid', placeItems: 'center',
                  fontSize: 11.5, fontWeight: 600, color: 'white',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.30)',
                }}>JK</div>
                <div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.80)', fontWeight: 500, lineHeight: 1.2 }}>João Kido</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.30)', marginTop: 1 }}>UC Berkeley · CS</div>
                </div>
              </div>
              <button
                className="win-btn"
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 7 }}
                onClick={() => { onOpenApp('explorer'); onClose(); }}
              >
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
