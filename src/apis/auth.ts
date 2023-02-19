import axios from 'axios';
import { Member } from 'global/types';
import { member } from 'apis/member';
import { AUTH_ERROR_MESSAGE } from 'constants/constants';

const auth = {
  signUp: async (data: Member) => {
    try {
      await axios.post(`/auth/signup`, data);
    } catch {
      throw {
        code: 500,
        message: AUTH_ERROR_MESSAGE.DUPLICATED_ID,
      };
    }
  },
  signIn: async (data: Member) => {
    try {
      await axios.post(`/auth/signin`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: AUTH_ERROR_MESSAGE.NOT_EXISTED_ID_OR_PASSWORD,
      };
    }
  },
  signOut: async () => {
    try {
      await axios.get(`/auth/signout`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: AUTH_ERROR_MESSAGE.CANNOT_SIGN_OUT,
      };
    }
  },
  isSignedIn: async () => {
    try {
      await member.getMemberInfo();
    } catch (err) {
      throw { code: 500, message: AUTH_ERROR_MESSAGE.NEED_SIGN_IN };
    }
  },
};

export { auth };
