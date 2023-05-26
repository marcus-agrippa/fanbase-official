import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const TeamTwitter = ({ twitterHandle }) => {
  if (!twitterHandle) {
    return <div>Please select a club to display its Twitter feed</div>;
  }

  return (
    <div className="twitter-feed flex flex-col">
      <h1 className="text-3xl font-bold text-white text-center my-10">
        {twitterHandle}'s Twitter Feed
      </h1>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={twitterHandle}
        options={{ width: 275, height: 500 }}
        noFooter
      />
    </div>
  );
};

export default TeamTwitter;
