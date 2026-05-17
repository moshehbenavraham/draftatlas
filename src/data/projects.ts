import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export type ProjectCategory =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "CULTURAL"
  | "HOSPITALITY";

export interface Project {
  slug: string;
  image: string;
  title: string;
  location: string;
  category: ProjectCategory;
  description: string;
  area: string;
  year: string;
}

/**
 * Single source of truth for projects shown on the homepage Portfolio teaser
 * and the full /work index. Keep slug values URL-safe (kebab-case) — they're
 * used both for keyboard-stable React keys and for prefilling the contact
 * form's project field via `/contact?project=<slug>`.
 */
export const projects: Project[] = [
  {
    slug: "minimal-residence",
    image: project1,
    title: "MINIMAL RESIDENCE",
    location: "NEW YORK, 2024",
    category: "RESIDENTIAL",
    description:
      "A contemporary home focusing on light, space, and material honesty. The design emphasizes clean lines and natural materials.",
    area: "450 SQM",
    year: "2024",
  },
  {
    slug: "corporate-headquarters",
    image: project2,
    title: "CORPORATE HEADQUARTERS",
    location: "LONDON, 2023",
    category: "COMMERCIAL",
    description:
      "Modern office space emphasizing collaboration and natural elements. Features flexible workspaces and sustainable design principles.",
    area: "1200 SQM",
    year: "2023",
  },
  {
    slug: "cultural-center",
    image: project3,
    title: "CULTURAL CENTER",
    location: "TOKYO, 2023",
    category: "CULTURAL",
    description:
      "Public architecture that bridges tradition with contemporary design. A space for community gathering and cultural exchange.",
    area: "800 SQM",
    year: "2023",
  },
  {
    slug: "urban-loft",
    image: project1,
    title: "URBAN LOFT",
    location: "BERLIN, 2024",
    category: "RESIDENTIAL",
    description:
      "Industrial heritage meets contemporary living. Raw materials balanced with refined details.",
    area: "180 SQM",
    year: "2024",
  },
  {
    slug: "gallery-space",
    image: project2,
    title: "GALLERY SPACE",
    location: "PARIS, 2022",
    category: "CULTURAL",
    description:
      "Minimalist gallery designed to showcase art without distraction. Pure white spaces with carefully controlled lighting.",
    area: "600 SQM",
    year: "2022",
  },
  {
    slug: "boutique-hotel",
    image: project3,
    title: "BOUTIQUE HOTEL",
    location: "MILAN, 2023",
    category: "HOSPITALITY",
    description:
      "Luxury hospitality redefined through architectural restraint. Every detail carefully considered for guest experience.",
    area: "2400 SQM",
    year: "2023",
  },
];

/** First three projects, used by the homepage Portfolio teaser. */
export const featuredProjects: Project[] = projects.slice(0, 3);

/** Distinct categories (in display order) plus the "ALL" filter sentinel. */
export const projectFilters: readonly ("ALL" | ProjectCategory)[] = [
  "ALL",
  "RESIDENTIAL",
  "COMMERCIAL",
  "CULTURAL",
  "HOSPITALITY",
] as const;

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
