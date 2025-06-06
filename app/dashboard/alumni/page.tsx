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
  Users,
  Briefcase,
  GraduationCap,
  Building,
  Share2,
  Award,
  Handshake,
  Trophy,
  Target,
  Lightbulb,
  Coffee,
  Rocket,
  Sparkles,
  PartyPopper,
  Gift
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AlumniCarousel } from "@/components/alumni-carousel"

// Sample data
const upcomingEvents = [
  {
    id: 1,
    title: "Annual Alumni Meet",
    date: "June 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Main Auditorium",
    type: "networking",
  },
  {
    id: 2,
    title: "Career Mentorship Program",
    date: "May 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Online",
    type: "mentorship",
  },
  {
    id: 3,
    title: "Industry-Academia Panel",
    date: "July 5, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Hall",
    type: "panel",
  },
]

const jobOpportunities = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    type: "Full-time",
    postedBy: "Rahul Mehta (Batch of 2018)",
    description: "Looking for experienced software engineers with expertise in React, Node.js, and cloud technologies.",
    deadline: "May 30, 2025",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Remote",
    type: "Full-time",
    postedBy: "Priya Singh (Batch of 2016)",
    description: "Seeking a product manager with 3+ years of experience in SaaS products and strong analytical skills.",
    deadline: "June 15, 2025",
  },
  {
    id: 3,
    title: "UX/UI Design Intern",
    company: "DesignHub",
    location: "Mumbai, India",
    type: "Internship",
    postedBy: "Vikram Patel (Batch of 2020)",
    description: "Great opportunity for recent graduates interested in user experience design. Portfolio required.",
    deadline: "May 25, 2025",
  },
]

const mentorshipPrograms = [
  {
    id: 1,
    title: "Career Guidance Program",
    description: "One-on-one mentorship for current students to help them navigate career choices and industry trends.",
    commitment: "2 hours per month for 6 months",
    mentors: 15,
    mentees: 45,
    status: "Accepting Mentors",
  },
  {
    id: 2,
    title: "Technical Skills Workshop",
    description: "Alumni-led workshops to teach practical skills not covered in the curriculum.",
    commitment: "One 3-hour workshop",
    mentors: 8,
    mentees: 120,
    status: "Accepting Mentors",
  },
  {
    id: 3,
    title: "Entrepreneurship Mentoring",
    description: "Support for student startups and business ideas from alumni entrepreneurs.",
    commitment: "Flexible, based on project needs",
    mentors: 6,
    mentees: 12,
    status: "Accepting Applications",
  },
]

const alumniSpotlight = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Product Manager at Google",
    image: "/placeholder.svg?height=200&width=200&text=PS",
    year: "2015",
    quote: "The foundation I built during my time at college has been instrumental in my career growth at Google.",
    achievement: "Led the launch of a major Google product with over 10 million users",
    skills: ["Product Management", "UX Strategy", "Team Leadership"]
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Founder & CEO of TechStart",
    image: "/placeholder.svg?height=200&width=200&text=RM",
    year: "2018",
    quote: "My entrepreneurial journey began with a project in the college incubator. Now we've raised Series B funding.",
    achievement: "Built a startup valued at $50 million with 100+ employees",
    skills: ["Entrepreneurship", "Fundraising", "Product Strategy"]
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "AI Research Scientist at OpenAI",
    image: "/placeholder.svg?height=200&width=200&text=AP",
    year: "2017",
    quote: "The rigorous academic environment prepared me for the challenges of cutting-edge AI research.",
    achievement: "Published 5 papers in top AI conferences and contributed to major language models",
    skills: ["Machine Learning", "Natural Language Processing", "Research"]
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Investment Banker at Morgan Stanley",
    image: "/placeholder.svg?height=200&width=200&text=VS",
    year: "2016",
    quote: "The analytical thinking I developed during my studies has been crucial in my finance career.",
    achievement: "Managed deals worth over $2 billion in the technology sector",
    skills: ["Financial Analysis", "Mergers & Acquisitions", "Valuation"]
  },
  {
    id: 5,
    name: "Neha Gupta",
    role: "Senior Software Engineer at Microsoft",
    image: "/placeholder.svg?height=200&width=200&text=NG",
    year: "2019",
    quote: "The coding competitions and hackathons at college gave me the competitive edge I needed in the industry.",
    achievement: "Led the development of key features in Microsoft Teams used by millions",
    skills: ["Cloud Architecture", "Distributed Systems", "Full-Stack Development"]
  }
]

