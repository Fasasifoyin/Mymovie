import { createContext, useContext, useState, useEffect } from "react";

export const StateContext = createContext();
let favo = [];

export const StateProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(favo);
  const [watch, setWatch] = useState(favo);

  useEffect(() => {
    if (favorites !== favo) {
      localStorage.setItem("addtofavorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    const bagData = JSON.parse(localStorage.getItem("addtofavorites"));
    if (bagData) {
      setFavorites(bagData);
    }
  }, []);

  useEffect(() => {
    if (watch !== favo) {
      localStorage.setItem("watchlater", JSON.stringify(watch));
    }
  }, [watch]);

  useEffect(() => {
    const bag = JSON.parse(localStorage.getItem("watchlater"));
    if (bag) {
      setWatch(bag);
    }
  }, []);

  const addTo = (media) => {
    const exist = favorites.find((each) => each.id === media.id);

    if (exist) {
      setFavorites(favorites.filter((each) => each.id !== media.id));
    } else {
      setFavorites([...favorites, media]);
    }
  };

  const save = (media) => {
    const exist = watch.find((each) => each.id === media.id);

    if (exist) {
      setWatch(watch.filter((each) => each.id !== media.id));
    } else {
      setWatch([...watch, media]);
    }
  };

  return (
    <StateContext.Provider
      value={{ favorites, setFavorites, addTo, watch, setWatch, save }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
