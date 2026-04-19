import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = motion.div

const projectVisualImages = {
  signglove: '/images/IGCS.jpeg',
  smarthome: '/images/homeassistant.jpeg',
  forma: '/images/Forma.jpeg',
  qnot: '/images/QNOT-app.jpeg',
  attendance: '/images/Attendance.png',
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6 4.4 4.4 0 0 0 18.4 3S17.3 2.7 15 4.3a12.5 12.5 0 0 0-6 0C6.7 2.7 5.6 3 5.6 3A4.4 4.4 0 0 0 5.5 6a4.7 4.7 0 0 0-1.3 3.6c0 4.6 2.9 5.6 5.6 6a2.8 2.8 0 0 0-.8 2.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ProjectModal({ project, isOpen, onClose }) {
  const detail = project?.detail ?? {}
  const title = project?.title ?? ''
  const displayTitle = project?.displayTitle ?? title
  const images = detail.images?.length
    ? detail.images
    : projectVisualImages[project?.visual]
      ? [projectVisualImages[project.visual]]
      : []
  const sections = detail.sections?.length
    ? detail.sections
    : [
        {
          title: 'Overview',
          body: project?.description,
        },
        ...(project?.technologies?.length
          ? [
              {
                title: 'Technologies',
                items: project.technologies,
              },
            ]
          : []),
      ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45"
          />
          <MotionDiv
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            className="fixed inset-3 z-50 mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-(--line) bg-(--bg) shadow-2xl md:inset-6 md:h-[calc(100vh-3rem)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-(--line) px-5 py-4 md:px-8 md:py-5">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">{project?.category}</p>
                <h2 className="mt-2 font-heading text-2xl font-bold leading-tight md:text-4xl">{title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-(--text-soft) md:text-base">
                  {detail.summary || project?.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {project?.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open GitHub repository"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--line) text-(--text-soft) transition hover:border-(--accent) hover:text-(--text-primary)"
                  >
                    <GithubIcon />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--line) text-(--text-soft) transition hover:border-(--accent) hover:text-(--accent)"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="grid flex-1 gap-8 overflow-y-auto px-5 py-5 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-8">
              <div className="space-y-8">
                {images.length > 0 && (
                  <div className={`grid gap-4 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                    {images.map((src, index) => (
                      <div
                        key={src}
                        className={`overflow-hidden rounded-[1.1rem] bg-(--bg) ${index === 0 && images.length > 1 ? 'sm:col-span-2' : ''}`}
                      >
                        <img
                          src={src}
                          alt={`${displayTitle} visual ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {(project?.technologies || []).slice(0, 4).map((tech) => (
                    <div key={tech} className="rounded-full border border-(--line) px-4 py-2 text-sm text-(--text-soft)">
                      {tech}
                    </div>
                  ))}
                </div>

                {sections.map((section, index) => (
                  <section key={section.title} className={index === 0 ? '' : 'border-t border-(--line) pt-6'}>
                    <h3 className="font-heading text-lg font-semibold text-(--text-primary)">{section.title}</h3>
                    {section.body && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-(--text-soft) md:text-base">{section.body}</p>}
                    {section.items && (
                      <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-(--text-soft)">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-(--accent)" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <aside className="space-y-6 md:sticky md:top-0 md:self-start md:border-l md:border-(--line) md:pl-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Project Snapshot</p>
                  <dl className="mt-4 grid gap-5 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-(--text-muted)">Year</dt>
                      <dd className="mt-1 font-semibold text-(--text-primary)">{project?.year || '2024'}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-(--text-muted)">Category</dt>
                      <dd className="mt-1 font-semibold text-(--text-primary)">{project?.category}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-(--text-muted)">Focus</dt>
                      <dd className="mt-1 font-semibold text-(--text-primary)">{project?.subtitle || displayTitle}</dd>
                    </div>
                  </dl>
                </div>

                <div className="border-t border-(--line) pt-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Primary Outcome</p>
                  <p className="mt-3 text-sm leading-relaxed text-(--text-soft)">{project?.blurb || project?.description}</p>
                </div>
              </aside>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
