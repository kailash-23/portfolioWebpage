import { useMemo } from 'react'

const DAY_MS = 24 * 60 * 60 * 1000

function hashToUnitInterval(value) {
  let seed = value
  seed = (seed ^ 61) ^ (seed >>> 16)
  seed = seed + (seed << 3)
  seed = seed ^ (seed >>> 4)
  seed = Math.imul(seed, 0x27d4eb2d)
  seed = seed ^ (seed >>> 15)
  return (seed >>> 0) / 4294967295
}

function getContributionCount(date) {
  const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const random = hashToUnitInterval(dateSeed)
  const isWeekend = date.getDay() === 0 || date.getDay() === 6

  if (isWeekend) {
    if (random < 0.75) return 0
    if (random < 0.88) return 1
    if (random < 0.95) return 2
    if (random < 0.985) return 4
    return 6
  }

  if (random < 0.52) return 0
  if (random < 0.74) return 1
  if (random < 0.89) return 2
  if (random < 0.965) return 4
  return 7
}

function getContributionLevel(count) {
  if (count <= 0) return 0
  if (count <= 1) return 1
  if (count <= 2) return 2
  if (count <= 4) return 3
  return 4
}

function buildContributionCalendar() {
  const endDate = new Date()
  endDate.setHours(0, 0, 0, 0)

  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 364)

  const gridStart = new Date(startDate)
  gridStart.setDate(startDate.getDate() - startDate.getDay())

  const totalDays = Math.floor((endDate - gridStart) / DAY_MS) + 1
  const weekCount = Math.ceil(totalDays / 7)

  let totalContributions = 0

  const weeks = Array.from({ length: weekCount }, (_, weekIndex) => {
    const days = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(gridStart)
      date.setDate(gridStart.getDate() + weekIndex * 7 + dayIndex)

      const inRange = date >= startDate && date <= endDate
      const count = inRange ? getContributionCount(date) : 0

      if (inRange) {
        totalContributions += count
      }

      return {
        date,
        inRange,
        count,
        level: getContributionLevel(count),
      }
    })

    return { days }
  })

  const monthLabels = []
  const seenMonths = new Set()

  weeks.forEach((week, weekIndex) => {
    const monthStart = week.days.find((day) => day.inRange && day.date.getDate() === 1)
    if (!monthStart) {
      return
    }

    const monthKey = `${monthStart.date.getFullYear()}-${monthStart.date.getMonth()}`
    if (seenMonths.has(monthKey)) {
      return
    }

    seenMonths.add(monthKey)
    monthLabels.push({
      label: monthStart.date.toLocaleDateString('en-US', { month: 'short' }),
      weekIndex,
    })
  })

  return {
    weeks,
    monthLabels,
    totalContributions,
  }
}

function GitHubContributions() {
  const { weeks, monthLabels, totalContributions } = useMemo(buildContributionCalendar, [])

  return (
    <div className="github-contrib-wrap">
      <div className="github-contrib-card">
        <div className="github-contrib-scroll" role="img" aria-label="GitHub style contribution activity in the last year">
          <div className="github-contrib-board">
            <div
              className="github-contrib-months"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--gh-cell-size))` }}
              aria-hidden="true"
            >
              {monthLabels.map((month) => (
                <span
                  key={`${month.label}-${month.weekIndex}`}
                  className="github-contrib-month"
                  style={{ gridColumnStart: month.weekIndex + 1 }}
                >
                  {month.label}
                </span>
              ))}
            </div>

            <div
              className="github-contrib-grid"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--gh-cell-size))` }}
            >
              {weeks.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="github-contrib-week">
                  {week.days.map((day) => {
                    const dateLabel = day.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })

                    return (
                      <span
                        key={dateLabel}
                        className={`github-contrib-cell ${day.inRange ? 'is-active' : 'is-empty'}`}
                        data-level={day.level}
                        title={day.inRange ? `${day.count} contributions on ${dateLabel}` : ''}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="github-contrib-footer">
          <p className="github-contrib-total">{totalContributions} contributions in the last year</p>
          <div className="github-contrib-legend" aria-label="Contribution legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span key={`legend-${level}`} className="github-contrib-cell is-active" data-level={level} aria-hidden="true" />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubContributions
