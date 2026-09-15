import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  ChevronRight,
  Compass,
  MapPin,
  Plane,
  Sparkles,
  Star,
  Train,
  Wallet,
} from "lucide-react";

import { destinations, type Destination } from "../data/destinations";
import Sidebar from "../../../components/layout/Sidebar";

type Activity = {
  name: string;
  description: string;
};

type TravelOption = {
  type: string;
  icon: string;
  description: string;
};

type DestinationDetails = {
  subtitle: string;
  activities: Activity[];
  travelOptions: TravelOption[];
};

const detailsBySlug: Record<string, DestinationDetails> = {
  kathmandu: {
    subtitle: "The Cultural Heart of Nepal",
    activities: [
      {
        name: "Kathmandu Durbar Square",
        description:
          "Explore historic palaces, temples, courtyards and traditional Newari architecture in the heart of Kathmandu.",
      },
      {
        name: "Swayambhunath",
        description:
          "Visit the famous hilltop Buddhist stupa and enjoy panoramic views across Kathmandu Valley.",
      },
      {
        name: "Pashupatinath Temple",
        description:
          "Discover one of Nepal's most important Hindu pilgrimage sites on the banks of the Bagmati River.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Tribhuvan International Airport connects Kathmandu with major domestic and international destinations.",
      },
      {
        type: "Tourist Bus",
        icon: "🚌",
        description:
          "Tourist buses connect Kathmandu with Pokhara, Chitwan and many other destinations across Nepal.",
      },
      {
        type: "Taxi / Car",
        icon: "🚗",
        description:
          "Taxis and private vehicles are convenient for exploring Kathmandu Valley.",
      },
    ],
  },

  pokhara: {
    subtitle: "Gateway to the Annapurna Himalayas",
    activities: [
      {
        name: "Phewa Lake",
        description:
          "Enjoy boating on the peaceful lake while looking toward the Annapurna and Machhapuchhre mountains.",
      },
      {
        name: "Sarangkot",
        description:
          "Watch sunrise over the Himalayas and enjoy one of Nepal's most famous mountain viewpoints.",
      },
      {
        name: "World Peace Pagoda",
        description:
          "Visit the white Buddhist stupa overlooking Phewa Lake, Pokhara and the surrounding mountains.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Regular flights connect Kathmandu with Pokhara International Airport.",
      },
      {
        type: "Tourist Bus",
        icon: "🚌",
        description:
          "Tourist buses provide a popular and affordable road connection from Kathmandu.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "A private vehicle offers flexibility to stop at viewpoints and towns along the route.",
      },
    ],
  },

  chitwan: {
    subtitle: "Into the Wild",
    activities: [
      {
        name: "Jungle Safari",
        description:
          "Explore Chitwan's forests and grasslands while looking for one-horned rhinoceros, deer, crocodiles and birds.",
      },
      {
        name: "Tharu Village",
        description:
          "Experience local Tharu culture, traditional architecture, food and community life.",
      },
      {
        name: "Canoe Ride",
        description:
          "Travel along the Rapti River and look for crocodiles, water birds and other wildlife.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Fly from Kathmandu to Bharatpur Airport and continue by road to Sauraha.",
      },
      {
        type: "Tourist Bus",
        icon: "🚌",
        description:
          "Tourist buses connect Kathmandu and Pokhara with the Chitwan area.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "A private vehicle provides a comfortable road journey with flexible stops.",
      },
    ],
  },

  mustang: {
    subtitle: "The Hidden Himalayan Kingdom",
    activities: [
      {
        name: "Muktinath",
        description:
          "Visit the sacred pilgrimage site surrounded by the dramatic landscapes of the Mustang region.",
      },
      {
        name: "Marpha",
        description:
          "Explore the stone-paved village famous for apple orchards, traditional houses and mountain scenery.",
      },
      {
        name: "Lo Manthang",
        description:
          "Discover the historic walled settlement, monasteries and Tibetan-influenced culture of Upper Mustang.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Fly from Pokhara to Jomsom and continue through Mustang by road.",
      },
      {
        type: "Jeep",
        icon: "🚙",
        description:
          "Jeep travel is widely used for reaching remote parts of Mustang.",
      },
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Local buses provide a lower-cost option on established road routes.",
      },
    ],
  },

  everest: {
    subtitle: "Home of Mount Everest",
    activities: [
      {
        name: "Everest Base Camp Trek",
        description:
          "Trek through the Khumbu region toward the legendary Everest Base Camp.",
      },
      {
        name: "Namche Bazaar",
        description:
          "Explore the famous Sherpa trading town and acclimatization center of the Everest region.",
      },
      {
        name: "Tengboche Monastery",
        description:
          "Visit the important Buddhist monastery surrounded by spectacular Himalayan peaks.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Fly from Kathmandu to Lukla for the classic Everest trekking route.",
      },
      {
        type: "Trek",
        icon: "🥾",
        description:
          "Most major attractions in the Everest region are reached on foot.",
      },
      {
        type: "Helicopter",
        icon: "🚁",
        description:
          "Helicopter tours provide a faster way to experience Everest and the Khumbu landscape.",
      },
    ],
  },

  lumbini: {
    subtitle: "Birthplace of Lord Buddha",
    activities: [
      {
        name: "Maya Devi Temple",
        description:
          "Visit the sacred site traditionally identified as the birthplace of Siddhartha Gautama, the Buddha.",
      },
      {
        name: "Lumbini Monastic Zone",
        description:
          "Explore monasteries and Buddhist temples built by different countries and Buddhist traditions.",
      },
      {
        name: "Sacred Garden",
        description:
          "Walk through the peaceful archaeological and spiritual area surrounding the Maya Devi Temple.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Fly to Gautam Buddha International Airport and continue by local transport.",
      },
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Regular buses connect Lumbini with major cities in Nepal.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Private vehicles provide convenient access from Bhairahawa and surrounding cities.",
      },
    ],
  },

  "rara-lake": {
    subtitle: "Nepal's Largest Lake",
    activities: [
      {
        name: "Rara Lake",
        description:
          "Enjoy the deep blue waters of Nepal's largest lake surrounded by forests and mountain scenery.",
      },
      {
        name: "Rara National Park",
        description:
          "Explore the surrounding protected forests and look for Himalayan wildlife and birds.",
      },
      {
        name: "Lake View Hike",
        description:
          "Hike to elevated viewpoints for wide views over Rara Lake and the surrounding mountains.",
      },
    ],
    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description:
          "Flights to Talcha Airport near Rara provide the quickest access to the region.",
      },
      {
        type: "Jeep",
        icon: "🚙",
        description:
          "Local jeeps connect the airport and surrounding areas with the lake.",
      },
      {
        type: "Trek",
        icon: "🥾",
        description:
          "Walking routes are available for travelers who want to experience the remote landscape.",
      },
    ],
  },

  nagarkot: {
    subtitle: "Himalayan Sunrise Viewpoint",
    activities: [
      {
        name: "Sunrise View",
        description:
          "Wake early for panoramic sunrise views across the Himalayan range on clear mornings.",
      },
      {
        name: "Nagarkot View Tower",
        description:
          "Visit elevated viewpoints for broad views of the surrounding hills and mountains.",
      },
      {
        name: "Hiking",
        description:
          "Enjoy scenic walks through forests, villages and countryside around Nagarkot.",
      },
    ],
    travelOptions: [
      {
        type: "Taxi / Car",
        icon: "🚗",
        description:
          "Nagarkot is easily reached by private vehicle or taxi from Kathmandu Valley.",
      },
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Local buses connect Bhaktapur and Kathmandu with Nagarkot.",
      },
      {
        type: "Hike",
        icon: "🥾",
        description:
          "Day hikes from Bhaktapur and surrounding areas offer a scenic alternative.",
      },
    ],
  },

  bandipur: {
    subtitle: "A Living Newari Hill Town",
    activities: [
      {
        name: "Bandipur Bazaar",
        description:
          "Walk through the beautifully preserved traditional streets and historic buildings of Bandipur.",
      },
      {
        name: "Siddha Gufa",
        description:
          "Explore one of Nepal's notable caves located near Bandipur.",
      },
      {
        name: "Mountain Viewpoints",
        description:
          "Enjoy panoramic views of the Himalayan range and surrounding hills from the town.",
      },
    ],
    travelOptions: [
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Buses connect Bandipur with Kathmandu, Pokhara and other major towns.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Private vehicles provide convenient access from the Prithvi Highway.",
      },
      {
        type: "Local Jeep",
        icon: "🚙",
        description:
          "Local transport connects the highway with Bandipur Bazaar.",
      },
    ],
  },

  kirtipur: {
    subtitle: "Historic Newari Heritage Town",
    activities: [
      {
        name: "Bagh Bhairab Temple",
        description:
          "Visit the historic hilltop temple dedicated to Bagh Bhairab.",
      },
      {
        name: "Uma Maheshwar Temple",
        description:
          "Explore the traditional temple and enjoy views across Kathmandu Valley.",
      },
      {
        name: "Old Kirtipur",
        description:
          "Walk through narrow historic streets lined with traditional Newari houses.",
      },
    ],
    travelOptions: [
      {
        type: "Taxi",
        icon: "🚕",
        description:
          "Taxis provide quick access from central Kathmandu.",
      },
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Local buses connect Kirtipur with Kathmandu and surrounding areas.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Private vehicles are convenient for exploring Kirtipur and nearby attractions.",
      },
    ],
  },

  panauti: {
    subtitle: "Ancient Newari Heritage Town",
    activities: [
      {
        name: "Indreshwar Mahadev Temple",
        description:
          "Visit one of Panauti's most important historic temples and architectural landmarks.",
      },
      {
        name: "Panauti Old Town",
        description:
          "Explore traditional Newari houses, courtyards, temples and historic streets.",
      },
      {
        name: "Riverside Heritage",
        description:
          "Discover the culturally important confluence of the Roshi and Pungamati rivers.",
      },
    ],
    travelOptions: [
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Local buses connect Panauti with Kathmandu and nearby towns.",
      },
      {
        type: "Taxi / Car",
        icon: "🚗",
        description:
          "Private transport offers a comfortable trip through Kavrepalanchok.",
      },
      {
        type: "Hike",
        icon: "🥾",
        description:
          "Panauti can be combined with scenic hikes around the Kathmandu Valley rim.",
      },
    ],
  },

  "panch-pokhari": {
    subtitle: "Sacred High-Altitude Lakes",
    activities: [
      {
        name: "Panch Pokhari",
        description:
          "Discover the group of five sacred alpine lakes surrounded by high Himalayan landscapes.",
      },
      {
        name: "Mountain Trek",
        description:
          "Experience remote trails, forests, villages and dramatic mountain scenery.",
      },
      {
        name: "Viewpoint",
        description:
          "Enjoy expansive views of the surrounding Himalayan ranges from high elevations.",
      },
    ],
    travelOptions: [
      {
        type: "Jeep",
        icon: "🚙",
        description:
          "Off-road transport can take travelers toward the trekking starting areas.",
      },
      {
        type: "Trek",
        icon: "🥾",
        description:
          "The main journey to Panch Pokhari is completed on foot.",
      },
      {
        type: "Local Bus",
        icon: "🚌",
        description:
          "Local road transport can be used for sections of the journey.",
      },
    ],
  },

  sarangkot: {
    subtitle: "Pokhara's Famous Mountain Viewpoint",
    activities: [
      {
        name: "Himalayan Sunrise",
        description:
          "Watch the first sunlight illuminate Annapurna, Dhaulagiri and Machhapuchhre on clear mornings.",
      },
      {
        name: "Paragliding",
        description:
          "Experience tandem paragliding above Pokhara Valley with views of the surrounding mountains.",
      },
      {
        name: "Mountain View",
        description:
          "Enjoy one of the most accessible panoramic viewpoints around Pokhara.",
      },
    ],
    travelOptions: [
      {
        type: "Taxi / Car",
        icon: "🚗",
        description:
          "Private vehicles and taxis can reach Sarangkot directly from Pokhara.",
      },
      {
        type: "Tour",
        icon: "🚌",
        description:
          "Local sunrise tours commonly include transportation from Pokhara.",
      },
      {
        type: "Hike",
        icon: "🥾",
        description:
          "Scenic walking routes connect Sarangkot with Pokhara Valley.",
      },
    ],
  },

  tansen: {
    subtitle: "Historic Hill Town of Palpa",
    activities: [
      {
        name: "Tansen Bazaar",
        description:
          "Explore the historic center with traditional Newari architecture and local markets.",
      },
      {
        name: "Srinagar Hill",
        description:
          "Enjoy panoramic views over the hills and surrounding countryside.",
      },
      {
        name: "Rani Mahal",
        description:
          "Visit the historic palace located beside the Kali Gandaki River.",
      },
    ],
    travelOptions: [
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Buses connect Tansen with Pokhara, Butwal and other cities.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Private vehicles provide a flexible journey through western Nepal.",
      },
      {
        type: "Local Transport",
        icon: "🚙",
        description:
          "Local jeeps and vehicles can be used for nearby attractions.",
      },
    ],
  },
};

