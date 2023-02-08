import axios from 'axios';
import { Member } from 'global/types';
import { member } from 'api/member';

const auth = {
  signUp: async (data: Member) => {
    try {
      await axios.post(`/auth/signup`, data);
    } catch {
      throw {
        code: 500,
        message: '중복된 아이디가 존재합니다.',
      };
    }
  },
  signIn: async (data: Member) => {
    try {
      await axios.post(`/auth/signin`, data, { withCredentials: true });
    } catch {
      alert('존재하지 않는 아이디 또는 비밀번호입니다.');
      throw {
        error: '존재하지 않는 아이디 또는 비밀번호입니다.',
      };
    }
  },
  signOut: async () => {
    try {
      await axios.get(`/auth/signout`, { withCredentials: true });
    } catch {
      throw {
        error: '로그아웃에 실패하였습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  },
  isSignedIn: async () => {
    try {
      await member.getMemberInfo();
    } catch (err) {
      throw { code: 500, message: '로그인이 필요합니다.' };
    }
  },
};

export { auth };
