import { motion } from 'framer-motion'

const MotionButton = motion.button

function GridProjectCard({ project, onClick, index }) {
  return (
    <MotionButton
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: (index % 3) * 0.02 }}
      onClick={onClick}
      type="button"
      className="project-grid-card relative overflow-hidden rounded-2xl border border-(--line) bg-(--card) p-3 text-left shadow transition-all duration-300 hover:shadow-md md:p-4"
    >
      <div className="relative z-10">
        <h3 className="font-heading text-base tracking-tight md:text-lg">{project.title}</h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-(--text-muted)">{project.category}</p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-(--text-soft)">{project.description}</p>

        {project.technologies && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full bg-(--accent)/10 px-2 py-0.5 text-[11px] text-(--accent)">
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--text-muted)">
          Tap for full details
        </p>
      </div>
    </MotionButton>
  )
}

export default GridProjectCard
