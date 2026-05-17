import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

type Mode = "light" | "dark" | "system"

const NEXT: Record<Mode, Mode> = {
  light: "dark",
  dark: "system",
  system: "light",
}

const LABEL: Record<Mode, string> = {
  light: "Switch to dark mode",
  dark: "Switch to follow system theme",
  system: "Switch to light mode",
}

/**
 * Tri-state theme toggle. Cycles Light → Dark → System → Light.
 *
 * The previous implementation toggled binarily between light and dark, which
 * stranded users who'd ever clicked the button — they could never get back
 * to "follow my OS appearance" without manually clearing localStorage. This
 * version exposes "system" as a first-class state and surfaces the active
 * mode through both the icon and the button's aria-label.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mode = (theme as Mode) ?? "system"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(NEXT[mode])}
      aria-label={LABEL[mode]}
      title={LABEL[mode]}
      className="w-10 h-10 hover:bg-muted transition-colors duration-300"
    >
      {mode === "light" && <Sun className="h-4 w-4" aria-hidden="true" />}
      {mode === "dark" && <Moon className="h-4 w-4" aria-hidden="true" />}
      {mode === "system" && <Monitor className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only">Theme: {mode}</span>
    </Button>
  )
}
