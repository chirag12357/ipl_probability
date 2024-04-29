import { create } from "zustand";
import { useEffect } from "react";
import axios from "axios";


type tableResponseType = {
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
        const response = await axios.get("http://localhost:9090/points");
        set({ tableData: response.data });
    },
    }));

export default useStore;

