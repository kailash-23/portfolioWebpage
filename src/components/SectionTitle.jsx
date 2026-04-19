function SectionTitle({ title, showDecoration = false }) {
  return (
    <div className="section-title-container">
      {showDecoration && (
        <div className="editorial-dot-line mb-6" aria-hidden="true">
          <span className="dot" />
          <span className="line" />
          <span className="dot" />
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {showDecoration && (
        <div className="editorial-dot-line mt-6" aria-hidden="true">
          <span className="dot" />
          <span className="line" />
          <span className="dot" />
        </div>
      )}
    </div>
  )
}

export default SectionTitle
