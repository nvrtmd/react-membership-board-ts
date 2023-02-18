import { useState, useEffect, useCallback, useRef, memo } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import StartImg from 'assets/start_img.png';
import { PushLockButton } from 'components/common/PushLockButton';
import { Menu } from './Menu';
import { Clock } from './Clock';

export const BottomNavBar = memo(() => {
  const [isPushed, setIsPushed] = useState<boolean>(false);
  const startButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleStartButtonClick = useCallback(() => {
    setIsPushed((prev) => !prev);
  }, []);

  const handleNonMenuAreaClick = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (
      isPushed &&
      startButtonRef.current &&
      !startButtonRef.current.contains(target) &&
      menuRef.current &&
      !menuRef.current.contains(target)
    ) {
      setIsPushed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e: Event) => handleNonMenuAreaClick(e));
    return () => {
      document.removeEventListener('mousedown', handleNonMenuAreaClick);
    };
  }, [isPushed]);

  return (
    <>
      {isPushed && <Menu menuRef={menuRef} startButtonClickHandler={handleStartButtonClick} />}
      <Wrapper>
        <PushLockButton
          isPushed={isPushed}
          name="Start"
          buttonRef={startButtonRef}
          clickHandler={handleStartButtonClick}
        >
          <StartImage src={StartImg} alt="start_image" />
        </PushLockButton>
        <Clock />
      </Wrapper>
    </>
  );
});

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  background-color: #c0c0c0;
  height: ${theme.layout.bottomNavBarHeight};
`;

const StartImage = styled.img`
  width: 1.5rem;
  margin-right: 3px;
`;
