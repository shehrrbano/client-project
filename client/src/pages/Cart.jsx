import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowRight, HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

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

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CartItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.md};
    flex-shrink: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    img { width: 100%; height: 160px; }
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  h3 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    margin-bottom: 4px;
  }
  p {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    font-size: 1.05rem;
  }
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QtyBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.bgDark}; }
`;

const QtyNum = styled.span`
  min-width: 24px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
`;

const RemoveBtn = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.2rem;
  padding: 6px;
  transition: opacity ${({ theme }) => theme.transition.fast};
  &:hover { opacity: 0.7; }
`;

const Summary = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 96px;
  h2 {
    font-size: 1.2rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
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

const CheckoutBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  h2 {
    font-size: 1.4rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const BrowseBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 12px 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover { background: ${({ theme }) => theme.colors.accentHover}; }
`;

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, subtotal, deliveryFee, total } = useCart();

    if (cartItems.length === 0) {
        return (
            <Page>
                <EmptyCart>
                    <HiOutlineShoppingBag />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items yet.</p>
                    <BrowseBtn to="/menu">Browse Menu <HiOutlineArrowRight /></BrowseBtn>
                </EmptyCart>
            </Page>
        );
    }

    return (
        <Page>
            <Title>Your <span>Cart</span></Title>
            <Grid>
                <ItemsList>
                    {cartItems.map(item => (
                        <CartItemCard key={item._id}>
                            <img src={item.image} alt={item.name} />
                            <ItemInfo>
                                <h3>{item.name}</h3>
                                <p>£{(item.price * item.quantity).toFixed(2)}</p>
                            </ItemInfo>
                            <QtyControls>
                                <QtyBtn onClick={() => updateQuantity(item._id, item.quantity - 1)}><HiOutlineMinus /></QtyBtn>
                                <QtyNum>{item.quantity}</QtyNum>
                                <QtyBtn onClick={() => updateQuantity(item._id, item.quantity + 1)}><HiOutlinePlus /></QtyBtn>
                            </QtyControls>
                            <RemoveBtn onClick={() => removeFromCart(item._id)}><HiOutlineTrash /></RemoveBtn>
                        </CartItemCard>
                    ))}
                </ItemsList>
                <Summary>
                    <h2>Order Summary</h2>
                    <SummaryRow><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></SummaryRow>
                    <SummaryRow><span>Delivery Fee</span><span>£{deliveryFee.toFixed(2)}</span></SummaryRow>
                    <SummaryRow $bold><span>Total</span><span>£{total.toFixed(2)}</span></SummaryRow>
                    <CheckoutBtn to="/checkout">Proceed to Checkout <HiOutlineArrowRight /></CheckoutBtn>
                </Summary>
            </Grid>
        </Page>
    );
};

export default Cart;
