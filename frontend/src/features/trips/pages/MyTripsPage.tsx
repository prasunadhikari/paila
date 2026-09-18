import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";

import Sidebar from "../../../components/layout/Sidebar";

const MY_TRIPS_KEY = "paila_my_trips";

type TripStatus = "Upcoming" | "Completed";

type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  notes: string;
  status: TripStatus;
  createdAt: string;
};

type TripForm = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  notes: string;
};

const EMPTY_FORM: TripForm = {
  name: "",
  destination: "",
  startDate: "",
  endDate: "",
  travelers: "1",
  budget: "",
  notes: "",
};

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed">(
    "Upcoming"
  );
  const [form, setForm] = useState<TripForm>(EMPTY_FORM);

  /* =========================
     LOAD TRIPS
  ========================== */

  useEffect(() => {
    try {
      const storedTrips = JSON.parse(
        localStorage.getItem(MY_TRIPS_KEY) || "[]"
      );

      if (Array.isArray(storedTrips)) {
        setTrips(storedTrips);
      }
    } catch {
      setTrips([]);
    }
  }, []);

  /* =========================
     SAVE TRIPS
  ========================== */

  useEffect(() => {
    localStorage.setItem(MY_TRIPS_KEY, JSON.stringify(trips));
  }, [trips]);

  /* =========================
     AUTO UPDATE TRIP STATUS
  ========================== */

  useEffect(() => {
    if (trips.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let changed = false;

    const updatedTrips = trips.map((trip) => {
      if (!trip.endDate) return trip;

      const endDate = new Date(`${trip.endDate}T00:00:00`);

      const newStatus: TripStatus =
        endDate < today ? "Completed" : "Upcoming";

      if (trip.status !== newStatus) {
        changed = true;

        return {
          ...trip,
          status: newStatus,
        };
      }

      return trip;
    });

    if (changed) {
      setTrips(updatedTrips);
    }
  }, [trips]);

  /* =========================
     DATE LIMITS
  ========================== */

  // Users can only select tomorrow or a later date.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minStartDate = tomorrow.toISOString().split("T")[0];

  // End date must be at least one day after the selected start date.
  const minEndDate = form.startDate
    ? (() => {
        const nextDay = new Date(`${form.startDate}T00:00:00`);
        nextDay.setDate(nextDay.getDate() + 1);

        return nextDay.toISOString().split("T")[0];
      })()
    : minStartDate;

  /* =========================
     FORM
  ========================== */

  const updateForm = (field: keyof TripForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openCreateModal = () => {
    setEditingTripId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (trip: Trip) => {
    setEditingTripId(trip.id);

    setForm({
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      travelers: String(trip.travelers),
      budget: trip.budget,
      notes: trip.notes,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTripId(null);
    setForm(EMPTY_FORM);
  };

  /* =========================
     CREATE / UPDATE TRIP
  ========================== */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.destination.trim() ||
      !form.startDate ||
      !form.endDate
    ) {
      return;
    }

    // Start date must be tomorrow or later.
    if (form.startDate < minStartDate) {
      alert("Start date must be tomorrow or a future date.");
      return;
    }

    // End date must be after the start date.
    if (form.endDate <= form.startDate) {
      alert("End date must be after the start date.");
      return;
    }

    const endDate = new Date(`${form.endDate}T00:00:00`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const status: TripStatus =
      endDate < today ? "Completed" : "Upcoming";

    /* =========================
       EDIT EXISTING TRIP
    ========================== */

    if (editingTripId) {
      setTrips((currentTrips) =>
        currentTrips.map((trip) =>
          trip.id === editingTripId
            ? {
                ...trip,
                name: form.name.trim(),
                destination: form.destination.trim(),
                startDate: form.startDate,
                endDate: form.endDate,
                travelers: Math.max(
                  1,
                  Number(form.travelers) || 1
                ),
                budget: form.budget.trim(),
                notes: form.notes.trim(),
                status,
              }
            : trip
        )
      );
    } else {
      /* =========================
         CREATE NEW TRIP
      ========================== */

      const newTrip: Trip = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 9)}`,
        name: form.name.trim(),
        destination: form.destination.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        travelers: Math.max(
          1,
          Number(form.travelers) || 1
        ),
        budget: form.budget.trim(),
        notes: form.notes.trim(),
        status,
        createdAt: new Date().toISOString(),
      };

      setTrips((currentTrips) => [newTrip, ...currentTrips]);
    }

    closeModal();
  };

  /* =========================
     DELETE TRIP
  ========================== */

  const deleteTrip = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmed) return;

    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== id)
    );
  };

  /* =========================
     FILTER
  ========================== */

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => trip.status === activeTab);
  }, [trips, activeTab]);

  const upcomingCount = trips.filter(
    (trip) => trip.status === "Upcoming"
  ).length;

  const completedCount = trips.filter(
    (trip) => trip.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-10">

          {/* =========================
              HEADER
          ========================== */}

          <section className="mb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <CalendarDays className="h-3.5 w-3.5" />
                  My Journey
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  My Trips
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Plan, organize and keep track of your Nepal
                  adventures in one place.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600 active:translate-y-0"
              >
                <Plus className="h-4 w-4" />
                Create New Trip
              </button>
            </div>
          </section>

          {/* =========================
              STATS
          ========================== */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Upcoming
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {upcomingCount}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    trips planned
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                  <Clock3 className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Completed
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {completedCount}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    adventures completed
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                  <Check className="h-5 w-5" />
                </div>
              </div>
            </div>
          </section>

          {/* =========================
              TABS
          ========================== */}

          <section className="mb-6">
            <div className="flex w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm sm:w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("Upcoming")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition sm:flex-none ${
                  activeTab === "Upcoming"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Clock3 className="h-4 w-4" />

                Upcoming

                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === "Upcoming"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {upcomingCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Completed")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition sm:flex-none ${
                  activeTab === "Completed"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Check className="h-4 w-4" />

                Completed

                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === "Completed"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {completedCount}
                </span>
              </button>
            </div>
          </section>

          {/* =========================
              EMPTY STATE
          ========================== */}

          {filteredTrips.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50">
                {activeTab === "Upcoming" ? (
                  <CalendarDays className="h-9 w-9 text-emerald-500" />
                ) : (
                  <Check className="h-9 w-9 text-emerald-500" />
                )}
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                {activeTab === "Upcoming"
                  ? "No upcoming trips"
                  : "No completed trips"}
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                {activeTab === "Upcoming"
                  ? "Start planning your next adventure in Nepal and it will appear here."
                  : "Your completed adventures will appear here after your trip ends."}
              </p>

              {activeTab === "Upcoming" && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Trip
                </button>
              )}
            </div>
          )}

          {/* =========================
              TRIP CARDS
          ========================== */}

          {filteredTrips.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-2">
              {filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onEdit={() => openEditModal(trip)}
                  onDelete={() => deleteTrip(trip.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* =========================
          CREATE / EDIT MODAL
      ========================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {editingTripId ? "Update trip" : "New adventure"}
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                  {editingTripId
                    ? "Edit your trip"
                    : "Create a new trip"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-5 py-6 sm:px-7">

                {/* Trip Name */}

                <div>
                  <label
                    htmlFor="trip-name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Trip Name
                  </label>

                  <input
                    id="trip-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateForm("name", event.target.value)
                    }
                    placeholder="e.g. Pokhara Weekend"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Destination */}

                <div>
                  <label
                    htmlFor="trip-destination"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Destination
                  </label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="trip-destination"
                      type="text"
                      value={form.destination}
                      onChange={(event) =>
                        updateForm(
                          "destination",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Pokhara, Nepal"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Dates */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Start Date */}

                  <div>
                    <label
                      htmlFor="trip-start-date"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Start Date
                    </label>

                    <input
                      id="trip-start-date"
                      type="date"
                      min={minStartDate}
                      value={form.startDate}
                      onChange={(event) =>
                        updateForm(
                          "startDate",
                          event.target.value
                        )
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Must be tomorrow or later
                    </p>
                  </div>

                  {/* End Date */}

                  <div>
                    <label
                      htmlFor="trip-end-date"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      End Date
                    </label>

                    <input
                      id="trip-end-date"
                      type="date"
                      min={minEndDate}
                      value={form.endDate}
                      onChange={(event) =>
                        updateForm(
                          "endDate",
                          event.target.value
                        )
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Must be after the start date
                    </p>
                  </div>
                </div>

                {/* Travelers + Budget */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Travelers */}

                  <div>
                    <label
                      htmlFor="trip-travelers"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Travelers
                    </label>

                    <div className="relative">
                      <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="trip-travelers"
                        type="number"
                        min="1"
                        value={form.travelers}
                        onChange={(event) =>
                          updateForm(
                            "travelers",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>

                  {/* Budget */}

                  <div>
                    <label
                      htmlFor="trip-budget"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Budget
                    </label>

                    <input
                      id="trip-budget"
                      type="text"
                      value={form.budget}
                      onChange={(event) =>
                        updateForm(
                          "budget",
                          event.target.value
                        )
                      }
                      placeholder="e.g. NPR 25,000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Notes */}

                <div>
                  <label
                    htmlFor="trip-notes"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Notes

                    <span className="ml-1 font-normal text-slate-400">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="trip-notes"
                    value={form.notes}
                    onChange={(event) =>
                      updateForm("notes", event.target.value)
                    }
                    placeholder="Add anything you want to remember about this trip..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Modal Footer */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-5 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
                >
                  <Check className="h-4 w-4" />

                  {editingTripId
                    ? "Save Changes"
                    : "Create Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   TRIP CARD
========================= */

function TripCard({
  trip,
  onEdit,
  onDelete,
}: {
  trip: Trip;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const formatDate = (date: string) => {
    if (!date) return "Not set";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Card Header */}

      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-500 to-cyan-500 px-5 py-6 sm:px-6">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">

            <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {trip.status}
            </span>

            <h2 className="mt-3 truncate text-2xl font-black text-white">
              {trip.name}
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-white/90">
              <MapPin className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {trip.destination}
              </span>
            </div>
          </div>

          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur sm:flex">
            <MapPin className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Card Body */}

      <div className="p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">

          <InfoItem
            icon={<CalendarDays className="h-4 w-4" />}
            label="Travel dates"
            value={`${formatDate(trip.startDate)} — ${formatDate(
              trip.endDate
            )}`}
          />

          <InfoItem
            icon={<Users className="h-4 w-4" />}
            label="Travelers"
            value={`${trip.travelers} ${
              trip.travelers === 1 ? "person" : "people"
            }`}
          />
        </div>

        {/* Budget */}

        {trip.budget && (
          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Budget
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800">
              {trip.budget}
            </p>
          </div>
        )}

        {/* Notes */}

        {trip.notes && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Notes
            </p>

            <p className="mt-1 line-clamp-3 text-sm leading-6 text-slate-500">
              {trip.notes}
            </p>
          </div>
        )}

        {/* Actions */}

        <div className="mt-5 flex gap-2 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />

            <span className="hidden sm:inline">
              Delete
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================
   INFO ITEM
========================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}