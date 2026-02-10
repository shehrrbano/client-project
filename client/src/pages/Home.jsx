import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HiOutlineArrowRight, HiOutlineClock, HiOutlineTruck, HiOutlineFire, HiOutlineStar } from 'react-icons/hi';
import API from '../api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const fadeUp = keyframes`from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-12px);}`;

/* ─── HERO SECTION ─── */
const Hero = styled.section`
  position:relative;width:100%;height:100vh;min-height:600px;max-height:900px;
  display:flex;align-items:center;overflow:hidden;
`;
const HeroBg = styled.div`
  position:absolute;inset:0;
  background:url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85') center/cover no-repeat;
  &::after{
    content:'';position:absolute;inset:0;
    background:rgba(14,14,14,0.65);
  }
`;
const HeroContent = styled.div`
  position:relative;z-index:2;max-width:720px;padding:0 48px;
  animation:${fadeUp} 0.9s ease-out;
  @media(max-width:768px){padding:0 24px;}
`;
const HeroTag = styled.span`
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(212,168,67,0.15);border:1px solid rgba(212,168,67,0.3);
  color:#D4A843;padding:8px 18px;border-radius:9999px;font-size:0.85rem;
  font-weight:600;margin-bottom:20px;letter-spacing:0.5px;
  svg{font-size:1.1rem;}
`;
const HeroTitle = styled.h1`
  font-size:clamp(2.4rem,6vw,4.2rem);font-weight:800;line-height:1.08;
  color:#FFFFFF;margin-bottom:20px;
  span{color:#D4A843;display:block;}
`;
const HeroSub = styled.p`
  font-size:clamp(1rem,2vw,1.2rem);color:rgba(255,255,255,0.75);
  max-width:520px;line-height:1.7;margin-bottom:32px;
`;
const HeroActions = styled.div`display:flex;gap:14px;flex-wrap:wrap;`;
const PrimaryBtn = styled(Link)`
  display:inline-flex;align-items:center;gap:10px;
  background:#D4A843;color:#1E1E1E;padding:16px 36px;border-radius:9999px;
  font-weight:700;font-size:1rem;letter-spacing:0.3px;
  transition:all 0.2s ease;
  &:hover{background:#C49A35;transform:translateY(-3px);box-shadow:0 12px 35px rgba(212,168,67,0.4);}
  svg{font-size:1.2rem;transition:transform 0.2s ease;}
  &:hover svg{transform:translateX(4px);}
`;
const OutlineBtn = styled(Link)`
  display:inline-flex;align-items:center;gap:10px;
  background:transparent;color:#F0F0F0;padding:16px 36px;border-radius:9999px;
  font-weight:600;font-size:1rem;border:2px solid rgba(255,255,255,0.25);
  transition:all 0.2s ease;
  &:hover{border-color:#D4A843;color:#D4A843;}
`;
const HeroStats = styled.div`
  display:flex;gap:32px;margin-top:40px;
  @media(max-width:480px){gap:20px;}
`;
const Stat = styled.div`
  h4{font-size:clamp(1.4rem,3vw,1.8rem);font-weight:800;color:#D4A843;}
  p{font-size:0.8rem;color:rgba(255,255,255,0.55);margin-top:2px;text-transform:uppercase;letter-spacing:1px;}
`;

/* ─── FEATURES STRIP ─── */
const Strip = styled.section`
  background:#2B2B2B;border-top:1px solid #3A3A3A;border-bottom:1px solid #3A3A3A;
  padding:0;
`;
const StripGrid = styled.div`
  max-width:1280px;margin:0 auto;display:grid;
  grid-template-columns:repeat(4,1fr);
  @media(max-width:768px){grid-template-columns:repeat(2,1fr);}
  @media(max-width:480px){grid-template-columns:1fr;}
`;
const StripItem = styled.div`
  display:flex;align-items:center;gap:14px;padding:28px 24px;
  border-right:1px solid #3A3A3A;
  &:last-child{border-right:none;}
  @media(max-width:768px){border-right:none;border-bottom:1px solid #3A3A3A;&:last-child{border-bottom:none;}}
`;
const StripIcon = styled.div`
  width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  background:rgba(212,168,67,0.1);color:#D4A843;font-size:1.4rem;flex-shrink:0;
`;
const StripText = styled.div`
  h4{font-size:0.95rem;font-weight:600;color:#F0F0F0;}
  p{font-size:0.8rem;color:#707070;margin-top:2px;}
`;

/* ─── FEATURED SECTION ─── */
const Section = styled.section`max-width:1280px;margin:0 auto;padding:80px 24px;`;
const SectionHeader = styled.div`
  display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px;
`;
const SectionTitle = styled.h2`
  font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:700;
  span{color:#D4A843;}
`;
const SectionSub = styled.p`color:#A0A0A0;font-size:0.95rem;max-width:480px;margin-top:6px;`;
const ViewAll = styled(Link)`
  display:inline-flex;align-items:center;gap:8px;color:#D4A843;font-weight:600;font-size:0.95rem;
  transition:gap 0.2s ease;&:hover{gap:12px;}
`;
const Grid = styled.div`
  display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;
`;

