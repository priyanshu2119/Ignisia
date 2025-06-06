"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search, ShoppingBag, Pizza, Bell, MessageCircle, Clock, MapPin, User, Filter, Heart, MessageSquare, Share2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Sample data for food delivery requests
const foodRequests = [
  {
    id: 1,
    user: {
      name: "Rahul Sharma",
      hostel: "Boys Hostel Block A",
      room: "A-204",
      avatar: "/placeholder.svg?height=40&width=40&text=RS",
    },
    restaurant: "Domino's Pizza",
    items: ["1x Medium Cheese Pizza", "1x Garlic Breadsticks"],
    totalAmount: "₹450",
    deliveryTime: "30-40 mins",
    notes: "Looking for someone to share delivery charges. Will split 50-50.",
    postedTime: "10 minutes ago",
    status: "Open",
    contributors: [
      {
        name: "Amit Kumar",
        avatar: "/placeholder.svg?height=30&width=30&text=AK",
      }
    ],
  },
  {
    id: 2,
    user: {
      name: "Priya Patel",
      hostel: "Girls Hostel Block C",
      room: "C-118",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
    },
    restaurant: "Subway",
    items: ["1x Veggie Delite Sub", "1x Chocolate Chip Cookie"],
    totalAmount: "₹320",
    deliveryTime: "25-35 mins",
    notes: "Can add more items if anyone wants to join.",
    postedTime: "25 minutes ago",
    status: "Open",
    contributors: [],
  },
  {
    id: 3,
    user: {
      name: "Vikram Singh",
      hostel: "Boys Hostel Block B",
      room: "B-312",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
    },
    restaurant: "McDonald's",
    items: ["2x McAloo Tikki Burger", "1x Medium Fries", "1x Coke"],
    totalAmount: "₹380",
    deliveryTime: "20-30 mins",
    notes: "Order about to be placed. Last chance to join!",
    postedTime: "5 minutes ago",
    status: "Urgent",
    contributors: [
      {
        name: "Neha Gupta",
        avatar: "/placeholder.svg?height=30&width=30&text=NG",
      },
      {
        name: "Raj Malhotra",
        avatar: "/placeholder.svg?height=30&width=30&text=RM",
      }
    ],
  },
]

// Sample data for marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "Engineering Drawing Kit",
    price: "₹350",
    condition: "Like New",
    description: "Complete engineering drawing kit with compass, divider, set squares, and more. Used for one semester only.",
    images: ["/placeholder.svg?height=200&width=300&text=Drawing+Kit"],
    seller: {
      name: "Arjun Mehta",
      hostel: "Boys Hostel Block A",
      room: "A-118",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
    },
    postedTime: "2 days ago",
    category: "Academic",
  },
  {
    id: 2,
    title: "Desk Lamp",
    price: "₹200",
    condition: "Good",
    description: "Adjustable LED desk lamp with 3 brightness levels. Works perfectly, selling because I'm upgrading.",
    images: ["/placeholder.svg?height=200&width=300&text=Desk+Lamp"],
    seller: {
      name: "Sneha Reddy",
      hostel: "Girls Hostel Block B",
      room: "B-225",
      avatar: "/placeholder.svg?height=40&width=40&text=SR",
    },
    postedTime: "1 day ago",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms Book",
    price: "₹280",
    condition: "Good",
    description: "Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein. Third edition. Some highlighting and notes inside.",
    images: ["/placeholder.svg?height=200&width=300&text=DSA+Book"],
    seller: {
      name: "Karan Joshi",
      hostel: "Boys Hostel Block C",
      room: "C-304",
      avatar: "/placeholder.svg?height=40&width=40&text=KJ",
    },
    postedTime: "3 days ago",
    category: "Books",
  },
  {
    id: 4,
    title: "Badminton Racket",
    price: "₹400",
    condition: "Like New",
    description: "Yonex badminton racket with cover. Used only a few times. Selling because I'm switching to tennis.",
    images: ["/placeholder.svg?height=200&width=300&text=Badminton+Racket"],
    seller: {
      name: "Divya Sharma",
      hostel: "Girls Hostel Block A",
      room: "A-112",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
    },
    postedTime: "12 hours ago",
    category: "Sports",
  },
]

