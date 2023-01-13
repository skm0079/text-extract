import { useEffect, useState } from 'react';
import apis from '../api/url';
import { Table } from 'reactstrap';
import { getService } from '../services/httpServices';
import ModalDisplay from './ModalDisplay';

const DisplayItem = () => {
  const [allData, setAllData] = useState<any>([]);
  const [diaplayData, setDisplayData] = useState<any>([]);

  async function getAllData() {
    try {
      const { data } = await getService(apis.DB_DETAILS);
      setAllData(data.body);
      setDisplayData(data.body);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

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
                <ModalDisplay buttonLabel="View" modalData={file} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayItem;
