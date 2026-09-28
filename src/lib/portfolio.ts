/*
  Project portfolio — photographs supplied by Victoria, one folder per project in
  src/assets/portfolio/<slug>/. Each photo exists as <name>-lg.webp (≤1800px) and
  <name>-sm.webp (800px); metadata is stripped so no location data is published.
  The first photo of each project is its cover.

  To add a project: drop its images into a new folder with the same naming, then add
  an entry below. Captions describe what is visible in each photograph.
*/

const files = import.meta.glob<string>("/src/assets/portfolio/**/*.webp", {
  eager: true,
  import: "default",
});

export type PortfolioPhoto = {
  name: string;
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
  return { name, lg, sm, w, h, title, caption };
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
    slug: "beechtree-building-headquarters",
    title: "Beechtree Building Headquarters",
    location: "Taupō district",
    tags: ["Commercial", "New build"],
    summary:
      "A two-storey headquarters in cedar and black steel. Soffit downlights wash the glazing at dusk, a cluster of glass pendants drops through the double-height stairwell, and LED tucked beneath the handrails lights every tread — all fed from a switchboard and labelled sub-mains built for the tenancies to come.",
    detailsTitle: "Lighting & power in view",
    details: [
      "Soffit downlights and wall washers across the glazed frontage",
      "Glass pendant cluster through the double-height stairwell",
      "LED concealed beneath the timber handrails",
      "Track lighting to the offices, high-bays in the workshop",
      "Main switchboard, cable ladder and labelled sub-mains",
    ],
    photos: [
      photo(
        "beechtree-building-headquarters",
        "01-front-at-dusk",
        1320,
        1324,
        "Front at dusk",
        "Soffit downlights and ground-level wall washers light the glazed two-storey frontage.",
      ),
      photo(
        "beechtree-building-headquarters",
        "02-entry-at-dusk",
        1041,
        1510,
        "Entry at dusk",
        "The glazed entry at dusk, with the lit stair visible behind the glass.",
      ),
      photo(
        "beechtree-building-headquarters",
        "03-stairwell-pendants",
        1086,
        1448,
        "Stairwell",
        "A cluster of glass pendants drops through the double-height stairwell.",
      ),
      photo(
        "beechtree-building-headquarters",
        "04-stair-from-above",
        1086,
        1448,
        "Stair from above",
        "Pendants overhead and LED beneath both handrails, looking down the stair.",
      ),
      photo(
        "beechtree-building-headquarters",
        "05-lit-handrail",
        1041,
        1511,
        "Lit handrail",
        "LED concealed beneath the timber handrail washes each tread.",
      ),
      photo(
        "beechtree-building-headquarters",
        "06-office",
        1451,
        1084,
        "Office",
        "Black track lighting frames the office, with full-height glazing to the street.",
      ),
      photo(
        "beechtree-building-headquarters",
        "07-open-office",
        1448,
        1086,
        "Open-plan office",
        "Track lighting follows the ceiling line of the open-plan office.",
      ),
      photo(
        "beechtree-building-headquarters",
        "08-workshop",
        1086,
        1448,
        "Workshop",
        "High-bay pendants light the workshop beside its roller door.",
      ),
      photo(
        "beechtree-building-headquarters",
        "09-switchboard",
        1086,
        1448,
        "Switchboard",
        "The main switchboard, with cable ladder rising through the riser.",
      ),
      photo(
        "beechtree-building-headquarters",
        "10-sub-mains",
        1041,
        1511,
        "Sub-mains",
        "Sub-main conduits labelled for each office, workshop and incoming supply.",
      ),
      photo(
        "beechtree-building-headquarters",
        "11-on-site",
        1086,
        1448,
        "On site",
        "The Balance van on site at the finished building.",
      ),
    ],
  },
  {
    slug: "sparrowhawk",
    title: "Sparrowhawk",
    location: "Kinloch",
    tags: ["Residential", "New build"],
    summary:
      "A cluster of dark gabled pavilions on a Kinloch hillside. As the sky turns, warm light spills from every room, a concealed LED line glows beneath the deck's built-in bench, and the courtyard between the pavilions lights up like a lantern.",
    detailsTitle: "Lighting in view",
    details: [
      "Concealed LED beneath the built-in deck seating",
      "Deck-edge lighting around the pavilions",
      "Soffit lighting to the sheltered courtyard",
      "Warm, layered interiors that read from outside",
    ],
    photos: [
      photo(
        "sparrowhawk",
        "01-at-dusk",
        1800,
        1200,
        "At dusk",
        "Warm interiors and deck-edge lighting glow across the pavilions at dusk.",
      ),
      photo(
        "sparrowhawk",
        "02-deck-at-sunset",
        1800,
        1201,
        "Deck at sunset",
        "A concealed LED line runs beneath the built-in bench as the sky turns.",
      ),
      photo(
        "sparrowhawk",
        "03-pavilions-at-dusk",
        1800,
        1348,
        "Pavilions from above",
        "Each room lit warm against the evening, seen from the hillside above.",
      ),
      photo(
        "sparrowhawk",
        "04-courtyard-at-dusk",
        1800,
        1200,
        "Courtyard at dusk",
        "The sheltered courtyard glows between the pavilions.",
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
    slug: "kinloch-project",
    title: "Kinloch Project",
    location: "Kinloch",
    tags: ["Residential", "New build"],
    summary:
      "Cedar cladding, a copper-toned front door and the lake through the glass. Downlights set into the soffits lead the way to the entry, wall lights flank the stacker doors, and small step lights glow low in the deck and planting after dark — followed here from framing to finish.",
    detailsTitle: "Lighting in view",
    details: [
      "Soffit downlights over the entry and around the house",
      "Wall lights flanking the doors and glazing",
      "Step lights set into the deck and planting",
      "Wired from framing through to final fit-off",
    ],
    photos: [
      photo(
        "kinloch-project",
        "01-exterior-at-dusk",
        1800,
        1200,
        "Exterior at dusk",
        "Soffit downlights ring the cedar-clad house as evening settles.",
      ),
      photo(
        "kinloch-project",
        "02-deck-at-dusk",
        1800,
        1359,
        "Deck at dusk",
        "Wall lights flank the stacker doors; small lights glow in the deck.",
      ),
      photo(
        "kinloch-project",
        "03-entry-at-dusk",
        1200,
        1800,
        "Entry at dusk",
        "Soffit downlights, a wall light and low garden lights lead to the door.",
      ),
      photo(
        "kinloch-project",
        "04-front-door",
        1200,
        1800,
        "Front door",
        "Downlights in the soffit wash the entry and the copper-toned door.",
      ),
      photo(
        "kinloch-project",
        "05-step-light",
        1200,
        1800,
        "Step light",
        "A step light glows low beside the tussock.",
      ),
      photo(
        "kinloch-project",
        "06-entry-by-day",
        1800,
        1200,
        "Entry by day",
        "Cedar, concrete and the lake reflected in the glass.",
      ),
      photo(
        "kinloch-project",
        "07-during-the-build",
        1200,
        1800,
        "During the build",
        "The same house at framing stage, before the linings went on.",
      ),
    ],
  },
  {
    slug: "the-lakehouse",
    title: "The Lakehouse",
    location: "Taupō district",
    tags: ["Residential"],
    summary:
      "Charred timber, cedar-lined ceilings and oak floors — lit almost entirely by light you can't see. Concealed LED coves run the length of the gallery and the living-room ceiling, a warm line floats the kitchen island off the floor, and garden spotlights take over outside.",
    detailsTitle: "Lighting in view",
    details: [
      "Concealed LED cove along the cedar ceilings",
      "LED line beneath the kitchen island",
      "Pinpoint downlights in the cedar soffit",
      "Garden spotlights in the planting",
    ],
    photos: [
      photo(
        "the-lakehouse",
        "01-island",
        1800,
        1200,
        "Kitchen island",
        "An LED line beneath the island throws a soft wash across the oak floor.",
      ),
      photo(
        "the-lakehouse",
        "02-cedar-ceiling",
        1800,
        1200,
        "Cedar ceiling",
        "Concealed LED lights the cedar-lined ceiling above the sheer curtains.",
      ),
      photo(
        "the-lakehouse",
        "03-gallery",
        1200,
        1800,
        "Gallery",
        "An LED cove runs the length of the glazed gallery beneath the cedar ceiling.",
      ),
      photo(
        "the-lakehouse",
        "04-hallway",
        1198,
        1800,
        "Hallway",
        "Pinpoint downlights in the cedar soffit lead into the lit gallery.",
      ),
      photo(
        "the-lakehouse",
        "05-garden-light",
        1800,
        1200,
        "Garden light",
        "A spike spotlight set in the planting beside the deck.",
      ),
    ],
  },
  {
    slug: "pukeko",
    title: "Pūkeko",
    location: "Taupō district",
    tags: ["Residential"],
    summary:
      "Black board-and-batten gables and a manicured lawn — and after dark, a lighting scheme that does the landscaping justice. Uplights climb the columnar trees, soffit lights trace the eaves and garage, and inside a slim linear pendant draws the line of the black island.",
    detailsTitle: "Lighting in view",
    details: [
      "Uplights to the trees and planting",
      "Soffit lighting along the eaves and garage",
      "Linear pendant over the kitchen island",
      "Cylinder pendants and downlights through the living areas",
    ],
    photos: [
      photo(
        "pukeko",
        "01-front-at-dusk",
        1448,
        1086,
        "Front at dusk",
        "Uplights climb the columnar trees; soffit lights trace the eaves.",
      ),
      photo(
        "pukeko",
        "02-driveway-at-dusk",
        1448,
        1086,
        "Driveway at dusk",
        "Soffit lights wash the garage doors, with garden lights along the drive.",
      ),
      photo(
        "pukeko",
        "03-garden-at-dusk",
        1448,
        1086,
        "Garden at dusk",
        "Garden uplights and soffit lighting carry the glow along the frontage.",
      ),
      photo(
        "pukeko",
        "04-kitchen",
        1320,
        1043,
        "Kitchen",
        "A slim linear pendant over the black island, with downlights set evenly across the ceiling.",
      ),
      photo(
        "pukeko",
        "05-kitchen-and-dining",
        1320,
        867,
        "Kitchen & dining",
        "The linear pendant follows the island; a black track picks out the kitchen beyond.",
      ),
      photo(
        "pukeko",
        "06-dining-and-living",
        1320,
        877,
        "Dining & living",
        "Black cylinder pendants and downlights through the open-plan dining and living.",
      ),
      photo(
        "pukeko",
        "07-living-room",
        1320,
        972,
        "Living room",
        "Downlights around the timber-panelled fireplace wall.",
      ),
      photo(
        "pukeko",
        "08-ensuite",
        1310,
        870,
        "Ensuite",
        "Downlights over the walk-in shower, with a glass pendant beside the round mirror.",
      ),
      photo(
        "pukeko",
        "09-bathroom",
        1320,
        873,
        "Bathroom",
        "Downlights over the tiled shower and oak vanity.",
      ),
    ],
  },
  {
    slug: "the-sisters",
    title: "The Sisters",
    location: "Taupō district",
    tags: ["Residential", "Solar"],
    summary:
      "A lakefront home that opens fully to the view, with a rooftop array laid across its black standing-seam roofs. Inside, slim pendants and clean downlights; up top, rails set out to the seams first, then panels aligned to each roof plane.",
    detailsTitle: "In view",
    details: [
      "Solar array across several roof planes",
      "Mounting rails fixed to the standing seams",
      "Pendants over the kitchen island and dining table",
      "Downlights throughout the open-plan living",
    ],
    photos: [
      photo(
        "the-sisters",
        "05-exterior",
        1274,
        1305,
        "Exterior",
        "The living wing opens fully to the deck and lawn.",
      ),
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
        "06-living-room",
        1305,
        1310,
        "Living room",
        "Stacker doors fold away to the lake; downlights keep the ceiling clean.",
      ),
      photo(
        "the-sisters",
        "07-living-and-dining",
        1320,
        1327,
        "Living & dining",
        "Pendants over the dining table, with the lake framed beyond.",
      ),
      photo(
        "the-sisters",
        "08-kitchen",
        1298,
        1316,
        "Kitchen",
        "A slim linear pendant hung over the island, with downlights beyond.",
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
  {
    slug: "the-bach",
    title: "The Bach",
    location: "Taupō district",
    tags: ["Residential"],
    summary:
      "Dark-stained timber joinery set against pale oak, with the lighting built right into it. LED lines sit beneath the shelves to light the stone splashbacks, a red linear pendant marks the kitchen island, and a warm glow runs along the bedhead.",
    detailsTitle: "Lighting in view",
    details: [
      "LED concealed beneath the joinery shelves",
      "Red linear pendant over the island",
      "LED ledge lighting in the bedroom",
      "Recessed downlights along the hall",
    ],
    photos: [
      photo(
        "the-bach",
        "01-kitchen",
        1086,
        1448,
        "Kitchen",
        "A red linear pendant over the island; LED lights the shelf above the bench.",
      ),
      photo(
        "the-bach",
        "02-galley",
        1086,
        1448,
        "Galley",
        "LED beneath the shelf lights the stone splashback in dark-timber joinery.",
      ),
      photo(
        "the-bach",
        "03-hall",
        1086,
        1448,
        "Hall",
        "The joinery runs the length of the hall, its shelf traced with LED.",
      ),
      photo(
        "the-bach",
        "04-bedroom",
        1448,
        1086,
        "Bedroom",
        "A warm LED line glows along the bedhead ledge.",
      ),
    ],
  },
  {
    slug: "rainbow-reno",
    title: "Rainbow Reno",
    location: "Taupō",
    tags: ["Residential", "Renovation"],
    summary:
      "A holiday home reworked room by room. Lit arched niches frame a new fireplace wall, track spots follow the curved kitchen, a heat pump keeps it comfortable year-round, and outside, wall and step lights lead across the new courtyard.",
    detailsTitle: "In view",
    details: [
      "LED to the arched display niches",
      "Track spotlights over the kitchen",
      "Heat pump installation",
      "Wall and step lighting to the deck and courtyard",
    ],
    photos: [
      photo(
        "rainbow-reno",
        "01-lounge",
        1320,
        881,
        "Lounge",
        "LED lights the arched niches either side of the fireplace and TV wall.",
      ),
      photo(
        "rainbow-reno",
        "02-kitchen",
        1320,
        892,
        "Kitchen",
        "Track spotlights over the curved kitchen, with a heat pump mounted high on the wall.",
      ),
      photo(
        "rainbow-reno",
        "03-courtyard-at-dusk",
        1320,
        888,
        "Courtyard at dusk",
        "Wall lights and step lights guide the way across the courtyard.",
      ),
      photo(
        "rainbow-reno",
        "04-covered-deck",
        1320,
        899,
        "Covered deck",
        "Wall lights under the veranda and step lights set into the deck edge.",
      ),
    ],
  },
  {
    slug: "pre-wires",
    title: "Pre-wires",
    location: "Taupō district",
    tags: ["New build", "First fix"],
    summary:
      "The work nobody sees, and the reason everything else works. Before the linings go on, every cable is planned, run and clipped neatly through the framing, ready for the fittings, scenes and controls that come later.",
    detailsTitle: "In view",
    details: [
      "Cable runs planned and clipped along the joists",
      "Bundled drops through the wall framing",
      "Loops kept clear of openings and arches",
      "First fix ready for inspection before linings",
    ],
    photos: [
      photo(
        "pre-wires",
        "01-ceiling-runs",
        1440,
        961,
        "Ceiling runs",
        "Cable runs clipped neatly along the joists before the ceiling goes on.",
      ),
      photo(
        "pre-wires",
        "02-first-fix",
        1350,
        1800,
        "First fix",
        "First-fix cabling through the framing of a two-storey build.",
      ),
      photo(
        "pre-wires",
        "03-cable-drops",
        1350,
        1800,
        "Cable drops",
        "Cable drops bundled down the framing, ready for fit-off.",
      ),
      photo(
        "pre-wires",
        "04-arched-opening",
        1350,
        1800,
        "Arched opening",
        "Cables looped clear of an arched opening in the framing.",
      ),
    ],
  },
];

/** Look up one portfolio photo by file name, e.g. getPhoto("oakleaf-residence", "02-living-room"). */
export function getPhoto(slug: string, name: string): PortfolioPhoto & { project: string } {
  const project = PORTFOLIO.find((p) => p.slug === slug);
  const found = project?.photos.find((ph) => ph.name === name);
  if (!project || !found) throw new Error(`No portfolio photo ${slug}/${name}`);
  return { ...found, project: project.title };
}

export const PORTFOLIO_PHOTO_COUNT = PORTFOLIO.reduce((n, p) => n + p.photos.length, 0);
