import React from "react";

const WeeklyBurn = ({ weeklyRen, weeklyMoon }) => {
  if (!weeklyRen) {
    return <div>Fetching data...</div>;
  } else
    return (
      <>
        <div className="leaderboard">
          <div className="LBcontainer">
            <div className="top5">Ren burn</div>
            {weeklyRen.map((lb, key) => {
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
            <div className="top5">{`Total REN burned this week: ${
              weeklyRen[weeklyRen.length - 1]?.burn > 0 ? "+" : ""
            }${
              !weeklyRen[0].burn
                ? 0
                : Math.floor(weeklyRen[weeklyRen.length - 1]?.burn)
            }`}</div>
          </div>
          <div className="LBcontainer">
            <div className="top5">Moon burn</div>
            {weeklyMoon.map((lb, key) => {
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
            <div className="top5">{`Total MOON burned this week: ${
              weeklyMoon[weeklyMoon.length - 1]?.burn > 0 ? "+" : ""
            }${
              !weeklyMoon[0].burn ? 0 : weeklyMoon[weeklyMoon.length - 1]?.burn
            }`}</div>
          </div>
        </div>
      </>
    );
};

export default WeeklyBurn;
