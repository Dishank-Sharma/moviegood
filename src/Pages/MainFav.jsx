import Navbar from "../Components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import CardSingle from "../Components/CardSingle.jsx";
import Loader from "../Components/Loader.jsx";
import Skeleton from "@mui/material/Skeleton";
import NavBottom from "../Components/NavBottom.jsx"

export default function MainFav() {
  let [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

let location = useLocation();


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  }, [location]);


  const updateFavorites = () => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
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
      <Navbar/>
      <div className="displayCard">
        <Container maxWidth="lg">
          <Grid container spacing={3} className="gridMain" alignItems="center">
            {favorites.map((list) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                sx={{ display: "flex", justifyContent: "center" }}
                key={list.id}
              >
                <CardSingle
                  itemId={list.id}
                  img={list.img}
                  title={list.title}
                  year={list.year}
                  vote={list.vote}
                  updateFavorites={updateFavorites}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <NavBottom/>
    </div>
  );
}
