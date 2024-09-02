import "./CardSingle.css";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import VoteCircle from "./VoteCircle.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function CardSingle({
  itemId,
  img,
  title,
  year,
  vote,
  mediaType,
  updateFavorites
}) {
  let [addFav, setAddFav] = useState({});
  let [errorImg, setErrorImg] = useState({});

  let navigate = useNavigate();

  let handleMovieClick = (id, type) => {
    if (type === "tv") {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };

  let errorImage = (id) => {
    setErrorImg((prevImg) => ({ ...prevImg, [id]: true }));
  };

  const addToFavorites = (e) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let movie = {
      id: itemId,
      img: img,
      title: title,
      year: year,
      vote: vote,
    };

    const isAlreadyFavorite = favorites.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyFavorite) {
      favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
      setAddFav((prev) => ({ ...prev, [movie.id]: false }));
    } else {
      favorites.push(movie);
      setAddFav((prev) => ({ ...prev, [movie.id]: true }));
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavorites();
  };

  useEffect(() => {
    if (itemId) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let checkFev = favorites.map((fav) => fav.id === itemId);
      if (checkFev.includes(true)) {
        setAddFav((prev) => ({ ...prev, [itemId]: true }));
      }
    }
   
  }, [itemId]);


  return (
    <div
      className="cardSingle"
      key={itemId}
      onClick={() => handleMovieClick(itemId, mediaType)}
    >
      <div className="singleCardContent">
        <img
          src={
            errorImg[itemId]
              ? "https://image.tmdb.org/t/p/w185/qhcwrnnCnN8NE1N6XXKHFmveJR9.jpg"
              : img
          }
          className="singleCardImg"
          onError={() => errorImage(itemId)}
          style={errorImg[itemId] && { filter: "blur(0.7rem)" }}
        />
        {errorImg[itemId] && (
          <Skeleton
            sx={{ bgcolor: "grey.700" }}
            variant="rectangular"
            className="cardAnime"
          />
        )}
        <span className="singleAddIcon" onClick={(e) => addToFavorites(e)}>
          {addFav[itemId] ? <DoneIcon /> : <AddIcon />}
          <span className="singleFavoritesText">Add Favorites</span>
        </span>
      </div>
      <span className="singleCardTitle">
        {title} ({year})
      </span>
      <VoteCircle voteAverage={vote} className="singleVoteCircle" />
    </div>
  );
}
