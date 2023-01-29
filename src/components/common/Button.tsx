import { useState, memo } from 'react';
import styled from 'styled-components/macro';

interface ButtonProps {
  pushHandler?: () => void;
  restoreHandler?: () => void;
  name?: string;
  buttonRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

interface ButtonWrapperProps {
  isPushed: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

export const Button = memo(({ pushHandler, restoreHandler, name, buttonRef, children }: ButtonProps) => {
  const [isPushed, setIsPushed] = useState<boolean>(false);

  const handleButtonPush = () => {
    if (pushHandler) {
      pushHandler();
    }
    setIsPushed(true);
  };
  const handleButtonRestore = () => {
    if (restoreHandler) {
      restoreHandler();
    }
    setIsPushed(false);
  };

  return (
    <ButtonWrapper
      isPushed={isPushed}
      onMouseDown={handleButtonPush}
      onMouseUp={handleButtonRestore}
      onMouseOut={handleButtonRestore}
      ref={buttonRef}
    >
      {children}
      {name}
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  background-color: #c0c0c0;
  display: flex;
  align-items: center;
  padding: 2px 5.5px;
  box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  -webkit-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  -moz-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  ${({ isPushed }) =>
    isPushed &&
    `
    box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
    -webkit-box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
    -moz-box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
  `}
`;
