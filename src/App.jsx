import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './components/SectionTitle'
import FlagshipProjectCard from './components/FlagshipProjectCard'
import GridProjectCard from './components/GridProjectCard'
import ProjectModal from './components/ProjectModal'
import StatsCard from './components/StatsCard'
import ResumeButton from './components/ResumeButton'

function IconButton({ label, children, compact = false, ...props }) {
  return (
    <a
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full border border-(--line) bg-(--card) text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg ${
        compact ? 'h-8 w-8' : 'h-11 w-11'
      }`}
      {...props}
    >
      {children}
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
    <span className="text-[11px] font-bold tracking-[0.06em]">LC</span>
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

const flagshipProjects = [
  {
    id: 'sign-language-glove',
    title: 'Sign Language Glove',
    category: 'IoT + ML + Accessibility',
    role: 'Lead Builder · Embedded + ML',
    timeline: '4 month build cycle',
    impact: '90%+ gesture accuracy across 20+ signs',
    description:
      'Developed an assistive IoT glove that converts hand gestures into real-time speech using flex sensor arrays and a custom machine learning model. Achieved over 90% accuracy across 20+ gestures.',
    keyHighlights: [
      'National Finalist at FedEx Innovation Challenge, IIT Madras',
      '90%+ accuracy for 20+ gesture recognition',
      'Real-time speech synthesis from hand movements',
      'Arduino firmware + ML model optimization',
    ],
    technologies: ['Arduino', 'Python', 'Machine Learning', 'IoT', 'Embedded Systems'],
  },
  {
    id: 'smart-home',
    title: 'Smart Home System',
    category: 'Systems + Automation',
    role: 'System Architect · Automation',
    timeline: 'Always-on local deployment',
    impact: '24/7 stability without cloud dependency',
    description:
      'Built a fully local smart home automation system using Raspberry Pi, replacing a legacy PC-based setup. Implemented offline voice assistant, NFC-based triggers, and MQTT-driven event automation, ensuring reliable 24/7 operation without cloud dependency.',
    keyHighlights: [
      'Fully offline and self-hosted architecture',
      'MQTT-driven event automation and control',
      'NFC-based smart triggers',
      '24/7 reliable operation without cloud dependency',
    ],
    technologies: ['Python', 'MQTT', 'Linux', 'Home Assistant', 'Raspberry Pi', 'NFC'],
  },
  {
    id: 'forma-ai',
    title: 'Forma – AI Fitness App',
    category: 'Mobile + AI',
    role: 'Full Stack Developer · Mobile + Backend',
    timeline: 'Cross-platform product iteration',
    impact: 'Personalized AI workout recommendations',
    description:
      'Developed a cross-platform fitness application delivering AI-based personalized workout recommendations. Designed scalable backend using Supabase and Firebase with a modular UI system for consistent mobile experience.',
    keyHighlights: [
      'AI-powered personalized workout suggestions',
      'Cross-platform mobile experience',
      'Scalable backend infrastructure',
      'Real-time user analytics',
    ],
    technologies: ['React Native', 'Supabase', 'Firebase', 'Node.js', 'Machine Learning'],
  },
]

const allProjects = {
  'Core Development': [
    {
      id: 'attendance',
      title: 'Attendance Management System',
      category: 'Full Stack',
      description:
        'A comprehensive attendance and CRM system with role-based access control, analytics dashboard, and automated reporting. Designed secure REST APIs with JWT authentication.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    },
    {
      id: 'monopoly',
      title: 'Monopoly NetBanking System',
      category: 'Backend Logic',
      description:
        'Banking simulation platform handling transactions, account logic, and user operations. Focused on backend flow design and transaction handling.',
      technologies: ['JavaScript', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'foodicious',
      title: 'Foodicious – Calorie Tracker',
      category: 'Hackathon',
      description:
        'Calorie tracking application developed during KCG Hackathon enabling users to monitor daily nutrition intake and health metrics.',
      technologies: ['React', 'Firebase', 'JavaScript'],
    },
    {
      id: 'flashcards',
      title: 'Flashcards App',
      category: 'Learning Tool',
      description: 'Lightweight flashcard-based learning system for efficient memory retention and quick revision.',
      technologies: ['React', 'Local Storage', 'CSS'],
    },
  ],
  'Systems & Automation': [
    {
      id: 'erpnext-ai',
      title: 'ERPNext AI Chatbot',
      category: 'Enterprise Automation',
      description:
        'Integrated an AI-powered chatbot within ERPNext to automate internal queries and improve operational efficiency.',
      keyHighlights: ['Reduced support ticket volume by 30%', 'Multi-language support', 'Context-aware responses'],
      technologies: ['ERPNext', 'Python', 'AI/NLP'],
    },
    {
      id: 'n8n-automation',
      title: 'n8n Lead Generation Automation',
      category: 'Workflow Automation',
      description:
        'Designed automation workflows for lead generation, scraping, and CRM integration, eliminating manual data collection processes.',
      keyHighlights: ['40% reduction in manual operations', 'Scalable workflow design', 'Real-time data processing'],
      technologies: ['n8n', 'APIs', 'JavaScript', 'Data Integration'],
    },
    {
      id: 'esp-ambilight',
      title: 'ESP Ambilight System',
      category: 'Embedded Systems',
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
      description:
        'Developed and deployed company website with focus on performance, responsiveness, and modern branding.',
      technologies: ['React', 'Tailwind CSS', 'Vercel'],
    },
    {
      id: 'aintrix-website',
      title: 'Aintrix Global Website',
      category: 'Corporate Website',
      description: 'Built corporate website representing company services, branding, and product ecosystem.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'aint-branding',
      title: 'AINT Branding & Design',
      category: 'Product Branding',
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
      description:
        'National Finalist for Sign Language Glove project, competing among top engineering teams across India.',
      technologies: ['IoT', 'ML', 'System Design'],
    },
  ],
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

const skillsByCategory = {
  'Languages': ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  'Frontend': ['React', 'React Native', 'Tailwind CSS', 'Framer Motion', 'Next.js'],
  'Backend': ['Node.js', 'Express', 'Django', 'FastAPI', 'REST APIs', 'GraphQL'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Redis'],
  'Cloud & DevOps': ['AWS', 'GCP', 'Azure', 'Docker', 'Vercel', 'GitHub Actions'],
  'Automation & AI': ['n8n', 'ERPNext', 'Python Scripting', 'Machine Learning', 'NLP'],
  'IoT & Embedded': ['Arduino', 'ESP32', 'Raspberry Pi', 'MQTT', 'Embedded C'],
  'Tools & Platforms': ['Git', 'Linux', 'Figma', 'Postman', 'VS Code', 'Jira'],
}

const statistics = [
  {
    id: 1,
    value: '15+',
    label: 'Projects Completed',
    subtitle: 'From IoT to full-stack web apps',
  },
  {
    id: 2,
    value: '40+',
    label: 'Users Served',
    subtitle: 'Across production applications',
  },
  {
    id: 3,
    value: '3',
    label: 'Years Experience',
    subtitle: 'Building and shipping products',
  },
  {
    id: 4,
    value: '1',
    label: 'National Finalist',
    subtitle: 'FedEx Innovation Challenge 2024',
  },
  {
    id: 5,
    value: '90%+',
    label: 'Accuracy Rate',
    subtitle: 'Sign Language Gesture Recognition',
  },
  {
    id: 6,
    value: '10K+',
    label: 'Daily Transactions',
    subtitle: 'Handled by production systems',
  },
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-(--bg) text-(--text-primary)">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(38,99,235,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,116,144,0.1),transparent_30%),linear-gradient(to_bottom,var(--bg),var(--bg))]" />

      <header
        className={`glass-header fixed inset-x-0 top-0 z-30 border-b border-(--line) transition-transform duration-300 ${
          showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 md:px-10">
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

      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-24 md:px-10 md:pt-28">
        <MotionSection
          ref={heroRef}
          id="hero"
          variants={sectionAnim}
          initial="hidden"
          animate="show"
          className="border-b border-(--line) pb-20"
        >
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-(--text-muted)">Software Engineer</p>
            <h1 className="font-heading text-4xl leading-tight md:text-6xl">Kailash Senthil</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-(--text-soft)">
              Backend & automation focused engineer building scalable systems, AI-integrated workflows,
              and practical applications that solve real operational problems.
            </p>
            <p className="mt-3 text-sm text-(--text-muted)">Based in Chennai, India</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:kailash.s2376@gmail.com"
                className="rounded-full border border-(--line) bg-(--card) px-5 py-2 text-sm font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg"
              >
                Let us connect
              </a>
              <a
                href="#flagship-projects"
                className="rounded-full border border-(--line) bg-transparent px-5 py-2 text-sm font-semibold text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-(--text-white) hover:shadow-lg"
              >
                View projects
              </a>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="about"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="About" />
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
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="Journey Timeline" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="timeline-panel rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow)">
              <h3 className="font-heading text-xl">Education</h3>
              <div className="mt-6 space-y-6 border-l border-(--line) pl-6">
                {timelineEducation.map((item) => (
                  <div key={item.title} className="relative">
                    <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-(--accent)" />
                    <p className="text-xs uppercase tracking-[0.14em] text-(--text-muted)">{item.period}</p>
                    <p className="mt-1 font-semibold text-(--text-primary)">{item.title}</p>
                    {item.institution && <p className="text-xs text-(--text-soft) italic">{item.institution}</p>}
                    <p className="mt-1 text-sm leading-relaxed text-(--text-soft)">{item.description}</p>
                    {item.highlights && (
                      <ul className="mt-2 space-y-1">
                        {item.highlights.map((highlight, i) => (
                          <li key={i} className="text-xs text-(--text-muted)">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="timeline-panel rounded-2xl border border-(--line) bg-(--card) p-6 shadow-(--shadow)">
              <h3 className="font-heading text-xl">Work Experience</h3>
              <div className="mt-6 space-y-6 border-l border-(--line) pl-6">
                {timelineWork.map((item) => (
                  <div key={item.company} className="relative">
                    <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-(--accent)" />
                    <p className="text-xs uppercase tracking-[0.14em] text-(--text-muted)">{item.period}</p>
                    <p className="mt-1 font-semibold text-(--text-primary)">
                      {item.company} · {item.role}
                    </p>
                    {item.description && <p className="text-xs text-(--text-soft) italic">{item.description}</p>}
                    {Array.isArray(item.points) ? (
                      <ul className="mt-2 space-y-1">
                        {item.points.map((point, i) => (
                          <li key={i} className="text-xs text-(--text-soft)">
                            • {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-(--text-soft)">{item.points}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          id="statistics"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="By The Numbers" />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:gap-6">
            {statistics.map((stat, index) => (
              <StatsCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </MotionSection>

        <MotionSection
          id="flagship-projects"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="Flagship Projects" />
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {flagshipProjects.map((project, index) => (
              <FlagshipProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                index={index}
              />
            ))}
          </div>
        </MotionSection>

        <MotionSection
          id="all-projects"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="More Projects" />
          <div className="space-y-12">
            {Object.entries(allProjects).map(([category, projects]) => (
              <div key={category}>
                <h3 className="font-heading mb-4 text-lg text-(--text-primary)">{category}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <GridProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          id="skills"
          variants={sectionAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-(--line) py-16"
        >
          <SectionTitle title="Skills" />
          <div className="space-y-8">
            <div className="skills-marquee rounded-2xl border border-(--line) bg-(--card) py-4 shadow-(--shadow)">
              <div className="skills-track">
                {[...skills, ...skills].map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="mx-2 inline-flex rounded-full border border-(--line) px-4 py-2 text-sm text-(--text-soft)"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(skillsByCategory).map(([category, items]) => (
                <div
                  key={category}
                  className="rounded-xl border border-(--line) bg-(--card) p-4"
                >
                  <h4 className="text-sm font-semibold text-(--accent) mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-(--bg) px-2.5 py-1 text-xs text-(--text-soft) border border-(--line)"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
          className="py-16"
        >
          <SectionTitle title="Contact" />
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
          className="py-16"
        >
          <SectionTitle title="Interests & Hobbies" />
          <p className="text-base text-(--text-soft) md:text-lg">
            I'm passionate about tech and design beyond just work:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-(--line) px-4 py-2 text-sm text-(--text-soft)"
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
