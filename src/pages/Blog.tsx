import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { HAS_NEWSLETTER_ENDPOINT, subscribeNewsletter } from "@/lib/forms";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  const categories = ["ALL", "SUSTAINABILITY", "DESIGN", "URBAN PLANNING"];

  const filteredPosts =
    activeCategory === "ALL"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const result = await subscribeNewsletter({ email, source: "/blog" });

    if (!result.ok) {
      setStatusMessage({ kind: "error", text: result.error });
      toast.error(result.error);
      setSubmitting(false);
      return;
    }

    if (result.mode === "endpoint") {
      toast.success("Thanks — you're on the list.");
      setStatusMessage({ kind: "success", text: "Thanks — you're on the list." });
      setEmail("");
    } else {
      toast.success("Opening your email client to confirm your subscription.");
      setStatusMessage({
        kind: "success",
        text: "A draft is opening in your email client. Hit send there to finish subscribing.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Insights"
        description="Articles and essays on sustainable architecture, minimalist design, and urban planning from the ARCH STUDIO journal."
        path="/blog"
      />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                  INSIGHTS
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                  Exploring the intersection of architecture, design, and human
                  experience through thoughtful analysis and contemporary
                  perspectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="pb-16" aria-labelledby="blog-filters-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <h2 id="blog-filters-heading" className="sr-only">
                Filter articles by category
              </h2>
              <div
                className="flex flex-wrap gap-8 justify-center md:justify-start"
                role="group"
                aria-label="Article categories"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`text-minimal transition-colors duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1 ${
                      activeCategory === category
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                        activeCategory === category
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 list-none">
                {filteredPosts.map((post) => (
                  <li key={post.id} className="group">
                    <article>
                      <Link
                        to={`/blog/${post.id}`}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-sm"
                      >
                        <div className="relative overflow-hidden mb-6">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
                            aria-hidden="true"
                          />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1">
                            <span className="text-xs text-foreground font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center text-xs text-muted-foreground space-x-4">
                            <time dateTime={post.date}>{post.date}</time>
                            <span aria-hidden="true">•</span>
                            <span>{post.readTime}</span>
                            <span aria-hidden="true">•</span>
                            <span>{post.author}</span>
                          </div>

                          <h2 className="text-xl lg:text-2xl font-light text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                            {post.title}
                          </h2>

                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="pt-4">
                            <span className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group-hover:underline">
                              READ MORE
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32 bg-muted">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Stay Informed
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Subscribe to our newsletter for the latest insights on
                architecture and design
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                aria-label="Newsletter signup"
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={submitting}
                  className="flex-1 px-6 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 bg-foreground text-background hover:bg-muted-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "SUBSCRIBING..."
                    : HAS_NEWSLETTER_ENDPOINT
                    ? "SUBSCRIBE"
                    : "SUBSCRIBE VIA EMAIL"}
                </button>
              </form>
              {!HAS_NEWSLETTER_ENDPOINT && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Submitting will open your email client to confirm your
                  subscription.
                </p>
              )}
              {statusMessage && (
                <p
                  role={statusMessage.kind === "error" ? "alert" : "status"}
                  aria-live={
                    statusMessage.kind === "error" ? "assertive" : "polite"
                  }
                  className={`mt-6 text-sm ${
                    statusMessage.kind === "error"
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  {statusMessage.text}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
