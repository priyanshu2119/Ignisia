import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-950">
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
              <Skeleton className="h-8 w-40" />
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                <Skeleton className="h-4 w-24 mb-4" />
                {Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full mb-2" />
                ))}
              </div>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex items-center h-16 bg-white dark:bg-gray-950 border-b px-4 md:px-6">
            <div className="flex-1">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </header>

          <main className="flex-1 py-6 px-4 md:px-6">
            <div className="space-y-6">
              <Skeleton className="h-40 w-full rounded-lg" />
              
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}