import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import {
  Header,
  SearchBtn,
  SearchForm,
  SearchInput,
} from '../SearchBar/SearchBar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header className="Searchbar">
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <FaSearch style={{ height: '20px', width: '30px' }} />
        </SearchBtn>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
