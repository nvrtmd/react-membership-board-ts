import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { Input } from 'components/common/Input';
import { Button } from 'components/common/Button';
import { TextArea } from 'components/common/TextArea';
import { useInput } from 'hooks/useInput';
import { board } from 'api/board';

export const CreatePage = () => {
  const { inputValue: title, handleInputChange: handleTitleChange } = useInput();
  const { inputValue: contents, handleInputChange: handleContentsChange } = useInput();
  const navigate = useNavigate();

  const isPostFormInputValid = () => {
    if (!title.length || !contents.length) {
      alert('제목 또는 본문을 작성하세요.');
      return false;
    }
    return true;
  };

  const handlePostFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPostFormInputValid()) {
      try {
        await board.createPost({ title, contents });
        alert('게시글이 작성되었습니다.');
        navigate('/board/list');
      } catch (err) {
        alert('게시글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <PostFormWrapper>
            <PostForm onSubmit={handlePostFormSubmit}>
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
                <Button name="Cancel" type="button" />
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
