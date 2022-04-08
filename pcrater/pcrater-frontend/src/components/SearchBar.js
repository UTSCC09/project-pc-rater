//credits: 
// Search Bar functionality: https://www.youtube.com/watch?v=x7niho285qs */

import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setSearchWord, placeholder, data, attributeToSearchFor }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    setSearchWord(searchWord);
    const newFilter = data.filter((value) => {
      return value[attributeToSearchFor].toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearchResultClick = (newCode) => {
    setWordEntered(newCode);
    setSearchWord(newCode);
    setFilteredData([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a onClick={() => handleSearchResultClick(value[attributeToSearchFor])} className="dataItem">
                <p>{value[attributeToSearchFor]} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;