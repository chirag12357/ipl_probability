import sqlite3
import requests
import json 
import sys
import pandas as pd
import os
from fastapi import FastAPI, APIRouter
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import pytz

class IPL:
    def __init__(self):
        self.conn = sqlite3.connect("backend/data/ipl.sqlite3", check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.schedule_df = pd.DataFrame()
        self.table_df = pd.DataFrame()
        self.teams_df = pd.DataFrame()

        self.router = APIRouter()
        self.router.add_api_route("/table", self.load_table, methods=["GET"])
        self.router.add_api_route("/schedule", self.load_schedule, methods=["GET"])
        self.router.add_api_route("/teams", self.load_teams, methods=["GET"])

    def load_schedule(self, date = None):
        if date == None:
            date = datetime.now().strftime("%Y-%m-%d")
            query = f"SELECT * FROM schedule WHERE startDate LIKE '{date}%'"
            self.schedule_df = pd.read_sql(query, self.conn)
            schedule_dict = {}
            for row in self.schedule_df.iterrows():
                row = row[1]
                schedule_dict[row["matchId"]] = {"startDate": row["startDate"], "venue": row["venue"], "team1": row["team1"], "team2": row["team2"], "state": row["state"], "status": row["status"]}
            return schedule_dict
        
        elif date == "all":
            query = "SELECT * FROM schedule"
            self.schedule_df = pd.read_sql(query, self.conn)
            schedule_dict = {}
            for row in self.schedule_df.iterrows():
                row = row[1]
                schedule_dict[row["matchId"]] = {"startDate": row["startDate"], "venue": row["venue"], "team1": row["team1"], "team2": row["team2"], "state": row["state"], "status": row["status"]}
            return schedule_dict
        
        else:
            query = f"SELECT * FROM schedule WHERE startDate LIKE '{date}%'"
            self.schedule_df = pd.read_sql(query, self.conn)
            schedule_dict = {}
            for row in self.schedule_df.iterrows():
                row = row[1]
                schedule_dict[row["matchId"]] = {"startDate": row["startDate"], "venue": row["venue"], "team1": row["team1"], "team2": row["team2"], "state": row["state"], "status": row["status"]}
            return schedule_dict

    def load_table(self, live = False):
        if live:
            self.fetch_table(live)
        query = "SELECT * FROM points_table"
        self.table_df = pd.read_sql(query, self.conn)
        return self.table_df.to_json()
    
    def load_teams(self, live = False):
        if live:
            self.fetch_table(live)
        self.load_table()
        teams = {}
        for team in self.table_df["teamName"]:
            teamInfo = self.table_df[self.table_df["teamName"] == team]
            teams[list(teamInfo["teamName"])[0]] = {"teamId" : list(teamInfo["teamId"])[0], "teamFullName" : list(teamInfo["teamFullName"])[0], "matchesPlayed": list(teamInfo["matchesPlayed"])[0], "matchesWon": list(teamInfo["matchesWon"])[0], "matchesLost": list(teamInfo["matchesLost"])[0], "points": list(teamInfo["points"])[0], "netRunRate": list(teamInfo["netRunRate"])[0], "form": list(teamInfo["form"])[0]}
            self.teams_df = pd.DataFrame(teams)
        
        return self.teams_df.to_dict()
    
    def fetch_table(self, live = False):
        url = "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table"

        headers = {
            "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
            "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }

        if live:
            response = requests.get(url, headers=headers).json()
            ##save the json to a file in readable format
            with open("backend/data/table.json", "w") as f:
                f.write(json.dumps(response, indent=4))

        #read from data.json
        with open("backend/data/table.json", "r") as f:
            data = json.load(f)

        table_df = pd.DataFrame(columns=["teamId", "teamName", "teamFullName", "matchesPlayed", "matchesWon", "matchesLost", "points", "netRunRate"])
        for team in data["pointsTable"][0]["pointsTableInfo"]:
            table_df = table_df._append({
                "teamId": team["teamId"],
                "teamName": team["teamName"],
                "teamFullName": team["teamFullName"],
                "matchesPlayed": team["matchesPlayed"],
                "matchesWon": team["matchesWon"],
                "matchesLost": team["matchesLost"],
                "points": team["points"],
                "netRunRate": team["nrr"],
                "form": str(team["form"])
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
            with open("backend/data/schedule.json", "w") as f:
                f.write(json.dumps(response, indent=4))

        #read from data.json
        with open("backend/data/schedule.json", "r") as f:
            data = json.load(f)

        #initialize dataframe with only column names
        schedule_df = pd.DataFrame(columns=["matchId", "startDate", "venue", "team1", "team2", "state", "status"])
        for day in data["matchDetails"]:
            if "matchDetailsMap" not in day:
                continue
            date = day["matchDetailsMap"]["key"]
            for match in day["matchDetailsMap"]["match"]:
                #insert in to df
                schedule_df = schedule_df._append({
                    "matchId": match["matchInfo"]["matchId"],
                    "startDate": datetime.fromtimestamp(int(match["matchInfo"]["startDate"][:-3]), pytz.timezone("Asia/Kolkata")).strftime("%Y-%m-%d %H:%M"),
                    "venue": match["matchInfo"]["venueInfo"]["ground"],
                    "team1": match["matchInfo"]["team1"]["teamSName"],
                    "team2": match["matchInfo"]["team2"]["teamSName"],
                    "state": match["matchInfo"]["state"],
                    "status": match["matchInfo"]["status"]
                }, ignore_index=True)
        
        #save to sqlite
        schedule_df.to_sql("schedule", self.conn, if_exists="replace", index=False)

if __name__ == "__main__":
    ipl = IPL()
    ipl.fetch_table(live=True)
    app = FastAPI()
    app.include_router(ipl.router)
    
    origins = [
        "http://localhost.tiangolo.com",
        "https://localhost.tiangolo.com",
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")