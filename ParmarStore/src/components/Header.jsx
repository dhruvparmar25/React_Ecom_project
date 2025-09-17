import React from 'react'
import { Link, NavLink } from "react-router-dom"
import Nav from './Nav'

function Header() {
  return (
    <div className='flex items-center justify-between bg-black text-white p-4'>
      <NavLink >
        Dhruv
      </NavLink>
      <Nav />

    </div>
  )
}

export default Header