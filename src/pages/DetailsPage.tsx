import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import { getAllTables } from '../services/utils';
const DetailsPage = () => {
  const [table, setTable] = useState<any>();

  const { state } = useLocation();
  useEffect(() => {
    console.log('Loc State', state);
    Object.keys(state).forEach((key) => {
      if (key.includes('table_')) {
        setTable(state[key]);
      }
    });
  }, []);

  return (
    <>
      <div>
        {state ? (
          <Table responsive hover bordered striped>
            <thead>
              <tr>
                <th>Invoice Date</th>
                <th>Invoice Number</th>
                <th>Due Date</th>
                <th>Beneficiary Name</th>
                <th>Beneficiary Account Number</th>
                <th>Bank Name and Address</th>
                <th>Bank Swift Code</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{state['Invoice Date:']}</th>
                <td>{state['Invoice Number:']}</td>
                <td>{state['Due Date:']}</td>
                <td>{state['Beneficiary Name:']}</td>
                <td>{state['Beneficiary Account Number:']}</td>
                <td>{state['Bank Name and Address:']}</td>
                <td>{state['Bank Swift Code:']}</td>
                <td>{state['Total']}</td>
              </tr>
            </tbody>
          </Table>
        ) : null}
      </div>

      <div>
        <Table responsive hover bordered striped>
          {table
            ? table.map((rowArr: any, idx: number) => {
                if (idx === 0) {
                  return (
                    <thead key={idx}>
                      <tr>
                        {rowArr.map((ra: any) => (
                          <th key={ra}>{ra}</th>
                        ))}
                      </tr>
                    </thead>
                  );
                }
                return (
                  <tbody key={idx}>
                    <tr>
                      {rowArr.map((ra: any, i: number) => (
                        <td key={i}>{ra}</td>
                      ))}
                    </tr>
                  </tbody>
                );
              })
            : null}
        </Table>
      </div>
    </>
  );
};

export default DetailsPage;
