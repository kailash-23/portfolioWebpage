import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function TestimonialCard({ testimonial, index }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow)"
    >
      <div className="flex items-start gap-1 mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-(--accent)' : 'text-(--line)'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
      </div>
      <p className="text-sm leading-relaxed text-(--text-soft) mb-4 italic">"{testimonial.quote}"</p>
      <div>
        <p className="font-semibold text-(--text-primary)">{testimonial.author}</p>
        <p className="text-xs text-(--text-muted) mt-1">{testimonial.role}</p>
      </div>
    </MotionDiv>
  )
}
