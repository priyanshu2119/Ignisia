"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Coffee, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  Film,
  Settings,
  MessageSquare,
  Users
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data
const upcomingEvents = [
  {
    id: 1,
    title: "Tech Fest Registration Deadline",
    date: "April 15, 2025",
    time: "11:59 PM",
    location: "Online",
    type: "deadline",
  },
  {
    id: 2,
    title: "Career Fair",
    date: "April 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    type: "event",
  },
  {
    id: 3,
    title: "Programming Contest",
    date: "April 25, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 3",
    type: "contest",
  },
]

const commuteOptions = [
  {
    id: 1,
    type: "Carpool",
    route: "South City to Campus",
    time: "8:00 AM (Departure)",
    seats: "2 seats available",
    contact: "Rahul Sharma",
    phone: "9876543210",
    notes: "Daily commute, cost sharing (₹50/day)",
  },
  {
    id: 2,
    type: "Shared Auto",
    route: "Metro Station to Campus",
    time: "9:15 AM (Departure)",
    seats: "3 seats available",
    contact: "Priya Patel",
    phone: "9876543211",
    notes: "Monday to Friday, fixed auto driver",
  },
  {
    id: 3,
    type: "Bus Group",
    route: "East Colony to Campus",
    time: "7:30 AM (Bus #42)",
    seats: "Group of 5 students",
    contact: "Amit Kumar",
    phone: "9876543212",
    notes: "Meet at East Colony bus stop, travel together",
  },
]

const studySpaces = [
  {
    id: 1,
    name: "Central Library",
    type: "Library",
    hours: "8:00 AM - 8:00 PM",
    features: ["Quiet zones", "Wi-Fi", "Power outlets", "Group study rooms"],
    currentOccupancy: "Medium",
    image: "/placeholder.svg?height=200&width=300&text=Central+Library",
  },
  {
    id: 2,
    name: "Coffee House",
    type: "Café",
    hours: "9:00 AM - 10:00 PM",
    features: ["Free Wi-Fi", "Coffee & snacks", "Casual atmosphere"],
    currentOccupancy: "Low",
    image: "/placeholder.svg?height=200&width=300&text=Coffee+House",
  },
  {
    id: 3,
    name: "Innovation Hub",
    type: "Co-working Space",
    hours: "10:00 AM - 6:00 PM",
    features: ["High-speed internet", "Whiteboards", "Meeting rooms"],
    currentOccupancy: "High",
    image: "/placeholder.svg?height=200&width=300&text=Innovation+Hub",
  },
]

const notifications = [
  {
    id: 1,
    title: "Assignment Deadline Reminder",
    message: "Your Data Structures assignment is due tomorrow at 11:59 PM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Carpool Option Available",
    message: "A new carpool option from North City to Campus has been posted.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 3,
    title: "Study Group Invitation",
    message: "You've been invited to join the Calculus II study group.",
    time: "2 days ago",
    read: true,
  },
]

