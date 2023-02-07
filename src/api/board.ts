import axios, { AxiosError } from 'axios';
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
  isPostWriter: async (postIdx: string) => {
    try {
      await axios.get(`/post/${postIdx}/iswriter`, { withCredentials: true });
    } catch (err) {
      const error = err as AxiosError;
      switch (error.response?.status) {
        case 500:
          throw { code: 500, message: '로그인이 필요합니다.' };
        case 403:
          throw { code: 403, message: '게시글 수정 및 삭제는 작성자만 가능합니다.' };
        default:
          throw { code: 500, message: '게시글 수정 및 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.' };
      }
    }
  },
  modifyPost: async (postIdx: string, data: NewPost) => {
    try {
      await axios.patch(`/post/${postIdx}`, data, { withCredentials: true });
    } catch {
      throw {
        error: '게시글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  deletePost: async (postIdx: string) => {
    try {
      await axios.delete(`/post/${postIdx}`, { withCredentials: true });
    } catch {
      throw {
        error: '게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
};

export { board };
