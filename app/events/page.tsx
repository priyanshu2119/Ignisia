"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Filter, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const featuredEvents = [
  {
    id: 1,
    title: "Spring Music Festival",
    date: "April 20, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "Campus Quad",
    image: "/placeholder.svg?height=300&width=500&text=Music+Festival",
    category: "Music",
    attendees: 245,
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "April 25, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Student Center",
    image: "/placeholder.svg?height=300&width=500&text=Career+Fair",
    category: "Career",
    attendees: 320,
  },
  {
    id: 3,
    title: "Hackathon Challenge",
    date: "May 1-2, 2025",
    time: "48 Hours",
    location: "Engineering Building",
    image: "/placeholder.svg?height=300&width=500&text=Hackathon",
    category: "Tech",
    attendees: 150,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Photography Workshop",
    date: "April 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Arts Building, Room 201",
    category: "Workshop",
  },
  {
    id: 2,
    title: "International Food Festival",
    date: "April 18, 2025",
    time: "12:00 PM - 3:00 PM",
    location: "Campus Quad",
    category: "Food",
  },
  {
    id: 3,
    title: "Basketball Tournament",
    date: "April 22, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "Sports Complex",
    category: "Sports",
  },
  {
    id: 4,
    title: "Poetry Slam Night",
    date: "April 24, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Student Center Lounge",
    category: "Arts",
  },
  {
    id: 5,
    title: "Environmental Cleanup Day",
    date: "April 26, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Meet at Campus Entrance",
    category: "Volunteer",
  },
  {
    id: 6,
    title: "Movie Night: Latest Blockbuster",
    date: "April 28, 2025",
    time: "8:00 PM - 10:30 PM",
    location: "Outdoor Amphitheater",
    category: "Entertainment",
  },
]

const categories = [
  "All",
  "Music",
  "Sports",
  "Tech",
  "Arts",
  "Career",
  "Food",
  "Workshop",
  "Volunteer",
  "Entertainment",
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

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

  const filteredEvents = useMemo(() => {
    return activeCategory === "All"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === activeCategory)
  }, [activeCategory])

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
              <Badge className="inline-flex bg-palette-darkGreen text-white">Campus Events</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Never Miss a Moment
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Discover and attend exciting events happening around your campus. From concerts to workshops, find it
                all here.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                <span className="flex items-center">
                  Browse Events
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
                Create Event
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-lightYellow"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Campus+Events')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Connect & Engage</h2>
              <p className="text-palette-darkGreen/90">Find events that match your interests</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-palette-darkGreen">Featured Events</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              Don&apos;t miss these popular events happening on campus
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoveredEvent(index)}
                onHoverEnd={() => setHoveredEvent(null)}
              >
                <Card className="overflow-hidden h-full border-palette-beige">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-palette-lightYellow text-palette-darkGreen">{event.category}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-palette-darkGreen/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-white/80">{event.date}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-palette-darkGreen">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-palette-darkGreen/70">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full group bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                      <span className="flex items-center">
                        RSVP
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          animate={{ x: hoveredEvent === index ? 5 : 0 }}
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
          className="mt-16 space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-3xl font-bold text-palette-darkGreen">Upcoming Events</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                <Input placeholder="Search events..." className="pl-9 max-w-xs border-palette-beige" />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
            {categories.map((category) => (
              <motion.div key={category} variants={itemVariants}>
                <Badge
                  variant={category === activeCategory ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    category === activeCategory
                      ? "bg-palette-lightYellow text-palette-darkGreen"
                      : "border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <Tabs defaultValue="list" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-end mb-6">
              <TabsList className="bg-palette-beige">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-palette-lightYellow data-[state=active]:text-palette-darkGreen"
                >
                  List
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="data-[state=active]:bg-palette-lightYellow data-[state=active]:text-palette-darkGreen"
                >
                  Calendar
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-4">
              <motion.div
                className="rounded-lg border border-palette-beige overflow-hidden"
                variants={containerVariants}
              >
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      whileHover={{ backgroundColor: "rgba(147, 197, 71, 0.05)" }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-4 border-b last:border-0 items-center transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-palette-darkGreen">{event.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className="text-sm text-palette-darkGreen/70 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> {event.date}
                          </span>
                          <span className="text-sm text-palette-darkGreen/70 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {event.time}
                          </span>
                          <span className="text-sm text-palette-darkGreen/70 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {event.location}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs border-palette-brightGreen text-palette-brightGreen"
                          >
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="md:w-auto w-full bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90"
                      >
                        RSVP
                      </Button>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-palette-beige mb-4">
                      <Calendar className="h-6 w-6 text-palette-darkGreen/70" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-palette-darkGreen">No events found</h3>
                    <p className="text-palette-darkGreen/80 max-w-md mx-auto mb-4">
                      There are no events in the {activeCategory} category. Try selecting a different category.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveCategory("All")}
                      className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                    >
                      View All Events
                    </Button>
                  </div>
                )}
              </motion.div>

              {filteredEvents.length > 0 && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <motion.div
                className="rounded-lg border border-palette-beige p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-palette-darkGreen">April 2025</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-sm font-medium text-palette-darkGreen">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const hasEvent = upcomingEvents.some(
                      (event) =>
                        event.date.includes(`April ${day}`) &&
                        (activeCategory === "All" || event.category === activeCategory),
                    )
                    return (
                      <motion.div
                        key={day}
                        className={`aspect-square flex flex-col items-center justify-center rounded-md p-2 cursor-pointer transition-colors ${
                          hasEvent
                            ? "bg-palette-lightYellow/30 hover:bg-palette-lightYellow/50 font-medium"
                            : "hover:bg-palette-beige"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-palette-darkGreen">{day}</span>
                        {hasEvent && <div className="w-1.5 h-1.5 bg-palette-brightGreen rounded-full mt-1"></div>}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="mt-4 text-center text-sm text-palette-darkGreen/70">
                  Click on a date with an event to see details
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl/tight">Have an event to share?</h2>
              <p className="text-palette-darkGreen/80 md:text-lg">
                Create and promote your own campus events. Reach thousands of students in your community.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row md:justify-end md:items-center">
              <Button size="lg" className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                Create Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t bg-palette-beige/80 backdrop-blur-sm">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
            <p className="text-sm text-palette-darkGreen/80">
              &copy; {new Date().getFullYear()} Ignisia Campus Events. All rights reserved.
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

