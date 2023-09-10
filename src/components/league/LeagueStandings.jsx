import React, { useState, useEffect } from 'react';
import clsx from 'clsx'; // Imported to constuct className strings conditionally

const BASE_URL = 'https://v3.football.api-sports.io';

// The league IDs along with min max are used to identify places in a table for each unique league ID
// The min max value will determine the border on places in the table
const leagueBorders = (standingsLength) => ({
  // Premier League
  "39" : { 
    clGroupStage: { min: 1, max: 4 },
    elGroupStage: { min: 5, max: 5 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  },
  // English Championship
  "40": { 
    promotion: { min: 1, max: 2 },
    promotionPlayOff: { min: 3, max: 6 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  },
  // French Ligue 1
  "61": { 
    clGroupStage: { min: 1, max: 2 },
    clQualifiers: { min: 3, max: 3 },
    elGroupStage: { min: 4, max: 4 },
    ecQualifiers: { min: 5, max: 5 },
    relegation: { min: standingsLength - 3, max: standingsLength },
  },
  // Bundesliga
  "78": {
    clGroupStage: { min: 1, max: 4 },
    elGroupStage: { min: 5, max: 5 },
    ecQualifiers: { min: 6, max: 6 },
    relegationPlayOffs: { min: standingsLength - 2, max: standingsLength - 2 },
    relegation: { min: standingsLength - 1, max: standingsLength },
  },
  // Dutch Eredivisie
  "88": { 
    clGroupStage: { min: 1, max: 1 },
    clQualifiers: { min: 2, max: 2 },
    ecQualifiers: { min: 3, max: 3 },
    relegationPlayOffs: { min: standingsLength - 2, max: standingsLength - 2 },
    relegation: { min: standingsLength - 1, max: standingsLength },
  },
  // Liga Portugal
  "94": { 
    clGroupStage: { min: 1, max: 2 },
    clQualifiers: { min: 3, max: 3 },
    ecQualifiers: { min: 4, max: 5 },
    relegationPlayOffs: { min: standingsLength - 2, max: standingsLength - 2 },
    relegation: { min: standingsLength - 1, max: standingsLength },
  },
  // Italian Serie A
  "135": { 
    clGroupStage: { min: 1, max: 4 },
    elGroupStage: { min: 5, max: 5 },
    ecQualifiers: { min: 6, max: 6 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  },
  // Spanish La Liga
  "140": { 
    clGroupStage: { min: 1, max: 4 },
    elGroupStage: { min: 5, max: 5 },
    ecQualifiers: { min: 6, max: 6 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  },
  // Belgian Pro League
  "144": {
    championshipRound: { min: 1, max: 4 },
    elPlayOffs: { min: 5, max: 8 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  }, 
  // Croation Football League
  "210": {
    championshipRound: { min: 1, max: 4 },
    elPlayOffs: { min: 5, max: 8 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  }, 
  // Turkish Super Lig
  "203": {
    clQualifiers: { min: 1, max: 2 },
    elQualifiers: { min: 3, max: 3 },
    ecQualifiers: { min: 4, max: 4 },
    relegation: { min: standingsLength - 3, max: standingsLength },
  },
  // Austrian Bundesliga
  "218": {
    championshipRound: { min: 1, max: 6 },
    relegationPlayOffs: { min: standingsLength - 5, max: standingsLength },
  }, 
  // Denmark Superliga
  "119": {
    championshipRound: { min: 1, max: 6 },
    relegationPlayOffs: { min: standingsLength - 5, max: standingsLength },
  }, 
  // Norway Eliteserien
  "103": {
    clQualifiers: { min: 1, max: 1 },
    ecQualifiers: { min: 2, max: 3 },
    relegationPlayOffs: { min: standingsLength - 2, max: standingsLength - 2 },
    relegation: { min: standingsLength - 1, max: standingsLength },
  }, 
  // English League One
  "41": {
    promotion: { min: 1, max: 2 },
    promotionPlayOff: { min: 3, max: 6 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  }, 
  // English League Two
  "42": {
    promotion: { min: 1, max: 2 },
    promotionPlayOff: { min: 3, max: 6 },
    relegation: { min: standingsLength - 2, max: standingsLength },
  }, 
});

const LeagueStandings = ({ leagueId, season, teamId }) => {
  const [standings, setStandings] = useState([]);
  const [leagueName, setLeagueName] = useState([]);
  const [legend, setLegend] = useState({});

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/standings?league=${leagueId}&season=${season}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`,
          },
        });

        const data = await response.json();
        if (data && data.response && data.response[0] && data.response[0].league && data.response[0].league.standings) {
          setStandings(data.response[0].league.standings[0]);
          setLeagueName(data.response[0].league.name)
        } else {
          console.error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    if (leagueId && season) {
      fetchStandings();
    }
  }, [leagueId, season]);

  useEffect(() => {
    if (teamId) {
      // Force a re-render when teamId changes
      setStandings([...standings]);
    }
  }, [teamId]);

  const shortenTeamName = (teamName) => {
    const nameParts = teamName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 3).toUpperCase();
    } else if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1].slice(0, 2)).toUpperCase();
    }
    return teamName.toUpperCase();
  };

  const getBorderClass = (leagueId, teamRank, standingsLength) => {
      const borders = leagueBorders(standingsLength)[leagueId];
      if (!borders) {
        return [];
      }
    
      for (const [border, range] of Object.entries(borders)) {
        if (teamRank >= range.min && teamRank <= range.max) {
          const borderColor = border === "clGroupStage" ?   "border-blue-600" :
                              border === "clQualifiers" ? "border-blue-300" :
                              border === "elGroupStage" ? "border-green-600" :
                              border === "elQualifiers" ? "border-green-300" :
                              border === "ecQualifiers" ? "border-purple-600" :
                              border === "elPlayOffs" ? "border-green-800" :
                              border === "promotion" ? "border-green-500" :
                              border === "promotionPlayOff" ? "border-blue-500" :
                              border === "championshipRound" ? "border-blue-500" :
                              border === "relegationPlayOffs" ? "border-orange-500" :
                              border === "relegation" ? "border-red-500" : "";
          return ['border-l-4', borderColor];
        }
      }
    
      return [];
    };

    const getFormEmoji = (form) => {
      if (!form) {
        return "";
      }
      
      if (form.slice(-5) === "WWWWW") {
        return "🔥";
      } else if (form.slice(-5) === "LLLLL") {
        return "❄️";
      }
      return "";
    };
     
    const getLegend = () => {
      const borders = leagueBorders(standings.length)[leagueId];
      if (!borders) {
        return null;
      }
    
      const borderDescriptions = {
        clGroupStage: "Champions League Group Stage",
        clQualifiers: "Champions League Qualifiers",
        elGroupStage: "Europa League Group Stage",
        elQualifiers: "Europa League Qualifiers",
        ecQualifiers: "Europa Conference League Qualifiers",
        elPlayOffs: "Europa League Play-Offs",
        promotion: "Promotion",
        promotionPlayOff: "Promotion Play-Off",
        championshipRound: "Championship Round",
        relegationPlayOffs: "Relegation Play-Offs",
        relegation: "Relegation",
      };
    
      const borderColor = {
        clGroupStage: "blue-600",
        clQualifiers: "blue-300",
        elGroupStage: "green-600",
        elQualifiers: "green-300",
        ecQualifiers: "purple-600",
        elPlayOffs: "green-300",
        promotion: "green-500",
        promotionPlayOff: "blue-500",
        championshipRound: "blue-500",
        relegationPlayOffs: "orange-500",
        relegation: "red-500",
      };
    
      return (
        <div className="mt-4">
          {Object.entries(borders).map(([border]) => (
            <p key={border}>
              <span className={clsx('inline-block w-4 h-4 mr-2', `border-l-4 border-${borderColor[border]}`)}></span>
              {borderDescriptions[border]}
            </p>
          ))}
        </div>
      );
    };
  
  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">{leagueName} Table</h1>
      <div className="overflow-x-auto mt-10">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-dark-2">
              <th className="py-2">#</th>
              <th className="py-2">Club</th>
              <th className="py-2">Pl</th>
              <th className="hidden sm:table-cell py-2">W</th>
              <th className="hidden sm:table-cell py-2">D</th>
              <th className="hidden sm:table-cell py-2">L</th>
              <th className="py-2">GD</th>
              <th className="py-2 font-extrabold">Pts</th>
              <th className="hidden sm:table-cell py-2">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
              key={index}
              className={clsx(index % 2 === 0 ? "bg-gray-900" : "bg-gray-800",
                team.team.id === parseInt(teamId) ? "bg-indigo-500" : "",
                getBorderClass(leagueId, team.rank, standings.length))}
              >
                <td className="py-2 text-center">{team.rank}</td>
                <td className="py-2 flex items-center justify-center">
                  <img src={team.team.logo} alt="team logo" className="w-6 h-6 mr-2" />
                  {shortenTeamName(team.team.name)}
                </td>
                <td className="py-2 text-center">{team.all.played}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.win}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.draw}</td>
                <td className="hidden sm:table-cell py-2 text-center">{team.all.lose}</td>
                <td className="py-2 text-center">{team.goalsDiff}</td>
                <td className="py-2 text-center font-extrabold">{team.points}</td>
                <td className="hidden sm:table-cell py-2 text-center relative">
                  {team.form &&
                    team.form.split("").map((result, i) => (
                      <span key={i} className={`inline-block w-4 h-4 mx-1 rounded-md ${result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"}`}
                      ></span>
                    ))}
                  <span className="absolute right-4">
                    {getFormEmoji(team.form)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {getLegend()}
    </div>
  );
};

export default LeagueStandings;
