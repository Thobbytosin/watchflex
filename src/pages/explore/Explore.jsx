/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from '../../style'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import useFetch from '../../hooks/useFetch'
import './style.scss'
import { fetchDataFromApi } from '../../utils/api'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'

let filters = {}

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const { mediaType } = useParams()
    const [genre, setGenre] = useState(null)
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortby, setSortby] = useState(null);

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`)
    // console.log(genresData)

    const fetchInitialData = () => {
      setLoading(true)
      fetchDataFromApi(`/discover/${mediaType}`, filters ).then((res) => {
        setData(res)
        setLoading(false)
        setPageNum((prev) => prev + 1)
      })
      console.log(data)
      console.log(filters)
    }

    const fetchNextPageData = () => {
      fetchDataFromApi(`/discover/${mediaType}?pages=${pageNum}`, filters ).then((res) => {
        if(data?.results) {
          setData({
            ...data, 
            results: [...data?.results, res.results]
          })
        }
        setPageNum((prev) => prev + 1)
      })
    }

    useEffect(() => {
      filters = {}
      setData(null)
      setPageNum(1)
      setSortby(null)
      setGenre(null)
      fetchInitialData()
    }, [mediaType])

    const onChange = (selectedItems, action) => {
      if (action.name === "sortby") {
          setSortby(selectedItems);
          console.log(sortby)
          if (action.action !== "clear") {
              filters.sort_by = selectedItems.value;
          } else {
              delete filters.sort_by;
          }
      }

      if (action.name === "genres") {
          setGenre(selectedItems);
          if (action.action !== "clear") {
              let genreId = selectedItems.map((g) => g.id);
              genreId = JSON.stringify(genreId).slice(1, -1);
              filters.with_genres = genreId;
          } else {
              delete filters.with_genres;
          }
      }

      setPageNum(1);
      fetchInitialData();
  };

  return (
    <div className={`${styles.paddingX} py-[100px]`}>
      <div className={`${styles.flexJustifyBetween} flex-col md:flex-row`}>
          <h2 className=" text-white text-[26px] font-poppins my-6">
            {mediaType === "movie" ? "Explore Movies" : "Explore Tv Shows"}
          </h2>

          <div className='flex flex-col md:flex-row gap-2 z-20 filters'>
            <Select 
              isMulti
              name='genres'
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select Genres"
              className="react-select-container genresDD font-poppins"
              classNamePrefix="react-select"
            />
            <Select
              isMulti
              name='sort by'
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort By"
              className="react-select-container genresDD font-poppins"
              classNamePrefix="react-select"
            />
          </div>
      </div>

      {loading && <Spinner initial={true} />}
      {!loading && (
        <InfiniteScroll
            className=" flex flex-wrap justify-center  gap-4"
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner />}
        >
          {data?.results?.map((item, index) => {
            if (item?.media_type === 'person') return
            return (
              <MovieCard 
                key={index} 
                data={item}
                mediaType={mediaType}
              />
            )
          })}
        
        </InfiniteScroll>
      )}
    </div>
  )
}

export default Explore