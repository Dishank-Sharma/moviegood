import "./Styles/App.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainIndex from "./Pages/MainIndex.jsx"
import MainDetail from "./Pages/MainDetail.jsx"
import ErrorPage from "./Pages/ErrorPage.jsx"
import MainSearch from "./Pages/MainSearch.jsx"
import MainCatPage from "./Pages/MainCatPage.jsx"
import MainFav from "./Pages/MainFav.jsx"


function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainIndex/>}/>
        <Route path="/movie/:id" element={<MainDetail/>}/>
        <Route path="/tv/:id" element={<MainDetail/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
        <Route path="/search" element={<MainSearch/>}/>
        <Route path="/browse/:browse/:cat" element={<MainCatPage/>}/>
        <Route path="/favorite" element={<MainFav/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
