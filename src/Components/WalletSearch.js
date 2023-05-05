import React from "react";

const WalletSearch = ({
  hidden,
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
        <div className="initial">
          <div className="card--wallet card--wallet--inverted">
            <h2 className="wallet--header">Look up a wallet</h2>
            <label className="input">
              <input
                maxLength={42}
                placeholder="Enter address"
                value={ens}
                onChange={(e) => handleEnterAddress(e.target.value)}
                className="input__field"
                type="text"
              />
              <span className="input__label">0xAddress or ENS</span>
            </label>

            <button
              className="button-group"
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
