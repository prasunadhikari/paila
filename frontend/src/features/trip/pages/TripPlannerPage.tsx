export default function TripPlannerPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-2xl">

        <h1 className="text-5xl font-bold text-slate-900">
          ✨ Plan Your Nepal Trip
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Tell Paila about your journey and let AI build the perfect itinerary.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <input
            className="rounded-xl border p-4"
            placeholder="📍 Starting From"
          />

          <input
            className="rounded-xl border p-4"
            placeholder="📍 Destination"
          />

          <input
            type="date"
            className="rounded-xl border p-4"
          />

          <input
            type="number"
            className="rounded-xl border p-4"
            placeholder="📅 Number of Days"
          />

          <input
            type="number"
            className="rounded-xl border p-4"
            placeholder="💰 Budget (NPR)"
          />

          <input
            type="number"
            className="rounded-xl border p-4"
            placeholder="👥 Travelers"
          />

          <select className="rounded-xl border p-4">
            <option>🏨 Hotel Preference</option>
            <option>Budget</option>
            <option>Standard</option>
            <option>Luxury</option>
          </select>

          <select className="rounded-xl border p-4">
            <option>🚗 Transportation</option>
            <option>Bus</option>
            <option>Car</option>
            <option>Flight</option>
            <option>Bike</option>
          </select>

        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">
            ❤️ What are you interested in?
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Adventure
            </label>

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Trekking
            </label>

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Culture
            </label>

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Wildlife
            </label>

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Photography
            </label>

            <label className="flex items-center gap-2 rounded-xl border p-4">
              <input type="checkbox" />
              Food
            </label>

          </div>
        </div>

        <button className="mt-10 w-full rounded-2xl bg-emerald-600 py-5 text-xl font-bold text-white transition hover:bg-emerald-700">
          ✨ Generate AI Trip
        </button>

      </div>
    </div>
  );
}