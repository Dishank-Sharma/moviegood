import "./NavbarLower.css";
import { useNavigate } from "react-router-dom";

export default function NavbarLower() {

  let navigate = useNavigate();


  return (
    <div className="catTab"> 
      <span className="itemSpace">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <div className="itemTab">
        <div className="itemBut">
          Movies
        </div>
        <ul className="itemList">
          <li onClick={() => navigate("/browse/movie/popular")}>Popular</li>
          <li onClick={() => navigate("/browse/movie/now_playing")}>
            Now Playing
          </li>
          <li onClick={() => navigate("/browse/movie/upcoming")}>Upcoming</li>
          <li onClick={() => navigate("/browse/movie/top_rated")}>Top Rated</li>
        </ul>
      </div>
      <div className="itemTab">
        <div className="itemBut">TV Shows</div>
        <ul className="itemList">
          <li onClick={() => navigate("/browse/tv/popular")}>Popular</li>
          <li onClick={() => navigate("/browse/tv/airing_today")}>
            Airing Today
          </li>
          <li onClick={() => navigate("/browse/tv/on_the_air")}>On TV</li>
          <li onClick={() => navigate("/browse/tv/top_rated")}>Top Rated</li>
        </ul>
      </div>
      <div className="itemBut">Privacy Policy</div>
      <div className="itemBut">Terms And Conditions</div>
    </div>
  );
}
