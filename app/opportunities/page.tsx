"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Briefcase, GraduationCap, Calendar, Clock, MapPin, Building, Filter, ExternalLink, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample data for internships
const internships = [
  {
    id: 1,
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    location: "Bangalore (Remote)",
    duration: "3 months",
    stipend: "₹15,000/month",
    deadline: "April 30, 2025",
    description: "Work on real-world projects using React, Node.js, and MongoDB. Gain experience in full-stack development and agile methodologies.",
    requirements: ["Proficiency in JavaScript", "Basic knowledge of React", "Good problem-solving skills"],
    postedBy: "Campus Placement Cell",
    postedDate: "2 days ago",
    logo: "/placeholder.svg?height=100&width=100&text=TC",
    featured: true,
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "BrandWave Digital",
    location: "Mumbai (Hybrid)",
    duration: "2 months",
    stipend: "₹10,000/month",
    deadline: "April 25, 2025",
    description: "Assist in creating marketing campaigns, social media management, and market research. Learn digital marketing strategies and tools.",
    requirements: ["Creative mindset", "Basic understanding of social media platforms", "Good communication skills"],
    postedBy: "Prof. Sharma (Marketing Dept.)",
    postedDate: "3 days ago",
    logo: "/placeholder.svg?height=100&width=100&text=BW",
    featured: false,
  },
  {
    id: 3,
    title: "Mechanical Design Intern",
    company: "AutoTech Industries",
    location: "Pune (On-site)",
    duration: "6 months",
    stipend: "₹20,000/month",
    deadline: "May 5, 2025",
    description: "Work on CAD designs for automotive components. Assist in prototyping and testing of mechanical systems.",
    requirements: ["Proficiency in AutoCAD or SolidWorks", "Knowledge of mechanical principles", "Attention to detail"],
    postedBy: "Alumni Network",
    postedDate: "1 week ago",
    logo: "/placeholder.svg?height=100&width=100&text=AT",
    featured: true,
  },
  {
    id: 4,
    title: "Data Analysis Intern",
    company: "FinSmart Analytics",
    location: "Delhi (Remote)",
    duration: "4 months",
    stipend: "₹18,000/month",
    deadline: "April 28, 2025",
    description: "Analyze financial data, create visualizations, and assist in building predictive models. Learn data science tools and techniques.",
    requirements: ["Knowledge of Python or R", "Basic understanding of statistics", "Familiarity with data visualization"],
    postedBy: "Dr. Verma (CS Department)",
    postedDate: "5 days ago",
    logo: "/placeholder.svg?height=100&width=100&text=FS",
    featured: false,
  },
]

// Sample data for scholarships
const scholarships = [
  {
    id: 1,
    title: "Merit Scholarship for Engineering Students",
    provider: "Tech Foundation India",
    amount: "₹50,000",
    deadline: "May 15, 2025",
    eligibility: ["Minimum CGPA of 8.5", "2nd or 3rd year students", "Engineering disciplines"],
    description: "Scholarship for outstanding engineering students demonstrating academic excellence and innovation.",
    applicationProcess: "Online application with academic records and a personal statement.",
    postedBy: "Scholarship Cell",
    postedDate: "1 week ago",
    logo: "/placeholder.svg?height=100&width=100&text=TF",
  },
  {
    id: 2,
    title: "Women in STEM Scholarship",
    provider: "WomenTech Association",
    amount: "₹75,000",
    deadline: "April 30, 2025",
    eligibility: ["Female students", "STEM disciplines", "Minimum CGPA of 7.5"],
    description: "Supporting women pursuing education in Science, Technology, Engineering, and Mathematics fields.",
    applicationProcess: "Online application with academic records, recommendation letter, and essay on career goals.",
    postedBy: "Gender Diversity Cell",
    postedDate: "3 days ago",
    logo: "/placeholder.svg?height=100&width=100&text=WT",
  },
  {
    id: 3,
    title: "Research Grant for Undergraduate Projects",
    provider: "National Science Foundation",
    amount: "₹25,000",
    deadline: "May 10, 2025",
    eligibility: ["Undergraduate students", "Research project proposal", "Faculty recommendation"],
    description: "Funding for innovative undergraduate research projects across all disciplines.",
    applicationProcess: "Submit research proposal, budget plan, and faculty recommendation letter.",
    postedBy: "Research Department",
    postedDate: "2 weeks ago",
    logo: "/placeholder.svg?height=100&width=100&text=NSF",
  },
]

