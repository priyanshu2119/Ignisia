"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Laptop, Smartphone, Headphones, Printer, Clock, ArrowLeft, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const repairServices = {
  laptops: [
    {
      id: 1,
      title: "Screen Replacement",
      description: "For cracked or damaged screens",
      price: "$80-150",
      priceNote: "Depending on model",
      turnaround: "1-3 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Screen+Repair",
    },
    {
      id: 2,
      title: "Battery Replacement",
      description: "Restore your battery life",
      price: "$50-90",
      priceNote: "Depending on model",
      turnaround: "Same day service",
      image: "/placeholder.svg?height=200&width=300&text=Battery+Replacement",
    },
    {
      id: 3,
      title: "Data Recovery",
      description: "Recover lost or deleted files",
      price: "$60-120",
      priceNote: "Based on complexity",
      turnaround: "2-5 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Data+Recovery",
    },
  ],
  phones: [
    {
      id: 1,
      title: "Screen Replacement",
      description: "For cracked or damaged screens",
      price: "$60-120",
      priceNote: "Depending on model",
      turnaround: "Same day service",
      image: "/placeholder.svg?height=200&width=300&text=Phone+Screen+Repair",
    },
    {
      id: 2,
      title: "Battery Replacement",
      description: "Restore your battery life",
      price: "$40-80",
      priceNote: "Depending on model",
      turnaround: "1-2 hours",
      image: "/placeholder.svg?height=200&width=300&text=Phone+Battery",
    },
    {
      id: 3,
      title: "Water Damage Repair",
      description: "Fix water damaged phones",
      price: "$70-150",
      priceNote: "Based on damage severity",
      turnaround: "1-3 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Water+Damage",
    },
  ],
  audio: [
    {
      id: 1,
      title: "Headphone Repair",
      description: "Fix audio or connection issues",
      price: "$30-60",
      priceNote: "Depending on model",
      turnaround: "1-2 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Headphone+Repair",
    },
    {
      id: 2,
      title: "Speaker Repair",
      description: "Fix distorted or non-working speakers",
      price: "$40-80",
      priceNote: "Based on complexity",
      turnaround: "2-3 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Speaker+Repair",
    },
    {
      id: 3,
      title: "Earbud Cleaning",
      description: "Professional cleaning and disinfection",
      price: "$15",
      priceNote: "Flat rate",
      turnaround: "30 minutes",
      image: "/placeholder.svg?height=200&width=300&text=Earbud+Cleaning",
    },
  ],
  other: [
    {
      id: 1,
      title: "Printer Repair",
      description: "Fix paper jams and connectivity issues",
      price: "$40-70",
      priceNote: "Depending on issue",
      turnaround: "1-3 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Printer+Repair",
    },
    {
      id: 2,
      title: "Gaming Console Repair",
      description: "Fix your PlayStation, Xbox, or Nintendo",
      price: "$60-120",
      priceNote: "Based on issue",
      turnaround: "3-5 days turnaround",
      image: "/placeholder.svg?height=200&width=300&text=Console+Repair",
    },
    {
      id: 3,
      title: "Custom PC Building",
      description: "Get help building your dream PC",
      price: "$50+",
      priceNote: "Labor only, parts extra",
      turnaround: "1-2 weeks",
      image: "/placeholder.svg?height=200&width=300&text=PC+Building",
    },
  ],
}

const testimonials = [
  {
    id: 1,
    name: "Jamie Chen",
    role: "Computer Science Student",
    comment: "They fixed my laptop screen in just a day! Great service and affordable prices.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    role: "Business Major",
    comment: "Saved all my important files after my laptop wouldn't turn on. Lifesavers!",
    rating: 5,
  },
  {
    id: 3,
    name: "Taylor Kim",
    role: "Engineering Student",
    comment: "Professional service at student-friendly prices. Highly recommend!",
    rating: 4,
  },
]

