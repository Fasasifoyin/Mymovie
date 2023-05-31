import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";

const useFetchHook = (url) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [fetching, setFetching] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/${url}?api_key=${API_KEY}&language=en-US&page=1`
        );
        setGenres(data.genres);
        setData(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, genres, fetching };
};

export default useFetchHook;
