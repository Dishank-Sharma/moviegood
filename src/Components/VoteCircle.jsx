import "./VoteCircle.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function VoteCircle({ voteAverage = 8 }) {
  let [progress, setProgress] = useState(Math.round(voteAverage * 10));

  const location = useLocation();

  const isMoviePage = location.pathname.startsWith('/movie');
  const isTvPage = location.pathname.startsWith('/tv');

  let circleStyle = {
    background:
      progress >= 70 
        ? `conic-gradient(
        #21d07a 0% ${progress}%, 
        #204529 ${progress}% 100%
    )`
        : `conic-gradient(
        #d2d531 0% ${progress}%, 
        #423d0f ${progress}% 100%
    )`,
  };

  return (
    <div style={circleStyle} className={isMoviePage || isTvPage ? "voteCircle detailVoteCircle" :  "voteCircle"}>
      <div className={isMoviePage || isTvPage ? "innerCircle detailInnerCircle" : "innerCircle"}>
        <span className={isMoviePage || isTvPage ? "voteText detailVoteText" : "voteText"}>
          {progress}
          <sup>%</sup>
        </span>
      </div>
    </div>
  );
}
