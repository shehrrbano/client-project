import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Loader from '../components/Loader';
import { HiOutlineSearch } from 'react-icons/hi';

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  h1 {
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    span { color: ${({ theme }) => theme.colors.accent}; }
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 12px 20px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: border-color ${({ theme }) => theme.transition.fast};
  &:focus-within { border-color: ${({ theme }) => theme.colors.accent}; }
  svg { color: ${({ theme }) => theme.colors.textMuted}; font-size: 1.2rem; flex-shrink: 0; }
  input {
    flex: 1;
    background: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.95rem;
    &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  grid-column: 1 / -1;
  h3 { font-size: 1.2rem; margin-bottom: ${({ theme }) => theme.spacing.sm}; color: ${({ theme }) => theme.colors.textPrimary}; }
`;

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') || 'all';

    useEffect(() => {
        setLoading(true);
        const params = category !== 'all' ? `?category=${category}` : '';
        API.get(`/products${params}`)
            .then(res => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [category]);

    const handleCategory = (cat) => {
        setSearchParams(cat === 'all' ? {} : { category: cat });
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page>
            <Header>
                <h1>Our <span>Menu</span></h1>
                <p>Explore our flame-grilled favourites and fast food classics</p>
            </Header>

            <SearchBar>
                <HiOutlineSearch />
                <input
                    type="text"
                    placeholder="Search for burgers, wraps, drinks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </SearchBar>

            <CategoryFilter active={category} onChange={handleCategory} />

            {loading ? (
                <Loader text="Loading menu..." />
            ) : filtered.length === 0 ? (
                <Empty>
                    <h3>No items found</h3>
                    <p>Try a different search or category</p>
                </Empty>
            ) : (
                <Grid>
                    {filtered.map((product, i) => (
                        <ProductCard key={product._id} product={product} delay={`${i * 0.05}s`} />
                    ))}
                </Grid>
            )}
        </Page>
    );
};

export default Menu;
