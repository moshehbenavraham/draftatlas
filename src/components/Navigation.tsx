import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SkipLink } from "@/components/SkipLink";

const links = [
  { to: "/work", label: "WORK" },
  { to: "/services", label: "SERVICES" },
  { to: "/about", label: "ABOUT" },
  { to: "/blog", label: "BLOG" },
  { to: "/contact", label: "CONTACT" },
] as const;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Visually-hidden until focused — first focusable element on every
          page so keyboard users can bypass the persistent nav. */}
      <SkipLink />
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        aria-label="Primary"
      >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-minimal text-foreground" aria-label="ARCH STUDIO — home">
          ARCH STUDIO
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Theme Toggle */}
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navigation;
