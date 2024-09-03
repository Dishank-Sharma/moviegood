import DisplayCard from "../Components/DisplayCard.jsx";
import Navbar from "../Components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import "./MainSearch.css";
import Skeleton from "@mui/material/Skeleton";
import NavBottom from "../Components/NavBottom.jsx" 

export default function MainSearch() {
  let [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const apiKey = import.meta.env.VITE_API_KEY; 

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    setIsLoading(true);
  }, [query]);

  let hendleLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };


  return (
    <div>
      {isLoading && (
        <div className="coverLoader">
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            className="coverLoader"
          />
        </div>
      )}
      {isLoading && <Loader />}
      <Navbar searchQ={query} />
      <DisplayCard
        query={query}
        onLoad={hendleLoad}
        search={`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=`}
      />
      <NavBottom/>
    </div>
  );
}
