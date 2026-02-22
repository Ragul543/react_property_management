import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdApartment } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <MdApartment className="navbar__logo-icon" />
          <span>
            Luxe<strong>Estates</strong>
          </span>
        </Link>

        <div className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link to="/properties" className={location.pathname === "/properties" ? "active" : ""}>
            Properties
          </Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
          <Link to="/properties" className="navbar__cta">
            Explore Listings
          </Link>
        </div>

        <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
