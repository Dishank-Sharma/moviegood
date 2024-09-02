import "./DetailImage.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function DetailImage({onLoad, isLoading = false}) {
  let [movieData, setMovieData] = useState(null);
  let [scrollFade, setScrollFade] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY; 

  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  let eventCard = (event) => {
    if (event.target.scrollLeft > 1) {
      setScrollFade(true);
    } else { 
      setScrollFade(false);
    }
  };

  let currLocation = location.pathname.startsWith("/tv");

  let category = currLocation ? "tv" : "movie";

  let dataHandler = async () => {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/${category}/${id}/images?api_key=${apiKey}`
      );

      if (response.ok) {
        let data = await response.json();

        setMovieData(() => {
          let top9 = data.backdrops.slice(1, 10);
          return top9.map((list) => ({
            img:
              "https://image.tmdb.org/t/p/w533_and_h300_bestv2" + 
              list.file_path,
            id: uuid(),
          }));
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
    return <div>Loading...</div>;
  }

  return (
    <div className="detailImage" style={{ display: isLoading && "none" }}>
        <h1>Media</h1>
      <div
        className={`detailImageInner ${scrollFade ? "scrollFade" : ""}`}
        onScroll={eventCard}
      >
        {movieData.map((list) => (
          <img src={list.img} key={list.id}/>
        ))}
      </div>
    </div>
  );
}
