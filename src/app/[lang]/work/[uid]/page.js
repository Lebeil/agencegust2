import { Layout } from "@/components/Layout"
import SliceZone from "@/components/SliceZone"
import { components } from "@/slices"
import { pageSlices } from "@/data/content"

export async function generateMetadata() {
  return {
    title: "Work - Gust",
    description: "Case study",
  }
}

export default async function Page() {
  const mockSlices = pageSlices.workDetail
  return (
    <Layout>
      <SliceZone slices={mockSlices} components={components} />
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { uid: 'example', lang: 'fr-fr' },
    { uid: 'example', lang: 'en-us' },
  ]
}