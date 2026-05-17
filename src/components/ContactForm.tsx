import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  HAS_CONTACT_ENDPOINT,
  sendContactMessage,
} from "@/lib/forms";
import { findProjectBySlug } from "@/data/projects";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; mode: "endpoint" | "mailto" };

interface ContactFormProps {
  /** Identifier sent through to the backend / mailto body, e.g. "/contact" or "homepage". */
  source: string;
  /** When true, render the form in the more compact homepage layout. */
  compact?: boolean;
}

/**
 * Real contact form.
 *
 * Previously the /contact page and the homepage Contact section just rendered
 * `mailto:` and `tel:` links — visitors who wanted to inquire had to leave
 * the site and compose a message from scratch in their email client. This
 * form keeps the visitor in the studio's surface area and POSTs to a
 * configured backend when one exists, falling back to a prefilled mailto:
 * draft when it doesn't.
 *
 * When opened with `?project=<slug>`, the subject field is prefilled with the
 * project's title and the message includes a contextual opener so the studio
 * knows which piece of work prompted the inquiry. The Work page wires its
 * project cards to that query string.
 */
export function ContactForm({ source, compact = false }: ContactFormProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectSlug = params.get("project");
  const project = projectSlug ? findProjectBySlug(projectSlug) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(
    project ? `Project inquiry — ${project.title}` : ""
  );
  const [message, setMessage] = useState(
    project
      ? `Hi ARCH STUDIO, I'd love to talk about something in the spirit of ${project.title} (${project.location}).\n\n`
      : ""
  );
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // If the visitor navigates between project links without unmounting the
  // form, keep the subject/message in sync with the active slug — unless
  // they've already started typing something custom.
  useEffect(() => {
    if (!project) return;
    setSubject((prev) =>
      prev && !prev.startsWith("Project inquiry — ")
        ? prev
        : `Project inquiry — ${project.title}`
    );
    setMessage((prev) =>
      prev.length > 0 && !prev.startsWith("Hi ARCH STUDIO,")
        ? prev
        : `Hi ARCH STUDIO, I'd love to talk about something in the spirit of ${project.title} (${project.location}).\n\n`
    );
  }, [project?.slug, project]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ kind: "submitting" });
    const result = await sendContactMessage({
      name,
      email,
      subject,
      message,
      source: project ? `${source}?project=${project.slug}` : source,
    });

    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      toast.error(result.error);
      return;
    }

    setStatus({ kind: "success", mode: result.mode });
    if (result.mode === "endpoint") {
      toast.success("Thanks — we'll be in touch shortly.");
      setName("");
      setEmail("");
      setSubject(project ? `Project inquiry — ${project.title}` : "");
      setMessage(
        project
          ? `Hi ARCH STUDIO, I'd love to talk about something in the spirit of ${project.title} (${project.location}).\n\n`
          : ""
      );
    } else {
      toast.success("Opening your email client to send your message.");
    }
  };

  const submitting = status.kind === "submitting";
  const submitLabel = submitting
    ? "SENDING..."
    : HAS_CONTACT_ENDPOINT
    ? "SEND MESSAGE"
    : "SEND VIA EMAIL";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className={compact ? "space-y-6" : "space-y-8"}
    >
      {project && (
        <p
          className="text-xs text-muted-foreground border-l-2 border-foreground pl-4"
          aria-live="polite"
        >
          Inquiring about <strong className="text-foreground">{project.title}</strong>{" "}
          ({project.location}).{" "}
          <Link
            to="/contact"
            className="underline hover:text-foreground transition-colors"
          >
            Clear
          </Link>
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="text-minimal text-muted-foreground mb-2 block"
          >
            NAME
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="text-minimal text-muted-foreground mb-2 block"
          >
            EMAIL
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="text-minimal text-muted-foreground mb-2 block"
        >
          SUBJECT
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={submitting}
          placeholder="Project inquiry"
          className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-minimal text-muted-foreground mb-2 block"
        >
          MESSAGE
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={compact ? 4 : 6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
          placeholder="Tell us about your project — site, scope, timeline, budget..."
          className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-4 bg-foreground text-background hover:bg-muted-foreground transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-minimal"
        >
          {submitLabel}
        </button>
        {!HAS_CONTACT_ENDPOINT && (
          <p className="text-xs text-muted-foreground">
            Submitting opens your email client to send the message.
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <p
          role="alert"
          aria-live="assertive"
          className="text-sm text-destructive"
        >
          {status.message}
        </p>
      )}
      {status.kind === "success" && status.mode === "endpoint" && (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-foreground"
        >
          Thanks — your message is on its way. We'll be in touch shortly.
        </p>
      )}
      {status.kind === "success" && status.mode === "mailto" && (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-muted-foreground"
        >
          A draft is opening in your email client. Hit send there to finish.
        </p>
      )}
    </form>
  );
}