// Sample data for workshops
const workshops = [
  {
    id: 1,
    title: "Resume Building Workshop",
    organizer: "Career Development Cell",
    date: "April 20, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Seminar Hall A",
    description: "Learn how to create an impactful resume that stands out to recruiters. Includes personalized feedback session.",
    speaker: "Ms. Priya Sharma, HR Manager at Google India",
    registration: "Free for all students. Pre-registration required.",
    postedBy: "Career Development Cell",
    postedDate: "1 week ago",
    image: "/placeholder.svg?height=200&width=300&text=Resume+Workshop",
  },
  {
    id: 2,
    title: "Technical Interview Preparation",
    organizer: "Computer Science Department",
    date: "April 25, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "CS Lab 3",
    description: "Hands-on workshop covering common technical interview questions, coding challenges, and problem-solving strategies.",
    speaker: "Mr. Rahul Verma, Senior Software Engineer at Microsoft",
    registration: "Open to CS and IT students. Limited seats available.",
    postedBy: "Dr. Kumar (CS Department)",
    postedDate: "3 days ago",
    image: "/placeholder.svg?height=200&width=300&text=Tech+Interview",
  },
  {
    id: 3,
    title: "Entrepreneurship Bootcamp",
    organizer: "E-Cell",
    date: "May 1-2, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Business School Auditorium",
    description: "Two-day intensive bootcamp covering business model creation, pitching, funding, and startup essentials.",
    speaker: "Various industry experts and successful entrepreneurs",
    registration: "₹500 registration fee. Early bird discount available until April 15.",
    postedBy: "Entrepreneurship Cell",
    postedDate: "5 days ago",
    image: "/placeholder.svg?height=200&width=300&text=Entrepreneurship",
  },
]

