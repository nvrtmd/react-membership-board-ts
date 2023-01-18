import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import StartImg from 'assets/start_img.png';

export const BottomNavBar = () => {
  return (
    <>
      <Wrapper>
        <StartImage src={StartImg} alt="start_image" />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  background-color: #c0c0c0;
  height: ${theme.layout.bottomNavBarHeight};
  position: relative;
`;

const StartImage = styled.img`
  width: 1.5rem;
  margin-right: 3px;
`;
