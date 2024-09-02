import Card from "./Card.jsx";

export default function ListingSlider() {

  const apiKey = import.meta.env.VITE_API_KEY; 
  
  return (
    <div>
      <Card
        catName={"POPULAR MOVIES"} 
        linkName={"/browse/movie/popular"}
        sliderUrl={
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        }
      />
      <Card
        catName={"TRENDING TV SHOWS"}
        linkName={"/browse/tv/popular"}
        tv={true}
        sliderUrl={
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US`
        }
      />
      <Card
        catName={"TOP RATED MOVIES"}
        linkName={"/browse/movie/top_rated"}
        sliderUrl={
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        }
      />
      <Card
        catName={"TOP THIS WEEK"}
        linkName={"/browse/movie/upcoming"}
        sliderUrl={
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        }
      />
      <Card
        catName={"TOP RANDOM MOVIES"}
        linkName={"/browse/movie/now_playing"}
        sliderUrl={
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`
        }
      />
    </div>
  );
}