function createGenericDetails(destination: Destination): DestinationDetails {
  const category = destination.category.toLowerCase();

  if (
    category.includes("wildlife") ||
    category.includes("nature") ||
    category.includes("national park")
  ) {
    return {
      subtitle: `Discover the Natural Beauty of ${destination.name}`,
      activities: [
        {
          name: `Explore ${destination.name}`,
          description: `Discover the natural landscapes, local environment and distinctive attractions around ${destination.name}.`,
        },
        {
          name: "Nature & Wildlife",
          description:
            "Experience forests, rivers, landscapes and local wildlife characteristic of this part of Nepal.",
        },
        {
          name: "Scenic Walks",
          description:
            "Enjoy peaceful walks and viewpoints while experiencing the surrounding natural scenery.",
        },
      ],
      travelOptions: [
        {
          type: "Bus",
          icon: "🚌",
          description:
            "Local and long-distance buses connect the surrounding towns and transport hubs.",
        },
        {
          type: "Private Car",
          icon: "🚗",
          description:
            "A private vehicle provides flexibility when visiting remote attractions.",
        },
        {
          type: "Jeep",
          icon: "🚙",
          description:
            "Local jeeps are useful for reaching destinations beyond major paved roads.",
        },
      ],
    };
  }

  if (
    category.includes("trek") ||
    category.includes("mountain") ||
    category.includes("adventure")
  ) {
    return {
      subtitle: `Adventure in the Himalayas of ${destination.name}`,
      activities: [
        {
          name: "Mountain Exploration",
          description: `Explore the mountain landscapes and viewpoints around ${destination.name}.`,
        },
        {
          name: "Trekking",
          description:
            "Experience walking trails through mountain villages, forests and highland landscapes.",
        },
        {
          name: "Local Culture",
          description:
            "Meet local communities and discover the traditions, food and lifestyle of the region.",
        },
      ],
      travelOptions: [
        {
          type: "Bus",
          icon: "🚌",
          description:
            "Buses can be used for the accessible road sections of the journey.",
        },
        {
          type: "Jeep",
          icon: "🚙",
          description:
            "Local jeeps are commonly useful on mountainous and less-developed roads.",
        },
        {
          type: "Trek",
          icon: "🥾",
          description:
            "The final approach to many Himalayan attractions is completed on foot.",
        },
      ],
    };
  }

  if (
    category.includes("culture") ||
    category.includes("heritage") ||
    category.includes("spiritual")
  ) {
    return {
      subtitle: `Culture, Heritage & History of ${destination.name}`,
      activities: [
        {
          name: "Historic Sites",
          description: `Explore temples, monuments, traditional buildings and historic places around ${destination.name}.`,
        },
        {
          name: "Local Culture",
          description:
            "Experience local traditions, architecture, food and community life.",
        },
        {
          name: "Heritage Walk",
          description:
            "Walk through historic areas and discover the stories behind the destination.",
        },
      ],
      travelOptions: [
        {
          type: "Bus",
          icon: "🚌",
          description:
            "Public buses provide an affordable way to reach the destination.",
        },
        {
          type: "Taxi / Car",
          icon: "🚗",
          description:
            "Private transport is convenient for exploring the destination and nearby attractions.",
        },
        {
          type: "Local Transport",
          icon: "🚙",
          description:
            "Local vehicles are available for nearby areas and attractions.",
        },
      ],
    };
  }

  return {
    subtitle: `Discover ${destination.name}, Nepal`,
    activities: [
      {
        name: `Explore ${destination.name}`,
        description: `Discover the main attractions, scenery and experiences that make ${destination.name} worth visiting.`,
      },
      {
        name: "Local Experience",
        description:
          "Experience local food, traditions, communities and everyday life in the surrounding area.",
      },
      {
        name: "Scenic Exploration",
        description:
          "Enjoy the landscapes, viewpoints and nearby places of interest around the destination.",
      },
    ],
    travelOptions: [
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Buses are one of the most affordable ways to travel around Nepal.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Private vehicles provide flexibility and convenience for exploring the area.",
      },
      {
        type: "Local Transport",
        icon: "🚙",
        description:
          "Local taxis, jeeps and other transport can be used for nearby attractions.",
      },
    ],
  };
}

