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

import formIcon from "../formIcon";

import { DataTable } from "./DataTable";
import { columns } from "./columns";

import TeamData from "../../../../components/team-list/teams.json";
import useStore from "@/store/store";
import { tableResponseType } from "@/store/store";
import FormIcon from "../formIcon";

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
                {/* Map through Team Data and compare the full name and get the logo*/}
                <img
                  src={TeamData.find((t) => t.name === team.teamFullName)?.logo}
                  width={35}
                  height={35}
                  alt="logo"
                  className=""
                />
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

export const DefaultTable = () => {
  return (
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
  );
};

export const MainTable = () => {
  const { fetchTableData, tableData } = useStore() as {
    fetchTableData: () => void;
    tableData: tableResponseType[];
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

export default PointsTable;
