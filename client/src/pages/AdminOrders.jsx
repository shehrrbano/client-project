import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Page = styled.div`max-width:1280px;margin:0 auto;padding:32px 24px;`;
const Title = styled.h1`font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:24px;span{color:#D4A843;}`;
const Filters = styled.div`display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;`;
const Pill = styled.button`
  padding:7px 16px;border-radius:9999px;font-size:0.85rem;font-weight:500;
  background:${({ $a }) => $a ? '#D4A843' : '#2B2B2B'};color:${({ $a }) => $a ? '#1E1E1E' : '#A0A0A0'};
  border:1px solid ${({ $a }) => $a ? '#D4A843' : '#3A3A3A'};transition:all 0.15s ease;text-transform:capitalize;
  &:hover{border-color:#D4A843;}
`;
const Table = styled.div`background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;overflow:hidden;overflow-x:auto;`;
const Row = styled.div`
  display:grid;grid-template-columns:120px 1.5fr 1fr 1fr 1fr 140px;align-items:center;
  padding:14px 20px;gap:12px;border-bottom:1px solid #3A3A3A;
  &:last-child{border-bottom:none;}
  @media(max-width:768px){grid-template-columns:100px 1fr 100px 130px;}
  @media(max-width:768px){& > *:nth-child(3),& > *:nth-child(4){display:none;}}
`;
const HeadRow = styled(Row)`background:#333;font-weight:600;font-size:0.8rem;color:#A0A0A0;text-transform:uppercase;letter-spacing:0.5px;`;
const StatusBadge = styled.span`
  padding:4px 12px;border-radius:9999px;font-size:0.75rem;font-weight:600;text-transform:capitalize;
  background:${({ $s }) => $s === 'delivered' ? 'rgba(76,175,80,0.12)' : $s === 'cancelled' ? 'rgba(231,76,60,0.12)' : 'rgba(212,168,67,0.12)'};
  color:${({ $s }) => $s === 'delivered' ? '#4CAF50' : $s === 'cancelled' ? '#E74C3C' : '#D4A843'};
`;
const Select = styled.select`
  padding:8px 12px;background:#1E1E1E;color:#F0F0F0;border:1px solid #3A3A3A;
  border-radius:8px;font-size:0.85rem;cursor:pointer;
  &:focus{border-color:#D4A843;}
`;

const allStatuses = ['all', 'pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchOrders = () => {
        setLoading(true);
        const q = filter !== 'all' ? `?status=${filter}` : '';
        API.get(`/orders${q}`).then(res => setOrders(res.data)).catch(console.error).finally(() => setLoading(false));
    };

    useEffect(() => { fetchOrders(); }, [filter]);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}`, { status });
            toast.success(`Order updated to ${status}`);
            fetchOrders();
        } catch { toast.error('Failed to update'); }
    };

    if (loading) return <Loader fullPage text="Loading orders..." />;

    return (
        <Page>
            <Title>Manage <span>Orders</span></Title>
            <Filters>
                {allStatuses.map(s => (
                    <Pill key={s} $a={filter === s} onClick={() => setFilter(s)}>{s.replace(/-/g, ' ')}</Pill>
                ))}
            </Filters>
            <Table>
                <HeadRow><span>Order #</span><span>Customer</span><span>Items</span><span>Total</span><span>Status</span><span>Update</span></HeadRow>
                {orders.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#A0A0A0' }}>No orders found</div>
                ) : (
                    orders.map(o => (
                        <Row key={o._id}>
                            <span style={{ fontWeight: 600, color: '#D4A843' }}>{o.orderNumber}</span>
                            <div>
                                <div style={{ fontWeight: 500 }}>{o.customer?.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#707070' }}>{new Date(o.createdAt).toLocaleString('en-GB')}</div>
                            </div>
                            <span>{o.items?.length} items</span>
                            <span style={{ fontWeight: 600 }}>£{o.total?.toFixed(2)}</span>
                            <StatusBadge $s={o.status}>{o.status.replace(/-/g, ' ')}</StatusBadge>
                            <Select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="out-for-delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                        </Row>
                    ))
                )}
            </Table>
        </Page>
    );
};

export default AdminOrders;
