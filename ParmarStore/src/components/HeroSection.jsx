import React from "react";
import { NavLink } from "react-router-dom";

function HeroSection({ mydata }) {
  console.log(mydata);

  return (
    <div className="bg-blue-300">
      <div className="container max-w-[120rem] my-0 mx-auto">
        <div className="grid grid-cols-2 gap-[9rem]">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to</p>
            <h1>{mydata.name}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              totam molestiae repudiandae cumque, commodi, quis distinctio
              libero beatae laboriosam eaque harum expedita facilis placeat
              similique quo, aspernatur eum suscipit doloremque!
            </p>
            <NavLink>
              <button className="border-1 p-1.5 mt-2 bg-blue-600 text-amber-50 rounded">
                Shop now
              </button>
            </NavLink>
          </div>
          <div className="heroSection-image">
            <img src="./heroImage.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
