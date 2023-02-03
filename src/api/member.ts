import axios, { isAxiosError } from 'axios';
import { Member } from 'global/types';

const member = {
  getMemberInfo: async () => {
    try {
      const memberData = await axios.get(`/member/info`, { withCredentials: true });
      return memberData.data.data;
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        alert('서버로부터 회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        throw {
          error: '서버로부터 회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
        };
      }
    }
  },
};

export { member };
