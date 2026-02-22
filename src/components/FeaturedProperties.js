import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { fetchProperties, processPropertyData } from "../services/api";
import demoProperties from "../data/properties";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties({ limit: 6, sort: 'newest' })
      .then((res) => {
        if (res.status === 'success' && res.data.length > 0) {
          setProperties(res.data.map(processPropertyData));
        } else {
          setProperties(demoProperties);
        }
      })
      .catch(() => {
        setProperties(demoProperties);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="featured">
      <div className="featured__container">
        <motion.div
          className="featured__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="featured__label">Curated Collection</p>
          <h2 className="featured__title">Featured Properties</h2>
          <p className="featured__desc">
            Handpicked selection of the finest properties available, each offering
            exceptional quality, prime locations, and unparalleled luxury.
          </p>
        </motion.div>

        {loading ? (
          <div className="featured__loading">
            <div className="featured__spinner" />
            <p>Loading properties...</p>
          </div>
        ) : (
          <div className="featured__grid">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}

        <motion.div
          className="featured__cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/properties" className="featured__btn">
            View All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
