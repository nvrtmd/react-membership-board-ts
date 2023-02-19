import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { useInput } from 'hooks/useInput';
import { board } from 'apis/board';
import { PostForm } from 'components/board/PostForm';
import { CustomError } from 'global/types';
import { BOARD_ALERT_MESSAGE, BOARD_ERROR_MESSAGE } from 'constants/constants';

export const ModifyPage = () => {
  const { inputValue: title, setInputValue: setTitle, handleInputChange: handleTitleChange } = useInput('');
  const { inputValue: contents, setInputValue: setContents, handleInputChange: handleContentsChange } = useInput('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      if (params.postIdx) {
        const fetchedData = await board.getPostData(params.postIdx);
        setTitle(fetchedData.post_title);
        setContents(fetchedData.post_contents);
      } else {
        alert(BOARD_ALERT_MESSAGE.POST_NOT_EXIST_ALERT);
        navigate(-1);
      }
    } catch {
      alert(BOARD_ERROR_MESSAGE.CANNOT_GET_POST_DATA_FROM_SERVER);
      navigate(-1);
    }
  };

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
      if (isPostFormInputValid() && params.postIdx) {
        try {
          await board.modifyPost(params.postIdx, { title, contents });
          alert(BOARD_ALERT_MESSAGE.POST_MODIFIED_ALERT);
          navigate(-1);
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
    () => confirm(BOARD_ALERT_MESSAGE.POST_MODIFIED_CANCEL_CONFIRM) && navigate(-1),
    [],
  );

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <PostFormWrapper>
            <PostForm
              submitHandler={handlePostFormSubmit}
              formTitle="- Modify Post -"
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
