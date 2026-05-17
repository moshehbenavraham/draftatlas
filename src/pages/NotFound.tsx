import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found."
        path={location.pathname}
        noindex
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-minimal text-muted-foreground mb-6">ERROR 404</p>
            <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              ← BACK TO HOME
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default NotFound;
