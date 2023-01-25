import { useState, useEffect } from 'react';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import axios from 'axios';

interface Post {
  post_idx: number;
  post_title: string;
  post_contents: string;
  createdAt: Date;
  updatedAt: Date;
  member_idx: number;
  post_writer: {
    member_id: string;
    member_nickname: string;
  };
}

const BoardPage = () => {
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
      <Browser route="board" />
    </Layout>
  );
};

export default BoardPage;
