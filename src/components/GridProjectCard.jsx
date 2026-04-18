import { motion } from 'framer-motion'

const MotionButton = motion.button

function GridProjectCard({ project, onClick, index }) {
  return (
    <MotionButton
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      onClick={onClick}
      type="button"
      className="project-grid-card group relative overflow-hidden rounded-2xl border border-(--line) bg-(--card) p-5 text-left shadow transition-all duration-300 hover:-translate-y-1 hover:border-(--accent) md:p-6"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-(--accent)/10 blur-lg transition group-hover:bg-(--accent)/20" />

      <div className="relative z-10">
        <h3 className="font-heading text-lg tracking-tight">{project.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-(--text-muted)">{project.category}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-(--text-soft)">{project.description}</p>

        {project.technologies && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full bg-(--accent)/10 px-2 py-1 text-xs text-(--accent)">
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-(--text-muted)">
          Tap for full details
        </p>
      </div>
    </MotionButton>
  )
}

export default GridProjectCard
