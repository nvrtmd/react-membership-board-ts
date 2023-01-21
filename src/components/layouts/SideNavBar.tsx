import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import BoardImg from 'assets/internet_img.png';
import DocumentImg from 'assets/document_img.png';
import CommentImg from 'assets/comment_img.png';

export const SideNavBar = () => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

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

const NavItem = ({ name, image, handleClick, isClicked, route }: NavItemProps) => {
  return (
    <NavItemBox onClick={handleClick}>
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
