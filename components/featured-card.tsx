"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import ValgavothArt from "@/components/card-art/valgavoth-art"

export default function FeaturedCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex justify-center"
    >
      <div
        className="relative max-w-[300px] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? 180 : 0,
            transition: { duration: 0.6 },
          }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
            <Card className="overflow-hidden border-2 border-purple-700 shadow-lg shadow-purple-900/50 h-full">
              <div className="relative pt-[140%]">
                <div className="absolute inset-0">
                  <ValgavothArt />
                </div>
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
            <Card className="p-6 bg-black border-2 border-purple-700 shadow-lg shadow-purple-900/50 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-purple-300">Valgavoth, Harrower of Souls</h3>
              <p className="text-sm text-gray-400 mb-2">Legendary Creature — Demon</p>
              <p className="text-sm text-gray-400 mb-2">Mana Cost: 4BB</p>
              <p className="text-sm text-gray-400 mb-2">Power/Toughness: 6/6</p>
              <div className="mt-4 text-sm text-gray-300 space-y-2">
                <p>Flying, deathtouch</p>
                <p>Whenever another creature dies, put a soul counter on Valgavoth.</p>
                <p>Remove three soul counters: Each opponent loses 3 life and you gain 3 life.</p>
              </div>
              <p className="mt-auto text-xs text-gray-500 italic">
                "Your soul is but a morsel to sate my eternal hunger."
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-lg transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.7 : 0,
            boxShadow: "0 0 40px 5px rgba(147, 51, 234, 0.7)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  )
}
