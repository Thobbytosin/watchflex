/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from '../../../style'
import { useSelector } from 'react-redux'
import avatar from '../../../assets/avatar.png'
import Img from '../../../components/lazyloadimage/Img'

const Cast = ({ data, loading }) => {
  const {url} = useSelector((state) => state.home)

  const skeleton = () => {
    return (
        <div>
          <div className=' rounded-full w-[125px] h-[125px] bg-[#0a2955] overflow-hidden profile-img'></div>
          <div className=' font-poppins text-center mt-4 w-full h-[20px] bg-[#0a2955]'>
            <h2 className=' text-white font-normal mb-2 text-[18px]'></h2>
            <p className=' text-dimWhite font-light '></p>
          </div>
        </div>
    )
  }

  return (
    <div className={`${styles.marginY} `}>
      <h2 className=' font-poppins text-white text-[24px] md:text-[28px] mb-4'>Top Cast</h2>
      {!loading ? 
        <div className={`${styles.flexItemsCenter} overflow-y-hidden mt-0  gap-4`}>
          {data?.map((item) => {
            const profile = item?.profile_path ? url?.profile + item?.profile_path : avatar

            return (
              <div key={item.id} className=' '>
                <div className=' rounded-full w-[125px] h-[125px] overflow-hidden profile-img'>
                  <Img src={profile} />
                </div>

                <div className=' font-poppins text-center mt-4'>
                  <h2 className=' text-white font-normal mb-2 text-[14px] md:text-[16px]'>{item.name}</h2>
                  <p className=' text-dimWhite font-normal text-[12px] md:text-[14px] '>{item.character}</p>
                </div>

              </div>
            )
    
          })}
        </div>
        : 
        <div className={`${styles.flexItemsCenter} overflow-y-hidden mt-8  gap-4`}>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
        </div>
      
      }
    </div>
  )
}

export default Cast