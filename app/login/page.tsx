"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Home, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [userType, setUserType] = useState("day-scholar")

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

      <main className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
        <div className="w-full max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-palette-darkGreen mb-4">
              Welcome to Ignisia
            </h1>
            <p className="text-palette-darkGreen/80 md:text-xl max-w-[700px] mx-auto">
              Your personalized college experience starts here
            </p>
          </motion.div>

          <Tabs defaultValue="day-scholar" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="day-scholar" 
                className="flex items-center gap-2 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <User className="h-4 w-4" />
                <span>Day Scholar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="hosteler" 
                className="flex items-center gap-2 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <Home className="h-4 w-4" />
                <span>Hosteler</span>
              </TabsTrigger>
              <TabsTrigger 
                value="alumni" 
                className="flex items-center gap-2 data-[state=active]:bg-palette-brightGreen data-[state=active]:text-palette-darkGreen"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Alumni</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TabsContent value="day-scholar" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-palette-darkGreen">Day Scholar Portal</h2>
                    <p className="text-palette-darkGreen/80">
                      Access resources tailored for students who commute daily. Connect with peers, find study spaces, and coordinate transportation.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Commute sharing and coordination</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Local study spaces and resources</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Campus events and activities</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="hosteler" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-palette-darkGreen">Hostel Life Central</h2>
                    <p className="text-palette-darkGreen/80">
                      Your ultimate hostel companion! Connect with fellow hostelers, coordinate food deliveries, find roommates, and stay updated on hostel events.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Late-night food delivery coordination</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Hostel marketplace for buying/selling</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Hostel-specific announcements and events</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="alumni" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-palette-darkGreen">Alumni Network</h2>
                    <p className="text-palette-darkGreen/80">
                      Stay connected with your alma mater. Mentor current students, share job opportunities, and reconnect with former classmates.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Mentorship opportunities for current students</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Job posting and career networking</span>
                      </li>
                      <li className="flex items-center gap-2 text-palette-darkGreen/80">
                        <div className="h-2 w-2 rounded-full bg-palette-brightGreen"></div>
                        <span>Alumni events and reunions</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className={`overflow-hidden border-palette-beige ${
                  userType === "hosteler" ? "bg-gradient-to-br from-palette-beige/50 to-palette-lightYellow/30" :
                  userType === "alumni" ? "bg-gradient-to-br from-palette-beige/50 to-palette-darkGreen/10" :
                  "bg-gradient-to-br from-palette-beige/50 to-palette-brightGreen/20"
                }`}>
                  <CardHeader>
                    <CardTitle className="text-palette-darkGreen">
                      {userType === "day-scholar" ? "Day Scholar Login" : 
                       userType === "hosteler" ? "Hosteler Login" : 
                       "Alumni Login"}
                    </CardTitle>
                    <CardDescription className="text-palette-darkGreen/70">
                      {userType === "day-scholar" ? "Access your personalized day scholar dashboard" : 
                       userType === "hosteler" ? "Jump into your hostel community" : 
                       "Reconnect with your college community"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-palette-darkGreen">Email</Label>
                      <Input id="email" placeholder="your.email@example.com" className="border-palette-beige" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-palette-darkGreen">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-palette-brightGreen hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" className="border-palette-beige" />
                    </div>

                    {userType === "alumni" && (
                      <div className="space-y-2">
                        <Label htmlFor="graduation-year" className="text-palette-darkGreen">Graduation Year</Label>
                        <Input id="graduation-year" placeholder="e.g., 2020" className="border-palette-beige" />
                      </div>
                    )}

                    {userType === "hosteler" && (
                      <div className="space-y-2">
                        <Label htmlFor="hostel-block" className="text-palette-darkGreen">Hostel & Room Number</Label>
                        <Input id="hostel-block" placeholder="e.g., Block A, Room 203" className="border-palette-beige" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      className={`w-full ${
                        userType === "hosteler" ? "bg-palette-lightYellow text-palette-darkGreen hover:bg-palette-lightYellow/90" :
                        userType === "alumni" ? "bg-palette-darkGreen text-white hover:bg-palette-darkGreen/90" :
                        "bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                      }`}
                      asChild
                    >
                      <Link href={`/dashboard/${userType}`}>
                        Sign In
                      </Link>
                    </Button>
                    <div className="text-center text-sm text-palette-darkGreen/70">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-palette-brightGreen hover:underline">
                        Sign up
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}