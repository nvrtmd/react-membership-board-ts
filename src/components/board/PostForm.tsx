import styled from 'styled-components/macro';
import { Input } from 'components/common/Input';
import { TextArea } from 'components/common/TextArea';
import { Button } from 'components/common/Button';

interface PostFormProps {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  formTitle?: string;
  titleValue: string;
  titleChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  contentsValue: string;
  contentsChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  cancelButtonClickHandler: () => void;
}

export const PostForm = ({
  submitHandler,
  formTitle,
  titleValue,
  titleChangeHandler,
  contentsValue,
  contentsChangeHandler,
  cancelButtonClickHandler,
}: PostFormProps) => {
  return (
    <Form onSubmit={submitHandler}>
      <FormTitle>{formTitle}</FormTitle>
      <Input
        name="title"
        type="title"
        value={titleValue}
        changeHandler={titleChangeHandler}
        placeholder="Write your title"
      />
      <ContentsWrapper>
        <TextArea
          placeholder="Write your contents"
          name="comment"
          changeHandler={contentsChangeHandler}
          value={contentsValue}
        />
      </ContentsWrapper>
      <ButtonWrapper>
        <Button name="Create" type="submit" />
        <Button name="Cancel" type="button" restoreHandler={cancelButtonClickHandler} />
      </ButtonWrapper>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  padding: 2rem 1.5rem;
`;

const FormTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin: 0.5rem 0 1rem;
`;

const ContentsWrapper = styled.div`
  margin-top: 1.5rem;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
