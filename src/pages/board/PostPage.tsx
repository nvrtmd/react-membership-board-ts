import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Browser } from 'components/common/Browser';
import { Button } from 'components/common/Button';

import styled from 'styled-components/macro';
import moment from 'moment';

import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';

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
              <ButtonWrapper>
                <Button isClicked={false} name="Delete" />
                <Button isClicked={false} name="Modify" />
                <Button isClicked={false} name="Back" />
              </ButtonWrapper>
            </PostContainer>
          )}
        </Browser>
      </BrowserWrapper>
    </Layout>
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

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
