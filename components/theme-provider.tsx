"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

/* Fix theme provider to ensure consistent theme application */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

