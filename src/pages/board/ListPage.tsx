import { useState, useEffect } from 'react';
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
        {postList && postList.map((post) => <div key={post.post_idx}>{post.post_contents}</div>)}
      </Browser>
    </Layout>
  );
};
