"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-palette-beige/90 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/login" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-palette-darkGreen" />
            <span className="text-palette-darkGreen">Back to Login</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!isSubmitted ? (
            <Card className="border-palette-beige">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-palette-lightYellow/20 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-palette-brightGreen" />
                </div>
                <CardTitle className="text-palette-darkGreen">Forgot Password?</CardTitle>
                <CardDescription>
                  No worries! Enter your email address and we&apos;ll send you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-palette-darkGreen">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-palette-beige"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <div className="text-center text-sm text-palette-darkGreen/70">
                    Remember your password?{" "}
                    <Link href="/login" className="text-palette-brightGreen hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card className="border-palette-beige">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-palette-darkGreen">Check Your Email</CardTitle>
                <CardDescription>
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-palette-darkGreen/70">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen/10"
                >
                  Try Again
                </Button>
                <div className="text-center text-sm text-palette-darkGreen/70">
                  <Link href="/login" className="text-palette-brightGreen hover:underline">
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  )
}
