/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyloadimage/Img';
import styles from '../../../style';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)

  const {data, loading} = useFetch("/movie/upcoming")
  // console.log(data)
  
  useEffect(() => {
      const bg = 
        url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
      setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if(event.key === 'Enter' && query.length > 0) {
        navigate(`/search/${query}`)
    }
  }
  const searchQueryButtonHandler = () => {
        navigate(`/search/${query}`)
    
  }


  return (
    <div className={`w-full h-[400px] md:h-[500px] flex items-center bg-black1 relative ${styles.paddingX}`}>
          
            {!loading && <
              div className="overflow-hidden opacity-80 w-full h-full absolute top-0 left-0">
                <Img className=" h-full object-cover " src={background} />
              </div> 
            }

            <div className='hidden md:block w-full h-[250px] absolute md:bottom-0 left-0 bg-fade-gradient' />

            <div className='block md:hidden w-full h-[300px] absolute -top-10 left-0 bg-fade-gradient' />

            <div className=" w-full max-w-[1000px] mx-auto text-center z-10 -mb-10 md:mt-0">
                  <div className=' font-poppins'>
                    <span className=" text-white text-[52px] md:text-[86px] md:mb-4"></span> <br />
                    <span className=" text-white font-normal md:text-[18px] text-[12px] leading-4 md:leading-6 ">Watch your latest Movies and Tv Shows right here on WatchFlex. Explore now.</span>
                    
                  </div>
                  <div className="w-full mt-6 md:mt-8 flex">
                    <input 
                        type="text"
                        placeholder="Search for a movie or tv show...." 
                        onChange={((e)=> setQuery(e.target.value))}
                        onKeyUp={searchQueryHandler}
                        className=' w-full outline-none border-none bg-white  rounded-tl-full rounded-bl-full md:py-4 md:px-8 py-2 px-4 font-poppins text-[11px] md:text-[15px]'
                    />
                    <button onClick={searchQueryButtonHandler} className=' md:py-4 md:px-8 py-2 px-4 button-gradient text-center text-white font-poppins rounded-tr-full rounded-br-full text-[11px] md:text-[15px]'>Search</button>
                  </div>
            </div>


    </div>
  )
}

export default HeroBanner