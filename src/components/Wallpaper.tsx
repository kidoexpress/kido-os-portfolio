type Props = { dimmed?: boolean };

export function Wallpaper({ dimmed }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Full-bleed image — no blur, no heavy filter */}
      <img
        src="/wallpaper.jpg"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: dimmed
            ? 'blur(24px) brightness(0.4) saturate(0.75)'
            : 'none',
          transition: 'filter 0.6s ease',
        }}
      />
      {/* Light overlay only — like a real macOS wallpaper */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: dimmed
            ? 'rgba(0,0,0,0.5)'
            : 'rgba(0,0,0,0.18)',
          transition: 'background 0.6s ease',
        }}
      />
    </div>
  );
}
