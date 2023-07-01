import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const TransferNews = () => {
  return (
    <div className='w-[90vw]'>
      <h1 className="text-3xl flex flex-col font-bold text-white text-center my-10">
        Transfer News
      </h1>
      <div className="twitter-feed grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <div className='bg-gray-900 p-12 rounded twitter-feed shadow flex flex-col items-center'>
          <h1 className="text-3xl flex flex-col font-bold text-white text-center my-10">
            Fabrizio Romano's Twitter Feed
          </h1>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="FabrizioRomano"
            options={{ width: 275, height: 500 }}
            noFooter
          />
        </div>
        <div className='bg-gray-900 p-12 rounded twitter-feed shadow flex flex-col items-center'>
          <h1 className="text-3xl flex flex-col font-bold text-white text-center my-10">
            David Ornstein's Twitter Feed
          </h1>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="David_Ornstein"
            options={{ width: 275, height: 500 }}
            noFooter
          />
        </div>
        <div className='bg-gray-900 p-12 rounded twitter-feed shadow flex flex-col items-center'>
          <h1 className="text-3xl flex flex-col font-bold text-white text-center my-10">
            Transer News Central's Twitter Feed
          </h1>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="TransferNewsCen"
            options={{ width: 275, height: 500 }}
            noFooter
          />
        </div>
      </div>
    </div>
  )
}

export default TransferNews