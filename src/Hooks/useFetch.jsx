import { useEffect, useState, useRef, useCallback } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);

  const observer = useRef();

  const lastMovie = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
          setData2([...data2, ...data]);
        }
      });
      observer.current.observe(node);
    },
    [data, data2]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setFetching(true);
        const { data } = await axios.get(
          `${BASE_URL}/${url}?api_key=${API_KEY}&language=en-US&page=${page}&fetching=`
        );
        setData(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, [url, page]);

  return { data, fetching, data2, lastMovie };
};

export default useFetch;
