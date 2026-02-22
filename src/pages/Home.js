import React from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
