import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";



function Nav() {
  return (
    <div>
      <div className="navbar ">
        <div className="navbar-list flex gap-20 mx-10 items-center" >
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/Contact"}>Contact</Link>
          <Link className='flex gap-2 items-center' to={"/cart"}><FiShoppingCart />
            <span className='cart-total'>10</span></Link>
        </div>
        {/* <div className="mobile-navbar-btn block md:hidden z-[9999] bg-transparent cursor-pointer border-none">
          <CgMenu
            name='menu-outline'
            className="mobile-nav-icon text-[2rem] md:text-[4.2rem]"
          />
          <CgClose
            name='close-outline'
            className="mobile-nav-icon close-outline hidden text-[2rem] md:text-[4.2rem]"
          />
        </div> */}
        <div
  className={`mobile-navbar-btn block md:hidden z-[9999] bg-transparent cursor-pointer border-none relative ${
    isActive ? "active" : ""
  }`}
>
  {/* Menu Icon */}
  <CgMenu
    name="menu-outline"
    className={`mobile-nav-icon text-[2rem] md:text-[4.2rem] absolute top-[30%] right-[10%] z-[9999] ${
      isActive ? "hidden" : "inline-block"
    }`}
  />

  {/* Close Icon */}
  <CgClose
    name="close-outline"
    className={`mobile-nav-icon close-outline text-[2rem] md:text-[4.2rem] absolute top-[30%] right-[10%] z-[9999] ${
      isActive ? "inline-block" : "hidden"
    }`}
  />
</div>


      </div>
    </div>
  )
}

export default Nav