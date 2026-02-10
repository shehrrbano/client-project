import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ $fullPage }) => ($fullPage ? 'calc(100vh - 72px)' : '200px')};
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 3px solid ${({ theme }) => theme.colors.surfaceLight};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Loader = ({ text = 'Loading...', fullPage = false }) => (
    <Wrap $fullPage={fullPage}>
        <Spinner />
        <Text>{text}</Text>
    </Wrap>
);

export default Loader;