export default function TechRepairPage() {
  const [activeTab, setActiveTab] = useState("laptops")
  const [hoveredService, setHoveredService] = useState<number | null>(null)

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
            <span className="text-palette-darkGreen">Back to CollegeHub</span>
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
              <Badge className="inline-flex bg-palette-brightGreen text-palette-darkGreen">Tech Repair</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Get Your Tech Fixed Fast
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Affordable repairs by tech-savvy students. Quick turnaround times and quality service guaranteed.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="group bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
              >
                <span className="flex items-center">
                  Book a Repair
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
                View Pricing
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-brightGreen"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Tech+Repair+Service')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Expert Repairs</h2>
              <p className="text-palette-darkGreen/90">By students, for students</p>
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
            <h2 className="text-3xl font-bold text-palette-darkGreen">Our Services</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              We repair a wide range of devices at student-friendly prices
            </p>
          </div>

          <Tabs defaultValue="laptops" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-palette-beige">
              <TabsTrigger
                value="laptops"
                className="flex flex-col gap-2 py-4 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <Laptop className="h-5 w-5" />
                <span>Laptops</span>
              </TabsTrigger>
              <TabsTrigger
                value="phones"
                className="flex flex-col gap-2 py-4 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <Smartphone className="h-5 w-5" />
                <span>Phones</span>
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="flex flex-col gap-2 py-4 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <Headphones className="h-5 w-5" />
                <span>Audio</span>
              </TabsTrigger>
              <TabsTrigger
                value="other"
                className="flex flex-col gap-2 py-4 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <Printer className="h-5 w-5" />
                <span>Other</span>
              </TabsTrigger>
            </TabsList>

            {Object.keys(repairServices).map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {repairServices[category as keyof typeof repairServices].map((service, index) => (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onHoverStart={() => setHoveredService(index)}
                      onHoverEnd={() => setHoveredService(null)}
                    >
                      <Card className="overflow-hidden h-full border-palette-beige">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={service.image || "/placeholder.svg?height=200&width=300&text=Service"}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-palette-darkGreen">{service.title}</CardTitle>
                          <CardDescription className="text-palette-darkGreen/70">{service.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-2xl font-bold text-palette-brightGreen">{service.price}</p>
                          <p className="text-sm text-palette-darkGreen/70">{service.priceNote}</p>
                          <div className="mt-4 flex items-center text-sm text-palette-darkGreen/70">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{service.turnaround}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full group bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                            <span className="flex items-center">
                              Book Now
                              <motion.span
                                className="ml-2"
                                initial={{ x: 0 }}
                                animate={{ x: hoveredService === index ? 5 : 0 }}
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
              </TabsContent>
            ))}
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
            <h2 className="text-3xl font-bold text-palette-darkGreen">How It Works</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              Getting your tech fixed is easy with our simple process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-brightGreen text-palette-darkGreen text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-palette-darkGreen">Book a Repair</h3>
              <p className="text-palette-darkGreen/80">Fill out our simple form to tell us what needs fixing</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-brightGreen text-palette-darkGreen text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-palette-darkGreen">Drop Off Device</h3>
              <p className="text-palette-darkGreen/80">Bring your device to our campus repair center</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-brightGreen text-palette-darkGreen text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-palette-darkGreen">Get It Fixed</h3>
              <p className="text-palette-darkGreen/80">Pick up your repaired device when it's ready</p>
            </motion.div>
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
            <h2 className="text-3xl font-bold text-palette-darkGreen">What Students Say</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              Don't just take our word for it - hear from satisfied customers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-palette-beige rounded-xl p-6 relative shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-palette-lightYellow text-palette-lightYellow"
                          : "text-palette-darkGreen/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-palette-darkGreen/80 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="rounded-full bg-palette-brightGreen/20 w-10 h-10 flex items-center justify-center text-palette-brightGreen font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-palette-darkGreen">{testimonial.name}</p>
                    <p className="text-xs text-palette-darkGreen/70">{testimonial.role}</p>
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 text-4xl text-palette-brightGreen/20 font-serif">"</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 bg-palette-brightGreen rounded-xl p-6 md:p-10 overflow-hidden relative text-palette-darkGreen"
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
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl/tight">Need emergency repairs?</h2>
              <p className="text-palette-darkGreen/80 md:text-lg">
                We offer priority service for urgent repairs. Contact us directly for immediate assistance.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row md:justify-end md:items-center">
              <Button size="lg" className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                Contact Now
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
              &copy; {new Date().getFullYear()} CollegeHub Tech Repair. All rights reserved.
            </p>
            <Link href="/" className="text-sm text-palette-brightGreen hover:underline">
              Back to CollegeHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

