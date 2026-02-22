import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdCheckCircle } from "react-icons/md";
import { submitContact } from "../services/api";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <div className="contact-page__hero-overlay" />
        <motion.div
          className="contact-page__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="contact-page__label">Get In Touch</p>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out for any inquiries.</p>
        </motion.div>
      </div>

      <div className="contact-page__container">
        <div className="contact-page__grid">
          <motion.div
            className="contact-page__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let's Start a Conversation</h2>
            <p className="contact-page__info-desc">
              Whether you're looking to buy, sell, or simply explore the market,
              our team is ready to assist you with personalized guidance.
            </p>

            <div className="contact-page__info-items">
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon">
                  <MdLocationOn />
                </div>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Luxury Avenue, Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon">
                  <MdPhone />
                </div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (310) 555-0100</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon">
                  <MdEmail />
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p>info@luxeestates.com</p>
                </div>
              </div>
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon">
                  <MdAccessTime />
                </div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-page__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="contact-page__form contact-page__success">
                <MdCheckCircle className="contact-page__success-icon" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-page__form" onSubmit={handleSubmit}>
                <h3>Send a Message</h3>
                <div className="contact-page__form-row">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-page__form-row">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="">Select Subject</option>
                    <option value="buying">Buying a Property</option>
                    <option value="selling">Selling a Property</option>
                    <option value="consultation">General Consultation</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <textarea
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  required
                />
                <button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
