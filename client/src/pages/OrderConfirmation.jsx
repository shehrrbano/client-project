import { useParams, useLocation, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HiOutlineCheckCircle, HiOutlineClipboardList } from 'react-icons/hi';

const pop = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
`;

const Page = styled.div`
  max-width: 640px; margin: 0 auto;
  padding: 48px 24px; text-align: center;
`;
const Icon = styled.div`
  animation: ${pop} 0.6s ease forwards;
  svg { font-size: 5rem; color: #4CAF50; }
  margin-bottom: 24px;
`;
const Title = styled.h1`font-size: 2rem; font-weight: 700; margin-bottom: 8px;`;
const Subtitle = styled.p`color: #A0A0A0; font-size: 1.05rem; margin-bottom: 32px;`;
const Card = styled.div`
  background: #2B2B2B; border: 1px solid #3A3A3A;
  border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left;
`;
const Row = styled.div`
  display: flex; justify-content: space-between; padding: 8px 0;
  font-size: 0.95rem; color: #A0A0A0;
  span:last-child { color: #F0F0F0; font-weight: 500; }
  &:not(:last-child) { border-bottom: 1px solid rgba(58,58,58,0.3); }
`;
const TotalRow = styled(Row)`
  font-size: 1.1rem; font-weight: 700; color: #F0F0F0;
  border-top: 1px solid #3A3A3A; padding-top: 12px; margin-top: 4px;
  span:last-child { color: #D4A843; }
`;
const Btns = styled.div`display:flex;gap:16px;justify-content:center;flex-wrap:wrap;`;
const Btn = styled(Link)`
  display:inline-flex;align-items:center;gap:8px;padding:12px 28px;
  border-radius:9999px;font-weight:600;transition:all 0.15s ease;
  background:${({ $p }) => ($p ? '#D4A843' : '#3A3A3A')};
  color:${({ $p }) => ($p ? '#1E1E1E' : '#F0F0F0')};
  &:hover{transform:translateY(-2px);}
`;

const OrderConfirmation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order;
  return (
    <Page>
      <Icon><HiOutlineCheckCircle /></Icon>
      <Title>Order Placed!</Title>
      <Subtitle>Thank you! Your order has been successfully placed.</Subtitle>
      {order && (
        <Card>
          <Row><span>Order Number</span><span>{order.orderNumber}</span></Row>
          <Row><span>Type</span><span style={{ textTransform: 'capitalize' }}>{order.orderType}</span></Row>
          <Row><span>Payment</span><span style={{ textTransform: 'capitalize' }}>{order.paymentMethod}</span></Row>
          <Row><span>Status</span><span style={{ color: '#D4A843', textTransform: 'capitalize' }}>{order.status}</span></Row>
          {order.items?.map((item, i) => (
            <Row key={i}><span>{item.quantity}x {item.name}</span><span>£{(item.price * item.quantity).toFixed(2)}</span></Row>
          ))}
          <TotalRow><span>Total</span><span>£{order.total?.toFixed(2)}</span></TotalRow>
        </Card>
      )}
      <Btns>
        <Btn to="/menu">Order More</Btn>
      </Btns>
    </Page>
  );
};

export default OrderConfirmation;
