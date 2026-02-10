import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineArrowLeft, HiOutlineClock, HiOutlineShoppingBag } from 'react-icons/hi';
import API from '../api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrap = styled.div`
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    img { height: 280px; }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accentLight};
  color: ${({ theme }) => theme.colors.accent};
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  text-transform: capitalize;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: fit-content;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

const PrepTime = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  svg { color: ${({ theme }) => theme.colors.accent}; }
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const QtyBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.bgDark}; }
`;

const QtyNum = styled.span`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  min-width: 30px;
  text-align: center;
`;

const AddToCartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 16px 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: 1.05rem;
  transition: all ${({ theme }) => theme.transition.fast};
  width: fit-content;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212,168,67,0.35);
  }
  &:active { transform: scale(0.98); }
`;

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        API.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader fullPage text="Loading product..." />;
    if (!product) return <Page><p>Product not found.</p></Page>;

    const handleAdd = () => {
        addToCart(product, qty);
        toast.success(`${qty}x ${product.name} added to cart!`, {
            style: { background: '#2B2B2B', color: '#F0F0F0', border: '1px solid #D4A843' },
            iconTheme: { primary: '#D4A843', secondary: '#1E1E1E' },
        });
    };

    return (
        <Page>
            <BackLink to="/menu"><HiOutlineArrowLeft /> Back to Menu</BackLink>
            <Grid>
                <ImageWrap>
                    <img src={product.image} alt={product.name} />
                </ImageWrap>
                <Details>
                    <Category>{product.category}</Category>
                    <Title>{product.name}</Title>
                    <Desc>{product.description}</Desc>
                    <Meta>
                        <Price>£{product.price.toFixed(2)}</Price>
                        <PrepTime><HiOutlineClock /> {product.preparationTime} min</PrepTime>
                    </Meta>
                    <QtyRow>
                        <QtyBtn onClick={() => setQty(q => Math.max(1, q - 1))}><HiOutlineMinus /></QtyBtn>
                        <QtyNum>{qty}</QtyNum>
                        <QtyBtn onClick={() => setQty(q => q + 1)}><HiOutlinePlus /></QtyBtn>
                    </QtyRow>
                    <AddToCartBtn onClick={handleAdd}>
                        <HiOutlineShoppingBag /> Add to Cart — £{(product.price * qty).toFixed(2)}
                    </AddToCartBtn>
                </Details>
            </Grid>
        </Page>
    );
};

export default ProductDetail;
