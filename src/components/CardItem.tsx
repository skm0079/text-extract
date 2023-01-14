import { useNavigate } from 'react-router-dom';
import { CardTitle, CardText, Button, Card } from 'reactstrap';

interface Props {
  cardData: any;
}

const CardItem = (props: Props) => {
  const navigate = useNavigate();

  const { cardData } = props;
  return (
    <Card
      body
      className="text-center"
      style={{
        width: '18rem',
      }}
    >
      <CardTitle tag="h5">{cardData.fileName}</CardTitle>
      <CardText>{cardData.datetime}</CardText>
      <Button
        color="primary"
        onClick={() => navigate('/card-data', { state: cardData })}
      >
        View
      </Button>
    </Card>
  );
};

export default CardItem;
