import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import API from '../api';
import Loader from '../components/Loader';

const Page = styled.div`max-width:720px;margin:0 auto;padding:32px 24px;`;
const Title = styled.h1`font-size:clamp(1.8rem,4vw,2.4rem);font-weight:700;margin-bottom:8px;span{color:#D4A843;}`;
const Sub = styled.p`color:#A0A0A0;margin-bottom:32px;`;
const SearchWrap = styled.div`
  display:flex;gap:8px;background:#2B2B2B;border:1px solid #3A3A3A;
  border-radius:9999px;padding:12px 20px;margin-bottom:32px;
  &:focus-within{border-color:#D4A843;}
  svg{color:#707070;font-size:1.2rem;flex-shrink:0;}
  input{flex:1;background:transparent;color:#F0F0F0;font-size:0.95rem;border:none;outline:none;
    &::placeholder{color:#707070;}}
`;
const Btn = styled.button`
  background:#D4A843;color:#1E1E1E;padding:10px 24px;border-radius:9999px;
  font-weight:600;font-size:0.9rem;transition:all 0.15s ease;
  &:hover{background:#C49A35;transform:translateY(-1px);}
`;
const Card = styled.div`background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;padding:24px;`;
const Row = styled.div`
  display:flex;justify-content:space-between;padding:10px 0;font-size:0.95rem;
  color:#A0A0A0;span:last-child{color:#F0F0F0;font-weight:500;}
  &:not(:last-child){border-bottom:1px solid rgba(58,58,58,0.4);}
`;
const StatusBadge = styled.span`
  display:inline-block;padding:4px 14px;border-radius:9999px;font-size:0.8rem;font-weight:600;
  text-transform:capitalize;
  background:${({ $s }) => $s === 'delivered' ? 'rgba(76,175,80,0.15)' : $s === 'cancelled' ? 'rgba(231,76,60,0.15)' : 'rgba(212,168,67,0.15)'};
  color:${({ $s }) => $s === 'delivered' ? '#4CAF50' : $s === 'cancelled' ? '#E74C3C' : '#D4A843'};
`;
const Timeline = styled.div`display:flex;flex-direction:column;gap:0;margin-top:24px;`;
const Step = styled.div`
  display:flex;align-items:center;gap:16px;padding:12px 0;position:relative;
  &::before{
    content:'';width:12px;height:12px;border-radius:50%;flex-shrink:0;
    background:${({ $done }) => $done ? '#D4A843' : '#3A3A3A'};
    border:2px solid ${({ $done }) => $done ? '#D4A843' : '#4A4A4A'};
  }
  span{color:${({ $done }) => $done ? '#F0F0F0' : '#707070'};font-size:0.9rem;font-weight:${({ $done }) => $done ? '500' : '400'};}
`;
const Err = styled.p`color:#E74C3C;text-align:center;padding:24px;`;

const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'];

const TrackOrder = () => {
    const [searchParams] = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('id') || '');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (searchParams.get('id')) handleSearch(searchParams.get('id'));
    }, []);

    const handleSearch = async (id) => {
        const searchId = id || orderId;
        if (!searchId.trim()) return;
        setLoading(true); setError(''); setOrder(null);
        try {
            const res = await API.get(`/orders/${searchId.trim()}`);
            setOrder(res.data);
        } catch {
            setError('Order not found. Please check your order number.');
        } finally { setLoading(false); }
    };

    const currentIdx = order ? statuses.indexOf(order.status) : -1;

    return (
        <Page>
            <Title>Track Your <span>Order</span></Title>
            <Sub>Enter your order number to see the latest status</Sub>
            <SearchWrap>
                <HiOutlineSearch />
                <input placeholder="e.g. EG-01001" value={orderId}
                    onChange={e => setOrderId(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()} />
                <Btn onClick={() => handleSearch()}>Track</Btn>
            </SearchWrap>
            {loading && <Loader text="Finding your order..." />}
            {error && <Err>{error}</Err>}
            {order && (
                <Card>
                    <Row><span>Order Number</span><span>{order.orderNumber}</span></Row>
                    <Row><span>Status</span><StatusBadge $s={order.status}>{order.status.replace(/-/g, ' ')}</StatusBadge></Row>
                    <Row><span>Type</span><span style={{ textTransform: 'capitalize' }}>{order.orderType}</span></Row>
                    <Row><span>Total</span><span style={{ color: '#D4A843', fontWeight: 700 }}>£{order.total?.toFixed(2)}</span></Row>
                    <Row><span>Placed</span><span>{new Date(order.createdAt).toLocaleString('en-GB')}</span></Row>
                    {order.status !== 'cancelled' && (
                        <Timeline>
                            {statuses.map((s, i) => (
                                <Step key={s} $done={i <= currentIdx}>
                                    <span>{s.replace(/-/g, ' ')}</span>
                                </Step>
                            ))}
                        </Timeline>
                    )}
                </Card>
            )}
        </Page>
    );
};

export default TrackOrder;
