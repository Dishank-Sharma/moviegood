import Navbar from "../Components/Navbar.jsx";
import ListingSlider from "../Components/ListingSlider.jsx";
import NavBottom from "../Components/NavBottom.jsx";

export default function MainIndex() {
  let style = {paddingBottom: '50px'}
  return (
    <div style={style}>
      <Navbar />
      <ListingSlider />
      <NavBottom />
    </div>
  );
}
