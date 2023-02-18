import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { useInput } from 'hooks/useInput';
import { board } from 'api/board';
import { PostForm } from 'components/board/PostForm';
import { CustomError } from 'global/types';

export const CreatePage = () => {
  const { inputValue: title, handleInputChange: handleTitleChange } = useInput('');
  const { inputValue: contents, handleInputChange: handleContentsChange } = useInput('');
  const navigate = useNavigate();

  const isPostFormInputValid = () => {
    if (!title.length || !contents.length) {
      alert('제목 또는 본문을 작성하세요.');
      return false;
    }
    return true;
  };

  const handlePostFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPostFormInputValid()) {
        try {
          await board.createPost({ title, contents });
          alert('게시글이 작성되었습니다.');
          navigate('/board/list');
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
          return;
        }
      }
    },
    [title, contents],
  );

  const handleCancelButtonClick = useCallback(() => confirm('게시글 작성을 취소하시겠습니까?') && navigate(-1), []);

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <PostFormWrapper>
            <PostForm
              submitHandler={handlePostFormSubmit}
              formTitle="- Create Post -"
              titleValue={title}
              titleChangeHandler={handleTitleChange}
              contentsValue={contents}
              contentsChangeHandler={handleContentsChange}
              cancelButtonClickHandler={handleCancelButtonClick}
            />
          </PostFormWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2rem;
`;

const PostFormWrapper = styled.div`
  min-height: 100%;
  display: flex;
`;
