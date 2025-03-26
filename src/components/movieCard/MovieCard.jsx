/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import PosterFallBack from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import Img from '../lazyloadimage/Img'
import { useNavigate } from 'react-router-dom'


const MovieCard = ({ key, data, mediaType: endpoint }) => {
    const { url } = useSelector((state) => state.home )
    const navigate = useNavigate()
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallBack

  return (
    <div key={key}>
        <div className='flex gap-4 overflow-hidden -mx-5 px-5 mt-10 '>
              <div className=' w-[185px] flex-shrink-0 cursor-pointer' onClick={() => navigate(`/${data.media_type || endpoint }/${data.id}`)}>
                  <div className='posterBlock'> 
                    <Img src={posterUrl} />
                  </div>
                  <div>
                    <h4 className=' w-[175px] text-white font-poppins font-medium capitalize truncate text-[15px] '>
                      {data.title || data.name }
                    </h4>
                    <span className=' block text-dimWhite font-poppins font-normal mt-4'>
                      {dayjs(data.release_date).format('MMM DD, YYYY')}
                    </span>
                  </div>

              </div>
        
          </div>
    </div>
  )
}

export default MovieCard