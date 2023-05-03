import { React } from "react";
import TreeChart from "./TreeChart";
import FunnelChart from "./FunnelChart";

function RenEconomyCharts({
  renBurnData,
  funnelData,
  handleChangeChart,
  changeChart,
}) {
  if (funnelData[0].value === 0) {
    return <h2>Loading charts...</h2>;
  } else
    return (
      <>
        <h2 className="prices">Ren Economy</h2>
        <button
          className={!changeChart ? "chart" : "chart--disabled"}
          onClick={handleChangeChart}
          disabled={changeChart}
        >
          Funnel chart
        </button>
        <button
          className={changeChart ? "chart" : "chart--disabled"}
          onClick={handleChangeChart}
          disabled={!changeChart}
        >
          Tree chart
        </button>
        <div className="chartLG">
          {!changeChart ? (
            <TreeChart
              width={1200}
              height={800}
              renBurnData={renBurnData}
              margin={{ top: 50, left: 45, right: 250, bottom: 50 }}
            />
          ) : (
            <div className="funnelchart">
              <FunnelChart data={funnelData} />
            </div>
          )}
        </div>
        <div className="chartSM ">
          {!changeChart ? (
            <TreeChart
              width={380}
              height={900}
              renBurnData={renBurnData}
              margin={{ top: 10, left: 45, right: 110, bottom: 10 }}
            />
          ) : (
            <div className="funnelchart">
              <FunnelChart data={funnelData} />
            </div>
          )}
        </div>
      </>
    );
}

export default RenEconomyCharts;
