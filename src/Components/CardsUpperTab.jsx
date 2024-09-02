import "./CardsUpperTab.css";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import ForwardIcon from "@mui/icons-material/ChevronRight";
import BackIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

export default function CardsUpperTab({catName, clickRight, clickLeft, linkName}) {

  let navigate = useNavigate();
  
  return ( 
    <div className="CardsUpperTab"> 
      <a className="leftInner" onClick={() => navigate(linkName)}> 
        <span>{catName}</span>
        <ArrowIcon className="ArrowIcon" />
      </a>
      <div className="rightInner">
        <BackIcon className="backIcon" onClick={clickLeft}/>
        <ForwardIcon className="forwardIcon" onClick={clickRight} />
      </div>
    </div>
  );
}
