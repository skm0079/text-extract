import { useEffect, useState } from 'react';
import apis from '../api/url';
import { Button, Table } from 'reactstrap';
import { getService } from '../services/httpServices';
import { useNavigate } from 'react-router-dom';

const DisplayItem = () => {
  const navigate = useNavigate();

  const [allData, setAllData] = useState<any>([]);
  const [diaplayData, setDisplayData] = useState<any>([]);

  async function getAllData() {
    try {
      const { data } = await getService(apis.DB_DETAILS);
      setAllData(data.body);
      setDisplayData(data.body);
      console.log('Display Data', data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  const handleViewNavigate = () => {
    navigate('/details', {
      state: allData,
    });
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>File Name</th>
            <th>Date</th>
            <th>Processed Data</th>
          </tr>
        </thead>
        <tbody>
          {diaplayData.map((file: any) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>{file.fileName}</td>
              <td>{file.datetime}</td>
              <td className="flex-center">
                <Button onClick={handleViewNavigate}>View</Button>
                {/* <ModalDisplay buttonLabel="View" modalData={allData} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayItem;
