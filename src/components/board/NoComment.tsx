import styled from 'styled-components/macro';
import NoCommentImg from 'assets/no_comment.png';

export const NoComment = () => {
  return (
    <NoCommentWrapper>
      <NoCommentImage src={NoCommentImg} />
      <div>No Comment</div>
    </NoCommentWrapper>
  );
};

const NoCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem 0 1rem;
`;

const NoCommentImage = styled.img`
  width: 20%;
`;
