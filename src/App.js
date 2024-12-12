import React from "react";
import Navbar from "./component/navbar";
import Home from "./pages/home/Home";
import Coin from "./pages/coin/coin";
import { Route, Routes } from "react-router-dom";
import Footer from "./component/footer";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="coin/:coinid" element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
