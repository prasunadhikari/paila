import type { Destination } from "./destinations";

export type DestinationDetails = {
  subtitle: string;
  overview: string;
  thingsToDo: string[];
  travelOptions: string[];
  foodToTry: string[];
  travelTips: string[];
};

const categoryDetails: Record<
  string,
  Omit<DestinationDetails, "subtitle" | "overview">
> = {
  "Culture & Heritage": {
    thingsToDo: [
      "Explore historic temples and monuments",
      "Walk through traditional local neighborhoods",
      "Experience local culture and architecture",
      "Visit important heritage sites",
    ],
    travelOptions: [
      "Local bus or public transport",
      "Private car or taxi",
      "Tourist bus from major cities",
    ],
    foodToTry: [
      "Local Dal Bhat",
      "Momos",
      "Traditional Newari dishes",
      "Local tea and snacks",
    ],
    travelTips: [
      "Respect local customs when visiting temples and heritage sites.",
      "Carry comfortable walking shoes.",
      "Keep some cash for small shops and local transport.",
    ],
  },

  "Nature & Adventure": {
    thingsToDo: [
      "Explore scenic natural landscapes",
      "Enjoy hiking and outdoor activities",
      "Visit nearby viewpoints and natural attractions",
      "Photograph the surrounding mountains and countryside",
    ],
    travelOptions: [
      "Local bus",
      "Private vehicle or taxi",
      "Tourist vehicle from nearby cities",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Local noodles",
      "Traditional snacks",
    ],
    travelTips: [
      "Check weather conditions before outdoor activities.",
      "Carry water and basic hiking supplies.",
      "Start outdoor activities early when possible.",
    ],
  },

  Wildlife: {
    thingsToDo: [
      "Explore the surrounding wildlife areas",
      "Join a guided nature or jungle experience",
      "Look for native birds and wildlife",
      "Visit nearby villages and cultural attractions",
    ],
    travelOptions: [
      "Tourist bus",
      "Private vehicle",
      "Local jeep or guided safari vehicle",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Local Tharu dishes",
      "Fresh local snacks",
    ],
    travelTips: [
      "Use authorized guides for wildlife activities.",
      "Do not feed or disturb wild animals.",
      "Carry insect repellent during jungle visits.",
    ],
  },

  Mountains: {
    thingsToDo: [
      "Explore Himalayan landscapes",
      "Visit mountain villages and monasteries",
      "Enjoy scenic mountain photography",
      "Experience local Himalayan culture",
    ],
    travelOptions: [
      "Jeep",
      "Local bus where available",
      "Domestic flight plus local transport where applicable",
    ],
    foodToTry: [
      "Thakali Dal Bhat",
      "Tibetan-style noodles",
      "Momos",
      "Local apple products where available",
    ],
    travelTips: [
      "Allow time to adjust to altitude in high-altitude areas.",
      "Check road and weather conditions before travelling.",
      "Carry warm clothing even during warmer months.",
    ],
  },

  Trekking: {
    thingsToDo: [
      "Begin a Himalayan trekking route",
      "Explore mountain villages",
      "Enjoy panoramic mountain views",
      "Experience local culture along the trail",
    ],
    travelOptions: [
      "Tourist bus or private vehicle to the trailhead",
      "Domestic flight where applicable",
      "Local jeep for remote trailheads",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Tibetan-style bread",
      "Tea and local snacks",
    ],
    travelTips: [
      "Use appropriate trekking equipment.",
      "Check trail and weather conditions before departure.",
      "Allow enough time for acclimatization on high-altitude routes.",
      "Carry basic first-aid supplies.",
    ],
  },

  Nature: {
    thingsToDo: [
      "Enjoy the natural scenery",
      "Explore nearby forests and trails",
      "Visit viewpoints and surrounding attractions",
      "Take landscape photographs",
    ],
    travelOptions: [
      "Local bus",
      "Private vehicle",
      "Taxi or jeep",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Local seasonal dishes",
      "Traditional snacks",
    ],
    travelTips: [
      "Keep natural areas clean.",
      "Carry reusable water bottles.",
      "Check weather conditions before travelling.",
    ],
  },

  Culture: {
    thingsToDo: [
      "Explore historic streets and settlements",
      "Visit temples and cultural sites",
      "Experience traditional architecture",
      "Try local food and interact with local communities",
    ],
    travelOptions: [
      "Local bus",
      "Taxi",
      "Private vehicle",
    ],
    foodToTry: [
      "Newari cuisine",
      "Momos",
      "Dal Bhat",
      "Traditional local snacks",
    ],
    travelTips: [
      "Dress respectfully when visiting religious sites.",
      "Ask permission before photographing people.",
      "Take time to explore the destination on foot.",
    ],
  },

  "Mountain Views": {
    thingsToDo: [
      "Watch sunrise over the Himalayas",
      "Enjoy panoramic mountain views",
      "Explore nearby hiking trails",
      "Take landscape photographs",
    ],
    travelOptions: [
      "Taxi",
      "Private vehicle",
      "Local bus where available",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Local tea",
      "Traditional snacks",
    ],
    travelTips: [
      "Arrive early for sunrise viewpoints.",
      "Carry warm clothing.",
      "Clear mornings generally provide better mountain visibility.",
    ],
  },

  "Nature & Trekking": {
    thingsToDo: [
      "Trek through scenic landscapes",
      "Explore alpine lakes and mountain trails",
      "Visit local settlements",
      "Enjoy Himalayan photography",
    ],
    travelOptions: [
      "Local bus or jeep to the trailhead",
      "Private vehicle",
      "Guided trekking transport",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Tea",
      "Local mountain dishes",
    ],
    travelTips: [
      "Prepare properly for changing weather.",
      "Carry sufficient water and basic trekking equipment.",
      "Use local guides for remote routes.",
    ],
  },
};

