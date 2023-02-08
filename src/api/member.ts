import axios from 'axios';
import { Member } from 'global/types';

const member = {
  getMemberInfo: async () => {
    try {
      const memberData = await axios.get(`/member/info`, { withCredentials: true });
      return memberData.data.data;
    } catch {
      throw {
        code: 500,
        message: '서버로부터 회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  getMemberPosts: async () => {
    try {
      const memberPostsData = await axios.get(`/member/posts`, { withCredentials: true });
      return memberPostsData.data.data;
    } catch {
      throw {
        error: '서버로부터 회원 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  modifyMemberInfo: async (data: Member) => {
    try {
      await axios.patch(`/member/info`, data, { withCredentials: true });
    } catch {
      throw {
        error: '회원 정보 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  deleteAccount: async () => {
    try {
      await axios.delete(`/member/`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: '회원 탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
};

export { member };
