import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
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
  background: ${theme.color.lightGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem 0 1rem;
  box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
`;

const NoCommentImage = styled.img`
  width: 20%;
`;
