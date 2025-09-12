import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";


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
  </div>
    </div>
  )
}

export default Nav