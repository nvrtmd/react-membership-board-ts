import axios, { isAxiosError } from 'axios';
import { Member } from 'global/types';

const auth = {
  signUp: async (data: Member) => {
    try {
      await axios.post(`/auth/signup`, data);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        // TODO: 추후 백엔드에서 에러 세분화하여 전달하면 적절한 에러 처리 필요
        // status code에 따라 각각 대응 필요
        alert('중복된 아이디입니다.');
      }
    }
  },
};

export { auth };
