import styled from 'styled-components/macro';
import { TextArea } from 'components/common/TextArea';
import CommentImg from 'assets/comment.png';
import { Button } from 'components/common/Button';

interface CommentFormProps {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  commentValue: string | number;
  commentChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formTitle?: string;
  type?: string;
  commentModifyCancelHandler?: () => void;
}

export const CommentForm = ({
  submitHandler,
  commentChangeHandler,
  commentValue,
  formTitle,
  type,
  commentModifyCancelHandler,
}: CommentFormProps) => {
  return (
    <Form onSubmit={submitHandler}>
      {formTitle && (
        <FormTitle>
          <CommentImage src={CommentImg} /> {formTitle}
        </FormTitle>
      )}
      <ContentsWrapper>
        <TextArea
          placeholder="Write your comment"
          name="comment"
          changeHandler={commentChangeHandler}
          value={commentValue}
        />
      </ContentsWrapper>
      <ButtonWrapper>
        {type === 'commentModifyForm' && (
          <Button name="Cancel" type="button" restoreHandler={commentModifyCancelHandler} />
        )}
        <Button name="Submit" type="submit" />
      </ButtonWrapper>
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
