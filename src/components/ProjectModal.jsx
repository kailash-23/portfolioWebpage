import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = motion.div

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ProjectModal({ project, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur"
          />
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-(--line) bg-(--card) p-6 shadow-2xl md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--line) text-(--text-soft) transition hover:border-(--accent) hover:text-(--accent)"
            >
              <CloseIcon />
            </button>

            <div className="pr-8">
              <h2 className="font-heading text-2xl md:text-3xl">{project.title}</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-(--text-muted)">{project.category}</p>

              {(project.role || project.timeline || project.impact) && (
                <div className="mt-4 grid gap-2 text-xs text-(--text-muted) md:grid-cols-3">
                  {project.role && <p className="rounded-full border border-(--line) px-3 py-1">{project.role}</p>}
                  {project.timeline && <p className="rounded-full border border-(--line) px-3 py-1">{project.timeline}</p>}
                  {project.impact && <p className="rounded-full border border-(--line) px-3 py-1">{project.impact}</p>}
                </div>
              )}

              <p className="mt-6 text-base leading-relaxed text-(--text-soft) md:text-lg">{project.description}</p>

              {project.keyHighlights && (
                <div className="mt-6">
                  <h3 className="font-semibold text-(--text-primary)">Key Highlights</h3>
                  <ul className="mt-3 space-y-2 text-sm text-(--text-soft)">
                    {project.keyHighlights.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div className="mt-6">
                  <h3 className="font-semibold text-(--text-primary)">Technologies</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-(--line) px-3 py-1 text-xs text-(--text-soft)"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div className="mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-(--line) bg-(--text-primary) px-4 py-2 text-sm font-semibold text-(--bg) transition hover:opacity-90"
                  >
                    View Project
                  </a>
                </div>
              )}
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
