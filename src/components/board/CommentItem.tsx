import styled from 'styled-components/macro';
import { Comment } from 'global/types';

interface CommentItemProps {
  data: Comment;
}

export const CommentItem = ({ data }: CommentItemProps) => {
  return <CommentsWrapper>{data.comment_contents}</CommentsWrapper>;
};

const CommentsWrapper = styled.div`
  background: red;
`;
