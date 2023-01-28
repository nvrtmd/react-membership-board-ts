import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Comment } from 'global/types';
import moment from 'moment';

interface CommentItemProps {
  data: Comment;
}

export const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <CommentsWrapper>
      <CommentWriter>{data.comment_writer.member_nickname}</CommentWriter>
      <CommentBody>{data.comment_contents}</CommentBody>
      <CommentUpdatedDate>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</CommentUpdatedDate>
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div`
  background: ${theme.color.lightGrey};
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
  -webkit-box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
  -moz-box-shadow: 4px 4px 0px 0px #808080 inset, -4px -4px 0px 0px #dfdfdf inset;
`;

const CommentWriter = styled.div`
  font-size: 1.2rem;
`;

const CommentBody = styled.div`
  font-size: 1.3rem;
`;

const CommentUpdatedDate = styled.div`
  font-size: 1rem;
`;
