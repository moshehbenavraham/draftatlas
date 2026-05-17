import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL_ADDRESS } from "@/lib/forms";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                Let&apos;s Create Something
                <br />
                Extraordinary
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">EMAIL</h4>
                  <a
                    href={`mailto:${CONTACT_EMAIL_ADDRESS}`}
                    className="text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    {CONTACT_EMAIL_ADDRESS}
                  </a>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">PHONE</h4>
                  <a
                    href="tel:+12345678900"
                    className="text-xl hover:text-muted-foreground transition-colors duration-300"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>

                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">STUDIO</h4>
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

            <div>
              <h4 className="text-minimal text-muted-foreground mb-6">SEND A MESSAGE</h4>
              <ContactForm source="homepage" compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
