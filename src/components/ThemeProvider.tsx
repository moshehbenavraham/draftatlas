import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  /** The actual rendered theme ("system" resolved to "light" or "dark"). */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyThemeToRoot(resolved: ResolvedTheme) {
  const root = window.document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  // Keep the CSS color-scheme property in sync so native UI (scrollbars,
  // form controls, autofill backgrounds) tracks the active theme.
  root.style.colorScheme = resolved
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light"
    const stored = (localStorage.getItem(storageKey) as Theme) || defaultTheme
    return stored === "system" ? getSystemTheme() : (stored as ResolvedTheme)
  })

  // Apply the active theme class and color-scheme to <html> on every change.
  useEffect(() => {
    const next: ResolvedTheme = theme === "system" ? getSystemTheme() : theme
    setResolvedTheme(next)
    applyThemeToRoot(next)
  }, [theme])

  // When in "system" mode, react to OS-level theme changes while the page is
  // open. Without this listener, a user toggling their OS appearance while
  // looking at the site would see no update until reload.
  useEffect(() => {
    if (theme !== "system") return
    if (typeof window === "undefined" || !window.matchMedia) return
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      const next: ResolvedTheme = mql.matches ? "dark" : "light"
      setResolvedTheme(next)
      applyThemeToRoot(next)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [theme])

  const value: ThemeProviderState = {
    theme,
    resolvedTheme,
    setTheme: (next: Theme) => {
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        // localStorage may be unavailable (private mode, sandboxed iframes).
      }
      setThemeState(next)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
