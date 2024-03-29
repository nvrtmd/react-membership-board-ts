import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { BottomNavBar } from 'components/layouts/BottomNavBar';
import { SideNavBar } from 'components/layouts/SideNavBar';
import { theme } from 'styles/theme';

export const Layout = () => {
  return (
    <LayoutWrapper>
      <Main>
        <SideNavBar />
        <Section>
          <Outlet />
        </Section>
      </Main>
      <BottomNavBar />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  position: relative;
`;

const Main = styled.main`
  background-color: #008080;
  height: calc(100vh - ${theme.layout.bottomNavBarHeight});
  display: flex;
`;

const Section = styled.section`
  min-width: 0;
  width: 100%;
`;
