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
    subtitle: 'Sign Language Glove',
    title: 'SIGN LANGUAGE GLOVE',
    category: 'IoT + ML + Accessibility',
    date: '2024-04',
    year: '04 / 2024',
    tags: ['ARDUINO', 'MACHINE LEARNING', 'ASSISTIVE TECH'],
    description: 'Real-time sign-to-speech glove with 90%+ gesture accuracy across 20+ signs.',
    blurb: 'Real-time gesture-to-voice translation with high-accuracy recognition.',
    technologies: ['Arduino', 'Python', 'Machine Learning', 'Embedded Systems'],
    visual: 'signglove',
    detail: {
      summary:
        'IGCS is a centralized control platform designed to manage and monitor operational workflows across an organization, integrating attendance, workflows, and internal tools into a single command layer.',
      images: ['/images/IGCS.jpeg'],
      sections: [
        {
          title: 'Project Overview',
          body:
            'IGCS acts as a control layer that centralizes organizational operations, monitors subsystem activity, and provides a single place to observe logs, control access, and coordinate internal services.',
        },
        {
          title: 'Objectives',
          items: [
            'Centralize organizational controls',
            'Provide real-time monitoring',
            'Improve operational efficiency',
            'Enable modular system integration',
          ],
        },
        {
          title: 'Core Features',
          items: [
            'Central dashboard with analytics and logs',
            'Role-based access control for secure usage',
            'System monitoring with activity tracking',
            'Integration with internal tools such as FORMA and Attendance',
            'Logging and audit trails for traceability',
          ],
        },
        {
          title: 'Architecture',
          items: [
            'Frontend dashboard UI for centralized control',
            'Backend API layer for routing and orchestration',
            'Service modules for FORMA, Attendance, and other internal systems',
            'Centralized database for shared data and logs',
          ],
        },
        {
          title: 'Use Case',
          body:
            'An admin monitors employee activity, tracks system-level logs, and controls access across modules from a single interface.',
        },
      ],
    },
  },
  {
    id: 'smart-home-showcase',
    displayTitle: 'HABITAT',
    subtitle: 'Smart Home System',
    title: 'SMART HOME SYSTEM',
    category: 'Systems + Automation',
    date: '2026-03',
    year: '03 / 2026',
    tags: ['RASPBERRY PI', 'MQTT', 'OFFLINE AUTOMATION'],
    description: 'Fully offline local automation stack built for reliable 24/7 smart home control.',
    blurb: 'Offline-first smart home orchestration for resilient 24/7 control.',
    technologies: ['Python', 'MQTT', 'Linux', 'Home Assistant', 'Raspberry Pi'],
    visual: 'smarthome',
    detail: {
      summary:
        'A self-hosted Raspberry Pi smart home automation system that integrates Home Assistant, voice commands, NFC triggers, and IoT devices to control home appliances locally with privacy, low latency, and full customization.',
      images: ['/images/homeassistant.jpeg', '/images/smartHomeStructure.png', '/images/Raspberry%20Pi.png'],
      sections: [
        {
          title: 'Project Overview',
          body:
            'Built a centralized smart home hub that removes cloud dependency and keeps automations inside the local network for faster, more reliable control.',
        },
        {
          title: 'Objectives',
          items: [
            'Build a centralized smart home hub',
            'Enable voice-based automation',
            'Support NFC-based instant triggers',
            'Keep device control local with low latency',
            'Design the setup to stay modular and scalable',
          ],
        },
        {
          title: 'Core Architecture',
          items: [
            'Hardware: Raspberry Pi 4 Model B, relay module, NFC reader, NFC tags, power supply, and wiring',
            'Software: Home Assistant, Raspberry Pi OS, MQTT, Node-RED, Python integrations, and voice assistant support',
            'Optional distributed nodes: ESP8266 or ESP32 for extended device coverage',
          ],
        },
        {
          title: 'System Workflow',
          items: [
            'User input enters through voice, NFC tap, or mobile app',
            'Home Assistant receives the request and evaluates automation rules',
            'Commands are sent to relays and IoT devices through local integrations',
            'Dashboard state updates immediately after the action completes',
          ],
        },
        {
          title: 'Key Features Implemented',
          items: [
            'Voice control through Google Assistant, Alexa, or offline STT engines',
            'Real-time dashboard control for toggles, device status, and logs',
            'NFC automations for bedside, door, and room-based triggers',
            'Relay-based appliance switching for lights, fans, and other AC devices',
            'Local and remote access options depending on environment setup',
          ],
        },
        {
          title: 'Technical Design',
          items: [
            'GPIO used for direct hardware control',
            'MQTT used for device messaging when ESP nodes are present',
            'REST APIs used for service and dashboard integration',
            'Local-first security with authentication, optional SSL, and reverse proxy support',
          ],
        },
        {
          title: 'Challenges and Solutions',
          items: [
            'GPIO pin configuration and relay wiring were stabilized with tested libraries',
            'NFC integration was handled through custom scripts and add-ons',
            'Voice latency was reduced by shifting to local control where possible',
            'Network reliability issues were minimized with local-first design',
          ],
        },
        {
          title: 'Outcomes',
          items: [
            'Prototype runs fully as a working smart home system',
            'Manual switching reduced through automation and dashboard control',
            'Response time improved with local processing',
            'Architecture is ready for additional devices and automations',
          ],
        },
        {
          title: 'Future Enhancements',
          items: [
            'AI-based predictive automation',
            'Face recognition entry system',
            'Energy monitoring dashboard',
            'Fully offline voice assistant with Whisper and a local LLM',
          ],
        },
      ],
    },
  },
  {
    id: 'forma-showcase',
    displayTitle: 'FORMA',
    subtitle: 'Workflow & Form Management',
    title: 'FORMA AI FITNESS APP',
    category: 'Mobile + AI',
    date: '2026-02',
    year: '02 / 2026',
    tags: ['REACT NATIVE', 'SUPABASE', 'PERSONALIZATION'],
    description: 'Cross-platform fitness app delivering AI-based personalized workout recommendations.',
    blurb: 'AI-guided fitness planning with adaptive recommendations.',
    technologies: ['React Native', 'Supabase', 'Firebase', 'Node.js'],
    visual: 'forma',
    github: 'https://github.com/kailash-23/Forma.git',
    detail: {
      summary:
        'FORMA is a workflow and form management system that digitizes manual internal processes, automates approvals, and standardizes organizational task handling.',
      images: ['/images/Forma.jpeg'],
      sections: [
        {
          title: 'Project Overview',
          body:
            'FORMA replaces paper-based workflows with a dynamic form and workflow automation layer built to streamline approvals, requests, and internal documentation.',
        },
        {
          title: 'Objectives',
          items: [
            'Replace paper-based workflows',
            'Automate approval pipelines',
            'Standardize internal processes',
            'Reduce manual errors and repeated work',
          ],
        },
        {
          title: 'Key Features',
          items: [
            'Dynamic form builder with custom fields and validation',
            'Workflow automation with multi-level approvals',
            'Conditional routing and status tracking',
            'Submission storage with search, filtering, and export',
            'Notification support for reminders and alerts',
          ],
        },
        {
          title: 'Workflow Example',
          items: [
            'User submits form',
            'Manager approval',
            'Admin verification',
            'Final status update',
          ],
        },
        {
          title: 'Tech Stack',
          items: ['ERPNext / Frappe Framework', 'Python backend logic', 'MariaDB database', 'REST APIs'],
        },
      ],
    },
  },
  {
    id: 'attendance-showcase',
    displayTitle: 'AMS',
    subtitle: 'Attendance Management',
    title: 'ATTENDANCE MANAGEMENT',
    category: 'Full Stack Product',
    date: '2025-01',
    year: '01 / 2025',
    tags: ['REACT', 'NODE.JS', 'POSTGRESQL'],
    description: 'Role-based attendance and CRM platform with analytics and automated reporting.',
    blurb: 'Role-based attendance, analytics, and streamlined reporting.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    visual: 'attendance',
    github: 'https://github.com/kailash-23/AINTRIX-attendance.git',
    detail: {
      summary:
        'A web-based employee attendance and tracking system developed to manage attendance, working hours, leave workflows, and employee activity inside the organization.',
      images: ['/images/Attendance.png', '/images/attendance.jpg'],
      sections: [
        {
          title: 'Project Overview',
          body:
            'The attendance system automates attendance capture, reduces manual logging errors, and integrates with payroll or ERP workflows to provide real-time visibility into employee presence and activity.',
        },
        {
          title: 'Objectives',
          items: [
            'Automate attendance tracking',
            'Reduce manual logging errors',
            'Provide real-time attendance insights',
            'Integrate with payroll and ERP systems',
          ],
        },
        {
          title: 'Core Features',
          items: [
            'Check-in and check-out system with timestamp logging',
            'Smart tracking with IP-based and device-based validation',
            'Attendance dashboard with monthly summaries and late/absent tracking',
            'Leave management with approval workflow and balance tracking',
            'Reports and analytics with CSV/PDF exports',
          ],
        },
        {
          title: 'System Workflow',
          items: [
            'Employee login',
            'Check-in / Check-out',
            'Data stored in database',
            'Admin dashboard updates',
            'Reports generated',
          ],
        },
        {
          title: 'Tech Stack',
          items: ['ERPNext / Python backend', 'Web UI with JS / HTML / CSS', 'MariaDB database', 'Payroll and HR integration'],
        },
      ],
    },
  },
]

