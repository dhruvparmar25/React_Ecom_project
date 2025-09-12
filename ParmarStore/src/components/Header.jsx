import React from 'react'
import { Link, NavLink } from "react-router-dom"
import Nav from './Nav'

function Header() {
  return (
    <div className='flex items-center justify-between'>
      <NavLink >
        <Link to={'/'} >Dhruv</Link>
      </NavLink>
      <Nav />

    </div>
  )
}

export default Header