import { useRef, useState, useEffect } from "react";
import "./Card.css";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CardsUpperTab from "./CardsUpperTab.jsx";
import VoteCircle from "./VoteCircle.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function Card({
  catName,
  sliderUrl,
  linkName,
  tv,
  onLoad,
  isLoading = false,
}) {
  let [movieData, setMovieData] = useState([]);
  let [addFav, setAddFav] = useState({});

  let navigate = useNavigate();
  let location = useLocation();
  let { id } = useParams();

  const isMoviePage = location.pathname.startsWith("/movie");
  const isTvPage = location.pathname.startsWith("/tv");

  let handleMovieClick = (id) => {
    if (tv) {
      navigate(`/tv/${id}`);
    } else if (isTvPage) {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };

  let dataHandler = async () => {
    let response = await fetch(sliderUrl);

    if (response.ok) {
      let data = await response.json();

      setMovieData(() => {
        return data.results.map((list) => ({
          id: list.id,
          img: "https://image.tmdb.org/t/p/w185" + list.poster_path,
          title: list.title === undefined ? list.name : list.title,
          year:
            list.release_date === undefined
              ? list.first_air_date.split("-")[0]
              : list.release_date.split("-")[0],
          vote: list.vote_average,
        }));
      });
      onLoad && onLoad();
    }
  };

  useEffect(() => {
    dataHandler();
    setAddFav({});
  }, [id]);

  const sliderRef = useRef(null);

  let scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -700, behavior: "smooth" });
  };

  let scrollRight = () => {
    sliderRef.current.scrollBy({ left: 700, behavior: "smooth" });
  };

  const addToFavorites = (e, movie) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
  };

  useEffect(() => {
    if (movieData.length > 0) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const commonIds = movieData.filter((item1) =>
        favorites.some((item2) => item2.id === item1.id)
      );

      commonIds.map((data) =>
        setAddFav((prev) => ({ ...prev, [data.id]: true }))
      );
    }
  }, [movieData]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CardsUpperTab
        linkName={linkName}
        catName={catName}
        clickRight={scrollRight}
        clickLeft={scrollLeft}
        style={{ display: isLoading && "none" }}
      />
      <div
        className="card"
        ref={sliderRef}
        style={{ display: isLoading && "none" }}
      >
        {movieData.map((data) => (
          <div
            className="cardContentOuter"
            key={data.id}
            onClick={() => handleMovieClick(data.id)}
          >
            <div className="cardContent">
              <img src={data.img} alt="" className="cardImg" />
              <span
                className="addIcon"
                onClick={(e) => addToFavorites(e, data)}
              >
                {addFav[data.id] ? <DoneIcon /> : <AddIcon />}
                <span className="favoritesText">Add Favorites</span>
              </span>
            </div>
            <span className="cardTitle">
              {data.title} ({data.year})
            </span>
            {isMoviePage || isTvPage ? (
              ""
            ) : (
              <VoteCircle voteAverage={data.vote} className="voteCircle" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
