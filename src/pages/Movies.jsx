import React from "react";
import useFetchHook from "../Hooks/useFetchHook";
import Scroller from "../components/scroller";
import PagesStart from "../components/PagesStart";


const Movies = () => {
  const { data: nowPlaying, fetching: nowPlayingFetch } = useFetchHook("movie/now_playing");
  const { data: popular, fetching: popularfetch } = useFetchHook("movie/popular");
  const { data: toprated, fetching: topratedFetch } = useFetchHook("movie/top_rated");
  const { data: upcoming, fetching: upcomingFetch } = useFetchHook("movie/upcoming");

  return (
    <div className="text-white w-100 px-2 py-2">
      <PagesStart data={'Movies'}/>
      <Scroller
        mapped={nowPlaying}
        data={"Now Playing"}
        link={"/nowplaying"}
        url={"/movie"}
        fetch={nowPlayingFetch}
      />
      <Scroller
        mapped={popular}
        data={"Popular"}
        link={"/popular"}
        url={"/movie"}
        fetch={popularfetch}
      />
      <Scroller
        mapped={toprated}
        data={"Top Rated"}
        link={"/toprated"}
        url={"/movie"}
        fetch={topratedFetch}
      />
      <Scroller
        mapped={upcoming}
        data={"Upcoming"}
        link={"/upcoming"}
        url={"/movie"}
        fetch={upcomingFetch}
      />
    </div>
  );
};

export default Movies;
