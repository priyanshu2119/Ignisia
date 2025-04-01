"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Alumni {
  id: number
  name: string
  role: string
  image: string
  year: string
  quote: string
}

interface AlumniCarouselProps {
  alumni: Alumni[]
}

export function AlumniCarousel({ alumni }: AlumniCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Auto-rotate every 5 seconds if no interaction
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredIndex === null) { // Only auto-rotate if not being hovered
        setActiveIndex(prev => (prev + 1) % alumni.length)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [alumni.length, hoveredIndex])

  return (
    <div className="relative h-[500px] mx-auto max-w-5xl">
      {/* Decorative circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full border-2 border-palette-brightGreen/30 dark:border-palette-brightGreen/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full border-2 border-palette-darkGreen/20 dark:border-palette-darkGreen/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Alumni cards container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {alumni.map((person, index) => {
          // Calculate position based on active index
          const position = (index - activeIndex + alumni.length) % alumni.length
          
          // Visual properties based on position
          let translateX = 0
          let opacity = 0
          let scale = 0.7
          let zIndex = 0
          
          if (position === 0) {
            // Center (active) card
            translateX = 0
            opacity = 1
            scale = 1
            zIndex = 30
          } else if (position === 1 || position === alumni.length - 1) {
            // Cards to the sides
            translateX = position === 1 ? 280 : -280
            opacity = 0.7
            scale = 0.85
            zIndex = 20
          } else if (position === 2 || position === alumni.length - 2) {
            // Cards further to the sides
            translateX = position === 2 ? 480 : -480
            opacity = 0.4
            scale = 0.7
            zIndex = 10
          } else {
            // Hidden cards
            translateX = position < alumni.length / 2 ? 600 : -600
            opacity = 0
            scale = 0.5
            zIndex = 0
          }
          
          return (
            <motion.div
              key={person.id}
              className="absolute w-[280px] cursor-pointer"
              style={{ zIndex }}
              animate={{ 
                x: translateX,
                opacity,
                scale,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              whileHover={{ 
                scale: scale * 1.05,
                transition: { duration: 0.2 }
              }}
              onClick={() => setActiveIndex(index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="bg-white dark:bg-palette-darkGreen rounded-xl overflow-hidden shadow-lg"
                animate={{
                  rotateY: hoveredIndex === index ? 0 : 5,
                  y: hoveredIndex === index ? -10 : 0
                }}
              >
                {/* Alumni image */}
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-palette-darkGreen/50"></div>
                  
                  {/* Floating elements that animate for active card */}
                  {activeIndex === index && (
                    <>
                      <motion.div 
                        className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-palette-brightGreen/20"
                        animate={{ y: [0, -10, 0], rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-palette-lightYellow/30"
                        animate={{ x: [0, 10, 0], rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-medium text-lg">{person.name}</h3>
                    <p className="text-sm text-white/80">{person.role}</p>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  <Badge variant="outline" className="mb-2 border-palette-brightGreen text-palette-brightGreen">
                    Class of {person.year}
                  </Badge>
                  
                  <AnimatePresence>
                    {(activeIndex === index || hoveredIndex === index) && (
                      <motion.p 
                        className="text-sm text-palette-darkGreen/80 dark:text-white/80 italic"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        "{person.quote}"
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Indicator for active alumni */}
                {activeIndex === index && (
                  <motion.div 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-palette-brightGreen rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5], width: ['60%', '80%', '60%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
        {alumni.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-palette-brightGreen" : "bg-palette-darkGreen/30 hover:bg-palette-darkGreen/50"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}