const specificDetails: Record<
  string,
  Partial<DestinationDetails>
> = {
  kathmandu: {
    subtitle: "Nepal's historic capital and cultural heart",
    overview:
      "Kathmandu is the gateway to Nepal and a major center of history, religion, art and everyday urban life. The Kathmandu Valley is home to important temples, courtyards, palaces and traditional neighborhoods.",
    thingsToDo: [
      "Explore Kathmandu Durbar Square",
      "Visit Swayambhunath Stupa",
      "Visit Boudhanath Stupa",
      "Explore Pashupatinath Temple",
      "Walk through Thamel",
    ],
    foodToTry: [
      "Newari Khaja Set",
      "Momos",
      "Chatamari",
      "Yomari",
    ],
  },

  pokhara: {
    subtitle: "Nepal's lakeside adventure capital",
    overview:
      "Pokhara is known for Phewa Lake, spectacular Annapurna views and easy access to some of Nepal's most popular adventure activities. It is one of the country's best bases for relaxation, sightseeing and trekking.",
    thingsToDo: [
      "Boat on Phewa Lake",
      "Visit World Peace Pagoda",
      "Watch sunrise from Sarangkot",
      "Explore Davis Falls",
      "Visit Gupteshwor Mahadev Cave",
      "Enjoy Lakeside",
      "Try paragliding",
    ],
    travelOptions: [
      "Tourist bus from Kathmandu",
      "Private car or taxi",
      "Domestic flight from Kathmandu",
    ],
    foodToTry: [
      "Thakali Dal Bhat",
      "Momos",
      "Gurung dishes",
      "Local coffee",
    ],
    travelTips: [
      "Keep a full day for the main Pokhara attractions.",
      "Morning is usually better for mountain views.",
      "Lakeside is convenient for accommodation and restaurants.",
    ],
  },

  chitwan: {
    subtitle: "A gateway to Nepal's wildlife and jungle experiences",
    overview:
      "Chitwan is famous for Chitwan National Park, one of Nepal's best-known wildlife destinations. The area combines jungle landscapes, wildlife experiences and Tharu culture.",
    thingsToDo: [
      "Explore Chitwan National Park",
      "Join a guided jungle safari",
      "Look for one-horned rhinoceros",
      "Enjoy birdwatching",
      "Visit a Tharu cultural village",
      "Explore the Rapti River area",
    ],
    travelOptions: [
      "Tourist bus from Kathmandu or Pokhara",
      "Private car",
      "Flight to Bharatpur followed by local transport",
    ],
    foodToTry: [
      "Tharu cuisine",
      "Dal Bhat",
      "Momos",
      "Local fish dishes",
    ],
    travelTips: [
      "Use licensed guides for wildlife activities.",
      "Carry sunscreen and insect repellent.",
      "Early morning is a good time for wildlife activities.",
    ],
  },

  mustang: {
    subtitle: "A dramatic Himalayan region shaped by Tibetan culture",
    overview:
      "Mustang is known for its dry Himalayan landscapes, ancient settlements, monasteries, caves and distinctive Tibetan-influenced culture. Lower Mustang around Jomsom and Marpha is particularly popular with visitors.",
    thingsToDo: [
      "Explore Jomsom",
      "Visit Marpha village",
      "Visit Muktinath",
      "Explore Kagbeni",
      "Explore the landscapes around Lower Mustang",
      "Visit traditional monasteries",
      "Continue toward Upper Mustang with the required permits",
    ],
    travelOptions: [
      "Flight from Pokhara to Jomsom",
      "Jeep from Pokhara",
      "Road travel through Beni and Tatopani",
    ],
    foodToTry: [
      "Thakali Dal Bhat",
      "Buckwheat dishes",
      "Momos",
      "Mustang apple products",
    ],
    travelTips: [
      "Road conditions can change quickly.",
      "Carry warm and windproof clothing.",
      "High-altitude areas require gradual acclimatization.",
      "Upper Mustang requires special trekking arrangements and permits.",
    ],
  },

  everest: {
    subtitle: "The legendary Himalayan region surrounding Mount Everest",
    overview:
      "The Everest region is one of Nepal's most famous trekking destinations, combining high Himalayan scenery, Sherpa culture, monasteries and spectacular mountain views.",
    thingsToDo: [
      "Trek toward Everest Base Camp",
      "Explore Namche Bazaar",
      "Visit Tengboche Monastery",
      "Enjoy Himalayan viewpoints",
      "Experience Sherpa culture",
    ],
    travelOptions: [
      "Flight to Lukla followed by trekking",
      "Road travel toward lower Solukhumbu followed by trekking",
      "Organized trekking transport",
    ],
    foodToTry: [
      "Dal Bhat",
      "Sherpa stew",
      "Momos",
      "Tibetan bread",
    ],
    travelTips: [
      "Acclimatization is essential.",
      "Prepare for rapidly changing mountain weather.",
      "Use experienced trekking guides for high-altitude routes.",
    ],
  },

  lumbini: {
    subtitle: "The birthplace of Siddhartha Gautama, the Buddha",
    overview:
      "Lumbini is an important Buddhist pilgrimage destination in the Terai. The Sacred Garden and surrounding monasteries attract visitors interested in spirituality, history and Buddhist architecture.",
    thingsToDo: [
      "Visit Maya Devi Temple",
      "Explore the Sacred Garden",
      "Visit the Ashoka Pillar",
      "Explore the monastery zones",
      "Visit the Lumbini Museum area",
    ],
    travelOptions: [
      "Bus from major cities in Nepal",
      "Private car",
      "Flight to Gautam Buddha International Airport followed by local transport",
    ],
    foodToTry: [
      "Terai-style cuisine",
      "Dal Bhat",
      "Momos",
      "Local sweets",
    ],
  },

  "rara-lake": {
    subtitle: "Nepal's largest lake in the remote Himalayas",
    overview:
      "Rara Lake is a high-altitude freshwater lake surrounded by forests and mountain landscapes in Mugu District. Its remote setting makes the journey part of the experience.",
    thingsToDo: [
      "Walk around Rara Lake",
      "Enjoy lake and mountain views",
      "Explore surrounding forests",
      "Camp near the lake",
      "Photograph the Himalayan landscape",
    ],
    travelOptions: [
      "Flight toward Talcha followed by local transport and walking",
      "Road journey through western Nepal",
      "Private jeep for remote road sections",
    ],
    foodToTry: [
      "Dal Bhat",
      "Momos",
      "Local Himalayan dishes",
      "Tea",
    ],
    travelTips: [
      "Plan transport carefully because the region is remote.",
      "Carry appropriate trekking and camping equipment.",
      "Weather can change quickly.",
    ],
  },

  nagarkot: {
    subtitle: "A popular Himalayan sunrise and sunset viewpoint",
    overview:
      "Nagarkot is a hill station near Kathmandu and Bhaktapur known for panoramic mountain views, sunrise and sunset. It is a convenient short escape from the Kathmandu Valley.",
    thingsToDo: [
      "Watch Himalayan sunrise",
      "Enjoy sunset views",
      "Walk through nearby hills",
      "Visit Nagarkot View Tower",
      "Explore surrounding villages",
    ],
    travelOptions: [
      "Taxi from Kathmandu",
      "Private vehicle",
      "Local bus through Bhaktapur",
    ],
    foodToTry: [
      "Newari dishes",
      "Dal Bhat",
      "Momos",
      "Local tea",
    ],
  },

  bandipur: {
    subtitle: "A beautifully preserved hilltop Newari settlement",
    overview:
      "Bandipur is a historic hilltop town in Tanahun known for traditional Newari architecture, pedestrian-friendly streets and mountain views.",
    thingsToDo: [
      "Walk through Bandipur Bazaar",
      "Visit Khadga Devi Temple",
      "Explore Siddha Gufa",
      "Enjoy Himalayan viewpoints",
      "Experience traditional Newari architecture",
    ],
    travelOptions: [
      "Tourist bus from Kathmandu or Pokhara",
      "Private vehicle",
      "Local bus from Dumre",
    ],
    foodToTry: [
      "Newari cuisine",
      "Dal Bhat",
      "Momos",
      "Local snacks",
    ],
  },

  bhaktapur: {
    subtitle: "A living center of Newari art, architecture and heritage",
    overview:
      "Bhaktapur is one of the Kathmandu Valley's major historic cities, famous for its preserved squares, temples, traditional houses and Newari craftsmanship.",
    thingsToDo: [
      "Explore Bhaktapur Durbar Square",
      "Visit Nyatapola Temple",
      "See the Golden Gate",
      "Visit Dattatreya Square",
      "Try traditional Juju Dhau",
    ],
    foodToTry: [
      "Juju Dhau",
      "Newari Khaja",
      "Chatamari",
      "Bara",
    ],
  },

  janakpur: {
    subtitle: "A major religious and cultural center of the Madhesh",
    overview:
      "Janakpur is renowned for the Janaki Mandir and its association with the Ramayana tradition. The city is an important center of Maithili culture, art and pilgrimage.",
    thingsToDo: [
      "Visit Janaki Mandir",
      "Explore Ram Mandir",
      "Visit historic ponds around the city",
      "Experience Maithili culture",
      "Explore local markets",
    ],
    foodToTry: [
      "Maithili cuisine",
      "Mithila sweets",
      "Dal Bhat",
      "Local snacks",
    ],
  },

  "world-peace-pagoda": {
    subtitle: "A hilltop Buddhist monument overlooking Phewa Lake",
    overview:
      "The World Peace Pagoda sits on a hill above Pokhara and provides broad views toward Phewa Lake, Pokhara Valley and the Annapurna range.",
    thingsToDo: [
      "Visit the World Peace Pagoda",
      "Enjoy views of Phewa Lake",
      "Hike through the surrounding forest",
      "Photograph the Annapurna range",
    ],
  },

  sarangkot: {
    subtitle: "One of Nepal's most popular Himalayan viewpoints",
    overview:
      "Sarangkot is a hilltop viewpoint above Pokhara famous for sunrise, sunset and views toward the Annapurna, Dhaulagiri and Machhapuchhre ranges.",
    thingsToDo: [
      "Watch sunrise",
      "Enjoy Himalayan panoramas",
      "Try paragliding",
      "Explore nearby hiking trails",
    ],
  },

  muktinath: {
    subtitle: "A sacred pilgrimage site in the Mustang region",
    overview:
      "Muktinath is an important pilgrimage destination visited by both Hindu and Buddhist pilgrims. It lies in the high Himalayan landscape of Mustang.",
    thingsToDo: [
      "Visit Muktinath Temple",
      "Explore nearby Buddhist sites",
      "Experience the surrounding Himalayan landscape",
      "Visit nearby Kagbeni and Jomsom",
    ],
  },

  marpha: {
    subtitle: "A picturesque Thakali village in Lower Mustang",
    overview:
      "Marpha is known for its stone-paved streets, traditional whitewashed houses, Thakali culture and apple orchards in the Kali Gandaki valley.",
    thingsToDo: [
      "Walk through the old village",
      "Visit local monasteries",
      "Explore apple orchards",
      "Taste local apple products",
    ],
  },

  "lo-manthang": {
    subtitle: "The historic walled settlement of Upper Mustang",
    overview:
      "Lo Manthang is a historic settlement in Upper Mustang known for Tibetan-influenced architecture, monasteries and the distinctive high-altitude landscape of the former Mustang kingdom.",
    thingsToDo: [
      "Explore the old walled settlement",
      "Visit historic monasteries",
      "Explore traditional houses",
      "Experience Upper Mustang culture",
    ],
    travelTips: [
      "Upper Mustang requires special trekking arrangements and permits.",
      "Travel with an experienced local guide.",
      "Prepare for cold, dry and windy conditions.",
    ],
  },

  ilam: {
    subtitle: "Nepal's famous eastern tea-growing destination",
    overview:
      "Ilam is known for tea gardens, green hills, cool weather and scenic countryside in eastern Nepal.",
    thingsToDo: [
      "Visit tea gardens",
      "Explore Kanyam",
      "Enjoy hilltop viewpoints",
      "Walk through tea-growing areas",
      "Experience local eastern Nepal culture",
    ],
    foodToTry: [
      "Nepali tea",
      "Dal Bhat",
      "Momos",
      "Local snacks",
    ],
  },

  "khaptad": {
    subtitle: "A peaceful highland landscape in far-western Nepal",
    overview:
      "Khaptad National Park is known for rolling grasslands, forests and peaceful high-altitude landscapes in western Nepal.",
    thingsToDo: [
      "Explore Khaptad's grasslands",
      "Hike through forests",
      "Visit Khaptad Baba Ashram",
      "Enjoy mountain landscapes",
      "Experience the quiet natural environment",
    ],
    travelOptions: [
      "Road journey toward the park access area",
      "Local jeep",
      "Trekking to the park",
    ],
  },

  "shey-phoksundo-national-park": {
    subtitle: "A remote Himalayan park of lakes, mountains and wildlife",
    overview:
      "Shey Phoksundo National Park is famous for Phoksundo Lake, dramatic mountain scenery, remote villages and Himalayan ecosystems.",
    thingsToDo: [
      "Visit Phoksundo Lake",
      "Explore mountain trails",
      "Visit Ringmo village",
      "Experience Dolpo culture",
      "Enjoy Himalayan photography",
    ],
    travelOptions: [
      "Flight toward Dolpo followed by trekking",
      "Local jeep where roads exist",
      "Organized trekking route",
    ],
    travelTips: [
      "Remote areas require careful planning.",
      "Carry sufficient supplies for trekking sections.",
      "Use an experienced guide.",
    ],
  },

  "sagarmatha-national-park": {
    subtitle: "A UNESCO-listed Himalayan national park",
    overview:
      "Sagarmatha National Park protects a spectacular Himalayan landscape around the Everest region and is home to high mountains, glaciers, Sherpa settlements and diverse wildlife.",
    thingsToDo: [
      "Trek through the Everest region",
      "Visit Namche Bazaar",
      "Visit Tengboche",
      "Explore Himalayan viewpoints",
      "Experience Sherpa culture",
    ],
  },

  "bardiya-national-park": {
    subtitle: "A major wildlife destination in western Nepal",
    overview:
      "Bardiya National Park protects extensive Terai forests and is known for wildlife, birdwatching, river landscapes and jungle experiences.",
    thingsToDo: [
      "Join a jungle safari",
      "Go birdwatching",
      "Explore the Karnali River area",
      "Look for rhinoceros and other wildlife",
      "Experience local Tharu culture",
    ],
    travelOptions: [
      "Bus from Kathmandu or Nepalgunj",
      "Private vehicle",
      "Flight to Nepalgunj followed by road transport",
    ],
  },

  "parsa-national-park": {
    subtitle: "A protected forest landscape in southern Nepal",
    overview:
      "Parsa National Park protects an important section of the Terai's forest ecosystem and provides opportunities for wildlife and nature experiences.",
    thingsToDo: [
      "Explore the national park",
      "Join guided wildlife activities",
      "Enjoy birdwatching",
      "Explore surrounding forests",
    ],
  },

  "banke-national-park": {
    subtitle: "A protected Terai forest landscape",
    overview:
      "Banke National Park protects forests and wildlife habitat in western Nepal and forms part of an important protected-area landscape.",
    thingsToDo: [
      "Explore forest landscapes",
      "Enjoy birdwatching",
      "Join guided wildlife activities",
      "Explore nearby communities",
    ],
  },
};

function createFallbackDetails(
  destination: Destination
): DestinationDetails {
  const category =
    categoryDetails[destination.category] ??
    categoryDetails["Nature"];

  return {
    subtitle: `${destination.category} destination in ${destination.location}`,
    overview: destination.description,
    thingsToDo: category.thingsToDo.map((item) =>
      item.replace(
        /the surrounding|the natural scenery|nearby/i,
        destination.name
      )
    ),
    travelOptions: category.travelOptions,
    foodToTry: category.foodToTry,
    travelTips: category.travelTips,
  };
}

export function getDestinationDetails(
  destination: Destination
): DestinationDetails {
  const fallback = createFallbackDetails(destination);

  const specific = specificDetails[destination.slug];

  return {
    ...fallback,
    ...specific,
    thingsToDo:
      specific?.thingsToDo?.length
        ? specific.thingsToDo
        : fallback.thingsToDo,
    travelOptions:
      specific?.travelOptions?.length
        ? specific.travelOptions
        : fallback.travelOptions,
    foodToTry:
      specific?.foodToTry?.length
        ? specific.foodToTry
        : fallback.foodToTry,
    travelTips:
      specific?.travelTips?.length
        ? specific.travelTips
        : fallback.travelTips,
  };
}