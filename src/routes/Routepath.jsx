import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import TVs from "../pages/TVs";
import PopularPeople from "../pages/PopularPeople";
import Movies from "../pages/Movies";
import Genres from "../pages/Genres";
import GenresTv from "../pages/GenresTv";
import TrendMovies from "../pages/TrendMovies";
import TrendTvs from "../pages/TrendTvs";
import TrendPeople from "../pages/TrendPeople";
import Discover from "../pages/Discover";
import Upcoming from "../pages/Upcoming";
import Toprated from "../pages/Toprated";
import Popular from "../pages/Popular";
import NowPlaying from "../pages/NowPlaying";
import AiringToday from "../pages/AiringToday";
import TopratedTv from "../pages/TopratedTv";
import MovieId from "../pages/MovieId";
import TvId from "../pages/TvId";
import PersonId from "../pages/PersonId";
import Favorites from "../pages/Favorites";
import WatchLater from "../pages/WatchLater";

const Routepath = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tvs" element={<TVs />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/popularpeople" element={<PopularPeople />} />
        <Route path="/movie/genres/:genre_id" element={<Genres />} />
        <Route path="/tv/genres/:genretv_id" element={<GenresTv />} />
        <Route path="/trendmovie" element={<TrendMovies />} />
        <Route path="/trendtvs" element={<TrendTvs />} />
        <Route path="/trendpeople" element={<TrendPeople />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/toprated" element={<Toprated />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/nowplaying" element={<NowPlaying />} />
        <Route path="/airingtoday" element={<AiringToday />} />
        <Route path="/topratedtv" element={<TopratedTv />} />
        <Route path="/movie/:movie_id" element={<MovieId />} />
        <Route path="/tv/:tv_id" element={<TvId />} />
        <Route path="/person/:person_id" element={<PersonId />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routepath;
