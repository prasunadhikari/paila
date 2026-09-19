import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

type Hotel = {
  name: string;
  location: string;
  image: string;
  rating: string;
  price: string;
  type: string;
};

const hotels: Hotel[] = [
  {
    name: "Temple Tree Resort",
    location: "Pokhara, Nepal",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=90",
    rating: "4.8",
    price: "NPR 3,500",
    type: "Lakeside Resort",
  },
  {
    name: "Kasara Jungle Resort",
    location: "Chitwan, Nepal",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=90",
    rating: "4.7",
    price: "NPR 4,200",
    type: "Jungle Retreat",
  },
  {
    name: "Mountain View Lodge",
    location: "Mustang, Nepal",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=90",
    rating: "4.9",
    price: "NPR 3,800",
    type: "Mountain Stay",
  },
  {
    name: "Himalayan Paradise",
    location: "Nagarkot, Nepal",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=90",
    rating: "4.8",
    price: "NPR 4,500",
    type: "Mountain Resort",
  },
  {
    name: "The Lakeside Haven",
    location: "Pokhara, Nepal",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=90",
    rating: "4.7",
    price: "NPR 3,200",
    type: "Boutique Hotel",
  },
  {
    name: "Forest Hideaway",
    location: "Chitwan, Nepal",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=90",
    rating: "4.6",
    price: "NPR 3,900",
    type: "Forest Retreat",
  },
  {
    name: "Himalayan Heritage",
    location: "Kathmandu, Nepal",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=90",
    rating: "4.8",
    price: "NPR 4,000",
    type: "Heritage Stay",
  },
  {
    name: "Everest View Lodge",
    location: "Khumbu, Nepal",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=90",
    rating: "4.9",
    price: "NPR 5,500",
    type: "Mountain Lodge",
  },
  {
    name: "Riverside Retreat",
    location: "Bandipur, Nepal",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90",
    rating: "4.7",
    price: "NPR 3,600",
    type: "Riverside Stay",
  },
  {
    name: "Heritage Courtyard",
    location: "Bhaktapur, Nepal",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=90",
    rating: "4.8",
    price: "NPR 3,300",
    type: "Heritage Hotel",
  },
  {
    name: "Rara Wilderness Resort",
    location: "Mugu, Nepal",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=90",
    rating: "4.9",
    price: "NPR 4,800",
    type: "Wilderness Stay",
  },
  {
    name: "Annapurna Retreat",
    location: "Ghandruk, Nepal",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=90",
    rating: "4.8",
    price: "NPR 3,700",
    type: "Mountain Retreat",
  },
];

const AUTOPLAY_INTERVAL = 2000;

export default function Hotels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(20);
  const [visibleCards, setVisibleCards] = useState(3);

  const cardRef = useRef<HTMLDivElement | null>(null);

  /*
   * Detect how many cards should be visible.
   *
   * Desktop = 3
   * Tablet = 2
   * Mobile = 1
   */
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

  /*
   * Measure real card width.
   */
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

  /*
   * The last valid starting position.
   *
   * With 12 hotels and 3 visible:
   *
   * 0 = hotels 1,2,3
   * 1 = hotels 2,3,4
   * ...
   * 9 = hotels 10,11,12
   */
  const maxIndex = Math.max(
    0,
    hotels.length - visibleCards
  );

  /*
   * Auto slide every 2 seconds.
   */
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

  /*
   * Make sure the index remains valid when
   * the screen size changes.
   */
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
    <section className="relative overflow-hidden bg-[#05070a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
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
                <span className="h-px w-9 bg-emerald-400 sm:w-10" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-[11px]">
                  Stay in Nepal
                </p>
              </div>

              <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.3rem]">
                Places to stay,
                <span className="block font-light italic text-white/45">
                  made for your journey.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                From peaceful lakeside escapes to mountain retreats,
                discover beautiful stays that make every step of your
                journey better.
              </p>
            </div>

            {/* Desktop controls */}
            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous hotel"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next hotel"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                <ArrowRight size={17} />
              </button>

              <Link
                to="/hotels"
                className="group ml-2 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                View all hotels

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-all duration-300 group-hover:border-emerald-300/30 group-hover:bg-emerald-400/10">
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
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
              {hotels.map((hotel, index) => (
                <motion.article
                  key={`${hotel.name}-${index}`}
                  ref={index === 0 ? cardRef : undefined}
                  style={{
                    width:
                      window.innerWidth >= 1024
                        ? "calc((100% - 40px) / 3)"
                        : undefined,
                  }}
                  className="
                    group
                    relative
                    h-[390px]
                    w-[78vw]
                    max-w-[245px]
                    shrink-0
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/10
                    bg-[#080b0f]
                    shadow-xl
                    shadow-black/30
                    sm:h-[420px]
                    sm:w-[42vw]
                    sm:max-w-[300px]
                    sm:rounded-[26px]
                    lg:h-[440px]
                    lg:max-w-none
                  "
                >
                  {/* Image */}
                  <img
                    src={hotel.image}
                    alt={`${hotel.name}, ${hotel.location}`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    sizes="
                      (max-width: 639px) 78vw,
                      (max-width: 1023px) 42vw,
                      33vw
                    "
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      object-center
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-[1.06]
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5" />

                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />

                  {/* Type */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                    {hotel.type}
                  </div>

                  {/* Rating */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-black shadow-lg">
                    <Star
                      size={12}
                      className="fill-emerald-500 text-emerald-500"
                    />

                    {hotel.rating}
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-[10px]">
                      Featured stay
                    </p>

                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-[28px]">
                          {hotel.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-white/65">
                          <MapPin
                            size={13}
                            className="shrink-0 text-emerald-400"
                          />

                          <span>{hotel.location}</span>
                        </div>
                      </div>

                      <Link
                        to="/hotels"
                        aria-label={`View ${hotel.name}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:text-white sm:h-11 sm:w-11"
                      >
                        <ArrowRight size={17} />
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                        Stay from
                      </span>

                      <p className="mt-1 text-sm font-medium text-white">
                        {hotel.price}
                        <span className="ml-1 text-[10px] font-normal text-white/40">
                          / night
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="mt-6 flex items-center justify-between sm:hidden">
          <Link
            to="/hotels"
            className="text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            View all hotels
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous hotel"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next hotel"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-6 flex justify-center gap-1.5 sm:mt-7">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to hotel group ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-7 bg-emerald-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:p-8"
        >
          <div>
            <h3 className="text-xl font-semibold">
              Planning your next stay?
            </h3>

            <p className="mt-1 text-sm text-white/45">
              Find a place that feels right for your journey.
            </p>
          </div>

          <Link
            to="/hotels"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-emerald-400"
          >
            Explore hotels

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}