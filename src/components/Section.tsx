import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type SectionProps = PropsWithChildren<{
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}>;

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mb-10 max-w-3xl"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-signal">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        {intro ? <p className="mt-4 text-base leading-8 text-mist">{intro}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}
