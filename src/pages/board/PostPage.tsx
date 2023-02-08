import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Browser } from 'components/common/Browser';
import { Button } from 'components/common/Button';
import DeletePostImg from 'assets/delete_post.png';
import ModifyPostImg from 'assets/modify_post.png';
import BackToPostListImg from 'assets/post_list.png';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';
import moment from 'moment';
import { Layout } from 'components/layouts/Layout';
import { Post, Comment, Member, CustomError } from 'global/types';
import { CommentItem } from 'components/board/CommentItem';
import { NoComment } from 'components/board/NoComment';
import { useInput } from 'hooks/useInput';
import { board } from 'api/board';
import { auth } from 'api/auth';
import { CommentForm } from 'components/board/CommentForm';
import { member } from 'api/member';

interface FunctionButtonsProps {
  postIdx: string;
}

interface FunctionButtonProps {
  handleFunctionButtonRestore: () => void;
  name: string;
  children: React.ReactNode;
}

export const PostPage = () => {
  const [currentUserData, setCurrentUserData] = useState<Member>();
  const [postData, setPostData] = useState<Post>();
  const [commentList, setCommentList] = useState<Comment[]>();
  const {
    inputValue: comment,
    handleInputChange: handleCommentChange,
    handleResetInput: handleCommentReset,
  } = useInput('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostData();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const fetchedData = await member.getMemberInfo();
      setCurrentUserData({ id: fetchedData.member_id });
    } catch {
      console.log('비로그인 회원입니다.');
    }
  };

  const fetchPostData = async () => {
    try {
      if (params.postIdx) {
        const fetchedData = await board.getPostData(params.postIdx);
        setPostData(fetchedData);
        setCommentList(fetchedData.comments);
      } else {
        alert('게시글이 존재하지 않습니다.');
        navigate(-1);
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      navigate(-1);
      return;
    }
  };

  const handleCommentListRefresh = async (newCommentList: Comment[]) => {
    setCommentList(newCommentList);
  };

  const handleCommentFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await auth.isSignedIn();
      if (comment.length <= 0) {
        alert('내용을 작성하세요.');
        return;
      }
      if (params.postIdx) {
        await board.createComment(params.postIdx, { contents: comment });
        const fetchedData = await board.getPostData(params.postIdx);
        handleCommentListRefresh(fetchedData.comments);
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      return;
    }
    handleCommentReset();
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          {postData && (
            <div>
              <PostHeader>
                <PostTitle>{postData.post_title}</PostTitle>
                <PostWriter>
                  by {postData.post_writer ? postData.post_writer.member_nickname : 'deleted account'}
                </PostWriter>
                <PostUpdatedDate>
                  <div>{postData.updatedAt && moment(postData.updatedAt).format('YY.MM.DD HH:mm')}</div>
                </PostUpdatedDate>
              </PostHeader>
              <PostBody>{postData.post_contents}</PostBody>
              <FunctionButtons postIdx={String(postData.post_idx)} />
            </div>
          )}
          <CommentContainer>
            <CommentForm
              submitHandler={handleCommentFormSubmit}
              commentValue={comment}
              commentChangeHandler={handleCommentChange}
              formTitle="Comments"
            />
            <CommentList>
              {commentList && commentList.length > 0 ? (
                commentList.map((comment) => (
                  <CommentItem
                    key={comment.comment_idx}
                    data={comment}
                    commentListRefreshHandler={handleCommentListRefresh}
                    isCommentWriter={comment.comment_writer.member_id === currentUserData?.id}
                  />
                ))
              ) : (
                <NoComment />
              )}
            </CommentList>
          </CommentContainer>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const FunctionButtons = ({ postIdx }: FunctionButtonsProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

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
        if (location.state && location.state.prevPage === 'myPostsPage') {
          navigate(-1);
          return;
        }
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

export const CommentContainer = styled.div`
  border-top: 1px solid ${theme.color.grey};
  border-style: dashed solid;
  padding: 1rem 0 0;
  margin-top: 2rem;
`;

const CommentList = styled.div``;
