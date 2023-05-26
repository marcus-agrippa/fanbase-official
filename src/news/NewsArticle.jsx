import React, { useState, useEffect } from 'react';
import { getTagName } from '../utilities/contentfulClient';
import { Link } from 'react-router-dom';

const NewsArticle = ({ post }) => {
  const [tagNames, setTagNames] = useState([]);

  useEffect(() => {
    if (post && post.metadata && post.metadata.tags) {
      const fetchTagNames = async () => {
        const names = await Promise.all(post.metadata.tags.map(tag => getTagName(tag.sys.id)));
        setTagNames(names);
      };

      fetchTagNames();
    }
  }, [post]);

  if (!post || !post.fields) {
    return null;
  }

  const { title, bodyText, publishedDate, image } = post.fields;

  return (
    <div className="bg-dark-1 text-white p-4 rounded-lg">
      <img src={image?.fields?.file?.url} alt={title} className='rounded-md' />
      <Link to={`/article/${post.sys.id}`} className='text-2xl font-bold text-center my-4'>{title}</Link>
      {tagNames.length > 0 && (
        <ul>
          {tagNames.map((tagName, index) => (
            <li key={index} className='text-sm px-2 py-1 inline-block bg-accent hover:bg-primary my-3'><a href="">{tagName}</a></li>
          ))}
        </ul>
      )}
      <p>{publishedDate}</p>
    </div>
  );
};

export default NewsArticle;


