import sqlite3
import requests
import json 
import sys
import pandas as pd
import os
from fastapi import FastAPI, APIRouter

class IPL:
    def __init__(self):
        self.conn = sqlite3.connect("data/ipl.sqlite3", check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.schedule_df = pd.DataFrame()
        self.table_df = pd.DataFrame()

        self.router = APIRouter()
        self.router.add_api_route("/table", self.load_table, methods=["GET"])

    def load_schedule(self):
        query = "SELECT * FROM schedule"
        self.schedule_df = pd.read_sql(query, self.conn)
        return self.schedule_df

    def load_table(self):
        query = "SELECT * FROM points_table"
        self.table_df = pd.read_sql(query, self.conn)
        return self.table_df.to_json()
    
    def fetch_table(self, live = False):
        url = "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table"

        headers = {
            "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }

        if live:
            response = requests.get(url, headers=headers).json()
            ##save the json to a file in readable format
            with open("data/table.json", "w") as f:
                f.write(json.dumps(response, indent=4))

        #read from data.json
        with open("data/table.json", "r") as f:
            data = json.load(f)

        table_df = pd.DataFrame(columns=["teamId", "teamName", "matchesPlayed", "matchesWon", "matchesLost", "points", "netRunRate"])
        for team in data["pointsTable"][0]["pointsTableInfo"]:
            table_df = table_df.append({
                "teamId": team["teamId"],
                "teamName": team["teamName"],
                "matchesPlayed": team["matchesPlayed"],
                "matchesWon": team["matchesWon"],
                "matchesLost": team["matchesLost"],
                "points": team["points"],
                "netRunRate": team["nrr"]
            }, ignore_index=True)

        print(table_df)

        #save to sqlite
        table_df.to_sql("points_table", self.conn, if_exists="replace", index=False)

    def fetch_schedule(self, live = False):
        url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607"

        headers = {
            "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
        if live:
            response = requests.get(url, headers=headers).json()
            ##save the json to a file in readable format
            with open("data/schedule.json", "w") as f:
                f.write(json.dumps(response, indent=4))

        #read from data.json
        with open("data/schedule.json", "r") as f:
            data = json.load(f)

        #initialize dataframe with only column names
        schedule_df = pd.DataFrame(columns=["matchId", "startDate", "venue", "team1", "team2", "state", "status"])
        for day in data["matchDetails"]:
            if "matchDetailsMap" not in day:
                continue
            date = day["matchDetailsMap"]["key"]
            for match in day["matchDetailsMap"]["match"]:
                #insert in to df
                schedule_df = schedule_df.append({
                    "matchId": match["matchInfo"]["matchId"],
                    "startDate": match["matchInfo"]["startDate"],
                    "venue": match["matchInfo"]["venueInfo"]["ground"],
                    "team1": match["matchInfo"]["team1"]["teamSName"],
                    "team2": match["matchInfo"]["team2"]["teamSName"],
                    "state": match["matchInfo"]["state"],
                    "status": match["matchInfo"]["status"]
                }, ignore_index=True)
        
        #save to sqlite
        schedule_df.to_sql("schedule", self.conn, if_exists="replace", index=False)

    
ipl = IPL()
app = FastAPI()
app.include_router(ipl.router)