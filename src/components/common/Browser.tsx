import { useState } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Button } from 'components/common/Button';
import MinimizeImg from 'assets/minimize_img.jpg';
import MaximizeImg from 'assets/maximize_img.jpg';
import CloseImg from 'assets/close_img.jpg';
import WindowPageImage from 'assets/window_page_img.png';

interface ControlButtonProps {
  handleControlButtonClick: () => void;
  handleControlButtonMouseOut: () => void;
  isClicked: boolean;
  children: React.ReactNode;
}

export const Browser = () => {
  return (
    <Wrapper>
      <ControlButtons />
      <AddressBar route="board" />
    </Wrapper>
  );
};

interface AddressBarProps {
  route: string;
}

const AddressBar = ({ route }: AddressBarProps) => {
  return (
    <AddressBarWrapper>
      <AddressBarTitle>Address</AddressBarTitle>
      <AddressBarBox>
        <PageImage src={WindowPageImage} alt="window page image" />
        <Address>https://asdf/{route}/</Address>
        <DownButton>▼</DownButton>
      </AddressBarBox>
    </AddressBarWrapper>
  );
};

const ControlButtons = () => {
  const [clickedControlButton, setClickedControlButton] = useState<string>('');

  const handleControlButtonClick = (controlButtonName: string) => {
    setClickedControlButton((prev) => (prev.length > 0 ? '' : controlButtonName));
  };

  const handleControlButtonMouseOut = () => {
    setClickedControlButton('');
  };

  return (
    <ControlButtonsWrapper>
      <ControlButton
        handleControlButtonClick={() => handleControlButtonClick('minimize')}
        handleControlButtonMouseOut={handleControlButtonMouseOut}
        isClicked={clickedControlButton === 'minimize'}
      >
        <MinimizeImage src={MinimizeImg} />
      </ControlButton>
      <ControlButton
        handleControlButtonClick={() => handleControlButtonClick('maximize')}
        handleControlButtonMouseOut={handleControlButtonMouseOut}
        isClicked={clickedControlButton === 'maximize'}
      >
        <ControlButtonImage src={MaximizeImg} />
      </ControlButton>
      <ControlButton
        handleControlButtonClick={() => handleControlButtonClick('close')}
        handleControlButtonMouseOut={handleControlButtonMouseOut}
        isClicked={clickedControlButton === 'close'}
      >
        <ControlButtonImage src={CloseImg} />
      </ControlButton>
    </ControlButtonsWrapper>
  );
};

const ControlButton = ({
  handleControlButtonClick,
  handleControlButtonMouseOut,
  isClicked,
  children,
}: ControlButtonProps) => {
  return (
    <Button
      isClicked={isClicked}
      mouseDownHandler={handleControlButtonClick}
      mouseUpHandler={handleControlButtonClick}
      mouseOutHandler={handleControlButtonMouseOut}
    >
      {children}
    </Button>
  );
};

const Wrapper = styled.div`
  background: #c0c0c0;
  padding: 5px;
  width: 90%;
  height: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -webkit-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
  -moz-box-shadow: 1.5px 1.5px 0px 0px #dfdfdf inset, -1.5px -1.5px 0px 0px #020215 inset;
`;

const ControlButtonsWrapper = styled.div`
  display: flex;
`;

const ControlButtonImage = styled.img`
  width: 1.2rem;
`;

const MinimizeImage = styled(ControlButtonImage)`
  padding: 0.8rem 0 0 0;
`;

const AddressBarWrapper = styled.div`
  border: 1.5px solid #8e8e8e;
  font-family: 'sans-serif';
  font-size: 1rem;
  padding: 0.2rem 0 0.2rem 0.5rem;
  display: flex;
  margin-bottom: 0.4rem;
`;

const AddressBarTitle = styled.div`
  margin-right: 0.5rem;
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
`;

const Address = styled.div`
  width: 100%;
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

const PageImage = styled.img`
  width: 1.2rem;
  margin-right: 0.3rem;
`;
