"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Book, FileText, Users, Calendar, Clock, Download, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const subjects = [
  {
    id: 1,
    name: "Computer Science",
    icon: "💻",
    courses: 24,
    resources: 156,
    image: "/placeholder.svg?height=200&width=300&text=Computer+Science",
  },
  {
    id: 2,
    name: "Mathematics",
    icon: "🧮",
    courses: 18,
    resources: 132,
    image: "/placeholder.svg?height=200&width=300&text=Mathematics",
  },
  {
    id: 3,
    name: "Physics",
    icon: "⚛️",
    courses: 15,
    resources: 98,
    image: "/placeholder.svg?height=200&width=300&text=Physics",
  },
  {
    id: 4,
    name: "Biology",
    icon: "🧬",
    courses: 20,
    resources: 145,
    image: "/placeholder.svg?height=200&width=300&text=Biology",
  },
  {
    id: 5,
    name: "Chemistry",
    icon: "🧪",
    courses: 16,
    resources: 112,
    image: "/placeholder.svg?height=200&width=300&text=Chemistry",
  },
  {
    id: 6,
    name: "Engineering",
    icon: "🔧",
    courses: 22,
    resources: 178,
    image: "/placeholder.svg?height=200&width=300&text=Engineering",
  },
]

const studyGroups = [
  {
    id: 1,
    name: "Calculus Study Group",
    members: 12,
    nextMeeting: "April 10, 2025",
    time: "6:00 PM",
    location: "Library, Study Room A",
    subject: "Mathematics",
  },
  {
    id: 2,
    name: "Data Structures & Algorithms",
    members: 8,
    nextMeeting: "April 12, 2025",
    time: "5:30 PM",
    location: "CS Building, Room 203",
    subject: "Computer Science",
  },
  {
    id: 3,
    name: "Organic Chemistry",
    members: 15,
    nextMeeting: "April 14, 2025",
    time: "7:00 PM",
    location: "Science Building, Lab 3",
    subject: "Chemistry",
  },
]

const resources = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    type: "Course Notes",
    subject: "Computer Science",
    downloads: 234,
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Calculus II Formula Sheet",
    type: "Cheat Sheet",
    subject: "Mathematics",
    downloads: 456,
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Report Template",
    type: "Template",
    subject: "Chemistry",
    downloads: 189,
    fileSize: "0.8 MB",
    fileType: "DOCX",
  },
  {
    id: 4,
    title: "Physics Mechanics Practice Problems",
    type: "Practice Problems",
    subject: "Physics",
    downloads: 321,
    fileSize: "3.5 MB",
    fileType: "PDF",
  },
]

