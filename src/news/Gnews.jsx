import React, { useState, useEffect } from 'react';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const refreshInterval = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchArticles = () => {
      fetch('https://gnews.io/api/v4/search?q=(english premier league) OR (spanish la liga) OR (bundesliga) OR (french ligue 1) OR (italian serie a) OR (Eredivisie) OR (scottish premier league) OR (bbc football news) OR (Fabrizio Romano)&lang=en&country=uk&from=2023-05-01T12:30:45Z&max=10&apikey=c50b574d9d568f7dd4d7a2f1942544ef')
        .then(response => response.json())
        .then(data => {
          const uniqueArticles = data.articles.reduce((unique, article) => {
            if (!unique.some(item => item.title === article.title)) {
              unique.push(article);
            }
            return unique;
          }, []);

          setArticles(uniqueArticles);
        })
        .catch(console.error);
    };

    fetchArticles();

    const intervalId = setInterval(fetchArticles, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  if (!articles) return <p>Loading...</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {articles.map((article, index) => (
          <div key={index} className='flex flex-col items-center bg-gray-900 p-4 rounded shadow'>
            <img src={article.image} alt={article.title} className="w-full max-w-lg h-64 object-cover rounded-md mt-4" />
            <h2 className='text-1xl font-bold text-white text-center mt-4'>{article.title}</h2>
            <p className='mt-4 text-center'>{article.description}</p>
            <p className='mt-4 text-center'>- {article.source.name}</p>
            <a className='text-white bg-blue-500 px-4 py-2 rounded-md mt-6' href={article.url} target="_blank">Read more</a>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NewsComponent;
