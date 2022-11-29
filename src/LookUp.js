import { React, useEffect, useState, useCallback } from "react";
import Elf from "./Elf";

const LookUp = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("");
  const [ring, setRing] = useState("ring");
  const [hidden, setHidden] = useState("hidden");
  const [addressEntered, setAddressEntered] = useState(false);
  const apiAddress = `https://api.ethernalelves.com/api/owners/${wallet}`;

  //https://cors-anywhere.herokuapp.com/

  //Fetch data from the api
  const fetchOwnerData = useCallback(async () => {
    if (wallet === "") {
      return;
    }
    const fetchOwnerAddress = await fetch(apiAddress);
    const resultOfAddress = await fetchOwnerAddress.json();
    setOwnerData(resultOfAddress);
  }, [apiAddress, wallet]);

  const checkElves = () => {
    fetchOwnerData();
    if (ownerData === null || ownerData.sentinels.length === 0) {
      setLoading(true);
      setRing("hidden");
      setHidden("");
    } else {
      setLoading(false);
    }
  };

  const handleEnterAddress = (e) => {
    let walletAddress = e;
    walletAddress = walletAddress.toLowerCase();
    if (walletAddress.length === 42) {
      setWallet(e);
      setAddressEntered(true);
    } else {
      setAddressEntered(false);
    }
    setWallet(e);
  };

  const handleSubmit = () => {
    checkElves();
  };

  //Go back to the loading screen
  const restart = () => {
    setLoading(true);
    setWallet("");
    setRing("ring");
    setHidden("hidden");
    setAddressEntered(false);
  };

  //Refresh nft data after searching for a new address
  useEffect(() => {
    fetchOwnerData();
  }, [loading, fetchOwnerData]);

  //Create the loading screen
  if (loading === true) {
    return (
      <div>
        <button className="btn--help" onClick={() => setHidden("")}>?</button>
        <div className={hidden} id="help"> 
        <button className="close-help" onClick={() => setHidden("hidden")}>&times;</button>
        <h2>If you don't have or don't know any addresses you can use this one:</h2><h3>0xE4de66EF0e34829356b53FB2C0Aa17873798e7Be</h3></div>
        <div className={hidden} id="overlay"></div>
        <div className="first">
          <h1 id="top">Searching for elves</h1>
          <div className="initial">
            <div className="ring" id={ring}>
              Loading
              <span className="circle"></span>
            </div>
            <div className={hidden} id="red">
              NO ELVES ENCOUNTERED
            </div>
            <input
              maxLength={42}
              className="searchbar"
              placeholder="Enter address"
              value={wallet}
              onChange={(e) => handleEnterAddress(e.target.value)}
            />
            <button
              className="search"
              onClick={handleSubmit}
              disabled={!addressEntered}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  } else
    return (
      //Load the nfts
      <div>
        <button className="search" onClick={restart}>
          Back
        </button>
        <div className="elves">
          {ownerData.elders.map((elders, key) => {
            return (
              <div key={key} className="child box">
                <a
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  href={`https://opensea.io/assets/ethereum/0xfb2b13c622d1590f9199f75d975574e8240b2618/${elders}`}
                >
                  <Elf elfId={elders} collection={"elders"} />
                </a>
              </div>
            );
          })}
          {ownerData.sentinels.map((sentinels, key) => {
            return (
              <div key={key} className="child box">
                <a
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  href={`https://opensea.io/assets/ethereum/0xa351b769a01b445c04aa1b8e6275e03ec05c1e75/${sentinels}`}
                >
                  <Elf elfId={sentinels} collection={"sentinels"} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default LookUp;
/*

*/
