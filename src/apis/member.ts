import axios from 'axios';
import { MEMBER_ERROR_MESSAGE } from 'constants/constants';
import { Member } from 'global/types';

const member = {
  getMemberInfo: async () => {
    try {
      const memberData = await axios.get(`/member/info`, { withCredentials: true });
      return memberData.data.data;
    } catch {
      throw {
        code: 500,
        message: MEMBER_ERROR_MESSAGE.CANNOT_GET_MEMBER_INFO_FROM_SERVER,
      };
    }
  },
  getMemberPosts: async (start: number, count: number) => {
    try {
      let memberPostsData;
      if (start >= 0 && count >= 0) {
        memberPostsData = await axios.get(`/member/posts?start=${start}&count=${count}`, { withCredentials: true });
      } else {
        memberPostsData = await axios.get(`/member/posts`, { withCredentials: true });
      }
      return memberPostsData.data.data;
    } catch {
      throw {
        code: 500,
        message: MEMBER_ERROR_MESSAGE.CANNOT_GET_MEMBER_POSTS_FROM_SERVER,
      };
    }
  },
  modifyMemberInfo: async (data: Member) => {
    try {
      await axios.patch(`/member/info`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: MEMBER_ERROR_MESSAGE.CANNOT_MODIFY_MEMBER_INFO,
      };
    }
  },
  deleteAccount: async () => {
    try {
      await axios.delete(`/member/`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: MEMBER_ERROR_MESSAGE.CANNOT_DELETE_ACCOUNT,
      };
    }
  },
};

export { member };