const notifications = [
  {
    id: 1,
    title: "Mentorship Request",
    message: "Arjun Kumar (3rd year student) has requested your mentorship in software development.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Alumni Meet Registration",
    message: "Early bird registration for the Annual Alumni Meet closes in 3 days.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 3,
    title: "New Job Posting",
    message: "A new job opportunity has been posted by an alumnus from your batch.",
    time: "2 days ago",
    read: true,
  },
]

export default function AlumniDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
          <span className="font-semibold text-palette-darkGreen">Alumni Network</span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-palette-darkGreen" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard/alumni" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <BookOpen className="h-5 w-5" />
            <span>Resources</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-palette-darkGreen">
            <Calendar className="h-5 w-5" />
            <span>Events</span>
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
              <h1 className="text-xl font-bold text-palette-darkGreen">Alumni Network</h1>
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
                onClick={() => setActiveTab("jobs")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "jobs" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <Briefcase className="h-5 w-5" />
                <span>Job Board</span>
              </button>
              <button
                onClick={() => setActiveTab("mentorship")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "mentorship" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <GraduationCap className="h-5 w-5" />
                <span>Mentorship</span>
              </button>
              <button
                onClick={() => setActiveTab("giveback")}
                className={`flex items-center gap-2 w-full p-2 rounded-lg ${activeTab === "giveback" ? "bg-palette-brightGreen/10 text-palette-brightGreen" : "text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <Gift className="h-5 w-5" />
                <span>Give Back</span>
              </button>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="px-2 text-xs font-semibold text-palette-darkGreen/70 uppercase tracking-wider">
                  College Connect
                </h3>
                <div className="mt-2 space-y-2">
                  <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <BookOpen className="h-5 w-5" />
                    <span>Resources</span>
                  </Link>
                  <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Calendar className="h-5 w-5" />
                    <span>Events</span>
                  </Link>
                  <Link href="/donate" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Handshake className="h-5 w-5" />
                    <span>Give Back</span>
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
                  <p className="text-sm font-medium text-palette-darkGreen">Ananya Patel</p>
                  <p className="text-xs text-palette-darkGreen/70">Class of 2017</p>
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
                {activeTab === "overview" ? "Alumni Dashboard" :
                 activeTab === "jobs" ? "Alumni Job Board" :
                 activeTab === "mentorship" ? "Mentorship Programs" :
                 "Give Back & Support"}
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
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 py-6 px-4 md:px-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Welcome Card with Professional Playfulness */}
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-darkGreen/20 bg-gradient-to-r from-palette-beige/10 to-palette-brightGreen/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-palette-brightGreen/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    <CardHeader className="pb-4 relative">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CardTitle className="text-palette-darkGreen flex items-center gap-2 text-xl">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Rocket className="h-5 w-5 text-palette-brightGreen" />
                          </motion.div>
                          Welcome back, Ananya!
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-lg"
                          >
                            🎯
                          </motion.span>
                        </CardTitle>
                        <CardDescription className="text-palette-darkGreen/70">
                          Your professional network is thriving! Let&apos;s make some impact together. ✨
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium text-palette-darkGreen flex items-center gap-1">
                              Next Event
                              <Coffee className="h-3 w-3 text-amber-600" />
                            </p>
                            <p className="text-xs text-palette-darkGreen/70">Annual Alumni Meet (Jun 15)</p>
                            <p className="text-xs text-blue-600 font-medium">Can&apos;t wait to see everyone! 🎉</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <MessageSquare className="h-6 w-6 text-purple-600" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium text-palette-darkGreen flex items-center gap-1">
                              Mentorship Requests
                              <Lightbulb className="h-3 w-3 text-yellow-500" />
                            </p>
                            <p className="text-xs text-palette-darkGreen/70">3 pending requests</p>
                            <p className="text-xs text-purple-600 font-medium">Future leaders await! 🌟</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Briefcase className="h-6 w-6 text-green-600" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium text-palette-darkGreen flex items-center gap-1">
                              Job Opportunities
                              <Target className="h-3 w-3 text-red-500" />
                            </p>
                            <p className="text-xs text-palette-darkGreen/70">15 new postings this month</p>
                            <p className="text-xs text-green-600 font-medium">Career growth incoming! 🚀</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Achievement Streak */}
                      <motion.div
                        className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Trophy className="h-6 w-6 text-amber-600" />
                            </motion.div>
                            <div>
                              <p className="font-medium text-palette-darkGreen">Alumni Engagement Streak</p>
                              <p className="text-sm text-palette-darkGreen/70">You&apos;re on fire! 🔥 Keep it up!</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-amber-600">47</p>
                            <p className="text-xs text-palette-darkGreen/70">days active</p>
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Alumni Spotlight */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Alumni Spotlight</h2>
                  <AlumniCarousel alumni={alumniSpotlight} />
                </motion.div>

                {/* Upcoming Events */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Upcoming Alumni Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-palette-darkGreen text-lg">{event.title}</CardTitle>
                            <Badge className={
                              event.type === "networking" ? "bg-blue-100 text-blue-800" :
                              event.type === "mentorship" ? "bg-purple-100 text-purple-800" :
                              "bg-green-100 text-green-800"
                            }>
                              {event.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-2 text-palette-darkGreen/70">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-palette-darkGreen/70">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-palette-darkGreen/70">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full text-palette-darkGreen border-palette-darkGreen/30 hover:bg-palette-brightGreen/10 hover:text-palette-brightGreen hover:border-palette-brightGreen/50">
                            Register Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Links with Professional Playfulness */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-palette-brightGreen" />
                    Quick Actions
                    <span className="text-sm font-normal text-palette-darkGreen/70">(Let&apos;s make things happen! 💪)</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                        <CardContent className="pt-6 text-center">
                          <motion.div
                            className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Share2 className="h-7 w-7 text-blue-600" />
                          </motion.div>
                          <h3 className="font-medium text-palette-darkGreen">Share Job Openings</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Help fellow alumni find opportunities</p>
                          <p className="text-xs text-blue-600 font-medium mt-2">Be the bridge! 🌉</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <CardContent className="pt-6 text-center">
                          <motion.div
                            className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <GraduationCap className="h-7 w-7 text-purple-600" />
                          </motion.div>
                          <h3 className="font-medium text-palette-darkGreen">Become a Mentor</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Guide current students in their journey</p>
                          <p className="text-xs text-purple-600 font-medium mt-2">Shape the future! 🌟</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                        <CardContent className="pt-6 text-center">
                          <motion.div
                            className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-4"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Building className="h-7 w-7 text-green-600" />
                          </motion.div>
                          <h3 className="font-medium text-palette-darkGreen">Campus Visits</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Schedule a visit to your alma mater</p>
                          <p className="text-xs text-green-600 font-medium mt-2">Nostalgia trip! 🏫</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                        <CardContent className="pt-6 text-center">
                          <motion.div
                            className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Award className="h-7 w-7 text-amber-600" />
                          </motion.div>
                          <h3 className="font-medium text-palette-darkGreen">Update Achievements</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Share your success with the community</p>
                          <p className="text-xs text-amber-600 font-medium mt-2">Celebrate wins! 🎉</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Fun Alumni Stats */}
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-palette-beige/20 to-palette-brightGreen/10 rounded-lg border border-palette-brightGreen/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="font-medium text-palette-darkGreen mb-4 flex items-center gap-2">
                      <PartyPopper className="h-5 w-5 text-palette-brightGreen" />
                      Alumni Network Fun Facts
                      <span className="text-sm font-normal text-palette-darkGreen/70">(Because numbers can be fun too! 📊)</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <motion.p
                          className="text-3xl font-bold text-palette-brightGreen"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        >
                          2,847
                        </motion.p>
                        <p className="text-sm text-palette-darkGreen/70">Active Alumni</p>
                        <p className="text-xs text-palette-darkGreen/60">Growing strong! 💪</p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-3xl font-bold text-blue-600"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          156
                        </motion.p>
                        <p className="text-sm text-palette-darkGreen/70">Companies</p>
                        <p className="text-xs text-palette-darkGreen/60">Global reach! 🌍</p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-3xl font-bold text-purple-600"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          89%
                        </motion.p>
                        <p className="text-sm text-palette-darkGreen/70">Success Rate</p>
                        <p className="text-xs text-palette-darkGreen/60">Crushing it! 🚀</p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-3xl font-bold text-green-600"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        >
                          ₹2.1Cr
                        </motion.p>
                        <p className="text-sm text-palette-darkGreen/70">Avg Package</p>
                        <p className="text-xs text-palette-darkGreen/60">Living the dream! ✨</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Jobs Tab */}
            {activeTab === "jobs" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-darkGreen/20">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen">Alumni Job Board</CardTitle>
                      <CardDescription>Opportunities shared by fellow alumni</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-palette-darkGreen/50" />
                          <Input 
                            placeholder="Search jobs by title, company, or location..." 
                            className="pl-10 border-palette-darkGreen/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" className="border-palette-darkGreen/30 text-palette-darkGreen">
                          Filter
                        </Button>
                        <Button className="bg-palette-brightGreen text-white hover:bg-palette-brightGreen/90">
                          Post a Job
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {jobOpportunities.map((job) => (
                          <Card key={job.id} className="border-palette-darkGreen/20">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-palette-darkGreen text-lg">{job.title}</CardTitle>
                                  <CardDescription>{job.company}</CardDescription>
                                </div>
                                <Badge className="bg-palette-beige text-palette-darkGreen">
                                  {job.type}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <p className="text-palette-darkGreen/80 text-sm">{job.description}</p>
                              <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                <User className="h-4 w-4" />
                                <span className="text-sm">Posted by: {job.postedBy}</span>
                              </div>
                              <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">Apply by: {job.deadline}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button className="flex-1 bg-palette-brightGreen text-white hover:bg-palette-brightGreen/90">
                                Apply Now
                              </Button>
                              <Button variant="outline" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                Save
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-palette-darkGreen/70">
                        Showing 3 of 24 opportunities
                      </p>
                      <Button variant="outline" className="text-palette-darkGreen border-palette-darkGreen/30">
                        View All Jobs
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Mentorship Tab */}
            {activeTab === "mentorship" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-darkGreen/20">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen">Mentorship Programs</CardTitle>
                      <CardDescription>Guide the next generation of professionals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-palette-beige/20 rounded-lg">
                          <h3 className="font-medium text-palette-darkGreen">Your Mentorship Impact</h3>
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-palette-brightGreen">5</p>
                              <p className="text-xs text-palette-darkGreen/70">Students Mentored</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-palette-brightGreen">12</p>
                              <p className="text-xs text-palette-darkGreen/70">Hours Contributed</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-palette-brightGreen">4.8</p>
                              <p className="text-xs text-palette-darkGreen/70">Average Rating</p>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-medium text-palette-darkGreen">Available Programs</h3>
                        <div className="space-y-4">
                          {mentorshipPrograms.map((program) => (
                            <Card key={program.id} className="border-palette-darkGreen/20">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-palette-darkGreen text-lg">{program.title}</CardTitle>
                                  <Badge className={
                                    program.status === "Accepting Mentors" ? "bg-green-100 text-green-800" :
                                    program.status === "Accepting Applications" ? "bg-blue-100 text-blue-800" :
                                    "bg-amber-100 text-amber-800"
                                  }>
                                    {program.status}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <p className="text-palette-darkGreen/80 text-sm">{program.description}</p>
                                <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm">Commitment: {program.commitment}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                    <Users className="h-4 w-4" />
                                    <span className="text-xs">{program.mentors} mentors</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-xs">{program.mentees} mentees</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button className="w-full bg-palette-brightGreen text-white hover:bg-palette-brightGreen/90">
                                  Join as Mentor
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-palette-darkGreen/20">
                          <h3 className="font-medium text-palette-darkGreen mb-4">Your Active Mentees</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-palette-darkGreen/20">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-palette-beige flex items-center justify-center">
                                  <User className="h-5 w-5 text-palette-darkGreen" />
                                </div>
                                <div>
                                  <p className="font-medium text-palette-darkGreen">Arjun Kumar</p>
                                  <p className="text-xs text-palette-darkGreen/70">Computer Science, 3rd Year</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                  Message
                                </Button>
                                <Button size="sm" className="bg-palette-brightGreen text-white hover:bg-palette-brightGreen/90">
                                  Schedule
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-palette-darkGreen/20">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-palette-beige flex items-center justify-center">
                                  <User className="h-5 w-5 text-palette-darkGreen" />
                                </div>
                                <div>
                                  <p className="font-medium text-palette-darkGreen">Priya Desai</p>
                                  <p className="text-xs text-palette-darkGreen/70">Data Science, 4th Year</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                  Message
                                </Button>
                                <Button size="sm" className="bg-palette-brightGreen text-white hover:bg-palette-brightGreen/90">
                                  Schedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Give Back Tab */}
            {activeTab === "giveback" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-darkGreen/20 bg-gradient-to-r from-palette-beige/10 to-palette-brightGreen/5">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Gift className="h-6 w-6 text-palette-brightGreen" />
                        </motion.div>
                        Give Back & Support
                        <span className="text-sm font-normal text-palette-darkGreen/70">(Spread the love! 💝)</span>
                      </CardTitle>
                      <CardDescription>
                        Support your alma mater and help current students achieve their dreams! Every contribution makes a difference. ✨
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Donation Impact */}
                      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50">
                        <h3 className="font-medium text-palette-darkGreen mb-4 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-600" />
                          Your Impact So Far
                          <span className="text-sm font-normal text-palette-darkGreen/70">(You&apos;re amazing! 🌟)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <motion.p
                              className="text-3xl font-bold text-green-600"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              ₹25,000
                            </motion.p>
                            <p className="text-sm text-palette-darkGreen/70">Total Donated</p>
                            <p className="text-xs text-green-600 font-medium">Generous heart! 💚</p>
                          </div>
                          <div className="text-center">
                            <motion.p
                              className="text-3xl font-bold text-blue-600"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                              12
                            </motion.p>
                            <p className="text-sm text-palette-darkGreen/70">Students Helped</p>
                            <p className="text-xs text-blue-600 font-medium">Life changer! 🎓</p>
                          </div>
                          <div className="text-center">
                            <motion.p
                              className="text-3xl font-bold text-purple-600"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            >
                              #3
                            </motion.p>
                            <p className="text-sm text-palette-darkGreen/70">Top Contributor</p>
                            <p className="text-xs text-purple-600 font-medium">Superstar! ⭐</p>
                          </div>
                        </div>
                      </div>

                      {/* Donation Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-blue-600" />
                                Scholarship Fund
                              </CardTitle>
                              <CardDescription>Help deserving students pursue their education</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-palette-darkGreen/70">Goal: ₹5,00,000</span>
                                  <span className="text-blue-600 font-medium">₹3,47,500 raised</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    className="bg-blue-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "69.5%" }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                  ></motion.div>
                                </div>
                                <p className="text-xs text-palette-darkGreen/60">69.5% complete - Almost there! 🎯</p>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Donate Now
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="border-green-200/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                                <Building className="h-5 w-5 text-green-600" />
                                Infrastructure Development
                              </CardTitle>
                              <CardDescription>Upgrade labs, libraries, and facilities</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-palette-darkGreen/70">Goal: ₹10,00,000</span>
                                  <span className="text-green-600 font-medium">₹6,23,000 raised</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    className="bg-green-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "62.3%" }}
                                    transition={{ duration: 2, delay: 0.7 }}
                                  ></motion.div>
                                </div>
                                <p className="text-xs text-palette-darkGreen/60">62.3% complete - Making progress! 🏗️</p>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                                Contribute
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      </div>

                      {/* Other Ways to Give Back */}
                      <div>
                        <h3 className="font-medium text-palette-darkGreen mb-4 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-palette-brightGreen" />
                          Other Ways to Give Back
                          <span className="text-sm font-normal text-palette-darkGreen/70">(Time is precious too! ⏰)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer">
                              <CardContent className="pt-6 text-center">
                                <motion.div
                                  className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4"
                                  animate={{ rotate: [0, 5, -5, 0] }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                >
                                  <MessageSquare className="h-6 w-6 text-purple-600" />
                                </motion.div>
                                <h3 className="font-medium text-palette-darkGreen">Guest Lectures</h3>
                                <p className="text-xs text-palette-darkGreen/70 mt-1">Share your expertise with students</p>
                                <p className="text-xs text-purple-600 font-medium mt-2">Inspire minds! 🧠</p>
                              </CardContent>
                            </Card>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer">
                              <CardContent className="pt-6 text-center">
                                <motion.div
                                  className="mx-auto w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Briefcase className="h-6 w-6 text-orange-600" />
                                </motion.div>
                                <h3 className="font-medium text-palette-darkGreen">Internship Programs</h3>
                                <p className="text-xs text-palette-darkGreen/70 mt-1">Offer internships at your company</p>
                                <p className="text-xs text-orange-600 font-medium mt-2">Open doors! 🚪</p>
                              </CardContent>
                            </Card>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="border-palette-darkGreen/20 hover:border-palette-brightGreen/50 transition-all cursor-pointer">
                              <CardContent className="pt-6 text-center">
                                <motion.div
                                  className="mx-auto w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4"
                                  animate={{ y: [0, -2, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Users className="h-6 w-6 text-pink-600" />
                                </motion.div>
                                <h3 className="font-medium text-palette-darkGreen">Alumni Events</h3>
                                <p className="text-xs text-palette-darkGreen/70 mt-1">Help organize reunions and meetups</p>
                                <p className="text-xs text-pink-600 font-medium mt-2">Bring us together! 🤝</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </main>

          <footer className="py-6 px-4 md:px-6 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-palette-darkGreen/70">
                © 2025 Ignisia College Alumni Association
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link href="/terms" className="text-xs text-palette-darkGreen/70 hover:text-palette-darkGreen">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-xs text-palette-darkGreen/70 hover:text-palette-darkGreen">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-xs text-palette-darkGreen/70 hover:text-palette-darkGreen">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}