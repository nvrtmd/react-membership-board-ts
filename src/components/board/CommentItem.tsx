import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import { Comment, CustomError } from 'global/types';
import moment from 'moment';
import { CommentForm } from 'components/board/CommentForm';
import { useInput } from 'hooks/useInput';
import { auth } from 'api/auth';
import { board } from 'api/board';

interface CommentItemProps {
  data: Comment;
  isCommentWriter: boolean;
  commentListRefreshHandler: () => void;
}

export const CommentItem = ({ data, isCommentWriter, commentListRefreshHandler }: CommentItemProps) => {
  const [isModifyButtonClicked, setIsModifyButtonClicked] = useState<boolean>(false);
  const { inputValue: modifiedComment, handleInputChange: handleModifiedCommentChange } = useInput(
    data.comment_contents,
  );
  const params = useParams();

  const handleIsModifyButtonClickedToggle = () => {
    setIsModifyButtonClicked((prev) => !prev);
  };

  const handleCommentModifyFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.isSignedIn();
      if (modifiedComment.length <= 0) {
        alert('내용을 작성하세요.');
        return;
      }
      if (params.postIdx) {
        await board.modifyComment(params.postIdx, data.comment_idx, { contents: modifiedComment });
        commentListRefreshHandler();
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
    handleIsModifyButtonClickedToggle();
  };

  const handleCommentDeleteButtonClick = async () => {
    try {
      await auth.isSignedIn();
      if (confirm('댓글을 삭제하시겠습니까?')) {
        if (params.postIdx) {
          await board.deleteComment(params.postIdx, data.comment_idx);
          commentListRefreshHandler();
        }
      } else {
        return;
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
  };

  return (
    <CommentsWrapper>
      <CommentWriter>{data.comment_writer.member_nickname}</CommentWriter>
      {isModifyButtonClicked ? (
        <CommentForm
          submitHandler={handleCommentModifyFormSubmit}
          commentValue={modifiedComment}
          commentChangeHandler={handleModifiedCommentChange}
          type="commentModifyForm"
          commentModifyCancelHandler={handleIsModifyButtonClickedToggle}
        />
      ) : (
        <>
          <CommentBody>{data.comment_contents}</CommentBody>
          <CommentInfo>
            <CommentUpdatedDate>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</CommentUpdatedDate>
            {isCommentWriter && (
              <FunctionButtons>
                <FunctionButton onClick={handleIsModifyButtonClickedToggle}>Modify</FunctionButton>&nbsp;
                <FunctionButton onClick={handleCommentDeleteButtonClick}>Delete</FunctionButton>
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
