import logo from "../assets/logo.png" 
import "./Logo.css";
import { useLocation } from "react-router-dom";

export default function Logo() {

    let location = useLocation(); 

    let isErrorPage = location.pathname.startsWith("/error");

    return (
        <a href="/" className={ isErrorPage ? "logo errorLogo" : "logo"}>
            <img  src={logo} alt="img" />
            <span>ovieGood</span>
        </a>
    )
}