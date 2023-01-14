import React, { ChangeEvent, useState } from 'react';
import { Button } from 'reactstrap';

interface SearchProps {
  allData: any[];
  setDisplayData: React.Dispatch<React.SetStateAction<any>>;
}

const SearchBar = (props: SearchProps) => {
  const { allData, setDisplayData } = props;
  const [searchText, setSearchText] = useState<string>('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const sterm = e.target.value;

    if (!sterm) setDisplayData(allData);
  };

  const searchHandler = () => {
    console.log('AllData', allData);
    let modAllData: any[] = [];
    for (let i = 0; i < allData.length; i++) {
      Object.keys(allData[i]).forEach((key) => {
        // console.log(allData[i][key].toLowerCase());
        if (allData[i][key].includes(searchText) && !key.includes('table_')) {
          modAllData.push(allData[i]);
        }
      });
    }

    console.log('Mod All Data', modAllData);
    setDisplayData(modAllData);
    modAllData = [];
  };
  return (
    <div>
      <div className="Search-container">
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={changeHandler}
          className="search-input-box"
        />
        <Button color="secondary" onClick={searchHandler}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
