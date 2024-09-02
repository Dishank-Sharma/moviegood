import "./NavRightTab.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotifIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Cancel";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; 
import { useNavigate } from "react-router-dom";

export default function NavRightTab() {
  let [showNotif, setShowNotif] = useState(false);

  let [notifMsg, setNotifMsg] = useState([
    {
      id: uuidv4(),
      title: "Welcome 📢",
      msg: "Welcome to Our Movie Good! 🎉",
    },
  ]);
  let [notifCount, setNotifCount] = useState(notifMsg.length);
  let navigate = useNavigate();

  let handleNotifShow = () => {
    setShowNotif(!showNotif);
  };

  let clearList = (id) => {
    setNotifMsg((arr) => {
      return arr.filter((list) => list.id !== id);
    });
    setNotifCount(notifMsg.length - 1);
  };

  return (
    <div className="navTab">
      <div className="bellBox">
        <Badge badgeContent={notifCount} color="error" className="bellBadge" onClick={handleNotifShow}>
          <Tooltip
            title="Notifications"
            placement="top"
            arrow
          >
            <NotifIcon className="bellIcon" />
          </Tooltip>

          <ul
            className="notifMsg"
            style={{ transform: showNotif && "scale(1)" }}
          >
            <h3>
              Notifications <span>{notifCount}</span>
            </h3>
            <hr />
            <h5 style={{ display: notifMsg.length > 0 && "none" }}>
              You have no new notifications!
            </h5>
            {notifMsg.map((list) => (
              <li
                key={list.id}
                style={{ display: list.title == undefined && "none" }}
              >
                <b>{list.title}</b>
                <span>{list.msg}</span> 
                <CloseIcon
                  onClick={() => clearList(list.id)}
                  className="closeIcon"
                />
              </li>
            ))}
          </ul>
        </Badge>
      </div>
      <button className="favorites" onClick={() => navigate("/favorite")}>
        <FavoriteIcon size={1} className="favoriteIcon" />
        View Favorites
      </button>
    </div>
  );
}
