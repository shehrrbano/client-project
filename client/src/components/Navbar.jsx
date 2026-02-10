import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { MdRestaurantMenu } from 'react-icons/md';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(30, 30, 30, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background ${({ theme }) => theme.transition.normal};
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  transition: opacity ${({ theme }) => theme.transition.fast};
  &:hover { opacity: 0.85; }
  svg { font-size: 1.8rem; }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.bgDark};
    flex-direction: column;
    justify-content: flex-start;
    padding-top: ${({ theme }) => theme.spacing.xxl};
    gap: ${({ theme }) => theme.spacing.lg};
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform ${({ theme }) => theme.transition.normal};
  }
`;

const NavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.textSecondary)};
  transition: color ${({ theme }) => theme.transition.fast};
  position: relative;
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transition.fast};
  }
  &:hover::after { width: 100%; }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

const CartBtn = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.colors.glowShadow};
  }
  svg { font-size: 1.2rem; }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.6rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
  }
`;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <Nav>
            <NavContainer>
                <Logo to="/"><MdRestaurantMenu /> Ember Grill</Logo>
                <NavLinks $open={open}>
                    <NavLink to="/" $active={isActive('/')} onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/menu" $active={isActive('/menu')} onClick={() => setOpen(false)}>Menu</NavLink>
                    <NavLink to="/track-order" $active={isActive('/track-order')} onClick={() => setOpen(false)}>Track Order</NavLink>
                    <NavLink to="/admin" $active={location.pathname.startsWith('/admin')} onClick={() => setOpen(false)}>Admin</NavLink>
                </NavLinks>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CartBtn to="/cart">
                        <HiOutlineShoppingBag />
                        Cart
                        {cartCount > 0 && <Badge>{cartCount}</Badge>}
                    </CartBtn>
                    <MobileToggle onClick={() => setOpen(!open)}>
                        {open ? <HiOutlineX /> : <HiOutlineMenu />}
                    </MobileToggle>
                </div>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
