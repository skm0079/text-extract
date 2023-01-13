import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTables } from '../services/utils';
const DetailsPage = () => {
  const [details, setDetails] = useState<any | undefined>();
  const [tables, setTables] = useState<any | undefined>();

  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      console.log('stateeee', state);

      console.log('getAllTables', getAllTables(state));
      const data = getAllTables(state.table);
      if (data) setTables(data);
    }
  }, []);

  return <div>{tables && console.log(tables)}</div>;
};

export default DetailsPage;
