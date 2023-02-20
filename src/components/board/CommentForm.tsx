import { useMemo } from 'react';
import styled from 'styled-components/macro';
import { TextArea } from 'components/common/TextArea';
import { Button } from 'components/common/Button';
import { BOARD_PLACEHOLDER } from 'constants/constants';
import CommentImg from 'assets/comment.png';

interface CommentFormProps {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  commentValue: string | number;
  commentChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formTitle?: string;
  type?: string;
  commentModifyCancelHandler?: () => void;
  isDisabled?: boolean;
}

export const CommentForm = ({
  submitHandler,
  commentChangeHandler,
  commentValue,
  formTitle,
  type,
  commentModifyCancelHandler,
  isDisabled,
}: CommentFormProps) => {
  const formHeader = useMemo(
    () =>
      formTitle && (
        <FormTitle>
          <CommentImage src={CommentImg} /> {formTitle}
        </FormTitle>
      ),
    [],
  );

  const formFooter = useMemo(
    () => (
      <ButtonWrapper>
        {type === 'commentModifyForm' && (
          <Button name="Cancel" type="button" restoreHandler={commentModifyCancelHandler} />
        )}
        <Button name="Write" type="submit" isDisabled={isDisabled} />
      </ButtonWrapper>
    ),
    [isDisabled],
  );

  return (
    <Form onSubmit={submitHandler}>
      {formHeader}
      <ContentsWrapper>
        <TextArea
          placeholder={BOARD_PLACEHOLDER.WRITE_YOUR_COMMENT}
          name="comment"
          changeHandler={commentChangeHandler}
          value={commentValue}
          isDisabled={isDisabled}
          isComment={true}
        />
      </ContentsWrapper>
      {formFooter}
    </Form>
  );
};

const Form = styled.form`
  margin-bottom: 2.5rem;
`;

const FormTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const CommentImage = styled.img`
  width: 2rem;
  margin-right: 0.3rem;
`;

const ContentsWrapper = styled.div`
  height: 6.5rem;
  margin-bottom: 0.8rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
