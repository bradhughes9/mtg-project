"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, X, Save, Download, Plus } from "lucide-react"

// Import the card art generator
import CardArtGenerator from "@/components/card-art/card-art-generator"
import ValgavothArt from "@/components/card-art/valgavoth-art"

// Mock data for available cards
const availableCards = [
  {
    id: "card-1",
    name: "Valgavoth, Harrower of Souls",
    type: "Legendary Creature — Demon",
    cost: "4BB",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-2",
    name: "Soul Harvest Ritual",
    type: "Sorcery",
    cost: "2B",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-3",
    name: "Valgavoth's Disciple",
    type: "Creature — Human Warlock",
    cost: "1B",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-4",
    name: "Realm of Torment",
    type: "Enchantment",
    cost: "3BB",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-5",
    name: "Essence Drain",
    type: "Instant",
    cost: "2B",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-6",
    name: "Valgavoth's Sanctum",
    type: "Legendary Land",
    cost: "",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "card-7",
    name: "Swamp",
    type: "Basic Land — Swamp",
    cost: "",
    image: "/placeholder.svg?height=400&width=300",
  },
]

function SortableCard({ card, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card className="p-2 bg-black/60 border-purple-800 flex items-center">
        <div {...attributes} {...listeners} className="cursor-grab mr-2">
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>

        <div className="relative h-10 w-10 mr-3 flex-shrink-0 overflow-hidden rounded">
          {card.id === "card-1" ? (
            <ValgavothArt />
          ) : (
            <CardArtGenerator
              type={
                card.type?.toLowerCase().includes("creature")
                  ? "creature"
                  : card.type?.toLowerCase().includes("land")
                    ? "land"
                    : card.type?.toLowerCase().includes("artifact")
                      ? "artifact"
                      : card.type?.toLowerCase().includes("enchantment")
                        ? "enchantment"
                        : "spell"
              }
              colorIdentity="B"
              name={card.name}
              seed={Number.parseInt(card.id.split("-")[1])}
            />
          )}
        </div>

        <div className="flex-grow">
          <p className="text-sm font-medium text-purple-300">{card.name}</p>
          <p className="text-xs text-gray-400">{card.type}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-500 hover:text-red-500"
          onClick={() => onRemove(card.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  )
}

export default function DeckBuilder() {
  const [deckName, setDeckName] = useState("Valgavoth's Soul Harvest")
  const [deckCards, setDeckCards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const filteredCards = availableCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addCardToDeck = (card) => {
    setDeckCards([...deckCards, card])
  }

  const removeCardFromDeck = (cardId) => {
    setDeckCards(deckCards.filter((card) => card.id !== cardId))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setDeckCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="bg-black/60 border border-purple-800 rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Deck section */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label htmlFor="deck-name" className="block text-sm font-medium text-gray-300 mb-1">
              Deck Name
            </label>
            <Input
              id="deck-name"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="bg-black/60 border-purple-800 text-white"
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-bold text-purple-300">Your Deck ({deckCards.length})</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-purple-800 text-purple-300 hover:bg-purple-900/30">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-purple-800 text-purple-300 hover:bg-purple-900/30">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={deckCards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
                {deckCards.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Your deck is empty. Add cards from the right panel.</p>
                  </div>
                ) : (
                  deckCards.map((card) => <SortableCard key={card.id} card={card} onRemove={removeCardFromDeck} />)
                )}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Card selection section */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <Input
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/60 border-purple-800 text-white"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 bg-black/60">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger
                value="creatures"
                className="data-[state=active]:bg-purple-900 data-[state=active]:text-white"
              >
                Creatures
              </TabsTrigger>
              <TabsTrigger value="spells" className="data-[state=active]:bg-purple-900 data-[state=active]:text-white">
                Spells
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCards.map((card) => (
                  <Card key={card.id} className="p-2 mb-2 bg-black/60 border-purple-800 flex items-center">
                    <div className="relative h-10 w-10 mr-3 flex-shrink-0 overflow-hidden rounded">
                      {card.id === "card-1" ? (
                        <ValgavothArt />
                      ) : (
                        <CardArtGenerator
                          type={
                            card.type?.toLowerCase().includes("creature")
                              ? "creature"
                              : card.type?.toLowerCase().includes("land")
                                ? "land"
                                : card.type?.toLowerCase().includes("artifact")
                                  ? "artifact"
                                  : card.type?.toLowerCase().includes("enchantment")
                                    ? "enchantment"
                                    : "spell"
                          }
                          colorIdentity="B"
                          name={card.name}
                          seed={Number.parseInt(card.id.split("-")[1])}
                        />
                      )}
                    </div>

                    <div className="flex-grow">
                      <p className="text-sm font-medium text-purple-300">{card.name}</p>
                      <p className="text-xs text-gray-400">{card.type}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-500 hover:text-purple-500"
                      onClick={() => addCardToDeck(card)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="creatures" className="mt-4">
              <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCards
                  .filter((card) => card.type.includes("Creature"))
                  .map((card) => (
                    <Card key={card.id} className="p-2 mb-2 bg-black/60 border-purple-800 flex items-center">
                      <div className="relative h-10 w-10 mr-3 flex-shrink-0 overflow-hidden rounded">
                        {card.id === "card-1" ? (
                          <ValgavothArt />
                        ) : (
                          <CardArtGenerator
                            type={
                              card.type?.toLowerCase().includes("creature")
                                ? "creature"
                                : card.type?.toLowerCase().includes("land")
                                  ? "land"
                                  : card.type?.toLowerCase().includes("artifact")
                                    ? "artifact"
                                    : card.type?.toLowerCase().includes("enchantment")
                                      ? "enchantment"
                                      : "spell"
                            }
                            colorIdentity="B"
                            name={card.name}
                            seed={Number.parseInt(card.id.split("-")[1])}
                          />
                        )}
                      </div>

                      <div className="flex-grow">
                        <p className="text-sm font-medium text-purple-300">{card.name}</p>
                        <p className="text-xs text-gray-400">{card.type}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-purple-500"
                        onClick={() => addCardToDeck(card)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="spells" className="mt-4">
              <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCards
                  .filter(
                    (card) =>
                      card.type.includes("Sorcery") ||
                      card.type.includes("Instant") ||
                      card.type.includes("Enchantment"),
                  )
                  .map((card) => (
                    <Card key={card.id} className="p-2 mb-2 bg-black/60 border-purple-800 flex items-center">
                      <div className="relative h-10 w-10 mr-3 flex-shrink-0 overflow-hidden rounded">
                        {card.id === "card-1" ? (
                          <ValgavothArt />
                        ) : (
                          <CardArtGenerator
                            type={
                              card.type?.toLowerCase().includes("creature")
                                ? "creature"
                                : card.type?.toLowerCase().includes("land")
                                  ? "land"
                                  : card.type?.toLowerCase().includes("artifact")
                                    ? "artifact"
                                    : card.type?.toLowerCase().includes("enchantment")
                                      ? "enchantment"
                                      : "spell"
                            }
                            colorIdentity="B"
                            name={card.name}
                            seed={Number.parseInt(card.id.split("-")[1])}
                          />
                        )}
                      </div>

                      <div className="flex-grow">
                        <p className="text-sm font-medium text-purple-300">{card.name}</p>
                        <p className="text-xs text-gray-400">{card.type}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-500 hover:text-purple-500"
                        onClick={() => addCardToDeck(card)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
