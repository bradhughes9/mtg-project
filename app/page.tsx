import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import CardGallery from "@/components/card-gallery"
import FeaturedCard from "@/components/featured-card"
import DeckBuilder from "@/components/deck-builder"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">Enter Valgavoth's Domain</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-black/60 border-purple-800 p-6">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">The Soul Harvester</h3>
            <p className="text-gray-300 mb-6">
              Valgavoth, Harrower of Souls, is an ancient entity that feeds on the essence of fallen creatures. His
              power grows with each soul he consumes, making him one of the most feared beings in the multiverse.
            </p>
            <Link href="/lore">
              <Button className="bg-purple-900 hover:bg-purple-800 text-white">Explore the Lore</Button>
            </Link>
          </Card>

          <FeaturedCard />
        </div>

        <CardGallery />

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Forge Your Deck</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Harness the power of Valgavoth and his minions. Create a deck that will drain the souls of your opponents
            and leave them in eternal torment.
          </p>
          <DeckBuilder />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Official Preconstructed Deck</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Explore the official 100-card preconstructed Commander deck featuring Valgavoth, Harrower of Souls. This
            deck is designed to harvest souls and drain the life from your opponents with powerful sacrifice and
            recursion mechanics.
          </p>
          <Link href="/precon-deck">
            <Button className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-6 text-lg">
              View Full Deck List
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
