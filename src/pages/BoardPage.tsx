import { useState, useEffect } from 'react';
import { Browser } from 'components/common/Browser';
import { Layout } from 'components/layouts/Layout';
import axios from 'axios';
import { Post } from 'global/types';

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
      <Browser route="board">
        <div>Hello!</div>
      </Browser>
    </Layout>
  );
};

export default BoardPage;
