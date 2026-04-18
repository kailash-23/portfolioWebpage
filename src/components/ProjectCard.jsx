import { motion } from 'framer-motion'

const MotionArticle = motion.article

function ProjectCard({ title, summary, meta, tags = [], index }) {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow) transition-all duration-300 hover:-translate-y-1 hover:border-(--accent)"
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-(--accent)/10 blur-xl transition group-hover:bg-(--accent)/20" />
      <h3 className="font-heading text-xl tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-(--text-soft)">{summary}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-(--line) px-2.5 py-1 text-xs text-(--text-muted)"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs uppercase tracking-[0.13em] text-(--text-muted) transition group-hover:text-(--accent)">
        {meta}
      </p>
    </MotionArticle>
  )
}

export default ProjectCard
