import { useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'components/common/Button';
import MinimizeImg from 'assets/minimize_img.jpg';
import MaximizeImg from 'assets/maximize_img.jpg';
import CloseImg from 'assets/close_img.jpg';

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
    </Wrapper>
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
