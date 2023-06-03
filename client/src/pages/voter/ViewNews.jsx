import axios from 'axios';
import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav';

export const ViewNews = () => {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get('http://localhost:4000/allnews');
      if (res.data.status === 'success') {
        setAllNews(res.data.news);
      }
    };
    getNews();
  }, []);

  return (
    <div className="view-news">
      <Nav page="view news" />
      <div className="view-news-main">
        {allNews.map((news) => {
          return (
            <div className="view-news-main-row">
              <h2>{news.title}</h2>
              <p>{news.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
