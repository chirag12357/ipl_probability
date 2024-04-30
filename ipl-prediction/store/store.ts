import { create } from "zustand";
import { useEffect } from "react";
import axios from "axios";


export type tableResponseType = {
"teamId"?: number  | null,
"teamName"?: string | null,
"matchesPlayed"?: number | null,
"matchesWon"?: number | null,
"matchesLost"?: number | null,
"points"?: number | null,
"nrr"?: number | string | null,
"teamFullName"?: string | null,
"teamMatches"?: any[] | null,
"form"?:string[] | null,
"teamImageId"?: number | null,
}

const useStore = create((set) => ({
    tableData: [] as tableResponseType[],
    fetchTableData: async () => {
        try {
            const response = await axios.get("http://localhost:9090/points");
            set({
                tableData: response.data.map((team: tableResponseType) => ({
                    ...team,
                    nrr: Number(team.nrr),
                })),
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
            set({ tableData: [] });
        }
    },
    }));

export default useStore;

