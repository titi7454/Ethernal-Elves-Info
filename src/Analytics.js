import { React, useEffect, useState, useCallback } from "react";
import ethPng from "./eth.png";

const Analytics = () => {
  const apiElves = `https://api.opensea.io/api/v1/collection/ethernalelves/stats`;
  const apiElders = `https://api.opensea.io/api/v1/collection/ethernalelves-elders/stats`;

  const [elfStats, setElfStats] = useState([]);
  const [elderStats, setElderStats] = useState([]);

  const fetchElvesData = useCallback(async () => {
    const responseElves = await fetch(apiElves);
    const resultElves = await responseElves.json();
    setElfStats(resultElves);
  }, [apiElves]);

  const isPositive = (arr) => {
    if (arr.stats && arr.stats.one_day_change >= 0) {
      return (
        <p className="green">+{arr.stats &&
          Math.floor(arr.stats.one_day_change)}%</p>
      );
    } else {
      return (
        <p className="RED">{arr.stats &&
          Math.floor(arr.stats.one_day_change)}%</p>
      );
    }
  };

  const fetchEldersData = useCallback(async () => {
    const responseElders = await fetch(apiElders);
    const resultElders = await responseElders.json();
    setElderStats(resultElders);
  }, [apiElders]);

  useEffect(() => {
    fetchElvesData();
    fetchEldersData();
  }, [fetchElvesData, fetchEldersData]);

  return (
    <div>
      <h2>Current prices</h2>
      <div className="stats">
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://opensea.io/collection/ethernalelves-elders"}
        >
          <div className="elder">
          <dl>
              <dt className="big">Elders</dt>
              <dd>
                <div className="middle">
                  <img
                    className="coinimage"
                    alt="Ethereum symbol"
                    src={ethPng}
                    width="18px"
                    height="29px"
                  ></img>
                  <p>{elderStats.stats && elderStats.stats.floor_price}</p>
                  <div className="space"></div>
                  <div>
                    {isPositive(elderStats)}
                  </div>
                </div>
              </dd>
              <dd>
                <div className="middle">
                  <p>Floor price</p>
                  <div className="space"></div>
                  <p>24h</p>
                </div>
              </dd>
            </dl>
          </div>
        </a>
        
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://opensea.io/collection/ethernalelves"}
        >
          <div className="elf">
            <dl>
              <dt className="big">Elves</dt>
              <dd>
                <div className="middle">
                  <img
                    className="coinimage"
                    alt="Ethereum symbol"
                    src={ethPng}
                    width="18px"
                    height="29px"
                  ></img>
                  <p>{elfStats.stats && elfStats.stats.floor_price}</p>
                  <div className="space"></div>
                  <div>
                    {isPositive(elfStats)}
                  </div>
                </div>
              </dd>
              <dd>
                <div className="middle">
                  <p>Floor price</p>
                  <div className="space"></div>
                  <p>24h</p>
                </div>
              </dd>
            </dl>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Analytics;
