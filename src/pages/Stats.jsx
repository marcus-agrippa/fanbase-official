import React from 'react'
import TopGoalscorers from '../components/stats/TopGoalscorers';

const Stats = () => {
  const leagueId = 123; // Replace with the actual league ID
  const season = 2022; // Replace with the actual season

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold text-center my-4">League Stats</h1>
      <TopGoalscorers leagueId={leagueId} season={season} />
      {/* <TopAssists />
      <MostShots />
      <MostCrosses />
      <MostPasses /> */}
    </div>
  )
}

export default Stats