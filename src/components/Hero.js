import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { MdKingBed, MdAttachMoney } from "react-icons/md";
import "./Hero.css";

const heroImages = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchData, setSearchData] = useState({
    location: "",
    type: "",
    priceRange: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/properties", { state: searchData });
  };

  return (
    <section className="hero">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero__bg ${index === currentImage ? "hero__bg--active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero__overlay" />

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="hero__subtitle">Welcome to LuxeEstates</p>
          <h1 className="hero__title">
            Discover Your
            <br />
            <span>Dream Property</span>
          </h1>
          <p className="hero__desc">
            Explore the world's most exclusive properties. From oceanfront villas
            to sky-high penthouses, find the home that matches your lifestyle.
          </p>
        </motion.div>

        <motion.form
          className="hero__search"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="hero__search-field">
            <HiLocationMarker className="hero__search-icon" />
            <input
              type="text"
              placeholder="City or Location"
              value={searchData.location}
              onChange={(e) =>
                setSearchData({ ...searchData, location: e.target.value })
              }
            />
          </div>
          <div className="hero__search-divider" />
          <div className="hero__search-field">
            <MdKingBed className="hero__search-icon" />
            <select
              value={searchData.type}
              onChange={(e) =>
                setSearchData({ ...searchData, type: e.target.value })
              }
            >
              <option value="">Property Type</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Loft">Loft</option>
              <option value="Estate">Estate</option>
            </select>
          </div>
          <div className="hero__search-divider" />
          <div className="hero__search-field">
            <MdAttachMoney className="hero__search-icon" />
            <select
              value={searchData.priceRange}
              onChange={(e) =>
                setSearchData({ ...searchData, priceRange: e.target.value })
              }
            >
              <option value="">Price Range</option>
              <option value="0-2000000">Under ₹20 L</option>
              <option value="2000000-5000000">₹20 L - ₹50 L</option>
              <option value="5000000-10000000">₹50 L - ₹1 Cr</option>
              <option value="10000000-999999999">₹1 Cr+</option>
            </select>
          </div>
          <button type="submit" className="hero__search-btn">
            <FiSearch />
            <span>Search</span>
          </button>
        </motion.form>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="hero__stat">
            <strong>500+</strong>
            <span>Premium Listings</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <strong>200+</strong>
            <span>Happy Clients</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <strong>15+</strong>
            <span>Years Experience</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__indicators">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentImage ? "hero__indicator--active" : ""}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
