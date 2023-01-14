import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const HomeButton = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    if (localStorage.getItem('TEST-TOKEN')) navigate('/home');
  };
  return (
    <Button color="secondary" onClick={handleHome} className="home-btn">
      Home
    </Button>
  );
};

export default HomeButton;
