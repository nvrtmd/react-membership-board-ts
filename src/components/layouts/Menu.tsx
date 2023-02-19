import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { auth } from 'apis/auth';
import { theme } from 'styles/theme';
import { AUTH_ALERT_MESSAGE } from 'constants/constants';
import { CustomError } from 'global/types';
import PowerImg from 'assets/power_img.png';
import SourceCodeImg from 'assets/source_code_img.png';
import SignupImg from 'assets/sign_up_img.png';
import SigninImg from 'assets/sign_in_img.png';
import BoardImg from 'assets/internet_img.png';
import DocumentImg from 'assets/document_img.png';
import CommentImg from 'assets/comment_img.png';
import AboutImg from 'assets/about_img.png';
import HomeImg from 'assets/home_img.png';

interface MenuProps {
  menuRef: React.RefObject<HTMLDivElement>;
  startButtonClickHandler: () => void;
}

export const Menu = ({ menuRef, startButtonClickHandler }: MenuProps) => {
  const navigate = useNavigate();
  const [isCurrentUserSignedIn, setIsCurrentUserSignedIn] = useState<boolean>();

  const handleShutdownMenuClick = useCallback((): void => {
    window.close();
  }, []);

  const handleSignOutMenuClick = useCallback(async () => {
    try {
      await auth.signOut();
      alert(AUTH_ALERT_MESSAGE.SIGN_OUT_ALERT);
      startButtonClickHandler();
      navigate('/');
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
  }, []);

  const confirmCurrentUserSignedInState = async () => {
    try {
      await auth.isSignedIn();
      setIsCurrentUserSignedIn(true);
    } catch {
      setIsCurrentUserSignedIn(false);
    }
  };

  useEffect(() => {
    confirmCurrentUserSignedInState();
  }, []);

  return useMemo(
    () => (
      <MenuContainer ref={menuRef}>
        <MenuTitle>Yuzamin97</MenuTitle>
        <MenuWrapper>
          <OptionalMenuBox onClick={() => navigate('/board/list')}>
            <MenuImage src={BoardImg} />
            <div>Board</div>
          </OptionalMenuBox>
          {isCurrentUserSignedIn ? (
            <>
              <OptionalMenuBox onClick={() => navigate('/member/posts')}>
                <MenuImage src={DocumentImg} />
                <div>My Posts</div>
              </OptionalMenuBox>
              <OptionalMenuBox onClick={() => navigate('/member/info')}>
                <MenuImage src={CommentImg} />
                <div>My Page</div>
              </OptionalMenuBox>
              <DefaultMenuBox onClick={handleSignOutMenuClick}>
                <MenuImage src={SigninImg} />
                <div>Sign Out</div>
              </DefaultMenuBox>
            </>
          ) : (
            <>
              <DefaultMenuBox onClick={() => navigate('/auth/signup')}>
                <SignupImage src={SignupImg} />
                <div>Sign Up</div>
              </DefaultMenuBox>
              <DefaultMenuBox onClick={() => navigate('/auth/signin')}>
                <MenuImage src={SigninImg} />
                <div>Sign In</div>
              </DefaultMenuBox>
            </>
          )}
          <OptionalMenuWrapper>
            <OptionalMenuBox onClick={() => navigate('/')}>
              <MenuImage src={HomeImg} />
              <div>Home</div>
            </OptionalMenuBox>
            <OptionalMenuBox onClick={() => navigate('/about')}>
              <MenuImage src={AboutImg} />
              <div>About</div>
            </OptionalMenuBox>
            <DefaultMenuBox>
              <MenuImage src={SourceCodeImg} alt="source_code_image" />
              <a href="https://github.com/nvrtmd/react-membership-board-ts" target="_blank">
                Source Code
              </a>
            </DefaultMenuBox>
            <DefaultMenuBox onClick={handleShutdownMenuClick}>
              <MenuImage src={PowerImg} />
              <div>Shut Down</div>
            </DefaultMenuBox>
          </OptionalMenuWrapper>
        </MenuWrapper>
      </MenuContainer>
    ),
    [isCurrentUserSignedIn],
  );
};

const MenuContainer = styled.div`
  @media screen and (max-height: ${theme.heightBreakpoint.short}) {
    font-size: 0.9rem;
  }

  @media screen and ${theme.device.narrow} {
    font-size: 0.5rem;
  }

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

const DefaultMenuBox = styled.div`
  padding: 10px 13px;
  display: flex;
  align-items: center;
  border: 1px black solid;
  &:hover {
    background: ${theme.color.navy};
    color: ${theme.color.white};
  }
  &:hover > a {
    cursor: url('https://user-images.githubusercontent.com/67324487/215111447-c34d9bfb-4914-4f4b-a636-e3b7ac6757a8.png'),
      auto;
  }
`;

const OptionalMenuBox = styled(DefaultMenuBox)`
  @media screen and (min-width: ${theme.breakpoint.mobile}) {
    display: none !important;
  }
`;

const MenuImage = styled.img`
  @media screen and (max-height: ${theme.heightBreakpoint.short}) {
    width: 1rem;
    height: 1rem;
  }

  @media screen and ${theme.device.narrow} {
    width: 0.8rem;
    height: 0.8rem;
  }

  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
`;

const SignupImage = styled(MenuImage)`
  @media screen and ${theme.device.narrow} {
    width: 0.8rem;
    height: 0.8rem;
  }

  width: 1.5rem;
  height: 1rem;
  margin-right: 1rem;
`;

const OptionalMenuWrapper = styled.div`
  @media screen and ${theme.device.extraShort} {
    display: none;
  }
`;
