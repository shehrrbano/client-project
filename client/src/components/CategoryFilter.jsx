import styled from 'styled-components';

const FilterWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Pill = styled.button`
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.bgDark : theme.colors.textSecondary)};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.border)};
  transition: all ${({ theme }) => theme.transition.fast};
  text-transform: capitalize;
  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.colors.accentHover : theme.colors.surfaceLight)};
    color: ${({ $active, theme }) => ($active ? theme.colors.bgDark : theme.colors.textPrimary)};
  }
`;

const categories = ['all', 'burgers', 'grilled', 'wraps', 'sides', 'drinks', 'desserts'];

const CategoryFilter = ({ active, onChange }) => (
    <FilterWrap>
        {categories.map(cat => (
            <Pill key={cat} $active={active === cat} onClick={() => onChange(cat)}>
                {cat}
            </Pill>
        ))}
    </FilterWrap>
);

export default CategoryFilter;
