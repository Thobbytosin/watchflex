/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styles from '../../../style'
import Img from '../../../components/lazyloadimage/Img'
import { PlayIcon } from '../PlayIcon'
import VideoPopup from '../../../components/videopopup/VideoPopup'


const VideoSection = ({ data, loading }) => {
    const [ show, setShow ] = useState(false)
    const [ videoId, setVideoId ] = useState(null)

    const skeleton = () => {
        return (
            <div className=' w-[180px] h-[100px]  cursor-pointer rounded-[12px] bg-[#0a2955]'>

            </div>
        )
    }

  return (
    <div className={`${styles.marginY}`}>
        <h2 className=' font-poppins text-white text-[24px] md:text-[28px] mb-6'>Official Videos</h2>
        {data?.results?.length > 0 ? (
                !loading 
                    ? 
                    <div className={`${styles.flexStart} overflow-y-hidden mt-8 text-start gap-2 md:gap-4`}>
                        {data?.results?.map((video) => {
                            return (
                                <div 
                                    onClick={() => {
                                        setShow(true)
                                        setVideoId(video?.key)
                                    }}
                                    key={video?.id} 
                                    className=' md:w-[200px] w-[140px]  flex-shrink-0 cursor-pointer'
                                >
                                    <div className=' relative official-video mb-4 overflow-hidden '>
                                        <Img src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} />
                                        <PlayIcon />
                                    </div>
                                    <div>
                                        <h2 className=' text-white font-poppins text-[12px] md:text-[14px] '>{video?.name}</h2>
                                    </div>
                                </div>
                            )
                        } )}
                    </div> 
                    :
                    <div className=' flex gap-4'>
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ) : <span className=" text-blackLighter font-poppins text-[20px] md:text-[26px]">Sorry...No official videos yet!</span> }
        <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
        />
    </div>
  )
}

export default VideoSection