/* eslint-disable no-unused-vars */
import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

const Home = () => {
  return (
    <div>
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
        {/* <div className=' h-[1000px]'></div> */}
    </div>
  )
}

export default Home