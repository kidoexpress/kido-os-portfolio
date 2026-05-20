type SpotifyLogoProps = {
  size?: number;
  className?: string;
};

export function SpotifyLogo({ size = 32, className }: SpotifyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Spotify"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="#1DB954" />
      <path
        d="M19.2 24.6c9.1-2.8 19.8-1.7 27.2 2.7"
        fill="none"
        stroke="#07130b"
        strokeLinecap="round"
        strokeWidth="5.4"
      />
      <path
        d="M21.2 32.2c7.5-2.2 16.2-1.4 22.2 2.1"
        fill="none"
        stroke="#07130b"
        strokeLinecap="round"
        strokeWidth="4.3"
      />
      <path
        d="M23.1 39.1c5.8-1.6 12.3-1.1 16.9 1.6"
        fill="none"
        stroke="#07130b"
        strokeLinecap="round"
        strokeWidth="3.5"
      />
    </svg>
  );
}
