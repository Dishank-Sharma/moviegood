import "./NavBottom.css";
import { useNavigate } from "react-router-dom";

export default function NavBottom() {
  let navigate = useNavigate();

  return (
    <div className="navBottom"> 
      <div onClick={() => navigate("/")}>
        <i className="fa-solid fa-house"></i>
      </div>
      <hr className="navBottomHr" />
      <div onClick={() => navigate("/favorite")}>
        <i className="fa-solid fa-heart"></i>
      </div>
    </div>
  );
}
