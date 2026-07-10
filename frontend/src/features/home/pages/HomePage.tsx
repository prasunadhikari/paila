import Navbar from "../../../components/layout/Navbar";
import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import WhyPaila from "../components/WhyPaila";
import Testimonials from "../components/Testimonials";
import Footer from "../../../components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <WhyPaila />
      <Testimonials />
      <Footer />
    </>
  );
}