import pokhara from "../../../assets/images/pokhara.jpg";
import mustang from "../../../assets/images/mustang.jpg";
import chitwan from "../../../assets/images/chitwan.jpg";

const places = [
  {
    name: "Pokhara",
    image: pokhara,
    description: "Lakes, mountains and unforgettable adventures.",
  },
  {
    name: "Mustang",
    image: mustang,
    description: "Ancient Himalayan kingdom with breathtaking landscapes.",
  },
  {
    name: "Chitwan",
    image: chitwan,
    description: "Wildlife safaris, jungles and one-horned rhinos.",
  },
];

export default function Destinations() {
  return (
    <section className="relative z-20 -mt-8 rounded-t-[50px] bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center text-5xl font-bold text-slate-900">
          Popular Destinations
        </h2>

        <p className="mb-14 text-center text-lg text-slate-500">
          Explore Nepal's most beautiful places with AI-powered trip planning.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {places.map((place) => (
            <div
              key={place.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-72 w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white">
                    {place.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-200">
                    {place.description}
                  </p>

                  <button className="mt-5 rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white transition duration-300 hover:bg-emerald-600">
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}