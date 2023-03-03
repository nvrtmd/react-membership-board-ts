import axios, { AxiosError } from 'axios';
import { member } from 'apis/member';
import { AUTH_ERROR_MESSAGE } from 'constants/constants';
import { Member } from 'global/types';

const auth = {
  signUp: async (data: Member) => {
    try {
      await axios.post(`/auth/signup`, data);
    } catch (err) {
      const error = err as AxiosError;
      switch (error.response?.status) {
        case 409:
          throw { code: 409, message: AUTH_ERROR_MESSAGE.DUPLICATED_ID };
        case 500:
          throw { code: 500, message: AUTH_ERROR_MESSAGE.CANNOT_SIGN_UP };
        default:
          throw { code: 500, message: AUTH_ERROR_MESSAGE.CANNOT_SIGN_UP };
      }
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
