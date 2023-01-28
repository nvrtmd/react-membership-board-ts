import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Browser } from 'components/common/Browser';
import { Button } from 'components/common/Button';
import DeletePostImg from 'assets/delete_post.png';
import ModifyPostImg from 'assets/modify_post.png';
import BackToPostListImg from 'assets/post_list.png';
import styled from 'styled-components/macro';
import moment from 'moment';

import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';

interface FunctionButtonProps {
  handleFunctionButtonClick: () => void;
  handleFunctionButtonMouseOut: () => void;
  isClicked: boolean;
  name: string;
  children: React.ReactNode;
}

export const PostPage = () => {
  const [postData, setPostData] = useState<Post>();
  const params = useParams();

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    const fetchedData = await axios.get(`/post/${params.postIdx}`);
    setPostData(fetchedData.data.data);
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
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const FunctionButtons = () => {
  const navigate = useNavigate();
  const [clickedFunctionButton, setClickedFunctionButton] = useState<string>('');

  const handleFunctionButtonClick = useCallback((functionButtonName: string) => {
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

  const handleFunctionButtonMouseOut = useCallback(() => {
    setClickedFunctionButton('');
  }, []);

  return (
    <FunctionButtonsWrapper>
      <FunctionButton
        handleFunctionButtonClick={() => handleFunctionButtonClick('Delete')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        name="Delete"
        isClicked={clickedFunctionButton === 'Delete'}
      >
        <FunctionButtonImage src={DeletePostImg} />
      </FunctionButton>
      <FunctionButton
        handleFunctionButtonClick={() => handleFunctionButtonClick('Modify')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        name="Modify"
        isClicked={clickedFunctionButton === 'Modify'}
      >
        <FunctionButtonImage src={ModifyPostImg} />
      </FunctionButton>
      <FunctionButton
        handleFunctionButtonClick={() => handleFunctionButtonClick('List')}
        handleFunctionButtonMouseOut={handleFunctionButtonMouseOut}
        name="List"
        isClicked={clickedFunctionButton === 'List'}
      >
        <FunctionButtonImage src={BackToPostListImg} />
      </FunctionButton>
    </FunctionButtonsWrapper>
  );
};

const FunctionButton = ({
  handleFunctionButtonClick,
  handleFunctionButtonMouseOut,
  name,
  isClicked,
  children,
}: FunctionButtonProps) => {
  return (
    <Button
      isClicked={isClicked}
      clickHandler={handleFunctionButtonClick}
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
  border-bottom: 1px solid black;
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
