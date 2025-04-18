/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({src}) => {
  return (
    <LazyLoadImage
        alt=''
        effect='blur'
        src={src} />
  )
}

export default Img