"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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

// Constants for 3D orbit
const ORBIT_RADIUS = 250; // Distance from center for orbiting
const ORBIT_DEPTH = 150;  // Z-axis variation for 3D effect
const BOX_DEPTH_OFFSET = 100; // Position of the invisible focal point behind the box

export function AlumniCarousel({ alumni }: AlumniCarouselProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [orbitProgress, setOrbitProgress] = useState(0) // 0-360 degrees of orbit rotation
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Number of alumni cards
  const numCards = alumni.length
  
  // Stop auto-rotation when a card is selected
  useEffect(() => {
    if (selectedCard !== null) {
      setAutoRotate(false)
    } else {
      setAutoRotate(true)
    }
  }, [selectedCard])

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || !isHovered) return;
    
    const interval = setInterval(() => {
      setOrbitProgress(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate, isHovered]);

  return (
    <div className="relative py-16 mx-auto max-w-5xl perspective">
      {/* Central box that contains the cards */}
      <div 
        ref={containerRef}
        className="relative mx-auto w-64 h-64 bg-palette-beige rounded-xl border-4 border-palette-darkGreen/30 flex items-center justify-center shadow-lg z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (selectedCard === null) {
            setIsHovered(false)
          }
        }}
      >
        <motion.div
          className="absolute inset-0 bg-palette-brightGreen/10 rounded-lg"
          animate={{ 
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 2, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse" 
          }}
        />
        
        {/* Box content */}
        <div className="text-center p-4">
          <motion.div
            animate={{ 
              opacity: selectedCard !== null ? 0 : 1,
              scale: selectedCard !== null ? 0.8 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-palette-darkGreen mb-2">Alumni</h3>
            <p className="text-palette-darkGreen/70 text-sm">
              {isHovered ? "Click a card to learn more" : "Hover to explore alumni stories"}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute w-full h-full rounded-xl border-2 border-palette-brightGreen/20"
          animate={{ 
            rotate: 360,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.5 }
          }}
        />
      </div>
      
      {/* Invisible focal point for 3D orbit (positioned behind the box) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateZ(-${BOX_DEPTH_OFFSET}px)` }}>
        {/* This div serves as the invisible focal point for the orbit */}
      </div>
      
      {/* Orbiting alumni cards */}
      <div className="absolute inset-0 flex items-center justify-center preserve-3d">
        {alumni.map((person, index) => {
          // Calculate the base angle for card positioning with offset for each card
          const baseAngle = (index * (360 / numCards)) % 360;
          
          // Add orbit progress to create rotation effect
          const angle = (baseAngle + orbitProgress) % 360;
          
          // Calculate 3D position using sin/cos
          const radians = (angle * Math.PI) / 180;
          
          // Calculate whether this card should be popped out
          const isSelected = selectedCard === index;
          
          // Calculate z-index based on position in orbit
          // Cards in front (angles near 0 or 360) should have higher z-index
          const zIndex = Math.round(Math.cos(radians) * 10) + 20;
          
          // Calculate opacity based on position (more visible in front)
          const cardOpacity = isHovered ? 0.4 + (Math.cos(radians) + 1) / 4 : 0;
          
          // Calculate scale based on position (larger in front, smaller in back)
          const cardScale = isHovered ? 0.7 + (Math.cos(radians) + 1) / 5 : 0.7;
          
          return (
            <AnimatePresence key={person.id} mode="wait">
              {/* Orbiting card */}
              {!isSelected && (
                <motion.div
                  className="absolute preserve-3d"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    // 3D positioning for orbit
                    x: isHovered ? `${Math.sin(radians) * ORBIT_RADIUS}px` : 0,
                    y: isHovered ? `${Math.sin(radians) * 40}px` : 0, // Small vertical oscillation
                    z: isHovered ? `${Math.cos(radians) * ORBIT_DEPTH}px` : 0,
                    rotateY: isHovered ? -angle : 0, // Rotate cards to face the viewer
                    scale: cardScale,
                    opacity: cardOpacity,
                    zIndex: zIndex,
                  }}
                  transition={{ 
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    // Different durations for coming out of box vs orbiting
                    default: { 
                      duration: autoRotate ? 0.8 : 0.5,
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedCard(index)}
                  whileHover={{ scale: cardScale * 1.2, zIndex: 30 }}
                >
                  <div className="w-40 h-40 rounded-lg shadow-md overflow-hidden cursor-pointer transform preserve-3d">
                    {/* Alumni image */}
                    <div className="relative h-40 w-40">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                      {/* Only show name on hover and when close to front */}
                      {Math.cos(radians) > 0.3 && (
                        <div className="absolute inset-0 bg-palette-darkGreen/50 flex items-end">
                          <div className="p-2 text-white w-full">
                            <p className="font-medium text-sm truncate">{person.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>
      
      {/* Selected card details (popped out) */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="relative bg-white rounded-xl overflow-hidden max-w-md w-full mx-4 shadow-2xl"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 z-20 bg-white/80 p-1 rounded-full text-palette-darkGreen hover:bg-white"
              >
                <X size={20} />
              </button>
              
              {/* Alumni hero section */}
              <div className="relative h-48">
                <Image
                  src={alumni[selectedCard].image}
                  alt={alumni[selectedCard].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-palette-darkGreen/90 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{alumni[selectedCard].name}</h3>
                  <p className="text-white/90">{alumni[selectedCard].role}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <Badge className="bg-palette-brightGreen text-palette-darkGreen">
                  Class of {alumni[selectedCard].year}
                </Badge>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-palette-darkGreen">Alumni Story</h4>
                  <motion.p 
                    className="text-palette-darkGreen/80 italic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{alumni[selectedCard].quote}"
                  </motion.p>
                </div>
                
                <div className="pt-4 border-t border-palette-beige/50">
                  <p className="text-sm text-palette-darkGreen/70">
                    Click outside this card to return to the alumni showcase
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}