import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import contentfulClient from '../utilities/contentfulClient';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await contentfulClient.getEntry(id);
      setArticle(response);
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const { title, body, publishedDate, image } = article.fields;

  return (
    <div>
      <img src={image.fields.file.url} alt={title} width="800px"/>
      <h1>{title}</h1>
      <p>{body}</p>
      <p>{publishedDate}</p>
    </div>
  );
};

export default ArticlePage;
