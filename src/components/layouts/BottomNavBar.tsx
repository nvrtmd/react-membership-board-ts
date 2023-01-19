import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import StartImg from 'assets/start_img.png';
import { Button } from 'components/common/Button';
import { Menu } from './Menu';

export const BottomNavBar = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const startButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleStartButtonClick = useCallback(() => {
    setIsClicked((prev) => !prev);
  }, []);

  const handleNonMenuAreaClick = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (isClicked && startButtonRef.current && !startButtonRef.current.contains(target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e: Event) => handleNonMenuAreaClick(e));
    return () => {
      document.removeEventListener('mousedown', handleNonMenuAreaClick);
    };
  }, [isClicked]);

  return (
    <>
      {isClicked && <Menu menuRef={menuRef} />}
      <Wrapper>
        <Button isClicked={isClicked} name="Start" buttonRef={startButtonRef} clickHandler={handleStartButtonClick}>
          <StartImage src={StartImg} alt="start_image" />
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  background-color: #c0c0c0;
  height: ${theme.layout.bottomNavBarHeight};
  position: relative;
`;

const StartImage = styled.img`
  width: 1.5rem;
  margin-right: 3px;
`;
