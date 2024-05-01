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
"netRunRate"?: number | string | null,
"teamFullName"?: string | null,
"teamMatches"?: any[] | null,
"form"?:string[] | null,
"teamImageId"?: number | null,
}

export type TeamType = {
    [key : string] : tableResponseType;
}


const useStore = create((set) => ({
    tableData: {},
    fetchTableData: async () => {
        try {
            const response = await axios.get("http://localhost:5000/teams");
            set({ tableData: response.data })

        } catch (error) {
            console.error(error);
        }
    }
}));

export default useStore;