function getTravelIcon(type: string) {
  const value = type.toLowerCase();

  if (value.includes("flight")) {
    return <Plane className="h-5 w-5" />;
  }

  if (
    value.includes("car") ||
    value.includes("taxi") ||
    value.includes("jeep")
  ) {
    return <Car className="h-5 w-5" />;
  }

  if (value.includes("bus")) {
    return <Train className="h-5 w-5" />;
  }

  return <Compass className="h-5 w-5" />;
}

export default function DestinationPage() {
  const { destination } = useParams<{ destination: string }>();

  const slug = destination?.toLowerCase().trim() ?? "";

  const place = destinations.find(
    (item) => item.slug.toLowerCase() === slug
  );

  if (!place) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#f8f8f6]">
        <Sidebar />

        <main className="lg:ml-64 flex min-h-screen items-center justify-center px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-10">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 sm:h-16 sm:w-16">
              <MapPin className="h-6 w-6 text-emerald-500 sm:h-7 sm:w-7" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Paila
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Destination not found
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              We couldn't find this destination in the current destination
              database.
            </p>

            <Link
              to="/destinations"
              className="mt-7 inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:px-6"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              Back to destinations
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const details = detailsBySlug[place.slug] ?? createGenericDetails(place);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f8f6] text-slate-900">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 min-w-0">
        <main>
          {/* =====================================================
              HERO
          ====================================================== */}
          <section className="relative h-[430px] overflow-hidden bg-slate-900 sm:h-[480px] lg:h-[500px]">
            <img
              src={place.image}
              alt={`${place.name}, ${place.location}, Nepal`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

            {/* Top navigation */}
            <div className="absolute left-0 right-0 top-0">
              <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-24 lg:px-8 lg:pt-8 xl:px-10">
                <Link
                  to="/destinations"
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/35 sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  <span>All destinations</span>
                </Link>
              </div>
            </div>

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-7xl px-4 pb-7 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12 xl:px-10">
                <div className="max-w-4xl min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-300 sm:text-xs sm:tracking-[0.15em]">
                    <span>{place.location}</span>
                    <span className="text-white/40">•</span>
                    <span>{place.province}</span>
                  </div>

                  <h1 className="mt-2 break-words text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:mt-3 sm:text-6xl lg:text-7xl">
                    {place.name}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-xl sm:leading-7">
                    {details.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINATION INFO
          ====================================================== */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
              <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {/* Rating */}
                <div className="flex min-w-0 items-center gap-3 py-5 sm:px-5 sm:py-6 lg:px-4 xl:px-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 sm:h-11 sm:w-11">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Rating
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      {place.rating.toFixed(1)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex min-w-0 items-center gap-3 py-5 sm:px-5 sm:py-6 lg:px-4 xl:px-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 sm:h-11 sm:w-11">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-slate-900">
                      {place.location}
                    </p>
                  </div>
                </div>

                {/* Province */}
                <div className="flex min-w-0 items-center gap-3 py-5 sm:px-5 sm:py-6 lg:px-4 xl:px-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-11 sm:w-11">
                    <Compass className="h-5 w-5 text-blue-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Province
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-slate-900">
                      {place.province}
                    </p>
                  </div>
                </div>

                {/* Best Time */}
                <div className="flex min-w-0 items-center gap-3 py-5 sm:px-5 sm:py-6 lg:px-4 xl:px-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 sm:h-11 sm:w-11">
                    <CalendarDays className="h-5 w-5 text-violet-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Best time
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-slate-900">
                      {place.bestTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              ABOUT
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:px-10">
            <div className="grid min-w-0 gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Discover
                </p>

                <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                  About {place.name}
                </h2>
              </div>

              <div className="min-w-0">
                <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  {place.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  <span className="max-w-full rounded-full bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                    {place.category}
                  </span>

                  <span className="max-w-full rounded-full bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                    {place.province}
                  </span>

                  <span className="max-w-full rounded-full bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                    {place.bestTime}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              THINGS TO DO
          ====================================================== */}
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:px-10">
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Experiences
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                    Things to do
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                    Make the most of your visit with experiences worth adding
                    to your journey.
                  </p>
                </div>

                <Compass className="hidden h-8 w-8 shrink-0 text-emerald-200 sm:block" />
              </div>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {details.activities.map((activity, index) => (
                  <article
                    key={activity.name}
                    className="group min-w-0 rounded-2xl border border-slate-200 bg-[#f8f8f6] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-emerald-600 shadow-sm ring-1 ring-slate-100">
                        0{index + 1}
                      </span>

                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-emerald-500" />
                    </div>

                    <h3 className="mt-6 break-words text-lg font-bold text-slate-900 sm:mt-7 sm:text-xl">
                      {activity.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {activity.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              TRAVEL OPTIONS
          ====================================================== */}
          <section className="bg-[#f8f8f6]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:px-10">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Getting there
                </p>

                <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                  How to get to {place.name}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Choose a travel option that fits your route and style.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {details.travelOptions.map((option) => (
                  <article
                    key={option.type}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      {getTravelIcon(option.type)}
                    </div>

                    <div className="mt-5 flex min-w-0 items-center gap-2 sm:mt-6">
                      <h3 className="break-words text-lg font-bold text-slate-900">
                        {option.type}
                      </h3>

                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {option.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              QUICK SUMMARY
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 xl:px-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-9">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Destination
                  </p>

                  <p className="mt-2 break-words text-base font-bold text-slate-900 sm:text-lg">
                    {place.name}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Category
                  </p>

                  <p className="mt-2 break-words text-base font-bold text-slate-900 sm:text-lg">
                    {place.category}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Best time
                  </p>

                  <p className="mt-2 break-words text-base font-bold text-slate-900 sm:text-lg">
                    {place.bestTime}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Rating
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-base font-bold text-slate-900 sm:text-lg">
                    <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                    {place.rating.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              PAILA AI CTA
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 xl:px-10">
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 sm:rounded-[2rem]">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative flex min-w-0 flex-col justify-between gap-8 p-5 sm:gap-10 sm:p-8 lg:flex-row lg:items-center lg:p-12">
                <div className="min-w-0 max-w-2xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    Paila AI
                  </div>

                  <h2 className="mt-4 break-words text-2xl font-bold tracking-tight text-white sm:text-4xl">
                    Planning a trip to {place.name}?
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                    Chat with Paila to explore ideas, transportation, places
                    to visit and ways to make your journey around Nepal easier.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                    <Link
                      to="/chat"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:w-auto sm:px-6"
                    >
                      Chat with Paila
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>

                    <Link
                      to="/destinations"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto sm:px-6"
                    >
                      Explore more
                    </Link>
                  </div>
                </div>

                <div className="hidden shrink-0 lg:flex">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/5">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                      <Wallet className="h-9 w-9 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:px-6 sm:py-7 sm:text-left lg:px-8 xl:px-10">
            <p className="text-xs text-slate-400 sm:text-sm">
              © {new Date().getFullYear()} Paila. Made for Nepal.
            </p>

            <p className="text-xs text-slate-400 sm:text-sm">
              Every journey starts with a step. 🇳🇵
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}