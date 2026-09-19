import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Plane,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

type FlightRoute = {
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  duration: string;
  type: string;
  image: string;
};

const commonsImage = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    filename
  )}`;

const flights: FlightRoute[] = [
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "PKR",
    toCity: "Pokhara",
    duration: "25m",
    type: "Domestic",
    image: commonsImage("Phewa Lake in Pokhara, Nepal.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "BWA",
    toCity: "Bhairahawa",
    duration: "35m",
    type: "Domestic",
    image: commonsImage("Lumbini Gate.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "BIR",
    toCity: "Biratnagar",
    duration: "40m",
    type: "Domestic",
    image: commonsImage("Biratnagar Bazar Drone view.png"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "BHR",
    toCity: "Bharatpur",
    duration: "30m",
    type: "Domestic",
    image: commonsImage("Chitwan National Park.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "BDP",
    toCity: "Bhadrapur",
    duration: "45m",
    type: "Domestic",
    image: commonsImage("Bhadrapur Bazaar,.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "DHI",
    toCity: "Dhangadhi",
    duration: "1h 15m",
    type: "Domestic",
    image: commonsImage("Dhangadhi.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "KEP",
    toCity: "Nepalgunj",
    duration: "1h",
    type: "Domestic",
    image: commonsImage("Nepalgunj market 01.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "JKR",
    toCity: "Janakpur",
    duration: "30m",
    type: "Domestic",
    image: commonsImage("JanakpurTempleJanakiMandir.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "TMI",
    toCity: "Tumlingtar",
    duration: "45m",
    type: "Domestic",
    image: commonsImage(
      "Sati Dhunga (Stone) Tumlingtar Arun River Khadbari Sankhuwasabha Nepal Rajesh Dhungana (3).jpg"
    ),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "LUA",
    toCity: "Lukla",
    duration: "35m",
    type: "Domestic",
    image: commonsImage("Lukla and Lukla Airport, Nepal.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "JUM",
    toCity: "Jumla",
    duration: "1h 20m",
    type: "Domestic",
    image: commonsImage("Jumla4.jpg"),
  },
  {
    from: "KTM",
    fromCity: "Kathmandu",
    to: "RJB",
    toCity: "Rajbiraj",
    duration: "35m",
    type: "Domestic",
    image: commonsImage("Aerial view of Rajbiraj.jpg"),
  },
];

const AUTOPLAY_INTERVAL = 2000;

export default function Flights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(20);
  const [visibleCards, setVisibleCards] = useState(3);

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setVisibleCards(3);
      } else if (width >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!cardRef.current) return;

      const width = cardRef.current.getBoundingClientRect().width;
      setCardWidth(width);

      const parent = cardRef.current.parentElement;

      if (parent) {
        const styles = window.getComputedStyle(parent);
        const currentGap = parseFloat(styles.gap || "20");

        if (!Number.isNaN(currentGap)) {
          setGap(currentGap);
        }
      }
    };

    updateMeasurements();

    const observer = new ResizeObserver(updateMeasurements);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    window.addEventListener("resize", updateMeasurements);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const maxIndex = Math.max(
    0,
    flights.length - visibleCards
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;
      });
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [maxIndex]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }

      return prev - 1;
    });
  };

  const translateX = currentIndex * (cardWidth + gap);

  return (
    <section
      id="flights"
      className="relative overflow-hidden bg-[#05070a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="border-b border-white/10 pb-8 sm:pb-10"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-sky-400" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-300 sm:text-[11px]">
                  Fly across Nepal
                </p>
              </div>

              <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4.3rem]">
                Explore Nepal,
                <span className="block font-light italic text-white/45">
                  one flight at a time.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                Discover domestic flights connecting Nepal&apos;s
                cities, mountains, valleys and destinations with
                Paila.
              </p>
            </div>

            <Link
              to="/flights"
              className="group flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
            >
              Search domestic flights

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-all duration-300 group-hover:border-sky-300/30 group-hover:bg-sky-400/10">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </motion.div>

        <div className="relative mt-8 sm:mt-10">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-5"
              animate={{
                x: -translateX,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {flights.map((flight, index) => (
                <article
                  key={`${flight.from}-${flight.to}-${index}`}
                  ref={index === 0 ? cardRef : undefined}
                  className="group relative h-[390px] w-[78vw] max-w-[245px] shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-xl shadow-black/30 sm:h-[420px] sm:w-[42vw] sm:max-w-[300px] sm:rounded-[26px] lg:h-[440px] lg:w-[calc((100vw-144px)/3)] lg:max-w-[390px]"
                >
                  <img
                    src={flight.image}
                    alt={`${flight.toCity}, Nepal`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                    <Plane size={12} />
                    Domestic
                  </div>

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md">
                    <MapPin size={14} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-300/80 sm:text-[10px]">
                      Explore {flight.toCity}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <p className="text-2xl font-black tracking-tight">
                          {flight.from}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/55">
                          {flight.fromCity}
                        </p>
                      </div>

                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="h-px flex-1 bg-white/20" />

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-900">
                          <Plane
                            size={15}
                            className="rotate-90"
                          />
                        </div>

                        <span className="h-px flex-1 bg-white/20" />
                      </div>

                      <div className="min-w-0 text-right">
                        <p className="text-2xl font-black tracking-tight">
                          {flight.to}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/55">
                          {flight.toCity}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-xs text-white/55">
                        <CalendarDays size={13} />
                        <span>{flight.duration}</span>
                      </div>

                      <div className="flex items-center justify-end gap-2 text-xs text-white/55">
                        <MapPin size={13} />
                        <span>{flight.toCity}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous flight route"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next flight route"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {Array.from({
                length: maxIndex + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to flight slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "w-6 bg-sky-400"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:p-8"
        >
          <div>
            <h3 className="text-xl font-semibold">
              Ready to explore Nepal?
            </h3>

            <p className="mt-1 text-sm text-white/45">
              Search domestic flight options with Paila.
            </p>
          </div>

          <Link
            to="/flights"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-sky-400"
          >
            Find a flight

            <Search
              size={16}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}