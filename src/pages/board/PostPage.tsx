import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import moment from 'moment';
import { auth } from 'apis/auth';
import { board } from 'apis/board';
import { member } from 'apis/member';
import { useInput } from 'hooks/useInput';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { CommentItem } from 'components/board/CommentItem';
import { NoComment } from 'components/board/NoComment';
import { CommentForm } from 'components/board/CommentForm';
import { Browser } from 'components/common/Browser';
import { Button } from 'components/common/Button';
import { theme } from 'styles/theme';
import { BOARD_ALERT_MESSAGE, MEMBER_ALERT_MESSAGE } from 'constants/constants';
import { Post, Comment, Member, CustomError } from 'global/types';
import DeletePostImg from 'assets/delete_post.png';
import ModifyPostImg from 'assets/modify_post.png';
import BackToPostListImg from 'assets/post_list.png';

interface PostAreaProps {
  data: Post;
  isPostWriter: boolean;
}

interface FunctionButtonsProps {
  postIdx: string;
  isPostWriter: boolean;
}

interface FunctionButtonProps {
  handleFunctionButtonRestore: () => void;
  name: string;
  children: React.ReactNode;
}

interface CommentAreaProps {
  currentUserData: Member | null;
  rootRef: React.RefObject<HTMLDivElement>;
  postContainerTopRef: React.RefObject<HTMLDivElement>;
}

interface CommentListProps {
  data: Comment[];
  commentListRefreshHandler: () => void;
  currentUserData: Member | null;
  continueFetching: boolean;
  intersectRef: React.RefObject<HTMLDivElement>;
}

interface CommentListBottomProps {
  continueFetching: boolean;
}

export const PostPage = () => {
  const [currentUserData, setCurrentUserData] = useState<Member | null>(null);
  const [postData, setPostData] = useState<Post>();
  const rootRef = useRef<HTMLDivElement>(null);
  const postContainerTopRef = useRef<HTMLDivElement>(null);
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
      console.log(MEMBER_ALERT_MESSAGE.NOT_SIGNED_IN_USER_ALERT);
    }
  };

  const fetchPostData = async () => {
    try {
      if (params.postIdx) {
        const fetchedData = await board.getPostData(params.postIdx);
        setPostData(fetchedData);
      } else {
        alert(BOARD_ALERT_MESSAGE.POST_NOT_EXIST_ALERT);
        navigate(-1);
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      navigate(-1);
      return;
    }
  };

  const isPostWriter = useMemo(
    () => currentUserData?.id === postData?.post_writer.member_id,
    [currentUserData, postData?.post_writer.member_id],
  );

  return (
    <BrowserWrapper>
      <Browser ref={rootRef}>
        <div ref={postContainerTopRef}></div>
        <PostContainer>
          {postData && <PostArea data={postData} isPostWriter={isPostWriter} />}
          <CommentArea currentUserData={currentUserData} rootRef={rootRef} postContainerTopRef={postContainerTopRef} />
        </PostContainer>
      </Browser>
    </BrowserWrapper>
  );
};

const PostArea = memo(({ data, isPostWriter }: PostAreaProps) => {
  return (
    <>
      <PostHeader>
        <PostTitle>{data.post_title}</PostTitle>
        <PostWriter>by {data.post_writer ? data.post_writer.member_nickname : 'deleted account'}</PostWriter>
        <PostUpdatedDate>
          <div>{data.updatedAt && moment(data.updatedAt).format('YY.MM.DD HH:mm')}</div>
        </PostUpdatedDate>
      </PostHeader>
      <PostBody>{data.post_contents}</PostBody>
      <FunctionButtons postIdx={String(data.post_idx)} isPostWriter={isPostWriter} />
    </>
  );
});

