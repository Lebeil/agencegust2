// components/HorizontalScroll.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Hero from "@/components/Hero";
import ThreeColumnsAccordion from "@/components/ThreeColumnsAccordion";
import { homePageContent } from "@/data/content";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef(null);

  useEffect(() => {
    const sections = sectionsRef.current;
    const container = containerRef.current;

    // Animation avec GSAP et ScrollTrigger
    let ctx = gsap.context(() => {
      gsap.to(sections, {
        x: () => -(sections.scrollWidth - container.offsetWidth),
        ease: 'none', // Pas d'accélération ou de décélération
        scrollTrigger: {
          trigger: container,
          pin: true, // "Épingle" le conteneur pendant le défilement horizontal
          scrub: 1, // Lie l'animation directement au défilement (1s de lissage)
          end: () => `+=${sections.scrollWidth - container.offsetWidth}`,
        },
      });
    });

    // Nettoyage de l'animation à la destruction du composant
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', background: 'transparent' }}>
      <div
        ref={sectionsRef}
        style={{
          width: '200vw', // 2 sections de 100vw chacune
          height: '100vh',
          display: 'flex',
          flexWrap: 'nowrap',
          background: 'transparent',
        }}
      >
        <section className="section">
          <Hero content={homePageContent.hero} />
        </section>
        <section className="section">
          <ThreeColumnsAccordion />
        </section>
      </div>

      <style jsx>{`
        .section {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding-top: 4rem;
          position: relative;
        }
        .section:first-child {
          transform: translateY(-15vh);
        }
      `}</style>
    </div>
  );
};

export default HorizontalScroll;
