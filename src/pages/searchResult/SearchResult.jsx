/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.scss"
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import styles from "../../style";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
        const { query } = useParams()
        const [data, setData] = useState(null)
        const [loading, setLoading] = useState(false)
        const [pageNum, setPageNum] = useState(1)

        const fetchInitialData = () => {
          setLoading(true)
            fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
              setData(res)
              setLoading(false)
              setPageNum((prev) => prev + 1)
            })
            // console.log(data)
        }

        const fetchNextData = () => {
            fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
              if(data?.results) {

                setData({
                  ...data, 
                  results: [...data?.results, ...res.results]
                })
              } else {
                setData(res)
              }
              setPageNum((prev) => prev + 1)
            })
            // console.log(data)
        }

        useEffect(() => {
          setPageNum(1)
          fetchInitialData()
        }, [query])

        return (
          <div className={`${styles.paddingX} pt-[100px] pb-[20px]`}>
            {loading && <Spinner />}
            {!loading && 
              <div>
                {data?.results?.length > 0 ? (
                  <>
                    <h2 className=" text-white text-[26px] font-poppins my-6">{`Search ${data?.total_results > 1 ? "results" : "result"} of '${`${query}`}'`}</h2>
                    <InfiniteScroll
                        className=" flex flex-wrap gap-4"
                        dataLength={data?.results?.length || []}
                        next={fetchNextData}
                        hasMore={pageNum <= data?.total_pages}
                        loader={<Spinner />}
                    >
                      {data?.results?.map((item, index) => {
                        if (item?.media_type === 'person') return
                        return (
                          <MovieCard 
                            key={index} 
                            data={item}
                          />
                        )
                      })}
                        
                    </InfiniteScroll>
                  </>
                ) : 
                (
                  <span className=" text-blackLighter font-poppins text-[20px] md:text-[26px] ">Results Not Found</span>
                )}
              </div>
            }
           
          </div>
        )
}

export default SearchResult