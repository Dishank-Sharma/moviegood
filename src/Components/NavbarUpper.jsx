import "./NavbarUpper.css"
import Logo from "./Logo.jsx"
import SearchBox from "./SearchBox.jsx" 
import NavRightTab from "./NavRightTab.jsx"


export default function NavbarUpper({searchQ}) {
    return ( 
        <div className="navbarUpper">
            <Logo />
            <SearchBox searchQ={searchQ} className="navSearchBox"/>
            <NavRightTab/>
        </div>
    )
}