import { Link, useParams } from "react-router-dom";

import pokhara from "../../../assets/images/pokhara.jpg";
import mustang from "../../../assets/images/mustang.jpg";
import chitwan from "../../../assets/destinations/chitwan.jpg";

const destinations = {
  pokhara: {
    name: "Pokhara",
    subtitle: "Gateway to the Himalayas",
    image: pokhara,
    location: "Gandaki Province, Nepal",
    rating: "4.8",
    bestTime: "October – April",
    description:
      "Pokhara is a beautiful lakeside city surrounded by spectacular Himalayan views. It is the perfect destination for adventure, nature, relaxation and exploring the Annapurna region.",

    thingsToDo: [
      {
        name: "Phewa Lake",
        description:
          "Enjoy boating with stunning views of the Annapurna range.",
      },
      {
        name: "Sarangkot",
        description:
          "Watch breathtaking sunrise and sunset over the Himalayas.",
      },
      {
        name: "World Peace Pagoda",
        description:
          "Visit the peaceful Buddhist monument overlooking Pokhara.",
      },
    ],

    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description: "Fastest option from Kathmandu.",
      },
      {
        type: "Tourist Bus",
        icon: "🚌",
        description: "Comfortable and affordable road travel.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description: "Flexible travel with stops along the way.",
      },
    ],
  },

  mustang: {
    name: "Mustang",
    subtitle: "The Hidden Kingdom of Nepal",
    image: mustang,
    location: "Gandaki Province, Nepal",
    rating: "4.9",
    bestTime: "March – May & September – November",
    description:
      "Mustang is famous for its dramatic Himalayan landscapes, ancient monasteries, Tibetan-influenced culture and remote mountain villages.",

    thingsToDo: [
      {
        name: "Muktinath",
        description:
          "Visit one of Nepal's most important pilgrimage sites.",
      },
      {
        name: "Marpha",
        description:
          "Explore the beautiful mountain village famous for its apple products.",
      },
      {
        name: "Lo Manthang",
        description:
          "Discover the ancient walled city of Upper Mustang.",
      },
    ],

    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description: "Fly from Pokhara to Jomsom.",
      },
      {
        type: "Jeep",
        icon: "🚙",
        description: "Travel through Mustang's mountain roads.",
      },
      {
        type: "Bus",
        icon: "🚌",
        description:
          "Budget-friendly option for adventurous travelers.",
      },
    ],
  },

  chitwan: {
    name: "Chitwan",
    subtitle: "Into the Wild",
    image: chitwan,
    location: "Bagmati Province, Nepal",
    rating: "4.7",
    bestTime: "October – March",
    description:
      "Chitwan is one of Nepal's best destinations for wildlife and jungle experiences, famous for safaris, rhinos, elephants and the rich biodiversity of Chitwan National Park.",

    thingsToDo: [
      {
        name: "Jungle Safari",
        description:
          "Explore the jungle and look for rhinos, deer and other wildlife.",
      },
      {
        name: "Elephant Breeding Centre",
        description:
          "Learn about elephant conservation and local wildlife.",
      },
      {
        name: "Tharu Village",
        description:
          "Experience the culture and traditions of the Tharu community.",
      },
    ],

    travelOptions: [
      {
        type: "Flight",
        icon: "✈️",
        description: "Fly from Kathmandu to Bharatpur.",
      },
      {
        type: "Tourist Bus",
        icon: "🚌",
        description:
          "Popular and affordable way to reach Chitwan.",
      },
      {
        type: "Private Car",
        icon: "🚗",
        description:
          "Comfortable road travel from Kathmandu or Pokhara.",
      },
    ],
  },
};

type DestinationKey = keyof typeof destinations;

export default function DestinationPage() {
  const { destination } = useParams<{ destination: string }>();

  const key = destination?.toLowerCase() as DestinationKey;
  const place = destinations[key];

  if (!place) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Destination Not Found
          </h1>

          <p className="mt-4 text-slate-500">
            We couldn't find the destination you're looking for.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[520px] overflow-hidden bg-slate-900">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute left-0 right-0 top-8 mx-auto max-w-7xl px-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60"
          >
            ← Back to Explore
          </Link>
        </div>

        {/* Destination Title */}
        <div className="absolute bottom-12 left-0 right-0 mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {place.location}
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            {place.name}
          </h1>

          <p className="mt-3 text-xl text-gray-200 md:text-2xl">
            {place.subtitle}
          </p>
        </div>
      </section>

      {/* Basic Information */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Rating</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              ⭐ {place.rating}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">
              Best Time to Visit
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {place.bestTime}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-400">Destination</p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {place.name}, Nepal
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
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
            Things to Do
          </h2>

          <p className="mt-3 text-slate-500">
            Explore some of the best experiences in {place.name}.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {place.thingsToDo.map((activity) => (
              <div
                key={activity.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {activity.name}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Get There */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          How to Get There
        </h2>

        <p className="mt-3 text-slate-500">
          Choose the travel option that works best for you.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {place.travelOptions.map((option) => (
            <div
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
            </div>
          ))}
        </div>
      </section>

      {/* Paila AI */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="font-semibold text-emerald-400">
              ✨ Paila AI
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Have questions about {place.name}?
            </h2>

            <p className="mt-4 text-lg leading-7 text-slate-300">
              Chat with Paila and ask about transportation, places
              to visit, food, weather, activities and more.
            </p>

            <Link
              to="/chat"
              className="mt-7 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Chat with Paila →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}