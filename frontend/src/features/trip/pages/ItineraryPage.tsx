import {
  MapPin,
  CloudSun,
  Wallet,
  Clock3,
  Hotel,
  Utensils,
  Car,
  Lightbulb,
} from "lucide-react";

export default function ItineraryPage() {
  const itinerary = [
    {
      day: "Day 1",
      location: "Kathmandu",
      image:
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",
      weather: "24°C Sunny",
      budget: "NPR 4,200",
      travelTime: "-",
      activities: [
        "Visit Kathmandu Durbar Square",
        "Explore Swayambhunath",
        "Dinner at Thamel",
      ],
    },
    {
      day: "Day 2",
      location: "Pokhara",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200",
      weather: "22°C Cloudy",
      budget: "NPR 6,100",
      travelTime: "6–7 Hours",
      activities: [
        "Drive to Pokhara",
        "Boat ride on Phewa Lake",
        "Sunset at Lakeside",
      ],
    },
    {
      day: "Day 3",
      location: "Mustang",
      image:
        "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200",
      weather: "12°C Cold",
      budget: "NPR 8,200",
      travelTime: "5 Hours",
      activities: [
        "Explore Lower Mustang",
        "Photography",
        "Local Coffee & Culture",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-600 to-cyan-500 shadow-2xl">

          <div className="grid gap-8 p-10 lg:grid-cols-2">

            <div>
              <h1 className="text-5xl font-black text-white">
                Your AI Trip is Ready
              </h1>

              <p className="mt-4 text-lg text-emerald-100">
                Here's your personalized Nepal adventure crafted by Paila AI.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                  <MapPin className="mb-3 h-7 w-7 text-white" />
                  <p className="text-sm text-emerald-100">Destination</p>
                  <h3 className="text-2xl font-bold text-white">
                    Mustang
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                  <Wallet className="mb-3 h-7 w-7 text-white" />
                  <p className="text-sm text-emerald-100">Budget</p>
                  <h3 className="text-2xl font-bold text-white">
                    NPR 18,500
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                  <Clock3 className="mb-3 h-7 w-7 text-white" />
                  <p className="text-sm text-emerald-100">Duration</p>
                  <h3 className="text-2xl font-bold text-white">
                    3 Days
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
                  <CloudSun className="mb-3 h-7 w-7 text-white" />
                  <p className="text-sm text-emerald-100">Weather</p>
                  <h3 className="text-2xl font-bold text-white">
                    Sunny
                  </h3>
                </div>

              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200"
              alt="Mustang"
              className="h-full min-h-[320px] w-full rounded-3xl object-cover"
            />

          </div>
        </div>
                {/* Timeline */}
        <div className="relative mt-16">

          {/* Vertical Line */}
          <div className="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-emerald-200 md:block"></div>

          <div className="space-y-12">

            {itinerary.map((day, index) => (
              <div key={day.day} className="relative md:pl-20">

                {/* Timeline Dot */}
                <div className="absolute left-4 top-10 hidden h-8 w-8 rounded-full border-4 border-white bg-emerald-500 shadow-lg md:block"></div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                  <img
                    src={day.image}
                    alt={day.location}
                    className="h-72 w-full object-cover"
                  />

                  <div className="p-8">

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <div>
                        <p className="font-semibold text-emerald-600">
                          {day.day}
                        </p>

                        <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold text-slate-900">
                          <MapPin className="h-7 w-7 text-emerald-600" />
                          {day.location}
                        </h2>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-center">

                        <div>
                          <CloudSun className="mx-auto h-6 w-6 text-yellow-500" />
                          <p className="mt-2 text-sm text-slate-500">
                            Weather
                          </p>

                          <p className="font-semibold">
                            {day.weather}
                          </p>
                        </div>

                        <div>
                          <Wallet className="mx-auto h-6 w-6 text-emerald-600" />
                          <p className="mt-2 text-sm text-slate-500">
                            Budget
                          </p>

                          <p className="font-semibold">
                            {day.budget}
                          </p>
                        </div>

                        <div>
                          <Clock3 className="mx-auto h-6 w-6 text-cyan-600" />
                          <p className="mt-2 text-sm text-slate-500">
                            Travel
                          </p>

                          <p className="font-semibold">
                            {day.travelTime}
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="mt-8 space-y-3">

                      {day.activities.map((activity) => (
                        <div
                          key={activity}
                          className="rounded-xl bg-slate-50 px-5 py-4 transition hover:bg-emerald-50"
                        >
                          {activity}
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
                {/* Bottom Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Trip Details */}
          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <Hotel className="h-7 w-7 text-emerald-600" />
                <h2 className="text-2xl font-bold">
                  Recommended Hotel
                </h2>
              </div>

              <p className="mt-5 text-xl font-semibold">
                Hotel Middle Path & Spa
              </p>

              <p className="mt-2 text-slate-600">
                ★★★★☆ • Pokhara
              </p>

              <p className="mt-2 text-emerald-600 font-semibold">
                NPR 2,500 / night
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <Utensils className="h-7 w-7 text-orange-500" />
                <h2 className="text-2xl font-bold">
                  Food to Try
                </h2>
              </div>

              <ul className="mt-5 space-y-3 text-slate-600">
                <li>• Thakali Set</li>
                <li>• Fresh Mustang Apples</li>
                <li>• Local Momos</li>
                <li>• Newari Cuisine</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <Car className="h-7 w-7 text-cyan-600" />
                <h2 className="text-2xl font-bold">
                  Route
                </h2>
              </div>

              <div className="mt-6 space-y-2 text-lg font-medium">
                <p>📍 Kathmandu</p>
                <p className="pl-3 text-slate-400">↓ 6–7 hrs</p>
                <p>📍 Pokhara</p>
                <p className="pl-3 text-slate-400">↓ 5 hrs</p>
                <p>📍 Mustang</p>
              </div>
            </div>

          </div>

          {/* AI Tips */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-cyan-500 p-10 text-white shadow-2xl">

            <div className="flex items-center gap-3">
              <Lightbulb className="h-8 w-8" />

              <h2 className="text-3xl font-black">
                AI Travel Tips
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-lg">
              <li>✅ Carry warm clothes for Mustang.</li>
              <li>✅ Start driving before 7 AM.</li>
              <li>✅ Keep some cash for remote areas.</li>
              <li>✅ Download offline maps.</li>
              <li>✅ Roads may be dusty during summer.</li>
              <li>✅ Drink plenty of water at higher altitude.</li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="rounded-2xl bg-white px-7 py-4 font-bold text-emerald-700 transition hover:scale-105">
                Download PDF
              </button>

              <button className="rounded-2xl border border-white/40 px-7 py-4 font-bold transition hover:bg-white/10">
                Save Trip
              </button>

              <button className="rounded-2xl border border-white/40 px-7 py-4 font-bold transition hover:bg-white/10">
                Share
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}