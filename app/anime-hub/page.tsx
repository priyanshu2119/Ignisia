"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Clock, Calendar, TrendingUp, Heart, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const featuredAnime = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/placeholder.svg?height=300&width=200&text=AoT",
    rating: 4.8,
    episodes: 87,
    genre: "Action, Drama",
    year: 2013,
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "/placeholder.svg?height=300&width=200&text=Demon+Slayer",
    rating: 4.7,
    episodes: 44,
    genre: "Action, Fantasy",
    year: 2019,
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/placeholder.svg?height=300&width=200&text=Jujutsu+Kaisen",
    rating: 4.6,
    episodes: 24,
    genre: "Action, Supernatural",
    year: 2020,
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "/placeholder.svg?height=300&width=200&text=MHA",
    rating: 4.5,
    episodes: 113,
    genre: "Action, Superhero",
    year: 2016,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Anime Movie Night",
    date: "April 15, 2025",
    time: "7:00 PM",
    location: "Student Center, Room 101",
    description: "Join us for a screening of the latest anime movie releases!",
    image: "/placeholder.svg?height=200&width=300&text=Movie+Night",
  },
  {
    id: 2,
    title: "Cosplay Workshop",
    date: "April 22, 2025",
    time: "5:30 PM",
    location: "Arts Building, Room 203",
    description: "Learn how to create amazing cosplay costumes with our expert crafters.",
    image: "/placeholder.svg?height=200&width=300&text=Cosplay+Workshop",
  },
  {
    id: 3,
    title: "Manga Drawing Class",
    date: "April 29, 2025",
    time: "6:00 PM",
    location: "Library, Study Room B",
    description: "Learn the basics of manga-style drawing from experienced artists.",
    image: "/placeholder.svg?height=200&width=300&text=Manga+Drawing",
  },
]

export default function AnimeHubPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [hoveredAnime, setHoveredAnime] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-palette-beige/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-palette-darkGreen" />
            <span className="text-palette-darkGreen">Back to Ignisia</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6 md:py-24">
        <motion.div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex bg-palette-lightYellow text-palette-darkGreen">Anime Hub</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Your Campus Anime Community
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Discover, discuss, and share your favorite anime with fellow enthusiasts. Join events, watch parties,
                and more!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="group bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90"
              >
                <span className="flex items-center">
                  Join Community
                  <motion.span className="ml-2" initial={{ x: 0 }} whileHover={{ x: 5 }}>
                    →
                  </motion.span>
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                Browse Anime
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-lightYellow"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Anime+Community')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Connect with Fans</h2>
              <p className="text-palette-darkGreen/90">Share your passion for anime</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-palette-darkGreen">Featured Anime</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              Check out these popular series recommended by our community
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAnime.map((anime, index) => (
              <motion.div
                key={anime.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoveredAnime(index)}
                onHoverEnd={() => setHoveredAnime(null)}
              >
                <Card className="overflow-hidden h-full border-palette-beige">

                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={anime.image || "/placeholder.svg"}
                      alt={anime.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-palette-lightYellow text-palette-darkGreen">
                        <Star className="mr-1 h-3 w-3 fill-current" /> {anime.rating}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-palette-darkGreen/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-bold">{anime.title}</h3>
                        <p className="text-sm text-white/80">{anime.genre}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-palette-darkGreen">{anime.title}</CardTitle>
                    <CardDescription className="text-palette-darkGreen/70">{anime.genre}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{anime.episodes} episodes</span>
                    </div>
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{anime.year}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full group border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                    >
                      <span className="flex items-center">
                        View Details
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          animate={{ x: hoveredAnime === index ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-palette-darkGreen">Explore Anime</h2>
              <TabsList className="bg-palette-beige">
                <TabsTrigger
                  value="trending"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-lightYellow data-[state=active]:text-palette-darkGreen"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-lightYellow data-[state=active]:text-palette-darkGreen"
                >
                  <Star className="h-4 w-4" />
                  <span>Popular</span>
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-lightYellow data-[state=active]:text-palette-darkGreen"
                >
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trending" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex gap-4 items-center p-4 rounded-lg border border-palette-beige">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=80&width=60&text=${i}`}
                          alt="Anime thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-palette-darkGreen">Trending Anime Title {i}</h3>
                        <p className="text-sm text-palette-darkGreen/70">Action, Adventure</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 text-palette-darkGreen/30" />
                          <span className="ml-1 text-xs text-palette-darkGreen/70">(4.0)</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(i)}
                        className={
                          favorites.includes(i)
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50/10"
                            : "text-palette-darkGreen/70 hover:text-palette-darkGreen hover:bg-palette-darkGreen/10"
                        }
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(i) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex gap-4 items-center p-4 rounded-lg border border-palette-beige">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={`/placeholder.svg?height=80&width=60&text=P${i}`}
                          alt="Anime thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-palette-darkGreen">Popular Anime Title {i}</h3>
                        <p className="text-sm text-palette-darkGreen/70">Fantasy, Drama</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                          <span className="ml-1 text-xs text-palette-darkGreen/70">(5.0)</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(i + 10)}
                        className={
                          favorites.includes(i + 10)
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50/10"
                            : "text-palette-darkGreen/70 hover:text-palette-darkGreen hover:bg-palette-darkGreen/10"
                        }
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(i + 10) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              {favorites.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {favorites.map((id) => (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex gap-4 items-center p-4 rounded-lg border border-palette-beige">
                        <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={`/placeholder.svg?height=80&width=60&text=F${id}`}
                            alt="Anime thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate text-palette-darkGreen">Favorite Anime Title {id}</h3>
                          <p className="text-sm text-palette-darkGreen/70">Romance, Comedy</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                            <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                            <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                            <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                            <Star className="h-3 w-3 fill-palette-lightYellow text-palette-lightYellow" />
                            <span className="ml-1 text-xs text-palette-darkGreen/70">(5.0)</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50/10"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-palette-beige mb-4">
                    <Heart className="h-6 w-6 text-palette-darkGreen/70" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-palette-darkGreen">No favorites yet</h3>
                  <p className="text-palette-darkGreen/80 max-w-md mx-auto mb-4">
                    Click the heart icon on any anime to add it to your favorites list
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("trending")}
                    className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                  >
                    Browse Trending Anime
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-16 space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-palette-darkGreen">Upcoming Events</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              Join these exciting anime-related events happening on campus
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div key={event.id} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="overflow-hidden h-full border-palette-beige">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-palette-darkGreen/30"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Badge className="bg-palette-lightYellow text-palette-darkGreen">{event.date}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-palette-darkGreen">{event.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1 text-palette-darkGreen/70">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-palette-darkGreen/70">
                        <Users className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-palette-darkGreen/80">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 bg-palette-lightYellow rounded-xl p-6 md:p-10 overflow-hidden relative text-palette-darkGreen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-palette-darkGreen/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-palette-darkGreen/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-10 relative z-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl/tight">
                Want to suggest an anime for our next watch party?
              </h2>
              <p className="text-palette-darkGreen/80 md:text-lg">
                Submit your suggestions and vote on what we&apos;ll watch next at our weekly anime screenings.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row md:justify-end md:items-center">
              <Button size="lg" className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                Submit Suggestion
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                View Suggestions
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t bg-palette-beige/80 backdrop-blur-sm">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
            <p className="text-sm text-palette-darkGreen/80">
              &copy; {new Date().getFullYear()} Ignisia Anime Hub. All rights reserved.
            </p>
            <Link href="/" className="text-sm text-palette-brightGreen hover:underline">
              Back to Ignisia
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

