"use client"

import { useEffect, useState } from "react"

export default function HorizontalScrollIndicator({ totalSections = 2 }) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    // S'assurer que le body permet le scroll horizontal
    document.body.style.overflowX = 'auto'
    document.body.style.overflowY = 'hidden'

    const handleScroll = () => {
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const sectionWidth = window.innerWidth
      const currentSection = Math.round(scrollLeft / sectionWidth)
      setActiveSection(currentSection)
    }

    // Écouter les événements de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionIndex) => {
    const sectionWidth = window.innerWidth
    const targetScroll = sectionIndex * sectionWidth

    window.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <div className="horizontal-scroll-indicator">
      {Array.from({ length: totalSections }, (_, index) => (
        <button
          key={index}
          className={`scroll-dot ${activeSection === index ? 'active' : ''}`}
          onClick={() => scrollToSection(index)}
          aria-label={`Aller à la section ${index + 1}`}
        />
      ))}
    </div>
  )
}
