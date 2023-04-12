import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://newsapi.org/v2';

const TeamNews = ({ teamName }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${teamName} football club news&topic=sports&sortBy=publishedAt&language=en&apiKey=${process.env.REACT_APP_GOOGLE_NEWS_API_TOKEN}&pageSize=10&domains=goal.com,espn.com,bbc.co.uk/sport,skysports.com`
        );        

        const data = await response.json();
        const uniqueHeadlines = new Set(); // Initialize a Set to keep track of unique headlines
        const filteredArticles = data.articles.filter((article) => {
          if (!uniqueHeadlines.has(article.title)) {
            uniqueHeadlines.add(article.title);
            return true;
          }
          return false;
        });

        setNews(filteredArticles);
      } catch (error) {
        console.error('Error fetching team news:', error);
      }
    };

    if (teamName) {
      fetchNews();
    }
  }, [teamName]);

  if (!news) {
    return <p>Loading news...</p>;
  }

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <h1 className='text-3xl font-bold text-center my-4'>Latest Team News</h1>
      <ul className="space-y-2">
        {news.map((article, index) => (
          <li key={index} className="bg-dark-1 p-4 rounded-lg">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              - '{article.title}' via <span className='text-secondary'>{article.source.name}</span>

            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamNews;

