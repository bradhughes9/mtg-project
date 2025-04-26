"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import CardArtGenerator from "@/components/card-art/card-art-generator"
import ValgavothArt from "@/components/card-art/valgavoth-art"

// Mock data for cards
const cards = [
  {
    id: 1,
    name: "Valgavoth, Harrower of Souls",
    type: "Legendary Creature — Demon",
    rarity: "Mythic Rare",
    cost: "4BB",
    power: "6/6",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Flying, deathtouch\nWhenever another creature dies, put a soul counter on Valgavoth.\nRemove three soul counters: Each opponent loses 3 life and you gain 3 life.",
    category: "creature",
  },
  {
    id: 2,
    name: "Soul Harvest Ritual",
    type: "Sorcery",
    rarity: "Rare",
    cost: "2B",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Destroy target creature. If that creature would die this way, exile it instead. You gain life equal to its toughness.",
    category: "spell",
  },
  {
    id: 3,
    name: "Valgavoth's Disciple",
    type: "Creature — Human Warlock",
    rarity: "Uncommon",
    cost: "1B",
    power: "2/1",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "When Valgavoth's Disciple enters the battlefield, each opponent loses 1 life.\nSacrifice Valgavoth's Disciple: Draw a card.",
    category: "creature",
  },
  {
    id: 4,
    name: "Realm of Torment",
    type: "Enchantment",
    rarity: "Rare",
    cost: "3BB",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "At the beginning of your upkeep, each opponent loses 1 life for each creature card in their graveyard.\nB, Sacrifice a creature: Draw a card.",
    category: "enchantment",
  },
  {
    id: 5,
    name: "Essence Drain",
    type: "Instant",
    rarity: "Common",
    cost: "2B",
    image: "/placeholder.svg?height=400&width=300",
    description: "Target creature gets -2/-2 until end of turn. You gain 2 life.",
    category: "spell",
  },
  {
    id: 6,
    name: "Valgavoth's Sanctum",
    type: "Legendary Land",
    rarity: "Rare",
    image: "/placeholder.svg?height=400&width=300",
    description:
      "T: Add B.\nT, Pay 2 life: Add BB.\n3B, T, Sacrifice Valgavoth's Sanctum: Return target creature card from your graveyard to the battlefield. It gains haste until end of turn.",
    category: "land",
  },
]

export default function CardGallery() {
  const [filter, setFilter] = useState("all")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const filteredCards = filter === "all" ? cards : cards.filter((card) => card.category === filter)

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">Card Gallery</h2>

      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="grid grid-cols-4 max-w-md mx-auto bg-black/60">
          <TabsTrigger
            value="all"
            onClick={() => setFilter("all")}
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="creature"
            onClick={() => setFilter("creature")}
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
          >
            Creatures
          </TabsTrigger>
          <TabsTrigger
            value="spell"
            onClick={() => setFilter("spell")}
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
          >
            Spells
          </TabsTrigger>
          <TabsTrigger
            value="land"
            onClick={() => setFilter("land")}
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
          >
            Lands
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <Card className="overflow-hidden bg-black/60 border-purple-800 h-full flex flex-col">
                  <div className="relative pt-[140%]">
                    {card.id === 1 ? (
                      <div className="absolute inset-0">
                        <ValgavothArt />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <CardArtGenerator
                          type={card.category as any}
                          colorIdentity="B"
                          name={card.name}
                          seed={card.id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1 text-purple-300">{card.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{card.type}</p>
                    <p className="text-xs text-gray-500 mb-2">{card.rarity}</p>
                    {card.power && <p className="text-sm text-gray-400 mb-2">Power/Toughness: {card.power}</p>}

                    {hoveredCard === card.id && (
                      <div className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-purple-800 text-purple-300 hover:bg-purple-900/30"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creature" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <Card className="overflow-hidden bg-black/60 border-purple-800 h-full flex flex-col">
                  <div className="relative pt-[140%]">
                    {card.id === 1 ? (
                      <div className="absolute inset-0">
                        <ValgavothArt />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <CardArtGenerator
                          type={card.category as any}
                          colorIdentity="B"
                          name={card.name}
                          seed={card.id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1 text-purple-300">{card.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{card.type}</p>
                    <p className="text-xs text-gray-500 mb-2">{card.rarity}</p>
                    {card.power && <p className="text-sm text-gray-400 mb-2">Power/Toughness: {card.power}</p>}

                    {hoveredCard === card.id && (
                      <div className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-purple-800 text-purple-300 hover:bg-purple-900/30"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spell" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <Card className="overflow-hidden bg-black/60 border-purple-800 h-full flex flex-col">
                  <div className="relative pt-[140%]">
                    {card.id === 1 ? (
                      <div className="absolute inset-0">
                        <ValgavothArt />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <CardArtGenerator
                          type={card.category as any}
                          colorIdentity="B"
                          name={card.name}
                          seed={card.id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1 text-purple-300">{card.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{card.type}</p>
                    <p className="text-xs text-gray-500 mb-2">{card.rarity}</p>

                    {hoveredCard === card.id && (
                      <div className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-purple-800 text-purple-300 hover:bg-purple-900/30"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="land" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <Card className="overflow-hidden bg-black/60 border-purple-800 h-full flex flex-col">
                  <div className="relative pt-[140%]">
                    {card.id === 1 ? (
                      <div className="absolute inset-0">
                        <ValgavothArt />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <CardArtGenerator
                          type={card.category as any}
                          colorIdentity="B"
                          name={card.name}
                          seed={card.id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-1 text-purple-300">{card.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{card.type}</p>
                    <p className="text-xs text-gray-500 mb-2">{card.rarity}</p>

                    {hoveredCard === card.id && (
                      <div className="mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 border-purple-800 text-purple-300 hover:bg-purple-900/30"
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-8">
        <Button className="bg-purple-900 hover:bg-purple-800 text-white">View All Cards</Button>
      </div>
    </div>
  )
}
