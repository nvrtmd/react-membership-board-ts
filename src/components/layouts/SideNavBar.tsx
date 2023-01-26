import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import BoardImg from 'assets/internet_img.png';
import DocumentImg from 'assets/document_img.png';
import CommentImg from 'assets/comment_img.png';

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

  const handleNavItemClick = (navItemName: string) => {
    setClickedNavItem(navItemName);
  };

  return (
    <Wrapper>
      <NavItem
        name="Board"
        image={BoardImg}
        handleClick={() => handleNavItemClick('Board')}
        isClicked={clickedNavItem === 'Board'}
        route="/board/list"
      />
      <NavItem
        name="My Documents"
        image={DocumentImg}
        handleClick={() => handleNavItemClick('My Documents')}
        isClicked={clickedNavItem === 'My Documents'}
        route="/"
      />
      <NavItem
        name="My Comments"
        image={CommentImg}
        handleClick={() => handleNavItemClick('My Comments')}
        isClicked={clickedNavItem === 'My Comments'}
        route="/"
      />
    </Wrapper>
  );
};

const NavItem = ({ name, image, handleClick, isClicked, route }: NavItemProps) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(route);
  };

  return (
    <NavItemBox onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <NavItemImage src={image} isClicked={isClicked} />
      <NavItemName isClicked={isClicked}>{name}</NavItemName>
    </NavItemBox>
  );
};

const Wrapper = styled.nav`
  padding: 1rem;
`;

const NavItemBox = styled.div`
  padding: 0.3rem 0;
  text-align: center;
`;

const NavItemName = styled.div<NavItemContentProps>`
  font-size: 0.8rem;
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
  width: 3rem;
  ${({ isClicked }) =>
    isClicked &&
    `
   opacity: 0.5; /* 50% opacity */
  `}
`;
