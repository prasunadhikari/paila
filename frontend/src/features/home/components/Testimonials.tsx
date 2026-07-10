import { motion } from "framer-motion";

const reviews = [
  {
    name: "Subham Pokharel",
    location: "USA",
    review:
      "Paila planned my Pokhara trip in seconds. It saved me hours of research!",
  },
  {
    name: "Bibek Adhikari",
    location: "UK",
    review:
      "The itinerary was amazing. Nepal felt much easier to explore with Paila.",
  },
  {
    name: "Pukar Bhandari",
    location: "Kathmandu",
    review:
      "Loved the budget estimation feature. Everything was perfectly organized.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-slate-900">
          Loved by Travelers
        </h2>

        <p className="mt-4 text-center text-lg text-slate-500">
          See what people say about planning trips with Paila.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <p className="italic text-slate-600">
                "{review.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-slate-900">
                  {review.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {review.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}