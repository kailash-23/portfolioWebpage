import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './components/SectionTitle'
import GridProjectCard from './components/GridProjectCard'
import ProjectModal from './components/ProjectModal'
import ResumeButton from './components/ResumeButton'

function IconButton({ label, children, compact = false, ...props }) {
  return (
    <a
      aria-label={label}
      title={label}
      className={`group inline-flex items-center justify-center rounded-full border border-(--line) bg-(--card) text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg ${
        compact ? 'h-8 w-8' : 'h-11 w-11'
      }`}
      {...props}
    >
      <span className="group-hover:text-white [&_svg]:transition-colors [&_svg]:duration-300 [&_svg]:stroke-current [&_svg]:fill-none">
        {children}
      </span>
    </a>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2 12H5M19 12H22M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M20 15.23A9 9 0 1 1 8.77 4 7.5 7.5 0 1 0 20 15.23Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6 4.4 4.4 0 0 0 18.4 3S17.3 2.7 15 4.3a12.5 12.5 0 0 0-6 0C6.7 2.7 5.6 3 5.6 3A4.4 4.4 0 0 0 5.5 6a4.7 4.7 0 0 0-1.3 3.6c0 4.6 2.9 5.6 5.6 6a2.8 2.8 0 0 0-.8 2.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M8 10v8M4 10v8M4 7.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 18v-4.5a2.5 2.5 0 1 1 5 0V18m0-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LeetcodeIcon() {
  return (
    <span className="text-[11px] font-bold tracking-[0.06em] transition-colors duration-300 group-hover:text-white">LC</span>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
const showcaseProjects = [
  {
    id: 'sign-language-glove-showcase',
    displayTitle: 'IGCS',
    subtitle: 'Intelligent Gesture Communication System',
    title: 'SIGN LANGUAGE GLOVE',
    category: 'IoT + ML + Accessibility',
    date: '2024-04',
    year: '04 / 2024',
    tags: ['ARDUINO', 'MACHINE LEARNING', 'ASSISTIVE TECH'],
    description: 'Real-time sign-to-speech glove with 90%+ gesture accuracy across 20+ signs.',
    blurb: 'Real-time gesture-to-voice translation with high-accuracy recognition.',
    technologies: ['Arduino', 'Python', 'Machine Learning', 'Embedded Systems'],
    visual: 'signglove',
  },
  {
    id: 'smart-home-showcase',
    displayTitle: 'HABITAT',
    subtitle: 'Home Automation & Behavior Integration Technology',
    title: 'SMART HOME SYSTEM',
    category: 'Systems + Automation',
    date: '2024-03',
    year: '03 / 2024',
    tags: ['RASPBERRY PI', 'MQTT', 'OFFLINE AUTOMATION'],
    description: 'Fully offline local automation stack built for reliable 24/7 smart home control.',
    blurb: 'Offline-first smart home orchestration for resilient 24/7 control.',
    technologies: ['Python', 'MQTT', 'Linux', 'Home Assistant', 'Raspberry Pi'],
    visual: 'smarthome',
  },
  {
    id: 'forma-showcase',
    displayTitle: 'FORMA',
    subtitle: 'Fitness Optimization & Recommendation Model Assistant',
    title: 'FORMA AI FITNESS APP',
    category: 'Mobile + AI',
    date: '2024-02',
    year: '02 / 2024',
    tags: ['REACT NATIVE', 'SUPABASE', 'PERSONALIZATION'],
    description: 'Cross-platform fitness app delivering AI-based personalized workout recommendations.',
    blurb: 'AI-guided fitness planning with adaptive recommendations.',
    technologies: ['React Native', 'Supabase', 'Firebase', 'Node.js'],
    visual: 'forma',
  },
  {
    id: 'attendance-showcase',
    displayTitle: 'AMS',
    subtitle: 'Attendance Management Suite',
    title: 'ATTENDANCE MANAGEMENT',
    category: 'Full Stack Product',
    date: '2024-01',
    year: '01 / 2024',
    tags: ['REACT', 'NODE.JS', 'POSTGRESQL'],
    description: 'Role-based attendance and CRM platform with analytics and automated reporting.',
    blurb: 'Role-based attendance, analytics, and streamlined reporting.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    visual: 'attendance',
  },
]

const allProjects = {
  'Core Development': [
    {
      id: 'attendance',
      title: 'Attendance Management System',
      category: 'Full Stack',
      date: '2024-01',
      description:
        'A comprehensive attendance and CRM system with role-based access control, analytics dashboard, and automated reporting. Designed secure REST APIs with JWT authentication.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    },
    {
      id: 'monopoly',
      title: 'Monopoly NetBanking System',
      category: 'Backend Logic',
      date: '2023-11',
      description:
        'Banking simulation platform handling transactions, account logic, and user operations. Focused on backend flow design and transaction handling.',
      technologies: ['JavaScript', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'foodicious',
      title: 'Foodicious – Calorie Tracker',
      category: 'Hackathon',
      date: '2023-09',
      description:
        'Calorie tracking application developed during KCG Hackathon enabling users to monitor daily nutrition intake and health metrics.',
      technologies: ['React', 'Firebase', 'JavaScript'],
    },
    {
      id: 'flashcards',
      title: 'Flashcards App',
      category: 'Learning Tool',
      date: '2023-07',
      description: 'Lightweight flashcard-based learning system for efficient memory retention and quick revision.',
      technologies: ['React', 'Local Storage', 'CSS'],
    },
  ],
  'Systems & Automation': [
    {
      id: 'erpnext-ai',
      title: 'ERPNext AI Chatbot',
      category: 'Enterprise Automation',
      date: '2024-05',
      description:
        'Integrated an AI-powered chatbot within ERPNext to automate internal queries and improve operational efficiency.',
      technologies: ['ERPNext', 'Python', 'AI/NLP'],
    },
    {
      id: 'n8n-automation',
      title: 'n8n Lead Generation Automation',
      category: 'Workflow Automation',
      date: '2024-04',
      description:
        'Designed automation workflows for lead generation, scraping, and CRM integration, eliminating manual data collection processes.',
      technologies: ['n8n', 'APIs', 'JavaScript', 'Data Integration'],
    },
    {
      id: 'esp-ambilight',
      title: 'ESP Ambilight System',
      category: 'Embedded Systems',
      date: '2023-08',
      description:
        'Ambient lighting system using ESP microcontroller to synchronize lighting with screen output for immersive visuals.',
      technologies: ['ESP32', 'Arduino', 'C++', 'LED control'],
    },
  ],
  'Web & Design': [
    {
      id: 'ryze-website',
      title: 'RYZE Website',
      category: 'Company Website',
      date: '2024-03',
      description:
        'Developed and deployed company website with focus on performance, responsiveness, and modern branding.',
      technologies: ['React', 'Tailwind CSS', 'Vercel'],
    },
    {
      id: 'aintrix-website',
      title: 'Aintrix Global Website',
      category: 'Corporate Website',
      date: '2024-02',
      description: 'Built corporate website representing company services, branding, and product ecosystem.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'aint-branding',
      title: 'AINT Branding & Design',
      category: 'Product Branding',
      date: '2023-10',
      description:
        'Worked on product branding, marketing assets, and visual design concepts for AINT startup.',
      technologies: ['Figma', 'Design Systems', 'Branding'],
    },
  ],
  'Recognition': [
    {
      id: 'fedex-challenge',
      title: 'FedEx Innovation Challenge – IIT Madras',
      category: 'Hackathon & Recognition',
      date: '2024-04',
      description:
        'National Finalist for Sign Language Glove project, competing among top engineering teams across India.',
      technologies: ['IoT', 'ML', 'System Design'],
    },
  ],
}

const showcaseProjectKeys = showcaseProjects.map((project) => project.title.toLowerCase())

const archiveProjects = Object.values(allProjects)
  .flat()
  .filter((project) => {
    const title = project.title.toLowerCase()
    return !showcaseProjectKeys.some(
      (featuredTitle) => featuredTitle.includes(title) || title.includes(featuredTitle),
    )
  })

function formatProjectDate(dateValue) {
  if (!dateValue) {
    return 'N / A'
  }
  const [year, month] = dateValue.split('-')
  return `${month} / ${year}`
}

const interests = [
  'PC hardware building',
  'Audio systems (IEMs & speaker tuning)',
  'UI/UX design',
  'Product design',
  '3D & game development',
]

const timelineEducation = [
  {
    period: '2021-2025',
    title: 'B.Tech Information Technology',
    institution: 'KCG College of Technology, Chennai',
    description: 'Engineering degree focusing on systems architecture, software engineering, and real-world project implementation.',
    highlights: [
      'CGPA: 8.4/10',
      'Core expertise: Backend systems, Databases, Cloud computing',
      'FedEx Innovation Challenge National Finalist',
    ],
  },
  {
    period: '2019-2021',
    title: '12th Grade (Higher Secondary)',
    institution: 'Sri Ramakrishna Vidyalaya, Chennai',
    description: 'Strong foundation in mathematics, physics, and problem-solving that shaped engineering fundamentals.',
    highlights: [
      'Scored 92% (Maths, Physics, Chemistry)',
      'Started hands-on electronics experimentation',
      'Built first IoT project (sensor-based automation)',
    ],
  },
  {
    period: '2015-2019',
    title: 'School Foundation',
    institution: 'Various institutions',
    description: 'Early exposure to logic, problem-solving, and technology.',
    highlights: [
      'Participated in coding competitions',
      'Built first embedded systems projects',
      'Developed interest in automation and AI',
    ],
  },
]

const timelineWork = [
  {
    period: '2023-Present',
    company: 'Aintrix Global',
    role: 'Senior Full Stack Developer',
    description: 'Leading backend development and automation initiatives for enterprise clients.',
    points: [
      'Built and deployed 8+ production applications serving 40+ enterprise users',
      'Architected PostgreSQL-backed systems handling 10K+ daily transactions',
      'Integrated n8n automation workflows reducing manual operations by 40%',
      'Implemented AI chatbot in ERPNext reducing support tickets by 30%',
    ],
    highlights: {
      achievement: 'Led platform modernization, improved system performance by 60%',
      tech: 'Node.js, PostgreSQL, React, AWS, n8n, ERPNext',
    },
  },
  {
    period: '2022-2025',
    company: 'KCG College of Technology',
    role: 'Student Developer & Project Lead',
    description: 'Led multiple technical initiatives and project competitions.',
    points: [
      'Sign Language Glove Project - National Finalist at FedEx Innovation Challenge',
      'Achieved 90%+ gesture recognition accuracy using ML',
      'Built full-stack IoT and web applications for hackathons',
      'Mentored junior students in web development and systems design',
    ],
    highlights: {
      achievement: 'FedEx Innovation Challenge National Finalist (2024)',
      tech: 'Python, Arduino, ML, React, Node.js',
    },
  },
  {
    period: '2021-2022',
    company: 'Freelance',
    role: 'Full Stack Developer',
    description: 'Built multiple web applications and automation solutions.',
    points: [
      'Developed 5+ production web applications',
      'Designed custom REST APIs and database schemas',
      'Implemented real-time features using Firebase',
      'Delivered projects on responsive React and Vue frameworks',
    ],
    highlights: {
      achievement: 'Built complete e-commerce platform MVP in 3 months',
      tech: 'React, Node.js, Firebase, PostgreSQL',
    },
  },
]

const skills = [
  'Python',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Firebase',
  'GCP',
  'n8n',
  'ERPNext',
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kailash-23',
    icon: <GithubIcon />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kailashsenthil/',
    icon: <LinkedinIcon />,
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/kailash-23/',
    icon: <LeetcodeIcon />,
  },
  {
    label: 'Email',
    href: 'mailto:kailash.s2376@gmail.com',
    icon: <MailIcon />,
  },
]

const sectionAnim = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const MotionDiv = motion.div
const MotionSection = motion.section

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [passedHero, setPassedHero] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const heroRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const node = heroRef.current
    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPassedHero(!entry.isIntersecting)
      },
      { threshold: 0.45 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const isProjectsPage = window.location.pathname === '/projects'
  const showcaseArchiveProjects = showcaseProjects.map((project) => ({
    id: `featured-${project.id}`,
    title: project.title,
    category: project.category,
    description: project.description,
    technologies: project.technologies,
    date: project.date,
  }))

  const mergedProjects = [...showcaseArchiveProjects, ...archiveProjects]
  const uniqueProjects = Array.from(
    new Map(mergedProjects.map((project) => [project.title.toLowerCase(), project])).values(),
  )
  const sortedProjects = uniqueProjects.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      // Keep nav visible near top for better orientation.
      if (currentY < 32) {
        setShowNav(true)
        lastScrollY.current = currentY
        return
      }

      const delta = currentY - lastScrollY.current
      if (Math.abs(delta) < 4) {
        return
      }

      setShowNav(delta < 0)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isProjectsPage) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-(--bg) text-(--text-primary)">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(24,28,34,0.12),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(64,72,86,0.08),transparent_34%),linear-gradient(to_bottom,var(--bg),var(--bg))]" />
        <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-12 md:px-6 lg:px-8 md:pt-16">
          <section className="unified-section">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="projects-editorial-title m-0!">ALL PROJECTS</h1>
              <a
                href="/"
                className="rounded-full border border-(--line) bg-(--card) px-5 py-2 text-sm font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white"
              >
                Back to Home
              </a>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.08em] text-(--text-muted)">
              Sorted by most recent first
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map((project, index) => (
                <div key={`${project.id}-${index}`} className="relative">
                  <span className="absolute right-4 top-4 z-20 text-xs font-semibold tracking-[0.08em] text-(--text-muted)">
                    {formatProjectDate(project.date)}
                  </span>
                  <GridProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        <ProjectModal project={selectedProject} isOpen={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-(--bg) text-(--text-primary)">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(24,28,34,0.12),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(64,72,86,0.08),transparent_34%),linear-gradient(to_bottom,var(--bg),var(--bg))]" />

      <header
        className={`glass-header hidden fixed inset-x-0 top-0 z-30 border-b border-(--line) transition-transform duration-300 md:block ${
          showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-6 lg:px-8">
          <MotionDiv
            initial={false}
            animate={{ width: passedHero ? 270 : 24 }}
            transition={{ type: 'spring', stiffness: 230, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="flex h-8 items-center justify-center px-0">
              {!passedHero ? (
                <span className="font-heading text-sm font-semibold tracking-[0.08em] text-(--text-primary)">
                  KS
                </span>
              ) : (
                <span className="font-heading text-base font-semibold tracking-[0.05em] text-(--text-primary) whitespace-nowrap">
                  KAILASH SENTHIL
                </span>
              )}
            </div>
          </MotionDiv>

          <div className="flex items-center gap-2">
            {socialLinks.slice(0, 3).map((item) => (
              <IconButton
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                label={item.label}
                compact
              >
                {item.icon}
              </IconButton>
            ))}
            <button
              type="button"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--line) bg-(--card) text-(--text-soft) transition hover:border-(--accent) hover:text-(--accent)"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-3 pb-24 pt-10 md:px-5 lg:px-6 md:pt-28">
        <MotionSection
          ref={heroRef}
          id="hero"
          variants={sectionAnim}
          initial="hidden"
          animate="show"
          className="hero-editorial"
        >
          <div className="hero-grid hero-grid--single">
            <div className="hero-content">
              <h1 className="hero-title hero-name-animate">
                <span className="hero-name-line">Kailash Senthil</span>
              </h1>
              <p className="hero-copy">
                Building backend and automation systems with product-level reliability,
                operational clarity, and measurable impact.
              </p>
              <p className="hero-location">Based in Chennai, India</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:kailash.s2376@gmail.com"
                  className="rounded-full border border-(--line) bg-(--card) px-5 py-2 text-sm font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg"
                >
                  Let us connect
                </a>
                <a
                  href="#all-projects"
                  className="rounded-full border border-(--line) bg-transparent px-5 py-2 text-sm font-semibold text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-(--text-white) hover:shadow-lg"
                >
                  View projects
                </a>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="about"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="unified-section"
        >
          <SectionTitle title="About" showDecoration={false} />
          <p className="max-w-3xl text-base leading-relaxed text-(--text-soft) md:text-lg">
            Software Engineer specializing in backend development, automation systems, and scalable web
            applications. Experienced in building AI-integrated workflows, ERP systems, and IoT
            solutions with real-world impact.
          </p>
        </MotionSection>

        <MotionSection
          id="timeline"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="unified-section"
        >
          <SectionTitle title="Journey Timeline" showDecoration={false} />
          <div className="timeline-layout">
            <div className="timeline-column">
              <h3 className="timeline-column-title">Education</h3>
              <div className="timeline-stack">
                {timelineEducation.map((item) => (
                  <article key={item.title} className="timeline-card">
                    <p className="timeline-card-period">{item.period}</p>
                    <p className="timeline-card-title">{item.title}</p>
                    {item.institution && <p className="timeline-card-sub">{item.institution}</p>}
                    <p className="timeline-card-copy">{item.description}</p>
                    {item.highlights && (
                      <ul className="timeline-card-list">
                        {item.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="timeline-column">
              <h3 className="timeline-column-title">Work Experience</h3>
              <div className="timeline-stack">
                {timelineWork.map((item) => (
                  <article key={item.company} className="timeline-card">
                    <p className="timeline-card-period">{item.period}</p>
                    <p className="timeline-card-title">
                      {item.company} · {item.role}
                    </p>
                    {item.description && <p className="timeline-card-sub">{item.description}</p>}
                    {Array.isArray(item.points) ? (
                      <ul className="timeline-card-list">
                        {item.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="timeline-card-copy">{item.points}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="all-projects"
          variants={sectionAnim}
          initial="show"
          animate="show"
          className="unified-section"
        >
          <div className="projects-editorial">
            <h2 className="projects-editorial-title">PROJECTS</h2>

            <div className="projects-lead-grid">
              <div>
                <p className="projects-lead-label">ENGINEER</p>
                <p className="projects-lead-sub">selected systems & product work -</p>
              </div>
            </div>

            <div className="projects-catalog-grid">
              {showcaseProjects.map((project) => (
                <article
                  key={project.id}
                  className="editorial-project-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setSelectedProject(project)
                    }
                  }}
                >
                  <div className={`editorial-project-visual visual-${project.visual}`} aria-hidden="true">
                    <div className="editorial-mock-window" />
                  </div>

                  <div className="editorial-project-head">
                    <h3>{project.displayTitle || project.title}</h3>
                    <span>{project.year}</span>
                  </div>

                  {project.subtitle && (
                    <p className="editorial-project-subtitle">{project.subtitle}</p>
                  )}

                  <div className="editorial-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <p className="editorial-project-copy">{project.blurb || project.description} -</p>
                </article>
              ))}
            </div>

            <div className="mt-14">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="projects-archive-label">PROJECT ARCHIVE</p>
                <a
                  href="/projects"
                  aria-label="Open all projects"
                  className="archive-arrow-link inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--line) bg-(--card) text-sm font-semibold text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:text-(--text-primary)"
                >
                  ↗
                </a>
              </div>
              <div className="projects-marquee mt-4">
                <div className="projects-track">
                  {[...archiveProjects, ...archiveProjects].map((project, index) => (
                    <div key={`${project.id}-${index}`} className="projects-track-item">
                      <GridProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="skills"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="unified-section"
        >
          <SectionTitle title="Skills" showDecoration={false} />
          <div className="skills-marquee-container">
            <div className="skills-track">
              {[...skills, ...skills].map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="marquee-skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="contact"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="unified-section"
        >
          <SectionTitle title="Contact" showDecoration={false} />
          <p className="text-base text-(--text-soft) md:text-lg">
            Open to backend, automation, and platform engineering roles. Let's connect and build something great together.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <ResumeButton />
            <span className="text-sm text-(--text-muted)">or reach out via:</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <IconButton
                key={item.label}
                href={item.href}
                label={item.label}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
              >
                {item.icon}
              </IconButton>
            ))}
          </div>
          <div className="mt-6 text-sm text-(--text-muted)">
            <p>kailash.s2376@gmail.com</p>
            <p className="mt-1">Chennai, India</p>
          </div>
        </MotionSection>

        <MotionSection
          id="interests"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="unified-section pb-0"
        >
          <SectionTitle title="Outside The Build" showDecoration={false} />
          <p className="text-base text-(--text-soft) md:text-lg">
            Beyond shipping features, this is where I experiment, recharge, and stay creatively sharp:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="interest-pill"
              >
                {interest}
              </span>
            ))}
          </div>
        </MotionSection>
      </main>

      <ProjectModal project={selectedProject} isOpen={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
