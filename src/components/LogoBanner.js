"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

/**
 * Bandeau défilant de logos de clients
 * S'affiche UNIQUEMENT sur la première section (Hero avec animation 3D)
 * Se masque automatiquement sur la deuxième section (ThreeColumnsAccordion)
 */
export default function LogoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  // Liste des logos clients avec leurs images - chemins vérifiés
  const logos = useMemo(() => [
    { name: "Emma", image: "/images/emma.svg" },
    { name: "Vestiaire Collective", image: "/images/vestiaire_collective.svg" },
    { name: "Vertbaudet", image: "/images/verbaudet.svg" },
    { name: "Nestlé", image: "/images/Nestlé.svg" },
    { name: "CyberGhost", image: "/images/cyberghost_vpn.svg" },
    { name: "Quick", image: "/images/quick.svg" },
    { name: "Parions Sport", image: "/images/parions_sport.svg" },
    { name: "Orange", image: "/images/orange_logo.svg" },
    { name: "Coca-Cola", image: "/images/coca_cola.svg" },
    { name: "NIVEA", image: "/images/NIVEA.svg" },
    { name: "O.P.I", image: "/images/OPI.svg" },
    { name: "Showroom Privé", image: "/images/showroom_privé.svg" }
  ], []);

  useEffect(() => {
    let animationId;
    let timeoutId;

    const handleScroll = () => {
      const now = Date.now();

      // Ajouter un délai minimum entre les vérifications (100ms)
      if (now - lastScrollTime < 100) {
        return;
      }

      setLastScrollTime(now);

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        animationId = requestAnimationFrame(() => {
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          const sectionWidth = window.innerWidth;
          const currentSection = Math.round(scrollLeft / sectionWidth);

          // Afficher uniquement sur la première section (Hero avec animation 3D)
          // currentSection === 0 : Section Hero
          // currentSection === 1 : Section ThreeColumnsAccordion
          // currentSection === 2+ : Sections suivantes (si ajoutées)
          const shouldBeVisible = currentSection === 0;

          // Vérification stricte : seulement section 0 est visible
          if (isVisible !== shouldBeVisible) {
            setIsVisible(shouldBeVisible);
          }
        });
      }, 50);
    };

    // Écouter les événements de scroll avec capture pour être prioritaire
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, lastScrollTime]);

  // Alternative : utiliser IntersectionObserver si le scroll ne fonctionne pas
  useEffect(() => {
    const heroSection = document.querySelector('[data-section="hero"]');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          const shouldBeVisible = entry.isIntersecting;
          if (isVisible !== shouldBeVisible) {
            setIsVisible(shouldBeVisible);
          }
        }
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // Précharger les images pour éviter le délai d'affichage
  useEffect(() => {
    if (isVisible) {
      logos.forEach((logo) => {
        const img = new window.Image();
        img.src = logo.image;
      });
    }
  }, [isVisible, logos]);

  // Dupliquer les logos pour un défilement continu (6 fois pour une boucle parfaite)
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  if (!isVisible) {
    return null; // Ne rien rendre si pas visible
  }

  return (
    <div
      className="fixed bottom-10 w-full py-4 overflow-hidden z-10 transition-opacity duration-200"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, rgba(0,0,0,0.9) 8%, black 10%, black 90%, rgba(0,0,0,0.9) 92%, rgba(0,0,0,0.3) 95%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, rgba(0,0,0,0.9) 8%, black 10%, black 90%, rgba(0,0,0,0.9) 92%, rgba(0,0,0,0.3) 95%, transparent 100%)',
        opacity: isVisible ? 1 : 0,
        willChange: 'opacity'
      }}
    >
      <div className="flex animate-scroll-left logo-banner-container">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center w-[140px] logo-banner-item"
          >
            <div className="relative w-32 h-20 flex items-center justify-center">
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                sizes="128px"
                style={{ objectFit: 'contain' }}
                className="opacity-100 transition-opacity duration-200 logo-banner-image"
                priority={index < logos.length} // Priorité pour les premiers logos
                loading={index < logos.length ? "eager" : "lazy"} // Chargement immédiat pour les premiers
                placeholder="empty"
                onError={(e) => {
                  // Fallback pour les images qui ne se chargent pas
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}