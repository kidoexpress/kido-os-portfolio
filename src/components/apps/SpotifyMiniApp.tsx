import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type PlaylistId = 'coding' | 'focus' | 'lateNights';

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
    subtitle: 'study / coding / late-night work',
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
    subtitle: 'deep work / studying / concentration',
    description:
      'Cleaner tracks for long study blocks, reading dense papers, and staying locked into one problem at a time.',
    link: 'https://open.spotify.com/playlist/1eQNhMLiTAgevr5BtkxU7A?si=IhvgtlYfRceVAOxTQkE0Tw',
    embed: 'https://open.spotify.com/embed/playlist/1eQNhMLiTAgevr5BtkxU7A?utm_source=generator&theme=0',
    accent: '#8fb8ff',
  },
  lateNights: {
    id: 'lateNights',
    label: 'Late Nights',
    title: 'Late Nights',
    subtitle: 'ambient / reflective / quiet coding',
    description:
      'Dim-light music for slow thinking, reflective builds, and the calm part of the internet after midnight.',
    link: 'https://open.spotify.com/playlist/1WyXF5RQJZT5aqW3qfk4eH?si=gwZL40YTTUivAnFplXZ88A',
    embed: 'https://open.spotify.com/embed/playlist/1WyXF5RQJZT5aqW3qfk4eH?utm_source=generator&theme=0',
    accent: '#bda4ff',
  },
};

const playlistOrder: PlaylistId[] = ['coding', 'focus', 'lateNights'];

export function SpotifyMiniApp() {
  const [activeId, setActiveId] = useState<PlaylistId>('coding');
  const active = playlists[activeId];

  return (
    <div className="spotify-app">
      <div className="spotify-shell">
        <aside className="spotify-sidebar" aria-label="Spotify playlists">
          <div className="spotify-brand">
            <img src="/spotify-icon.png" alt="" />
            <span>Spotify</span>
          </div>

          <div className="spotify-playlist-nav">
            <span>Playlists</span>
            {playlistOrder.map((id) => (
              <button
                key={id}
                type="button"
                className={activeId === id ? 'active' : ''}
                onClick={() => setActiveId(id)}
              >
                <i style={{ backgroundColor: playlists[id].accent }} />
                <span>{playlists[id].label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="spotify-main">
          <AnimatePresence mode="wait">
            <motion.section
              key={active.id}
              className="spotify-content-simple"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="spotify-header-simple">
                <div className="spotify-header-icon">
                  <img src="/spotify-icon.png" alt="Spotify" />
                </div>
                <div className="spotify-copy">
                  <div className="spotify-eyebrow">Real playlist</div>
                  <h2>{active.title}</h2>
                  <p>{active.description}</p>
                  <span>{active.subtitle}</span>
                </div>
              </header>

              <div className="spotify-actions-simple">
                <a href={active.link} target="_blank" rel="noopener noreferrer">
                  open in spotify <ArrowUpRight size={13} />
                </a>
              </div>

              <div className="spotify-embed">
                <iframe
                  title={`${active.title} Spotify embed`}
                  src={active.embed}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              <footer className="spotify-footer">
                <span>coding • focus • late-night work • systems • coffee</span>
              </footer>
            </motion.section>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
