import type { NextPage } from 'next'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainPage from '../components/MainPage'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <MainPage />
      </main>
	  <Footer/>
    </React.Fragment>
  )
}

export default Home
