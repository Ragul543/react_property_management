import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdKingBed, MdBathtub, MdSquareFoot, MdLocalParking, MdCalendarToday,
  MdPhone, MdEmail, MdCheckCircle, MdArrowBack, MdFavorite, MdShare,
  MdLayers, MdHome,
} from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { fetchPropertyDetail, submitInquiry, processPropertyData, PLACEHOLDER_IMAGE } from "../services/api";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPropertyDetail(id)
      .then((res) => {
        if (res.status === "success") {
          setProperty(processPropertyData(res.data));
        } else {
          setError("Property not found");
        }
      })
      .catch(() => setError("Failed to load property"))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return "Contact Us";
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        property_id: property.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-page__loading">
        <div className="detail-page__spinner" />
        <p>Loading property...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="detail-page__not-found">
        <h2>{error || "Property not found"}</h2>
        <Link to="/properties">Back to Properties</Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images.map((img) =>
        typeof img === 'string' ? { url: img, name: '', overview_image: '' } : img
      )
    : [{ url: PLACEHOLDER_IMAGE, name: '', overview_image: '' }];

  const overviewLabels = {
    front: "Front",
    back: "Back",
    right_side: "Right Side",
    left_side: "Left Side",
    "360_view": "360 View",
    others: "Others",
  };

  const statusLabels = {
    for_sale: "For Sale",
    for_tenancy: "For Rent",
    for_auction: "Auction",
  };

  const furnishLabels = {
    not_furnished: "Not Furnished",
    partially_furnished: "Partially Furnished",
    fully_furnished: "Fully Furnished",
  };

  return (
    <div className="detail-page">
      <div className="detail-page__hero">
        <div className="detail-page__hero-overlay" />
        <motion.div
          className="detail-page__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/properties" className="detail-page__back">
            <MdArrowBack /> Back to Properties
          </Link>
          <span className="detail-page__badge">
            {statusLabels[property.sale_rent] || "For Sale"}
          </span>
          <h1>{property.name}</h1>
          <p className="detail-page__location">
            <HiLocationMarker /> {property.location || property.city || ""}
          </p>
          <div className="detail-page__price">
            {property.sale_rent === "for_tenancy"
              ? `${formatPrice(property.rent_month)}/mo`
              : formatPrice(property.price)}
          </div>
        </motion.div>
      </div>

      <div className="detail-page__container">
        <div className="detail-page__main">
          {/* Gallery */}
          <motion.div
            className="detail-page__gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="detail-page__gallery-main">
              <img
                src={images[activeImage]?.url || PLACEHOLDER_IMAGE}
                alt={images[activeImage]?.name || property.name}
                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
              />
              {images[activeImage]?.overview_image && (
                <span className="detail-page__image-label">
                  {overviewLabels[images[activeImage].overview_image] || images[activeImage].overview_image}
                </span>
              )}
              <div className="detail-page__gallery-actions">
                <button><MdFavorite /> Save</button>
                <button><MdShare /> Share</button>
              </div>
            </div>
            {images.length > 1 && (
              <div className="detail-page__gallery-thumbs">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`detail-page__thumb ${index === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img.url}
                      alt={img.name || `View ${index + 1}`}
                      onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                    />
                    {img.overview_image && (
                      <span className="detail-page__thumb-label">
                        {overviewLabels[img.overview_image] || img.overview_image}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <div className="detail-page__quick-stats">
            {property.beds > 0 && (
              <div className="detail-page__stat">
                <MdKingBed />
                <div>
                  <strong>{property.beds}</strong>
                  <span>Bedrooms</span>
                </div>
              </div>
            )}
            {property.baths > 0 && (
              <div className="detail-page__stat">
                <MdBathtub />
                <div>
                  <strong>{property.baths}</strong>
                  <span>Bathrooms</span>
                </div>
              </div>
            )}
            {property.sqft > 0 && (
              <div className="detail-page__stat">
                <MdSquareFoot />
                <div>
                  <strong>{Math.round(property.sqft).toLocaleString()}</strong>
                  <span>Sq Ft</span>
                </div>
              </div>
            )}
            {property.parking > 0 && (
              <div className="detail-page__stat">
                <MdLocalParking />
                <div>
                  <strong>{property.parking}</strong>
                  <span>Parking</span>
                </div>
              </div>
            )}
            {property.total_floor > 0 && (
              <div className="detail-page__stat">
                <MdLayers />
                <div>
                  <strong>{property.total_floor}</strong>
                  <span>Floors</span>
                </div>
              </div>
            )}
            {property.construct_year && (
              <div className="detail-page__stat">
                <MdCalendarToday />
                <div>
                  <strong>{property.construct_year}</strong>
                  <span>Year Built</span>
                </div>
              </div>
            )}
            {property.furnishing && (
              <div className="detail-page__stat">
                <MdHome />
                <div>
                  <strong>{furnishLabels[property.furnishing] || property.furnishing}</strong>
                  <span>Furnishing</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <div className="detail-page__section">
              <h2>About This Property</h2>
              <p className="detail-page__description">{property.description}</p>
            </div>
          )}

          {/* Facilities */}
          {property.facilities && property.facilities.length > 0 && (
            <div className="detail-page__section">
              <h2>Amenities & Facilities</h2>
              <div className="detail-page__features">
                {property.facilities.map((facility, index) => (
                  <div key={index} className="detail-page__feature">
                    <MdCheckCircle /> {facility}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Area Measurements */}
          {property.areas && property.areas.length > 0 && (
            <div className="detail-page__section">
              <h2>Area Measurements</h2>
              <div className="detail-page__areas-table">
                <table>
                  <thead>
                    <tr>
                      <th>Room / Section</th>
                      <th>Length (ft)</th>
                      <th>Width (ft)</th>
                      <th>Area (sq ft)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.areas.map((area, index) => (
                      <tr key={index}>
                        <td>{area.name}</td>
                        <td>{area.length}</td>
                        <td>{area.width}</td>
                        <td>{area.area.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Nearby Connectivity */}
          {property.nearby && property.nearby.length > 0 && (
            <div className="detail-page__section">
              <h2>Nearby Places</h2>
              <div className="detail-page__features">
                {property.nearby.map((nb, index) => (
                  <div key={index} className="detail-page__feature">
                    <HiLocationMarker />
                    {nb.name} — {nb.distance_km} km {nb.direction && `(${nb.direction})`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {property.tags && property.tags.length > 0 && (
            <div className="detail-page__section">
              <h2>Tags</h2>
              <div className="detail-page__tags">
                {property.tags.map((tag, index) => (
                  <span key={index} className="detail-page__tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="detail-page__sidebar">
          {/* Agent Card */}
          {property.agent && property.agent.name && (
            <div className="detail-page__agent-card">
              <h3>Listed By</h3>
              <div className="detail-page__agent-info">
                <img
                  src={property.agent.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt={property.agent.name}
                  onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg"; }}
                />
                <div>
                  <h4>{property.agent.name}</h4>
                  <p>Property Specialist</p>
                </div>
              </div>
              <div className="detail-page__agent-contact">
                {property.agent.phone && (
                  <a href={`tel:${property.agent.phone}`}>
                    <MdPhone /> {property.agent.phone}
                  </a>
                )}
                {property.agent.email && (
                  <a href={`mailto:${property.agent.email}`}>
                    <MdEmail /> {property.agent.email}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Inquiry Form */}
          <div className="detail-page__inquiry">
            <h3>Schedule a Viewing</h3>
            {submitted ? (
              <div className="detail-page__success">
                <MdCheckCircle />
                <p>Thank you! Your inquiry has been submitted. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <textarea
                  placeholder="I'm interested in this property..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                />
                <button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
