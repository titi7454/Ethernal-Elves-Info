import { React, useEffect, useState, useCallback } from "react";

import { getETHPrice } from "../../utils/getETHPrice";
import WeeklyLeaderboard from "../../Components/WeeklyLeaderboard";
import CurrentPrices from "../../Components/CurrentPrices";
import Burn from "../../Components/Burn";
import RenEconomyCharts from "../../Components/RenEconomyCharts";

const Analytics = () => {
  const apiElves = `https://api.opensea.io/api/v1/collection/ethernalelves/stats`;
  const apiElders = `https://api.opensea.io/api/v1/collection/ethernalelves-elders/stats`;
  const apiArtifact = `https://api.opensea.io/api/v1/collection/ethernalelves-artifacts/stats`;
  const apiTokens = `https://api.ethernalelves.com/api/tokens`;
  const apiRenLeaderboard = `http://localhost:5000/api/stats/renleaderboard`;
  const apiMoonLeaderboard = `http://localhost:5000/api/stats/moonleaderboard`;
  const apiEconomy = `http://localhost:5000/api/stats/economy`;
  const apiBossLeaderbaord = `http://localhost:5000/api/stats/bosskillsleaderboard`;
  const apiDailyRen = `http://localhost:5000/api/stats/daily/ren`;
  const apiWeeklyRen = `http://localhost:5000/api/stats/weekly/ren`;
  const apiDailyMoon = `http://localhost:5000/api/stats/daily/moon`;
  const apiWeeklyMoon = `http://localhost:5000/api/stats/weekly/moon`;

  const [elfStats, setElfStats] = useState([]);
  const [renLB, setRenLB] = useState([{ objectId: "Fetching burn data..." }]);
  const [moonLB, setMoonLB] = useState([{ objectId: "Fetching burn data..." }]);
  const [bossLB, setBossLB] = useState([
    { objectId: "Fetching boss kills..." },
  ]);
  const [dailyRen, setDailyRen] = useState([
    { objectId: "Fetching burn data..." },
  ]);
  const [dailyMoon, setDailyMoon] = useState([
    { objectId: "Fetching burn data..." },
  ]);
  const [weeklyRen, setWeeklyRen] = useState([
    { objectId: "Fetching burn data..." },
  ]);
  const [weeklyMoon, setWeeklyMoon] = useState([
    { objectId: "Fetching burn data..." },
  ]);
  const [elderStats, setElderStats] = useState([]);
  const [tokenStats, setTokenStats] = useState([]);
  const [artifactStats, setArtifactStats] = useState([]);
  const [moonStats, setMoonStats] = useState([]);
  const [renStats, setRenStats] = useState([]);
  const [changePrice, setChangePrice] = useState(true);
  const [changeBurn, setChangeBurn] = useState(true);
  const [moon, setMoon] = useState("Loading...");
  const [ren, setRen] = useState("Loading...");
  const [ethPrice, setEthPrice] = useState(0);
  const [renBurnData, setRenBurnData] = useState({});
  const [funnelData, setFunnelData] = useState([
    {
      id: "Loading...",
      value: 0,
      label: "Loading...",
    },
  ]);
  const [changeChart, setChangeChart] = useState(true);

  const fetchElvesData = useCallback(async () => {
    const responseElves = await fetch(apiElves);
    const resultElves = await responseElves.json();
    setElfStats(resultElves);
  }, [apiElves]);

  const fetchRenLeaderboard = useCallback(async () => {
    const responseRen = await fetch(apiRenLeaderboard);
    const resultRen = await responseRen.json();
    setRenLB(resultRen);
  }, [apiRenLeaderboard]);

  const fetchMoonLeaderboard = useCallback(async () => {
    const responseMoon = await fetch(apiMoonLeaderboard);
    const resultMoon = await responseMoon.json();
    setMoonLB(resultMoon);
  }, [apiMoonLeaderboard]);

  const fetchRenEconomy = useCallback(async () => {
    const createFunnelData = [];
    const responseRen = await fetch(apiEconomy);
    const resultRen = await responseRen.json();
    const renData = resultRen.map((ren) => {
      return { name: ren.objectId, burn: Math.floor(ren.burn) };
    });
    renData.sort((a, b) => {
      return a.burn - b.burn;
    });
    createFunnelData.push({
      id: `step_${renData[renData.length - 1].name}`,
      value: renData[renData.length - 1].burn,
      label: "Total",
    });
    createFunnelData.push({
      id: `step_${renData[0].name}`,
      value: renData[0].burn * -1,
      label: "Burned",
    });
    createFunnelData.push({
      id: `step_${renData[renData.length - 3].name}`,
      value: renData[renData.length - 3].burn,
      label: "Remaining",
    });
    setRenBurnData(renData);
    setFunnelData(createFunnelData);
    console.log(createFunnelData);
  }, [apiEconomy]);

  const fetchBossLeaderboard = useCallback(async () => {
    const responseBoss = await fetch(apiBossLeaderbaord);
    const resultBoss = await responseBoss.json();
    setBossLB(resultBoss);
  }, [apiBossLeaderbaord]);

  const fetchDailyBurn = useCallback(async () => {
    const responseDailyRen = await fetch(apiDailyRen);
    const resultDailyRen = await responseDailyRen.json();
    const responseDailyMoon = await fetch(apiDailyMoon);
    const resultDailyMoon = await responseDailyMoon.json();
    setDailyRen(resultDailyRen);
    setDailyMoon(resultDailyMoon);
  }, [apiDailyRen, apiDailyMoon]);

  const fetchWeeklyBurn = useCallback(async () => {
    const responseWeeklyRen = await fetch(apiWeeklyRen);
    const resultWeeklyRen = await responseWeeklyRen.json();
    const responseWeeklyMoon = await fetch(apiWeeklyMoon);
    const resultWeeklyMoon = await responseWeeklyMoon.json();
    setWeeklyRen(resultWeeklyRen);
    setWeeklyMoon(resultWeeklyMoon);
  }, [apiWeeklyRen, apiWeeklyMoon]);

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
    const value = await getETHPrice();
    setEthPrice(Math.floor(Number(value[1]) / 100000000));
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

  const fetchArtifactData = useCallback(async () => {
    const responseArtifact = await fetch(apiArtifact);
    const resultArtifact = await responseArtifact.json();
    setArtifactStats(resultArtifact);
  }, [apiArtifact]);

  const handlePriceChange = () => {
    setChangePrice(!changePrice);
  };

  const handleChangeBurn = () => {
    setChangeBurn(!changeBurn);
  };

  const handleChangeChart = () => {
    setChangeChart(!changeChart);
  };

  useEffect(() => {
    fetchElvesData();
    fetchEldersData();
    fetchTokenData();
    fetchArtifactData();
    fetchRenLeaderboard();
    fetchMoonLeaderboard();
    fetchRenEconomy();
    fetchBossLeaderboard();
    fetchDailyBurn();
    fetchWeeklyBurn();
  }, [
    fetchElvesData,
    fetchEldersData,
    fetchTokenData,
    fetchArtifactData,
    fetchRenLeaderboard,
    fetchMoonLeaderboard,
    fetchRenEconomy,
    fetchBossLeaderboard,
    fetchDailyBurn,
    fetchWeeklyBurn,
  ]);

  return (
    <div className="main-div">
      <CurrentPrices
        artifactStats={artifactStats}
        elfStats={elfStats}
        elderStats={elderStats}
        changePrice={changePrice}
        ren={ren}
        ethPrice={ethPrice}
        moon={moon}
        moonStats={moonStats}
        isPositive={isPositive}
        handlePriceChange={handlePriceChange}
      />
      <Burn
        dailyRen={dailyRen}
        dailyMoon={dailyMoon}
        weeklyRen={weeklyRen}
        weeklyMoon={weeklyMoon}
        changeBurn={changeBurn}
        handleChangeBurn={handleChangeBurn}
      />
      <WeeklyLeaderboard renLB={renLB} moonLB={moonLB} bossLB={bossLB} />
      <RenEconomyCharts
        renBurnData={renBurnData}
        funnelData={funnelData}
        handleChangeChart={handleChangeChart}
        changeChart={changeChart}
      />
    </div>
  );
};

export default Analytics;
