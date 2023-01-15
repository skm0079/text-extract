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

  // Removes Object key without mutation
  const removeKey = (key: string, { [key]: _, ...rest }) => rest;

  const searchHandler = () => {
    if (!searchText) return;
    console.log('AllData Start', allData);
    let modAllData: any[] = [];

    const allDataCopy = allData.map((data: any) => data);

    // Deletes Table key
    const filterAllData = allDataCopy.map((data: any) => {
      const keyset: any[] = [];
      Object.keys(data).forEach((key) => {
        keyset.push(key);
      });

      const tableKey = keyset.find((key: string) => key.includes('table_'));
      // delete data[tableKey];
      const mutData = removeKey(tableKey, data);
      return mutData;
    });

    for (let i = 0; i < filterAllData.length; i++) {
      Object.keys(filterAllData[i]).forEach((key) => {
        if (filterAllData[i][key].toLowerCase().includes(searchText)) {
          const res = modAllData.find(
            (data: any) => data['id'] === filterAllData[i]['id']
          );
          if (!res) modAllData.push(filterAllData[i]['id']);
        }
      });
    }

    const finalDisplayData: any[] = [];
    allData.forEach((data: any) => {
      for (let i = 0; i < modAllData.length; i++) {
        if (modAllData[i] === data['id']) finalDisplayData.push(data);
      }
    });

    console.log('Mod All Data', modAllData);
    console.log('finalDisplayData', finalDisplayData);
    setDisplayData(finalDisplayData);
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
