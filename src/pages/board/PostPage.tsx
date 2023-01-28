import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Browser } from 'components/common/Browser';
import styled from 'styled-components/macro';
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
        <Browser>{postData && <div>{postData.post_contents}</div>}</Browser>
      </BrowserWrapper>
    </Layout>
  );
};
const BrowserWrapper = styled.div`
  display: flex;
  height: 100%;
`;
