import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import { CustomError, Post } from 'global/types';
import { Button } from 'components/common/Button';
import { auth } from 'api/auth';
import { board } from 'api/board';
import { PostItem } from 'components/board/PostItem';
import { NoPost } from 'components/common/NoPost';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';

export const ListPage = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [postListPage, setPostListPage] = useState<number>(0);
  const navigate = useNavigate();
  const intersectRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(intersectRef, {
    root: rootRef.current,
    rootMargin: '50px',
    threshold: 0.01,
  });

  const fetchPostList = async () => {
    try {
      const fetchedData = await board.getPostList(postListPage, 5);
      setPostList((prev) => [...prev, ...fetchedData]);
    } catch (err) {
      const error = err as CustomError;
      alert(error.message);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchPostList();
  }, [postListPage]);

  useEffect(() => {
    if (isIntersect && postListPage >= 0) {
      setPostListPage((prev) => {
        return prev + 5;
      });
    }
  }, [isIntersect]);

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
        <Browser ref={rootRef}>
          <ButtonWrapper>
            <Button type="button" name="Create Post" restoreHandler={handleCreatePostButtonClick} />
          </ButtonWrapper>
          <ListWrapper>
            {postList && postList.length > 0 ? (
              postList.map((post) => <PostItem data={post} clickHandler={moveToPost} key={post.post_idx} />)
            ) : (
              <NoPost />
            )}
          </ListWrapper>
          {<div ref={intersectRef}>Loading...</div>}
        </Browser>
      </BrowserWrapper>
    </Layout>
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
  display: table;
  width: 100%;
  height: inherit;
`;
