import styled from 'styled-components/macro';
import NoPostImg from 'assets/no_post_img.png';

export const NoPost = () => {
  return (
    <NoPostWrapper>
      <NoPostImage src={NoPostImg} />
      <div>No Post</div>
    </NoPostWrapper>
  );
};

const NoPostWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const NoPostImage = styled.img`
  width: 30%;
  max-width: 35%;
  min-width: 20%;
`;
