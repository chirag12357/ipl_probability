/* eslint-disable @next/next/no-img-element */
import React from "react";
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
import TeamData from "../../../components/team-list/teams.json";
const PointsTable = () => {
  return (
    <>
      <Table>
        {/* <TableCaption>Current Standings</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Played</TableCell>
            <TableCell>Won</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>NRR</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TeamData.map((team) => (
            <TableRow className="" key={team.id}>
              <TableCell className="font-medium flex space-x-2 text-nowrap pr-10">
                <img
                  src={team.logo}
                  width={35}
                  height={35}
                  alt="logo"
                  className=""
                />{" "}
                <span className="flex items-center">{team.name}</span>
              </TableCell>
              <TableCell className=" font-semibold">1</TableCell>
              <TableCell className="text-green-500 font-semibold">1</TableCell>
              <TableCell className="text-red-500 font-semibold">0</TableCell>
              <TableCell className=" font-semibold">+0.025</TableCell>
              <TableCell className=" font-semibold">2</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PointsTable;
