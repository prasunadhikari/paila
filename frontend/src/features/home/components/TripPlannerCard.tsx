export default function TripPlannerCard() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-6 text-3xl font-bold text-white">
        ✨ AI Trip Planner
      </h2>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="📍 Starting From"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 outline-none transition focus:border-emerald-400"
        />

        <input
          type="number"
          placeholder="💰 Budget (NPR)"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 outline-none transition focus:border-emerald-400"
        />

        <input
          type="number"
          placeholder="🗓️ Trip Duration (Days)"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-300 outline-none transition focus:border-emerald-400"
        />

        <button className="w-full rounded-xl bg-emerald-500 py-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:bg-emerald-600">
          ✨ Generate My Trip
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-gray-200">
        Powered by AI • Personalized itineraries in seconds
      </p>
    </div>
  );
}