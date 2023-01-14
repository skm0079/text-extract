import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('TEST-TOKEN');
    navigate('/');
  };
  return (
    <Button color="danger" onClick={handleLogout} className="logout-btn">
      Logout
    </Button>
  );
};

export default LogoutButton;