export default function DayScholarDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

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
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-950 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out lg:hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-palette-darkGreen">Day Scholar Portal</span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-palette-darkGreen" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard/day-scholar" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <BookOpen className="h-5 w-5" />
            <span>Study Resources</span>
          </Link>
          <Link href="/anime-hub" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <Film className="h-5 w-5" />
            <span>Anime Hub</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <Calendar className="h-5 w-5" />
            <span>Campus Events</span>
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Notifications sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-950 transform ${notificationsOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-palette-darkGreen">Notifications</span>
          <button onClick={() => setNotificationsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-palette-darkGreen" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? "bg-gray-50 dark:bg-gray-900" : "bg-palette-brightGreen/10 border-l-2 border-palette-brightGreen"}`}>
              <h4 className="font-medium text-palette-darkGreen">{notification.title}</h4>
              <p className="text-sm text-palette-darkGreen/70 mt-1">{notification.message}</p>
              <p className="text-xs text-palette-darkGreen/50 mt-2">{notification.time}</p>
            </div>
          ))}
          <Button variant="outline" className="w-full border-palette-darkGreen text-palette-darkGreen">
            View All Notifications
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-950">
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-palette-darkGreen">Day Scholar Portal</h1>
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-2">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "overview" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <Home className="h-5 w-5" />
                <span>Overview</span>
              </button>
              <button 
                onClick={() => setActiveTab("commute")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "commute" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <Car className="h-5 w-5" />
                <span>Commute</span>
              </button>
              <button 
                onClick={() => setActiveTab("study-spaces")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "study-spaces" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <Coffee className="h-5 w-5" />
                <span>Study Spaces</span>
              </button>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="px-2 text-xs font-semibold text-palette-darkGreen/70 uppercase tracking-wider">
                  College Services
                </h3>
                <div className="mt-2 space-y-2">
                  <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <BookOpen className="h-5 w-5" />
                    <span>Study Resources</span>
                  </Link>
                  <Link href="/anime-hub" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Film className="h-5 w-5" />
                    <span>Anime Hub</span>
                  </Link>
                  <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Calendar className="h-5 w-5" />
                    <span>Campus Events</span>
                  </Link>
                </div>
              </div>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full bg-palette-beige flex items-center justify-center">
                  <User className="h-5 w-5 text-palette-darkGreen" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-palette-darkGreen">Rahul Sharma</p>
                  <p className="text-xs text-palette-darkGreen/70">Computer Science, 3rd Year</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Link href="/profile" className="text-xs text-palette-brightGreen hover:underline">
                  View Profile
                </Link>
                <Link href="/" className="text-xs text-palette-darkGreen/70 hover:text-palette-darkGreen">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex items-center h-16 bg-white dark:bg-gray-950 border-b px-4 md:px-6">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 rounded-md lg:hidden text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0 flex-1">
              <h1 className="text-lg font-semibold text-palette-darkGreen">
                {activeTab === "overview" ? "Dashboard Overview" : 
                 activeTab === "commute" ? "Commute Options" : 
                 "Study Spaces"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(true)}
                  className="p-2 rounded-full text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            {activeTab === "overview" && (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-palette-darkGreen text-lg">Today&apos;s Classes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 rounded-lg bg-palette-brightGreen/10">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Data Structures</p>
                              <p className="text-sm text-palette-darkGreen/70">Room 302</p>
                            </div>
                            <div className="text-right">
                              <p className="text-palette-darkGreen">10:00 AM</p>
                              <p className="text-xs text-palette-darkGreen/70">1 hour</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Computer Networks</p>
                              <p className="text-sm text-palette-darkGreen/70">Lab 3</p>
                            </div>
                            <div className="text-right">
                              <p className="text-palette-darkGreen">1:00 PM</p>
                              <p className="text-xs text-palette-darkGreen/70">2 hours</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Technical Writing</p>
                              <p className="text-sm text-palette-darkGreen/70">Room 105</p>
                            </div>
                            <div className="text-right">
                              <p className="text-palette-darkGreen">3:30 PM</p>
                              <p className="text-xs text-palette-darkGreen/70">1 hour</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-palette-darkGreen text-lg">Upcoming Deadlines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border-l-2 border-red-500">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Programming Assignment</p>
                              <p className="text-sm text-palette-darkGreen/70">Data Structures</p>
                            </div>
                            <div className="text-right">
                              <p className="text-red-600 dark:text-red-400">Tomorrow</p>
                              <p className="text-xs text-palette-darkGreen/70">11:59 PM</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Project Proposal</p>
                              <p className="text-sm text-palette-darkGreen/70">Software Engineering</p>
                            </div>
                            <div className="text-right">
                              <p className="text-palette-darkGreen">April 20</p>
                              <p className="text-xs text-palette-darkGreen/70">5:00 PM</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg">
                            <div>
                              <p className="font-medium text-palette-darkGreen">Mid-term Exam</p>
                              <p className="text-sm text-palette-darkGreen/70">Computer Networks</p>
                            </div>
                            <div className="text-right">
                              <p className="text-palette-darkGreen">April 25</p>
                              <p className="text-xs text-palette-darkGreen/70">10:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-palette-darkGreen text-lg">Quick Links</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="border-palette-beige text-palette-darkGreen justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Class Notes</span>
                          </Button>
                          <Button variant="outline" className="border-palette-beige text-palette-darkGreen justify-start">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Study Groups</span>
                          </Button>
                          <Button variant="outline" className="border-palette-beige text-palette-darkGreen justify-start">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            <span>Discussion</span>
                          </Button>
                          <Button variant="outline" className="border-palette-beige text-palette-darkGreen justify-start">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Schedule</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Campus Events</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="bg-white dark:bg-gray-950 border-palette-beige">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-palette-darkGreen">{event.title}</h3>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center text-sm text-palette-darkGreen/70">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-palette-darkGreen/70">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-palette-darkGreen/70">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={
                              event.type === "deadline" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                              event.type === "contest" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }>
                              {event.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-palette-darkGreen">Commute Options</h2>
                    <Button 
                      variant="outline" 
                      className="border-palette-darkGreen text-palette-darkGreen"
                      onClick={() => setActiveTab("commute")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-palette-beige/50">
                          <th className="px-4 py-2 text-left text-palette-darkGreen font-medium">Type</th>
                          <th className="px-4 py-2 text-left text-palette-darkGreen font-medium">Route</th>
                          <th className="px-4 py-2 text-left text-palette-darkGreen font-medium">Time</th>
                          <th className="px-4 py-2 text-left text-palette-darkGreen font-medium">Availability</th>
                          <th className="px-4 py-2 text-left text-palette-darkGreen font-medium">Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {commuteOptions.slice(0, 2).map((option) => (
                          <tr key={option.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="px-4 py-3 text-palette-darkGreen">{option.type}</td>
                            <td className="px-4 py-3 text-palette-darkGreen">{option.route}</td>
                            <td className="px-4 py-3 text-palette-darkGreen">{option.time}</td>
                            <td className="px-4 py-3 text-palette-darkGreen">{option.seats}</td>
                            <td className="px-4 py-3 text-palette-darkGreen">{option.contact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-palette-darkGreen">Study Spaces</h2>
                    <Button 
                      variant="outline" 
                      className="border-palette-darkGreen text-palette-darkGreen"
                      onClick={() => setActiveTab("study-spaces")}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {studySpaces.slice(0, 2).map((space) => (
                      <Card key={space.id} className="bg-white dark:bg-gray-950 border-palette-beige overflow-hidden">
                        <div className="relative h-40 w-full">
                          <Image
                            src={space.image}
                            alt={space.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-palette-darkGreen">{space.name}</h3>
                            <Badge className={
                              space.currentOccupancy === "Low" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                              space.currentOccupancy === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }>
                              {space.currentOccupancy}
                            </Badge>
                          </div>
                          <p className="text-sm text-palette-darkGreen/70 mb-2">{space.type} • {space.hours}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {space.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="border-palette-beige text-palette-darkGreen/70">
                                {feature}
                              </Badge>
                            ))}
                            {space.features.length > 2 && (
                              <Badge variant="outline" className="border-palette-beige text-palette-darkGreen/70">
                                +{space.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "commute" && (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen">Commute Options</h2>
                    <p className="text-palette-darkGreen/70">Find and share transportation options with fellow students</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                      <Input placeholder="Search routes..." className="pl-9 border-palette-beige" />
                    </div>
                    <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                      Add New Option
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-palette-beige/50">
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Type</th>
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Route</th>
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Time</th>
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Availability</th>
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Contact</th>
                              <th className="px-4 py-3 text-left text-palette-darkGreen font-medium">Notes</th>
                              <th className="px-4 py-3 text-palette-darkGreen font-medium"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {commuteOptions.map((option) => (
                              <tr key={option.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td className="px-4 py-3 text-palette-darkGreen">{option.type}</td>
                                <td className="px-4 py-3 text-palette-darkGreen">{option.route}</td>
                                <td className="px-4 py-3 text-palette-darkGreen">{option.time}</td>
                                <td className="px-4 py-3 text-palette-darkGreen">{option.seats}</td>
                                <td className="px-4 py-3 text-palette-darkGreen">{option.contact}</td>
                                <td className="px-4 py-3 text-palette-darkGreen/70 max-w-xs truncate">{option.notes}</td>
                                <td className="px-4 py-3">
                                  <Button variant="outline" size="sm" className="border-palette-darkGreen text-palette-darkGreen">
                                    Contact
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen">Create a New Commute Option</CardTitle>
                      <CardDescription className="text-palette-darkGreen/70">
                        Share your commute with other students to save costs and reduce environmental impact
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="type" className="text-sm font-medium text-palette-darkGreen">
                            Commute Type
                          </label>
                          <select 
                            id="type" 
                            className="w-full rounded-md border border-palette-beige bg-transparent px-3 py-2 text-sm placeholder:text-palette-darkGreen/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-brightGreen"
                          >
                            <option value="carpool">Carpool</option>
                            <option value="shared-auto">Shared Auto</option>
                            <option value="bus-group">Bus Group</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="route" className="text-sm font-medium text-palette-darkGreen">
                            Route
                          </label>
                          <Input id="route" placeholder="e.g., South City to Campus" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="time" className="text-sm font-medium text-palette-darkGreen">
                            Time
                          </label>
                          <Input id="time" placeholder="e.g., 8:00 AM (Departure)" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="seats" className="text-sm font-medium text-palette-darkGreen">
                            Available Seats
                          </label>
                          <Input id="seats" placeholder="e.g., 2 seats available" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-palette-darkGreen">
                            Contact Number
                          </label>
                          <Input id="phone" placeholder="Your phone number" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="notes" className="text-sm font-medium text-palette-darkGreen">
                            Additional Notes
                          </label>
                          <Input id="notes" placeholder="e.g., Cost sharing details, frequency" className="border-palette-beige" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                        Create Commute Option
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "study-spaces" && (
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen">Study Spaces</h2>
                    <p className="text-palette-darkGreen/70">Find the perfect spot to study on and off campus</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                      <Input placeholder="Search spaces..." className="pl-9 border-palette-beige" />
                    </div>
                    <select 
                      className="rounded-md border border-palette-beige bg-transparent px-3 py-2 text-sm text-palette-darkGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-brightGreen"
                    >
                      <option value="">All Types</option>
                      <option value="library">Library</option>
                      <option value="cafe">Café</option>
                      <option value="coworking">Co-working Space</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="grid gap-6 md:grid-cols-3">
                    {studySpaces.map((space) => (
                      <Card key={space.id} className="bg-white dark:bg-gray-950 border-palette-beige overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={space.image}
                            alt={space.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className={
                              space.currentOccupancy === "Low" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                              space.currentOccupancy === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }>
                              {space.currentOccupancy} Occupancy
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-medium text-palette-darkGreen mb-1">{space.name}</h3>
                          <p className="text-sm text-palette-darkGreen/70 mb-3">{space.type}</p>
                          <div className="flex items-center gap-1 text-sm text-palette-darkGreen/70 mb-3">
                            <Clock className="h-4 w-4" />
                            <span>{space.hours}</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-palette-darkGreen">Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {space.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="border-palette-beige text-palette-darkGreen/70">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" className="w-full border-palette-darkGreen text-palette-darkGreen">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-white dark:bg-gray-950 border-palette-beige">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen">Suggest a Study Space</CardTitle>
                      <CardDescription className="text-palette-darkGreen/70">
                        Know a great place to study that&apos;s not listed? Share it with the community!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-palette-darkGreen">
                            Place Name
                          </label>
                          <Input id="name" placeholder="e.g., City Library" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="type" className="text-sm font-medium text-palette-darkGreen">
                            Type
                          </label>
                          <select 
                            id="type" 
                            className="w-full rounded-md border border-palette-beige bg-transparent px-3 py-2 text-sm placeholder:text-palette-darkGreen/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-brightGreen"
                          >
                            <option value="library">Library</option>
                            <option value="cafe">Café</option>
                            <option value="coworking">Co-working Space</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium text-palette-darkGreen">
                            Location
                          </label>
                          <Input id="location" placeholder="Address or area" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="hours" className="text-sm font-medium text-palette-darkGreen">
                            Operating Hours
                          </label>
                          <Input id="hours" placeholder="e.g., 9:00 AM - 9:00 PM" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="features" className="text-sm font-medium text-palette-darkGreen">
                            Features (comma separated)
                          </label>
                          <Input id="features" placeholder="e.g., Wi-Fi, Power outlets, Quiet zones" className="border-palette-beige" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="description" className="text-sm font-medium text-palette-darkGreen">
                            Description
                          </label>
                          <textarea
                            id="description"
                            placeholder="Tell us about this study space..."
                            className="w-full min-h-[100px] rounded-md border border-palette-beige bg-transparent px-3 py-2 text-sm placeholder:text-palette-darkGreen/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-brightGreen"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                        Submit Study Space
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}