import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../../components/layout/Navbar";
import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import Hotels from "../components/Hotels";
import Flights from "../components/Flights";
import WhyPaila from "../components/WhyPaila";
import Testimonials from "../components/Testimonials";
import Footer from "../../../components/layout/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });

      return;
    }

    const sectionId = hash.substring(1);

    const timer = window.setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (!element) return;

      const navbarOffset = 100;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      });
    }, 200);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />

      <Hero />

      <div id="destinations" className="scroll-mt-28">
        <Destinations />
      </div>

      <div id="hotels" className="scroll-mt-28">
        <Hotels />
      </div>

      <div id="flights" className="scroll-mt-28">
        <Flights />
      </div>

      <WhyPaila />

      <Testimonials />

      <Footer />
    </>
  );
}