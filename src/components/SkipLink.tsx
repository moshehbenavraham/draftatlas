/**
 * Keyboard-visible "Skip to main content" link.
 *
 * Sits as the first focusable element on every page so screen-reader and
 * keyboard-only users can bypass the persistent top navigation. Visually
 * hidden until focused, at which point it slides into the top-left corner.
 *
 * The href targets `#main-content`; every page wraps its main section in a
 * `<main id="main-content" tabIndex={-1}>` so focus actually moves there
 * when the link is activated.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[100]
        focus:px-4 focus:py-2
        focus:bg-foreground focus:text-background
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        focus:rounded
        text-minimal
      "
    >
      Skip to main content
    </a>
  );
}
