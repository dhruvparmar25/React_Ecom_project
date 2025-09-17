import React from "react";
import { NavLink } from "react-router-dom";
import Banner from '../assets/banner.jpg'

function HeroSection({ mydata }) {
  console.log(mydata);

  return (
    <div >
      <div className="container max-w-[120rem] my-0    p-10 relative" >
        <div className="aquare w-90 h-50 bg-amber-200 absolute right-90 top-5">

        </div>
        <div className="flex justify-center items-center gap-32">
          <div className="ju hero-section-data   max-w-fit capitalize">
            <p className="intro-data">Welcome to</p>
            <h1>{mydata.name}</h1>
            <p className="w-120 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              totam molestiae repudiandae cumque, commodi, quis distinctio
              libero beatae laboriosam eaque harum expedita facilis placeat
              similique quo, aspernatur eum suscipit doloremque!
            </p>
            <NavLink>
              <button className="p-1.5 mt-2 bg-blue-600 text-amber-50 rounded">
                Shop now
              </button>
            </NavLink>
          </div>
          <div className="heroSection-image z-10 ">
          <img src={Banner} width={"350"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
