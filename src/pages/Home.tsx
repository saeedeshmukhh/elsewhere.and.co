import { Hero } from '../components/home/Hero'
import { FeaturedCollection } from '../components/home/FeaturedCollection'
import { FeaturedPieces } from '../components/home/FeaturedPieces'
import { BrandStory } from '../components/home/BrandStory'
import { WhyElsewhere } from '../components/home/WhyElsewhere'
import { Newsletter } from '../components/home/Newsletter'
import { InstagramStrip } from '../components/home/InstagramStrip'

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <FeaturedPieces />
      <BrandStory />
      <WhyElsewhere />
      <Newsletter />
      <InstagramStrip />
    </>
  )
}
