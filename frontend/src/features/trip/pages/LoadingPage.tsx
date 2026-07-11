import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
     console.log(location.state);

        navigate("/itinerary", {
          state: location.state,
        }); navigate("/itinerary", {
          state: location.state,
        });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
        className="mb-8 h-24 w-24 rounded-full border-4 border-emerald-500 border-t-transparent"
      />

      <h1 className="text-4xl font-bold">
        🤖 Paila AI is planning your trip...
      </h1>

      <p className="mt-4 text-lg text-slate-300">
        Finding the best destinations for you...
      </p>

      <div className="mt-10 w-full max-w-md">
        <div className="h-3 overflow-hidden rounded-full bg-slate-700">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3 }}
          />
        </div>
      </div>

      <p className="mt-8 text-slate-400">
        Calculating budget • Hotels • Routes • Weather
      </p>
    </div>
  );
}