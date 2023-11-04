import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recommendations from "./components/Recommendations";
import Home from "./pages/Home";


function App() {
  return (
    <>
    <Sidebar />
    <Router>
      
      <Routes> {/* Use Routes instead of Switch */}
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Recommendations type="movies" />} />
        <Route path="/books" element={<Recommendations type="books" />} />
        <Route path="/music" element={<Recommendations type="music" />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;
