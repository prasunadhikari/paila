import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import pokhara from "../../../assets/destinations/pokhara.jpg";
import mustang from "../../../assets/destinations/mustang.jpg";
import chitwan from "../../../assets/destinations/chitwan.jpg";
import everest from "../../../assets/destinations/everest.jpg";
import annapurnaCircuit from "../../../assets/destinations/annapurna_circuit.png";
import langtangValley from "../../../assets/destinations/langtang_valley.png";
import rara from "../../../assets/destinations/rara.jpg";
import lumbini from "../../../assets/destinations/lumbini.jpg";
import muktinath from "../../../assets/destinations/muktinath.png";
import ghandruk from "../../../assets/destinations/ghandruk.png";
import kathmandu from "../../../assets/destinations/Kathmandu.png";
import bhaktapur from "../../../assets/destinations/bhaktapur.png";

type Place = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

const places: Place[] = [
  {
    name: "Pokhara",
    slug: "pokhara",
    image: pokhara,
    description:
      "Lakes, mountains and unforgettable adventures surrounded by the Himalayas.",
  },
  {
    name: "Mustang",
    slug: "mustang",
    image: mustang,
    description:
      "An ancient Himalayan kingdom shaped by dramatic landscapes and timeless culture.",
  },
  {
    name: "Chitwan",
    slug: "chitwan",
    image: chitwan,
    description:
      "Wildlife, jungles and unforgettable encounters in southern Nepal.",
  },
  {
    name: "Everest",
    slug: "everest",
    image: everest,
    description:
      "Stand among the world's highest peaks and experience the Himalayas.",
  },
  {
    name: "Annapurna Circuit",
    slug: "annapurna-circuit",
    image: annapurnaCircuit,
    description:
      "One of Nepal's legendary trekking routes through spectacular landscapes.",
  },
  {
    name: "Langtang Valley",
    slug: "langtang-valley",
    image: langtangValley,
    description:
      "A beautiful Himalayan valley filled with mountains, forests and culture.",
  },
  {
    name: "Rara",
    slug: "rara",
    image: rara,
    description:
      "Nepal's breathtaking blue lake surrounded by peaceful mountain wilderness.",
  },
  {
    name: "Lumbini",
    slug: "lumbini",
    image: lumbini,
    description:
      "A peaceful cultural destination and the birthplace of Lord Buddha.",
  },
  {
    name: "Muktinath",
    slug: "muktinath",
    image: muktinath,
    description:
      "A sacred Himalayan destination surrounded by dramatic mountain scenery.",
  },
  {
    name: "Ghandruk",
    slug: "ghandruk",
    image: ghandruk,
    description:
      "A beautiful mountain village with incredible views of the Annapurna range.",
  },
  {
    name: "Kathmandu",
    slug: "kathmandu",
    image: kathmandu,
    description:
      "Ancient temples, vibrant streets and centuries of Nepalese culture.",
  },
  {
    name: "Bhaktapur",
    slug: "bhaktapur",
    image: bhaktapur,
    description:
      "A historic city filled with traditional architecture, art and culture.",
  },
];

const AUTOPLAY_INTERVAL = 2000;

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(20);

  const cardRef = useRef<HTMLDivElement | null>(null);

  /*
   * Measure the real card width.
   * This prevents the carousel from breaking at different screen sizes.
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
   * Automatically move every 2 seconds.
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= places.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= places.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return places.length - 1;
      }

      return prev - 1;
    });
  };

  const translateX = currentIndex * (cardWidth + gap);

  return (
    <section className="relative z-20 -mt-5 overflow-hidden rounded-t-[32px] bg-[#05070a] py-14 text-white sm:rounded-t-[42px] sm:py-16 lg:-mt-6 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
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
                  Discover Nepal
                </p>
              </div>

              <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.3rem]">
                Places worth
                <span className="block font-light italic text-white/45">
                  going somewhere for.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                From peaceful lakes and towering mountains to ancient kingdoms
                and wild jungles, discover the places that make Nepal
                unforgettable.
              </p>
            </div>

            {/* Desktop controls */}
            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous destination"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next destination"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                <ArrowRight size={17} />
              </button>

              <Link
                to="/destinations"
                className="group ml-2 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                View all destinations

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
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {places.map((place, index) => (
                <motion.article
                  key={place.slug}
                  ref={index === 0 ? cardRef : undefined}
                  className="
                    group
                    relative
                    h-[360px]
                    w-[78vw]
                    max-w-[245px]
                    shrink-0
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/10
                    bg-black
                    shadow-xl
                    shadow-black/30
                    sm:h-[390px]
                    sm:w-[30vw]
                    sm:max-w-[260px]
                    sm:rounded-[26px]
                    lg:h-[420px]
                    lg:w-[calc((100%-40px)/3)]
                    lg:max-w-none
                  "
                >
                  {/* Image */}
                  <img
                    src={place.image}
                    alt={`${place.name}, Nepal`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="
                      (max-width: 639px) 78vw,
                      (max-width: 1023px) 30vw,
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

                  {/* Image overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />

                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80 sm:text-[10px]">
                      Nepal
                    </p>

                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-[28px]">
                          {place.name}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-white/65 sm:text-xs">
                          {place.description}
                        </p>
                      </div>

                      <Link
                        to={`/destinations/${place.slug}`}
                        aria-label={`Explore ${place.name}`}
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-slate-900
                          shadow-lg
                          transition-all
                          duration-300
                          hover:scale-105
                          hover:bg-emerald-500
                          hover:text-white
                          sm:h-11
                          sm:w-11
                        "
                      >
                        <ArrowRight size={17} />
                      </Link>
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
            to="/destinations"
            className="text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            View all destinations
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous destination"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next destination"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex justify-center gap-1.5 sm:mt-7">
          {places.map((place, index) => (
            <button
              key={place.slug}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to ${place.name}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-7 bg-emerald-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}