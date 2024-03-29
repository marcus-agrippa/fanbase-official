import React from 'react'

const About = () => {
  return (
    <div className='p-10'>
      <h1 className='text-2xl mb-4 md:text-5xl text-white'>ClubFanBase</h1>
      <p className='mb-4 text-lg font-light md:text-2xl'>An app to help you track all fixtures, results, standings, data, news and social media related to your favourite football club.<br></br> This app is in constant development and may have errors or inconsistencies, which will be improved over time.<br></br> It was made by a football fan for football fans, so if you have any suggestions please get in contact via twitter below.</p>
      <p className='text-lg text-gray-400'>Version <span className='text-white'>1.0.0</span></p>
      <p className='text-lg text-gray-400'>Created by <span className='text-white'><a href="https://github.com/marcus-agrippa">@marcus-agrippa</a></span></p>
      <p className='text-lg text-gray-400'>Twitter <span className='text-white'><a href="https://twitter.com/club_fanbase">@club_fanbase</a></span></p>
    </div>
  )
}

export default About