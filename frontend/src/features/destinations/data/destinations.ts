import { destinationImages } from "./destinationImages";

export type Destination = {
  slug: string;
  name: string;
  location: string;
  province: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  bestTime: string;
};

export const destinations: Destination[] = [
  {
    slug: "kathmandu",
    name: "Kathmandu",
    location: "Kathmandu Valley",
    province: "Bagmati Province",
    category: "Culture & Heritage",
    description:
      "Nepal's vibrant capital, filled with ancient temples, historic squares, local markets and rich cultural experiences.",
    image: destinationImages.kathmandu,
    rating: 4.8,
    bestTime: "September – November & March – May",
  },

  {
    slug: "pokhara",
    name: "Pokhara",
    location: "Kaski",
    province: "Gandaki Province",
    category: "Nature & Adventure",
    description:
      "A beautiful lakeside city surrounded by mountains, adventure activities and spectacular Himalayan views.",
    image: destinationImages.pokhara,
    rating: 4.9,
    bestTime: "October – April",
  },

  {
    slug: "chitwan",
    name: "Chitwan",
    location: "Chitwan",
    province: "Bagmati Province",
    category: "Wildlife",
    description:
      "Experience jungle safaris, wildlife, rivers and the incredible biodiversity of Chitwan National Park.",
    image: destinationImages.chitwan,
    rating: 4.7,
    bestTime: "October – March",
  },

  {
    slug: "mustang",
    name: "Mustang",
    location: "Mustang",
    province: "Gandaki Province",
    category: "Mountains",
    description:
      "Explore dramatic Himalayan landscapes, ancient monasteries, Tibetan-influenced culture and remote villages.",
    image: destinationImages.mustang,
    rating: 4.9,
    bestTime: "March – May & September – November",
  },

  {
    slug: "everest",
    name: "Everest",
    location: "Solukhumbu",
    province: "Koshi Province",
    category: "Trekking",
    description:
      "Home to Mount Everest and one of the world's most famous trekking regions.",
    image: destinationImages.everest,
    rating: 5.0,
    bestTime: "March – May & October – November",
  },

  {
    slug: "lumbini",
    name: "Lumbini",
    location: "Rupandehi",
    province: "Lumbini Province",
    category: "Culture & Heritage",
    description:
      "The birthplace of Buddha and one of the world's most important spiritual and archaeological destinations.",
    image: destinationImages.lumbini,
    rating: 4.7,
    bestTime: "October – March",
  },

  {
    slug: "rara-lake",
    name: "Rara Lake",
    location: "Mugu",
    province: "Karnali Province",
    category: "Nature",
    description:
      "Nepal's largest lake, surrounded by peaceful forests and spectacular Himalayan landscapes.",
    image: destinationImages["rara-lake"],
    rating: 4.9,
    bestTime: "September – November & April – May",
  },

  {
    slug: "nagarkot",
    name: "Nagarkot",
    location: "Bhaktapur",
    province: "Bagmati Province",
    category: "Mountain Views",
    description:
      "A peaceful hill station famous for sunrise, sunset and panoramic Himalayan views.",
    image: destinationImages.nagarkot,
    rating: 4.7,
    bestTime: "October – May",
  },

  {
    slug: "bandipur",
    name: "Bandipur",
    location: "Tanahun",
    province: "Gandaki Province",
    category: "Culture & Heritage",
    description:
      "A charming hilltop town known for traditional architecture, mountain views and peaceful streets.",
    image: destinationImages.bandipur,
    rating: 4.8,
    bestTime: "October – May",
  },

  {
    slug: "kirtipur",
    name: "Kirtipur",
    location: "Kathmandu",
    province: "Bagmati Province",
    category: "Culture",
    description:
      "A historic hilltop town offering traditional Newari culture, temples and views of Kathmandu Valley.",
    image: destinationImages.kirtipur,
    rating: 4.6,
    bestTime: "September – May",
  },

  {
    slug: "panauti",
    name: "Panauti",
    location: "Kavrepalanchok",
    province: "Bagmati Province",
    category: "Culture & Heritage",
    description:
      "A historic Newari settlement known for temples, traditional homes and peaceful surroundings.",
    image: destinationImages.panauti,
    rating: 4.5,
    bestTime: "September – May",
  },

  {
    slug: "panch-pokhari",
    name: "Panch Pokhari",
    location: "Sindhupalchok",
    province: "Bagmati Province",
    category: "Nature & Trekking",
    description:
      "A beautiful group of sacred alpine lakes surrounded by dramatic Himalayan scenery.",
    image: destinationImages["panch-pokhari"],
    rating: 4.8,
    bestTime: "March – May & September – November",
  },

  {
    slug: "sarangkot",
    name: "Sarangkot",
    location: "Pokhara",
    province: "Gandaki Province",
    category: "Mountain Views",
    description:
      "One of Nepal's best sunrise viewpoints with panoramic views of the Annapurna range.",
    image: destinationImages.sarangkot,
    rating: 4.9,
    bestTime: "October – April",
  },

  {
    slug: "tansen",
    name: "Tansen",
    location: "Palpa",
    province: "Lumbini Province",
    category: "Culture & Heritage",
    description:
      "A beautiful hill town known for traditional Newari architecture and views across western Nepal.",
    image: destinationImages.tansen,
    rating: 4.6,
    bestTime: "October – May",
  },
];

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return destinations.find((destination) => destination.slug === slug);
};