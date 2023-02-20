import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { board } from 'apis/board';
import { useInput } from 'hooks/useInput';
import { PostForm } from 'components/board/PostForm';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { BOARD_ALERT_MESSAGE } from 'constants/constants';
import { CustomError } from 'global/types';

export const CreatePage = () => {
  const { inputValue: title, handleInputChange: handleTitleChange } = useInput('');
  const { inputValue: contents, handleInputChange: handleContentsChange } = useInput('');
  const navigate = useNavigate();

  const isPostFormInputValid = () => {
    if (!title.length || !contents.length) {
      alert(BOARD_ALERT_MESSAGE.TITLE_OR_CONTENTS_EMPTY_ALERT);
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
          alert(BOARD_ALERT_MESSAGE.POST_CREATED_ALERT);
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

  const handleCancelButtonClick = useCallback(
    () => confirm(BOARD_ALERT_MESSAGE.POST_CREATE_CANCEL_CONFIRM) && navigate(-1),
    [],
  );

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
