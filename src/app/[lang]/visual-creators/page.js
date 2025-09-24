import { Layout } from "@/components/Layout"
import SliceZone from "@/components/SliceZone"
import { components } from "@/slices"
import { pageSlices } from "@/data/content"

export async function generateMetadata() {
  return {
    title: "Visual Creators - Gust",
    description: "Page Visual Creators",
  }
}

export default async function Page() {
  const mockSlices = pageSlices.visualCreators
  return (
    <Layout>
      <SliceZone slices={mockSlices} components={components} />
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr-fr' },
    { lang: 'en-us' },
  ]
}