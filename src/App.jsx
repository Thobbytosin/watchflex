/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import {BrowserRouter, Routes , Route} from 'react-router-dom'

import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'
import PageNotFound from './pages/404/PageNotFound'

import { Footer, Header } from './components'

function App() {
      const dispatch = useDispatch()
      const {url} = useSelector((state) => state.home)
      

      useEffect(() => {
        fetchApiConfig();
        genresCall()
      }, [])

      const fetchApiConfig = async () => {
        fetchDataFromApi("/configuration").then((res) => {
          // console.log(res)

          const url = {
            backdrop: res.images.secure_base_url + "original",
            poster: res.images.secure_base_url + "original",
            profile: res.images.secure_base_url + "original",
          }
          dispatch(getApiConfiguration(url))
        })
      }

      const genresCall = async () => {
        const promises = []
        const endpoints = ["movie", "tv"]
        const allGenres = {}

        endpoints.forEach((url) => {
          promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises)

        data.map((genres) => {
          return genres.genres.map((item) => allGenres[item.id] = item)
        })

        dispatch(getGenres(allGenres))

      }

      return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:mediaType/:id' element={<Details />} />
                <Route path='/search/:query' element={<SearchResult />} />
                <Route path='/explore/:mediaType' element={<Explore />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
      )
}

export default App
