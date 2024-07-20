import React from 'react';
import '../styles/main.scss'

interface ArticleProps {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

const removePTags = (htmlString: string) => {
  return htmlString.replace(/<\/?p>/g, '');
};

const Article: React.FC<ArticleProps> = ({ title, url, image, date, body, source, author }) => {
  const cleanedBody = removePTags(body);

  return (
    <div className="article">
      <img src={image || 'placeholder.jpg'} alt={title} />
      <div className="article-content">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: cleanedBody }} />
        <p><strong>{source}</strong> - {author}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
};

export default Article;
