import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const HomeButton = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    if (localStorage.getItem('TEST-TOKEN')) navigate('/cards');
  };
  return (
    <Button color="primary" onClick={handleHome} className="home-btn">
      Home
    </Button>
  );
};

export default HomeButton;
