import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="shadow-md bg-zinc-700 fixed w-full top-0 left-0 z-50">
      <div className="flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <div className="font-bold text-2xl cursor-pointer">
          <Link to={"/"}>MyShop</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <Link to={"/"} className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to={"/products"} className="hover:text-blue-600">
              Products
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="hover:text-blue-600">
              Contact
            </Link>
          </li>
          <li>
            <Link to={"/cart"} className="flex items-center gap-2">
              <FiShoppingCart />
              <span className="cart-total bg-blue-600 text-black text-xs px-2 py-0.5 rounded-full">
                10
              </span>
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <CgClose /> : <CgMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden bg-zinc-700  absolute w-full left-0 transition-all duration-300 ease-in ${
          open ? "top-16 opacity-100" : "top-[-490px] opacity-0"
        }`}
      >
        <li className="py-3 px-6 border-b">
          <Link to={"/"} onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        <li className="py-3 px-6 border-b">
          <Link to={"/about"} onClick={() => setOpen(false)}>
            About
          </Link>
        </li>
        <li className="py-3 px-6 border-b">
          <Link to={"/products"} onClick={() => setOpen(false)}>
            Products
          </Link>
        </li>
        <li className="py-3 px-6 border-b">
          <Link to={"/contact"} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </li>
        <li className="py-3 px-6 border-b flex items-center gap-2">
          <FiShoppingCart />
          <span className="cart-total bg-blue-600 text-black text-xs px-2 py-0.5 rounded-full">
            10
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
