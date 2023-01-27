import { memo } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import PowerImg from 'assets/power_img.png';
import SourceCodeImg from 'assets/source_code_img.png';
import SignupImg from 'assets/sign_up_img.png';
import SigninImg from 'assets/sign_in_img.png';

interface MenuProps {
  menuRef: React.RefObject<HTMLDivElement>;
}

export const Menu = memo(({ menuRef }: MenuProps) => {
  const handleShutdownMenuClick = (): void => {
    window.close();
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuTitle>Yuzamin97</MenuTitle>
      <MenuWrapper>
        <MenuBox>
          <MenuImage src={SourceCodeImg} alt="source_code_image" />
          <a href="https://github.com/nvrtmd/react-membership-board" target="_blank">
            Source Code
          </a>
        </MenuBox>
        <MenuBox>
          <SignupImage src={SignupImg} />
          <div>Sign Up</div>
        </MenuBox>
        <MenuBox>
          <MenuImage src={SigninImg} />
          <div>Sign In</div>
        </MenuBox>
        <MenuBox onClick={handleShutdownMenuClick}>
          <MenuImage src={PowerImg} />
          <div>Shut Down</div>
        </MenuBox>
      </MenuWrapper>
    </MenuContainer>
  );
});

const MenuContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: ${theme.layout.bottomNavBarHeight};
  left: 5px;
  z-index: 100000;
  background-color: #c0c0c0;
  box-shadow: -1.5px -1.5px 0px 0px #000000 inset, 1.5px 1.5px 0px 0px #ffffff inset;
  -webkit-box-shadow: -1.5px -1.5px 0px 0px #000000 inset, 1.5px 1.5px 0px 0px #ffffff inset;
  -moz-box-shadow: -1.5px -1.5px 0px 0px #000000 inset, 1.5px 1.5px 0px 0px #ffffff inset;
`;

const MenuTitle = styled.div`
  background-color: #0000aa;
  writing-mode: vertical-rl;
  transform: scaleY(-1) scaleX(-1);
  color: ${theme.color.white};
  padding: 10px 0;
`;

const MenuWrapper = styled.div``;

const MenuBox = styled.div`
  padding: 10px 13px;
  display: flex;
  align-items: center;
  border: 1px black solid;
  &:hover {
    background: ${theme.color.navy};
  }
`;

const MenuImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

const SignupImage = styled.img`
  width: 1.5rem;
  height: 1rem;
  margin-right: 1rem;
`;
