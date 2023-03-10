import { useMemo } from 'react';
import styled from 'styled-components/macro';
import { Input } from 'components/common/Input';
import { TextArea } from 'components/common/TextArea';
import { Button } from 'components/common/Button';
import { BOARD_PLACEHOLDER } from 'constants/constants';

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
  const formHeader = useMemo(() => <FormTitle>{formTitle}</FormTitle>, []);
  const formFooter = useMemo(
    () => (
      <ButtonWrapper>
        <Button name="Create" type="submit" />
        <Button name="Cancel" type="button" restoreHandler={cancelButtonClickHandler} />
      </ButtonWrapper>
    ),
    [],
  );
  return (
    <Form onSubmit={submitHandler}>
      {formHeader}
      <Input
        name="title"
        type="title"
        value={titleValue}
        changeHandler={titleChangeHandler}
        placeholder={BOARD_PLACEHOLDER.WRITE_YOUR_TITLE}
      />
      {useMemo(
        () => (
          <ContentsWrapper>
            <TextArea
              placeholder={BOARD_PLACEHOLDER.WRITE_YOUR_CONTENTS}
              name="contents"
              changeHandler={contentsChangeHandler}
              value={contentsValue}
            />
          </ContentsWrapper>
        ),
        [contentsValue],
      )}
      {formFooter}
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
