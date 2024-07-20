import React from 'react';
import '../styles/main.scss'

interface SortProps {
  onSortChange: (sortOption: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  return (
    <div className="sort">
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="date-desc">Date: Latest to Earliest</option>
        <option value="date-asc">Date: Earliest to Latest</option>
        <option value="title-asc">Title: A to Z</option>
        <option value="title-desc">Title: Z to A</option>
      </select>
    </div>
  );
};

export default Sort;