/* ─── CTA BANNER ─── */
const CTA = styled.section`
  position:relative;overflow:hidden;
  background:url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=85') center/cover no-repeat;
  padding:80px 24px;
  &::after{content:'';position:absolute;inset:0;background:rgba(14,14,14,0.72);}
`;
const CTAInner = styled.div`
  position:relative;z-index:2;max-width:680px;margin:0 auto;text-align:center;
`;
const CTATitle = styled.h2`
  font-size:clamp(1.6rem,4vw,2.6rem);font-weight:700;margin-bottom:12px;
  span{color:#D4A843;}
`;
const CTASub = styled.p`color:rgba(255,255,255,0.65);margin-bottom:28px;font-size:1.05rem;`;

/* ─── CATEGORY CARDS ─── */
const CatGrid = styled.div`
  display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-bottom:64px;
`;
const CatCard = styled(Link)`
  position:relative;overflow:hidden;border-radius:16px;height:180px;
  &::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.45);transition:background 0.3s ease;}
  &:hover::after{background:rgba(0,0,0,0.25);}
  &:hover img{transform:scale(1.1);}
`;
const CatImg = styled.img`width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;`;
const CatLabel = styled.span`
  position:absolute;bottom:14px;left:14px;z-index:2;font-weight:700;font-size:1rem;
  color:#FFF;text-transform:capitalize;
`;

const categories = [
  { name: 'burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { name: 'grilled', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
  { name: 'wraps', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80' },
  { name: 'sides', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
  { name: 'drinks', img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
  { name: 'desserts', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/products?featured=true')
      .then(res => setFeatured(res.data.slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <Hero>
        <HeroBg />
        <HeroContent>
          <HeroTag><HiOutlineFire /> #1 Flame-Grilled in England</HeroTag>
          <HeroTitle>
            Taste the Fire,
            <span>Love the Flavour.</span>
          </HeroTitle>
          <HeroSub>
            Hand-crafted burgers, flame-grilled meats, and bold flavours — made fresh
            and delivered hot to your door across England.
          </HeroSub>
          <HeroActions>
            <PrimaryBtn to="/menu">Order Now <HiOutlineArrowRight /></PrimaryBtn>
            <OutlineBtn to="/track-order">Track Order</OutlineBtn>
          </HeroActions>
          <HeroStats>
            <Stat><h4>26+</h4><p>Menu Items</p></Stat>
            <Stat><h4>15min</h4><p>Avg. Prep</p></Stat>
            <Stat><h4>4.9★</h4><p>Rating</p></Stat>
          </HeroStats>
        </HeroContent>
      </Hero>

      {/* ── FEATURES STRIP ── */}
      <Strip>
        <StripGrid>
          <StripItem><StripIcon><HiOutlineTruck /></StripIcon><StripText><h4>Fast Delivery</h4><p>Under 30 minutes</p></StripText></StripItem>
          <StripItem><StripIcon><HiOutlineFire /></StripIcon><StripText><h4>Flame-Grilled</h4><p>Charcoal perfection</p></StripText></StripItem>
          <StripItem><StripIcon><HiOutlineStar /></StripIcon><StripText><h4>Premium Quality</h4><p>Fresh ingredients daily</p></StripText></StripItem>
          <StripItem><StripIcon><HiOutlineClock /></StripIcon><StripText><h4>Order Tracking</h4><p>Real-time updates</p></StripText></StripItem>
        </StripGrid>
      </Strip>

      {/* ── CATEGORIES ── */}
      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>Browse by <span>Category</span></SectionTitle>
            <SectionSub>Explore our menu across six delicious categories</SectionSub>
          </div>
        </SectionHeader>
        <CatGrid>
          {categories.map(c => (
            <CatCard key={c.name} to={`/menu?category=${c.name}`}>
              <CatImg src={c.img} alt={c.name} />
              <CatLabel>{c.name}</CatLabel>
            </CatCard>
          ))}
        </CatGrid>

        {/* ── FEATURED ── */}
        <SectionHeader>
          <div>
            <SectionTitle>Featured <span>Picks</span></SectionTitle>
            <SectionSub>Our most-loved dishes, handpicked just for you</SectionSub>
          </div>
          <ViewAll to="/menu">View full menu <HiOutlineArrowRight /></ViewAll>
        </SectionHeader>
        {loading ? <Loader text="Loading menu..." /> : (
          <Grid>{featured.map(p => <ProductCard key={p._id} product={p} />)}</Grid>
        )}
      </Section>

      {/* ── CTA ── */}
      <CTA>
        <CTAInner>
          <CTATitle>Hungry? <span>Order Now.</span></CTATitle>
          <CTASub>Skip the queue — order online and enjoy flame-grilled goodness in minutes.</CTASub>
          <PrimaryBtn to="/menu">Explore Menu <HiOutlineArrowRight /></PrimaryBtn>
        </CTAInner>
      </CTA>
    </>
  );
};

export default Home;
