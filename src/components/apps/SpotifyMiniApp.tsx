import { ArrowUpRight } from 'lucide-react';

const PLAYLIST_LINK =
  'https://open.spotify.com/playlist/05JM7fctnFgFRFcHnJ3qqu?si=K7Kfo7zIQw6uiB41VoYvLg';
const PLAYLIST_URL =
  'https://open.spotify.com/embed/playlist/05JM7fctnFgFRFcHnJ3qqu?utm_source=generator&theme=0';

export function SpotifyMiniApp() {
  return (
    <div className="spotify-app">
      <div className="spotify-shell">
        <header className="spotify-header">
          <div className="spotify-heading-row">
            <div className="spotify-header-icon">
              <img src="/spotify-icon.png" alt="Spotify" />
            </div>
            <div>
              <div className="spotify-eyebrow">Real playlist</div>
              <h2>Coding Playlist</h2>
            </div>
          </div>
          <p>
            Songs I usually listen to while studying, building, debugging, or
            pretending I will only fix one last thing.
          </p>
          <span className="spotify-subtitle">study / coding / late-night work</span>
        </header>

        <div className="spotify-embed">
          <iframe
            title="Coding Playlist Spotify embed"
            src={PLAYLIST_URL}
            width="100%"
            height="360"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        <footer className="spotify-footer">
          <span>coding • late-night debugging • focus • systems • coffee</span>
          <a href={PLAYLIST_LINK} target="_blank" rel="noopener noreferrer">
            open in spotify <ArrowUpRight size={13} />
          </a>
        </footer>
      </div>
    </div>
  );
}
