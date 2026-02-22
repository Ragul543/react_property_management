import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdKingBed, MdBathtub, MdSquareFoot, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { PLACEHOLDER_IMAGE } from "../services/api";
import "./PropertyCard.css";

const PropertyCard = ({ property, index }) => {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "Contact Us";
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  // Determine image - from Odoo API or fallback
  const imageUrl = (!imgError && property.images && property.images.length > 0)
    ? property.images[0]
    : (!imgError && property.image)
      ? property.image
      : PLACEHOLDER_IMAGE;

  // Map property type labels
  const typeLabels = {
    land: "Land",
    residential: "Residential",
    commercial: "Commercial",
    industry: "Industrial",
  };

  // Map sale/rent status
  const statusLabels = {
    for_sale: "For Sale",
    for_tenancy: "For Rent",
    for_auction: "Auction",
  };

  const displayType = typeLabels[property.property_type] || property.property_type || property.type || "";
  const displayStatus = statusLabels[property.sale_rent] || property.status || "For Sale";
  const displayPrice = property.sale_rent === "for_tenancy"
    ? `$${(property.rent_month || 0).toLocaleString()}/mo`
    : formatPrice(property.price);

  return (
    <motion.div
      className="property-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="property-card__image-wrapper">
        <img
          src={imageUrl}
          alt={property.name}
          className="property-card__image"
          onError={() => setImgError(true)}
        />
        <div className="property-card__image-overlay" />
        <span className="property-card__badge">{displayStatus}</span>
        {displayType && <span className="property-card__type">{displayType}</span>}
        <button
          className={`property-card__like ${liked ? "property-card__like--active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
        >
          {liked ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <div className="property-card__price">{displayPrice}</div>
      </div>

      <div className="property-card__content">
        <h3 className="property-card__title">{property.name}</h3>
        <p className="property-card__location">
          <HiLocationMarker /> {property.location || property.city || "Location not specified"}
        </p>

        <div className="property-card__features">
          {property.beds > 0 && (
            <div className="property-card__feature">
              <MdKingBed />
              <span>{property.beds} Beds</span>
            </div>
          )}
          {property.baths > 0 && (
            <div className="property-card__feature">
              <MdBathtub />
              <span>{property.baths} Baths</span>
            </div>
          )}
          {property.sqft > 0 && (
            <div className="property-card__feature">
              <MdSquareFoot />
              <span>{Math.round(property.sqft).toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <div className="property-card__footer">
          <div className="property-card__agent">
            {property.agent && property.agent.image && (
              <img src={property.agent.image} alt={property.agent.name} />
            )}
            <span>{property.agent?.name || property.landlord || property.responsible || ""}</span>
          </div>
          <Link to={`/property/${property.id}`} className="property-card__btn">
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