export default function StudyPage() {
  const [activeTab, setActiveTab] = useState("resources")
  const [hoveredSubject, setHoveredSubject] = useState<number | null>(null)

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
              <Badge className="inline-flex bg-palette-beige text-palette-darkGreen">Study Resources</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Ace Your Classes
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Access notes, past papers, study guides, and join study groups for all your courses.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group bg-palette-beige text-palette-darkGreen hover:bg-palette-beige/90">
                <span className="flex items-center">
                  Browse Resources
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
                Join Study Group
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-beige"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Study+Resources')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Study Smarter</h2>
              <p className="text-palette-darkGreen/90">Resources for every subject</p>
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
            <h2 className="text-3xl font-bold text-palette-darkGreen">Browse by Subject</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">Find study materials for all your courses</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoveredSubject(index)}
                onHoverEnd={() => setHoveredSubject(null)}
              >
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-palette-beige">
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={subject.image || "/placeholder.svg"}
                      alt={subject.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-palette-darkGreen/50"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
                      <span className="text-3xl">{subject.icon}</span>
                      <h3 className="font-bold text-white text-lg">{subject.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between text-sm text-palette-darkGreen/70">
                      <span>{subject.courses} Courses</span>
                      <span>{subject.resources} Resources</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="ghost"
                      className="w-full group text-palette-brightGreen hover:bg-palette-brightGreen/10"
                    >
                      <span className="flex items-center">
                        Browse Resources
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          animate={{ x: hoveredSubject === index ? 5 : 0 }}
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
          <Tabs defaultValue="resources" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-palette-darkGreen">Study Materials</h2>
              <TabsList className="bg-palette-beige">
                <TabsTrigger
                  value="resources"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <FileText className="h-4 w-4" />
                  <span>Resources</span>
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Book className="h-4 w-4" />
                  <span>Courses</span>
                </TabsTrigger>
                <TabsTrigger
                  value="groups"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Users className="h-4 w-4" />
                  <span>Study Groups</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="resources" className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input placeholder="Search resources..." className="pl-9 border-palette-beige" />
                </div>
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Search
                </Button>
              </div>

              <motion.div
                className="rounded-lg border border-palette-beige overflow-hidden"
                variants={containerVariants}
              >
                <div className="grid grid-cols-[1fr_auto] gap-4 p-4 font-medium border-b bg-palette-beige/50 text-palette-darkGreen">
                  <div>Resource</div>
                  <div>Download</div>
                </div>
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    whileHover={{ backgroundColor: "rgba(147, 197, 71, 0.05)" }}
                    className="grid grid-cols-[1fr_auto] gap-4 p-4 border-b last:border-0 items-center transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-palette-darkGreen">{resource.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                          {resource.type}
                        </Badge>
                        <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                          {resource.subject}
                        </Badge>
                        <span className="text-xs text-palette-darkGreen/70 flex items-center">
                          <Download className="h-3 w-3 mr-1" /> {resource.downloads}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="flex items-center gap-1 bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">{resource.fileType}</span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input placeholder="Search courses..." className="pl-9 border-palette-beige" />
                </div>
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Search
                </Button>
              </div>

              <motion.div className="grid gap-6 md:grid-cols-2" variants={containerVariants}>
                {[1, 2, 3, 4].map((i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Card className="h-full hover:shadow-md transition-shadow border-palette-beige">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-palette-darkGreen">Course Title {i}</CardTitle>
                            <CardDescription className="text-palette-darkGreen/70">
                              Course Code: CS10{i}
                            </CardDescription>
                          </div>
                          <Badge className="bg-palette-brightGreen text-palette-darkGreen">
                            {subjects[i % subjects.length].name}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-palette-darkGreen/80">
                          This course covers the fundamentals of subject matter {i} with practical applications.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                            Lecture Notes
                          </Badge>
                          <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                            Past Exams
                          </Badge>
                          <Badge variant="outline" className="border-palette-brightGreen text-palette-brightGreen">
                            Practice Problems
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full group bg-palette-beige text-palette-darkGreen hover:bg-palette-beige/90">
                          <span className="flex items-center">
                            View Course Materials
                            <motion.span className="ml-2" initial={{ x: 0 }} whileHover={{ x: 5 }}>
                              →
                            </motion.span>
                          </span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Load More
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input placeholder="Search study groups..." className="pl-9 border-palette-beige" />
                </div>
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Search
                </Button>
              </div>

              <motion.div className="grid gap-6 md:grid-cols-3" variants={containerVariants}>
                {studyGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="overflow-hidden h-full border-palette-beige">
                      <div className="bg-palette-brightGreen/10 p-4 flex justify-between items-center">
                        <Badge className="bg-palette-brightGreen text-palette-darkGreen">{group.subject}</Badge>
                        <div className="flex items-center text-sm text-palette-darkGreen/70">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members} members</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-palette-darkGreen">{group.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-palette-darkGreen/70">
                          <Calendar className="h-4 w-4" />
                          <span>{group.nextMeeting}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-1 text-sm text-palette-darkGreen/70">
                          <Clock className="h-4 w-4" />
                          <span>{group.time}</span>
                        </div>
                        <p className="text-sm font-medium text-palette-darkGreen">{group.location}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-palette-beige text-palette-darkGreen hover:bg-palette-beige/90">
                          Join Group
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Create New Study Group
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-16 bg-palette-beige rounded-xl p-6 md:p-10 overflow-hidden relative text-palette-darkGreen"
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
                Need help with a specific subject?
              </h2>
              <p className="text-palette-darkGreen/80 md:text-lg">
                Connect with tutors and get personalized help with your coursework.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row md:justify-end md:items-center">
              <Button size="lg" className="bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90">
                Find a Tutor
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
              >
                Become a Tutor
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t bg-palette-beige/80 backdrop-blur-sm">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
            <p className="text-sm text-palette-darkGreen/80">
              &copy; {new Date().getFullYear()} Ignisia Study Resources. All rights reserved.
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

