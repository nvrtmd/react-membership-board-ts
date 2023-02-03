import axios from 'axios';
import { Member } from 'global/types';
import { member } from 'api/member';

const auth = {
  signUp: async (data: Member) => {
    try {
      await axios.post(`/auth/signup`, data);
    } catch {
      alert('중복된 아이디입니다.');
      throw {
        error: '중복된 아이디입니다.',
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
  isSignedIn: async () => {
    try {
      await member.getMemberInfo();
    } catch {
      throw {
        error: '인증되지 않은 사용자입니다. 로그인이 필요합니다.',
      };
    }
  },
};

export { auth };
