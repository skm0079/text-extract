import React, { ChangeEvent, useState } from 'react';
import { Button } from 'reactstrap';
import DropDown from './DropDown';

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
    if (!searchText) return;
    console.log('AllData', allData);
    let modAllData: any[] = [];

    const filterAllData = allData.map((data: any) => {
      const keyset: any[] = [];
      Object.keys(data).forEach((key) => {
        keyset.push(key);
      });

      const tableKey = keyset.find((key: string) => key.includes('table_'));
      delete data[tableKey];
      return data;
    });

    for (let i = 0; i < filterAllData.length; i++) {
      Object.keys(filterAllData[i]).forEach((key) => {
        if (filterAllData[i][key].toLowerCase().includes(searchText)) {
          const res = modAllData.find(
            (data: any) => data['id'] === filterAllData[i]['id']
          );
          if (!res) modAllData.push(filterAllData[i]);
        }
      });
    }

    console.log('Mod All Data', modAllData);
    setDisplayData(modAllData);
    modAllData = [];
  };
  return (
    <div className="d-flex align-content-center">
      <div style={{ marginTop: '10px', marginLeft: '10px' }}>
        <DropDown />
      </div>
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
