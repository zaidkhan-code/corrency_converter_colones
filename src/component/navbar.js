import React, { useContext } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import icon from "../assets/arrow_icon.png";
import { coinContext } from "../context/coinCointext";
function Navbar() {
  const { setCurrency } = useContext(coinContext);
  function currencyHandler(event) {
    switch (event.target.value) {
      case "usd": {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
      case "eur": {
        setCurrency({
          name: "eur",
          symbol: "€",
        });
        break;
      }
      case "inr": {
        setCurrency({
          name: "inr",
          symbol: "₹",
        });
        break;
      }
      default: {
        setCurrency({
          name: "usd",
          symbol: "$",
        });
      }
    }
  }
  return (
    <div className="navbar">
      <img src={logo} alt="" className="logo" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={icon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
