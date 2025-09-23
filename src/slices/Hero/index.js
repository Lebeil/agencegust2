"use client";
import { useState, useEffect } from "react";
import MainHeroMobile from "@/components/MainHeroMobile";
import ErrorBoundary from "@/components/ErrorBoundary";
import Scene from "@/components/R3F/Scene";

const Hero = ({ slice }) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Détection Safari
    if (typeof navigator !== 'undefined') {
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsSafari(isSafariBrowser);
      if (isSafariBrowser) {
        console.info('Safari détecté dans Hero : utilisation du fallback CSS');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // ✅ Tailwind lg breakpoint

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
      setIsDeviceReady(true);
    };

    handleResize(); // ✅ Set initially
    mediaQuery.addEventListener('change', handleResize); // ✅ Listen to changes

    return () => {
      mediaQuery.removeEventListener('change', handleResize); // ✅ Cleanup
    };
  }, [isMounted]);

  // Préchargement des assets critiques (vidéo) dès que possible
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const vid = document.createElement('link');
      vid.rel = 'preload';
      vid.as = 'video';
      // Charger d'abord la version light pour le first paint
      vid.href = '/assets/media/video_landing_light.webm';
      vid.crossOrigin = 'anonymous';
      document.head.appendChild(vid);

      const ph = document.createElement('link');
      ph.rel = 'preload';
      ph.as = 'video';
      ph.href = '/assets/media/video_landing_light.webm';
      document.head.appendChild(ph);
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (slice.variation === "default" && isDesktop) {
      if (document.body) {
        if (isSceneLoaded) {
          document.body.style.overflow = "auto";
        } else {
          document.body.style.overflow = "hidden";
        }
      }

      return () => {
        if (document.body) {
          document.body.style.overflow = "auto";
        }
      };
    }
  }, [isSceneLoaded, isDesktop, slice.variation]);

  // Contenu de fallback statique pour le SSR
  const StaticHeroContent = () => (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">{slice.primary?.title || "Bienvenue chez Gust"}</h1>
        <p className="text-xl opacity-80">{slice.primary?.description || "Une agence créative qui transforme vos idées"}</p>
      </div>
    </div>
  );

  // Toujours rendre la scène (client-only), sinon fallback minimal invisible
  if (!isMounted) {
    return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
        <div style={{ minHeight: '100vh' }} />
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" ? (
        <>
          <div className="lg:hidden">
            <MainHeroMobile slice={slice} />
          </div>

          <div className="hidden lg:block lg:min-h-screen relative">
            {isDeviceReady && isDesktop ? (
              <ErrorBoundary fallback={<div style={{ minHeight: '100vh' }} />}>
                <Scene
                  variation={slice.variation}
                  slice={slice}
                  isSafari={isSafari}
                  onLoaded={() => setIsSceneLoaded(true)}
                />
              </ErrorBoundary>
            ) : (
              <div style={{ minHeight: '100vh' }} />
            )}
            {/* Overlay/filtre désactivé pour préserver le blanc pur du titre */}
            <div className="pointer-events-none absolute inset-0" style={{ background: 'transparent' }} />
          </div>

          {/* Fallback content pour le SSR */}
          <noscript>
            <StaticHeroContent />
          </noscript>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform" style={{ animation: 'heroFadeSlide 1s forwards ease-out', color: '#ffffff' }}>
              {slice.primary?.title || "Bienvenue chez Gust"}
            </h1>
            <p className="text-xl opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform" style={{ animation: 'heroFadeSlide 1s 0.2s forwards ease-out', color: '#ffffff' }}>
              {slice.primary?.description || "Une agence créative qui transforme vos idées"}
            </p>
          </div>
          <style jsx>{`
            @keyframes heroFadeSlide {
              0% { opacity: 0; transform: translateY(24px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default Hero;
