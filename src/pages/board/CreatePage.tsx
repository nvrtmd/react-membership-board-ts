import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { TextArea } from 'components/common/TextArea';
import { useInput } from 'hooks/useInput';

export const CreatePage = () => {
  const { inputValue: title, handleInputChange: handleTitleChange } = useInput();
  const { inputValue: contents, handleInputChange: handleContentsChange } = useInput();

  const handleSignUpFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title, contents);
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <PostFormWrapper>
            <PostForm onSubmit={handleSignUpFormSubmit}>
              <PageTitle>- Create Post -</PageTitle>
              <Input
                name="title"
                type="title"
                value={title}
                changeHandler={handleTitleChange}
                placeholder="Write your title"
              />
              <ContentsWrapper>
                <TextArea
                  placeholder="Write your contents"
                  name="comment"
                  changeHandler={handleContentsChange}
                  value={contents}
                />
              </ContentsWrapper>
              <ButtonWrapper>
                <Button name="Create" type="submit" />
              </ButtonWrapper>
            </PostForm>
          </PostFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
const PostFormWrapper = styled.div`
  min-height: 100%;
  display: flex;
`;

const PostForm = styled.form`
  width: 100%;
  padding: 2rem 1.5rem;
`;

const PageTitle = styled.div`
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
  justify-content: center;
  padding: 2rem;
`;
