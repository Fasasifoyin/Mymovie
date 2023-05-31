import React from "react";
import useFetchHook from "../Hooks/useFetchHook";
import Scroller from "../components/scroller";
import PagesStart from "../components/PagesStart";

const TVs = () => {
  const { data: airingtoday, fetching: airingTodayFetch } = useFetchHook("tv/airing_today");
  const { data: topTv, fetching: topTvFetch } = useFetchHook("tv/top_rated");

  return (
    <div className="text-white w-100 px-2 py-2">
      <PagesStart data={' TVs'}/>
      <Scroller
        mapped={airingtoday}
        data={"Airing today"}
        link={"/airingtoday"}
        url={"/tv"}
        fetch={airingTodayFetch}
      />
      <Scroller
        mapped={topTv}
        data={"Top Rated"}
        link={"/topratedtv"}
        url={"/tv"}
        fetch={topTvFetch}
      />
    </div>
  );
};

export default TVs;
