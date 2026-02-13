import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdRestaurantMenu } from 'react-icons/md';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  margin-top: auto;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const BrandSection = styled(FooterSection)`
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.7;
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.accent};
  svg { font-size: 1.5rem; }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  padding: 4px 0;
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  padding: 4px 0;
  svg { color: ${({ theme }) => theme.colors.accent}; font-size: 1.1rem; flex-shrink: 0; }
`;

const BottomBar = styled.div`
  max-width: 1280px;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const Footer = () => (
  <FooterWrap>
    <FooterContainer>
      <BrandSection>
        <BrandLogo><MdRestaurantMenu /> URBAN GRILL</BrandLogo>
        <p>Authentic flame-grilled flavours and fast food favourites, served with passion in the heart of the city.</p>
      </BrandSection>
      <FooterSection>
        <h3>Quick Links</h3>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/menu">Our Menu</FooterLink>
        <FooterLink to="/cart">Your Cart</FooterLink>
      </FooterSection>
      <FooterSection>
        <h3>Categories</h3>
        <FooterLink to="/menu?category=burgers">Burgers</FooterLink>
        <FooterLink to="/menu?category=grilled">Grilled</FooterLink>
        <FooterLink to="/menu?category=wraps">Wraps</FooterLink>
        <FooterLink to="/menu?category=sides">Sides</FooterLink>
      </FooterSection>
      <FooterSection>
        <h3>Contact Us</h3>
        <ContactItem><HiOutlineLocationMarker /> 42 High Street, Birmingham, B1 1AA</ContactItem>
        <ContactItem><HiOutlinePhone /> +44 121 456 7890</ContactItem>
        <ContactItem><HiOutlineMail /> hello@embergrill.co.uk</ContactItem>
      </FooterSection>
    </FooterContainer>
    <BottomBar>&copy; {new Date().getFullYear()} URBAN GRILL. All rights reserved.</BottomBar>
  </FooterWrap>
);

export default Footer;
