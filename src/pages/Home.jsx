import useFetchHook from "../Hooks/useFetchHook";
import Scroller from "../components/scroller";

const Home = () => {
  const { data: trendMovie, fetching: trendMovieFetch } = useFetchHook("trending/movie/day");
  const { data: trendTv, fetching: trendTvFetch } = useFetchHook("trending/tv/day");
  const { data: trendPeople, fetching: trendPeopleFetch } = useFetchHook("trending/person/day");
  const { data: discover, fetching: discoverFetch } = useFetchHook("discover/movie");

  return (
    <div className="text-white w-100 px-2 py-2">
      <h3 style={{ color: "#ffa101" }}>Home</h3>
      <Scroller
        mapped={trendMovie}
        data={"Movies trending today"}
        link={"/trendmovie"}
        url={"/movie"}
        fetch={trendMovieFetch}
      />
      <Scroller
        mapped={trendTv}
        data={"TVs trending today"}
        link={"/trendtvs"}
        url={"/tv"}
        fetch={trendTvFetch}
      />
      <Scroller
        mapped={trendPeople}
        data={"People trending today"}
        link={"/trendpeople"}
        url={"/person"}
        fetch={trendPeopleFetch}
      />
      <Scroller
        mapped={discover}
        data={"Discover"}
        link={"/discover"}
        url={"/movie"}
        fetch={discoverFetch}
      />
    </div>
  );
};

export default Home;
