import { React } from "react";

const DailyBurn = ({ dailyRen, dailyMoon }) => {
  if (!dailyRen) {
    return <div>Fetching data...</div>;
  } else
    return (
      <>
        <div className="leaderboard">
          <div className="LBcontainer">
            <div className="top5">Ren burn</div>
            {dailyRen.map((lb, key) => {
              const burn = Math.floor(Number(lb.burn));
              if (lb.objectId === "Total") {
                return;
              } else {
                return (
                  <div key={key} className="LBtext">
                    {!lb.burn ? (
                      <div>{`${lb.objectId}`}</div>
                    ) : (
                      <div>{`${lb.objectId}: ${burn} ren `}</div>
                    )}
                  </div>
                );
              }
            })}
            <div className="top5">{`Total REN burned today: ${
              dailyRen[dailyRen.length - 1]?.burn > 0 ? "+" : ""
            }${
              !dailyRen[0].burn
                ? 0
                : Math.floor(dailyRen[dailyRen.length - 1]?.burn)
            }`}</div>
          </div>
          <div className="LBcontainer">
            <div className="top5">Moon burn</div>
            {dailyMoon.map((lb, key) => {
              const burn = Math.floor(Number(lb.burn));
              if (lb.objectId === "Total") {
                return;
              } else {
                return (
                  <div key={key} className="LBtext">
                    {!lb.burn ? (
                      <div>{`${lb.objectId}`}</div>
                    ) : (
                      <div>{`${lb.objectId}: ${burn} moon `}</div>
                    )}
                  </div>
                );
              }
            })}
            <div className="top5">{`Total REN burned today: ${
              dailyMoon[dailyMoon.length - 1]?.burn > 0 ? "+" : ""
            }${
              !dailyMoon[0].burn
                ? 0
                : Math.floor(dailyMoon[dailyMoon.length - 1]?.burn)
            }`}</div>
          </div>
        </div>
      </>
    );
};

export default DailyBurn;
