import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap';
import DisplayItem from './DisplayItem';

import './upload.css';

interface IProps {}

interface IState {
  confirmation: string;
  isLoading: string;
  files: any;
  Invoice: string;
  Amount: string;
  InvoiceDate: string;
  Vendor: string;
  Description: string;
  name: string;
}

class Upload extends Component<IProps, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      confirmation: '',
      isLoading: '',
      files: '',
      Invoice: '',
      Amount: '',
      InvoiceDate: '',
      Vendor: '',
      Description: '',
      name: '',
    };

    this.handleChane = this.handleChane.bind(this);
  }

  handleChane(event: { preventDefault: () => void; target: any }) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ name: value });
  }

  async handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    this.setState({ confirmation: 'Uploading...' });
  }

  async getFiles(files: any) {
    console.log('Logging Files--------');

    console.log(files);
    this.setState({
      isLoading: 'Extracting data',
      files: files,
    });

    const UID = Math.round(1 + Math.random() * (1000000 - 1));

    const data = {
      fileName: files[0]?.name,
      fileExt: 'png',
      imageID: UID,
      folder: UID,
      img: files[0].base64,
    };

    this.setState({ confirmation: 'Processing...' });
    const res = await fetch(
      'https://pwlrz8v3x4.execute-api.us-east-1.amazonaws.com/Production',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application.json',
        },
        body: JSON.stringify(data),
      }
    );
    console.log(res);
    this.setState({ confirmation: 'Uploaded' });

    let targetImage = files[0]?.name;
    const response = await fetch(
      'https://pwlrz8v3x4.execute-api.us-east-1.amazonaws.com/Production/ocr',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application.json',
        },
        // body: JSON.stringify(targetImage),
        body: JSON.stringify({
          file: targetImage,
        }),
      }
    );
    this.setState({ confirmation: '' });

    const OCRBody = await response.json();
    console.log('OCRBody', OCRBody);
  }
  handleBigNext = () => {
    window.location.href = '/cards';
  };
  render() {
    const processing = this.state.confirmation;
    return (
      <div className="row">
        <div className="col-6 offset-3">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <h3 className="text-danger">{processing}</h3>
              <h6>Upload Invoice</h6>
              <FormText color="muted">PNG,JPG</FormText>

              <div className="form-group files color">
                <FileBase64 onDone={this.getFiles.bind(this)}></FileBase64>
              </div>
            </FormGroup>
            <Button id="big-next-btn" onClick={this.handleBigNext}>
              Next
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Upload;
