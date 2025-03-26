/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styles from '../../../style'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie")
    
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)
    // console.log(data)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv")
    }

  return (
    <div className={`${styles.padding}`}>
        <div className={`flex justify-between`}>
            <h2 className=' font-poppins font-medium text-white capitalize text-[28px]'>Top Rated</h2>
            <SwitchTabs data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default TopRated