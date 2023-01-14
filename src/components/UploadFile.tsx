import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap';
import HomeButton from './HomeButton';
import LogoImage from './LogoImage';
import LogoutButton from './LogoutButton';

import './upload.css';

const PDFJS = window.pdfjsLib;

const UploadFile = () => {
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [files, setFiles] = useState();
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setConfirmation('Uploading...');
  };
  const handleBigNext = () => {
    navigate('/cards');
  };
  const getFiles = async (files: any) => {
    console.log('Logging Files--------', files);
    try {
      setIsLoading(true);
      setConfirmation('Extracting Data...');
      console.log(files);
      // setFiles(files);
      const UID = Math.round(1 + Math.random() * (1000000 - 1));

      setConfirmation('Processing...');

      // S3 Target File
      let targetImage = files.name;

      if (files.type === 'image/jpeg' || files.type === 'image/png') {
        const data = {
          fileName: files?.name,
          fileExt: 'png',
          imageID: UID,
          folder: UID,
          img: files.base64,
        };

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
        // console.log('RAW', data);

        console.log(res);
        setConfirmation('Uploaded Image');
      }
      if (files.type === 'application/pdf') {
        console.log('SELECTED A PDF');
        // Handle pdf to img
        const file = files.file;
        const uri = URL.createObjectURL(file);
        var pdf = await PDFJS.getDocument({ url: uri });

        const canvas = document.createElement('canvas');
        canvas.setAttribute('className', 'canv');

        var page = await pdf.getPage(1);
        var viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var render_context = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport,
        };
        await page.render(render_context).promise;
        const image = canvas.toDataURL('image/png');
        // console.log('Convert', image);
        // done

        const data = {
          fileName: files.name.replace('.pdf', '.png'),
          fileExt: 'png',
          imageID: UID,
          folder: UID,
          img: image,
        };

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
        setConfirmation('Uploaded PDF');

        targetImage = files.name.replace('.pdf', '.png');
      }

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
      setConfirmation('Finished');
      const OCRBody = await response.json();
      console.log('OCRBody', OCRBody);

      if (OCRBody.statusCode === 200) {
        navigate('/cards');
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LogoImage />
      <HomeButton />

      <LogoutButton />
      <div className="row" style={{ marginTop: '6em' }}>
        <div className="col-6 offset-3">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <h3 className="text-danger">{confirmation}</h3>
              <h6>Upload Invoice</h6>
              <FormText color="muted">PDF,PNG,JPG</FormText>

              <div className="form-group files color">
                <FileBase64 onDone={getFiles}></FileBase64>
              </div>
            </FormGroup>
            <Button
              id="big-next-btn"
              disabled={isLoading}
              onClick={handleBigNext}
            >
              {!confirmation || confirmation === 'Finished'
                ? 'Next'
                : confirmation}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
