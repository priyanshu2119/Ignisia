"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Users, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const activities = [
  {
    id: 1,
    title: "Tech Repair Services",
    description: "Get your gadgets fixed by fellow tech-savvy students at affordable rates.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Services",
    participants: "50+ students",
    location: "CS Building",
    link: "https://jugadu-tech-repairs.vercel.app",
    isExternal: true
  },
  {
    id: 2,
    title: "Anime Hub",
    description: "Discover, discuss and share your favorite anime with other enthusiasts.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Community",
    participants: "200+ members",
    location: "Online & Campus",
    link: "/anime-hub",
    isExternal: false
  },
  {
    id: 3,
    title: "Study Resources",
    description: "Access notes, past papers, and study groups for all your courses.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Academic",
    participants: "500+ students",
    location: "Library & Online",
    link: "/study",
    isExternal: false
  },
  {
    id: 4,
    title: "Campus Events",
    description: "Stay updated with all the events happening around your campus.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Events",
    participants: "1000+ attendees",
    location: "Various Venues",
    link: "/events",
    isExternal: false
  },
  {
    id: 5,
    title: "Hostel Life Central",
    description: "Connect with fellow hostelers, coordinate food deliveries, and find roommates.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Community",
    participants: "300+ hostelers",
    location: "Campus Hostels",
    link: "/dashboard/hosteler",
    isExternal: false
  },
  {
    id: 6,
    title: "Alumni Network",
    description: "Connect with graduates, find mentors, and explore career opportunities.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Networking",
    participants: "150+ alumni",
    location: "Online & Events",
    link: "/dashboard/alumni",
    isExternal: false
  }
]

const categories = ["All", "Services", "Community", "Academic", "Events", "Networking"]

export default function ActivitiesPage() {
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
            <span className="text-palette-darkGreen">Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6 md:py-24">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="inline-flex bg-palette-brightGreen text-palette-darkGreen mb-4">
            Campus Activities
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen mb-6">
            Explore Campus Life
          </h1>
          <p className="text-xl text-palette-darkGreen/80 max-w-3xl mx-auto">
            Discover all the amazing activities, services, and communities available on campus. 
            From tech repairs to anime discussions, there&apos;s something for everyone.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden h-full border-palette-beige hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-palette-lightYellow text-palette-darkGreen">
                        {activity.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-palette-darkGreen/20"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-palette-darkGreen">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{activity.participants}</span>
                    </div>
                    <div className="flex items-center text-sm text-palette-darkGreen/70">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                    >
                      {activity.isExternal ? (
                        <a href={activity.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          Explore
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <Link href={activity.link} className="flex items-center justify-center">
                          Explore
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="mt-16 bg-palette-lightYellow rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-palette-darkGreen mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-palette-darkGreen/80 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already making the most of their campus experience. 
            Sign up today and start connecting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90"
            >
              <Link href="/signup">Join Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
