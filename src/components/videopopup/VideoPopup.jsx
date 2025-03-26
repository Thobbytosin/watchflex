/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from '../../style'
import  ReactPlayer  from 'react-player/youtube'

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const closeVideoPopup  = () => {
        setShow(false)
        setVideoId(null)
    }
  return (
    <div className={`fixed inset-0 w-full h-full z-30 ${styles.flexCenter} ${show ? ' opacity-100 visible' : 'opacity-0 invisible'} `}>
        <div onClick={closeVideoPopup} className={`absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.2)] cursor-pointer ${show ? 'backdrop-blur-[4px] opacity-100' : 'opacity-0'}backdrop-blur-[4px]`} />
        <div className='relative md:w-[55%] w-[95%] h-[45%] md:h-[60%] mx-auto bg-[#0a2955] rounded-md  font-poppins z-30'>
            <span onClick={closeVideoPopup} className=' absolute right-0 -top-5  cursor-pointer text-white transition-all hover:text-pink '>Close</span>
            <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
            />
        </div>
    </div>
  )
}

export default VideoPopup