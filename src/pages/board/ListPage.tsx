import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import moment from 'moment';
import { theme } from 'styles/theme';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';
import { Button } from 'components/common/Button';
import { auth } from 'api/auth';

interface ListItemProps {
  data: Post;
  clickHandler: (postIdx: number) => void;
}

export const ListPage = () => {
  const [postList, setPostList] = useState<Post[]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = async () => {
    const fetchedData = await axios.get('/post/list');
    setPostList(fetchedData.data.data);
  };

  const moveToPost = useCallback(
    (postIdx: number) => {
      navigate(`/board/${postIdx}`);
    },
    [navigate],
  );

  const handleCreatePostButtonClick = useCallback(async () => {
    try {
      await auth.isSignedIn();
      navigate('/board/create');
    } catch {
      if (confirm('로그인이 필요합니다. 확인 버튼을 클릭하면 로그인 페이지로 이동합니다.')) {
        navigate('/auth/signin');
      } else {
        return;
      }
    }
  }, []);

  return (
    <Layout>
      <BrowserWrapper>
        <Browser>
          <ButtonWrapper>
            <Button type="button" name="Create Post" restoreHandler={handleCreatePostButtonClick} />
          </ButtonWrapper>
          <ListWrapper>
            {postList && postList.map((post) => <ListItem data={post} clickHandler={moveToPost} key={post.post_idx} />)}
          </ListWrapper>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const ListItem = ({ data, clickHandler }: ListItemProps) => {
  return (
    <PostWrapper onClick={() => clickHandler(data.post_idx)}>
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

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ListWrapper = styled.div`
  padding: 0.5rem 2.5rem;
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

const PostIndex = styled.div`
  font-size: 1.2rem;
  color: ${theme.color.grey};
`;

const PostTitle = styled.div`
  font-size: 1.6rem;
`;

const PostContents = styled.div`
  font-size: 1.45rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
