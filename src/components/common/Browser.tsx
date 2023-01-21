import styled from 'styled-components/macro';
import { Button } from 'components/common/Button';

export const Browser = () => {
  return <Wrapper></Wrapper>;
};

interface ControlButtonProps {
  handleControlButtonClick: () => void;
  handleControlButtonMouseOut: () => void;
  isClicked: boolean;
  children: React.ReactNode;
}

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
