import React from "react";
import "./aboutUs.css";
import bg from "./bg.jpg";
import grl from "./officegrl.jpg";

const AboutUs = () => {
  return (
    <div className="about-us" style={{ backgroundImage: `url(${bg})` }}>
      <div class="box-1">
        <div class="pic">
          <img src={grl} alt="" />
        </div>
        <p class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          repudiandae aut vero laboriosam accusantium esse ipsa nulla molestias
          facilis tempore. Culpa nam aut officiis totam quasi inventore ullam
          dolorum? Eum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Vel repudiandae aut vero laboriosam accusantium esse ipsa nulla
          molestias facilis tempore. Culpa nam aut officiis Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Vel repudiandae aut vero
          laboriosam accusantium esse ipsa nulla molestias facilis tempore.
          Culpa nam aut officiis totam quasi inventore ullam dolorum? Eum? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Vel repudiandae aut
          vero laboriosam accusantium esse ipsa nulla molestias facilis tempore.
          Culpa nam aut officiis Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Vel repudiandae aut vero laboriosam accusantium esse
          ipsa nulla molestias facilis tempore. Culpa nam aut officiis totam
          quasi inventore ullam dolorum? Eum? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Vel repudiandae aut vero laboriosam
          accusantium esse ipsa nulla molestias facilis tempore. Culpa nam aut
          officiis Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          repudiandae aut vero laboriosam accusantium esse ipsa nulla molestias
          facilis tempore. Culpa nam aut officiis totam quasi inventore ullam
          dolorum? Eum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Vel repudiandae aut vero laboriosam accusantium esse ipsa nulla
          molestias facilis tempore. Culpa nam aut officiis Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Vel repudiandae aut vero
          laboriosam accusantium esse ipsa nulla molestias facilis tempore.
          Culpa nam aut officiis totam quasi inventore ullam dolorum? Eum? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Vel repudiandae aut
          vero laboriosam accusantium esse ipsa nulla molestias facilis tempore.
          Culpa nam aut officiis
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
