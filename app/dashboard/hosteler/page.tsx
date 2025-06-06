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
  Utensils,
  ShoppingCart,
  Gamepad2,
  Bed,
  Wrench,
  Coffee,
  Pizza,
  Heart,
  Star,
  Zap,
  Sparkles,
  PartyPopper,
  Laugh,
  Smile
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data with fun, hostel-specific content
const quickStats = [
  {
    id: 1,
    title: "Midnight Snack Runs",
    value: "23",
    subtitle: "This month 🍕",
    color: "bg-orange-100 text-orange-800",
    icon: Pizza,
  },
  {
    id: 2,
    title: "Gaming Sessions",
    value: "47",
    subtitle: "Hours this week 🎮",
    color: "bg-purple-100 text-purple-800",
    icon: Gamepad2,
  },
  {
    id: 3,
    title: "Laundry Reminders",
    value: "3",
    subtitle: "Overdue loads 😅",
    color: "bg-blue-100 text-blue-800",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Room Cleanliness",
    value: "7/10",
    subtitle: "Not bad! 🧹",
    color: "bg-green-100 text-green-800",
    icon: Star,
  },
]

const foodDeliveryGroups = [
  {
    id: 1,
    restaurant: "Midnight Munchies 🌙",
    organizer: "Rahul (Room 204)",
    currentMembers: 4,
    maxMembers: 6,
    estimatedDelivery: "11:30 PM",
    minOrder: "₹200",
    status: "Accepting Orders",
    emoji: "🍔",
    vibe: "Late night cravings hitting different!",
  },
  {
    id: 2,
    restaurant: "Desi Delights 🌶️",
    organizer: "Priya (Room 156)",
    currentMembers: 3,
    maxMembers: 5,
    estimatedDelivery: "7:00 PM",
    minOrder: "₹150",
    status: "Almost Full",
    emoji: "🍛",
    vibe: "Homestyle food for the soul",
  },
  {
    id: 3,
    restaurant: "Pizza Paradise 🍕",
    organizer: "Alex (Room 301)",
    currentMembers: 6,
    maxMembers: 8,
    estimatedDelivery: "8:30 PM",
    minOrder: "₹300",
    status: "Open",
    emoji: "🍕",
    vibe: "Weekend pizza party vibes!",
  },
]

const marketplaceItems = [
  {
    id: 1,
    title: "Gaming Chair (Barely Used) 🎮",
    price: "₹3,500",
    seller: "Arjun - Room 205",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    condition: "Like New",
    description: "Perfect for those long gaming sessions! Only used for 2 months.",
    tags: ["Gaming", "Furniture"],
    emoji: "🪑",
  },
  {
    id: 2,
    title: "Mini Fridge (Cold as Ice) ❄️",
    price: "₹4,200",
    seller: "Sneha - Room 112",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    condition: "Good",
    description: "Keep your midnight snacks fresh! Moving out sale.",
    tags: ["Appliances", "Essential"],
    emoji: "🧊",
  },
  {
    id: 3,
    title: "Study Lamp (Bright Ideas) 💡",
    price: "₹800",
    seller: "Vikram - Room 308",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    condition: "Excellent",
    description: "Illuminate your path to academic success!",
    tags: ["Study", "Lighting"],
    emoji: "💡",
  },
]

const roommateRequests = [
  {
    id: 1,
    name: "Ananya Sharma",
    year: "2nd Year CSE",
    interests: ["Anime", "Gaming", "Late-night coding"],
    sleepSchedule: "Night Owl 🦉",
    cleanliness: "Moderately Clean",
    budget: "₹8,000-10,000",
    personality: "Chill and friendly, loves discussing plot twists!",
    emoji: "🤓",
    compatibility: 92,
  },
  {
    id: 2,
    name: "Rohan Patel",
    year: "3rd Year Mechanical",
    interests: ["Sports", "Music", "Cooking"],
    sleepSchedule: "Early Bird 🐦",
    cleanliness: "Very Clean",
    budget: "₹7,000-9,000",
    personality: "Organized and loves to cook for friends!",
    emoji: "👨‍🍳",
    compatibility: 87,
  },
]

