export const MEMBER_ALERT_MESSAGE = {
  NOT_SIGNED_IN_USER_ALERT: '비로그인 사용자입니다.',
  MEMBER_INFO_MODIFIED_ALERT: '회원 정보가 수정되었습니다.',
  CHECK_YOUR_INPUT_ALERT: '입력하신 내용이 올바른지 확인해주세요.',
  DELETE_ACCOUNT_CONFIRM: '정말로 탈퇴하시겠습니까?',
};

export const MEMBER_ERROR_MESSAGE = {
  CANNOT_GET_MEMBER_INFO_FROM_SERVER: '서버로부터 회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_GET_MEMBER_POSTS_FROM_SERVER: '서버로부터 회원 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_MODIFY_MEMBER_INFO: '회원 정보 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_DELETE_ACCOUNT: '회원 탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요.',
};

export const AUTH_ALERT_MESSAGE = {
  ID_OR_PASSWORD_EMPTY_ALERT: '아이디 또는 비밀번호를 입력하세요.',
  SIGN_OUT_ALERT: '로그아웃 되었습니다.',
};

export const AUTH_ERROR_MESSAGE = {
  DUPLICATED_ID: '중복된 아이디가 존재합니다.',
  NOT_EXISTED_ID_OR_PASSWORD: '존재하지 않는 아이디 또는 비밀번호입니다.',
  CANNOT_SIGN_OUT: '로그아웃에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  NEED_SIGN_IN: '로그인이 필요합니다.',
};

export const VALIDATION_ALERT_MESSAGE = {
  ID_VALIDATION_ALERT: '영문 4 ~ 12자를 입력하세요.',
  PASSWORD_VALIDATION_ALERT: '숫자/특수문자 포함 8자 이상 입력하세요.',
  NICKNAME_VALIDATION_ALERT: '영어/숫자/한글 4~12자를 입력하세요.',
};

export const BOARD_ALERT_MESSAGE = {
  POST_NOT_EXIST_ALERT: '게시글이 존재하지 않습니다.',
  POST_DELETE_CONFIRM: '게시글을 삭제하시겠습니까?',
  POST_DELETED_ALERT: '게시글이 삭제되었습니다.',
  CONTENTS_EMPTY_ALERT: '내용을 작성하세요.',
  TITLE_OR_CONTENTS_EMPTY_ALERT: '제목 또는 본문을 작성하세요.',
  POST_MODIFIED_ALERT: '게시글이 수정되었습니다.',
  POST_MODIFIED_CANCEL_CONFIRM: '게시글 수정을 취소하시겠습니까?',
  NEED_SIGN_IN_CONFIRM: '로그인이 필요합니다. 확인 버튼을 클릭하면 로그인 페이지로 이동합니다.',
  POST_CREATED_ALERT: '게시글이 작성되었습니다.',
  POST_CREATE_CANCEL_CONFIRM: '게시글 작성을 취소하시겠습니까?',
  COMMENT_DELETE_CONFIRM: '댓글을 삭제하시겠습니까?',
  LOADING_TEXT: 'Loading...',
};

export const BOARD_ERROR_MESSAGE = {
  CANNOT_GET_POST_LIST_FROM_SERVER: '서버로부터 게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_GET_POST_DATA_FROM_SERVER: '서버로부터 게시글 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_GET_COMMENT_LIST: '서버로부터 댓글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_CREATE_POST: '게시글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  NEED_SIGN_IN: '로그인이 필요합니다.',
  ONLY_WRITER_CAN_MODIFY_OR_DELETE_POST: '게시글 수정 및 삭제는 작성자만 가능합니다.',
  CANNOT_MODIFY_OR_DELETE_POST: '게시글 수정 및 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_MODIFY_POST: '게시글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_DELETE_POST: '게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_CREATE_COMMENT: '댓글 작성에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_MODIFY_COMMENT: '댓글 수정에 실패하였습니다. 잠시 후 다시 시도해주세요.',
  CANNOT_DELETE_COMMENT: '댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.',
};

export const BOARD_PLACEHOLDER = {
  ONLY_SIGNED_IN_USERS_CAN_COMMENT: 'Only signed in users can post comment.',
  WRITE_YOUR_TITLE: 'Write your title',
  WRITE_YOUR_CONTENTS: 'Write your contents',
  WRITE_YOUR_COMMENT: 'Write your comment',
};
