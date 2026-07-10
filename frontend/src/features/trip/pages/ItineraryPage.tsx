export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl">

        <h1 className="text-5xl font-bold text-slate-900">
          🎉 Your AI Trip is Ready
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Here's your personalized Nepal itinerary.
        </p>

        <div className="mt-10 space-y-6">

          <div className="rounded-2xl border-l-4 border-emerald-500 bg-slate-50 p-6">
            <h2 className="text-2xl font-bold">Day 1 • Kathmandu</h2>
            <p className="mt-2 text-slate-600">
              Explore Kathmandu Durbar Square, Swayambhunath and Thamel.
            </p>
          </div>

          <div className="rounded-2xl border-l-4 border-emerald-500 bg-slate-50 p-6">
            <h2 className="text-2xl font-bold">Day 2 • Pokhara</h2>
            <p className="mt-2 text-slate-600">
              Phewa Lake, World Peace Pagoda and Lakeside.
            </p>
          </div>

          <div className="rounded-2xl border-l-4 border-emerald-500 bg-slate-50 p-6">
            <h2 className="text-2xl font-bold">Estimated Budget</h2>
            <p className="mt-2 text-slate-600">
              NPR 18,500
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}