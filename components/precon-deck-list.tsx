"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { preconDeck, type Card as CardType } from "@/data/precon-deck"
import CardArtGenerator from "@/components/card-art/card-art-generator"
import ValgavothArt from "@/components/card-art/valgavoth-art"
import { Download, Search } from "lucide-react"

export default function PreconDeckList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Group cards by type
  const creatures = preconDeck.filter((card) => card.cardType === "creature")
  const spells = preconDeck.filter((card) => card.cardType === "spell")
  const lands = preconDeck.filter((card) => card.cardType === "land")
  const artifacts = preconDeck.filter((card) => card.cardType === "artifact")
  const enchantments = preconDeck.filter((card) => card.cardType === "enchantment")

  // Filter cards based on search term
  const filterCards = (cards: CardType[]) => {
    if (!searchTerm) return cards
    return cards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Get cards based on current filter
  const getFilteredCards = () => {
    switch (filter) {
      case "creatures":
        return filterCards(creatures)
      case "spells":
        return filterCards(spells)
      case "lands":
        return filterCards(lands)
      case "artifacts":
        return filterCards(artifacts)
      case "enchantments":
        return filterCards(enchantments)
      default:
        return filterCards(preconDeck)
    }
  }

  const filteredCards = getFilteredCards()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-purple-300">Valgavoth's Soul Harvest</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          The official preconstructed deck featuring Valgavoth, Harrower of Souls. This 100-card Commander deck is
          designed to harvest souls and drain the life from your opponents.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/60 border-purple-800 text-white"
          />
        </div>
        <Button className="bg-purple-900 hover:bg-purple-800 text-white">
          <Download className="h-4 w-4 mr-2" />
          Export Deck List
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value)}>
        <TabsList className="grid grid-cols-6 max-w-3xl mx-auto bg-black/60">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
            All ({preconDeck.length})
          </TabsTrigger>
          <TabsTrigger value="creatures" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
            Creatures ({creatures.length})
          </TabsTrigger>
          <TabsTrigger value="spells" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
            Spells ({spells.length})
          </TabsTrigger>
          <TabsTrigger
            value="enchantments"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
          >
            Enchantments ({enchantments.length})
          </TabsTrigger>
          <TabsTrigger value="artifacts" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
            Artifacts ({artifacts.length})
          </TabsTrigger>
          <TabsTrigger value="lands" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
            Lands ({lands.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creatures" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="spells" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enchantments" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lands" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Total: {preconDeck.length} cards ({creatures.length} Creatures, {spells.length} Spells, {enchantments.length}{" "}
          Enchantments, {artifacts.length} Artifacts, {lands.length} Lands)
        </p>
      </div>
    </div>
  )
}

function CardItem({ card }: { card: CardType }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400"
      case "uncommon":
        return "text-blue-400"
      case "rare":
        return "text-yellow-400"
      case "mythic":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div
      className="relative cursor-pointer transition-transform duration-300 transform hover:scale-105"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <Card className="overflow-hidden bg-black/60 border-purple-800 h-full flex flex-col">
            <div className="relative pt-[140%]">
              {card.id === "card-1" ? (
                <div className="absolute inset-0">
                  <ValgavothArt />
                </div>
              ) : (
                <div className="absolute inset-0">
                  <CardArtGenerator
                    type={card.cardType}
                    colorIdentity={card.colorIdentity}
                    name={card.name}
                    seed={Number.parseInt(card.id.split("-")[1])}
                  />
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-purple-300">{card.name}</h3>
                <span className="text-sm font-medium">{card.cost}</span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{card.type}</p>
              <p className={`text-xs mb-2 ${getRarityColor(card.rarity)}`}>{card.rarity}</p>
              {card.power && <p className="text-sm text-gray-400 mb-2">Power/Toughness: {card.power}</p>}
            </div>
          </Card>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="p-4 bg-black border-purple-800 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-2 text-purple-300">{card.name}</h3>
            <p className="text-sm text-gray-400 mb-1">{card.type}</p>
            <p className={`text-xs mb-3 ${getRarityColor(card.rarity)}`}>{card.rarity}</p>
            {card.cost && <p className="text-sm text-gray-400 mb-2">Mana Cost: {card.cost}</p>}
            {card.power && <p className="text-sm text-gray-400 mb-2">Power/Toughness: {card.power}</p>}
            <div className="mt-2 text-sm text-gray-300 space-y-2">
              {card.description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            {card.flavorText && <p className="mt-auto text-xs text-gray-500 italic">"{card.flavorText}"</p>}
          </Card>
        </div>
      </div>
    </div>
  )
}
