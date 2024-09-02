import "./Navbar.css";
import NavbarUpper from "./NavbarUpper.jsx";
import NavbarLower from "./NavbarLower.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar({ searchQ }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSize, setIsSize] = useState(false);
  const [isPcSize, setIsPcSize] = useState(false);

  const location = useLocation();

  const checkMoviePage = location.pathname.startsWith("/movie");
  const checkTvPage = location.pathname.startsWith("/tv");

  const [isMoviePage, setIsMoviePage] = useState(checkMoviePage || checkTvPage);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 425px)");

    if (mediaQuery.matches) {
      setIsSize(true);
    }

    if (!mediaQuery.matches) {
      setIsPcSize(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className="navbar"
      style={{
        transform: !showNavbar && "translateY(-10rem)",
        minHeight: isMoviePage && isPcSize ? "60px" : "",
        marginBottom: (isSize && isMoviePage) || isMoviePage ? "0" : "",
      }}
    >
      <NavbarUpper searchQ={searchQ} />
      {!isMoviePage || isSize ? <NavbarLower /> : <></>}
    </div>
  );
}
