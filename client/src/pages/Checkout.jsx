import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineTruck, HiOutlineOfficeBuilding } from 'react-icons/hi';
import API from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  span { color: ${({ theme }) => theme.colors.accent}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TypeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) => ($active ? theme.colors.accentLight : theme.colors.surfaceLight)};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.textSecondary)};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: 0.95rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; }
  svg { font-size: 1.3rem; }
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: ${({ $full }) => ($full ? '1fr' : '1fr 1fr')};
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  label {
    display: block;
    font-size: 0.85rem;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 6px;
  }
  input, textarea {
    width: 100%;
    padding: 12px 16px;
    background: ${({ theme }) => theme.colors.bgDark};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: 0.95rem;
    transition: border-color ${({ theme }) => theme.transition.fast};
    &:focus { border-color: ${({ theme }) => theme.colors.accent}; }
    &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  }
  textarea { resize: vertical; min-height: 80px; }
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const PayOption = styled.button`
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) => ($active ? theme.colors.accentLight : theme.colors.surfaceLight)};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.textSecondary)};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transition.fast};
`;

const Summary = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 96px;
  h2 {
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  span:last-child { color: ${({ theme }) => theme.colors.textPrimary}; }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: ${({ $bold, theme }) => ($bold ? theme.colors.textPrimary : theme.colors.textSecondary)};
  font-weight: ${({ $bold, theme }) => ($bold ? theme.fonts.weight.bold : theme.fonts.weight.regular)};
  font-size: ${({ $bold }) => ($bold ? '1.15rem' : '0.95rem')};
  ${({ $bold, theme }) => $bold && `
    border-top: 1px solid ${theme.colors.border};
    margin-top: 8px;
    padding-top: 16px;
  `}
  span:last-child { color: ${({ $bold, theme }) => ($bold ? theme.colors.accent : 'inherit')}; }
`;

const PlaceOrderBtn = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: 1rem;
  margin-top: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212,168,67,0.35);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, subtotal, deliveryFee, total, clearCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: '', postcode: '', notes: ''
    });
    const [orderType, setOrderType] = useState('delivery');
    const [payment, setPayment] = useState('cash');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const finalDeliveryFee = orderType === 'pickup' ? 0 : deliveryFee;
    const finalTotal = subtotal + finalDeliveryFee;

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.phone) {
            toast.error('Please fill in all required fields');
            return;
        }
        if (orderType === 'delivery' && (!form.address || !form.postcode)) {
            toast.error('Please provide your delivery address');
            return;
        }
        setSubmitting(true);
        try {
            const orderData = {
                customer: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    postcode: form.postcode
                },
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                subtotal,
                deliveryFee: finalDeliveryFee,
                total: finalTotal,
                orderType,
                paymentMethod: payment,
                notes: form.notes
            };
            const res = await API.post('/orders', orderData);
            clearCart();
            navigate(`/order-confirmation/${res.data._id}`, {
                state: { order: res.data }
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <Page>
            <Title><span>Checkout</span></Title>
            <Grid>
                <div>
                    <FormCard style={{ marginBottom: '20px' }}>
                        <SectionTitle>Order Type</SectionTitle>
                        <TypeToggle>
                            <TypeBtn $active={orderType === 'delivery'} onClick={() => setOrderType('delivery')}>
                                <HiOutlineTruck /> Delivery
                            </TypeBtn>
                            <TypeBtn $active={orderType === 'pickup'} onClick={() => setOrderType('pickup')}>
                                <HiOutlineOfficeBuilding /> Pickup
                            </TypeBtn>
                        </TypeToggle>

                        <SectionTitle>Your Details</SectionTitle>
                        <FieldGroup>
                            <Field>
                                <label>Full Name *</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" />
                            </Field>
                            <Field>
                                <label>Email *</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <label>Phone *</label>
                                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7900 123456" />
                            </Field>
                            <Field>
                                <label>Postcode {orderType === 'delivery' ? '*' : ''}</label>
                                <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="B1 1AA" />
                            </Field>
                        </FieldGroup>
                        {orderType === 'delivery' && (
                            <FieldGroup $full>
                                <Field>
                                    <label>Delivery Address *</label>
                                    <input name="address" value={form.address} onChange={handleChange} placeholder="42 High Street, Birmingham" />
                                </Field>
                            </FieldGroup>
                        )}
                        <FieldGroup $full>
                            <Field>
                                <label>Order Notes (optional)</label>
                                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special requests..." />
                            </Field>
                        </FieldGroup>
                    </FormCard>

                    <FormCard>
                        <SectionTitle>Payment Method</SectionTitle>
                        <PaymentOptions>
                            <PayOption $active={payment === 'cash'} onClick={() => setPayment('cash')}>Cash on Delivery</PayOption>
                            <PayOption $active={payment === 'card'} onClick={() => setPayment('card')}>Card Payment</PayOption>
                        </PaymentOptions>
                    </FormCard>
                </div>

                <Summary>
                    <h2>Order Summary</h2>
                    {cartItems.map(item => (
                        <SummaryItem key={item._id}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>£{(item.price * item.quantity).toFixed(2)}</span>
                        </SummaryItem>
                    ))}
                    <SummaryRow style={{ marginTop: '12px' }}><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></SummaryRow>
                    <SummaryRow><span>Delivery</span><span>{finalDeliveryFee === 0 ? 'FREE' : `£${finalDeliveryFee.toFixed(2)}`}</span></SummaryRow>
                    <SummaryRow $bold><span>Total</span><span>£{finalTotal.toFixed(2)}</span></SummaryRow>
                    <PlaceOrderBtn onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Placing Order...' : `Place Order — £${finalTotal.toFixed(2)}`}
                    </PlaceOrderBtn>
                </Summary>
            </Grid>
        </Page>
    );
};

export default Checkout;
