import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

interface ModalProps {
  buttonLabel: string;
  modalData: any;
}

const ModalDisplay = (props: ModalProps) => {
  const [modal, setModal] = useState(false);
  const { modalData } = props;
  const toggle = () => {
    setModal((prev) => !prev);
  };

  return (
    <div>
      <Button color="success" onClick={toggle} className="modal-button">
        {props.buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Processed Data</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr style={{ fontSize: '25px' }}>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(modalData).map((key) => (
                <tr key={key}>
                  <td style={{ fontWeight: 'bolder' }}>{key}</td>
                  <td>{modalData[key]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalDisplay;
