import { motion } from 'framer-motion'

const MotionButton = motion.button

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6 4.4 4.4 0 0 0 18.4 3S17.3 2.7 15 4.3a12.5 12.5 0 0 0-6 0C6.7 2.7 5.6 3 5.6 3A4.4 4.4 0 0 0 5.5 6a4.7 4.7 0 0 0-1.3 3.6c0 4.6 2.9 5.6 5.6 6a2.8 2.8 0 0 0-.8 2.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GridProjectCard({ project, onClick, index }) {
  const handleGithubClick = (e) => {
    e.stopPropagation()
    if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <MotionButton
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: (index % 3) * 0.02 }}
      onClick={onClick}
      type="button"
      className="project-grid-card relative overflow-hidden rounded-2xl border border-(--line) bg-(--card) p-3 text-left shadow transition-all duration-300 hover:shadow-md md:p-4"
    >
      <div className="relative z-10 flex flex-col">
        <div className="flex-1">
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
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--text-muted)">
            Tap for full details
          </p>
          {project.github && (
            <button
              type="button"
              onClick={handleGithubClick}
              aria-label="Open repository"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--line) text-(--text-muted) transition-colors duration-300 hover:border-(--accent) hover:text-(--text)"
            >
              <GithubIcon />
            </button>
          )}
        </div>
      </div>
    </MotionButton>
  )
}

export default GridProjectCard
