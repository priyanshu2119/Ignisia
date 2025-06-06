"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const services = [
  {
    id: 1,
    title: "Tech Repair",
    description: "Get your gadgets fixed by fellow tech-savvy students at affordable rates.",
    icon: "🔧",
    url: "https://jugadu-tech-repairs.vercel.app",
    color: "bg-palette-brightGreen",
    isExternal: true,
    features: ["Laptop repairs", "Phone screen fixes", "Software troubleshooting", "Hardware upgrades"]
  },
  {
    id: 2,
    title: "Anime Hub",
    description: "Discover, discuss and share your favorite anime with other enthusiasts.",
    icon: "🎬",
    url: "/anime-hub",
    color: "bg-palette-lightYellow",
    isExternal: false,
    features: ["Anime recommendations", "Discussion forums", "Watch parties", "Cosplay events"]
  },
  {
    id: 3,
    title: "Study Resources",
    description: "Access notes, past papers, and study groups for all your courses.",
    icon: "📚",
    url: "/study",
    color: "bg-palette-beige",
    isExternal: false,
    features: ["Course notes", "Past papers", "Study groups", "Tutoring sessions"]
  },
  {
    id: 4,
    title: "Campus Events",
    description: "Stay updated with all the events happening around your campus.",
    icon: "🎉",
    url: "/events",
    color: "bg-palette-darkGreen text-white",
    isExternal: false,
    features: ["Event calendar", "RSVP system", "Event creation", "Notifications"]
  }
]

export default function ServicesPage() {
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
            Our Services
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen mb-6">
            Everything You Need for Campus Life
          </h1>
          <p className="text-xl text-palette-darkGreen/80 max-w-3xl mx-auto">
            From tech repairs to study resources, we&apos;ve built a comprehensive platform
            that addresses all aspects of student life. Explore our services below.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden h-full border-palette-beige hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-lg ${service.color} flex items-center justify-center text-2xl`}>
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-palette-darkGreen">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-palette-darkGreen mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-palette-darkGreen/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-palette-brightGreen mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                    >
                      {service.isExternal ? (
                        <a href={service.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          Access Service
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <Link href={service.url} className="flex items-center justify-center">
                          Access Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Services Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-palette-darkGreen mb-4">Coming Soon</h2>
            <p className="text-palette-darkGreen/80 max-w-2xl mx-auto">
              We&apos;re constantly working on new features and services to enhance your campus experience.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-palette-beige border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="font-medium text-palette-darkGreen mb-1">Ride Sharing</h3>
                <p className="text-sm text-palette-darkGreen/70">Coordinate rides with fellow students</p>
              </CardContent>
            </Card>
            <Card className="border-palette-beige border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">🏪</div>
                <h3 className="font-medium text-palette-darkGreen mb-1">Campus Store</h3>
                <p className="text-sm text-palette-darkGreen/70">Buy and sell items with students</p>
              </CardContent>
            </Card>
            <Card className="border-palette-beige border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">💼</div>
                <h3 className="font-medium text-palette-darkGreen mb-1">Job Board</h3>
                <p className="text-sm text-palette-darkGreen/70">Find part-time jobs and internships</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-palette-lightYellow rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-palette-darkGreen mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-palette-darkGreen/80 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already using Ignisia to enhance their campus experience. 
            Sign up today and access all our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90"
            >
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
            >
              <Link href="/login">Already have an account?</Link>
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
