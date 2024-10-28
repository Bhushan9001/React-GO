import React from 'react'
import Navbar from '../components/Navbar'
import Landing from './Landing'
import Categories from '../components/Categories'
import About from './About'
import Footer from '../components/Footer'
import landingBg from '../assets/landingBg.png'
import Contact from './Contact'

function HomePage() {
  return (
    <div className='bg-cover md:bg-center w-full bg-fixed' style={{ backgroundImage: `url(${landingBg})` }}>
      <Navbar/>
      <Landing/>
      <Categories/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default HomePage
