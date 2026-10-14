/**
 * Images for the "AI Creative Design & Visuals" gallery.
 *
 * Only add your own work. Put image files in /public/gallery/ and add an
 * entry below - the gallery, filters and larger view update automatically.
 *
 * Example:
 * {
 *   src: "/gallery/coffee-banner.jpg",
 *   width: 1600,
 *   height: 1000,
 *   title: "Autumn coffee campaign banner",
 *   category: "advertising",
 *   tools: ["Midjourney", "Remini"],
 *   description: "Seasonal banner concept for a café's social media.",
 * },
 */

export type GalleryCategory = "advertising" | "interior" | "concepts" | "digital-art";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "advertising", label: "Advertising & Banners" },
  { id: "interior", label: "Interior Design" },
  { id: "concepts", label: "Creative Concepts" },
  { id: "digital-art", label: "Digital Art" },
];

export interface GalleryItem {
  /** Path under /public, e.g. "/gallery/my-image.jpg". */
  src: string;
  /** Original pixel size - keeps the layout stable while images load. */
  width: number;
  height: number;
  title: string;
  category: GalleryCategory;
  /** AI tools used, e.g. ["Midjourney", "Nano Banana Pro"]. Leave empty to hide the line. */
  tools: string[];
  description?: string;
  /** Alt text for screen readers. Defaults to the title. */
  alt?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/lumiere-rituals-banner.webp",
    width: 1672,
    height: 941,
    title: "Lumière: “Rituals for a Brighter You”",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Skincare campaign banner: product still life, model and a clear shop call to action.",
  },
  {
    src: "/gallery/lumiere-glow-naturally.webp",
    width: 1448,
    height: 1086,
    title: "Lumière: “Glow Naturally”",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Second banner for the same skincare concept, focused on one hero product.",
  },
  {
    src: "/gallery/aurora-travel-banner.webp",
    width: 1672,
    height: 941,
    title: "Aurora Travel: “Discover More of the World”",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Travel banner: Santorini sunset, a cruise ship and an Explore Cruises button.",
  },
  {
    src: "/gallery/good-matcha-mood.webp",
    width: 1448,
    height: 1086,
    title: "“Good Matcha Mood”",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Drinks banner for a new ceremonial matcha line.",
  },
  {
    src: "/gallery/dance-event-tallinn.webp",
    width: 1448,
    height: 1086,
    title: "Dance Event: Tallinn",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Event poster with a pink disco ball, script typography and date.",
  },
  {
    src: "/gallery/asyera-hydrogel-landing-page.webp",
    width: 941,
    height: 1672,
    title: "Asyera Beauty: product landing page",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Full landing page for a hydrogel face mask: hero, benefits, ingredients and reviews.",
  },
  {
    src: "/gallery/perfume-vanilla-still-life.webp",
    width: 1080,
    height: 1350,
    title: "Perfume still life: vanilla",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Product shot of a perfume bottle with vanilla pods and pink pepper. Concept, not commissioned.",
  },
  {
    src: "/gallery/perfume-blue-butterflies.webp",
    width: 1290,
    height: 1728,
    title: "Perfume still life: blue butterflies",
    category: "advertising",
    tools: ["Midjourney"],
    description: "The same bottle reimagined in a cool, dreamy blue setting. Concept, not commissioned.",
  },
  {
    src: "/gallery/skincare-greenhouse-portrait.webp",
    width: 1290,
    height: 1728,
    title: "Skincare portrait: greenhouse",
    category: "advertising",
    tools: ["Midjourney"],
    description: "Beauty portrait with a toner bottle among orchids and tropical plants. Concept, not commissioned.",
  },
  {
    src: "/gallery/warm-modern-living-room.webp",
    width: 1448,
    height: 1086,
    title: "Warm modern living room",
    category: "interior",
    tools: ["Nano Banana Pro"],
    description: "Living room in cream, walnut and natural textures with low evening sun.",
  },
  {
    src: "/gallery/oak-kitchen-dining.webp",
    width: 1448,
    height: 1086,
    title: "Oak kitchen with dining table",
    category: "interior",
    tools: ["Nano Banana Pro"],
    description: "Light oak kitchen with a marble backsplash and a round dining table.",
  },
  {
    src: "/gallery/terracotta-bedroom.webp",
    width: 1448,
    height: 1086,
    title: "Bedroom in cream and terracotta",
    category: "interior",
    tools: ["Nano Banana Pro"],
    description: "Calm bedroom with layered linen, terracotta accents and a round mirror.",
  },
  {
    src: "/gallery/spa-bathroom.webp",
    width: 1448,
    height: 1086,
    title: "Spa-style bathroom",
    category: "interior",
    tools: ["Nano Banana Pro"],
    description: "Stone bathroom with a backlit round mirror, walk-in rain shower and fluted vanity.",
  },
  {
    src: "/gallery/natural-modern-warm-board.webp",
    width: 1448,
    height: 1086,
    title: "“Natural Modern Warm” design board",
    category: "interior",
    tools: ["Nano Banana Pro"],
    description: "Floor plan, colour palette and room details for one open-plan living and dining space.",
  },
  {
    src: "/gallery/asyera-brand-identity.webp",
    width: 1448,
    height: 1086,
    title: "Asyera Creative Studio: brand identity",
    category: "concepts",
    tools: ["Midjourney"],
    description: "Logo, business cards, packaging, palette and Instagram profile for a creative studio.",
  },
  {
    src: "/gallery/green-glass-product-series.webp",
    width: 1116,
    height: 2000,
    title: "Fluted green glass: product series",
    category: "concepts",
    tools: ["Midjourney"],
    description: "A 15-image product campaign: one glass in different sets, materials and light.",
  },
  {
    src: "/gallery/matcha-scrub-campaign.webp",
    width: 1290,
    height: 1727,
    title: "Matcha scrub: texture campaign",
    category: "concepts",
    tools: ["Midjourney"],
    description: "9-tile campaign pairing a matcha scrub with food textures. Concept, not commissioned.",
  },
  {
    src: "/gallery/chocolate-scrub-campaign.webp",
    width: 1290,
    height: 1727,
    title: "Chocolate coffee scrub: texture campaign",
    category: "concepts",
    tools: ["Midjourney"],
    description: "The same campaign idea in chocolate, coffee and orange tones. Concept, not commissioned.",
  },
  {
    src: "/gallery/future-identity-poster.webp",
    width: 1122,
    height: 1402,
    title: "“Future Identity” poster",
    category: "digital-art",
    tools: ["Midjourney"],
    description: "Editorial poster: double-exposure portrait, mountains, clouds and liquid glass.",
  },
];
