import { useEffect, useState } from 'react';
import apis from '../api/url';
import { getService } from '../services/httpServices';
import CardItem from '../components/CardItem';
import LogoutButton from '../components/LogoutButton';
import { Navigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { BounceLoader } from 'react-spinners';

const CardsPage = () => {
  const [allData, setAllData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllData() {
    try {
      setIsLoading(true);
      const { data } = await getService(apis.DB_DETAILS);
      setAllData(data.body);
      setDisplayData(data.body);
      console.log('Display Data', data.body);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  if (!localStorage.getItem('TEST-TOKEN')) return <Navigate to="/login" />;

  return (
    <>
      <HomeButton />
      <LogoutButton />
      <h1 className="cardpage-header">Cards Page</h1>
      <div className="flex-between">
        {displayData
          ? displayData.map((disdata: any, idx: number) => (
              <CardItem key={idx} cardData={disdata} />
            ))
          : null}
      </div>
      <div className="centered">
        <BounceLoader
          aria-label="Loading..."
          color="green"
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default CardsPage;
