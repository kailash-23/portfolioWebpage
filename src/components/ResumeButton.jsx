import { motion } from 'framer-motion'

const MotionButton = motion.button

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path
        d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 2v7h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResumeButton() {
  const handleDownload = () => {
    // Create a sample resume PDF URL (replace with actual resume link)
    const resumeUrl = '/resume.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Kailash_Senthil_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <MotionButton
      onClick={handleDownload}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 rounded-full border border-(--line) bg-(--card) px-6 py-3 font-semibold text-(--text-primary) transition-all duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-lg"
    >
      <FileIcon />
      Download Resume
    </MotionButton>
  )
}
