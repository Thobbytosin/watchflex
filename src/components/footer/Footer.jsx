/* eslint-disable no-unused-vars */
import React from 'react'
import "./style.scss"
import styles from '../../style'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className={`${styles.flexCenter} flex-col bg-black3 ${styles.padding} z-10 relative`}>
      <ul className={`${styles.flexItemsCenter} flex-col md:flex-row gap-6`}>
        <li className=' text-white font-poppins font-medium cursor-pointer transition-all hover:text-pink'>Terms Of Use</li>
        <li className=' text-white font-poppins font-medium cursor-pointer transition-all hover:text-pink'>Privacy Policy</li>
        <li className=' text-white font-poppins font-medium cursor-pointer transition-all hover:text-pink'>About</li>
        <li className=' text-white font-poppins font-medium cursor-pointer transition-all hover:text-pink'>Blog</li>
        <li className=' text-white font-poppins font-medium cursor-pointer transition-all hover:text-pink'>FAQ</li>
      </ul>
      <p className=' text-white font-poppins font-extralight text-center my-10 max-w-[930px] leading-6 text-[12px] md:text-[15px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta magni eum est at. Itaque, porro repellendus est modi rerum vero soluta, nobis excepturi doloribus ad in natus cumque facere obcaecati!</p>
      <div className={`${styles.flexCenter} gap-4`}>
        <div className=' text-white rounded-2xl p-4 bg-black2 cursor-pointer transition-all hover:text-pink'><FaFacebookF /></div>
        <div className=' text-white rounded-2xl p-4 bg-black2 cursor-pointer transition-all hover:text-pink'><FaInstagram /></div>
        <div className=' text-white rounded-2xl p-4 bg-black2 cursor-pointer transition-all hover:text-pink'><a href="https://twitter.com/theTobilobahh" target='blank'><FaTwitter /></a></div>
        <div className=' text-white rounded-2xl p-4 bg-black2 cursor-pointer transition-all hover:text-pink'><FaLinkedin /></div>
      </div>
    </div>
  )
}

export default Footer