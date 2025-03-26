/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../../style'
import logo from '../../assets/watchflex-logo.png'

const Header = () => {
  const [show, setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavbar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide") 
      } else {
        setShow("show")
      }
      setLastScrollY(window.scrollY)
    } else {
      setShow("top")
    }
  }

  useEffect(() => {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
  }, [lastScrollY])

  const openSearch = () => {
    setShowSearch(true)
    setMobileMenu(false)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const searchQueryHandler = (event) => {
    if(event.key === 'Enter' && query.length > 0) {
        navigate(`/search/${query}`)
        setTimeout(() => {
            setShowSearch(false)
        }, 1000)
    }

  }

  const navigateHandler = (type) => {
    if(type === "movie") {
      navigate('/explore/movie')
    } else {
      navigate('/explore/tv')
    }

    setMobileMenu(false)
  }

  return <header className={`${styles.paddingX} ${styles.flexBetween} ${mobileMenu ? 'mobileView' : '' } ${show} h-[65px] md:h-[80px]  fixed z-30 w-full transition-all translate-y-0`}>
        <div onClick={() => navigate(`/`)} className='cursor-pointer'>
          <img src={logo} alt=""  className='w-[180px]' />
        </div>

        <ul className={`hidden md:flex items-center gap-6 cursor-pointer text-white font-poppins font-normal`}>
          <li className=' link-hover' onClick={() => navigateHandler('movie')}>Movies</li>
          <li className=' link-hover' onClick={() => navigateHandler('tv')}>TV Shows</li>
          <li className=' link-hover' ><HiOutlineSearch fontSize={22} onClick={openSearch} /></li>
        </ul>

        <div className={`${styles.flexItemsCenter} md:hidden gap-6  text-white font-poppins font-normal`}>
          <HiOutlineSearch onClick={openSearch} strokeWidth={2} fontSize={22} className='cursor-pointer' />
          {mobileMenu 
            ? <VscChromeClose onClick={() => setMobileMenu(false)} strokeWidth={1} fontSize={20} className='cursor-pointer' />
            : <SlMenu onClick={openMobileMenu} strokeWidth={40} fontSize={20} className='cursor-pointer' /> }
        </div>
        
        {showSearch && <div className=' bg-white absolute top-[65px] md:top-[80px] left-0 w-[100%] flex items-center md:py-4 md:px-8 py-2 px-4 transition-all translate-y-0 search-animate '>
            <input 
                type="text"
                placeholder="Search for a movie or tv show...." 
                onChange={((e)=> setQuery(e.target.value))}
                onKeyUp={searchQueryHandler}
                className=' w-full outline-none border-none font-poppins text-[11px] md:text-[15px]'
            />
            <VscChromeClose onClick={() => setShowSearch(false)} fontSize={20} className=' cursor-pointer' />
        </div>}
  </header>
}

export default Header