const FunctionButtons = ({ postIdx, isPostWriter }: FunctionButtonsProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleFunctionButtonRestore = useCallback(async (functionButtonName: string) => {
    switch (functionButtonName) {
      case 'Delete':
        try {
          await board.isPostWriter(postIdx);
          if (confirm(BOARD_ALERT_MESSAGE.POST_DELETE_CONFIRM)) {
            board.deletePost(postIdx);
            alert(BOARD_ALERT_MESSAGE.POST_DELETED_ALERT);
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
      {isPostWriter && (
        <>
          <FunctionButton handleFunctionButtonRestore={() => handleFunctionButtonRestore('Delete')} name="Delete">
            <FunctionButtonImage src={DeletePostImg} />
          </FunctionButton>
          <FunctionButton handleFunctionButtonRestore={() => handleFunctionButtonRestore('Modify')} name="Modify">
            <FunctionButtonImage src={ModifyPostImg} />
          </FunctionButton>
        </>
      )}
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

const CommentArea = memo(({ currentUserData, rootRef, postContainerTopRef }: CommentAreaProps) => {
  const [continueFetching, setContinueFetching] = useState<boolean>(true);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [commentListPage, setCommentListPage] = useState<number>(0);

  const {
    inputValue: comment,
    handleInputChange: handleCommentChange,
    handleResetInput: handleCommentReset,
  } = useInput('');
  const intersectRef = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(intersectRef, {
    root: rootRef.current,
    rootMargin: '50px',
    threshold: 0.01,
  });
  const params = useParams();
  const navigate = useNavigate();
  const COUNT = 5;

  useEffect(() => {
    if (continueFetching) {
      fetchCommentList();
    }
  }, [commentListPage]);

  useEffect(() => {
    if (isIntersect && commentList.length && commentListPage >= 0) {
      setCommentListPage((prev) => {
        return prev + COUNT;
      });
    }
  }, [isIntersect]);

  const fetchCommentList = async () => {
    try {
      if (params.postIdx) {
        const fetchedData = await board.getCommentList(params.postIdx, commentListPage, COUNT);
        if (fetchedData.length === 0) {
          setContinueFetching(false);
          return;
        }
        setCommentList((prev) => [...prev, ...fetchedData]);
      } else {
        alert(BOARD_ALERT_MESSAGE.POST_NOT_EXIST_ALERT);
        navigate(-1);
      }
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      navigate('/');
      return;
    }
  };

  const handleCommentListRefresh = useCallback(() => {
    if (commentListPage > 0) {
      setCommentListPage(0);
    } else {
      fetchCommentList();
    }
    setCommentList([]);
    setContinueFetching(true);
    postContainerTopRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [commentListPage, commentList]);

  const handleCommentFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await auth.isSignedIn();
        if (comment.length <= 0) {
          alert(BOARD_ALERT_MESSAGE.CONTENTS_EMPTY_ALERT);
          return;
        }
        if (params.postIdx) {
          await board.createComment(params.postIdx, { contents: comment });
          if (commentList.length === 0) {
            fetchCommentList();
          } else {
            handleCommentListRefresh();
          }
        }
      } catch (err) {
        const error = err as CustomError;
        alert(error.message);
        return;
      }
      handleCommentReset();
    },
    [comment, commentList, params.postIdx, handleCommentListRefresh, handleCommentReset],
  );

  return (
    <CommentWrapper>
      <CommentForm
        submitHandler={handleCommentFormSubmit}
        commentValue={comment}
        commentChangeHandler={handleCommentChange}
        formTitle="Comments"
        isDisabled={currentUserData === null}
      />
      <CommentList
        data={commentList}
        commentListRefreshHandler={handleCommentListRefresh}
        currentUserData={currentUserData}
        continueFetching={continueFetching}
        intersectRef={intersectRef}
      />
    </CommentWrapper>
  );
});

const CommentList = memo(
  ({ data, commentListRefreshHandler, currentUserData, continueFetching, intersectRef }: CommentListProps) => {
    return (
      <>
        {data && data.length > 0 ? (
          data.map((comment) => (
            <CommentItem
              key={comment.comment_idx}
              data={comment}
              commentListRefreshHandler={commentListRefreshHandler}
              isCommentWriter={comment.comment_writer.member_id === currentUserData?.id}
            />
          ))
        ) : (
          <NoComment />
        )}
        <CommentListBottom continueFetching={continueFetching} ref={intersectRef}>
          {BOARD_ALERT_MESSAGE.LOADING_TEXT}
        </CommentListBottom>
      </>
    );
  },
);

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2rem;
`;

const PostContainer = styled.div`
  padding: 1rem;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${theme.color.black};
  padding-bottom: 0.5rem;
`;

const PostTitle = styled.div`
  font-size: 1.8rem;
`;

const PostWriter = styled.div`
  font-size: 1.25rem;
`;

const PostUpdatedDate = styled.div`
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

const CommentListBottom = styled.div<CommentListBottomProps>`
  ${({ continueFetching }) =>
    !continueFetching &&
    `
    display: none !important;
  `}
`;
