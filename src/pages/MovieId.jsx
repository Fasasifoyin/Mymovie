import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../api/config";
import axios from "axios";
import MovieTvId from "../components/MovieTvId";

const MovieId = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&append_to_response=credits,recommendations,images,videos&include_video_language=en`
        );
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [movie_id]);

  useEffect(() => {
    window.scrollTo({ top: "0" });
  }, [movie_id]);

  const {
    backdrop_path,
    credits,
    genres,
    images,
    original_title,
    overview,
    poster_path,
    recommendations,
    release_date,
    runtime,
    tagline,
    videos,
    vote_average,
  } = movie;

  return (
    <MovieTvId
      backdrop_path={backdrop_path}
      credits={credits}
      genres={genres}
      images={images}
      original={original_title}
      overview={overview}
      poster_path={poster_path}
      recommendations={recommendations}
      release={release_date}
      runtime={runtime}
      tagline={tagline}
      videos={videos}
      vote_average={vote_average}
      media={movie}
    />
  );
};

export default MovieId;
