import { memo } from 'react';
import styled from 'styled-components/macro';

interface PushLockButtonProps {
  isPushed: boolean;
  clickHandler?: () => void;
  mouseDownHandler?: () => void;
  mouseUpHandler?: () => void;
  mouseOutHandler?: () => void;
  name?: string;
  buttonRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

interface PushLockButtonWrapperProps {
  isPushed: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

export const PushLockButton = memo(
  ({
    isPushed,
    clickHandler,
    mouseDownHandler,
    mouseUpHandler,
    mouseOutHandler,
    name,
    buttonRef,
    children,
  }: PushLockButtonProps) => {
    return (
      <PushLockButtonWrapper
        isPushed={isPushed}
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseOut={mouseOutHandler}
        ref={buttonRef}
      >
        {children}
        {name}
      </PushLockButtonWrapper>
    );
  },
);

const PushLockButtonWrapper = styled.div<PushLockButtonWrapperProps>`
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
