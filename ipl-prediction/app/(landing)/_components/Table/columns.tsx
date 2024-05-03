/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CellContext, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { tableResponseType, TeamType } from "@/store/store";
import { Button } from "@/components/ui/button";

import FormIcon from "../formIcon";
import TeamList from "@/data/teams.json";

export const columns: ColumnDef<tableResponseType>[] = [
  {
    accessorKey: "teamFullName",
    header: "Team",
    cell: ({ cell }) => {
      return (
        <div className="flex space-x-2 items-center">
          <img
            src={TeamList.find((t) => t.name === cell.getValue())?.logo}
            width={35}
            height={35}
            alt="logo"
            className=""
          />
          <span>{cell.getValue() as string}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "matchesPlayed",
    header: "Played",
  },
  {
    accessorKey: "matchesWon",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-left p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Won
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "matchesLost",
    header: "Lost",
  },
  {
    accessorKey: "netRunRate",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-left p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NRR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-left p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "form",
    header: "Last 5",
    cell: ({ cell }) => {
      return <FormIcon form={cell.getValue() as string} />;
    },
  },
];
