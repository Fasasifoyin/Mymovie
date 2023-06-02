import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../api/config";
import { Row, Col } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import useFetchHook from "../Hooks/useFetchHook";
import Spinner from "../components/Spinner";

const Genres = () => {
  const { genre_id } = useParams();
  const observer = useRef();
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const { genres } = useFetchHook("genre/movie/list");

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
    // window.scrollTo({ top: 0 });
    setGenreList([]);
    setPage(1);
  }, [genre_id]);

  useEffect(() => {
    async function fetch() {
      try {
        setFetching(true);
        const { data } = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${genre_id}`
        );
        setGenreList((prevResults) => {
          return [...new Set([...prevResults, ...data.results])];
        });
        setHasMore(data.results.length > 0);
      } catch (err) {
        setError(err);
      } finally {
        setFetching(false);
      }
    }
    fetch();
  }, [genre_id, page]);

  const genreName = genres.find((each) => each.id.toString() === genre_id);

  return (
    <div className="text-white w-100 px-2 py-2">
      <h3 style={{ color: "#ffa101" }}>{genreName?.name}</h3>
      <Row className="gx-3 gy-4">
        {genreList.map((each, index) => (
          <Col
            xs={4}
            md={4}
            xl={2}
            key={index}
            ref={index === genreList.length - 1 ? lastMovie : null}
          >
            <MediaCard {...each} startpoint={"movie"} />
          </Col>
        ))}
      </Row>
      {fetching && <Spinner />}
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default Genres;
