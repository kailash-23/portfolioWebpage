import { motion } from 'framer-motion'

const MotionButton = motion.button

function FlagshipProjectCard({ project, onClick, index }) {
  return (
    <MotionButton
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      onClick={onClick}
      type="button"
      className="flagship-card group relative overflow-hidden rounded-3xl border border-(--line) bg-linear-to-br from-(--card) to-(--card) p-8 text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-(--accent) hover:shadow-xl md:p-10"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-(--accent)/15 blur-2xl transition group-hover:bg-(--accent)/25" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-(--accent)/10 blur-xl" />

      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-(--accent) px-3 py-1 text-xs font-semibold uppercase tracking-wider text-(--accent)">
          FLAGSHIP
        </span>
        <h3 className="font-heading mt-4 text-2xl leading-tight md:text-3xl">{project.title}</h3>
        <p className="mt-2 text-sm text-(--text-muted)">{project.category}</p>
        <div className="mt-4 grid gap-2 text-xs text-(--text-muted) md:grid-cols-2">
          <p className="rounded-full border border-(--line) px-3 py-1">{project.role}</p>
          <p className="rounded-full border border-(--line) px-3 py-1">{project.timeline}</p>
        </div>
        <p className="mt-4 text-sm font-semibold text-(--accent)">{project.impact}</p>
        <p className="mt-4 leading-relaxed text-(--text-soft)">{project.description}</p>

        {project.keyHighlights && (
          <div className="mt-4 space-y-1 text-sm text-(--text-muted)">
            {project.keyHighlights.slice(0, 2).map((point) => (
              <p key={point}>✓ {point}</p>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center text-sm font-semibold text-(--accent)">
          Learn more
          <svg className="ml-2 h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </MotionButton>
  )
}

export default FlagshipProjectCard
