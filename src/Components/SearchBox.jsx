import "./SearchBox.css";
import { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBox({ searchQ }) {
  let [search, setSearch] = useState("");
  let [suggestion, setSuggestion] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [cleanField, setCleanField] = useState(false);
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);

  const apiKey = import.meta.env.VITE_API_KEY; 

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    setSearch("");
  }, [id, searchQ]);

  let searchQuery = (event) => {
    setSearch(event.target.value);
    event.key === "Enter" && handleSubmit();
  };

  let handleSubmit = () => {
    navigate(`/search?q=${search}`);
  };

  let handleClickList = (id, type) => {
    const path = type === "tv" ? `/tv/${id}` : `/movie/${id}`;
    navigate(path, { replace: true });
    setSearch("");
  };

  // Auto Complete

  let autoComplete = async () => {
    try {
      setIsLoading(true);
      let responce = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${search}&include_adult=false&language=en-US&page=1`
      );
      if (responce.ok) {
        let resJson = await responce.json();
        setIsLoading(false);

        let top5 = resJson.results.slice(0, 5);
        return top5.map((list) => ({
          title: list.title === undefined ? list.name : list.title,
          year: list.release_date
            ? list.release_date.split("-")[0]
            : list.first_air_date
            ? list.first_air_date.split("-")[0]
            : "Unknown",
          id: list.id,
          img: list.poster_path,
          type: list.media_type,
        }));
      } else {
        throw new Error("Error in API");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let clearHandler = () => {
    setSearch("");
  };

  useEffect(() => {
    
    setCleanField(true);
    if (search.length == 0) {
      setCleanField(false);
    }

    if (search.length <= 2) {
      setIsLoading(false);
      setSuggestion([]);
    }

    if (search.length > 2) {
      setIsLoading(true);
      setSuggestion([]);
      let timeOutlId = setTimeout(async () => {
        let result = await autoComplete();
        let finalMovieList = result.filter((list) => list.year !== "Unknown");
        setSuggestion(finalMovieList);
      }, 500);

      return () => {
        clearTimeout(timeOutlId);
      };
    }
  }, [search]);

  ///

  const handleIconClick = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
    setShouldFocus(true);
    setTimeout(() => setShouldFocus(false), 100);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchBoxVisible(false);
    }
  };

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current.focus();
    }
    const mediaQuery = window.matchMedia("(max-width: 425px)");

    if (!mediaQuery.matches) {
      setSearchBoxVisible(true);  
    }

    if (mediaQuery.matches) {
      document.addEventListener("mousedown", handleClickOutside);
      
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldFocus]);

  ///

  return (
    <div ref={searchBoxRef} className="searchContainer">
      <SearchIcon className="searchIcon" onClick={handleIconClick} />
      {isSearchBoxVisible && (
        <div className="formBox">
          <input
            ref={inputRef}
            className="searchField"
            type="text"
            placeholder="Search Movies Here..."
            value={search}
            onKeyDown={searchQuery}
            onChange={searchQuery}
            style={{
              padding: cleanField && "0px 1rem 0 2.1rem",
              borderRadius:
                isLoading || suggestion.length > 0 ? "13px 13px 0 0" : "13px",
            }}
          />

          {cleanField && (
            <ClearIcon className="clearIcon" onClick={clearHandler} />
          )}
          {isLoading && (
            <CircularProgress className="loadingIcon" size={19} thickness={5} />
          )}
          <SearchIcon className="searchIcon" onClick={handleSubmit} />

          <ul
            className="suggBox"
            style={{
              display: isLoading || suggestion.length > 0 ? "inline" : "none",
            }}
          >
            {isLoading && <li>Loading...</li>}
            {suggestion.map((list) => (
              <li
                onClick={() => handleClickList(list.id, list.type)}
                key={list.id}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w92/" + list.img}
                  alt=""
                />
                <span>
                  {list.title} ({list.year})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
