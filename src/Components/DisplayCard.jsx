import { Grid, Container } from "@mui/material";
import CardSingle from "./CardSingle.jsx";
import { useState, useEffect } from "react";

export default function DisplayCard({ search, query, onLoad, browse, cat }) {
  let [movieList, setMovieList] = useState([]); 

  let searchResult = async (page) => {
    try {
      let responce = await fetch(`${search}${page}`);
      if (responce.ok) {
        let data = await responce.json();

        return data.results.map((list) => ({
          id: list.id,
          img: "https://image.tmdb.org/t/p/w185" + list.poster_path,
          title: list.title === undefined ? list.name : list.title,
          year:
            list.release_date === undefined
              ? list.first_air_date.split("-")[0]
              : list.release_date.split("-")[0],
          vote: list.vote_average,
          type: list.media_type,
        }));
      } else {
        throw new Error("Error in API");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const pages = [1, 2];
      const pageRequests = pages.map((page) => searchResult(page));
      const results = await Promise.all(pageRequests);
      const combinedResults = results.flat();

      // Filter out duplicate movies by id
      const uniqueResults = combinedResults.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );

      let finalMovieList = uniqueResults.filter((list) => list.vote > 1);
      setMovieList(finalMovieList);
      onLoad();
    };

    fetchMovies();
  }, [query, browse, cat]);


  if (!movieList) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="displayCard">
      <Container maxWidth="lg">
        <Grid container spacing={3} className="gridMain" alignItems="center">
          {movieList.map((list) => (
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
                mediaType={browse}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