const allProjects = {
  'Core Development': [
    {
      id: 'attendance',
      title: 'Attendance Management System',
      category: 'Full Stack',
      date: '2025-01',
      description:
        'A comprehensive attendance and CRM system with role-based access control, analytics dashboard, and automated reporting. Designed secure REST APIs with JWT authentication.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
      github: 'https://github.com/kailash-23/AINTRIX-attendance.git',
    },
    {
      id: 'qnot',
      title: 'QNOT',
      category: 'Real-time Systems',
      date: '2024-02',
      description:
        'Real-time queue management system designed to eliminate physical waiting lines and improve user flow in service centers.',
      technologies: ['React', 'Node.js', 'WebSockets', 'MongoDB'],
      detail: {
        summary:
          'Real-time queue management system designed to eliminate physical waiting lines and improve user flow in service centers, offices, and campus facilities.',
        images: ['/images/QNOT-app.jpeg'],
        sections: [
          {
            title: 'Overview',
            body:
              'Digital queue system with real-time notifications. Users join remotely, receive token numbers, and get notified when their turn approaches.',
          },
          {
            title: 'Objectives',
            items: [
              'Eliminate physical queues and crowding',
              'Provide real-time queue tracking and position visibility',
              'Notify users dynamically instead of forcing them to wait blindly',
              'Optimize service efficiency and staff workflow',
            ],
          },
          {
            title: 'Core Concept',
            body:
              'User joins queue → System assigns token → Queue progresses → User receives notification → User arrives when turn is near',
          },
          {
            title: 'Key Features',
            items: [
              'Digital tokens with position tracking and ETA',
              'Real-time notifications (web, SMS, WhatsApp)',
              'Admin dashboard with live monitoring',
              'Multi-queue support for parallel services',
            ],
          },
          {
            title: 'Tech Stack',
            items: [
              'React, Node.js, WebSockets, MongoDB',
              'Web Push APIs for notifications',
            ],
          },
          {
            title: 'Use Cases',
            items: [
              'Hospitals: Patients join remotely, get token, arrive just in time',
              'Offices/Colleges: Students queue for admin services',
              'Service Centers: Digital tokens with notifications',
            ],
          },
          {
            title: 'Challenges',
            items: [
              'Real-time state synchronization across concurrent users',
              'Notification reliability despite browser limitations',
              'Accurate ETA with dynamic service times',
              'Scalability of real-time infrastructure',
            ],
          },
          {
            title: 'Status',
            body:
              'Project was paused due to college availability constraints. The catering service and associated queue requirements were moved out of scope.',
          },
        ],
      },
    },
    {
      id: 'monopoly',
      title: 'Monopoly NetBanking System',
      category: 'Backend Logic',
      date: '2026-11',
      description:
        'Banking simulation platform handling transactions, account logic, and user operations. Focused on backend flow design and transaction handling.',
      technologies: ['JavaScript', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/kailash-23/MonopolyNetBanking.git',
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
      date: '2024-07',
      description: 'Lightweight flashcard-based learning system for efficient memory retention and quick revision.',
      technologies: ['React', 'Local Storage', 'CSS'],
    },
  ],
  'Systems & Automation': [
    {
      id: 'erpnext-ai',
      title: 'ERPNext AI Chatbot',
      category: 'Enterprise Automation',
      date: '2025-05',
      description:
        'Integrated an AI-powered chatbot within ERPNext to automate internal queries and improve operational efficiency.',
      technologies: ['ERPNext', 'Python', 'AI/NLP'],
    },
    {
      id: 'n8n-automation',
      title: 'n8n Lead Generation Automation',
      category: 'Workflow Automation',
      date: '2025-04',
      description:
        'Designed automation workflows for lead generation, scraping, and CRM integration, eliminating manual data collection processes.',
      technologies: ['n8n', 'APIs', 'JavaScript', 'Data Integration'],
    },
    {
      id: 'esp-ambilight',
      title: 'ESP Ambilight System',
      category: 'Embedded Systems',
      date: '2025-08',
      description:
        'Ambient lighting system using ESP microcontroller to synchronize lighting with screen output for immersive visuals.',
      technologies: ['ESP32', 'Arduino', 'C++', 'LED control'],
      github: 'https://github.com/kailash-23/ambilightESP.git',
    },
  ],
  'Web & Design': [
    {
      id: 'ryze-website',
      title: 'RYZE Website',
      category: 'Company Website',
      date: '2025-03',
      description:
        'Developed and deployed company website with focus on performance, responsiveness, and modern branding.',
      technologies: ['React', 'Tailwind CSS', 'Vercel'],
      github: 'https://github.com/kailash-23/ryze-landing-nest.git',
    },
    {
      id: 'aintrix-website',
      title: 'Aintrix Global Website',
      category: 'Corporate Website',
      date: '2025-02',
      description: 'Built corporate website representing company services, branding, and product ecosystem.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/kailash-23/AINTRIXGLOBAL.git',
    },
    {
      id: 'aint-branding',
      title: 'AINT Branding & Design',
      category: 'Product Branding',
      date: '2025-10',
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
      date: '2025-04',
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
  'Audio systems (IEMs & speaker tuning)',
  'UI/UX design',
  'Product design',
  '3D & game development',
]

const journeyTimeline = [
  {
    type: 'work',
    icon: '💼',
    title: 'Backend Developer',
    subtitle: 'EIT (The Golden Element)',
    date: '2025 - 2026 (Present)',
    latest: true,
    points: [
      'Backend development and automation systems',
    ],
  },
  {
    type: 'work',
    icon: '💼',
    title: 'Full Stack Developer',
    subtitle: 'Aintrix Global Pvt Ltd',
    date: '2024 - 2025',
    points: [
      'Full-stack development and system implementation',
    ],
  },
  {
    type: 'education',
    icon: '🎓',
    title: 'B.E Computer Science Engineering',
    subtitle: 'KCG College of Technology, Chennai',
    date: '2023 - 2027',
    points: [
      'Computer Science Engineering',
    ],
  },
  {
    type: 'education',
    icon: '🎓',
    title: 'Higher Secondary (12th Grade)',
    subtitle: 'Gill Adarsh Matric Hr Sec School, Chennai',
    date: '2023',
    points: [
      'School education',
    ],
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
  const scrollRaf = useRef(0)

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
    year: project.year,
    displayTitle: project.displayTitle,
    subtitle: project.subtitle,
    blurb: project.blurb,
    visual: project.visual,
    github: project.github,
    detail: project.detail,
  }))

  const mergedProjects = [...showcaseArchiveProjects, ...archiveProjects]
  const uniqueProjects = Array.from(
    new Map(mergedProjects.map((project) => [project.title.toLowerCase(), project])).values(),
  )
  const sortedProjects = uniqueProjects.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  useEffect(() => {
    const updateNavVisibility = () => {
      scrollRaf.current = 0

      const currentY = window.scrollY

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

    const onScroll = () => {
      if (scrollRaf.current) {
        return
      }

      scrollRaf.current = window.requestAnimationFrame(updateNavVisibility)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollRaf.current) {
        window.cancelAnimationFrame(scrollRaf.current)
      }
    }
  }, [])

  if (isProjectsPage) {
    return (
      <div className="projects-page relative min-h-screen overflow-x-hidden bg-(--bg) text-(--text-primary)">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(24,28,34,0.12),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(64,72,86,0.08),transparent_34%),linear-gradient(to_bottom,var(--bg),var(--bg))]" />
        <main className="projects-page-shell mx-auto flex w-full max-w-7xl flex-col px-4 pb-24 pt-12 md:px-6 lg:px-8 md:pt-16">
          <section className="unified-section">
            <div className="projects-page-header flex flex-wrap items-center justify-between gap-4">
              <h1 className="projects-editorial-title m-0!">ALL PROJECTS</h1>
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault()
                  window.location.assign('/')
                }}
                className="back-home-btn rounded-full border border-(--line) bg-(--card) px-5 py-2 text-sm font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white"
              >
                Back to Home
              </a>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.08em] text-(--text-muted)">
              Sorted by most recent first
            </p>
            <div className="projects-page-grid mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <span className="hero-name-line">Kailash</span>
                <span className="hero-name-line hero-name-line--second">Senthil</span>
              </h1>
              <p className="hero-copy">
                Building backend and automation systems with product-level reliability,
                operational clarity, and measurable impact.
              </p>
              <p className="hero-location">Based in Chennai, India</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:kailash.s2376@gmail.com"
                  className="hidden rounded-full border border-(--line) bg-(--card) px-5 py-2 text-sm font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg md:inline-flex"
                >
                  Let us connect
                </a>
                <a
                  href="#all-projects"
                  className="hidden rounded-full border border-(--line) bg-transparent px-5 py-2 text-sm font-semibold text-(--text-soft) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-(--text-white) hover:shadow-lg md:inline-flex"
                >
                  View projects
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:hidden">
                {socialLinks.map((item) => (
                  <IconButton
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    label={item.label}
                    compact
                  >
                    {item.icon}
                  </IconButton>
                ))}
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
          <div className="journey-timeline">
            <div className="journey-line" aria-hidden="true" />
            {journeyTimeline.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.date}`}
                initial={{ opacity: 0, y: 24, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`journey-item ${index % 2 === 0 ? 'journey-item-left' : 'journey-item-right'} ${item.latest ? 'journey-item-latest' : ''}`}
              >
                <div className="journey-node" aria-hidden="true">
                  <span>{item.icon}</span>
                </div>
                <div className="journey-card">
                  <p className="journey-date">{item.date}</p>
                  <h3 className="journey-title">{item.title}</h3>
                  <p className="journey-subtitle">{item.subtitle}</p>
                  <ul className="journey-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
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
                  <div className={`editorial-project-visual visual-${project.visual}`} aria-hidden="true" />

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
