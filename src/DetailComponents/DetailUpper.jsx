import "./DetailUpper.css";
import VoteCircle from "../Components/VoteCircle.jsx";
import Favorite from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function DetailUpper({ onLoad, isLoading = false }) {
  let [movieData, setMovieData] = useState(null);
  let [addFav, setAddFav] = useState(false);
  let [bgColor, setBgColor] = useState("#0000");
  let [isSize, setIsSize] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  let currLocation = location.pathname.startsWith("/tv");

  let category = currLocation ? "tv" : "movie";

  let dataHandler = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}&language=en-US`
      );

      if (response.ok) {
        let data = await response.json();
        setMovieData(() => {
          return {
            id: data.id,
            img2: "https://image.tmdb.org/t/p/w185" + data.poster_path,
            img: "https://image.tmdb.org/t/p/w500" + data.poster_path,
            background: data.backdrop_path,
            title: data.title === undefined ? data.name : data.title,
            year: data.release_date
              ? data.release_date.split("-")[0]
              : data.first_air_date
              ? data.first_air_date.split("-")[0]
              : "Unknown",
            date:
              data.release_date === undefined
                ? data.first_air_date.split("-").reverse().join("/")
                : data.release_date.split("-").reverse().join("/"),
            genres: data.genres.map((list) => list.name).join(", "),
            runtime: {
              hour: Math.floor(data.runtime / 60),
              min: data.runtime % 60,
            },
            vote: data.vote_average,
            tagline: data.tagline,
            overview: data.overview,
          };
        });
        onLoad();
      } else {
        console.error("Failed to fetch movie data:", response.statusText);
        setMovieData(null);
        navigate("/error");
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovieData(null);
      navigate("/error");
    }
  };

  useEffect(() => {
    dataHandler();
    setAddFav(false);
  }, [id]);

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let movie = {
      id: movieData.id,
      img: movieData.img,
      title: movieData.title,
      year: movieData.title,
      vote: movieData.vote,
    };

    const isAlreadyFavorite = favorites.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyFavorite) {
      favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
      setAddFav(false);
    } else {
      favorites.push(movie);
      setAddFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    if (movieData) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let checkFev = favorites.map((fav) => fav.id === movieData.id);
      if (checkFev.includes(true)) {
        setAddFav(true);
      }
      getRandomGradient();
      const mediaQuery = window.matchMedia("(max-width: 425px)");

      if (mediaQuery.matches) {
        setIsSize(true);
      }
    }
  }, [movieData]);

  // Backgroud Color

  const getRandomDarkColor = () => {
    const r = Math.floor(Math.random() * 50); // Limiting to dark shades
    const g = Math.floor(Math.random() * 50); // Limiting to dark shades
    const b = Math.floor(Math.random() * 50); // Limiting to dark shades
    return `rgb(${r}, ${g}, ${b}, 0.750)`;
  };

  const getRandomGradient = () => {
    const color1 = getRandomDarkColor();
    const color2 = getRandomDarkColor();
    setBgColor(`linear-gradient(to right, ${color1}, ${color2})`);
  };

  // Backgroud Color

  if (!movieData) {
    return <div>Loading....</div>;
  }

  return (
    <div className="detailUpperOuter" style={{ "--gradient": bgColor }}>
      <div
        className="detailUpper"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w780${movieData.background}")`,
          display: isLoading && "none",
          "--gradient": bgColor,
        }}
      >
        <div className="detailImg">
          <img src={movieData.img} />
        </div>
        <div className="detailTextArea">
          <div className="detailHead">
            <h2 className="detailTitle">
              {movieData.title} <span>({movieData.year})</span>
            </h2>
            <span className="detailCat">
              {isSize ? (
                <div className="detailCatInner">
                  ● {movieData.date}{" "}
                  {!currLocation
                    ? `● ${movieData.runtime.hour}h ${movieData.runtime.min}m`
                    : ""}{" "}
                  <br /> <div>● {movieData.genres}</div>
                </div>
              ) : (
                <>
                  {movieData.date} ● {movieData.genres}{" "}
                  {!currLocation
                    ? `● ${movieData.runtime.hour}h ${movieData.runtime.min}m`
                    : ""}
                </>
              )}
            </span>
          </div>

          <div className="detailIcons">
            <VoteCircle voteAverage={movieData.vote} className="detailVote" />
            <div className="detailScore">
              <span>User</span>
              <span>Score</span>
            </div>
            {isSize && <hr className="detailIconsHr" />}
            <Tooltip
              onClick={addToFavorites}
              title="Add Favorite"
              arrow
              classes={{
                tooltip: "customTooltip",
                arrow: "customArrow",
              }}
            >
              <Favorite
                style={{ color: addFav && "rgb(255, 0, 98)" }}
                className="detailFav"
              />
            </Tooltip>
            {isSize && (
              <div className="detailScore">
                <span>Add</span>
                <span>Fav...</span>
              </div>
            )}
          </div>
          <div className="detailOverview">
            <span>
              <i>{movieData.tagline}</i>
            </span>
            <h2>Overview</h2>
            <p>{movieData.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
