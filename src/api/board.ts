import axios from 'axios';
import { NewPost } from 'global/types';

const board = {
  getPostList: async () => {
    try {
      const postListData = await axios.get('/post/list');
      return postListData.data.data;
    } catch {
      throw {
        error: '서버로부터 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  getPostData: async (postIdx: string) => {
    try {
      const postData = await axios.get(`/post/${postIdx}`);
      return postData.data.data;
    } catch {
      throw {
        error: '서버로부터 게시글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  createPost: async (data: NewPost) => {
    try {
      await axios.post(`/post`, data, { withCredentials: true });
    } catch {
      throw {
        error: '게시글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
};

export { board };
