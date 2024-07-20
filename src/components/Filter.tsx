import React from 'react';
import '../styles/main.scss'

interface FilterProps {
  categories: string[];
  authors: string[];
  selectedCategory: string;
  selectedAuthor: string;
  onCategoryChange: (category: string) => void;
  onAuthorChange: (author: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, authors, selectedCategory, selectedAuthor, onCategoryChange, onAuthorChange }) => {
  return (
    <div className="filter">
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select value={selectedAuthor} onChange={(e) => onAuthorChange(e.target.value)}>
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
