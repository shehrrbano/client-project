import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import API from '../api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Page = styled.div`max-width:720px;margin:0 auto;padding:32px 24px;`;
const BackBtn = styled.button`
  display:inline-flex;align-items:center;gap:6px;background:none;color:#A0A0A0;
  font-size:0.95rem;margin-bottom:24px;transition:color 0.15s ease;
  &:hover{color:#D4A843;}
`;
const Title = styled.h1`font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:24px;span{color:#D4A843;}`;
const Card = styled.form`background:#2B2B2B;border:1px solid #3A3A3A;border-radius:16px;padding:32px;`;
const FieldGroup = styled.div`
  display:grid;grid-template-columns:${({ $f }) => $f ? '1fr' : '1fr 1fr'};gap:16px;margin-bottom:16px;
  @media(max-width:480px){grid-template-columns:1fr;}
`;
const Field = styled.div`
  label{display:block;font-size:0.85rem;font-weight:500;color:#A0A0A0;margin-bottom:6px;}
  input,select,textarea{
    width:100%;padding:12px 16px;background:#1E1E1E;color:#F0F0F0;
    border:1px solid #3A3A3A;border-radius:10px;font-size:0.95rem;
    transition:border-color 0.15s ease;&:focus{border-color:#D4A843;}
    &::placeholder{color:#707070;}
  }
  select{cursor:pointer;}
  textarea{resize:vertical;min-height:100px;}
`;
const Toggle = styled.label`
  display:flex;align-items:center;gap:12px;cursor:pointer;margin-bottom:16px;
  input{width:18px;height:18px;accent-color:#D4A843;}
  span{font-size:0.95rem;color:#A0A0A0;}
`;
const SubmitBtn = styled.button`
  width:100%;background:linear-gradient(135deg,#D4A843,#C49A35);color:#1E1E1E;
  padding:14px;border-radius:9999px;font-weight:600;font-size:1rem;margin-top:8px;
  transition:all 0.15s ease;
  &:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(212,168,67,0.35);}
  &:disabled{opacity:0.6;cursor:not-allowed;transform:none;box-shadow:none;}
`;
const Preview = styled.div`
  margin-top:16px;
  img{width:100%;max-height:200px;object-fit:cover;border-radius:10px;border:1px solid #3A3A3A;}
`;

const AdminAddProduct = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: '', description: '', price: '', category: 'burgers',
        image: '', featured: false, available: true, preparationTime: '15'
    });

    useEffect(() => {
        if (isEdit) {
            API.get(`/products/${id}`)
                .then(res => {
                    const p = res.data;
                    setForm({
                        name: p.name, description: p.description, price: String(p.price),
                        category: p.category, image: p.image, featured: p.featured,
                        available: p.available, preparationTime: String(p.preparationTime)
                    });
                })
                .catch(() => toast.error('Product not found'))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.description || !form.price || !form.category) {
            toast.error('Please fill all required fields'); return;
        }
        setSubmitting(true);
        try {
            const data = { ...form, price: parseFloat(form.price), preparationTime: parseInt(form.preparationTime) };
            if (isEdit) { await API.put(`/products/${id}`, data); toast.success('Product updated!'); }
            else { await API.post('/products', data); toast.success('Product created!'); }
            navigate('/admin/products');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save');
        } finally { setSubmitting(false); }
    };

    if (loading) return <Loader fullPage text="Loading product..." />;

    return (
        <Page>
            <BackBtn onClick={() => navigate(-1)}><HiOutlineArrowLeft /> Back</BackBtn>
            <Title>{isEdit ? 'Edit' : 'Add'} <span>Product</span></Title>
            <Card onSubmit={handleSubmit}>
                <FieldGroup $f>
                    <Field><label>Product Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Classic Smash Burger" /></Field>
                </FieldGroup>
                <FieldGroup $f>
                    <Field><label>Description *</label><textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product..." /></Field>
                </FieldGroup>
                <FieldGroup>
                    <Field><label>Price (£) *</label><input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="8.99" /></Field>
                    <Field>
                        <label>Category *</label>
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="burgers">Burgers</option>
                            <option value="grilled">Grilled</option>
                            <option value="wraps">Wraps</option>
                            <option value="sides">Sides</option>
                            <option value="drinks">Drinks</option>
                            <option value="desserts">Desserts</option>
                        </select>
                    </Field>
                </FieldGroup>
                <FieldGroup>
                    <Field><label>Prep Time (min)</label><input name="preparationTime" type="number" value={form.preparationTime} onChange={handleChange} /></Field>
                    <Field><label>Image URL</label><input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." /></Field>
                </FieldGroup>
                {form.image && <Preview><img src={form.image} alt="Preview" /></Preview>}
                <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                    <Toggle><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /><span>Featured</span></Toggle>
                    <Toggle><input type="checkbox" name="available" checked={form.available} onChange={handleChange} /><span>Available</span></Toggle>
                </div>
                <SubmitBtn type="submit" disabled={submitting}>{submitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}</SubmitBtn>
            </Card>
        </Page>
    );
};

export default AdminAddProduct;
