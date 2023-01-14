import { useEffect, useState } from 'react';
import apis from '../api/url';
import { Button, Table } from 'reactstrap';
import { getService } from '../services/httpServices';
import CardItem from '../components/CardItem';

const CardsPage = () => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);

  async function getAllData() {
    try {
      const { data } = await getService(apis.DB_DETAILS);
      setAllData(data.body);
      setDisplayData(data.body);
      console.log('Display Data', data.body);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <h1 className="cardpage-header">Cards Page</h1>
      <div className="flex-between">
        {displayData ? (
          displayData.map((disdata: any, idx: number) => (
            <CardItem key={idx} cardData={disdata} />
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </>
  );
};

export default CardsPage;
