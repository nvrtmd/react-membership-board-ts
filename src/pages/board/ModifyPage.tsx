import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { useInput } from 'hooks/useInput';
import { board } from 'api/board';
import { PostForm } from 'components/board/PostForm';
import { CustomError } from 'global/types';

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
        alert('게시글이 존재하지 않습니다.');
        navigate(-1);
      }
    } catch {
      alert('서버로부터 게시글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      navigate(-1);
    }
  };

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
      if (isPostFormInputValid() && params.postIdx) {
        try {
          await board.modifyPost(params.postIdx, { title, contents });
          alert('게시글이 수정되었습니다.');
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

  const handleCancelButtonClick = useCallback(() => confirm('게시글 수정을 취소하시겠습니까?') && navigate(-1), []);

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
