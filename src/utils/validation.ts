const validation = {
  isValidId(data: string) {
    if (!data) {
      return false;
    }
    const reg = /^[a-zA-Z][0-9a-zA-Z]{4,7}$/;
    return reg.test(data);
  },

  isValidPassword(data: string) {
    if (!data) {
      return false;
    }
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return reg.test(data);
  },

  isValidNickname(data: string) {
    if (!data) {
      return false;
    }
    const reg = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*{1,20}$/;
    return reg.test(data);
  },
};

export { validation };
