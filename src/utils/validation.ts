const validation = {
  isValidId(data: string) {
    if (data.length <= 0) {
      return false;
    }
    const reg = /^[A-Za-z]{4,12}$/;
    return reg.test(data);
  },

  isValidPassword(data: string) {
    if (data.length <= 0) {
      return false;
    }
    const reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,}$/;
    return reg.test(data);
  },

  isValidNickname(data: string) {
    if (data.length <= 0) {
      return false;
    }
    const reg = /^[a-zA-Zㄱ-힣0-9]{4,12}$/;
    return reg.test(data);
  },
};

const validator = (type: string, data: string) => {
  switch (type) {
    case 'id':
      return validation.isValidId(data);
    case 'password':
      return validation.isValidPassword(data);
    case 'nickname':
      return validation.isValidNickname(data);
  }
};

export { validator };
