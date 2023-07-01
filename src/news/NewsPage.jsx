import React, { useState, useEffect, useContext } from 'react';
import SelectedTeamContext from '../context/SelectedTeamContext';
import NewsArticle from './NewsArticle';
import Gnews from './Gnews';
// import BlogPost from './BlogPost';
import contentfulClient from '../utilities/contentfulClient';

const NewsPage = () => {
  const { selectedLeague, selectedTeam } = useContext(SelectedTeamContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchContentfulData = async () => {
      const response = await contentfulClient.getEntries({
        content_type: 'article',
      });
  
      setArticles(response.items);
    };
  
    fetchContentfulData();
  }, [selectedLeague]);
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center my-10">Football News</h1>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Gnews />
      </div>
    </div>

  );
};

export default NewsPage;
