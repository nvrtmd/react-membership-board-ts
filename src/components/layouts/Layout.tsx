import { memo } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { BottomNavBar } from 'components/layouts/BottomNavBar';
import { SideNavBar } from './SideNavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <>
      <Main>
        <SideNavBar />
        <Section>{children}</Section>
      </Main>
      <BottomNavBar />
    </>
  );
});

const Main = styled.main`
  background-color: #008080;
  height: calc(100vh - ${theme.layout.bottomNavBarHeight});
  display: flex;
`;

const Section = styled.section`
  min-width: 0;
  width: 100%;
`;
