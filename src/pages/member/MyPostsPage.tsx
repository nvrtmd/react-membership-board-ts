import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { CustomError, Post } from 'global/types';
import { member } from 'apis/member';
import { PostItem } from 'components/board/PostItem';
import { NoPost } from 'components/common/NoPost';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';

interface PostListBottomProps {
  continueFetching: boolean;
}

export const MyPostsPage = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [postListPage, setPostListPage] = useState<number>(0);
  const [continueFetching, setContinueFetching] = useState<boolean>(true);
  const navigate = useNavigate();
  const intersectRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(intersectRef, {
    root: rootRef.current,
    rootMargin: '50px',
    threshold: 0.01,
  });
  const COUNT = 5;

  useEffect(() => {
    if (continueFetching) {
      fetchPostList();
    }
  }, [postListPage]);

  useEffect(() => {
    if (isIntersect && postList.length && postListPage >= 0) {
      setPostListPage((prev) => {
        return prev + COUNT;
      });
    }
  }, [isIntersect]);

  const fetchPostList = async () => {
    try {
      await member.getMemberInfo();
    } catch (err) {
      console.log('비로그인 회원입니다.');
      return;
    }

    try {
      const fetchedData = await member.getMemberPosts(postListPage, COUNT);
      if (fetchedData.length === 0) {
        setContinueFetching(false);
        return;
      }
      setPostList((prev) => [...prev, ...fetchedData]);
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      navigate(-1);
    }
  };

  const moveToPost = useCallback(
    (postIdx: number) => {
      navigate(`/board/${postIdx}`, { state: { prevPage: 'myPostsPage' } });
    },
    [navigate],
  );

  return (
    <Layout>
      <BrowserWrapper>
        <Browser ref={rootRef}>
          <ListWrapper>
            {postList && postList.length > 0 ? (
              postList.map((post) => <PostItem data={post} clickHandler={moveToPost} key={post.post_idx} />)
            ) : (
              <NoPost />
            )}
          </ListWrapper>
          <PostListBottom continueFetching={continueFetching} ref={intersectRef}>
            Loading...
          </PostListBottom>
        </Browser>
      </BrowserWrapper>
    </Layout>
  );
};

const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2rem;
`;

const ListWrapper = styled.div`
  padding: 0.5rem 2.5rem;
  display: table;
  table-layout: fixed;
  width: 100%;
  height: inherit;
`;

const PostListBottom = styled.div<PostListBottomProps>`
  ${({ continueFetching }) =>
    !continueFetching &&
    `
    display: none !important;
  `}
`;
