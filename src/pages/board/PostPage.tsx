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
import axios from 'axios';
import { Post, Comment } from 'global/types';
import { CommentItem } from 'components/board/CommentItem';
import { NoComment } from 'components/board/NoComment';

interface FunctionButtonProps {
  handleFunctionButtonMouseUp: () => void;
  handleFunctionButtonMouseOut: () => void;
  handleFunctionButtonMouseDown: () => void;
  isClicked: boolean;
  name: string;
  children: React.ReactNode;
}

export const PostPage = () => {
  const [postData, setPostData] = useState<Post>();
  const [commentList, setCommentList] = useState<Comment[]>();
  const params = useParams();

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    const fetchedData = await axios.get(`/post/${params.postIdx}`);
    setPostData(fetchedData.data.data);
    setCommentList(fetchedData.data.data.comments);
  };

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          {postData && (
            <PostContainer>
              <PostWrapper>
                <PostHeader>
                  <PostTitle>{postData.post_title}</PostTitle>
                  <PostWriter>by {postData.post_writer.member_nickname}</PostWriter>
                  <PostUpdatedDate>
                    <div>{postData.updatedAt && moment(postData.updatedAt).format('YY.MM.DD HH:mm')}</div>
                  </PostUpdatedDate>
                </PostHeader>
                <PostBody>{postData.post_contents}</PostBody>
              </PostWrapper>
              <FunctionButtons />
            </PostContainer>
          )}
          <CommentList>
            <CommentListTitle>
              <CommentImage src={CommentImg} /> Comments
            </CommentListTitle>
            {commentList && commentList.length > 0 ? (
              commentList.map((comment) => <CommentItem key={comment.comment_idx} data={comment} />)
            ) : (
              <NoComment />
            )}
          </CommentList>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const FunctionButtons = () => {
  const navigate = useNavigate();
  const [clickedFunctionButton, setClickedFunctionButton] = useState<string>('');

  const handleFunctionButtonMouseUp = useCallback((functionButtonName: string) => {
    switch (functionButtonName) {
      case 'Delete':
        console.log('delete');
        break;
      case 'Modify':
        console.log('modify');
        break;
      case 'List':
        navigate('/board/list');
        break;
      default:
        break;
    }
    setClickedFunctionButton((prev) => (prev.length > 0 ? '' : functionButtonName));
  }, []);

  const handleFunctionButtonMouseDown = useCallback((pageMoveButtonName: string) => {
    setClickedFunctionButton(pageMoveButtonName);
  }, []);

  const handleFunctionButtonMouseOut = useCallback(() => {
    setClickedFunctionButton('');
  }, []);

  return (
    <FunctionButtonsWrapper>
      <FunctionButton
        handleFunctionButtonMouseUp={() => handleFunctionButtonMouseUp('Delete')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        handleFunctionButtonMouseDown={() => handleFunctionButtonMouseDown('Delete')}
        name="Delete"
        isClicked={clickedFunctionButton === 'Delete'}
      >
        <FunctionButtonImage src={DeletePostImg} />
      </FunctionButton>
      <FunctionButton
        handleFunctionButtonMouseUp={() => handleFunctionButtonMouseUp('Modify')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        handleFunctionButtonMouseDown={() => handleFunctionButtonMouseDown('Modify')}
        name="Modify"
        isClicked={clickedFunctionButton === 'Modify'}
      >
        <FunctionButtonImage src={ModifyPostImg} />
      </FunctionButton>
      <FunctionButton
        handleFunctionButtonMouseUp={() => handleFunctionButtonMouseUp('List')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        handleFunctionButtonMouseDown={() => handleFunctionButtonMouseDown('List')}
        name="List"
        isClicked={clickedFunctionButton === 'List'}
      >
        <FunctionButtonImage src={BackToPostListImg} />
      </FunctionButton>
    </FunctionButtonsWrapper>
  );
};

const FunctionButton = ({
  handleFunctionButtonMouseUp,
  handleFunctionButtonMouseOut,
  handleFunctionButtonMouseDown,
  name,
  isClicked,
  children,
}: FunctionButtonProps) => {
  return (
    <Button
      isClicked={isClicked}
      mouseDownHandler={handleFunctionButtonMouseDown}
      mouseUpHandler={handleFunctionButtonMouseUp}
      mouseOutHandler={handleFunctionButtonMouseOut}
      name={name}
    >
      {children}
    </Button>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PostWrapper = styled.div`
  height: auto;
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

export const CommentList = styled.div`
  border-top: 1px solid ${theme.color.grey};
  border-style: dashed solid;
  padding: 1rem 0 0;
  margin-top: 2rem;
`;

const CommentListTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
`;

const CommentImage = styled.img`
  width: 2rem;
  margin-right: 0.3rem;
`;
