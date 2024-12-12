import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { coinContext } from "../../context/coinCointext";
import { Link } from "react-router-dom";
function Home() {
  const { allCoin, currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  const options = (event) => {
    setInput(event.target.value);
  };
  const inputHandler = async (event) => {
    event.preventDefault();
    const coin = await allCoin.filter((items) => {
      return items.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coin);
  };
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest
          <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world largest cryptocurrency marketplace. Sign up to
          explore more about cryptos
        </p>
        <form onClick={inputHandler}>
          <input
            list="coinlist"
            placeholder="Search crypto"
            onChange={options}
            required
            type="text"
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => {
              return <option key={index} value={item.name} />;
            })}
          </datalist>
          <button type="submit"> Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-liyout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textalign: "center" }}>24H change</p>
          <p className="market-cap">Market cape</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => {
          return (
            <Link to={`/Coin/${item.id}`}>
              <div className="table-liyout" key={index}>
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name + "-" + item.symbol}</p>
                </div>
                <p>
                  {currency.symbol}
                  {item.current_price.toLocaleString()}
                </p>
                <p
                  className={`${
                    item.price_change_percentage_24h > 0 ? "green" : "red"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}
                </p>
                <p className="market-cap">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </div>{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
