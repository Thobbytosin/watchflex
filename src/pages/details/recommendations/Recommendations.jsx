/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import useFetch from '../../../hooks/useFetch'
import styles from '../../../style'
import Carousel from '../../../components/carousel/Carousel'

const Recommendations = ({ mediaType, id}) => {
const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)
// console.log(data)

const title = mediaType === "movie" ? "Movies Recommendations" : "Tv Shows Recommendations"

  return (
    <div className={`${styles.marginY}`}>
      { data?.results?.length > 0 ? 
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        /> : ' '
      }
    </div>
  )
}

export default Recommendations