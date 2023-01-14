// import Upload from '../components/Upload';
import { Navigate } from 'react-router-dom';
import UploadFile from '../components/UploadFile';

function Home() {
  if (!localStorage.getItem('TEST-TOKEN')) return <Navigate to="/login" />;

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Extract Invoice Data</h3>
      <UploadFile />
    </>
  );
}

export default Home;
