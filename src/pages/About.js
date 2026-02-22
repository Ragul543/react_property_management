import React from "react";
import { motion } from "framer-motion";
import { MdVerified, MdGroups, MdPublic } from "react-icons/md";
import Stats from "../components/Stats";
import "./About.css";

const team = [
  {
    name: "Alexandra Sterling",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Marcus Chen",
    role: "Head of Sales",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Isabella Romano",
    role: "Chief Marketing Officer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Thompson",
    role: "Senior Property Advisor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const About = () => {
  return (
    <div className="about-page">
      <div className="about-page__hero">
        <div className="about-page__hero-overlay" />
        <motion.div
          className="about-page__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="about-page__label">Our Story</p>
          <h1>About LuxeEstates</h1>
          <p>Redefining luxury real estate since 2009</p>
        </motion.div>
      </div>

      <section className="about-page__story">
        <div className="about-page__container">
          <div className="about-page__story-grid">
            <motion.div
              className="about-page__story-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="about-page__label">Who We Are</p>
              <h2>A Legacy of Excellence in Luxury Real Estate</h2>
              <p>
                Founded in 2009, LuxeEstates has grown from a boutique agency to one
                of the most trusted names in premium real estate. We specialize in
                connecting discerning buyers with extraordinary properties that
                match their lifestyle and aspirations.
              </p>
              <p>
                Our team of seasoned professionals brings decades of combined
                experience, deep market knowledge, and an unwavering commitment to
                client satisfaction. We don't just sell properties — we help our
                clients find their dream homes.
              </p>
            </motion.div>
            <motion.div
              className="about-page__story-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                alt="Luxury property"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-page__values">
        <div className="about-page__container">
          <motion.div
            className="about-page__values-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="about-page__label">Our Values</p>
            <h2>What Drives Us</h2>
          </motion.div>
          <div className="about-page__values-grid">
            {[
              { icon: <MdVerified />, title: "Integrity", desc: "Transparent dealings and honest advice in every interaction. Your trust is our most valued asset." },
              { icon: <MdGroups />, title: "Client First", desc: "Every decision we make is guided by what's best for our clients. Your satisfaction is our success." },
              { icon: <MdPublic />, title: "Global Reach", desc: "Access to premium properties worldwide, with local expertise in every market we serve." },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="about-page__value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="about-page__value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="about-page__team">
        <div className="about-page__container">
          <motion.div
            className="about-page__team-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="about-page__label">Leadership</p>
            <h2>Meet Our Team</h2>
          </motion.div>
          <div className="about-page__team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="about-page__team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
