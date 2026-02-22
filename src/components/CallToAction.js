import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <section className="cta">
      <div className="cta__bg" />
      <div className="cta__overlay" />
      <motion.div
        className="cta__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="cta__label">Start Your Journey</p>
        <h2 className="cta__title">
          Ready to Find Your
          <br />
          Dream Home?
        </h2>
        <p className="cta__desc">
          Let our team of experts guide you through the process of finding and
          acquiring your perfect property. Schedule a private consultation today.
        </p>
        <div className="cta__buttons">
          <Link to="/properties" className="cta__btn cta__btn--primary">
            Browse Properties
          </Link>
          <Link to="/contact" className="cta__btn cta__btn--secondary">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
