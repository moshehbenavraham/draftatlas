import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL_ADDRESS } from "@/lib/forms";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with ARCH STUDIO to discuss your residential, commercial, or renovation project. Studio based in New York."
        path="/contact"
      />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="pt-32 pb-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
                <div className="lg:col-span-2">
                  <h1 className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</h1>
                  <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                    Let&apos;s Create Something
                    <br />
                    Extraordinary
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                      <a
                        href={`mailto:${CONTACT_EMAIL_ADDRESS}`}
                        className="text-xl hover:text-muted-foreground transition-colors duration-300"
                      >
                        {CONTACT_EMAIL_ADDRESS}
                      </a>
                    </div>

                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">PHONE</h3>
                      <a
                        href="tel:+12345678900"
                        className="text-xl hover:text-muted-foreground transition-colors duration-300"
                      >
                        +1 (234) 567-8900
                      </a>
                    </div>

                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">STUDIO</h3>
                      <address className="text-xl not-italic">
                        123 Design Avenue
                        <br />
                        New York, NY 10001
                      </address>
                    </div>
                  </div>

                  <div className="pt-12 mt-12 border-t border-border">
                    <p className="text-muted-foreground">
                      We approach each project with curiosity, rigor, and a commitment to excellence.
                      Our process begins with listening, understanding your vision, and translating
                      it into spaces that exceed expectations.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <h3 className="text-minimal text-muted-foreground mb-6">SEND A MESSAGE</h3>
                  <ContactForm source="/contact" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
