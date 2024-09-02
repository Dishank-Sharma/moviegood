import "./DetailMiddle.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function DetailMiddle({ onLoad, isLoading = false }) {
  let [movieData, setMovieData] = useState(null);
  let [scrollFade, setScrollFade] = useState(false);
  let [errorImage, setErrorImage] = useState({});

  const apiKey = import.meta.env.VITE_API_KEY;

  let eventCard = (event) => {
    if (event.target.scrollLeft > 1) {
      setScrollFade(true);
    } else {
      setScrollFade(false);
    }
  };

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate(); 

  let currLocation = location.pathname.startsWith("/tv");

  let category = currLocation ? "tv" : "movie";

  let dataHandler = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/${category}/${id}?append_to_response=credits&api_key=${apiKey}&language=en-US`
      );

      if (response.ok) {
        let data = await response.json();
        setMovieData(() => {
          return {
            homepage: data.homepage,
            status: data.status,
            language: data.spoken_languages.length === 0 ? data.original_language : data.spoken_languages[0].english_name,
            budget: currLocation ? "" : data.budget,
            revenue: currLocation ? "" : data.revenue,
            credits: data.credits.cast.slice(0, 15),
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
  }, [id]);

  if (!movieData) {
    return <div>Loading....</div>;
  }

  let handleError = (id) => {
    setErrorImage((prevError) => ({ ...prevError, [id]: true }));
  };
 
  return (
    <div className="detailMiddle" style={{ display: isLoading && "none" }}>
      <div className="detailLeft">
        <h2>Top Billed Cast</h2>
        <div
          className={`detailCardOuter ${scrollFade ? "scrollFade" : ""}`}
          onScroll={eventCard}
        >
          {movieData.credits.map((list) => (
            <div className="detailCard" key={list.id}>
              <img
                src={
                  errorImage[list.id]
                    ? "https://wallpapercave.com/wp/3AyqTpK.jpg"
                    : `https://image.tmdb.org/t/p/w185${list.profile_path}`
                }
                onError={() => handleError(list.id)}
                style={errorImage[list.id] && { filter: "blur(1rem)" }}
              />
              {errorImage[list.id] && (
                <Skeleton
                  sx={{ bgcolor: "grey.700" }}
                  variant="rectangular"
                  className="imageAnime"
                />
              )}
              <span className="detailCardTitle">{list.name}</span>
              <span className="detailCardExtra">{list.character}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="detailRight">
        <div className="detailSocial">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-square-x-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <hr />
          <a href={movieData.homepage} target="_blank">
            <i className="fa-solid fa-link"></i>
          </a>
        </div>
        <div className="detailRightText">
          <span>
            <b>Status</b>
          </span>
          <span>{movieData.status}</span>
        </div>
        <div className="detailRightText">
          <span>
            <b>Original Language</b>
          </span>
          <span>{movieData.language}</span>
        </div>
        <div className="detailRightText">
          <span>
            <b>Budget</b>
          </span>
          {currLocation ? (
            <span>Unknown</span>
          ) : (
            <span>&#36; {movieData.budget.toLocaleString("en-IN")}.00</span>
          )}
        </div>
        <div className="detailRightText">
          <span>
            <b>Revenue</b>
          </span>
          {currLocation ? (
            <span>Unknown</span>
          ) : (
            <span>&#36; {movieData.revenue.toLocaleString("en-IN")}.00</span>
          )}
        </div>
      </div>
    </div>
  );
}
