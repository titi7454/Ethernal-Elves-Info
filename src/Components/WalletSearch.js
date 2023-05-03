import React from "react";

const WalletSearch = ({
  hidden,
  hidden1,
  handleCloseHelp,
  handleEnterAddress,
  ens,
  handleSubmit,
  isEmpty,
  handleOpenHelp,
}) => {
  return (
    <>
      <div className={hidden} id="help">
        <button className="close-help" onClick={handleCloseHelp}>
          &times;
        </button>
        <h2>
          If you don't have or don't know any addresses you can use this one:
        </h2>
        <h3>0xE4de66EF0e34829356b53FB2C0Aa17873798e7Be</h3>
      </div>
      <div className={hidden} id="overlay"></div>
      <div className="first">
        <h1 id="top">Look up a wallet</h1>
        <div className="initial">
          <div className={hidden1} id="red">
            NO ELVES ENCOUNTERED
          </div>
          <input
            maxLength={42}
            className="searchbar"
            placeholder="Enter address"
            value={ens}
            onChange={(e) => handleEnterAddress(e.target.value)}
          />
          <div className="searchhelp">
            <button
              className="search"
              onClick={handleSubmit}
              disabled={isEmpty}
            >
              Search
            </button>
            <button className="btn--help" onClick={handleOpenHelp}>
              ?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletSearch;
