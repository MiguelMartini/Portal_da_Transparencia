import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MainContent from './MainContent/MainContent'

function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <div className='flex-1'>
        <MainContent/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home