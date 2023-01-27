import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';

export const ListPage = () => {
  const [postList, setPostList] = useState<Post[]>();

  const fetchPostList = async () => {
    const fetchedData = await axios.get('/post/list');
    setPostList(fetchedData.data.data);
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <Layout>
      <Browser route="board/list">
        <ListWrapper>
          {postList &&
            postList.map((post) => (
              <PostWrapper key={post.post_idx}>
                {post.post_contents} {post.post_writer.member_nickname}
              </PostWrapper>
            ))}
        </ListWrapper>
      </Browser>
    </Layout>
  );
};

const ListWrapper = styled.div`
  padding: 0.5rem 2.5rem;
`;

const PostWrapper = styled.div`
  border: 1px solid green;
  margin: 2rem 0;
  padding: 2rem;
  box-shadow: -0.4rem 0 0 0 black, 0.4rem 0 0 0 black, 0 -0.4rem 0 0 black, 0 0.4rem 0 0 black;
`;
