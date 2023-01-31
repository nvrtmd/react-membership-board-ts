import axios from 'axios';
import { Member } from 'global/types';

const auth = {
  signUp: async (data: Member) => {
    const response = await axios.post(`/auth/signup`, data);
    switch (response.status / 100) {
      case 3:
        throw {
          message: `Redirects Error with status code ${response.status}`,
        };
      case 4:
        throw {
          message: `Client Error with status code ${response.status}`,
        };
      case 5:
        throw {
          message: `Server Error with status code ${response.status}`,
        };
      default:
        return response;
    }
  },
};

export { auth };
