import { useEffect, useState } from 'react';
import apis from '../api/url';
import { getService } from '../services/httpServices';
import CardItem from '../components/CardItem';
import LogoutButton from '../components/LogoutButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { Button } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import LogoImage from '../components/LogoImage';

const CardsPage = () => {
  const navigate = useNavigate();

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

  const handleBigNext = () => {
    navigate('/home');
  };

  if (!localStorage.getItem('TEST-TOKEN')) return <Navigate to="/login" />;

  return (
    <>
      <LogoImage />
      <LogoutButton />
      <div className="row" style={{ marginTop: '5em' }}>
        <div className="col flex-between">
          <Button
            onClick={handleBigNext}
            color="warning"
            className="add-invoice-btn"
          >
            Add Invoice
          </Button>
          <SearchBar allData={allData} setDisplayData={setDisplayData} />
        </div>
      </div>

      <h1 className="cardpage-header">View Invoices List</h1>
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
