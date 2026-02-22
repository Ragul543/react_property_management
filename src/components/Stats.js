import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { MdApartment, MdPeople, MdHandshake, MdStar } from "react-icons/md";
import "./Stats.css";

const statsData = [
  { icon: <MdApartment />, end: 500, suffix: "+", label: "Properties Listed" },
  { icon: <MdPeople />, end: 200, suffix: "+", label: "Happy Clients" },
  { icon: <MdHandshake />, end: 350, suffix: "+", label: "Deals Closed" },
  { icon: <MdStar />, end: 15, suffix: "+", label: "Years of Excellence" },
];

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="stats" ref={ref}>
      <div className="stats__bg" />
      <div className="stats__overlay" />
      <div className="stats__container">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="stats__item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="stats__icon">{stat.icon}</div>
            <div className="stats__number">
              {inView && (
                <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
              )}
            </div>
            <p className="stats__label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
