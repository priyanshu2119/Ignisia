"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@college.edu",
    phone: "+91 98765 43210",
    location: "Room 204, Block A",
    year: "3rd Year",
    department: "Computer Science",
    bio: "Passionate about technology and anime. Love organizing events and helping fellow students with tech issues.",
    interests: ["Gaming", "Anime", "Tech Repair", "Event Planning"],
    joinDate: "September 2022"
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any changes
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-palette-beige/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard/hosteler" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-palette-darkGreen" />
            <span className="text-palette-darkGreen">Back to Dashboard</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-palette-darkGreen">My Profile</h1>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-palette-darkGreen text-palette-darkGreen"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Profile Picture and Basic Info */}
            <Card className="border-palette-beige">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-palette-brightGreen to-palette-lightYellow flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-palette-darkGreen" />
                  </div>
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-2">{profile.name}</h2>
                  <Badge className="bg-palette-lightYellow text-palette-darkGreen mb-4">
                    {profile.year} - {profile.department}
                  </Badge>
                  <div className="space-y-2 text-sm text-palette-darkGreen/70 w-full">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <div className="space-y-6">
              <Card className="border-palette-beige">
                <CardHeader>
                  <CardTitle className="text-palette-darkGreen">Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-palette-darkGreen">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="border-palette-beige"
                        />
                      ) : (
                        <p className="text-palette-darkGreen/80">{profile.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-palette-darkGreen">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="border-palette-beige"
                        />
                      ) : (
                        <p className="text-palette-darkGreen/80">{profile.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-palette-darkGreen">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="border-palette-beige"
                        />
                      ) : (
                        <p className="text-palette-darkGreen/80">{profile.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-palette-darkGreen">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="border-palette-beige"
                        />
                      ) : (
                        <p className="text-palette-darkGreen/80">{profile.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-palette-darkGreen">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="border-palette-beige"
                        rows={3}
                      />
                    ) : (
                      <p className="text-palette-darkGreen/80">{profile.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-beige">
                <CardHeader>
                  <CardTitle className="text-palette-darkGreen">Interests</CardTitle>
                  <CardDescription>Your areas of interest and hobbies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-palette-brightGreen text-palette-brightGreen"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
