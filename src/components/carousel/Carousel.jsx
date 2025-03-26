/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../style";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Img from "../lazyloadimage/Img";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();

  const { url } = useSelector((state) => state.home);

  const navigation = (dir) => {
    const container = carouselContainer.current;
    // console.log(container)

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    // console.log(scrollAmount)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();

  const skiItem = () => {
    return (
      <div className="w-[185px] flex-shrink-0 cursor-pointer">
        <div className="posterBlock skeleton"></div>
        <div className="skeleton">
          <span className=" font-poppins font-medium capitalize text-[15px] truncate overflow-hidden skeleton"></span>
          <span className="block text-dimWhite font-poppins font-normal mt-4 skeleton"></span>
        </div>
      </div>
    );
  };

  return (
    <div className={` ${styles.marginY} `}>
      {title && (
        <h2 className=" font-poppins text-white text-[24px] md:text-[28px] mb-6">
          {title}
        </h2>
      )}
      <div className=" relative">
        {data?.length >= 7 && (
          <BsFillArrowLeftCircleFill
            fontSize={28}
            className=" cursor-pointer text-black transition-all hover:text-pink absolute top-[130px] left-[10px] z-20"
            onClick={() => navigation("left")}
          />
        )}
        {data?.length >= 7 && (
          <BsFillArrowRightCircleFill
            fontSize={28}
            className=" cursor-pointer text-pink transition-all hover:text-pink absolute top-[130px] right-[10px] z-20"
            onClick={() => navigation("right")}
          />
        )}
      </div>

      {!loading ? (
        <div
          ref={carouselContainer}
          className="flex gap-4 overflow-y-hidden -mx-5 px-5 "
        >
          {data?.map((item) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : PosterFallBack;

            return (
              <div
                key={item.id}
                className=" w-[185px] flex-shrink-0 cursor-pointer"
                onClick={() =>
                  navigate(`/${item.media_type || endpoint}/${item.id}`)
                }
              >
                <div className="posterBlock">
                  <Img src={posterUrl} />
                  <CircleRating rating={item.vote_average.toFixed(1)} />
                  <Genres data={item.genre_ids.slice(0, 2)} />
                </div>
                <div>
                  <h4 className=" w-[175px] text-white font-poppins font-medium capitalize truncate text-[15px] ">
                    {item.title || item.name}
                  </h4>
                  <span className=" block text-dimWhite font-poppins font-normal mt-4">
                    {dayjs(item.release_date).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2.5 overflow-y-hidden -mx-5 px-5">
          {skiItem()}
          {skiItem()}
          {skiItem()}
          {skiItem()}
          {skiItem()}
          {skiItem()}
        </div>
      )}
    </div>
  );
};

export default Carousel;
