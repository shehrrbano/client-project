import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import API from '../api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Page = styled.div`max-width:1280px;margin:0 auto;padding:32px 24px;`;
const Header = styled.div`
  display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px;
  h1{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;span{color:#D4A843;}}
`;
const AddBtn = styled(Link)`
  display:inline-flex;align-items:center;gap:8px;background:#D4A843;color:#1E1E1E;
  padding:10px 24px;border-radius:9999px;font-weight:600;font-size:0.9rem;
  transition:all 0.15s ease;&:hover{background:#C49A35;transform:translateY(-1px);}
`;
const Table = styled.div`
  background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;overflow:hidden;
  overflow-x:auto;
`;
const Row = styled.div`
  display:grid;grid-template-columns:60px 2fr 1fr 1fr 1fr 100px;align-items:center;
  padding:12px 20px;gap:12px;border-bottom:1px solid #3A3A3A;
  &:last-child{border-bottom:none;}
  @media(max-width:768px){
    grid-template-columns:50px 1fr 80px 80px;
    & > *:nth-child(4),& > *:nth-child(3){display:none;}
  }
`;
const HeadRow = styled(Row)`background:#333;font-weight:600;font-size:0.85rem;color:#A0A0A0;text-transform:uppercase;letter-spacing:0.5px;`;
const Img = styled.img`width:48px;height:48px;object-fit:cover;border-radius:8px;`;
const Name = styled.span`font-weight:500;font-size:0.95rem;`;
const Cat = styled.span`
  display:inline-block;padding:3px 10px;border-radius:9999px;font-size:0.75rem;
  background:rgba(212,168,67,0.12);color:#D4A843;font-weight:500;text-transform:capitalize;
`;
const Price = styled.span`font-weight:600;color:#D4A843;`;
const Actions = styled.div`display:flex;gap:8px;`;
const IconBtn = styled.button`
  width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;
  background:${({ $d }) => $d ? 'rgba(231,76,60,0.12)' : '#3A3A3A'};
  color:${({ $d }) => $d ? '#E74C3C' : '#F0F0F0'};font-size:1rem;
  transition:all 0.15s ease;&:hover{transform:scale(1.1);}
`;
const Badge = styled.span`
  padding:3px 10px;border-radius:9999px;font-size:0.75rem;font-weight:500;
  background:${({ $a }) => $a ? 'rgba(76,175,80,0.12)' : 'rgba(231,76,60,0.12)'};
  color:${({ $a }) => $a ? '#4CAF50' : '#E74C3C'};
`;

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        API.get('/products?available=').then(res => setProducts(res.data)).catch(console.error).finally(() => setLoading(false));
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete "${name}"?`)) return;
        try {
            await API.delete(`/products/${id}`);
            toast.success('Product deleted');
            fetchProducts();
        } catch { toast.error('Failed to delete'); }
    };

    if (loading) return <Loader fullPage text="Loading products..." />;

    return (
        <Page>
            <Header>
                <h1>Manage <span>Products</span></h1>
                <AddBtn to="/admin/add-product"><HiOutlinePlus /> Add Product</AddBtn>
            </Header>
            <Table>
                <HeadRow><span></span><span>Product</span><span>Category</span><span>Price</span><span>Status</span><span>Actions</span></HeadRow>
                {products.map(p => (
                    <Row key={p._id}>
                        <Img src={p.image} alt={p.name} />
                        <Name>{p.name}</Name>
                        <Cat>{p.category}</Cat>
                        <Price>£{p.price.toFixed(2)}</Price>
                        <Badge $a={p.available}>{p.available ? 'Available' : 'Unavailable'}</Badge>
                        <Actions>
                            <IconBtn as={Link} to={`/admin/edit-product/${p._id}`}><HiOutlinePencil /></IconBtn>
                            <IconBtn $d onClick={() => handleDelete(p._id, p.name)}><HiOutlineTrash /></IconBtn>
                        </Actions>
                    </Row>
                ))}
            </Table>
        </Page>
    );
};

export default AdminProducts;
