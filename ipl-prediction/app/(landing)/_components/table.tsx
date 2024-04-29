/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import formIcon from "./formIcon";

import TeamData from "../../../components/team-list/teams.json";
import useStore from "@/store/store";
import { tableResponseType } from "@/store/store";
import FormIcon from "./formIcon";

const PointsTable = () => {
  const { fetchTableData, tableData } = useStore() as {
    fetchTableData: () => void;
    tableData: tableResponseType[];
  };
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      <Table className="">
        {/* <TableCaption>Current Standings</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Played</TableCell>
            <TableCell>Won</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>NRR</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Last 5</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((team, idx) => (
            <TableRow className="" key={team.teamId}>
              <TableCell className="font-medium flex space-x-2 text-nowrap pr-10">
                {/* <img
                  src={team.logo}
                  width={35}
                  height={35}
                  alt="logo"
                  className=""
                />{" "} */}
                <span className="flex items-center">{team.teamFullName}</span>
              </TableCell>
              <TableCell className=" font-semibold">
                {team.matchesPlayed}
              </TableCell>
              <TableCell className="text-green-500 font-semibold">
                {team.matchesWon}
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                {team.matchesLost}
              </TableCell>
              <TableCell className=" font-semibold">{team.nrr}</TableCell>
              <TableCell className=" font-semibold">{team.points}</TableCell>
              <TableCell className=" font-semibold">
                <FormIcon form={team.form as string[]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PointsTable;
