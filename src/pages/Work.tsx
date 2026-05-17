import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { SEO, SITE_URL, SITE_NAME } from "@/components/SEO";
import { projects, projectFilters, type ProjectCategory } from "@/data/projects";

type Filter = "ALL" | ProjectCategory;

const Work = () => {
  const [activeCategory, setActiveCategory] = useState<Filter>("ALL");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "ALL"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  // ItemList JSON-LD describing the studio's portfolio. Each project is
  // emitted as a CreativeWork so search engines can surface them as
  // distinct works of architecture rather than a single opaque list page.
  const itemListJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${SITE_NAME} — Selected Work`,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/contact?project=${project.slug}`,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          locationCreated: project.location,
          dateCreated: project.year,
          creator: { "@type": "Organization", name: SITE_NAME },
          genre: project.category.toLowerCase(),
        },
      })),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Work"
        description="Selected residential, commercial, cultural, and hospitality projects from ARCH STUDIO — minimal architecture across New York, London, Tokyo, Berlin, Paris, and Milan."
        path="/work"
        jsonLd={itemListJsonLd}
      />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                  OUR WORK
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                  A curated selection of our architectural projects, each telling a unique story
                  through thoughtful design and meticulous attention to detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="pb-16" aria-labelledby="work-filters-heading">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <h2 id="work-filters-heading" className="sr-only">
                Filter projects by category
              </h2>
              <div
                className="flex flex-wrap gap-8 justify-center md:justify-start"
                role="group"
                aria-label="Project categories"
              >
                {projectFilters.map((category) => (
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
              <p className="sr-only" role="status" aria-live="polite">
                Showing {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "project" : "projects"}
                {activeCategory === "ALL" ? "" : ` in ${activeCategory}`}.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-32" aria-label="Selected projects">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <ul className="grid md:grid-cols-2 gap-16 lg:gap-20 list-none">
                {filteredProjects.map((project) => (
                  <li key={project.slug} className="group">
                    <article>
                      <Link
                        to={`/contact?project=${project.slug}`}
                        aria-label={`Inquire about ${project.title} (${project.location})`}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-sm"
                      >
                        <div className="relative overflow-hidden mb-8">
                          <img
                            src={project.image}
                            alt={`${project.title} — ${project.location}`}
                            loading="lazy"
                            className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
                            aria-hidden="true"
                          />

                          {/* Project Category Badge */}
                          <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                            <span className="text-minimal text-foreground">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                              {project.title}
                            </h3>
                            <p className="text-minimal text-muted-foreground">
                              {project.location}
                            </p>
                          </div>

                          <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex gap-8 pt-4 border-t border-border">
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">AREA</p>
                              <p className="text-foreground">{project.area}</p>
                            </div>
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">YEAR</p>
                              <p className="text-foreground">{project.year}</p>
                            </div>
                          </div>

                          <p className="text-minimal text-foreground pt-2">
                            Inquire about this project →
                          </p>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-muted">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Ready to Start
                <br />
                Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Let&apos;s discuss how we can bring your architectural vision to life
              </p>
              <Link
                to="/contact"
                className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 rounded-sm px-1"
              >
                GET IN TOUCH
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Work;
