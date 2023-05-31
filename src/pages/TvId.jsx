import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../api/config";
import axios from "axios";
import MovieTvId from "../components/MovieTvId";

const TvId = () => {
  const { tv_id } = useParams();
  const [tv, setTv] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/tv/${tv_id}?api_key=${API_KEY}&append_to_response=credits,recommendations,images,videos&include_video_language=en`
        );
        setTv(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [tv_id]);

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [tv_id]);

  const {
    backdrop_path,
    credits,
    first_air_date,
    genres,
    images,
    number_of_episodes,
    original_name,
    overview,
    poster_path,
    recommendations,
    tagline,
    videos,
    vote_average,
  } = tv;

  return (
    <MovieTvId
      backdrop_path={backdrop_path}
      credits={credits}
      genres={genres}
      images={images}
      original={original_name}
      overview={overview}
      poster_path={poster_path}
      recommendations={recommendations}
      release={first_air_date}
      episodes={number_of_episodes}
      tagline={tagline}
      videos={videos}
      vote_average={vote_average}
      media={tv}
    />
  );
};

export default TvId;
