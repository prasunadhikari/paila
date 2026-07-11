import { useNavigate } from "react-router-dom";

import PlannerInput from "../components/PlannerInput";
import PlannerSelect from "../components/PlannerSelect";
import InterestChip from "../components/InterestChip";
import { generateTrip } from "../../../services/trip.service";

export default function TripPlannerPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-slate-900 md:text-6xl">
             Plan Your Nepal Adventure
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Tell Paila about your journey and let AI create the perfect
            personalized itinerary in seconds.
          </p>
        </div>

        {/* Planner Card */}
        <div className="rounded-[32px] border border-white/50 bg-white/80 p-10 shadow-2xl backdrop-blur-xl">

          <div className="grid gap-6 md:grid-cols-2">

            <PlannerInput
              icon=""
              placeholder="Starting From"
            />

            <PlannerInput
              icon=""
              placeholder="Destination"
            />

            <PlannerInput
              icon=""
              type="date"
            />

            <PlannerInput
              icon=""
              type="number"
              placeholder="Trip Duration (Days)"
            />

            <PlannerInput
              icon=""
              type="number"
              placeholder="Budget (NPR)"
            />

            <PlannerInput
              icon=""
              type="number"
              placeholder="Travelers"
            />

            <PlannerSelect
              icon=""
              options={[
                "Hotel Preference",
                "Budget",
                "Standard",
                "Luxury",
              ]}
            />

            <PlannerSelect
              icon=""
              options={[
                "Transportation",
                "Bus",
                "Car",
                "Flight",
                "Bike",
              ]}
            />

          </div>

          {/* Interests */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
               Interests
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <InterestChip icon="⛰️" label="Trekking" />
              <InterestChip icon="🏕️" label="Camping" />
              <InterestChip icon="📸" label="Photography" />
              <InterestChip icon="🦏" label="Wildlife" />
              <InterestChip icon="🛕" label="Culture" />
              <InterestChip icon="🍜" label="Food" />
              <InterestChip icon="🚵" label="Adventure" />
              <InterestChip icon="🌅" label="Nature" />
              <InterestChip icon="🧘" label="Relaxation" />

            </div>
          </div>

          {/* Button */}
          <div className="mt-14">
            <button
              onClick={async () => {
  try {
    const trip = await generateTrip({
      startingFrom: "Kathmandu",
      destination: "Mustang",
      days: 3,
      budget: 20000,
      travelers: 2,
      hotel: "Standard",
      transport: "Bus",
      interests: ["Photography", "Nature"],
    });

    console.log(trip);

    navigate("/loading", {
  state: {
    trip,
  },
});
  } catch (error) {
    console.error(error);
    alert("Failed to generate trip.");
  }
}}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-5 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
               Generate My AI Trip
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}