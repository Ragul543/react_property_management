import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonials } from "../data/properties";
import "./Testimonials.css";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="testimonials__label">Testimonials</p>
          <h2 className="testimonials__title">What Our Clients Say</h2>
        </motion.div>

        <div className="testimonials__slider">
          <button className="testimonials__nav testimonials__nav--prev" onClick={prev}>
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonials__card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <FaQuoteLeft className="testimonials__quote-icon" />
              <p className="testimonials__text">{testimonials[current].text}</p>
              <div className="testimonials__stars">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="testimonials__author">
                <img src={testimonials[current].image} alt={testimonials[current].name} />
                <div>
                  <h4>{testimonials[current].name}</h4>
                  <p>{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="testimonials__nav testimonials__nav--next" onClick={next}>
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${index === current ? "testimonials__dot--active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
