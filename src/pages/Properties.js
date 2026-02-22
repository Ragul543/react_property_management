import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiAdjustments } from "react-icons/hi";
import PropertyCard from "../components/PropertyCard";
import { fetchProperties, processPropertyData } from "../services/api";
import demoProperties from "../data/properties";
import "./Properties.css";

const Properties = () => {
  const location = useLocation();
  const searchState = location.state || {};

  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchState.location || "");
  const [type, setType] = useState(searchState.type || "");
  const [priceRange, setPriceRange] = useState(searchState.priceRange || "");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    try {
      let priceMin, priceMax;
      if (priceRange) {
        [priceMin, priceMax] = priceRange.split("-");
      }

      // Map UI type values to Odoo property_type values
      const typeMap = {
        Villa: "residential",
        House: "residential",
        Penthouse: "residential",
        Apartment: "residential",
        Loft: "residential",
        Land: "land",
        Commercial: "commercial",
        Industrial: "industry",
        residential: "residential",
        land: "land",
        commercial: "commercial",
        industry: "industry",
      };

      const res = await fetchProperties({
        search,
        type: typeMap[type] || type || undefined,
        priceMin,
        priceMax,
        sort: sortBy,
        limit: 50,
      });

      if (res.status === "success" && res.data.length > 0) {
        setProperties(res.data.map(processPropertyData));
        setTotal(res.total);
      } else {
        // Fallback to demo data with client-side filtering
        let filtered = [...demoProperties];
        if (search) {
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.location.toLowerCase().includes(search.toLowerCase())
          );
        }
        setProperties(filtered);
        setTotal(filtered.length);
      }
    } catch {
      setProperties(demoProperties);
      setTotal(demoProperties.length);
    } finally {
      setLoading(false);
    }
  }, [search, type, priceRange, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(loadProperties, 300);
    return () => clearTimeout(debounce);
  }, [loadProperties]);

  const clearFilters = () => {
    setSearch("");
    setType("");
    setPriceRange("");
    setSortBy("");
  };

  return (
    <div className="properties-page">
      <div className="properties-page__hero">
        <div className="properties-page__hero-overlay" />
        <motion.div
          className="properties-page__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="properties-page__label">Our Portfolio</p>
          <h1>Exclusive Properties</h1>
          <p>Discover our curated collection of the world's finest properties</p>
        </motion.div>
      </div>

      <div className="properties-page__container">
        <div className="properties-page__toolbar">
          <div className="properties-page__search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="properties-page__filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiAdjustments /> Filters
          </button>
        </div>

        <motion.div
          className={`properties-page__filters ${showFilters ? "properties-page__filters--open" : ""}`}
          initial={false}
          animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="properties-page__filters-inner">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="industry">Industrial</option>
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">Any Price</option>
              <option value="0-2000000">Under $2M</option>
              <option value="2000000-5000000">$2M - $5M</option>
              <option value="5000000-10000000">$5M - $10M</option>
              <option value="10000000-999999999">$10M+</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="sqft">Largest</option>
            </select>
            <button className="properties-page__clear" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </motion.div>

        <div className="properties-page__count">
          <span>{total}</span> properties found
        </div>

        {loading ? (
          <div className="properties-page__loading">
            <div className="properties-page__spinner" />
            <p>Loading properties...</p>
          </div>
        ) : (
          <div className="properties-page__grid">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="properties-page__empty">
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
