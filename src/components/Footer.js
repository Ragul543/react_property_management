import React from "react";
import { Link } from "react-router-dom";
import { MdApartment, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <MdApartment />
              <span>
                Luxe<strong>Estates</strong>
              </span>
            </div>
            <p className="footer__brand-desc">
              Setting the gold standard in luxury real estate since 2009. We
              connect discerning buyers with exceptional properties worldwide.
            </p>
            <div className="footer__social">
              <a href="#!" className="footer__social-link"><FaFacebookF /></a>
              <a href="#!" className="footer__social-link"><FaTwitter /></a>
              <a href="#!" className="footer__social-link"><FaInstagram /></a>
              <a href="#!" className="footer__social-link"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4>Property Types</h4>
            <Link to="/properties">Villas</Link>
            <Link to="/properties">Penthouses</Link>
            <Link to="/properties">Apartments</Link>
            <Link to="/properties">Estates</Link>
          </div>

          <div className="footer__col">
            <h4>Contact Info</h4>
            <p>
              <MdLocationOn /> 123 Luxury Ave, Beverly Hills, CA 90210
            </p>
            <p>
              <MdPhone /> +1 (310) 555-0100
            </p>
            <p>
              <MdEmail /> info@luxeestates.com
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 LuxeEstates. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
