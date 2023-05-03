import React from "react";
import DailyBurn from "./DailyBurn";
import WeeklyBurn from "./WeeklyBurn";

function Burn({
  dailyRen,
  dailyMoon,
  weeklyRen,
  weeklyMoon,
  changeBurn,
  handleChangeBurn,
}) {
  return (
    <>
      <h2 className="prices">
        Burn
        <button className="btnPrice" onClick={handleChangeBurn}>
          {changeBurn ? "Daily" : "Weekly"}
        </button>
      </h2>
      {changeBurn ? (
        <DailyBurn dailyRen={dailyRen} dailyMoon={dailyMoon} />
      ) : (
        <WeeklyBurn weeklyRen={weeklyRen} weeklyMoon={weeklyMoon} />
      )}
    </>
  );
}

export default Burn;
