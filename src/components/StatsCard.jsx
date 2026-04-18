import { motion } from 'framer-motion'

const MotionDiv = motion.div

export default function StatsCard({ stat, index }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow) text-center"
    >
      <p className="text-4xl font-bold text-(--accent) mb-2">{stat.value}</p>
      <p className="text-sm text-(--text-soft)">{stat.label}</p>
      {stat.subtitle && (
        <p className="text-xs text-(--text-muted) mt-2">{stat.subtitle}</p>
      )}
    </MotionDiv>
  )
}
