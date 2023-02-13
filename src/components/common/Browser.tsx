import { useCallback, forwardRef, ForwardedRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Button } from 'components/common/Button';
import MinimizeImg from 'assets/minimize_img.jpg';
import MaximizeImg from 'assets/maximize_img.jpg';
import CloseImg from 'assets/close_img.jpg';
import NextPageImg from 'assets/right_pointer.png';
import PreviousPageImg from 'assets/left_pointer.png';
import WindowPageImg from 'assets/window_page_img.png';

interface BrowserProps {
  children?: React.ReactNode;
}

export const Browser = forwardRef(({ children }: BrowserProps, ref: ForwardedRef<HTMLDivElement>) => {
  const MENUS = ['File', 'Edit', 'View', 'Go', 'Favorite', 'Tools', 'Help'];
  return (
    <Wrapper>
      <TitleBar>
        <Title>
          <PageImage src={WindowPageImg} alt="window page image" />
          {location.href}
        </Title>
        <ControlButtons />
      </TitleBar>
      <MenuBar>
        {MENUS.map((menu, i) => (
          <Menu key={i}>{menu}</Menu>
        ))}
      </MenuBar>
      <AddressBar />
      <Window ref={ref}>{children}</Window>
    </Wrapper>
  );
});

const AddressBar = () => {
  const navigate = useNavigate();
  const handleButtonRestore = useCallback((pageMoveButtonName: string) => {
    switch (pageMoveButtonName) {
      case 'previous':
        navigate(-1);
        break;
      case 'next':
        navigate(1);
        break;
      default:
        break;
    }
  }, []);

  return (
    <AddressBarWrapper>
      <PageMoveButtonsWrapper>
        <Button restoreHandler={() => handleButtonRestore('previous')} type="button">
          <PageMoveButtonImage src={PreviousPageImg} alt="left arrow image" />
        </Button>
        <Button restoreHandler={() => handleButtonRestore('next')} type="button">
          <PageMoveButtonImage src={NextPageImg} alt="right arrow image" />
        </Button>
      </PageMoveButtonsWrapper>
      <AddressBarBox>
        <PageImage src={WindowPageImg} alt="window page image" />
        <Address>{location.href}</Address>
        <DownButton>▼</DownButton>
      </AddressBarBox>
    </AddressBarWrapper>
  );
};

const ControlButtons = () => {
  const navigate = useNavigate();
  return (
    <ControlButtonsWrapper>
      <Button type="button" restoreHandler={() => navigate('/')}>
        <MinimizeImage src={MinimizeImg} />
      </Button>
      <Button type="button">
        <ControlButtonImage src={MaximizeImg} />
      </Button>
      <Button type="button" restoreHandler={() => navigate('/')}>
        <ControlButtonImage src={CloseImg} />
      </Button>
    </ControlButtonsWrapper>
  );
};

const Wrapper = styled.div`
  background: #c0c0c0;
  padding: 5px;
  width: 100%;
  max-width: 70rem;
  height: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -webkit-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -moz-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
`;

const TitleBar = styled.div`
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
  padding: 4px 1px 3px;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${theme.color.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ControlButtonsWrapper = styled.div`
  display: flex;
`;

const PageImage = styled.img`
  width: 1.2rem;
  margin-right: 0.3rem;
`;

const ControlButtonImage = styled.img`
  width: 1.2rem;
`;

const MinimizeImage = styled(ControlButtonImage)`
  padding: 0.8rem 0 0 0;
`;

const MenuBar = styled.div`
  border: 1.5px solid #8e8e8e;
  font-family: 'sans-serif';
  font-size: 0.9rem;
  display: flex;
`;

const Menu = styled.div`
  &:hover {
    box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
    -webkit-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
    -moz-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  }
  min-width: 0;
  padding: 0.1rem 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddressBarWrapper = styled.div`
  border: 1.5px solid #8e8e8e;
  font-family: 'sans-serif';
  font-size: 1rem;
  padding: 0.2rem 0 0.2rem;
  display: flex;
  margin-bottom: 0.4rem;
`;

const PageMoveButtonsWrapper = styled.div`
  display: flex;
`;

const PageMoveButtonImage = styled.img`
  width: 2rem;
`;

const AddressBarBox = styled.div`
  background: ${theme.color.white};
  box-shadow: 2px 2px 0px 0px #020215 inset, -2px -2px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 2px 2px 0px 0px #020215 inset, -2px -2px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 2px 2px 0px 0px #020215 inset, -2px -2px 0px 0px #dfdfdf inset;
  border: none;
  padding: 0.15rem 0 0.15rem 0.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

const Address = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DownButton = styled.div`
  background-color: #c0c0c0;
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  height: 100%;
  font-size: 0.3rem;
  color: #808080;
  box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -webkit-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -moz-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
`;

const Window = styled.div`
  background: ${theme.color.white};
  padding: 0.5rem;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  box-shadow: 3px 3px 0px 0px #595959 inset, -3px -3px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 3px 3px 0px 0px #595959 inset, -3px -3px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 3px 3px 0px 0px #595959 inset, -3px -3px 0px 0px #dfdfdf inset;
`;
