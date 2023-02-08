import styled from 'styled-components/macro';
import { TextArea } from 'components/common/TextArea';
import CommentImg from 'assets/comment.png';
import { Button } from 'components/common/Button';

interface CommentFormProps {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  commentValue: string | number;
  commentChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CommentForm = ({ submitHandler, commentChangeHandler, commentValue }: CommentFormProps) => {
  return (
    <Form onSubmit={submitHandler}>
      <FormTitle>
        <CommentImage src={CommentImg} /> Comments
      </FormTitle>
      <ContentsWrapper>
        <TextArea
          placeholder="Write your comment"
          name="comment"
          changeHandler={commentChangeHandler}
          value={commentValue}
        />
      </ContentsWrapper>
      <ButtonWrapper>
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