// Sample data for announcements
const announcements = [
  {
    id: 1,
    title: "Water Outage Notice",
    content: "There will be a scheduled water outage in Block B on Saturday (15th April) from 10 AM to 2 PM due to maintenance work. Please store water accordingly.",
    postedBy: {
      name: "Hostel Maintenance Committee",
      avatar: "/placeholder.svg?height=40&width=40&text=HMC",
    },
    postedTime: "1 day ago",
    priority: "High",
    affectedBlocks: ["Block B"],
    comments: 12,
  },
  {
    id: 2,
    title: "Hostel Night Planning Meeting",
    content: "All interested students are invited to join the planning committee for this year's Hostel Night. Meeting will be held in the common room on Friday at 6 PM.",
    postedBy: {
      name: "Cultural Committee",
      avatar: "/placeholder.svg?height=40&width=40&text=CC",
    },
    postedTime: "2 days ago",
    priority: "Medium",
    affectedBlocks: ["All Blocks"],
    comments: 8,
  },
  {
    id: 3,
    title: "New Laundry Service Available",
    content: "A new laundry service has partnered with our hostel. Special discounted rates for hostel residents. Contact details and price list available at the hostel office.",
    postedBy: {
      name: "Hostel Administration",
      avatar: "/placeholder.svg?height=40&width=40&text=HA",
    },
    postedTime: "3 days ago",
    priority: "Low",
    affectedBlocks: ["All Blocks"],
    comments: 5,
  },
]

// Sample data for community posts
const communityPosts = [
  {
    id: 1,
    content: "Anyone interested in forming a study group for the upcoming Data Structures exam? Planning to meet daily from 7-9 PM in the common room.",
    postedBy: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=RS",
      hostel: "Boys Hostel Block A",
    },
    postedTime: "3 hours ago",
    likes: 15,
    comments: [
      {
        user: {
          name: "Priya Patel",
          avatar: "/placeholder.svg?height=30&width=30&text=PP",
        },
        content: "I'm interested! Count me in.",
        time: "2 hours ago",
      },
      {
        user: {
          name: "Amit Kumar",
          avatar: "/placeholder.svg?height=30&width=30&text=AK",
        },
        content: "What time are you planning to meet?",
        time: "1 hour ago",
      },
    ],
  },
  {
    id: 2,
    content: "Lost my blue notebook with Operating Systems notes near the hostel canteen. If anyone finds it, please contact me at Room G-205. Really need it for the upcoming exam!",
    postedBy: {
      name: "Neha Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=NG",
      hostel: "Girls Hostel Block B",
    },
    postedTime: "5 hours ago",
    likes: 8,
    comments: [
      {
        user: {
          name: "Vikram Singh",
          avatar: "/placeholder.svg?height=30&width=30&text=VS",
        },
        content: "I think I saw a blue notebook in the library. Will check and let you know.",
        time: "4 hours ago",
      },
    ],
  },
  {
    id: 3,
    content: "The hostel wifi is extremely slow today. Anyone else facing the same issue? Any temporary alternatives for completing assignments?",
    postedBy: {
      name: "Karan Joshi",
      avatar: "/placeholder.svg?height=40&width=40&text=KJ",
      hostel: "Boys Hostel Block C",
    },
    postedTime: "1 day ago",
    likes: 32,
    comments: [
      {
        user: {
          name: "Sneha Reddy",
          avatar: "/placeholder.svg?height=30&width=30&text=SR",
        },
        content: "Yes, it's been terrible since morning. I'm using my mobile hotspot as backup.",
        time: "23 hours ago",
      },
      {
        user: {
          name: "Arjun Mehta",
          avatar: "/placeholder.svg?height=30&width=30&text=AM",
        },
        content: "The library has decent wifi if you can go there.",
        time: "22 hours ago",
      },
      {
        user: {
          name: "Divya Sharma",
          avatar: "/placeholder.svg?height=30&width=30&text=DS",
        },
        content: "I called the IT helpdesk. They said they're working on it and should be fixed by evening.",
        time: "20 hours ago",
      },
    ],
  },
]

