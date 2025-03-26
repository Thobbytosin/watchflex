/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styles from '../../../style'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")
    
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    // console.log(data)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }

  return (
    <div className={`${styles.padding}`}>
        <div className={`flex justify-between`}>
            <h2 className=' font-poppins font-medium text-white capitalize text-[28px]'>Trending</h2>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default Trending