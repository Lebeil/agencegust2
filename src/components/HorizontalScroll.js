// components/HorizontalScroll.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Hero from "@/components/Hero";
import ThreeColumnsAccordion from "@/components/ThreeColumnsAccordion";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import ExpertisesGrid from "@/components/ExpertisesGrid";
import { homePageContent } from "@/data/content";

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef(null);

  // Données des projets correspondant exactement à la maquette visible
  const projectsData = [
    { 
      title: "Les secrets de Loly", 
      client: "OPI", 
      video: "/assets/media/cases_studies/Les%20secrets%20de%20loly.mp4",
      poster: "/assets/media/cases_studies/cover/LSL_cover%202.png",
      tags: ["Production"], 
      textColor: "text-white" 
    },
    { 
      title: "La Biche-Renard", 
      client: "LA BICHE-RENARD", 
      video: "/assets/media/cases_studies/La%20biche%20Renard.mov",
      poster: "/assets/media/cases_studies/cover/LA%20BICHEv.png",
      tags: ["Influence", "Production"], 
      textColor: "text-white" 
    },
    { 
      title: "Vertbaudet", 
      client: "VERTBAUDET", 
      video: "/assets/media/cases_studies/Verbaudet-cartable.mp4",
      poster: "/assets/media/cases_studies/cover/VERTBAUDET_cover%202.png",
      tags: ["Production", "Social média"], 
      textColor: "text-white" 
    },
    { 
      title: "Vestiaire Collective", 
      client: "VESTIAIRE COLLECTIVE", 
      video: "/assets/media/cases_studies/Vestiaire_Collective.mp4",
      poster: "/assets/media/cases_studies/cover/VestiaireCo_cover%202.png",
      tags: ["Influence"], 
      textColor: "text-white" 
    },
    { 
      title: "Showroom Privé", 
      client: "SHOWROOM PRIVÉ", 
      video: "/assets/media/cases_studies/ShowroomBy-Faustine.mp4",
      poster: "/assets/media/cases_studies/cover/Faustine_cover%202.png",
      tags: ["Célébrité", "Production"], 
      textColor: "text-white" 
    },
    { 
      title: "Service Civique Solidarité Seniors", 
      client: "WĀJ", 
      video: "/assets/media/cases_studies/Service%20civique%20solidarit%C3%A9.mp4",
      poster: "/assets/media/cases_studies/cover/SC2S_cover%202.png",
      tags: ["Influence", "Social média"], 
      textColor: "text-white" 
    }
  ];

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
          width: '400vw', // 4 sections de 100vw chacune
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
        <section className="section">
          <ProjectsSection projectsData={projectsData} />
        </section>
        <section className="section">
          <ExpertisesSection />
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
        .section:nth-child(4) {
          padding-top: 0;
          justify-content: center;
          align-items: center;
          overflow: visible;
        }
      `}</style>
      
    </div>
  );
};

// Composant pour la section "Nos projets" avec layout fidèle à la maquette
function ProjectsSection({ projectsData }) {
  const [galleryApi, setGalleryApi] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevious = () => {
    if (galleryApi) {
      galleryApi.prev();
    }
  };

  const handleNext = () => {
    if (galleryApi) {
      galleryApi.next();
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col justify-center items-center px-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec titre à gauche et flèches à droite */}
      <div className="w-full flex justify-between items-center mb-12">
        <h2 className="text-white text-2xl md:text-3xl font-semibold">
          Nos projets
        </h2>
        
        {/* Flèches de navigation circulaires */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            aria-label="Projet précédent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            aria-label="Projet suivant"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Galerie de projets - prend toute la largeur */}
      <div className="w-full">
        <AutoScrollGallery 
          images={projectsData}
          enableAutoScroll={true}
          scrollable={true}
          visibleImages={4}
          onApiReady={setGalleryApi}
          duplicate={true}
          autoScrollSpeed={0.02}
        />
      </div>
    </div>
  );
}

// Composant pour la section "Expertises" avec navigation par flèches
function ExpertisesSection() {
  const [currentExpertise, setCurrentExpertise] = useState(0);
  
  const expertises = ['production', 'social', 'ugc', 'celebrity', 'influence'];
  
  const handlePrevious = () => {
    setCurrentExpertise((prev) => 
      prev === 0 ? expertises.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentExpertise((prev) => 
      prev === expertises.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-visible">
      {/* Flèche gauche */}
      <button
        onClick={handlePrevious}
        className="absolute left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        aria-label="Expertise précédente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* ExpertisesGrid au centre */}
      <div className="w-full h-full flex items-center justify-center">
        <ExpertisesGridWithControl currentIndex={currentExpertise} />
      </div>

      {/* Flèche droite */}
      <button
        onClick={handleNext}
        className="absolute right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        aria-label="Expertise suivante"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}

// Version contrôlée de l'ExpertisesGrid
function ExpertisesGridWithControl({ currentIndex }) {
  return <ExpertisesGrid forceActiveIndex={currentIndex} />;
}

export default HorizontalScroll;
