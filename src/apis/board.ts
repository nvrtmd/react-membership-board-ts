import axios, { AxiosError } from 'axios';
import { BOARD_ERROR_MESSAGE } from 'constants/constants';
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
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_POST_LIST_FROM_SERVER,
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
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_POST_DATA_FROM_SERVER,
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
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_COMMENT_LIST,
      };
    }
  },
  createPost: async (data: NewPost) => {
    try {
      await axios.post(`/post`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_CREATE_POST,
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
          throw { code: 500, message: BOARD_ERROR_MESSAGE.NEED_SIGN_IN };
        case 403:
          throw { code: 403, message: BOARD_ERROR_MESSAGE.ONLY_WRITER_CAN_MODIFY_OR_DELETE_POST };
        default:
          throw { code: 500, message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_OR_DELETE_POST };
      }
    }
  },
  modifyPost: async (postIdx: string, data: NewPost) => {
    try {
      await axios.patch(`/post/${postIdx}`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_POST,
      };
    }
  },
  deletePost: async (postIdx: string) => {
    try {
      await axios.delete(`/post/${postIdx}`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_DELETE_POST,
      };
    }
  },
  createComment: async (postIdx: string, data: NewComment) => {
    try {
      await axios.post(`/post/${postIdx}/comment`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_CREATE_COMMENT,
      };
    }
  },
  modifyComment: async (postIdx: string, commentIdx: number, data: NewComment) => {
    try {
      await axios.patch(`/post/${postIdx}/comment/${commentIdx}`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_COMMENT,
      };
    }
  },
  deleteComment: async (postIdx: string, commentIdx: number) => {
    try {
      await axios.delete(`/post/${postIdx}/comment/${commentIdx}`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_DELETE_COMMENT,
      };
    }
  },
};

export { board };
