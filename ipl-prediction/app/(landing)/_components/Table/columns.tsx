import React from "react";
import { CellContext, ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { tableResponseType } from "@/store/store";
import { Button } from "@/components/ui/button";

import FormIcon from "../formIcon";

export const columns: ColumnDef<tableResponseType>[] = [
  {
    accessorKey: "teamFullName",
    header: "Team",
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
    accessorKey: "nrr",
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
      // Use the FormIcon component here
      return <FormIcon form={cell.getValue() as string[]} />;
    },
  },
];
