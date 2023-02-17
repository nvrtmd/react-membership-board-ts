import { useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import BoardImg from 'assets/internet_img.png';
import DocumentImg from 'assets/document_img.png';
import CommentImg from 'assets/comment_img.png';
import AboutImg from 'assets/about_img.png';
import HomeImg from 'assets/home_img.png';

interface NavItemProps {
  name: string;
  image: string;
  handleClick: () => void;
  isClicked: boolean;
  route: string;
}

interface NavItemContentProps {
  isClicked: boolean;
}

export const SideNavBar = () => {
  const [clickedNavItem, setClickedNavItem] = useState('');

  const handleNavItemClick = useCallback((navItemName: string) => {
    setClickedNavItem(navItemName);
  }, []);

  const isClicked = (name: string) => {
    switch (name) {
      case name:
        return clickedNavItem === name;
      default:
        return false;
    }
  };

  return (
    <Wrapper>
      <NavItem
        name="Board"
        image={BoardImg}
        handleClick={() => handleNavItemClick('Board')}
        isClicked={isClicked('Board')}
        route="/board/list"
      />
      <NavItem
        name="My Posts"
        image={DocumentImg}
        handleClick={() => handleNavItemClick('My Posts')}
        isClicked={isClicked('My Posts')}
        route="/member/posts"
      />
      <NavItem
        name="My Page"
        image={CommentImg}
        handleClick={() => handleNavItemClick('My Page')}
        isClicked={isClicked('My Page')}
        route="/member/info"
      />
      <NavItem
        name="Home"
        image={HomeImg}
        handleClick={() => handleNavItemClick('Home')}
        isClicked={isClicked('Home')}
        route="/"
      />
      <NavItem
        name="About"
        image={AboutImg}
        handleClick={() => handleNavItemClick('About')}
        isClicked={isClicked('About')}
        route="/about"
      />
    </Wrapper>
  );
};

const NavItem = ({ name, image, handleClick, isClicked, route }: NavItemProps) => {
  const navigate = useNavigate();

  const handleDoubleClick = useCallback(() => {
    navigate(route);
  }, []);

  return (
    <NavItemBox onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <NavItemImage src={image} isClicked={isClicked} />
      <NavItemName isClicked={isClicked}>{name}</NavItemName>
    </NavItemBox>
  );
};

const Wrapper = styled.nav`
  @media screen and ${theme.device.mobile} {
    display: none;
  }
  padding: 1rem;
`;

const NavItemBox = styled.div`
  padding: 0.3rem 0;
  text-align: center;
  margin: 1rem 0;
`;

const NavItemName = styled.div<NavItemContentProps>`
  font-size: 1.2rem;
  font-family: 'sans-serif';
  color: ${theme.color.white};
  border: solid 0.2px transparent;
  white-space: nowrap;
  ${({ isClicked }) =>
    isClicked &&
    `
    background: #000080;
    border: dashed 0.2px #f9fb8f;
    `}
`;

const NavItemImage = styled.img<NavItemContentProps>`
  width: 3.5rem;
  ${({ isClicked }) =>
    isClicked &&
    `
   opacity: 0.5; 
  `}
`;
