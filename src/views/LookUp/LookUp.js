import { React, useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import NftCards from "../../Components/nftcards";
import Loot from "../../Components/Loot";
import WalletSearch from "../../Components/WalletSearch";
import WalletSettings from "../../Components/WalletSettings";

const LookUp = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [lootData, setLootData] = useState([]);
  const [usernameData, setUsernameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("");
  const [minLevel, setMinLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(1000);
  const [hidden, setHidden] = useState("hidden");
  const [hidden1, setHidden1] = useState("hidden");
  const [elder, setElder] = useState(true);
  const [sentinel, setSentinel] = useState(true);
  const [orc, setOrc] = useState(true);
  const [map, setMap] = useState(true);
  const [ens, setEns] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [elfById, setElfById] = useState();

  const apiAddress = `https://api.ethernalelves.com/api/owners/${wallet}`;
  const apiLoot = `https://api.ethernalelves.com/api/player/${wallet}`;
  const apiUsernames = `https://api.ethernalelves.com/api/usernames/${wallet}`;
  const provider = new ethers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_API_KEY}`
  );
  //https://cors-anywhere.herokuapp.com/
  //https://api.opensea.io/api/v1/asset/0xfb2b13c622d1590f9199f75d975574e8240b2618/1

  //Fetch data from the api
  const fetchOwnerData = useCallback(async () => {
    if (wallet.length <= 41) {
      return;
    } else {
      const fetchOwnerAddress = await fetch(apiAddress);
      const resultOfAddress = await fetchOwnerAddress.json();
      const fetchLoot = await fetch(apiLoot);
      const resultOfLoot = await fetchLoot.json();
      const fetchUsernames = await fetch(apiUsernames);
      const resultOfUsernames = await fetchUsernames.json();
      setOwnerData(resultOfAddress);
      setLootData(resultOfLoot);
      setUsernameData(resultOfUsernames);
    }
  }, [apiAddress, apiLoot, apiUsernames, wallet]);

  const checkElves = async () => {
    await fetchOwnerData();
    if (ownerData === null || ownerData.sentinels.length === 0) {
      setLoading(true);
      setHidden1("");
    } else {
      setLoading(false);
    }
  };
  //`../Assets/${lootData[n].name}.png`
  const handleEnterAddress = async (e) => {
    setEns(e);
    const resolver = await provider.resolveName(e);
    const isEns = resolver !== null ? resolver : e;
    setWallet(isEns);
    if (e.length >= 41 || isEns.length >= 41) {
      setIsEmpty(false);
    }
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

  const handleCloseHelp = () => {
    setHidden("hidden");
  };

  const handleOpenHelp = () => {
    setHidden("");
  };

  const onElderChange = (checked) => {
    setElder(checked);
  };

  const onSentinelChange = (checked) => {
    setSentinel(checked);
  };

  const onOrcChange = (checked) => {
    setOrc(checked);
  };

  const onMapChange = (checked) => {
    setMap(checked);
  };

  //Go back to the loading screen
  const restart = () => {
    setLoading(true);
    setEns("");
    setHidden1("hidden");
    setMaxLevel(1000);
    setMinLevel(0);
    setIsEmpty(true);
  };

  const handleSearchById = (e) => {
    setElfById(e);
    const filteredElders = ownerData.elders.filter(
      (elder) => elder === Number(e)
    );
    const filteredSentinels = ownerData.sentinels.filter(
      (sentinel) => sentinel === Number(e)
    );
    const filteredOrcs = ownerData.orcs.filter((orc) => orc === Number(e));
    const filteredSettlements = ownerData.settlements.filter(
      (settlement) => settlement === Number(e)
    );
    const filteredId = {
      elders: filteredElders,
      sentinels: filteredSentinels,
      orcs: filteredOrcs,
      settlements: filteredSettlements,
    };
    if (
      filteredElders.length > 0 ||
      filteredSentinels.length > 0 ||
      filteredOrcs.length > 0 ||
      filteredSettlements.length > 0
    ) {
      setFilterData(filteredId);
      setIsUsingFilter(true);
    } else {
      setIsUsingFilter(false);
    }
  };

  //Refresh nft data after searching for a new address
  useEffect(() => {
    fetchOwnerData();
  }, [loading, fetchOwnerData, minLevel, maxLevel]);

  //Create the loading screen
  if (loading === true) {
    return (
      <div>
        <WalletSearch
          hidden={hidden}
          hidden1={hidden1}
          handleCloseHelp={handleCloseHelp}
          handleEnterAddress={handleEnterAddress}
          ens={ens}
          handleSubmit={handleSubmit}
          isEmpty={isEmpty}
          handleOpenHelp={handleOpenHelp}
        />
      </div>
    );
  } else
    return (
      <div className="maindiv">
        <div>
          {`Welcome to ${
            usernameData[0].discordUser
              ? usernameData[0].discordUser
              : usernameData[0].ensName
              ? usernameData[0].ensName
              : usernameData[0].ethAddress
          }'s wallet`}
        </div>
        <WalletSettings
          restart={restart}
          minLevel={minLevel}
          maxLevel={maxLevel}
          handleMinLevel={handleMinLevel}
          handleMaxLevel={handleMaxLevel}
          handleSearchById={handleSearchById}
          elfById={elfById}
          elder={elder}
          onElderChange={onElderChange}
          sentinel={sentinel}
          onSentinelChange={onSentinelChange}
          orc={orc}
          onOrcChange={onOrcChange}
          map={map}
          onMapChange={onMapChange}
        />
        <Loot lootData={lootData} />
        <NftCards
          ownerData={ownerData}
          isUsingFilter={isUsingFilter}
          filterData={filterData}
          elder={elder}
          sentinel={sentinel}
          orc={orc}
          map={map}
          minLevel={minLevel}
          maxLevel={maxLevel}
        />
      </div>
    );
};

export default LookUp;
/*

*/
