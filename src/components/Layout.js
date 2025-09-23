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
    // Ajouter la classe horizontal-scroll au body pour la page d'accueil
    if (isHomePage) {
      document.body.classList.add('horizontal-scroll')
    } else {
      document.body.classList.remove('horizontal-scroll')
    }
    window.scrollTo(0, 0)
  }, [pathname, isHomePage])

  return (
    <>
      <link rel="icon" href="/assets/favicon.ico" type="image/png" />

      <Leva hidden/>
      <ScrollingBackgroundShaderPage />
      <FadeObserver />

      <Navbar />

      <Template>
        {isHomePage ? (
          // Pour la page d'accueil, utiliser une structure différente
          <div className="relative w-full h-screen overflow-visible">
            <main className="h-full">
              {children}
            </main>
          </div>
        ) : (
          // Pour les autres pages, utiliser la structure normale
          <div className="relative w-full h-full overflow-hidden">
            <main
              className={`h-full ${pageType ? `main ${pageType}` : ""}${
                pageType === "contact" ? " h-screen" : ""
              }${
                pageType === "work" || pageType === "contact" ? " pt-[var(--tw-64)]" : ""
              }`}
            >
              {children}
            </main>
          </div>
        )}
      </Template>
      {/* LogoBanner uniquement sur la page d'accueil */}
      {isHomePage && <LogoBanner />}
      <PrendreRDV />
    </>
  )
}