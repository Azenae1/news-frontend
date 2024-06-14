import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = () => {
  return (
    <div className="searchbar">
      <form className="searchbar__form">
        <input
          type="search"
          className="searchbar__input"
          placeholder="Enter topic"
        />

        <button className="searchbar__button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
