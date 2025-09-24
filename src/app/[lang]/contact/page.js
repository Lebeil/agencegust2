import { Layout } from "@/components/Layout"
import SliceZone from "@/components/SliceZone"
import { pageSlices } from "@/data/content"

export async function generateMetadata() {
  return {
    title: "Contact - Gust",
    description: "Entrons en contact.",
  }
}

export default async function Page() {
  const mockSlices = pageSlices.contact
  return (
    <Layout>
      <SliceZone slices={mockSlices} />
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr-fr' },
    { lang: 'en-us' },
  ]
}