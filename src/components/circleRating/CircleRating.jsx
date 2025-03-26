/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const CircleRating = ({ rating }) => {
  return (
    <div className=' circle-rating -mb-8 z-20'>
        <CircularProgressbar
            value={rating}
            maxValue={10}
            text={rating}
            styles={buildStyles({
                pathColor:
                    rating < 5 ? "red" :
                    rating < 7 ? "orange" : "green"
            })} />
    </div>
  )
}

export default CircleRating