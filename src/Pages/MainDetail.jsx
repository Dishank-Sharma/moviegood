import DetailUpper from "../DetailComponents/DetailUpper.jsx";
import Navbar from "../Components/Navbar.jsx";
import DetailMiddle from "../DetailComponents/DetailMiddle.jsx";
import Card from "../Components/Card.jsx";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainDetail.css";
import Loader from "../Components/Loader.jsx";
import Skeleton from "@mui/material/Skeleton";
import NavBottom from "../Components/NavBottom.jsx";
import DetailImage from "../DetailComponents/DetailImage.jsx";

export default function MainDetail() {
  let [isLoading, setIsLoading] = useState(true);
  let [componentsLoaded, setComponentsLoaded] = useState({
    upper: false,
    middle: false,
    card: false,
  });

  const apiKey = import.meta.env.VITE_API_KEY;

  let { id } = useParams();
  let location = useLocation();

  let isMovie = location.pathname.startsWith("/movie");

  let type = isMovie ? "movie" : "tv";

  useEffect(() => {
    setIsLoading(true);
    setComponentsLoaded({
      upper: false,
      middle: false,
      card: false,
    });
    window.scrollTo(0, 0);
  }, [id, isMovie]);

  useEffect(() => {
    if (
      componentsLoaded.upper &&
      componentsLoaded.middle &&
      componentsLoaded.image &&
      componentsLoaded.card
    ) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [componentsLoaded]);

  const handleComponentLoaded = (componentName) => {
    setComponentsLoaded((prev) => ({ ...prev, [componentName]: true }));
  };

  return (
    <div className="mainDetail">
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
      <Navbar />
      <DetailUpper
        isLoading={isLoading}
        onLoad={() => handleComponentLoaded("upper")}
      />
      <DetailMiddle
        isLoading={isLoading}
        onLoad={() => handleComponentLoaded("middle")}
      />
      <hr className="mainDetailHr" />
      <DetailImage
        isLoading={isLoading}
        onLoad={() => handleComponentLoaded("image")}
      />
      <hr className="mainDetailHr" />
      <Card
        isLoading={isLoading}
        onLoad={() => handleComponentLoaded("card")}
        catName={"Recommendations"}
        sliderUrl={`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`}
      />
      <NavBottom />
    </div>
  );
}
