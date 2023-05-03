import React from "react";
import ethPng from "../Assets/eth.png";
import moonPng from "../Assets/MOON.png";
import renPng from "../Assets/REN.png";
import artifactPng from "../Assets/Artifacts.png";
import usdPng from "../Assets/USD.png";

function CurrentPrices({
  artifactStats,
  elfStats,
  elderStats,
  changePrice,
  ren,
  ethPrice,
  moon,
  moonStats,
  isPositive,
  handlePriceChange,
}) {
  return (
    <>
      <h2 className="prices">
        Current prices
        <button className="btnPrice" onClick={handlePriceChange}>
          {changePrice ? "ETH" : "USD"}
        </button>
      </h2>
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
                  {changePrice ? (
                    <img
                      className="coinimage"
                      alt="Ethereum symbol"
                      src={changePrice ? ethPng : usdPng}
                      width="18px"
                      height="29px"
                    />
                  ) : (
                    <img
                      className="coinimage"
                      alt="USD"
                      src={usdPng}
                      width="25px"
                      height="25px"
                    />
                  )}
                  <p>
                    {!elderStats.stats
                      ? "Loading..."
                      : changePrice
                      ? elderStats.stats.floor_price
                      : "$" +
                        Math.floor(
                          elderStats.stats.floor_price * ethPrice * 100
                        ) /
                          100}
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
                  {changePrice ? (
                    <img
                      className="coinimage"
                      alt="Ethereum symbol"
                      src={changePrice ? ethPng : usdPng}
                      width="18px"
                      height="29px"
                    />
                  ) : (
                    <img
                      className="coinimage"
                      alt="USD"
                      src={usdPng}
                      width="25px"
                      height="25px"
                    />
                  )}
                  <p>
                    {!elfStats.stats
                      ? "Loading..."
                      : changePrice
                      ? elfStats.stats.floor_price
                      : "$" +
                        Math.floor(
                          elfStats.stats.floor_price * ethPrice * 100
                        ) /
                          100}
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
            "https://www.dextools.io/app/en/polygon/pair-explorer/0x776ca314fa0820aaaa41a4593d8900ff60587c0c"
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
                  <p>
                    {changePrice
                      ? moon
                      : "$" + Math.floor(moon * ren * ethPrice * 1000) / 1000}
                  </p>
                  <div className="space"></div>
                  <div>--%</div>
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
            "https://www.dextools.io/app/en/polygon/pair-explorer/0x4e62635fa4714dbd6007dcdb24b2c9913e480883&tokens"
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
                  <p>
                    {changePrice
                      ? ren
                      : "$" + Math.floor(ren * ethPrice * 1000000) / 1000000}
                  </p>
                  <div className="space"></div>
                  <div>--%</div>
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
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://opensea.io/collection/ethernalelves-artifacts"}
        >
          <div className="elder">
            <dl>
              <dt className="big">Artifacts</dt>
              <dd>
                <div className="middle">
                  <img
                    className="coinimage"
                    alt="Ethereum symbol"
                    src={artifactPng}
                    width="31px"
                    height="31px"
                  ></img>
                  <p>
                    {!artifactStats.stats
                      ? "Loading..."
                      : changePrice
                      ? Math.floor(artifactStats.stats.floor_price * 100000) /
                        100000
                      : "$" +
                        Math.floor(
                          artifactStats.stats.floor_price * ethPrice * 100
                        ) /
                          100}
                  </p>
                  <div className="space"></div>
                  <div>{isPositive(artifactStats)}</div>
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
    </>
  );
}

export default CurrentPrices;
