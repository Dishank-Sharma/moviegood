import DisplayCard from "../Components/DisplayCard.jsx";
import Navbar from "../Components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import Skeleton from "@mui/material/Skeleton";
import NavBottom from "../Components/NavBottom.jsx";

export default function MainCatPage() {
  let [isLoading, setIsLoading] = useState(true);
  const { browse, cat } = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsLoading(true);
  }, [cat]);

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
      <Navbar searchQ={cat} />
      <DisplayCard
        onLoad={hendleLoad}
        browse={browse}
        cat={cat}
        search={`https://api.themoviedb.org/3/${browse}/${cat}?api_key=${apiKey}&language=en-US&page=`}
      />
      <NavBottom />
    </div>
  );
}
