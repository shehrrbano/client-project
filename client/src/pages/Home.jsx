import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HiOutlineArrowRight, HiOutlineFire, HiOutlineClock, HiOutlineTruck } from 'react-icons/hi';
import API from '../api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #1E1E1E 0%, #2B2B2B 50%, #1E1E1E 100%);
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const HeroContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  z-index: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: ${({ theme }) => theme.spacing.xxl};
  }
`;

const HeroContent = styled.div`
  animation: ${fadeIn} 0.8s ease forwards;
`;

const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.accentLight};
  color: ${({ theme }) => theme.colors.accent};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  svg { font-size: 1.1rem; }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  line-height: 1.15;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  span { color: ${({ theme }) => theme.colors.accent}; }
`;

const HeroDesc = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroBtns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.bgDark};
  padding: 14px 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212,168,67,0.35);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 14px 32px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const HeroImage = styled.div`
  animation: ${fadeIn} 1s ease 0.3s forwards;
  opacity: 0;
  img {
    width: 100%;
    max-width: 520px;
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    img { max-width: 360px; }
  }
`;

const Features = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

const FeaturesGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  svg {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  h3 {
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  h2 {
    font-size: clamp(1.6rem, 3vw, 2rem);
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    span { color: ${({ theme }) => theme.colors.accent}; }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: gap ${({ theme }) => theme.transition.fast};
  &:hover { gap: 10px; }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CTA = styled.section`
  max-width: 1280px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
`;

const CTACard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface} 0%, rgba(212,168,67,0.1) 100%);
  border: 1px solid ${({ theme }) => theme.colors.accent}33;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: ${({ theme }) => theme.spacing.md};
    span { color: ${({ theme }) => theme.colors.accent}; }
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/products?featured=true')
            .then(res => setFeatured(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Hero>
                <HeroContainer>
                    <HeroContent>
                        <HeroTag><HiOutlineFire /> #1 Grilled Food in England</HeroTag>
                        <HeroTitle>
                            Flame-Grilled<br />
                            <span>Perfection</span> Delivered<br />
                            To Your Door
                        </HeroTitle>
                        <HeroDesc>
                            From juicy smash burgers to sizzling mixed grills, experience bold
                            flavours crafted with passion and served fast.
                        </HeroDesc>
                        <HeroBtns>
                            <PrimaryBtn to="/menu">View Menu <HiOutlineArrowRight /></PrimaryBtn>
                            <SecondaryBtn to="/track-order">Track Order</SecondaryBtn>
                        </HeroBtns>
                    </HeroContent>
                    <HeroImage>
                        <img
                            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
                            alt="Grilled food platter"
                        />
                    </HeroImage>
                </HeroContainer>
            </Hero>

            <Features>
                <FeaturesGrid>
                    <FeatureCard>
                        <HiOutlineFire />
                        <h3>Flame Grilled</h3>
                        <p>Every item cooked over real flames for that authentic smoky taste.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <HiOutlineClock />
                        <h3>Fast Delivery</h3>
                        <p>Hot food at your door in 30 minutes or less, guaranteed.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <HiOutlineTruck />
                        <h3>Free Over £25</h3>
                        <p>Enjoy free delivery on all orders over £25 across the city.</p>
                    </FeatureCard>
                </FeaturesGrid>
            </Features>

            <Section>
                <SectionHeader>
                    <h2>Our <span>Featured</span> Items</h2>
                    <ViewAllLink to="/menu">View Full Menu <HiOutlineArrowRight /></ViewAllLink>
                </SectionHeader>
                {loading ? (
                    <Loader text="Loading featured items..." />
                ) : (
                    <ProductGrid>
                        {featured.map((product, i) => (
                            <ProductCard key={product._id} product={product} delay={`${i * 0.1}s`} />
                        ))}
                    </ProductGrid>
                )}
            </Section>

            <CTA>
                <CTACard>
                    <h2>Ready to <span>Order</span>?</h2>
                    <p>Browse our full menu and get your favourites delivered hot and fresh to your doorstep.</p>
                    <PrimaryBtn to="/menu">Explore Menu <HiOutlineArrowRight /></PrimaryBtn>
                </CTACard>
            </CTA>
        </>
    );
};

export default Home;
