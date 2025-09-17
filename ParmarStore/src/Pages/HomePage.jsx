import React from 'react'
import HeroSection from '../components/HeroSection'

function HomePage() {
  const data={
    name:"thapa store"
  }
  return (
    <div className='p-2'> 
      <HeroSection mydata={data}/>
    </div>
  )
}

export default HomePage