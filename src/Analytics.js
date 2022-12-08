import { React, useEffect, useState, useCallback } from "react";
import ethPng from "./eth.png";
import moonPng from "./moon.png";
import renPng from "./pren.png";

const Analytics = () => {
  const apiElves = `https://api.opensea.io/api/v1/collection/ethernalelves/stats`;
  const apiElders = `https://api.opensea.io/api/v1/collection/ethernalelves-elders/stats`;
  const apiTokens = `https://api.ethernalelves.com/api/tokens`;

  const [elfStats, setElfStats] = useState({});
  const [elderStats, setElderStats] = useState({});
  const [tokenStats, setTokenStats] = useState({});
  const [moonStats, setMoonStats] = useState([]);
  const [renStats, setRenStats] = useState([]);
  const [moon, setMoon] = useState("Loading...");
  const [ren, setRen] = useState("Loading...");

  const fetchElvesData = useCallback(async () => {
    const responseElves = await fetch(apiElves);
    const resultElves = await responseElves.json();
    setElfStats(resultElves);
  }, [apiElves]);

  const Calcs = () => {
    if (tokenStats.moonPrice) {
      setMoonStats(tokenStats.moonPrice.split(" "));
      setMoon(Number(moonStats[0]).toFixed(2));
      setRenStats(tokenStats.pRenPrice.split(" "));
      setRen((1 / Number(renStats[0])).toFixed(10));
    }
  };

  const fetchTokenData = useCallback(async () => {
    const responseTokens = await fetch(apiTokens);
    const resultTokens = await responseTokens.json();
    setTokenStats(resultTokens);
    Calcs();
  }, [apiTokens, tokenStats.moonPrice, moon]);

  const isPositive = (arr) => {
    if (arr.stats && arr.stats.one_day_change >= 0) {
      return (
        <p className="green">
          +{arr.stats && Math.floor(arr.stats.one_day_change)}%
        </p>
      );
    } else {
      return (
        <p className="RED">
          {arr.stats && Math.floor(arr.stats.one_day_change)}%
        </p>
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
    fetchTokenData();
  }, [fetchElvesData, fetchEldersData, fetchTokenData]);

  return (
    <div>
      <h2 className="prices">Current prices</h2>
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
                  <p>
                    {!elderStats.stats
                      ? "Loading..."
                      : elderStats.stats.floor_price}
                  </p>
                  <div className="space"></div>
                  <div>{isPositive(elderStats)}</div>
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
                  <p>
                    {!elfStats.stats
                      ? "Loading..."
                      : elfStats.stats.floor_price}
                  </p>
                  <div className="space"></div>
                  <div>{isPositive(elfStats)}</div>
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
          href={
            "https://app.sushi.com/swap?chainId=137&outputCurrency=0xa2ecfebe618e90608882c4ad6b3a2ea6fdeb5e46&inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
          }
        >
          <div className="elf">
            <dl>
              <dt className="big">Moon</dt>
              <dd>
                <div className="middle">
                  <img
                    className="coinimage"
                    alt="Ethereum symbol"
                    src={moonPng}
                    width="29px"
                    height="29px"
                  ></img>
                  <p>{moon}</p>
                  <div className="space"></div>
                  <div>{isPositive(elfStats)}</div>
                </div>
              </dd>
              <dd>
                <div className="middle">
                  <p>{moonStats[1]}</p>
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
          href={
            "https://app.sushi.com/swap?chainId=137&outputCurrency=0xa2ecfebe618e90608882c4ad6b3a2ea6fdeb5e46&inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
          }
        >
          <div className="elf" id="pren">
            <dl>
              <dt className="big">pRen</dt>
              <dd>
                <div className="middle">
                  <img
                    className="coinimage"
                    alt="Ethereum symbol"
                    src={renPng}
                    width="29px"
                    height="29px"
                  ></img>
                  <p>{ren}</p>
                  <div>{isPositive(elfStats)}</div>
                </div>
              </dd>
              <dd className="renaskprice">
                <div className="middle">
                  <p>Ask price</p>
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
