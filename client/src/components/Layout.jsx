import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const Layout = () => (
    <Main>
        <Navbar />
        <Content><Outlet /></Content>
        <Footer />
    </Main>
);

export default Layout;
