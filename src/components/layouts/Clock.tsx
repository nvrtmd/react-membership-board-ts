import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components/macro';
import SchedulerImg from 'assets/scheduler_img.png';

export const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const schedulerImage = useMemo(() => <SchedulerImage src={SchedulerImg} />, []);

  return (
    <ClockWrapper>
      {schedulerImage}
      {time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </ClockWrapper>
  );
};

const ClockWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 9px 2px 4px;
  box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 3px 3px 0px 0px #808080 inset, -3px -3px 0px 0px #dfdfdf inset;
  @media screen and (max-width: 170px) {
    display: none;
  }
`;

const SchedulerImage = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 5px;
`;
