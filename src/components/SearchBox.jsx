import React, { useEffect, useState, useRef, useCallback } from "react";
import { Container, Image } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, API_KEY } from "../api/config";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const SearchBox = ({ search, setSearch }) => {
  const observer = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [newSearchResults, setNewSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const lastMovie = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
          setNewSearchResults([...searchResults, ...newSearchResults]);
        }
      });
      observer.current.observe(node);
    },
    [searchResults, newSearchResults]
  );

  useEffect(() => {
    setSearchResults([]);
    setNewSearchResults([]);
    setPage(1);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      async function fetchSearch() {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${search}&page=${page}`
          );
          setSearchResults(data.results);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      fetchSearch();
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search, page]);

  const allSearchResults = [...newSearchResults, ...searchResults];
  const personNull =
    "https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png";
  const movieNull =
    "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
  const linkStart = "https://image.tmdb.org/t/p/w500/";

  return (
    <div
      className="position-absolute search-box scrollbody py-2"
      style={{ top: "30px" }}
    >
      <Container>
        <div className="d-flex flex-column gap-3">
          {allSearchResults.length > 0 ? (
            <>
              {allSearchResults.map((each, index) => (
                <Link
                  key={index}
                  to={
                    each.media_type === "tv"
                      ? `/tv/${each.id}`
                      : each.media_type === "movie"
                      ? `/movie/${each.id}`
                      : `/person/${each.id}`
                  }
                  onClick={() => setSearch("")}
                >
                  <div
                    className="d-flex gap-2"
                    ref={
                      index === allSearchResults.length - 1 ? lastMovie : null
                    }
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    >
                      <Image
                        src={
                          each.profile_path || each.poster_path
                            ? `${linkStart}${
                                each.profile_path || each.poster_path
                              }`
                            : !each.profile_path && each.poster_path !== null
                            ? personNull
                            : movieNull
                        }
                        className="w-100 h-100"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <div>
                      <p className="mb-0" style={{ color: "#fd0003" }}>
                        {each.title || each.original_name || each.name}
                      </p>
                      <span className="text-white">{each.media_type}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <>
              {searchResults.length === 0 && !loading && (
                <span className="small text-brea text-white">
                  No movie/tv/person matched {search}
                </span>
              )}
            </>
          )}
        </div>
        <div className="text-center mt-2">
          {searchResults.length === 0 && newSearchResults.length > 1 && (
            <span className="text-white text-break small">
              No more results for {search}
            </span>
          )}
        </div>
        {loading && <Spinner />}
      </Container>
    </div>
  );
};

export default SearchBox;
