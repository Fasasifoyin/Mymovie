import { useEffect, useState, useRef, useCallback } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();

  const lastMovie = useCallback(
    (node) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetching, hasMore]
  );

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/${url}?api_key=${API_KEY}&language=en-US&page=${page}&fetching=`
        );
        setData((prevData) => {
          return [...new Set([...prevData, ...data.results])];
        });
        setHasMore(data.results.length > 0);
      } catch (error) {
        setError(error);
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, [url, page]);

  return { data, fetching, lastMovie, error };
};

export default useFetch;
