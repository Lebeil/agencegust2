"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import PrendreRDV from "./PrendreRDV"
import LogoBanner from "./LogoBanner"
import ScrollingBackgroundShaderPage from "./scrollingBackgroundGradient/ScrollingBackgroundGradientPage"
import { Leva } from 'leva'
import Template from "./Template"
import FadeObserver from "./FadeObserver"

export function Layout({ children }) {
  const pathname = usePathname()
  const pageType = pathname.split('/')[2] || pathname.split('/')[1] // Handle [lang] routes
  const isHomePage = pathname === '/' || pathname === '/fr' || pathname === '/en'

  useEffect(() => {
    // Supprimer la classe horizontal-scroll du body car GSAP gère maintenant le scroll
    document.body.classList.remove('horizontal-scroll')
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <link rel="icon" href="/assets/favicon.ico" type="image/png" />

      <Leva hidden/>
      <ScrollingBackgroundShaderPage />
      <FadeObserver />

      <Navbar />

      <Template>
        {children}
      </Template>
      {/* LogoBanner uniquement sur la page d'accueil */}
      {isHomePage && <LogoBanner />}
      <PrendreRDV />
    </>
  )
}