const hostelEvents = [
  {
    id: 1,
    title: "Midnight Gaming Tournament 🎮",
    date: "Tonight",
    time: "11:00 PM - 3:00 AM",
    location: "Common Room",
    participants: 24,
    maxParticipants: 32,
    prize: "₹2,000 + Bragging Rights",
    type: "gaming",
    emoji: "🏆",
    vibe: "Epic battles await!",
  },
  {
    id: 2,
    title: "Hostel Talent Show 🎭",
    date: "Saturday",
    time: "7:00 PM - 10:00 PM",
    location: "Main Hall",
    participants: 15,
    maxParticipants: 25,
    prize: "Fame & Glory",
    type: "entertainment",
    emoji: "🌟",
    vibe: "Show off your hidden talents!",
  },
  {
    id: 3,
    title: "Study Group Marathon 📚",
    date: "Sunday",
    time: "2:00 PM - 8:00 PM",
    location: "Study Hall",
    participants: 12,
    maxParticipants: 20,
    prize: "Pizza for All!",
    type: "academic",
    emoji: "🧠",
    vibe: "Grind together, succeed together!",
  },
]

export default function HostelerDashboard() {
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

  const funVariants = {
    hover: { 
      scale: 1.05, 
      rotate: [0, -1, 1, 0],
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-lightYellow/20 via-background to-palette-beige/30">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-950 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out lg:hidden border-r-4 border-palette-lightYellow`}>
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-palette-lightYellow/20 to-palette-beige/20">
          <span className="font-bold text-palette-darkGreen flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-palette-brightGreen" />
            Hostel Life Central
          </span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-palette-darkGreen" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/dashboard/hosteler" className="flex items-center gap-2 p-2 rounded-lg hover:bg-palette-lightYellow/20 text-palette-darkGreen">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg hover:bg-palette-lightYellow/20 text-palette-darkGreen">
            <BookOpen className="h-5 w-5" />
            <span>Study Spaces</span>
          </Link>
          <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg hover:bg-palette-lightYellow/20 text-palette-darkGreen">
            <Calendar className="h-5 w-5" />
            <span>Events</span>
          </Link>
        </nav>
      </div>

      {/* Notifications sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-950 transform ${notificationsOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-200 ease-in-out border-l-4 border-palette-brightGreen`}>
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-palette-brightGreen/20 to-palette-lightYellow/20">
          <span className="font-semibold text-palette-darkGreen flex items-center gap-2">
            <Bell className="h-5 w-5 text-palette-brightGreen" />
            Hostel Buzz 📢
          </span>
          <button onClick={() => setNotificationsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-palette-darkGreen" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="p-3 rounded-lg bg-palette-lightYellow/20 border-l-2 border-palette-brightGreen">
            <h4 className="font-medium text-palette-darkGreen flex items-center gap-2">
              <Pizza className="h-4 w-4" />
              Food Alert! 🚨
            </h4>
            <p className="text-sm text-palette-darkGreen/70 mt-1">Midnight Munchies group needs 2 more people!</p>
            <p className="text-xs text-palette-darkGreen/50 mt-2">5 minutes ago</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 border-l-2 border-purple-400">
            <h4 className="font-medium text-palette-darkGreen flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Gaming Tournament Tonight! 🎮
            </h4>
            <p className="text-sm text-palette-darkGreen/70 mt-1">Registration closes in 2 hours. Prize: ₹2,000!</p>
            <p className="text-xs text-palette-darkGreen/50 mt-2">1 hour ago</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border-l-2 border-blue-400">
            <h4 className="font-medium text-palette-darkGreen flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Laundry Reminder 🧺
            </h4>
            <p className="text-sm text-palette-darkGreen/70 mt-1">Your clothes have been sitting in the washer for 3 hours...</p>
            <p className="text-xs text-palette-darkGreen/50 mt-2">3 hours ago</p>
          </div>
          <Button variant="outline" className="w-full border-palette-darkGreen text-palette-darkGreen hover:bg-palette-lightYellow/20">
            View All Notifications
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r-4 border-palette-lightYellow">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-950">
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-palette-lightYellow/20 to-palette-beige/20">
              <motion.h1
                className="text-xl font-bold text-palette-darkGreen flex items-center gap-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="h-6 w-6 text-palette-brightGreen" />
                </motion.div>
                Hostel Life Central
              </motion.h1>
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-2">
              <motion.button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all ${activeTab === "overview" ? "bg-gradient-to-r from-palette-lightYellow/30 to-palette-brightGreen/20 text-palette-darkGreen border-l-4 border-palette-brightGreen" : "text-palette-darkGreen hover:bg-palette-lightYellow/20"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
                {activeTab === "overview" && <Sparkles className="h-4 w-4 ml-auto text-palette-brightGreen" />}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("food")}
                className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all ${activeTab === "food" ? "bg-gradient-to-r from-palette-lightYellow/30 to-palette-brightGreen/20 text-palette-darkGreen border-l-4 border-palette-brightGreen" : "text-palette-darkGreen hover:bg-palette-lightYellow/20"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Utensils className="h-5 w-5" />
                <span className="font-medium">Food Groups</span>
                {activeTab === "food" && <Pizza className="h-4 w-4 ml-auto text-orange-500" />}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("marketplace")}
                className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all ${activeTab === "marketplace" ? "bg-gradient-to-r from-palette-lightYellow/30 to-palette-brightGreen/20 text-palette-darkGreen border-l-4 border-palette-brightGreen" : "text-palette-darkGreen hover:bg-palette-lightYellow/20"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Marketplace</span>
                {activeTab === "marketplace" && <Heart className="h-4 w-4 ml-auto text-red-500" />}
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("roommates")}
                className={`flex items-center gap-2 w-full p-3 rounded-lg transition-all ${activeTab === "roommates" ? "bg-gradient-to-r from-palette-lightYellow/30 to-palette-brightGreen/20 text-palette-darkGreen border-l-4 border-palette-brightGreen" : "text-palette-darkGreen hover:bg-palette-lightYellow/20"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Roommate Finder</span>
                {activeTab === "roommates" && <Smile className="h-4 w-4 ml-auto text-yellow-500" />}
              </motion.button>

              <div className="pt-4 mt-4 border-t border-palette-lightYellow/50">
                <h3 className="px-2 text-xs font-semibold text-palette-darkGreen/70 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  Quick Access
                </h3>
                <div className="mt-2 space-y-2">
                  <Link href="/study" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-palette-lightYellow/20 transition-colors">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">Study Spaces</span>
                  </Link>
                  <Link href="/events" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-palette-lightYellow/20 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Campus Events</span>
                  </Link>
                  <Link href="/anime-hub" className="flex items-center gap-2 p-2 rounded-lg text-palette-darkGreen hover:bg-palette-lightYellow/20 transition-colors">
                    <Film className="h-4 w-4" />
                    <span className="text-sm">Anime Hub</span>
                  </Link>
                </div>
              </div>
            </nav>

            {/* User profile section */}
            <div className="p-4 border-t border-palette-lightYellow/50 bg-gradient-to-r from-palette-beige/20 to-palette-lightYellow/20">
              <div className="flex items-center">
                <motion.div
                  className="relative h-12 w-12 rounded-full bg-gradient-to-br from-palette-brightGreen to-palette-lightYellow flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <User className="h-6 w-6 text-palette-darkGreen" />
                  <motion.div
                    className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-palette-darkGreen">Priya Sharma</p>
                  <p className="text-xs text-palette-darkGreen/70">Room 204, Block A</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Link href="/profile" className="text-xs text-palette-brightGreen hover:underline font-medium">
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
          <header className="sticky top-0 z-10 flex items-center h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-palette-lightYellow/50 px-4 md:px-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md lg:hidden text-palette-darkGreen hover:bg-palette-lightYellow/20 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0 flex-1">
              <motion.h1
                className="text-lg font-semibold text-palette-darkGreen flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === "overview" ? (
                  <>
                    <PartyPopper className="h-5 w-5 text-palette-brightGreen" />
                    Hostel Dashboard
                  </>
                ) : activeTab === "food" ? (
                  <>
                    <Pizza className="h-5 w-5 text-orange-500" />
                    Food Delivery Groups
                  </>
                ) : activeTab === "marketplace" ? (
                  <>
                    <ShoppingCart className="h-5 w-5 text-purple-500" />
                    Hostel Marketplace
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5 text-blue-500" />
                    Roommate Finder
                  </>
                )}
              </motion.h1>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={() => setNotificationsOpen(true)}
                  className="p-2 rounded-full text-palette-darkGreen hover:bg-palette-lightYellow/20 relative transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <motion.span
                    className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </button>
              </motion.div>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 py-6 px-4 md:px-6 bg-gradient-to-br from-palette-lightYellow/10 via-transparent to-palette-beige/10">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Welcome Card with Fun Stats */}
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-lightYellow/50 bg-gradient-to-r from-palette-lightYellow/20 to-palette-beige/20 overflow-hidden">
                    <CardHeader className="pb-4">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CardTitle className="text-palette-darkGreen flex items-center gap-2 text-2xl">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Sparkles className="h-6 w-6 text-palette-brightGreen" />
                          </motion.div>
                          Hey Priya! Welcome to your hostel hub! 🏠
                        </CardTitle>
                        <CardDescription className="text-palette-darkGreen/70 text-lg">
                          Your one-stop shop for all things hostel life - from midnight snacks to gaming marathons! 🎮🍕
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickStats.map((stat, index) => (
                          <motion.div
                            key={stat.id}
                            className="flex flex-col items-center p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-palette-beige/50"
                            variants={funVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className={`h-12 w-12 rounded-full ${stat.color} flex items-center justify-center mb-2`}>
                              <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-palette-darkGreen">{stat.value}</p>
                              <p className="text-xs text-palette-darkGreen/70 font-medium">{stat.title}</p>
                              <p className="text-xs text-palette-darkGreen/60">{stat.subtitle}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-palette-brightGreen" />
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      variants={funVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Card className="border-palette-lightYellow/50 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                        <CardContent className="pt-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                            <Pizza className="h-6 w-6 text-orange-600" />
                          </div>
                          <h3 className="font-medium text-palette-darkGreen">Order Food</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Join a delivery group</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      variants={funVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Card className="border-palette-lightYellow/50 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <CardContent className="pt-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                            <Gamepad2 className="h-6 w-6 text-purple-600" />
                          </div>
                          <h3 className="font-medium text-palette-darkGreen">Gaming Night</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Join tournaments</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      variants={funVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Card className="border-palette-lightYellow/50 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <CardContent className="pt-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="font-medium text-palette-darkGreen">Find Roommate</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Perfect matches</p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      variants={funVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Card className="border-palette-lightYellow/50 hover:border-palette-brightGreen/50 transition-all cursor-pointer bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <CardContent className="pt-6 text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                            <ShoppingCart className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-medium text-palette-darkGreen">Buy/Sell</h3>
                          <p className="text-xs text-palette-darkGreen/70 mt-1">Hostel marketplace</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Food Delivery Groups Tab */}
            {activeTab === "food" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-lightYellow/50 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                        <Pizza className="h-6 w-6 text-orange-500" />
                        Food Delivery Groups 🍕
                      </CardTitle>
                      <CardDescription>
                        Join groups to split delivery costs and satisfy those midnight cravings! 🌙
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-palette-darkGreen/50" />
                          <Input
                            placeholder="Search restaurants or cuisines..."
                            className="pl-10 border-palette-lightYellow/50 bg-white/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                          Create Group
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {foodDeliveryGroups.map((group, index) => (
                          <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border-palette-beige/50 hover:border-palette-brightGreen/50 transition-all bg-white/70 dark:bg-gray-900/70">
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <motion.div
                                      className="text-3xl"
                                      animate={{ rotate: [0, 10, -10, 0] }}
                                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                    >
                                      {group.emoji}
                                    </motion.div>
                                    <div>
                                      <CardTitle className="text-palette-darkGreen text-lg">{group.restaurant}</CardTitle>
                                      <CardDescription className="italic">&quot;{group.vibe}&quot;</CardDescription>
                                    </div>
                                  </div>
                                  <Badge className={
                                    group.status === "Accepting Orders" ? "bg-green-100 text-green-800" :
                                    group.status === "Almost Full" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-blue-100 text-blue-800"
                                  }>
                                    {group.status}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                    <User className="h-4 w-4" />
                                    <span>Organizer: {group.organizer}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                    <Users className="h-4 w-4" />
                                    <span>{group.currentMembers}/{group.maxMembers} members</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                    <Clock className="h-4 w-4" />
                                    <span>ETA: {group.estimatedDelivery}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-palette-darkGreen/70">
                                    <Utensils className="h-4 w-4" />
                                    <span>Min order: {group.minOrder}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-[120px]">
                                      <div
                                        className="bg-palette-brightGreen h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-palette-darkGreen/60">
                                      {group.maxMembers - group.currentMembers} spots left
                                    </span>
                                  </div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      size="sm"
                                      className="bg-orange-500 hover:bg-orange-600 text-white"
                                      disabled={group.currentMembers >= group.maxMembers}
                                    >
                                      {group.currentMembers >= group.maxMembers ? "Full" : "Join Group"}
                                    </Button>
                                  </motion.div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
                      <p className="text-sm text-palette-darkGreen/70 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Showing 3 active groups
                      </p>
                      <Button variant="outline" className="text-palette-darkGreen border-palette-darkGreen/30 hover:bg-palette-lightYellow/20">
                        View All Groups
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Marketplace Tab */}
            {activeTab === "marketplace" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-lightYellow/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-purple-500" />
                        Hostel Marketplace 🛒
                      </CardTitle>
                      <CardDescription>
                        Buy, sell, and trade with your fellow hostelers! One person&apos;s trash is another&apos;s treasure! ✨
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-palette-darkGreen/50" />
                          <Input
                            placeholder="Search items..."
                            className="pl-10 border-palette-lightYellow/50 bg-white/50"
                          />
                        </div>
                        <Button variant="outline" className="border-palette-darkGreen/30 text-palette-darkGreen">
                          Filter
                        </Button>
                        <Button className="bg-purple-500 text-white hover:bg-purple-600">
                          Sell Item
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marketplaceItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            variants={funVariants}
                            whileHover="hover"
                          >
                            <Card className="border-palette-beige/50 hover:border-palette-brightGreen/50 transition-all overflow-hidden bg-white/80 dark:bg-gray-900/80">
                              <div className="relative h-48 w-full">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-white/90 text-palette-darkGreen">
                                    {item.condition}
                                  </Badge>
                                </div>
                                <div className="absolute top-2 left-2 text-2xl">
                                  {item.emoji}
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-palette-darkGreen text-sm">{item.title}</h3>
                                  <span className="text-lg font-bold text-palette-brightGreen">{item.price}</span>
                                </div>
                                <p className="text-xs text-palette-darkGreen/70 mb-2">{item.description}</p>
                                <div className="flex items-center gap-2 text-xs text-palette-darkGreen/60 mb-3">
                                  <User className="h-3 w-3" />
                                  <span>{item.seller}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0 flex gap-2">
                                <Button size="sm" className="flex-1 bg-purple-500 text-white hover:bg-purple-600">
                                  Buy Now
                                </Button>
                                <Button size="sm" variant="outline" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Roommate Finder Tab */}
            {activeTab === "roommates" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-palette-lightYellow/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="text-palette-darkGreen flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-500" />
                        Roommate Finder 🤝
                      </CardTitle>
                      <CardDescription>
                        Find your perfect roommate match! Because living with the right person makes all the difference! 🏠✨
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200/50">
                        <h3 className="font-medium text-palette-darkGreen mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-palette-brightGreen" />
                          Your Roommate Preferences
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-palette-darkGreen/70">Sleep Schedule:</span>
                            <p className="font-medium text-palette-darkGreen">Night Owl 🦉</p>
                          </div>
                          <div>
                            <span className="text-palette-darkGreen/70">Cleanliness:</span>
                            <p className="font-medium text-palette-darkGreen">Very Clean</p>
                          </div>
                          <div>
                            <span className="text-palette-darkGreen/70">Budget Range:</span>
                            <p className="font-medium text-palette-darkGreen">₹8,000-12,000</p>
                          </div>
                          <div>
                            <span className="text-palette-darkGreen/70">Interests:</span>
                            <p className="font-medium text-palette-darkGreen">Gaming, Anime</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="mt-3 border-palette-darkGreen/30 text-palette-darkGreen">
                          Update Preferences
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {roommateRequests.map((roommate, index) => (
                          <motion.div
                            key={roommate.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <Card className="border-palette-beige/50 hover:border-palette-brightGreen/50 transition-all bg-white/80 dark:bg-gray-900/80">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <motion.div
                                    className="relative h-16 w-16 rounded-full bg-gradient-to-br from-palette-brightGreen to-palette-lightYellow flex items-center justify-center text-2xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                  >
                                    {roommate.emoji}
                                    <motion.div
                                      className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <span className="text-xs font-bold text-white">{roommate.compatibility}%</span>
                                    </motion.div>
                                  </motion.div>

                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="font-semibold text-palette-darkGreen text-lg">{roommate.name}</h3>
                                      <Badge className="bg-green-100 text-green-800">
                                        {roommate.compatibility}% Match
                                      </Badge>
                                    </div>

                                    <p className="text-palette-darkGreen/70 mb-3">{roommate.year}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <span className="text-xs text-palette-darkGreen/60 uppercase tracking-wide">Interests</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {roommate.interests.map((interest) => (
                                            <Badge key={interest} variant="outline" className="text-xs">
                                              {interest}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <span className="text-xs text-palette-darkGreen/60 uppercase tracking-wide">Sleep Schedule</span>
                                        <p className="text-sm text-palette-darkGreen mt-1">{roommate.sleepSchedule}</p>
                                      </div>

                                      <div>
                                        <span className="text-xs text-palette-darkGreen/60 uppercase tracking-wide">Cleanliness</span>
                                        <p className="text-sm text-palette-darkGreen mt-1">{roommate.cleanliness}</p>
                                      </div>

                                      <div>
                                        <span className="text-xs text-palette-darkGreen/60 uppercase tracking-wide">Budget</span>
                                        <p className="text-sm text-palette-darkGreen mt-1">{roommate.budget}</p>
                                      </div>
                                    </div>

                                    <div className="mb-4">
                                      <span className="text-xs text-palette-darkGreen/60 uppercase tracking-wide">Personality</span>
                                      <p className="text-sm text-palette-darkGreen/80 italic mt-1">&quot;{roommate.personality}&quot;</p>
                                    </div>

                                    <div className="flex gap-3">
                                      <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                                          Send Request
                                        </Button>
                                      </motion.div>
                                      <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Button variant="outline" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          Chat
                                        </Button>
                                      </motion.div>
                                      <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Button variant="outline" size="icon" className="border-palette-darkGreen/30 text-palette-darkGreen">
                                          <Heart className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
                      <p className="text-sm text-palette-darkGreen/70 flex items-center gap-2">
                        <Smile className="h-4 w-4 text-yellow-500" />
                        Showing 2 potential matches
                      </p>
                      <Button variant="outline" className="text-palette-darkGreen border-palette-darkGreen/30 hover:bg-palette-lightYellow/20">
                        View More Matches
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Hostel Events Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4 flex items-center gap-2">
                    <PartyPopper className="h-5 w-5 text-palette-brightGreen" />
                    Upcoming Hostel Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {hostelEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        variants={funVariants}
                        whileHover="hover"
                      >
                        <Card className="border-palette-lightYellow/50 hover:border-palette-brightGreen/50 transition-all bg-gradient-to-br from-white/80 to-palette-beige/20">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <motion.div
                                  className="text-2xl"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                >
                                  {event.emoji}
                                </motion.div>
                                <div>
                                  <CardTitle className="text-palette-darkGreen text-lg">{event.title}</CardTitle>
                                  <CardDescription className="italic">&quot;{event.vibe}&quot;</CardDescription>
                                </div>
                              </div>
                              <Badge className={
                                event.type === "gaming" ? "bg-purple-100 text-purple-800" :
                                event.type === "entertainment" ? "bg-pink-100 text-pink-800" :
                                "bg-blue-100 text-blue-800"
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
                            <div className="flex items-center gap-2 text-palette-darkGreen/70">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">{event.participants}/{event.maxParticipants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-palette-darkGreen/70">
                              <Star className="h-4 w-4" />
                              <span className="text-sm font-medium">Prize: {event.prize}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                              disabled={event.participants >= event.maxParticipants}
                            >
                              {event.participants >= event.maxParticipants ? "Event Full" : "Join Event"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </main>

          {/* Footer */}
          <footer className="py-6 px-4 md:px-6 border-t border-palette-lightYellow/50 bg-gradient-to-r from-palette-beige/20 to-palette-lightYellow/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-palette-darkGreen/70 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-palette-brightGreen" />
                © 2025 Ignisia Hostel Life Central - Making hostel life awesome! 🏠
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
