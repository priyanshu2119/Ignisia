"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-2xl font-bold text-palette-darkGreen mb-4">Something went wrong!</h1>
      <p className="text-palette-darkGreen/80 max-w-md mb-8">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={reset} className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
        Try again
      </Button>
    </div>
  )
}

