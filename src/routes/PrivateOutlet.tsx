import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apis from '../api/url';
import { getServiceWithTokenParams } from '../services/httpServices';
import AllRoutes from './Routes';

function PrivateOutlet() {
  const [redirectPage, setRedirectPage] = useState('');

  const getUserDetails = async () => {
    const { status, data } = await getServiceWithTokenParams(
      apis.USER_DETAILS,
      {}
    );

    if (status) {
      console.log(data.data);
      setRedirectPage('Home');
    } else {
      localStorage.removeItem('access-token');
      setRedirectPage('LOGIN');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      getUserDetails();
    } else {
      setRedirectPage('LOGIN');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {redirectPage === 'LOGIN' && <Navigate to="/login" />}
      {redirectPage === 'Home' && <AllRoutes />}
    </div>
  );
}

export default PrivateOutlet;
