import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../store/articlesSlice';
import Article from '../components/Article';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import { RootState, AppDispatch } from '../store/store';
import '../styles/main.scss'

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles, status } = useSelector((state: RootState) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');
  const articlesPerPage = 5;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);


  const filteredArticles = articles.filter(article => {
    return (selectedCategory ? article.category === selectedCategory : true) &&
           (selectedAuthor ? article.author === selectedAuthor : true);
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortOption === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortOption === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
    if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const displayedArticles = sortedArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  return (
    <div className="home-page">
      <Filter
        categories={[...new Set(articles.map(article => article.category))]}
        authors={[...new Set(articles.map(article => article.author))]}
        selectedCategory={selectedCategory}
        selectedAuthor={selectedAuthor}
        onCategoryChange={setSelectedCategory}
        onAuthorChange={setSelectedAuthor}
      />
      <Sort onSortChange={setSortOption} />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {displayedArticles.length > 0 ? (
            displayedArticles.map((article) => (
              <Article key={article.url} {...article} />
            ))
          ) : (
            <p>No result found for Selection</p>
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