export default function HostelConnectPage() {
  const [activeTab, setActiveTab] = useState("food-delivery")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")

  // Extract unique categories from marketplace items
  const categories = Array.from(new Set(marketplaceItems.map(item => item.category)))

  // Filter marketplace items based on search query and category filter
  const filteredMarketplaceItems = marketplaceItems.filter(item => {
    let matchesSearch = true
    let matchesCategory = true

    if (searchQuery) {
      matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     item.description.toLowerCase().includes(searchQuery.toLowerCase())
    }

    if (filterCategory) {
      matchesCategory = item.category === filterCategory
    }

    return matchesSearch && matchesCategory
  })

  // Animation variants
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
      {/* Header */}
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
        {/* Hero Section */}
        <motion.div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="inline-flex bg-palette-lightYellow text-palette-darkGreen">Hostel Connect</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Making Hostel Life Easier
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Connect with fellow hostelers for food delivery, buy/sell items, announcements, and community discussions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                <span className="flex items-center">
                  Join Community
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
                Create Post
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-beige"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Hostel+Life')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Hostel Community</h2>
              <p className="text-palette-darkGreen/90">Your home away from home</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content with Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="food-delivery" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-palette-darkGreen">Hostel Services</h2>
              <TabsList className="bg-palette-beige">
                <TabsTrigger
                  value="food-delivery"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Pizza className="h-4 w-4" />
                  <span>Food Delivery</span>
                </TabsTrigger>
                <TabsTrigger
                  value="marketplace"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Marketplace</span>
                </TabsTrigger>
                <TabsTrigger
                  value="announcements"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Bell className="h-4 w-4" />
                  <span>Announcements</span>
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Community</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Food Delivery Tab */}
            <TabsContent value="food-delivery" className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-palette-darkGreen">Active Food Delivery Requests</h3>
                  <p className="text-palette-darkGreen/70">Join existing orders or create your own to save on delivery fees</p>
                </div>
                <Button className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                  <Pizza className="h-4 w-4 mr-2" /> Create Food Request
                </Button>
              </div>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {foodRequests.map((request) => (
                  <motion.div key={request.id} variants={itemVariants}>
                    <Card className={`overflow-hidden border-l-4 ${
                      request.status === "Urgent" ? "border-l-red-500" : "border-l-palette-lightYellow"
                    } hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={request.user.avatar} alt={request.user.name} />
                                <AvatarFallback>{request.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-palette-darkGreen">{request.user.name}</h4>
                                <p className="text-sm text-palette-darkGreen/70">{request.user.hostel} • Room {request.user.room}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge className={`${
                                request.status === "Urgent" ? "bg-red-500" : "bg-palette-lightYellow text-palette-darkGreen"
                              }`}>
                                {request.status}
                              </Badge>
                              <p className="text-xs text-palette-darkGreen/60 ml-3">{request.postedTime}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-palette-darkGreen">{request.restaurant}</h4>
                              <ul className="mt-1 space-y-1">
                                {request.items.map((item, index) => (
                                  <li key={index} className="text-sm text-palette-darkGreen/80">• {item}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <span className="font-medium text-palette-darkGreen">Total: {request.totalAmount}</span>
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Clock className="h-4 w-4" />
                                <span>Delivery: {request.deliveryTime}</span>
                              </div>
                            </div>
                            
                            {request.notes && (
                              <div className="bg-palette-beige/30 p-3 rounded-md text-sm text-palette-darkGreen/80">
                                <p className="italic">"{request.notes}"</p>
                              </div>
                            )}
                            
                            {request.contributors.length > 0 && (
                              <div>
                                <p className="text-sm text-palette-darkGreen/70 mb-1">People who joined:</p>
                                <div className="flex -space-x-2">
                                  {request.contributors.map((contributor, index) => (
                                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                                      <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" size="sm" className="border-palette-darkGreen text-palette-darkGreen">
                              Message
                            </Button>
                            <Button size="sm" className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                              Join Order
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Marketplace Tab */}
            <TabsContent value="marketplace" className="space-y-8">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-palette-darkGreen">Hostel Marketplace</h3>
                  <p className="text-palette-darkGreen/70">Buy and sell items within the hostel community</p>
                </div>
                <Button className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                  <ShoppingBag className="h-4 w-4 mr-2" /> List an Item
                </Button>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input 
                    placeholder="Search items..." 
                    className="pl-9 border-palette-beige" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-palette-darkGreen text-palette-darkGreen"
                  >
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </Button>
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-palette-darkGreen/70 flex items-center mr-2">Category:</span>
                <Badge 
                  variant={filterCategory === null ? "default" : "outline"}
                  className={`cursor-pointer ${filterCategory === null ? "bg-palette-lightYellow text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                  onClick={() => setFilterCategory(null)}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant={filterCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${filterCategory === category ? "bg-palette-lightYellow text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                    onClick={() => setFilterCategory(filterCategory === category ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {filteredMarketplaceItems.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-palette-lightYellow text-palette-darkGreen">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-palette-darkGreen">{item.title}</h4>
                          <span className="font-bold text-palette-darkGreen">{item.price}</span>
                        </div>
                        <Badge variant="outline" className="mb-2 border-palette-darkGreen text-palette-darkGreen">
                          {item.condition}
                        </Badge>
                        <p className="text-sm text-palette-darkGreen/80 mb-4 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.seller.avatar} alt={item.seller.name} />
                              <AvatarFallback>{item.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-palette-darkGreen/70">{item.seller.name}</span>
                          </div>
                          <span className="text-xs text-palette-darkGreen/60">{item.postedTime}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90"
                        >
                          Contact Seller
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-palette-darkGreen">Hostel Announcements</h3>
                  <p className="text-palette-darkGreen/70">Important updates and information for hostel residents</p>
                </div>
                <Button className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                  <Bell className="h-4 w-4 mr-2" /> Post Announcement
                </Button>
              </div>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {announcements.map((announcement) => (
                  <motion.div key={announcement.id} variants={itemVariants}>
                    <Card className={`overflow-hidden border-l-4 ${
                      announcement.priority === "High" ? "border-l-red-500" : 
                      announcement.priority === "Medium" ? "border-l-amber-500" : 
                      "border-l-palette-lightYellow"
                    } hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={announcement.postedBy.avatar} alt={announcement.postedBy.name} />
                                <AvatarFallback>{announcement.postedBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-palette-darkGreen">{announcement.title}</h4>
                                <p className="text-sm text-palette-darkGreen/70">By {announcement.postedBy.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge className={`${
                                announcement.priority === "High" ? "bg-red-500" : 
                                announcement.priority === "Medium" ? "bg-amber-500" : 
                                "bg-palette-lightYellow text-palette-darkGreen"
                              }`}>
                                {announcement.priority} Priority
                              </Badge>
                              <p className="text-xs text-palette-darkGreen/60 ml-3">{announcement.postedTime}</p>
                            </div>
                          </div>
                          
                          <p className="text-palette-darkGreen/80">{announcement.content}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {announcement.affectedBlocks.map((block, index) => (
                              <Badge key={index} variant="outline" className="border-palette-darkGreen text-palette-darkGreen">
                                {block}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center gap-1 text-palette-darkGreen/70">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm">{announcement.comments} comments</span>
                            </div>
                            <Button size="sm" className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-palette-darkGreen">Community Discussion</h3>
                  <p className="text-palette-darkGreen/70">Connect with fellow hostelers, ask questions, and share updates</p>
                </div>
                <Button className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                  <MessageCircle className="h-4 w-4 mr-2" /> Create Post
                </Button>
              </div>

              <Card className="border-palette-beige">
                <CardContent className="p-4 pt-6">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" alt="Your Avatar" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="What's on your mind? Share with the hostel community..." 
                        className="resize-none border-palette-beige"
                      />
                      <div className="flex justify-end mt-2">
                        <Button className="bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90">
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {communityPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow border-palette-beige">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={post.postedBy.avatar} alt={post.postedBy.name} />
                              <AvatarFallback>{post.postedBy.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-palette-darkGreen">{post.postedBy.name}</h4>
                              <p className="text-xs text-palette-darkGreen/70">{post.postedBy.hostel} • {post.postedTime}</p>
                            </div>
                          </div>
                          
                          <p className="text-palette-darkGreen/80">{post.content}</p>
                          
                          <div className="flex items-center gap-4 pt-2">
                            <Button variant="ghost" size="sm" className="text-palette-darkGreen/70 hover:text-palette-darkGreen hover:bg-palette-beige/30">
                              <Heart className="h-4 w-4 mr-1" /> {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-palette-darkGreen/70 hover:text-palette-darkGreen hover:bg-palette-beige/30">
                              <MessageSquare className="h-4 w-4 mr-1" /> {post.comments.length}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-palette-darkGreen/70 hover:text-palette-darkGreen hover:bg-palette-beige/30">
                              <Share2 className="h-4 w-4 mr-1" /> Share
                            </Button>
                          </div>
                          
                          {post.comments.length > 0 && (
                            <div className="space-y-3 pt-2">
                              <Separator className="bg-palette-beige/50" />
                              {post.comments.map((comment, index) => (
                                <div key={index} className="flex gap-3">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                    <AvatarFallback>{comment.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-palette-beige/30 p-2 rounded-md">
                                      <p className="text-sm font-medium text-palette-darkGreen">{comment.user.name}</p>
                                      <p className="text-sm text-palette-darkGreen/80">{comment.content}</p>
                                    </div>
                                    <p className="text-xs text-palette-darkGreen/60 mt-1">{comment.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex gap-3 pt-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=30&width=30&text=You" alt="Your Avatar" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Input 
                                placeholder="Write a comment..." 
                                className="border-palette-beige"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Guidelines Section */}
        <motion.div
          className="mt-24 p-8 rounded-xl bg-palette-beige/30 border border-palette-beige"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-palette-darkGreen">Hostel Connect Guidelines</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              To ensure a positive and helpful community, please follow these guidelines when using Hostel Connect.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-palette-darkGreen text-lg mb-3">Food Delivery</h3>
              <ul className="space-y-2 text-palette-darkGreen/80">
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Be clear about your order details and delivery time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Honor your commitments when joining someone's order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Split costs fairly as agreed upon</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Respect hostel rules regarding food delivery timings</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-palette-darkGreen text-lg mb-3">Marketplace</h3>
              <ul className="space-y-2 text-palette-darkGreen/80">
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Be honest about the condition of items you're selling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Price items reasonably and fairly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Meet in public hostel areas for exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Report any suspicious listings or behavior</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-palette-darkGreen text-lg mb-3">Community</h3>
              <ul className="space-y-2 text-palette-darkGreen/80">
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Be respectful and kind in all interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Avoid sharing sensitive personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Help maintain a positive and supportive environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-lightYellow">•</span>
                  <span>Report any harassment or inappropriate content</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}