function SkillPill({ label }) {
  return (
    <span className="rounded-full border border-(--line) bg-(--card) px-4 py-2 text-sm text-(--text-soft) transition hover:border-(--accent) hover:text-(--text-primary)">
      {label}
    </span>
  )
}

export default SkillPill
