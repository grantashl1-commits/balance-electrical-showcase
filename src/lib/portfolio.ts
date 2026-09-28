/*
  Project portfolio — photographs supplied by Victoria, one folder per project in
  src/assets/portfolio/<slug>/. Each photo exists as <name>-lg.webp (≤1800px) and
  <name>-sm.webp (800px); metadata is stripped so no location data is published.

  To add a project: drop its images into a new folder with the same naming, then add
  an entry below. Captions describe what is visible in each photograph.
*/

const files = import.meta.glob<string>("/src/assets/portfolio/**/*.webp", {
  eager: true,
  import: "default",
});

export type PortfolioPhoto = {
  lg: string;
  sm: string;
  w: number;
  h: number;
  title: string;
  caption: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  location: string;
  tags: string[];
  summary: string;
  /** Heading for the details list, e.g. "Lighting in view" */
  detailsTitle: string;
  details: string[];
  accolade?: string;
  photos: PortfolioPhoto[];
};

function photo(
  slug: string,
  name: string,
  w: number,
  h: number,
  title: string,
  caption: string,
): PortfolioPhoto {
  const base = `/src/assets/portfolio/${slug}/${name}`;
  const lg = files[`${base}-lg.webp`];
  const sm = files[`${base}-sm.webp`];
  if (!lg || !sm) throw new Error(`Portfolio image missing: ${base}-{lg,sm}.webp`);
  return { lg, sm, w, h, title, caption };
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "oakleaf-residence",
    title: "Oakleaf Residence",
    location: "Taupō district",
    tags: ["Residential", "New build"],
    accolade:
      "Gold Award — Master Builders House of the Year 2025, Bay of Plenty & Central Plateau",
    summary:
      "A lake-view home in pale timber, where the lighting is as considered as the joinery — a drum pendant floating over the living room, one clean linear line above the island, and a courtyard that glows at dusk.",
    detailsTitle: "Lighting in view",
    details: [
      "Feature pendants over the living room and lounge",
      "Linear pendant lighting above the kitchen island",
      "Recessed LED line along the joinery wall",
      "Courtyard, pergola and garden lighting",
    ],
    photos: [
      photo(
        "oakleaf-residence",
        "01-courtyard-at-dusk",
        1313,
        851,
        "Courtyard at dusk",
        "Pergola lighting, garden uplights and warm interiors glowing through the glass.",
      ),
      photo(
        "oakleaf-residence",
        "02-living-room",
        1320,
        873,
        "Living room",
        "A drum pendant beneath the timber-lined ceiling, with the lake framed in glass.",
      ),
      photo(
        "oakleaf-residence",
        "03-kitchen",
        1320,
        878,
        "Kitchen",
        "A linear pendant over the island; stacker doors open straight onto the deck.",
      ),
      photo(
        "oakleaf-residence",
        "04-kitchen-and-dining",
        1320,
        880,
        "Kitchen & dining",
        "A long linear pendant, with a recessed LED line tracing the ceiling beside the joinery.",
      ),
      photo(
        "oakleaf-residence",
        "05-lounge",
        1320,
        876,
        "Lounge",
        "A pendant anchors the curved sofa under the raked timber ceiling.",
      ),
    ],
  },
  {
    slug: "the-curve-house",
    title: "The Curve House",
    location: "Kinloch",
    tags: ["Residential", "New build"],
    summary:
      "Curves traced in light. A continuous LED line follows the sweep of the deck soffit, the profile of the stair and the length of the hallway, while a glowing ellipse hangs over the dining table.",
    detailsTitle: "Lighting in view",
    details: [
      "LED line following the curved deck soffit",
      "Recessed LED channel along the hallway ceiling",
      "Linear lighting tracing the stair",
      "Cove lighting to the raked living-room ceiling",
    ],
    photos: [
      photo(
        "the-curve-house",
        "01-curved-deck-at-dusk",
        1320,
        1320,
        "Curved deck at dusk",
        "An LED line traces the sweep of the soffit around the deck.",
      ),
      photo(
        "the-curve-house",
        "02-aerial-at-sunset",
        1320,
        1315,
        "Aerial at sunset",
        "The Curve House above the lake and the golf course.",
      ),
      photo(
        "the-curve-house",
        "03-kitchen-and-dining",
        1320,
        1317,
        "Kitchen & dining",
        "A glowing ellipse overhead and a linear pendant above the island.",
      ),
      photo(
        "the-curve-house",
        "04-open-plan-living",
        1800,
        1350,
        "Open-plan living",
        "Cove lighting follows the raked ceiling; downlights pick out the island.",
      ),
      photo(
        "the-curve-house",
        "05-hallway",
        1350,
        1800,
        "Hallway",
        "A recessed LED channel runs the length of the ceiling beside the smoked-glass wall.",
      ),
      photo(
        "the-curve-house",
        "06-stair",
        1800,
        1350,
        "Stair",
        "An LED line follows the stair's profile above floating timber treads.",
      ),
    ],
  },
  {
    slug: "the-kinloch-retreat",
    title: "The Kinloch Retreat",
    location: "Kinloch",
    tags: ["Residential", "New build"],
    summary:
      "Dark timber, native tussock and the lake on the horizon. Inside, downlights set into timber-lined ceilings and warm LED tucked above the joinery keep the mood low and calm.",
    detailsTitle: "Lighting in view",
    details: [
      "Soffit lighting along the covered entry",
      "Downlights set into timber-lined ceilings",
      "Warm LED concealed above the kitchen joinery",
    ],
    photos: [
      photo(
        "the-kinloch-retreat",
        "01-exterior",
        1320,
        1175,
        "Exterior",
        "Dark timber cladding set among native tussock.",
      ),
      photo(
        "the-kinloch-retreat",
        "02-entry",
        1320,
        887,
        "Entry",
        "Soffit lighting leads the way along the covered path.",
      ),
      photo(
        "the-kinloch-retreat",
        "03-kitchen",
        1320,
        889,
        "Kitchen",
        "Downlights set into the timber-lined ceiling, with warm LED concealed above the joinery.",
      ),
      photo(
        "the-kinloch-retreat",
        "04-kitchen-to-living",
        1320,
        896,
        "Kitchen to living",
        "The timber ceiling carries through, lit by a line of downlights.",
      ),
    ],
  },
  {
    slug: "the-sisters",
    title: "The Sisters",
    location: "Taupō district",
    tags: ["Solar"],
    summary:
      "A rooftop array laid across black standing-seam roofs above the lake — rails set out to the seams first, then panels aligned to each roof plane.",
    detailsTitle: "In view",
    details: [
      "Solar array across several roof planes",
      "Mounting rails fixed to the standing seams",
      "Panels aligned to each roof plane",
    ],
    photos: [
      photo(
        "the-sisters",
        "01-array",
        1800,
        1350,
        "Array",
        "Panels laid to the roof plane, looking out over the lake.",
      ),
      photo(
        "the-sisters",
        "02-rooftops",
        1800,
        1350,
        "Rooftops",
        "Arrays across the black standing-seam roofs.",
      ),
      photo(
        "the-sisters",
        "03-courtyard-wing",
        1800,
        1350,
        "Courtyard wing",
        "The array continues over the roof of the courtyard wing.",
      ),
      photo(
        "the-sisters",
        "04-rails-set-out",
        1012,
        1800,
        "Rails set out",
        "Mounting rails fixed to the standing seams ahead of the panels.",
      ),
    ],
  },
];

/** Look up one portfolio photo, e.g. getPhoto("oakleaf-residence", 2) for the living room. */
export function getPhoto(slug: string, index: number): PortfolioPhoto & { project: string } {
  const project = PORTFOLIO.find((p) => p.slug === slug);
  const found = project?.photos[index];
  if (!project || !found) throw new Error(`No portfolio photo ${slug}[${index}]`);
  return { ...found, project: project.title };
}

export const PORTFOLIO_PHOTO_COUNT = PORTFOLIO.reduce((n, p) => n + p.photos.length, 0);
