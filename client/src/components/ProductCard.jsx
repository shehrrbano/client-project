import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineClock } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transition.normal};
  animation: ${slideUp} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  opacity: 0;
  border: 1px solid transparent;
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.colors.cardShadow};
    border-color: ${({ theme }) => theme.colors.accent}33;
  }
`;

const ImageWrap = styled(Link)`
  display: block;
  position: relative;
  height: 200px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transition.slow};
  }
  ${Card}:hover & img { transform: scale(1.08); }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  text-transform: capitalize;
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Name = styled(Link)`
  display: block;
  font-size: 1.05rem;
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

const PrepTime = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  svg { font-size: 0.95rem; }
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDark};
  font-size: 1.2rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: scale(1.1);
  }
  &:active { transform: scale(0.95); }
`;

const ProductCard = ({ product, delay = '0s' }) => {
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            style: { background: '#2B2B2B', color: '#F0F0F0', border: '1px solid #D4A843' },
            iconTheme: { primary: '#D4A843', secondary: '#1E1E1E' },
        });
    };

    return (
        <Card $delay={delay}>
            <ImageWrap to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <CategoryTag>{product.category}</CategoryTag>
            </ImageWrap>
            <Info>
                <Name to={`/product/${product._id}`}>{product.name}</Name>
                <Desc>{product.description}</Desc>
                <Bottom>
                    <div>
                        <Price>£{product.price.toFixed(2)}</Price>
                        <PrepTime><HiOutlineClock /> {product.preparationTime} min</PrepTime>
                    </div>
                    <AddBtn onClick={handleAdd} title="Add to cart"><HiOutlinePlus /></AddBtn>
                </Bottom>
            </Info>
        </Card>
    );
};

export default ProductCard;
