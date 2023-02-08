import { useState } from 'react';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Comment } from 'global/types';
import moment from 'moment';

interface CommentItemProps {
  data: Comment;
  isCommentWriter: boolean;
}

export const CommentItem = ({ data, isCommentWriter }: CommentItemProps) => {
  const [isModifyButtonClicked, setIsModifyButtonClicked] = useState<boolean>(false);

  const handleModifyButtonClick = () => {
    setIsModifyButtonClicked((prev) => !prev);
  };

  return (
    <CommentsWrapper>
      <CommentWriter>{data.comment_writer.member_nickname}</CommentWriter>
      {isModifyButtonClicked ? (
        <div>modify mode on</div>
      ) : (
        <>
          <CommentBody>{data.comment_contents}</CommentBody>
          <CommentInfo>
            <CommentUpdatedDate>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</CommentUpdatedDate>
            {isCommentWriter && (
              <FunctionButtons>
                <FunctionButton onClick={handleModifyButtonClick}>Modify</FunctionButton>&nbsp;
                <FunctionButton>Delete</FunctionButton>
              </FunctionButtons>
            )}
          </CommentInfo>
        </>
      )}
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

const CommentInfo = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
`;

const CommentUpdatedDate = styled.div``;

const FunctionButtons = styled.div`
  display: flex;
`;

const FunctionButton = styled.div`
  cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
    auto;
  &:hover {
    text-decoration: underline;
  }
`;
