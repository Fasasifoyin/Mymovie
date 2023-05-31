import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../api/config";
import { Row, Col } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import useFetchHook from "../Hooks/useFetchHook";
import Spinner from "../components/Spinner";

const Genres = () => {
  const number = 1
  const { genre_id } = useParams();
  const observer = useRef();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]);
  const [page, setPage] = useState(number);
  const [fetching, setFetching] = useState(false);
  const { genres } = useFetchHook("genre/movie/list");

  console.log(page);

  const lastMovie = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && genreList.length > 0) {
          setPage((prev) => prev + 1);
          setNewGenreList([...newGenreList, ...genreList]);
        }
      });
      observer.current.observe(node);
    },
    [newGenreList, genreList]
  );

  useEffect(() => {
    window.scrollTo({ top: 0})
    setPage(number);
    setGenreList([]);
    setNewGenreList([]);
  }, [genre_id]);

  useEffect(() => {
    async function fetch() {
      try {
        setFetching(true);
        const { data } = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${genre_id}`
        );
        setGenreList(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setFetching(false);
      }
    }
    fetch();
  }, [genre_id, page]);

  const genreName = genres.find((each) => each.id.toString() === genre_id);
  const allGenreList = [...newGenreList, ...genreList];

  return (
    <div className="text-white w-100 px-2 py-2">
      <h3 style={{ color: "#ffa101" }}>{genreName?.name}</h3>
      <Row className="gx-3 gy-4">
        {allGenreList.map((each, index) => (
          <Col
            xs={4}
            md={4}
            xl={2}
            key={index}
            ref={index === allGenreList.length - 1 ? lastMovie : null}
          >
            <MediaCard {...each} startpoint={"movie"} />
          </Col>
        ))}
      </Row>
      {fetching && <Spinner />}
    </div>
  );
};

export default Genres;
