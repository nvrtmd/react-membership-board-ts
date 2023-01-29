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
import { CommentInput } from 'components/board/CommentInput';

interface FunctionButtonProps {
  handleFunctionButtonRestore: () => void;
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
          <CommentWrapper>
            <CommentInputWrapper>
              <CommentListTitle>
                <CommentImage src={CommentImg} /> Comments
              </CommentListTitle>
              <CommentInput placeholder="Write your comment" />
              <CommentSubmitButtonWrapper>
                <Button name="Submit" />
              </CommentSubmitButtonWrapper>
            </CommentInputWrapper>
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

const FunctionButtons = () => {
  const navigate = useNavigate();
  const handleFunctionButtonRestore = useCallback((functionButtonName: string) => {
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
    <Button restoreHandler={handleFunctionButtonRestore} name={name}>
      {children}
    </Button>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const PostContainer = styled.div``;

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

const CommentInputWrapper = styled.div`
  margin-bottom: 2.5rem;
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
