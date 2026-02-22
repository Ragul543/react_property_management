import React from "react";
import { motion } from "framer-motion";
import { MdSecurity, MdTrendingUp, MdSupportAgent, MdVerified } from "react-icons/md";
import "./WhyChooseUs.css";

const reasons = [
  {
    icon: <MdVerified />,
    title: "Verified Listings",
    desc: "Every property in our portfolio is thoroughly vetted and verified for authenticity, legal compliance, and quality standards.",
  },
  {
    icon: <MdTrendingUp />,
    title: "Market Expertise",
    desc: "Our team of seasoned professionals provides deep market insights and data-driven valuations to ensure optimal investment decisions.",
  },
  {
    icon: <MdSupportAgent />,
    title: "Dedicated Support",
    desc: "From first inquiry to closing and beyond, our concierge team provides personalized guidance every step of the way.",
  },
  {
    icon: <MdSecurity />,
    title: "Secure Transactions",
    desc: "State-of-the-art security protocols and legal frameworks protect every transaction, ensuring complete peace of mind.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why">
      <div className="why__container">
        <div className="why__left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="why__label">Why Choose Us</p>
            <h2 className="why__title">
              The Gold Standard in
              <br />
              <span>Luxury Real Estate</span>
            </h2>
            <p className="why__desc">
              For over 15 years, LuxeEstates has set the benchmark for premium
              real estate services. Our commitment to excellence, integrity, and
              client satisfaction has earned us the trust of discerning buyers
              worldwide.
            </p>
          </motion.div>
        </div>

        <div className="why__right">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="why__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="why__card-icon">{reason.icon}</div>
              <div>
                <h3 className="why__card-title">{reason.title}</h3>
                <p className="why__card-desc">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
