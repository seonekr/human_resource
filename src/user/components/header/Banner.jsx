import React, { useState, useEffect } from "react";
import "./css/banner.css";
import banner_job from "../../../img/banner_job.jpg";
import banner_job1 from "../../../img/banner_job1.jpg";
import banner_job2 from "../../../img/banner_job2.jpg";

const Banner = () => {
  const [slides, setSlides] = useState([banner_job, banner_job1, banner_job2]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState("right");

  const handlePrevSlide = () => {
    setDirection("left");
    setActiveSlide(activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
  };

  const handleNextSlide = () => {
    setDirection("right");
    setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
      <div>
        <div className="slider_banner">
          <div className={`slide_banner ${direction}`} style={{backgroundImage: `url(${slides[activeSlide]})`}}></div>
          <div className="navigation_banner but1_banner">
            <div className="nav-btn_banner " onClick={handlePrevSlide}>&#8249;</div>
          </div>
          <div className="navigation_banner but2_banner">
            <div className="nav-btn_banner " onClick={handleNextSlide}>&#8250;</div>
          </div>
        </div>
      </div>

  );
};

export default Banner;