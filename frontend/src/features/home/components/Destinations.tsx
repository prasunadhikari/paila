import { Link } from "react-router-dom";

import pokhara from "../../../assets/images/pokhara.jpg";
import mustang from "../../../assets/images/mustang.jpg";
import chitwan from "../../../assets/images/chitwan.jpg";

const places = [
  {
    name: "Pokhara",
    slug: "pokhara",
    image: pokhara,
    description: "Lakes, mountains and unforgettable adventures.",
  },
  {
    name: "Mustang",
    slug: "mustang",
    image: mustang,
    description: "Ancient Himalayan kingdom with breathtaking landscapes.",
  },
  {
    name: "Chitwan",
    slug: "chitwan",
    image: chitwan,
    description: "Wildlife safaris, jungles and one-horned rhinos.",
  },
];

export default function Destinations() {
  return (
    <section className="relative z-20 -mt-8 rounded-t-[50px] bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Discover Nepal
          </p>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Popular Destinations
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Discover Nepal's most beautiful places, experiences and adventures.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {places.map((place) => (
            <div
              key={place.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white">
                    {place.name}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                    {place.description}
                  </p>

                  <Link
                    to={`/destinations/${place.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                  >
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
          >
            View all destinations
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}