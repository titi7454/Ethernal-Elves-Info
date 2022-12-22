import { React, useEffect, useState, useCallback } from "react";
import Checkbox from "./Checkbox";
import ElfCard from "./ElfCard";

const LookUp = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("");
  const [minLevel, setMinLevel] = useState("0");
  const [maxLevel, setMaxLevel] = useState("100");
  const [hidden, setHidden] = useState("hidden");
  const [hidden1, setHidden1] = useState("hidden");
  const [addressEntered, setAddressEntered] = useState(false);
  const [elder, setElder] = useState(true);
  const [sentinel, setSentinel] = useState(true);

  const collectionElders = "0xfb2b13c622d1590f9199f75d975574e8240b2618";
  const colNameElders = "elders";
  const collectionSentinels = "0xa351b769a01b445c04aa1b8e6275e03ec05c1e75";
  const colNameSentinels = "sentinels";
  const apiAddress = `https://api.ethernalelves.com/api/owners/${wallet}`;

  //https://cors-anywhere.herokuapp.com/
  //https://api.opensea.io/api/v1/asset/0xfb2b13c622d1590f9199f75d975574e8240b2618/1

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
      setHidden1("");
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

  const handleMinLevel = (e) => {
    setMinLevel(e);
  };

  const handleMaxLevel = (e) => {
    setMaxLevel(e);
  };

  const handleSubmit = () => {
    checkElves();
  };

  const onElderChange = (checked) => {
    setElder(checked);
  };

  const onSentinelChange = (checked) => {
    setSentinel(checked);
  };

  //Go back to the loading screen
  const restart = () => {
    setLoading(true);
    setWallet("");
    setHidden1("hidden");
    setAddressEntered(false);
    setMaxLevel("100");
    setMinLevel("0");
  };

  //Refresh nft data after searching for a new address
  useEffect(() => {
    fetchOwnerData();
  }, [loading, fetchOwnerData, minLevel, maxLevel]);

  //Create the loading screen
  if (loading === true) {
    return (
      <div>
        <div className={hidden} id="help">
          <button className="close-help" onClick={() => setHidden("hidden")}>
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
              value={wallet}
              onChange={(e) => handleEnterAddress(e.target.value)}
            />
            <div className="searchhelp">
              <button
                className="search"
                onClick={handleSubmit}
                disabled={!addressEntered}
              >
                Search
              </button>
              <button className="btn--help" onClick={() => setHidden("")}>
                ?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      //Load the nfts
      <div className="maindiv">
        <button className="search" id="back" onClick={restart}>
          Back
        </button>
        <div className="checkbox" >
          <div className="checkbox" id="chmb">
            <div className="lb1">
              <div>Elders</div>
              <Checkbox id="elder" checked={elder} onChange={onElderChange} />
            </div>
            <div className="lb2">
              <div>Sentinels</div>
              <Checkbox
                id="sentinel"
                checked={sentinel}
                onChange={onSentinelChange}
              />
            </div>
          </div>
          <div className="levels-input">
            <div>
              <div>Min. Level</div>
              <input
                className="level"
                value={minLevel}
                onChange={(e) => handleMinLevel(e.target.value)}
              />
            </div>
            <div>
              <div>Max. Level</div>
              <input
                className="level"
                value={maxLevel}
                onChange={(e) => handleMaxLevel(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="elves">
          {ownerData.elders.map((elders, key) => {
            return (
              <ElfCard
                typeOfElf={elder}
                elfId={elders}
                collectionId={collectionElders}
                collectionName={colNameElders}
                minLevel={minLevel}
                maxLevel={maxLevel}
                key={key}
                selectClass=""
              />
            );
          })}
          {ownerData.sentinels.map((sentinels, key) => {
            return (
              <ElfCard
                typeOfElf={sentinel}
                elfId={sentinels}
                collectionId={collectionSentinels}
                collectionName={colNameSentinels}
                minLevel={minLevel}
                maxLevel={maxLevel}
                key={key}
                selectClass=""
              />
            );
          })}
        </div>
      </div>
    );
};

export default LookUp;
/*

*/
