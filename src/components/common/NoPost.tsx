import styled from 'styled-components/macro';
import NoPostImg from 'assets/no_post_img.png';

export const NoPost = () => {
  return (
    <NoCommentWrapper>
      <NoCommentImage src={NoPostImg} />
      <div>No Post</div>
    </NoCommentWrapper>
  );
};

const NoCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const NoCommentImage = styled.img`
  width: 20%;
`;
