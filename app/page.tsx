"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronRight, ExternalLink, Bell, ArrowRight, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample data
const notices = [
  {
    id: 1,
    title: "Tech Repair Workshop",
    content: "Join us this Friday for a hands-on tech repair workshop in the CS building, Room 101.",
    date: "2025-04-05",
  },
  {
    id: 2,
    title: "Anime Club Meeting",
    content: "New anime season discussion this Thursday at 6 PM in the Student Center.",
    date: "2025-04-03",
  },
  {
    id: 3,
    title: "Study Group Formation",
    content: "Looking for study partners for finals? Join the matching event next Monday at the library.",
    date: "2025-04-08",
  },
]


const services = [
  {
    id: 1,
    title: "Tech Repair",
    description: "Get your gadgets fixed by fellow tech-savvy students at affordable rates.",
    icon: "🔧",
    url: "/tech-repair",
    color: "bg-palette-brightGreen",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=870&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Anime Hub",
    description: "Discover, discuss and share your favorite anime with other enthusiasts.",
    icon: "🎬",
    url: "/anime-hub",
    color: "bg-palette-lightYellow",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Study Resources",
    description: "Access notes, past papers, and study groups for all your courses.",
    icon: "📚",
    url: "/study",
    color: "bg-palette-beige",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=873&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Campus Events",
    description: "Stay updated with all the events happening around your campus.",
    icon: "🎉",
    url: "/events",
    color: "bg-palette-darkGreen text-white",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=870&auto=format&fit=crop",
  },
]


const alumni = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop",
    year: "2023",
    quote: "The tech repair service helped me learn practical skills that impressed my interviewers.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "UX Designer at Apple",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop",
    year: "2022",
    quote: "I found my passion for design through campus events and creative workshops.",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Data Scientist at Netflix",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=774&auto=format&fit=crop",
    year: "2021",
    quote: "The study resources and group sessions were crucial for my academic success.",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Product Manager at Microsoft",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=774&auto=format&fit=crop",
    year: "2020",
    quote: "CollegeHub connected me with like-minded students who became lifelong friends and colleagues.",
  },
]

const heroImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472653431158-6364773b2fbc?q=80&w=869&auto=format&fit=crop",
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotices, setShowNotices] = useState(false)
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0)
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [isHovered, setIsHovered] = useState<number | null>(null)

  // Check if there are any notices to show
  useEffect(() => {
    if (notices.length > 0) {
      setShowNotices(true)

      // Rotate through notices every 5 seconds
      const noticeInterval = setInterval(() => {
        setActiveNoticeIndex((prev) => (prev + 1) % notices.length)
      }, 5000)

      return () => clearInterval(noticeInterval)
    }
  }, [])

  // Rotate hero images
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 7000)

    return () => clearInterval(imageInterval)
  }, [])

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
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-palette-beige/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="rounded-full bg-palette-brightGreen p-1 text-palette-darkGreen">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-palette-darkGreen">CollegeHub</span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-palette-brightGreen relative group text-palette-darkGreen"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-palette-brightGreen transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/activities"
              className="text-sm font-medium transition-colors hover:text-palette-brightGreen relative group text-palette-darkGreen"
            >
              Activities
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-palette-brightGreen transition-all group-hover:w-full"></span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="transition-all hover:border-palette-brightGreen border-palette-darkGreen text-palette-darkGreen"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="transition-all bg-palette-brightGreen hover:bg-palette-brightGreen/90 text-palette-darkGreen"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            {/* Fix mobile menu functionality */}
            {/* In the mobile menu section, update the Sheet component to properly handle state */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-base"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <PanelLeft className="h-5 w-5 text-palette-darkGreen" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-palette-beige">
                {/* Rest of the mobile menu content */}
                <SheetHeader className="space-y-2">
                  <SheetTitle>Mobile Menu</SheetTitle>
                  <SheetDescription>Navigate through the app.</SheetDescription>
                </SheetHeader>
                <div className="container py-4 space-y-4">
                  <Link
                    href="/about"
                    className="block text-sm font-medium transition-colors hover:text-palette-brightGreen text-palette-darkGreen"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/activities"
                    className="block text-sm font-medium transition-colors hover:text-palette-brightGreen text-palette-darkGreen"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Activities
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full border-palette-darkGreen text-palette-darkGreen"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild className="w-full bg-palette-brightGreen text-palette-darkGreen">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t overflow-hidden bg-palette-beige"
            >
              <div className="container py-4 space-y-4">
                <Link
                  href="/about"
                  className="block text-sm font-medium transition-colors hover:text-palette-brightGreen text-palette-darkGreen"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/activities"
                  className="block text-sm font-medium transition-colors hover:text-palette-brightGreen text-palette-darkGreen"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Activities
                </Link>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full border-palette-darkGreen text-palette-darkGreen"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild className="w-full bg-palette-brightGreen text-palette-darkGreen">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-palette-beige/30">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Badge className="inline-flex bg-palette-brightGreen text-palette-darkGreen">
                      Your Campus, Connected
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-palette-darkGreen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    One Hub for All Your College Needs
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-palette-darkGreen/80 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    From tech repairs to anime discussions, study resources to campus events - we've got everything you
                    need in one place.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="group bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                  >
                    <Link href="/signup" className="flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10 dark:border-palette-brightGreen dark:text-palette-brightGreen dark:hover:bg-palette-brightGreen/10"
                  >
                    <Link href="/services" className="flex items-center gap-1">
                      Explore Services <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[300px] md:h-[400px] lg:h-[500px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={heroImages[currentHeroImage] || "/placeholder.svg"}
                      alt="College life"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-palette-darkGreen/30 mix-blend-multiply"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-2xl font-bold mb-2">Connect. Collaborate. Create.</h2>
                      <p className="text-white/80">Your all-in-one platform for campus life</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentHeroImage ? "bg-white w-6" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentHeroImage(index)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background decoration */}
          {/* Fix hero section background elements */}
          <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-palette-beige/30"></div>
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-palette-lightYellow/20 rounded-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-palette-brightGreen/20 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            ></motion.div>
            <motion.div
              className="absolute top-1/2 right-1/3 w-48 h-48 bg-palette-beige/30 rounded-full"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            ></motion.div>
          </div>
        </section>

        {/* Notice Board Section - Only appears when there are notices */}
        <AnimatePresence>
          {showNotices && (
            <motion.section
              className="py-6 bg-palette-lightYellow/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container px-4 md:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-palette-darkGreen" />
                  <h2 className="text-lg font-semibold text-palette-darkGreen">Announcements</h2>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-palette-beige">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={notices[activeNoticeIndex].id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-palette-darkGreen">{notices[activeNoticeIndex].title}</h3>
                        <span className="text-xs text-palette-darkGreen/70">{notices[activeNoticeIndex].date}</span>
                      </div>
                      <p className="text-sm text-palette-darkGreen/80">{notices[activeNoticeIndex].content}</p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-center mt-3 gap-1">
                    {notices.map((_, index) => (
                      <button
                        key={index}
                        className={`h-1.5 rounded-full transition-all ${
                          index === activeNoticeIndex ? "w-4 bg-palette-brightGreen" : "w-1.5 bg-palette-darkGreen/30"
                        }`}
                        onClick={() => setActiveNoticeIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Services Section */}
        <section className="py-12 md:py-24">
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                  Services
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-palette-darkGreen dark:text-white">
                  Everything You Need
                </h2>
                <p className="mx-auto max-w-[700px] text-palette-darkGreen/80 dark:text-white/80 md:text-lg">
                  Connect to all these amazing services with just one click. We've got you covered.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <Link href={service.url} className="block h-full">
                    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg border-2 hover:border-palette-brightGreen border-transparent">
                      <div className={`${service.color} p-6 text-4xl relative h-40 overflow-hidden`}>
                        <span className="absolute top-4 left-4 text-5xl z-10">{service.icon}</span>
                        <div className="absolute inset-0 opacity-30">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        </div>
                      </div>
                      <div className="p-6 space-y-2">
                        <p className="text-sm text-palette-darkGreen/80 dark:text-white/80">{service.description}</p>
                        <div className="pt-2 flex items-center text-sm text-palette-brightGreen">
                          <span>Visit</span>
                          <ExternalLink
                            className={`ml-1 h-3 w-3 transition-transform duration-300 ${isHovered === index ? "translate-x-1" : ""}`}
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Alumni Section */}
        <section className="py-12 md:py-24 bg-palette-beige/30">
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                  Alumni
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-palette-darkGreen dark:text-white">
                  Success Stories
                </h2>
                <p className="mx-auto max-w-[700px] text-palette-darkGreen/80 dark:text-white/80 md:text-lg">
                  See where our graduates are now and get inspired by their journeys.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumni.map((person, index) => (
                <motion.div
                  key={person.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-palette-darkGreen/50"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-medium text-lg">{person.name}</h3>
                        <p className="text-sm text-white/80">{person.role}</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2 bg-white dark:bg-palette-darkGreen">
                      <Badge variant="outline" className="mb-2 border-palette-brightGreen text-palette-brightGreen">
                        Class of {person.year}
                      </Badge>
                      <p className="text-sm text-palette-darkGreen/80 dark:text-white/80 italic">"{person.quote}"</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                asChild
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10 dark:border-palette-brightGreen dark:text-palette-brightGreen dark:hover:bg-palette-brightGreen/10"
              >
                <Link href="/alumni">View All Alumni</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-palette-beige/80 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="rounded-full bg-palette-brightGreen p-1 text-palette-darkGreen">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="font-bold text-palette-darkGreen">CollegeHub</span>
              </Link>
              <p className="text-sm text-palette-darkGreen/80">
                Your one-stop platform for all college services and resources.
              </p>
              <div className="flex gap-3">
                <Link href="#" className="text-palette-darkGreen/70 hover:text-palette-darkGreen transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-palette-darkGreen/70 hover:text-palette-darkGreen transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="text-palette-darkGreen/70 hover:text-palette-darkGreen transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/tech-repair"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Tech Repair
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime-hub"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Anime Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="/study"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Study Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Campus Events
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-palette-darkGreen">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-palette-darkGreen">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-palette-darkGreen/70 hover:text-palette-brightGreen transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t py-6 text-center text-sm text-palette-darkGreen/70">
            &copy; {new Date().getFullYear()} CollegeHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

