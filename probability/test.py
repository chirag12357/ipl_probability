import sqlite3
import requests
import json 
import sys
import pandas as pd

def save_current_schedule():
    url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607"

    headers = {
        "X-RapidAPI-Key": "4ef6785636mshe0a3eaa4ecbdabfp1d484ejsn2f28f8394762",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
    }

    # response = requests.get(url, headers=headers).json()
    #save the json to a file in readable format
    # with open("data.json", "w") as f:
    #     f.write(json.dumps(response, indent=4))

    #read from data.json
    with open("data.json", "r") as f:
        data = json.load(f)

    #initialize dataframe with only column names
    df = pd.DataFrame(columns=["matchId", "startDate", "venue", "team1", "team2", "state", "status"])
    for day in data["matchDetails"]:
        if "matchDetailsMap" not in day:
            continue
        date = day["matchDetailsMap"]["key"]
        for match in day["matchDetailsMap"]["match"]:
            #insert in to df
            df = df.append({
                "matchId": match["matchInfo"]["matchId"],
                "startDate": match["matchInfo"]["startDate"],
                "venue": match["matchInfo"]["venueInfo"],
                "team1": match["matchInfo"]["team1"]["teamSName"],
                "team2": match["matchInfo"]["team2"]["teamSName"],
                "state": match["matchInfo"]["state"],
                "status": match["matchInfo"]["status"]
            }, ignore_index=True)
            
    #save to sqlite
    conn = sqlite3.connect("ipl.db")
    df.to_sql("schedule", conn, if_exists="replace", index=False)

save_current_schedule() 














def calculate():
    teams = ["RCB", "MI", "CSK", "KKR", "DC", "KXIP", "RR", "SRH", "GT", "LSG"]
    matches = {}
    for i in range(len(teams)):
        for j in range(i+1, len(teams)):

            matches[i] = [teams[i], teams[j], 0, 0]
    
    

