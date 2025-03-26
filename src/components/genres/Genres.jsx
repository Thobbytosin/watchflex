/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector } from "react-redux"


const Genres = ({ data }) => {
    const { genres } =  useSelector((state) => state.home)
    // console.log(data)

  return (
    <div className=" z-20 flex gap-1 ">
        {data?.map((genreId) => {
            if(!genres[genreId]?.name) return;
            
            return (
                <div key={genreId} className="  text-white font-poppins font-light text-center text-[11px] bg-pink rounded-xl  px-1.5 py-1 whitespace-pre-line flex items-center">
                    {genres[genreId]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres