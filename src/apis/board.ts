import axios, { AxiosError } from 'axios';
import { NewComment, NewPost } from 'global/types';

const board = {
  getPostList: async (start: number, count: number) => {
    try {
      let postListData;
      if (start >= 0 && count >= 0) {
        postListData = await axios.get(`/post/list?start=${start}&count=${count}`);
      } else {
        postListData = await axios.get(`/post/list`);
      }
      return postListData.data.data;
    } catch {
      throw {
        code: 500,
        message: '서버로부터 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  getPostData: async (postIdx: string) => {
    try {
      const postData = await axios.get(`/post/${postIdx}`);
      return postData.data.data;
    } catch {
      throw {
        code: 500,
        message: '서버로부터 게시글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  getCommentList: async (postIdx: string, start: number, count: number) => {
    try {
      let commentListData;
      if (start >= 0 && count >= 0) {
        commentListData = await axios.get(`/post/${postIdx}/comment/list?start=${start}&count=${count}`);
      } else {
        commentListData = await axios.get(`/post/${postIdx}/comment`);
      }
      return commentListData.data.data;
    } catch {
      throw {
        code: 500,
        message: '서버로부터 댓글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  createPost: async (data: NewPost) => {
    try {
      await axios.post(`/post`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '게시글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.',
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
        code: 500,
        message: '게시글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  deletePost: async (postIdx: string) => {
    try {
      await axios.delete(`/post/${postIdx}`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  createComment: async (postIdx: string, data: NewComment) => {
    try {
      await axios.post(`/post/${postIdx}/comment`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '댓글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  modifyComment: async (postIdx: string, commentIdx: number, data: NewComment) => {
    try {
      await axios.patch(`/post/${postIdx}/comment/${commentIdx}`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '댓글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  deleteComment: async (postIdx: string, commentIdx: number) => {
    try {
      await axios.delete(`/post/${postIdx}/comment/${commentIdx}`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
};

export { board };