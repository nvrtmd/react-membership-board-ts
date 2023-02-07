import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Browser } from 'components/common/Browser';
import { Button } from 'components/common/Button';
import DeletePostImg from 'assets/delete_post.png';
import ModifyPostImg from 'assets/modify_post.png';
import BackToPostListImg from 'assets/post_list.png';
import CommentImg from 'assets/comment.png';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import moment from 'moment';
import { Layout } from 'components/layouts/Layout';
import { Post, Comment, CustomError } from 'global/types';
import { CommentItem } from 'components/board/CommentItem';
import { NoComment } from 'components/board/NoComment';
import { TextArea } from 'components/common/TextArea';
import { useInput } from 'hooks/useInput';
import { board } from 'api/board';

interface FunctionButtonsProps {
  postIdx: string;
}

interface FunctionButtonProps {
  handleFunctionButtonRestore: () => void;
  name: string;
  children: React.ReactNode;
}

export const PostPage = () => {
  const [postData, setPostData] = useState<Post>();
  const [commentList, setCommentList] = useState<Comment[]>();
  const { inputValue, handleInputChange, handleResetInput } = useInput();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      if (params.postIdx) {
        const fetchedData = await board.getPostData(params.postIdx);
        setPostData(fetchedData);
        setCommentList(fetchedData);
      } else {
        alert('게시글이 존재하지 않습니다.');
        navigate(-1);
      }
    } catch {
      alert('서버로부터 게시글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      navigate(-1);
    }
  };

  const handleCommentInputSubmit = () => {
    // TODO: post API 통신 구현
    console.log(inputValue);
    handleResetInput();
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          {postData && (
            <div>
              <PostHeader>
                <PostTitle>{postData.post_title}</PostTitle>
                <PostWriter>by {postData.post_writer.member_nickname}</PostWriter>
                <PostUpdatedDate>
                  <div>{postData.updatedAt && moment(postData.updatedAt).format('YY.MM.DD HH:mm')}</div>
                </PostUpdatedDate>
              </PostHeader>
              <PostBody>{postData.post_contents}</PostBody>
              <FunctionButtons postIdx={String(postData.post_idx)} />
            </div>
          )}
          <CommentWrapper>
            <CommentInputContainer>
              <CommentListTitle>
                <CommentImage src={CommentImg} /> Comments
              </CommentListTitle>
              <CommentInputWrapper>
                <TextArea
                  placeholder="Write your comment"
                  name="comment"
                  changeHandler={handleInputChange}
                  value={inputValue}
                />
              </CommentInputWrapper>
              <CommentSubmitButtonWrapper>
                <Button name="Submit" restoreHandler={handleCommentInputSubmit} type="submit" />
              </CommentSubmitButtonWrapper>
            </CommentInputContainer>
            <CommentList>
              {commentList && commentList.length > 0 ? (
                commentList.map((comment) => <CommentItem key={comment.comment_idx} data={comment} />)
              ) : (
                <NoComment />
              )}
            </CommentList>
          </CommentWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const FunctionButtons = ({ postIdx }: FunctionButtonsProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const handleFunctionButtonRestore = useCallback(async (functionButtonName: string) => {
    switch (functionButtonName) {
      case 'Delete':
        try {
          await board.isPostWriter(postIdx);
          if (confirm('게시글을 삭제하시겠습니까?')) {
            board.deletePost(postIdx);
            alert('게시글이 삭제되었습니다.');
            navigate('/board/list');
          } else {
            return;
          }
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
        }
        break;
      case 'Modify':
        try {
          await board.isPostWriter(postIdx);
          navigate(`/board/modify/${params.postIdx}`);
        } catch (err) {
          const error = err as CustomError;
          alert(error.message);
        }
        break;
      case 'List':
        navigate('/board/list');
        break;
      default:
        break;
    }
  }, []);

  return (
    <FunctionButtonsWrapper>
      <FunctionButton handleFunctionButtonRestore={() => handleFunctionButtonRestore('Delete')} name="Delete">
        <FunctionButtonImage src={DeletePostImg} />
      </FunctionButton>
      <FunctionButton handleFunctionButtonRestore={() => handleFunctionButtonRestore('Modify')} name="Modify">
        <FunctionButtonImage src={ModifyPostImg} />
      </FunctionButton>
      <FunctionButton handleFunctionButtonRestore={() => handleFunctionButtonRestore('List')} name="List">
        <FunctionButtonImage src={BackToPostListImg} />
      </FunctionButton>
    </FunctionButtonsWrapper>
  );
};

const FunctionButton = ({ handleFunctionButtonRestore, name, children }: FunctionButtonProps) => {
  return (
    <Button restoreHandler={handleFunctionButtonRestore} name={name} type="button">
      {children}
    </Button>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${theme.color.black};
  padding-bottom: 0.5rem;
`;

const PostTitle = styled.div`
  font-size: 2.5rem;
`;

const PostWriter = styled.div`
  font-size: 1.25rem;
`;

const PostUpdatedDate = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35%;
  font-size: 1rem;
`;

const PostBody = styled.div`
  padding: 1rem 0 2rem;
  min-height: 20rem;
`;

export const FunctionButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const FunctionButtonImage = styled.img`
  width: 1.5rem;
  margin-right: 3px;
`;

export const CommentWrapper = styled.div`
  border-top: 1px solid ${theme.color.grey};
  border-style: dashed solid;
  padding: 1rem 0 0;
  margin-top: 2rem;
`;

const CommentInputContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const CommentInputWrapper = styled.div`
  height: 6.5rem;
  margin-bottom: 0.8rem;
`;

const CommentSubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentList = styled.div``;

const CommentListTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const CommentImage = styled.img`
  width: 2rem;
  margin-right: 0.3rem;
`;
