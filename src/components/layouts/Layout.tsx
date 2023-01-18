import { memo } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { BottomNavBar } from 'components/layouts/BottomNavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <>
      <Main>{children}</Main>
      <BottomNavBar />
    </>
  );
});

const Main = styled.main`
  background-color: #008080;
  height: calc(100vh - ${theme.layout.bottomNavBarHeight});
  display: flex;
`;
