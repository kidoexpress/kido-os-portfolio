import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type PlaylistId = 'coding' | 'focus' | 'chilling' | 'lateNights';

const playlists: Record<PlaylistId, {
  id: PlaylistId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  embed: string;
  accent: string;
}> = {
  coding: {
    id: 'coding',
    label: 'Coding',
    title: 'Coding Playlist',
    subtitle: 'study · coding · late-night work',
    description:
      'Songs I usually listen to while studying, building, debugging, or pretending I will only fix one last thing.',
    link: 'https://open.spotify.com/playlist/05JM7fctnFgFRFcHnJ3qqu?si=K7Kfo7zIQw6uiB41VoYvLg',
    embed: 'https://open.spotify.com/embed/playlist/05JM7fctnFgFRFcHnJ3qqu?utm_source=generator&theme=0',
    accent: '#1ed760',
  },
  focus: {
    id: 'focus',
    label: 'Focus',
    title: 'Focus Playlist',
    subtitle: 'deep work · studying · concentration',
    description:
      'Cleaner tracks for long study blocks, reading dense papers, and staying locked into one problem at a time.',
    link: 'https://open.spotify.com/playlist/1eQNhMLiTAgevr5BtkxU7A?si=IhvgtlYfRceVAOxTQkE0Tw',
    embed: 'https://open.spotify.com/embed/playlist/1eQNhMLiTAgevr5BtkxU7A?utm_source=generator&theme=0',
    accent: '#60a5fa',
  },
  chilling: {
    id: 'chilling',
    label: 'Chilling',
    title: 'Chilling',
    subtitle: 'ambient · reflective · slow thinking',
    description:
      'Dim-light music for slow thinking, reflective builds, and the calm part of the internet after midnight.',
    link: 'https://open.spotify.com/playlist/1WyXF5RQJZT5aqW3qfk4eH?si=rtFtZICjQuC9ujT_KmKvhw',
    embed: 'https://open.spotify.com/embed/playlist/1WyXF5RQJZT5aqW3qfk4eH?utm_source=generator&theme=0',
    accent: '#c084fc',
  },
  lateNights: {
    id: 'lateNights',
    label: 'Late Nights',
    title: 'Late Nights',
    subtitle: 'midnight · focused · atmospheric',
    description:
      'Built for the 1am sessions. When the world is quiet and the code starts making sense.',
    link: 'https://open.spotify.com/playlist/59Eaz8DrWYD5GYUfVUpZn2?si=rAX-z-iMSjuN0-97pNf8ew',
    embed: 'https://open.spotify.com/embed/playlist/59Eaz8DrWYD5GYUfVUpZn2?utm_source=generator&theme=0',
    accent: '#fb923c',
  },
};

const playlistOrder: PlaylistId[] = ['coding', 'focus', 'chilling', 'lateNights'];

/* ── Minimal animated equalizer ─────────────────── */
function Equalizer({ color }: { color: string }) {
  return (
    <span className="sp-eq" aria-hidden="true">
      <span style={{ background: color }} />
      <span style={{ background: color }} />
      <span style={{ background: color }} />
    </span>
  );
}

export function SpotifyMiniApp() {
  const [activeId, setActiveId] = useState<PlaylistId>('coding');
  const active = playlists[activeId];

  return (
    <div className="spotify-app">
      <div className="spotify-shell">

        {/* ── Sidebar ──────────────────────────────── */}
        <aside className="spotify-sidebar" aria-label="Playlists">
          <div className="spotify-brand">
            <img src="/spotify-icon.png" alt="" />
            <span>Spotify</span>
          </div>

          <nav className="spotify-playlist-nav">
            <span className="sp-nav-heading">Playlists</span>
            {playlistOrder.map((id) => {
              const pl  = playlists[id];
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`sp-nav-btn${isActive ? ' active' : ''}`}
                  onClick={() => setActiveId(id)}
                >
                  <i className="sp-dot" style={{ background: pl.accent }} />
                  <span className="sp-nav-label">{pl.label}</span>
                  {isActive && <Equalizer color={pl.accent} />}
                </button>
              );
            })}
          </nav>

          <div className="sp-sidebar-footer">
            <span>João's picks</span>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────── */}
        <main className="spotify-main">
          <AnimatePresence mode="wait">
            <motion.section
              key={active.id}
              className="sp-content"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header card */}
              <div className="sp-header" style={{ '--accent': active.accent } as React.CSSProperties}>
                <div className="sp-header-icon">
                  <img src="/spotify-icon.png" alt="Spotify" />
                </div>
                <div className="sp-header-copy">
                  <div className="sp-eyebrow">Real playlist</div>
                  <h2 className="sp-title">{active.title}</h2>
                  <p className="sp-desc">{active.description}</p>
                  <span className="sp-subtitle">{active.subtitle}</span>
                </div>
                <a
                  className="sp-open-btn"
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open <ArrowUpRight size={12} />
                </a>
              </div>

              {/* Embed */}
              <div className="sp-embed">
                <iframe
                  key={active.embed}
                  title={`${active.title} — Spotify`}
                  src={active.embed}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              {/* Footer tags */}
              <footer className="sp-footer">
                <span>coding · focus · late-night work · caffeine · systems</span>
              </footer>
            </motion.section>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
