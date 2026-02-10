import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineShoppingCart, HiOutlineCurrencyPound, HiOutlineCollection, HiOutlineClock } from 'react-icons/hi';
import API from '../api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Page = styled.div`max-width:1280px;margin:0 auto;padding:32px 24px;`;
const Header = styled.div`
  display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;
  h1{font-size:clamp(1.6rem,3vw,2rem);font-weight:700;span{color:#D4A843;}}
`;
const LogoutBtn = styled.button`
  background:#3A3A3A;color:#F0F0F0;padding:10px 20px;border-radius:9999px;
  font-weight:500;font-size:0.9rem;transition:all 0.15s ease;
  &:hover{background:#4A4A4A;}
`;
const Stats = styled.div`
  display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px;
`;
const StatCard = styled.div`
  background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;padding:24px;
  display:flex;align-items:center;gap:16px;
  transition:all 0.25s ease;
  &:hover{border-color:rgba(212,168,67,0.3);transform:translateY(-2px);}
`;
const StatIcon = styled.div`
  width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  background:rgba(212,168,67,0.12);color:#D4A843;font-size:1.5rem;flex-shrink:0;
`;
const StatInfo = styled.div`
  h3{font-size:1.5rem;font-weight:700;color:#F0F0F0;}
  p{font-size:0.85rem;color:#A0A0A0;}
`;
const QuickLinks = styled.div`
  display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;
`;
const QuickCard = styled(Link)`
  background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;padding:28px;
  transition:all 0.25s ease;
  h3{font-size:1.1rem;font-weight:600;margin-bottom:6px;}
  p{color:#A0A0A0;font-size:0.9rem;}
  &:hover{border-color:#D4A843;transform:translateY(-4px);box-shadow:0 4px 20px rgba(0,0,0,0.3);}
`;

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prodCount, setProdCount] = useState(0);
    const { logout } = useAuth();

    useEffect(() => {
        Promise.all([
            API.get('/orders/stats'),
            API.get('/products')
        ]).then(([statsRes, prodsRes]) => {
            setStats(statsRes.data);
            setProdCount(prodsRes.data.length);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader fullPage text="Loading dashboard..." />;

    return (
        <Page>
            <Header>
                <h1>Admin <span>Dashboard</span></h1>
                <LogoutBtn onClick={logout}>Logout</LogoutBtn>
            </Header>
            <Stats>
                <StatCard><StatIcon><HiOutlineShoppingCart /></StatIcon><StatInfo><h3>{stats?.totalOrders || 0}</h3><p>Total Orders</p></StatInfo></StatCard>
                <StatCard><StatIcon><HiOutlineCurrencyPound /></StatIcon><StatInfo><h3>£{(stats?.totalRevenue || 0).toFixed(2)}</h3><p>Revenue</p></StatInfo></StatCard>
                <StatCard><StatIcon><HiOutlineClock /></StatIcon><StatInfo><h3>{stats?.pendingOrders || 0}</h3><p>Active Orders</p></StatInfo></StatCard>
                <StatCard><StatIcon><HiOutlineCollection /></StatIcon><StatInfo><h3>{prodCount}</h3><p>Products</p></StatInfo></StatCard>
            </Stats>
            <QuickLinks>
                <QuickCard to="/admin/products"><h3>🍔 Manage Products</h3><p>Add, edit, or remove menu items</p></QuickCard>
                <QuickCard to="/admin/orders"><h3>📋 Manage Orders</h3><p>View and update order statuses</p></QuickCard>
                <QuickCard to="/admin/add-product"><h3>➕ Add Product</h3><p>Create a new menu item</p></QuickCard>
                <QuickCard to="/menu"><h3>👁️ View Website</h3><p>See the customer-facing site</p></QuickCard>
            </QuickLinks>
        </Page>
    );
};

export default AdminDashboard;
