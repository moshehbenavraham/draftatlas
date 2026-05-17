import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "RESIDENTIAL",
      description:
        "Crafting homes that reflect individual lifestyles while maintaining architectural integrity",
    },
    {
      number: "02",
      title: "COMMERCIAL",
      description:
        "Designing functional spaces that enhance business environments and user experiences",
    },
    {
      number: "03",
      title: "RENOVATION",
      description:
        "Transforming existing structures with contemporary sensibilities and sustainable practices",
    },
    {
      number: "04",
      title: "CONSULTATION",
      description:
        "Providing expert guidance on design direction, planning, and architectural solutions",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Services"
        description="Residential, commercial, renovation, and architectural consulting services from ARCH STUDIO."
        path="/services"
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h1 className="text-minimal text-muted-foreground mb-4">SERVICES</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                What We Do
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-6">
                    <span className="text-minimal text-muted-foreground font-medium">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default Services;
