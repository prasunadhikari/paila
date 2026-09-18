import { Heart, MapPin, Trash2, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";

export default function SavedPlacesPage() {
  const savedPlaces = JSON.parse(
    localStorage.getItem("paila_saved_places") || "[]"
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-10">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <Heart className="h-5 w-5 fill-current" />
              </div>

              <span className="text-sm font-bold uppercase tracking-wider text-rose-500">
                My Journey
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Saved Places
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Keep your favorite destinations in one place and come back to
              them whenever you're ready to travel.
            </p>
          </div>

          {/* Empty State */}
          {savedPlaces.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50">
                <Heart className="h-9 w-9 text-rose-400" />
              </div>

              <h2 className="text-2xl font-black text-slate-900">
                No saved places yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Start exploring Nepal and save the destinations you'd love to
                visit. They'll appear here.
              </p>

              <Link
                to="/destinations"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-95"
              >
                <Compass className="h-4 w-4" />
                Explore Destinations
              </Link>
            </div>
          ) : (
            <>
              {/* Saved Count */}
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  {savedPlaces.length}{" "}
                  {savedPlaces.length === 1 ? "place" : "places"} saved
                </p>
              </div>

              {/* Saved Places Grid */}
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {savedPlaces.map((place: any) => (
                  <SavedPlaceCard
                    key={place.slug || place.id || place.name}
                    place={place}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function SavedPlaceCard({ place }: { place: any }) {
  const handleRemove = () => {
    const savedPlaces = JSON.parse(
      localStorage.getItem("paila_saved_places") || "[]"
    );

    const updatedPlaces = savedPlaces.filter(
      (item: any) =>
        (item.slug || item.id || item.name) !==
        (place.slug || place.id || place.name)
    );

    localStorage.setItem(
      "paila_saved_places",
      JSON.stringify(updatedPlaces)
    );

    window.location.reload();
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Compass className="h-12 w-12" />
          </div>
        )}

        {/* Saved Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-rose-500 shadow-lg backdrop-blur">
          <Heart className="h-3.5 w-3.5 fill-current" />
          Saved
        </div>

        {/* Remove */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${place.name} from saved places`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-lg backdrop-blur transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-black text-slate-900">
          {place.name}
        </h2>

        {place.location && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{place.location}</span>
          </div>
        )}

        {place.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {place.description}
          </p>
        )}

        {place.slug && (
          <Link
            to={`/destinations/${place.slug}`}
            className="mt-5 flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            View Destination
          </Link>
        )}
      </div>
    </div>
  );
}