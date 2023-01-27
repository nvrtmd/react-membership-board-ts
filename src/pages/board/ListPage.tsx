import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import { theme } from 'styles/theme';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';

interface ListItemProps {
  data: Post;
}

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
      <Browser>
        <ListWrapper>{postList && postList.map((post) => <ListItem data={post} />)}</ListWrapper>
      </Browser>
    </Layout>
  );
};

const ListItem = ({ data }: ListItemProps) => {
  return (
    <PostWrapper key={data.post_idx}>
      <PostIndex>{data.post_idx}</PostIndex>
      <PostTitle>{data.post_title}</PostTitle>
      <PostContents>{data.post_contents}</PostContents>
      <PostInfo>
        <div>by {data.post_writer.member_nickname}</div>
        <div>{moment(data.updatedAt).format('YY.MM.DD HH:mm')}</div>
      </PostInfo>
    </PostWrapper>
  );
};

const ListWrapper = styled.div`
  padding: 0.5rem 2.5rem;
`;

const PostIndex = styled.div`
  font-size: 1.2rem;
  color: ${theme.color.grey};
`;

const PostTitle = styled.div`
  font-size: 1.6rem;
`;

const PostContents = styled.div`
  font-size: 1.45rem;
`;

const PostInfo = styled.div`
  color: ${theme.color.grey};
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  &:hover > div {
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }
`;

const PostWrapper = styled.div`
  border: 1px solid green;
  max-width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  box-shadow: -0.4rem 0 0 0 black, 0.4rem 0 0 0 black, 0 -0.4rem 0 0 black, 0 0.4rem 0 0 black;
  cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
    auto;

  &:hover > div {
    color: ${theme.color.white};
    cursor: url('https://user-images.githubusercontent.com/67324487/215111457-633e4a12-d4ad-442a-934d-398619fd486b.png'),
      auto;
  }

  &:hover {
    background: ${theme.color.navy};
  }
`;
