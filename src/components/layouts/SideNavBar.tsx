import { useState, useCallback, memo } from 'react';
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

export const SideNavBar = memo(() => {
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

  const navItemList = [
    {
      name: 'Board',
      image: BoardImg,
      clickHandler: () => handleNavItemClick('Board'),
      isClicked: isClicked('Board'),
      route: '/board/list',
    },
    {
      name: 'My Posts',
      image: DocumentImg,
      clickHandler: () => handleNavItemClick('My Posts'),
      isClicked: isClicked('My Posts'),
      route: '/member/posts',
    },
    {
      name: 'My Page',
      image: CommentImg,
      clickHandler: () => handleNavItemClick('My Page'),
      isClicked: isClicked('My Page'),
      route: '/member/info',
    },
    {
      name: 'Home',
      image: HomeImg,
      clickHandler: () => handleNavItemClick('Home'),
      isClicked: isClicked('Home'),
      route: '/',
    },
    {
      name: 'About',
      image: AboutImg,
      clickHandler: () => handleNavItemClick('About'),
      isClicked: isClicked('About'),
      route: '/about',
    },
  ];

  return (
    <Wrapper>
      {navItemList.map((navItem) => (
        <NavItem
          key={navItem.name}
          name={navItem.name}
          image={navItem.image}
          handleClick={navItem.clickHandler}
          isClicked={navItem.isClicked}
          route={navItem.route}
        />
      ))}
    </Wrapper>
  );
});

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
  @media screen and ${theme.device.mobile}, (max-height: 400px) {
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
  @media screen and ${theme.device.long} {
    font-size: 0.8rem;
  }

  @media screen and (max-height: ${theme.heightBreakpoint.medium}) {
    font-size: 0.5rem;
  }

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
  @media screen and ${theme.device.long} {
    width: 2rem;
  }

  @media screen and (max-height: ${theme.heightBreakpoint.medium}) {
    width: 1rem;
  }

  width: 3.5rem;
  ${({ isClicked }) =>
    isClicked &&
    `
   opacity: 0.5; 
  `}
`;
