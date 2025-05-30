import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-palette-darkGreen mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-palette-darkGreen mb-6">Page Not Found</h2>
      <p className="text-palette-darkGreen/80 max-w-md mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="bg-palette-brightGreen text-palette-darkGreen hover:bg-palette-brightGreen/90">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

