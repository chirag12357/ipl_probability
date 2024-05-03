/* eslint-disable @next/next/no-img-element */
import TeamList from "@/data/teams.json";

//create for each team

export const teamIcons = {
  rcb: TeamList.find((t) => t.team === "RCB")?.logo,
  csk: TeamList.find((t) => t.team === "CSK")?.logo,
  dc: TeamList.find((t) => t.team === "DC")?.logo,
  kkr: TeamList.find((t) => t.team === "KKR")?.logo,
  mi: TeamList.find((t) => t.team === "MI")?.logo,
  pks: TeamList.find((t) => t.team === "PKS")?.logo,
  rr: TeamList.find((t) => t.team === "RR")?.logo,
  srh: TeamList.find((t) => t.team === "SRH")?.logo,
  lsg: TeamList.find((t) => t.team === "LSG")?.logo,
  gt: TeamList.find((t) => t.team === "GT")?.logo,
};

const TeamIcon = ({ team }: { team: string }) => {
  return (
    <img
      className="h-6 w-6"
      src={teamIcons[team as keyof typeof teamIcons]}
      alt={team}
    />
  );
};

export default TeamIcon;
