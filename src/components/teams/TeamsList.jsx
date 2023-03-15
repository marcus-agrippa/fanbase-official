import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner";
import TeamItem from "./TeamItem";

const TeamsList = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeams()
  }, []);

  const fetchTeams = async () => {
    const response = await fetch(`https://v3.football.api-sports.io/teams?league=179&season=2022`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_FOOTBALL_API_TOKEN}`
      }
    })

    const data = await response.json();
    console.log(data.response)
    setTeams(data.response)
    setLoading(false)
  }

  if(!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {teams.map((team) => (
          <TeamItem key={team.team.id} team={team.team} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }

  
}

export default TeamsList