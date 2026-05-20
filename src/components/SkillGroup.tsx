export function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-line bg-white/[0.03] p-5">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-zinc-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
