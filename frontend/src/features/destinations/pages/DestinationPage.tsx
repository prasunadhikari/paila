import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  Compass,
  Lightbulb,
  MapPin,
  Plane,
  Sparkles,
  Star,
  Train,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

import { destinations, type Destination } from "../data/destinations";
import { getDestinationDetails } from "../data/destinationDetails";
import Sidebar from "../../../components/layout/Sidebar";

function getTravelIcon(type: string) {
  const value = type.toLowerCase();

  if (
    value.includes("flight") ||
    value.includes("plane") ||
    value.includes("air")
  ) {
    return Plane;
  }

  if (
    value.includes("car") ||
    value.includes("taxi") ||
    value.includes("jeep") ||
    value.includes("private")
  ) {
    return Car;
  }

  if (
    value.includes("bus") ||
    value.includes("train") ||
    value.includes("public")
  ) {
    return Train;
  }

  return Compass;
}

function createGenericDetails(destination: Destination) {
  return {
    subtitle: `${destination.category} in Nepal`,
    overview: destination.description,
    thingsToDo: [
      `Explore ${destination.name}`,
      "Experience local culture and scenery",
      "Discover nearby attractions",
    ],
    travelOptions: [
      "Travel by road from major nearby cities",
      "Use local transportation for nearby attractions",
    ],
    foodToTry: [
      "Try authentic local Nepali cuisine",
      "Explore traditional food from the region",
    ],
    travelTips: [
      "Check the weather before travelling",
      "Carry comfortable clothing and walking shoes",
      "Keep your important documents and belongings safe",
    ],
  };
}

export default function DestinationPage() {
  const { destination: slug } = useParams<{ destination: string }>();

  const place = destinations.find(
    (destination) => destination.slug === slug
  );

  if (!place) {
    return (
      <div className="min-h-screen bg-[#f8f8f6]">
        <Sidebar />

        <main className="min-h-screen lg:ml-64 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <MapPin size={30} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Destination not found
            </h1>

            <p className="mt-2 text-slate-500">
              The destination you are looking for does not exist.
            </p>

            <Link
              to="/destinations"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              <ArrowLeft size={17} />
              Back to destinations
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const details = getDestinationDetails(place);

  const safeDetails =
    details?.overview && details.thingsToDo?.length
      ? details
      : createGenericDetails(place);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f8f6] text-slate-900">
      <Sidebar />

      <main className="lg:ml-64">
        {/* Hero */}
        <section className="relative h-[430px] overflow-hidden sm:h-[470px] lg:h-[500px]">
          <img
            src={place.image}
            alt={place.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
            <div>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/35"
              >
                <ArrowLeft size={17} />
                All destinations
              </Link>
            </div>

            <div className="max-w-3xl pb-4 sm:pb-7">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={16} />
                  {place.location}
                </span>

                <span className="text-white/50">•</span>

                <span>{place.province}</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {place.name}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                {safeDetails.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick information */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
            <div className="flex items-center gap-3 px-5 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Star size={19} fill="currentColor" />
              </div>

              <div>
                <p className="text-xs text-slate-400">Rating</p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {place.rating}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {place.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                <Compass size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Category</p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {place.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                <CalendarDays size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Best time</p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {place.bestTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          {/* About */}
          <section className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-sky-600">
              <Sparkles size={17} />
              Discover {place.name}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              About {place.name}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              {safeDetails.overview}
            </p>
          </section>

          {/* Things to do */}
          {safeDetails.thingsToDo.length > 0 && (
            <section className="mt-16">
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-sky-600">
                    Experiences
                  </p>

                  <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    Things to do
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-6 text-slate-500">
                  Make the most of your visit with experiences worth adding to
                  your journey.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {safeDetails.thingsToDo.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sm font-bold text-sky-600 transition group-hover:bg-sky-500 group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="font-semibold leading-6 text-slate-900">
                          {item}
                        </h3>

                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-600">
                          Explore experience
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Travel options */}
          {safeDetails.travelOptions.length > 0 && (
            <section className="mt-16">
              <div className="mb-8">
                <p className="text-sm font-semibold text-sky-600">
                  Getting there
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  How to get there
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {safeDetails.travelOptions.map((option, index) => {
                  const Icon = getTravelIcon(option);

                  return (
                    <div
                      key={`${option}-${index}`}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                        <Icon size={20} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Option {index + 1}
                        </p>

                        <p className="mt-1 font-semibold leading-6 text-slate-900">
                          {option}
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className="mt-1 shrink-0 text-slate-300"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Food + Tips */}
          <section className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Food */}
            {safeDetails.foodToTry.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <UtensilsCrossed size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sky-600">
                      Local flavors
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Food to try
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {safeDetails.foodToTry.map((food, index) => (
                    <div
                      key={`${food}-${index}`}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3.5"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />

                      <span className="text-sm leading-6 text-slate-700">
                        {food}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {safeDetails.travelTips.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Lightbulb size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sky-600">
                      Before you go
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Travel tips
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {safeDetails.travelTips.map((tip, index) => (
                    <div
                      key={`${tip}-${index}`}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">
                        {index + 1}
                      </span>

                      <span className="text-sm leading-6 text-slate-700">
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Quick summary */}
          <section className="mt-16">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="grid lg:grid-cols-[1fr_auto]">
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-semibold text-sky-600">
                    Quick summary
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Plan your visit to {place.name}
                  </h2>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Destination</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {place.name}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Category</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {place.category}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Best time</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {place.bestTime}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Rating</p>
                      <p className="mt-1 flex items-center gap-1 font-semibold text-slate-900">
                        <Star
                          size={15}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        {place.rating}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-sky-50 p-6 sm:p-8 lg:w-72">
                  <div>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                      <Wallet size={20} />
                    </div>

                    <h3 className="font-bold text-slate-900">
                      Ready to explore?
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Discover more places and start planning your Nepal
                      journey.
                    </p>

                    <Link
                      to="/destinations"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700"
                    >
                      Browse destinations
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI CTA */}
          <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-sky-500 px-6 py-10 text-white sm:px-10 sm:py-12">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/10" />

              <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/90">
                    <Sparkles size={17} />
                    Paila AI
                  </div>

                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Need help planning your journey?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
                    Ask Paila about destinations, travel routes, places to
                    visit, and ideas for your next Nepal adventure.
                  </p>
                </div>

                <Link
                  to="/ai"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-sky-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Ask Paila AI
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <p>© {new Date().getFullYear()} Paila. Every journey starts with a step.</p>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-1 font-medium text-sky-600 hover:text-sky-700"
            >
              Explore Nepal
              <ArrowRight size={15} />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}