import type { Experience } from '../data/portfolio';

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="grid gap-4 border-t border-line py-6 sm:grid-cols-[0.85fr_2fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          {item.period}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
        <p className="text-sm text-signal">{item.organization}</p>
      </div>
      <div>
        <p className="leading-7 text-zinc-300">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs text-zinc-500">
              #{tag.replaceAll(' ', '-')}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
