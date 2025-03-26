/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyloadimage/Img";
import styles from "../../../style";
import PosterFallBack from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videopopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const _genres = data?.genres?.map((genre) => genre.id);

  const { url } = useSelector((state) => state.home);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${
      minutes > 0 ? `${minutes}m` : ""
    }`;
  };

  const director = crew?.filter((c) => c?.job === "Director");
  const writer = crew?.filter(
    (c) => c?.job === "Writer" || c?.job === "Story" || c?.job === "Screenplay"
  );

  return (
    <div className=" pt-[100px]">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className=" absolute inset-0 w-full h-full opacity-10 overflow-hidden">
                <Img
                  src={
                    data.backdrop_path
                      ? url.backdrop + data.backdrop_path
                      : PosterFallBack
                  }
                  className=" object-cover object-center w-full h-full"
                />
              </div>
              <div className="opacity-layer" />

              <div
                className={`w-full ${styles.flexStart} flex-col md:flex-row relative gap-[50px]   `}
              >
                {/* left */}
                <div className=" basis-1/3 w-[70%] md:w-[100%] mx-auto flex-shrink-0 rounded-2xl overflow-hidden dropshadow ">
                  {data?.poster_path ? (
                    <Img className="" src={url.poster + data.poster_path} />
                  ) : (
                    <Img className="" src={PosterFallBack} />
                  )}
                </div>

                {/* right */}
                <div className=" basis-2/3 w-full text-center md:text-start flex flex-col items-center md:block ">
                  <div className=" font-poppins -mt-1.5 mb-6 max-w-[580px]">
                    <h2 className=" font-semibold text-[24px] md:text-[30px] text-white md:leading-[3.2rem] leading-[2.5rem] mb-1">
                      {data.title || data.name} (
                      {dayjs(data.release_date).format("YYYY")})
                    </h2>
                    <p className=" font-medium italic text-dimWhite md:text-[16px] text-[14px">
                      {data.tagline}
                    </p>
                  </div>

                  <Genres data={_genres} />

                  <div className="flex items-start md:gap-4 mt-10 details-rating">
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <div
                      onClick={() => {
                        setShow(true);
                        setVideoId(video.key);
                      }}
                      className=" flex items-center text-white font-poppins md:gap-3 cursor-pointer playBtn"
                    >
                      <PlayIcon />
                      <span className=" font-medium text">Watch Trailer</span>
                    </div>
                  </div>

                  <div className=" font-poppins text-white mt-12">
                    <h2 className=" mb-2 text-[25px] md:text-[30px]">
                      Overview
                    </h2>
                    <p className=" font-normal max-w-[680px] leading-[1.8rem] text-[14px] md:text-[16px]">
                      {data.overview}
                    </p>
                  </div>

                  <div className=" w-full flex flex-col md:flex-row items-start md:items-center gap-[1.5rem] mt-12 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite">
                    {data.status && (
                      <div>
                        <span className=" mr-4">Status: </span>{" "}
                        <span className=" text-dimWhite">{data.status}</span>
                      </div>
                    )}

                    {data.release_date && (
                      <div>
                        <span className=" mr-4">Released Date: </span>{" "}
                        <span className=" text-dimWhite">
                          {dayjs(data.release_date).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    )}

                    {data.runtime && (
                      <div>
                        <span className=" mr-4">Runtime: </span>{" "}
                        <span className=" text-dimWhite">
                          {toHoursAndMinutes(data.runtime)}
                        </span>
                      </div>
                    )}
                  </div>

                  {director?.length > 0 && (
                    <div className=" w-full text-start gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite ">
                      <div>
                        <span className=" mr-4">
                          {`Director${director?.length > 1 ? "s" : ""}:`}{" "}
                        </span>{" "}
                        <span className=" text-dimWhite">
                          {director?.map((d, i) => (
                            <span key={i} className=" leading-[1.6rem]">
                              {d.name}
                              {director?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}

                  {writer?.length > 0 && (
                    <div className=" text-start gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite ">
                      <div>
                        <span className=" mr-4">
                          {`Writer${writer?.length > 1 ? "s" : ""}:`}{" "}
                        </span>{" "}
                        <span className=" text-dimWhite">
                          {writer?.map((d, i) => (
                            <span key={i} className=" leading-[1.6rem]">
                              {d.name}
                              {writer?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}

                  {data?.created_by?.length > 0 && (
                    <div className=" flex items-center gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite ">
                      <div>
                        <span className=" mr-4">
                          {`Creator${data?.created_by?.length > 1 ? "s" : ""}:`}{" "}
                        </span>{" "}
                        <span className=" text-dimWhite">
                          {data?.created_by?.map((d, i) => (
                            <span key={i} className=" leading-[1.6rem]">
                              {d.name}
                              {data?.created_by?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        // Skeleton
        <div
          className={`w-full ${styles.flexStart} flex-col md:flex-row relative gap-[50px] `}
        >
          <div className=" basis-1/3  h-[500px] bg-[#0a2955] mx-auto flex-shrink-0 rounded-2xl overflow-hidden dropshadow"></div>

          <div className=" w-full text-center md:text-start flex flex-col items-center md:block skeleton">
            <div className=" font-poppins -mt-1.5 mb-6 max-w-[580px]"></div>
            <div className="flex items-start md:gap-4 mt-10 details-rating"></div>
            <div className=" font-poppins text-white mt-12"></div>
            <div className=" w-full flex flex-col md:flex-row items-start md:items-center gap-[1.5rem] mt-12 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite"></div>
            <div className=" w-full text-start gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite "></div>
            <div className=" text-start gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite "></div>
            <div className=" flex items-center gap-[1.5rem] mt-5 font-poppins text-white  pb-4 border-solid border-x-0 border-t-0 border-b-[1px] border-dimWhite "></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
