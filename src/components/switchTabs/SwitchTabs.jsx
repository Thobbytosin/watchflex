/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styles from '../../style'

const SwitchTabs = ({data, onTabChange}) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)


    const activeTab = ( tab, index) => {
        setLeft(index * 70)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onTabChange(tab, index)
    }
    const activeTabDesktop = ( tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onTabChange(tab, index)
    }


  return (
    <>
        <div className={`block md:hidden bg-white h-[28px] md:h-[34px] rounded-[28px] p-0.5 `}>
                <div className={`${styles.flexItemsCenter} h-[24px] relative` }> 
                    {data.map((tab, index) => (
                        <span 
                            key={index} 
                            className={`h-full ${styles.flexCenter} w-[70px] md:w-[100px] cursor-pointer z-20 md:text-[14px] text-[12px] font-poppins font-medium transition-all relative ${selectedTab === index ? 'text-white' : 'text-black1 '}`}
                            onClick={() => activeTab(tab, index)}
                        >

                            {tab}
                        </span>
                    ))}
                    <span className='h-[24px] md:h-[30px] w-[70px] md:w-[100px] rounded-[32px] absolute button-gradient transition-all cursor-pointer' style={{ left }} />
                </div>
        </div>

        <div className={`hidden md:block bg-white h-[34px] rounded-[32px] p-0.5 `}>
                <div className={`${styles.flexItemsCenter} h-[30px] relative` }> 
                    {data.map((tab, index) => (
                        <span 
                            key={index} 
                            className={`h-full ${styles.flexCenter} w-[100px] cursor-pointer z-20 text-[14px] font-poppins font-medium transition-all relative ${selectedTab === index ? 'text-white' : 'text-black1 '}`}
                            onClick={() => activeTabDesktop(tab, index)}
                        >

                            {tab}
                        </span>
                    ))}
                    <span className='h-[30px] w-[100px] rounded-[32px] absolute button-gradient transition-all cursor-pointer' style={{ left }} />
                </div>
        </div>

    </>
  )
}

export default SwitchTabs