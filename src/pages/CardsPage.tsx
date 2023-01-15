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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      // console.log('Display Data', data.body);
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

      <div className="row">
        <div className="col flex-end">
          <Button
            onClick={handleBigNext}
            color="success"
            className="add-invoice-btn"
          >
            <div className="flex-between">
              <FontAwesomeIcon icon={faPlus} />
              Add Invoice
            </div>
          </Button>
        </div>
      </div>
      <div className="row" style={{ marginTop: '1em' }}>
        <div className="col-lg-2">
          <h2 className="cardpage-header">Invoices</h2>
        </div>
        <div
          className="col-lg-10"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            textAlign: 'center',
          }}
        >
          <SearchBar allData={allData} setDisplayData={setDisplayData} />
        </div>
      </div>

      <div className="cardpage-invoice-item-container">
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
