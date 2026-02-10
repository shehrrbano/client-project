import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdRestaurantMenu } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Page = styled.div`
  min-height:calc(100vh - 72px);display:flex;align-items:center;justify-content:center;
  padding:24px;
`;
const Card = styled.div`
  background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;padding:40px;
  width:100%;max-width:420px;
`;
const Logo = styled.div`
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:1.5rem;font-weight:700;color:#D4A843;margin-bottom:8px;
  svg{font-size:1.8rem;}
`;
const Sub = styled.p`text-align:center;color:#A0A0A0;font-size:0.9rem;margin-bottom:32px;`;
const Field = styled.div`
  margin-bottom:16px;
  label{display:block;font-size:0.85rem;font-weight:500;color:#A0A0A0;margin-bottom:6px;}
  input{
    width:100%;padding:12px 16px;background:#1E1E1E;color:#F0F0F0;
    border:1px solid #3A3A3A;border-radius:10px;font-size:0.95rem;
    transition:border-color 0.15s ease;
    &:focus{border-color:#D4A843;}
    &::placeholder{color:#707070;}
  }
`;
const Btn = styled.button`
  width:100%;background:linear-gradient(135deg,#D4A843,#C49A35);color:#1E1E1E;
  padding:14px;border-radius:9999px;font-weight:600;font-size:1rem;
  margin-top:8px;transition:all 0.15s ease;
  &:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(212,168,67,0.35);}
  &:disabled{opacity:0.6;cursor:not-allowed;transform:none;box-shadow:none;}
`;

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back, Admin!', {
                style: { background: '#2B2B2B', color: '#F0F0F0', border: '1px solid #D4A843' },
                iconTheme: { primary: '#D4A843', secondary: '#1E1E1E' },
            });
            navigate('/admin');
        } catch {
            toast.error('Invalid credentials');
        } finally { setLoading(false); }
    };

    return (
        <Page>
            <Card as="form" onSubmit={handleSubmit}>
                <Logo><MdRestaurantMenu /> Ember Grill</Logo>
                <Sub>Admin Panel Login</Sub>
                <Field>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@embergrill.co.uk" required />
                </Field>
                <Field>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                </Field>
                <Btn type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Btn>
            </Card>
        </Page>
    );
};

export default AdminLogin;
