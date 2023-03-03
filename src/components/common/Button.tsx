import { useState, memo } from 'react';
import styled from 'styled-components/macro';

interface ButtonProps {
  restoreHandler?: () => void;
  name?: string;
  children?: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
}

interface ButtonWrapperProps {
  isPushed: boolean;
  isDisabled?: boolean;
}

export const Button = memo(({ restoreHandler, name, children, type, isDisabled }: ButtonProps) => {
  const [isPushed, setIsPushed] = useState<boolean>(false);

  const handleButtonPush = () => {
    setIsPushed(true);
  };

  const handleButtonRestore = () => {
    if (restoreHandler) {
      restoreHandler();
    }
    setIsPushed(false);
  };

  const handleButtonMouseOut = () => {
    setIsPushed(false);
  };

  return (
    <ButtonWrapper
      isPushed={isPushed}
      onMouseDown={handleButtonPush}
      onMouseUp={handleButtonRestore}
      onMouseOut={handleButtonMouseOut}
      type={type}
      disabled={isDisabled}
    >
      {children}
      {name}
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background-color: #c0c0c0;
  display: flex;
  align-items: center;
  padding: 5px 7px;
  font-family: DungGeunMo;
  font-size: 1.4rem;
  outline: none;
  resize: none;
  border: none;
  box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  -webkit-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  -moz-box-shadow: 3px 3px 0px 0px #dfdfdf inset, -3px -3px 0px 0px #808080 inset;
  ${({ disabled }) =>
    disabled &&
    `
    box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
    -webkit-box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
    -moz-box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
  `}
  ${({ isPushed }) =>
    isPushed &&
    `
    box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
    -webkit-box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
    -moz-box-shadow: 3px 3px 0px 0px #020215 inset, -3px -3px 0px 0px #dfdfdf inset;
  `}
`;
