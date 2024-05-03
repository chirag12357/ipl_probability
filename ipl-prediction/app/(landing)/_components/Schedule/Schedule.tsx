import React from "react";
import Schedule from "@/data/schedule.json";
import TeamIcon, { teamIcons } from "@/data/logos";
// import Image from "next/image";

const ScheduleTable = () => {
  const today = new Date().toDateString();
  const tomorrow = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toDateString();

  const todaySchedule = Schedule.matchDetails.filter((item) => {
    if (item.matchDetailsMap?.key) {
      let date = new Date(item.matchDetailsMap?.key).toDateString();
      return date === tomorrow;
    }
  });

  const convertUndefined = (unix: string) => {
    console.log(unix);
    console.log(typeof unix);
    console.log(Date.parse(unix));
    if (unix === "undefined") {
      return "";
    }

    return new Date(parseInt(unix)).toLocaleString();
  };
  // console.log(todaySchedule[0].matchDetailsMap?.match[0].matchInfo);

  const matchInfo = todaySchedule[0].matchDetailsMap?.match[0].matchInfo;

  const team1 = matchInfo?.team1.teamSName as string;
  const team2 = matchInfo?.team2.teamSName as string;

  return (
    <>
      <div className="w-full h-fit p-4 border rounded-xl shadow-lg border-b-8 border-r-8 border-black/50">
        <h1 className="w-full text-center font-bold text-3xl">
          Upcoming Match
        </h1>
        <div className="w-full flex justify-center items-center mt-4">
          <span className="text-5xl font-semibold">
            {/* <img src={teamIcons[team1]} width={35} height={35} alt="team1" /> */}
            {team1}
          </span>{" "}
          <span className="mx-2">vs</span>
          <span className="text-5xl font-semibold">
            {/* <img src={teamIcons["rcb"]} width={35} height={35} alt="team1" /> */}
            {team2}
          </span>{" "}
          {matchInfo?.startDate && (
            <span className="text-2xl font-semibold">
              {/* {convertUndefined(matchInfo?.startDate)} */}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;
