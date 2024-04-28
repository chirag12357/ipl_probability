import sqlite3
import requests
import json 
import sys
import pandas as pd

def get_schedule(live = False):
    url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607"

    headers = {
        "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
    }
    if live:
        response = requests.get(url, headers=headers).json()
        ##save the json to a file in readable format
        with open("django_files/data/schedule.json", "w") as f:
            f.write(json.dumps(response, indent=4))

    #read from data.json
    with open("django_files/data/schedule.json", "r") as f:
        data = json.load(f)

    #initialize dataframe with only column names
    schedule_df = pd.DataFrame(columns=["matchId", "startDate", "venue", "team1", "team2", "state", "status"])
    for day in data["matchDetails"]:
        if "matchDetailsMap" not in day:
            continue
        date = day["matchDetailsMap"]["key"]
        for match in day["matchDetailsMap"]["match"]:
            #insert in to df
            df = df.append({
                "matchId": match["matchInfo"]["matchId"],
                "startDate": match["matchInfo"]["startDate"],
                "venue": match["matchInfo"]["venueInfo"]["ground"],
                "team1": match["matchInfo"]["team1"]["teamSName"],
                "team2": match["matchInfo"]["team2"]["teamSName"],
                "state": match["matchInfo"]["state"],
                "status": match["matchInfo"]["status"]
            }, ignore_index=True)
    
    #save to sqlite
    conn = sqlite3.connect("django_files/data/ipl.sqlite3")
    schedule_df.to_sql("schedule", conn, if_exists="replace", index=False)

# get_schedule(live = True) 

def get_table(live = False):
    url = "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table"

    headers = {
        "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
    }

    if live:
        response = requests.get(url, headers=headers).json()
        ##save the json to a file in readable format
        with open("django_files/data/table.json", "w") as f:
            f.write(json.dumps(response, indent=4))

    #read from data.json
    with open("django_files/data/table.json", "r") as f:
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
    conn = sqlite3.connect("django_files/data/ipl.sqlite3")
    table_df.to_sql("table", conn, if_exists="replace", index=False)
get_table()












def calculate():
    teams = ["RCB", "MI", "CSK", "KKR", "DC", "KXIP", "RR", "SRH", "GT", "LSG"]
    matches = {}
    for i in range(len(teams)):
        for j in range(i+1, len(teams)):

            matches[i] = [teams[i], teams[j], 0, 0]
    
    

