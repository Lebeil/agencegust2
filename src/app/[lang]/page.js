import { Layout } from "@/components/Layout"
import { homePageContent } from "@/data/content"
import Hero from "@/components/Hero"
import ThreeColumnsAccordion from "@/components/ThreeColumnsAccordion"
import HorizontalScrollIndicator from "@/components/HorizontalScrollIndicator"

export async function generateMetadata({ params }) {
  const { lang } = params

  return {
    title: "Gust - We create stop-scrollers",
    description: "L'attention, l'essentiel pour les marques. Nous créons des campagnes qui capturent l'attention.",
    keywords: "creative agency, stop scrollers, marketing, campaigns",
    openGraph: {
      title: "Gust - We create stop-scrollers",
      description: "L'attention, l'essentiel pour les marques. Nous créons des campagnes qui capturent l'attention.",
    },
  }
}

export default async function Page({ params }) {
  const { lang } = await params

  return (
    <Layout>
      {/* Conteneur principal avec scroll horizontal pour la page d'accueil */}
      <div className="home-horizontal-scroll">
        <div className="horizontal-scroll-container">
          <div className="h-screen flex flex-col justify-start items-center -mt-16 overflow-hidden relative min-h-0">
            <Hero content={homePageContent.hero} />
          </div>

          {/* Section des 3 colonnes - We think, We connect, We produce */}
          <div className="h-screen w-full relative">
            <ThreeColumnsAccordion />
          </div>
        </div>
      </div>

      {/* Indicateur de scroll horizontal */}
      <HorizontalScrollIndicator totalSections={2} />
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'en' }
  ]
}