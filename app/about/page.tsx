"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Target, Heart, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const teamMembers = [
  {
    name: "Arjun Patel",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    bio: "Computer Science student passionate about connecting campus communities."
  },
  {
    name: "Sneha Sharma",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    bio: "Full-stack developer with a love for creating user-friendly experiences."
  },
  {
    name: "Vikram Singh",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    bio: "UI/UX designer focused on making technology accessible to everyone."
  }
]

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in the power of student communities to support and uplift each other."
  },
  {
    icon: Target,
    title: "Student-Focused",
    description: "Every feature is designed with student needs and campus life in mind."
  },
  {
    icon: Heart,
    title: "Inclusive",
    description: "Creating a welcoming space for all students, regardless of background or interests."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly evolving to meet the changing needs of modern campus life."
  }
]

export default function AboutPage() {
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
            About Ignisia
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen mb-6">
            Connecting Campus Communities
          </h1>
          <p className="text-xl text-palette-darkGreen/80 max-w-3xl mx-auto">
            Ignisia was born from the simple idea that college life should be more connected, 
            more collaborative, and more fun. We&apos;re building the ultimate platform for campus communities.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-palette-darkGreen mb-6">Our Mission</h2>
              <p className="text-palette-darkGreen/80 mb-4">
                We&apos;re on a mission to transform campus life by creating meaningful connections between students.
                Whether you&apos;re looking for tech repair services, anime discussions, study groups, or campus events,
                Ignisia brings it all together in one place.
              </p>
              <p className="text-palette-darkGreen/80">
                Our platform serves day scholars, hostelers, and alumni alike, creating a comprehensive 
                ecosystem that supports students throughout their academic journey and beyond.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&h=400&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Campus community"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-palette-darkGreen/20"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-palette-darkGreen mb-4">Our Values</h2>
            <p className="text-palette-darkGreen/80 max-w-2xl mx-auto">
              These core values guide everything we do and shape the way we build our platform.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-palette-beige h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-palette-lightYellow/20 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-palette-brightGreen" />
                    </div>
                    <h3 className="font-semibold text-palette-darkGreen mb-2">{value.title}</h3>
                    <p className="text-sm text-palette-darkGreen/70">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-palette-darkGreen mb-4">Meet Our Team</h2>
            <p className="text-palette-darkGreen/80 max-w-2xl mx-auto">
              We&apos;re a group of passionate students building solutions for students.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-palette-beige">
                  <CardContent className="pt-6 text-center">
                    <div className="relative h-24 w-24 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-palette-darkGreen mb-1">{member.name}</h3>
                    <p className="text-sm text-palette-brightGreen mb-3">{member.role}</p>
                    <p className="text-sm text-palette-darkGreen/70">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            Ready to Join Our Community?
          </h2>
          <p className="text-palette-darkGreen/80 mb-6 max-w-2xl mx-auto">
            Experience the future of campus life. Connect with fellow students, 
            access resources, and make the most of your college experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90"
            >
              <Link href="/signup">Get Started</Link>
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
