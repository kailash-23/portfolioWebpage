function ExperienceItem({ company, role, points }) {
  return (
    <article className="rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow)">
      <h3 className="font-heading text-xl">{company}</h3>
      <p className="mt-1 text-sm uppercase tracking-[0.14em] text-(--text-muted)">{role}</p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-(--text-soft) md:text-base">
        {points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </article>
  )
}

export default ExperienceItem