// Sample data for alumni mentors
const alumniMentors = [
  {
    id: 1,
    name: "Rahul Verma",
    position: "Software Engineer",
    company: "Google",
    batch: "2020",
    expertise: ["Web Development", "System Design", "Interview Preparation"],
    availability: "Weekends",
    image: "/placeholder.svg?height=100&width=100&text=RV",
    bio: "Working at Google for 3 years. Passionate about helping students prepare for tech interviews and career guidance.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Product Manager",
    company: "Amazon",
    batch: "2019",
    expertise: ["Product Management", "UX Design", "Career Transitions"],
    availability: "Wednesday evenings",
    image: "/placeholder.svg?height=100&width=100&text=PS",
    bio: "Transitioned from engineering to product management. Can help with career pivots and building product thinking.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    position: "Founder & CEO",
    company: "TechStart",
    batch: "2018",
    expertise: ["Entrepreneurship", "Fundraising", "Business Strategy"],
    availability: "Monthly webinars",
    image: "/placeholder.svg?height=100&width=100&text=AK",
    bio: "Founded a successful startup after graduation. Passionate about fostering entrepreneurial mindset in students.",
  },
  {
    id: 4,
    name: "Neha Singh",
    position: "Data Scientist",
    company: "Microsoft",
    batch: "2021",
    expertise: ["Machine Learning", "Data Analysis", "Python"],
    availability: "Bi-weekly sessions",
    image: "/placeholder.svg?height=100&width=100&text=NS",
    bio: "Working on AI projects at Microsoft. Can guide students interested in data science and machine learning careers.",
  },
]

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState("internships")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLocation, setFilterLocation] = useState<string | null>(null)
  const [filterDuration, setFilterDuration] = useState<string | null>(null)

  // Extract unique locations from internships
  const locations = Array.from(new Set(internships.map(internship => {
    const locationPart = internship.location.split(" ")[0]
    return locationPart
  })))

  // Extract unique durations from internships
  const durations = Array.from(new Set(internships.map(internship => internship.duration)))

  // Filter internships based on search query and filters
  const filteredInternships = internships.filter(internship => {
    let matchesSearch = true
    let matchesLocation = true
    let matchesDuration = true

    if (searchQuery) {
      matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     internship.description.toLowerCase().includes(searchQuery.toLowerCase())
    }

    if (filterLocation) {
      matchesLocation = internship.location.includes(filterLocation)
    }

    if (filterDuration) {
      matchesDuration = internship.duration === filterDuration
    }

    return matchesSearch && matchesLocation && matchesDuration
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
              <Badge className="inline-flex bg-palette-brightGreen text-palette-darkGreen">Opportunities Hub</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen">
                Discover Your Path to Success
              </h1>
              <p className="max-w-[600px] text-palette-darkGreen/80 md:text-xl">
                Find internships, scholarships, workshops, and connect with alumni to advance your academic and professional journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="group bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                <span className="flex items-center">
                  Browse Opportunities
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
                Post Opportunity
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-palette-beige"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=500&text=Opportunities')] mix-blend-overlay opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-palette-darkGreen">
              <h2 className="text-2xl font-bold mb-2">Career Growth</h2>
              <p className="text-palette-darkGreen/90">Your gateway to professional development</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content with Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="internships" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-palette-darkGreen">Explore Opportunities</h2>
              <TabsList className="bg-palette-beige">
                <TabsTrigger
                  value="internships"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Internships</span>
                </TabsTrigger>
                <TabsTrigger
                  value="scholarships"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Scholarships</span>
                </TabsTrigger>
                <TabsTrigger
                  value="workshops"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Workshops</span>
                </TabsTrigger>
                <TabsTrigger
                  value="alumni"
                  className="flex items-center gap-1 data-[state=active]:bg-palette-beige data-[state=active]:text-palette-darkGreen"
                >
                  <Users className="h-4 w-4" />
                  <span>Alumni Mentors</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Internships Tab */}
            <TabsContent value="internships" className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input 
                    placeholder="Search internships by title, company, or keywords..." 
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
                <span className="text-sm text-palette-darkGreen/70 flex items-center mr-2">Location:</span>
                <Badge 
                  variant={filterLocation === null ? "default" : "outline"}
                  className={`cursor-pointer ${filterLocation === null ? "bg-palette-brightGreen text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                  onClick={() => setFilterLocation(null)}
                >
                  All
                </Badge>
                {locations.map((location) => (
                  <Badge 
                    key={location} 
                    variant={filterLocation === location ? "default" : "outline"}
                    className={`cursor-pointer ${filterLocation === location ? "bg-palette-brightGreen text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                    onClick={() => setFilterLocation(filterLocation === location ? null : location)}
                  >
                    {location}
                  </Badge>
                ))}
                <div className="border-l border-palette-darkGreen/20 mx-2"></div>
                <span className="text-sm text-palette-darkGreen/70 flex items-center mr-2">Duration:</span>
                <Badge 
                  variant={filterDuration === null ? "default" : "outline"}
                  className={`cursor-pointer ${filterDuration === null ? "bg-palette-brightGreen text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                  onClick={() => setFilterDuration(null)}
                >
                  All
                </Badge>
                {durations.map((duration) => (
                  <Badge 
                    key={duration} 
                    variant={filterDuration === duration ? "default" : "outline"}
                    className={`cursor-pointer ${filterDuration === duration ? "bg-palette-brightGreen text-palette-darkGreen" : "border-palette-darkGreen text-palette-darkGreen"}`}
                    onClick={() => setFilterDuration(filterDuration === duration ? null : duration)}
                  >
                    {duration}
                  </Badge>
                ))}
              </div>

              {/* Internship listings */}
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {filteredInternships.map((internship) => (
                  <motion.div key={internship.id} variants={itemVariants}>
                    <Card className={`overflow-hidden border-l-4 ${
                      internship.featured ? "border-l-palette-brightGreen" : "border-l-palette-beige"
                    } hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={internship.logo}
                                alt={internship.company}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow space-y-4">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                                <h3 className="text-xl font-semibold text-palette-darkGreen">{internship.title}</h3>
                                {internship.featured && (
                                  <Badge className="bg-palette-brightGreen text-palette-darkGreen self-start sm:self-auto">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Building className="h-4 w-4" />
                                <span>{internship.company}</span>
                              </div>
                            </div>
                            
                            <p className="text-palette-darkGreen/80">{internship.description}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <MapPin className="h-4 w-4" />
                                <span>{internship.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Clock className="h-4 w-4" />
                                <span>{internship.duration}</span>
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <span className="font-medium text-palette-brightGreen">{internship.stipend}</span>
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Calendar className="h-4 w-4" />
                                <span>Deadline: {internship.deadline}</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-palette-darkGreen mb-1">Requirements:</p>
                              <ul className="list-disc list-inside text-sm text-palette-darkGreen/80 space-y-1">
                                {internship.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                              <div className="text-xs text-palette-darkGreen/60">
                                <p>Posted by {internship.postedBy} • {internship.postedDate}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-palette-darkGreen text-palette-darkGreen">
                                  Save
                                </Button>
                                <Button size="sm" className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Scholarships Tab */}
            <TabsContent value="scholarships" className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-palette-darkGreen">Available Scholarships</h3>
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input placeholder="Search scholarships..." className="pl-9 border-palette-beige" />
                </div>
              </div>

              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {scholarships.map((scholarship) => (
                  <motion.div key={scholarship.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow border-palette-beige">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={scholarship.logo}
                                alt={scholarship.provider}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow space-y-4">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                                <h3 className="text-xl font-semibold text-palette-darkGreen">{scholarship.title}</h3>
                                <Badge className="bg-palette-brightGreen text-palette-darkGreen self-start sm:self-auto">
                                  {scholarship.amount}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Building className="h-4 w-4" />
                                <span>{scholarship.provider}</span>
                              </div>
                            </div>
                            
                            <p className="text-palette-darkGreen/80">{scholarship.description}</p>
                            
                            <div>
                              <p className="text-sm font-medium text-palette-darkGreen mb-1">Eligibility:</p>
                              <ul className="list-disc list-inside text-sm text-palette-darkGreen/80 space-y-1">
                                {scholarship.eligibility.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-1 text-palette-darkGreen/70">
                                <Calendar className="h-4 w-4" />
                                <span>Application Deadline: {scholarship.deadline}</span>
                              </div>
                              <p className="text-sm text-palette-darkGreen/80">
                                <span className="font-medium">Application Process:</span> {scholarship.applicationProcess}
                              </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                              <div className="text-xs text-palette-darkGreen/60">
                                <p>Posted by {scholarship.postedBy} • {scholarship.postedDate}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-palette-darkGreen text-palette-darkGreen">
                                  Save
                                </Button>
                                <Button size="sm" className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Workshops Tab */}
            <TabsContent value="workshops" className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-palette-darkGreen">Upcoming Workshops & Events</h3>
                <Button className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
                  Submit Workshop
                </Button>
              </div>

              <motion.div
                className="grid gap-6 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {workshops.map((workshop) => (
                  <motion.div key={workshop.id} variants={itemVariants}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-palette-beige">
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={workshop.image}
                          alt={workshop.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-palette-darkGreen/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium">{workshop.organizer}</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-palette-darkGreen mb-2">{workshop.title}</h3>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-palette-darkGreen/70">
                            <Calendar className="h-4 w-4" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-palette-darkGreen/70">
                            <Clock className="h-4 w-4" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-palette-darkGreen/70">
                            <MapPin className="h-4 w-4" />
                            <span>{workshop.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-palette-darkGreen/80 mb-3">{workshop.description}</p>
                        <div className="text-sm text-palette-darkGreen/80 mb-2">
                          <span className="font-medium">Speaker:</span> {workshop.speaker}
                        </div>
                        <div className="text-sm text-palette-darkGreen/80">
                          <span className="font-medium">Registration:</span> {workshop.registration}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                        >
                          Register Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Alumni Mentors Tab */}
            <TabsContent value="alumni" className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-palette-darkGreen">Connect with Alumni Mentors</h3>
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-palette-darkGreen/70" />
                  <Input placeholder="Search by expertise..." className="pl-9 border-palette-beige" />
                </div>
              </div>
              
              <p className="text-palette-darkGreen/80">
                Our alumni are eager to help you navigate your academic and professional journey. Connect with them for mentorship, career advice, and industry insights.
              </p>

              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {alumniMentors.map((mentor) => (
                  <motion.div key={mentor.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow border-palette-beige h-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center mb-4">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                            <Image
                              src={mentor.image}
                              alt={mentor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-palette-darkGreen">{mentor.name}</h3>
                          <p className="text-sm text-palette-darkGreen/70">{mentor.position} at {mentor.company}</p>
                          <Badge className="mt-2 bg-palette-brightGreen text-palette-darkGreen">
                            Class of {mentor.batch}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-palette-darkGreen/80 mb-4">{mentor.bio}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-palette-darkGreen mb-1">Expertise:</p>
                            <div className="flex flex-wrap gap-1">
                              {mentor.expertise.map((skill, index) => (
                                <Badge key={index} variant="outline" className="border-palette-darkGreen text-palette-darkGreen">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-palette-darkGreen mb-1">Availability:</p>
                            <p className="text-sm text-palette-darkGreen/80">{mentor.availability}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                        >
                          Request Mentorship
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Success Stories Section */}
        <motion.div
          className="mt-24 p-8 rounded-xl bg-palette-beige/30 border border-palette-beige"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-palette-darkGreen">Alumni Success Stories</h2>
            <p className="text-palette-darkGreen/80 max-w-[700px] mx-auto">
              See how our alumni leveraged campus opportunities to launch successful careers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100&text=RV"
                    alt="Rahul Verma"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-palette-darkGreen">Rahul Verma</h3>
                  <p className="text-sm text-palette-darkGreen/70">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-palette-darkGreen/80 mb-4">
                &ldquo;The internship opportunity I found through our college platform led to my first job at a startup, which eventually helped me land my dream role at Google.&rdquo;
              </p>
              <Badge className="bg-palette-brightGreen text-palette-darkGreen">
                Class of 2022
              </Badge>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100&text=NS"
                    alt="Neha Singh"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-palette-darkGreen">Neha Singh</h3>
                  <p className="text-sm text-palette-darkGreen/70">Product Manager at Amazon</p>
                </div>
              </div>
              <p className="text-palette-darkGreen/80 mb-4">
                &ldquo;The scholarship I received helped me focus on my studies without financial stress. The leadership workshops prepared me for my current role managing product teams.&rdquo;
              </p>
              <Badge className="bg-palette-brightGreen text-palette-darkGreen">
                Class of 2021
              </Badge>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100&text=AK"
                    alt="Amit Kumar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-palette-darkGreen">Amit Kumar</h3>
                  <p className="text-sm text-palette-darkGreen/70">Founder & CEO, TechStart</p>
                </div>
              </div>
              <p className="text-palette-darkGreen/80 mb-4">
                &ldquo;The entrepreneurship workshops and networking events gave me the confidence and connections to start my own company right after graduation.&rdquo;
              </p>
              <Badge className="bg-palette-brightGreen text-palette-darkGreen">
                Class of 2020
              </Badge>
            </div>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
            >
              <span className="flex items-center gap-1">
                Share Your Success Story <ExternalLink className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}