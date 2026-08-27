import { Link, useParams } from "react-router-dom";
import { destinations, type Destination } from "../data/destinations";

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

export default function DestinationPage() {
  const { destination } = useParams<{ destination: string }>();

  const slug = destination?.toLowerCase().trim() ?? "";

  const place = destinations.find(
    (item) => item.slug.toLowerCase() === slug
  );

  if (!place) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Paila
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Destination Not Found
          </h1>

          <p className="mt-4 leading-7 text-slate-500">
            We couldn't find this destination in the current destination
            database.
          </p>

          <Link
            to="/destinations"
            className="mt-7 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            ← Back to Destinations
          </Link>
        </div>
      </main>
    );
  }

  const details = detailsBySlug[place.slug] ?? createGenericDetails(place);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[520px] overflow-hidden bg-slate-900">
        <img
          src={place.image}
          alt={`${place.name}, ${place.location}, Nepal`}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute left-0 right-0 top-8 mx-auto max-w-7xl px-6">
          <Link
            to="/destinations"
            className="inline-flex items-center rounded-full bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60"
          >
            ← Back to Explore
          </Link>
        </div>

        <div className="absolute bottom-12 left-0 right-0 mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {place.location} • {place.province}
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            {place.name}
          </h1>

          <p className="mt-3 max-w-3xl text-xl text-gray-200 md:text-2xl">
            {details.subtitle}
          </p>
        </div>
      </section>

      {/* Basic Information */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Rating</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              ⭐ {place.rating.toFixed(1)}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Location</p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {place.location}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Province</p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {place.province}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Best Time</p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {place.bestTime}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.15em] text-emerald-600">
            About the destination
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            About {place.name}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {place.description}
          </p>
        </div>
      </section>

      {/* Things To Do */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Things to Do in {place.name}
          </h2>

          <p className="mt-3 text-slate-500">
            Discover experiences and places worth exploring during your visit.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {details.activities.map((activity) => (
              <article
                key={activity.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {activity.name}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How To Get There */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          How to Get to {place.name}
        </h2>

        <p className="mt-3 text-slate-500">
          Choose the travel option that works best for your trip.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {details.travelOptions.map((option) => (
            <article
              key={option.type}
              className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">{option.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {option.type}
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                {option.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Destination Summary */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-400">Destination</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {place.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-400">Category</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {place.category}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-400">Best Time</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {place.bestTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paila AI */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="font-semibold text-emerald-400">✨ Paila AI</p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Planning a trip to {place.name}?
            </h2>

            <p className="mt-4 text-lg leading-7 text-slate-300">
              Let Paila create a personalized Nepal itinerary based on your
              budget, duration, transportation, accommodation and interests.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/chat"
                className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                Chat with Paila →
              </Link>

              <Link
                to="/destinations"
                className="inline-flex rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore More Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}