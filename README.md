# Yuzamin97 🌎
![image](https://user-images.githubusercontent.com/67324487/219047672-d0f219c3-1882-4c68-9bb7-5a476f5563b7.gif)


## 🌌Description
- 회원가입 및 로그인 기능이 제공되는 게시판 서비스
  - 게시글 작성이 가능하며 댓글을 통해 회원 간 소통이 가능합니다.

<br>


## 🪐Deployed Link

<a href="https://web-yuzamin97-luj2cldvrt49y.sel3.cloudtype.app/" target="_blank">🌏Link🌍</a>

<br>

## 🌍Implementation List
- 회원가입, 로그인/로그아웃 기능 구현
    - useReducer를 사용한 custom hook을 통해 아이디, 비밀번호, 닉네임 정보 입력 시 유효성 검사 실시
    - 유효한 정보가 입력되었을 시 회원가입 가능
    - custom hook을 통해 로그인 form에 입력되는 정보를 제어
    - 회원 DB에 존재하는 아이디 및 비밀번호를 입력 시 로그인 성공
- 게시글 작성 기능 구현
    - 로그인된 계정은 자신의 아이디가 작성자로 표시되는 게시글을 작성할 수 있음
    - 자신이 작성한 게시글 한정 수정 및 삭제 가능
- 댓글 작성 기능 구현
    - 게시글 상세 페이지에서 게시글에 대한 댓글을 작성할 수 있음
    - 자신이 작성한 댓글 한정 수정 및 삭제 가능
- 자신이 작성한 게시글 조회 기능 구현
    - 로그인 된 계정은 자신이 작성한 게시글을 조회할 수 있음
- 자신의 회원 정보 확인 및 수정 기능 구현
    - 로그인 된 계정은 자신의 회원 정보를 확인 및 수정할 수 있음
- 회원 탈퇴 기능 구현
    - My page에서 회원 탈퇴 가능
- IntersectionObserver API를 활용한 custom hook을 제작하여 Infinite Scroll 구현
<br>

## 🌏To Do List (23.02.11 ver.)
- [x] About 페이지 단장
- [x] SideNavBar에 홈으로 이동하는 버튼 생성 
- [x] Browser 컴포넌트의 닫기 버튼 클릭 시 Browser이 닫히는 기능 구현
- [x] 자신이 작성한 게시글의 상세 페이지에만 삭제 및 수정 버튼 표시
- [x] 비로그인 사용자의 경우 댓글 작성할 수 없도록 수정
- [x] useCallback, memo 등을 사용한 성능 최적화
- [x] IntersectionObserver를 사용한 무한 스크롤 구현
- [ ] 소셜 로그인 기능 추가

<br>

## 🌀Build Installation

```bash
# install dependencies
$ yarn add
# serve with hot reload at localhost:3000
$ yarn start
```

<br>


## 🗺Preview
<div style={display: flex;}>
<img src="https://user-images.githubusercontent.com/67324487/217620582-41534483-95ee-4f4e-b0c6-7fc01cc57ed7.png" alt="preview" width="500"/>
<img src="https://user-images.githubusercontent.com/67324487/217620619-1f78a131-58c4-420f-b245-21eb31fe3960.png" alt="drawing" width="500"/>
<img src="https://user-images.githubusercontent.com/67324487/217620663-e54ba8a2-763e-4bd9-ac04-d21caf92395a.png" alt="drawing" width="500"/>
<img src="https://user-images.githubusercontent.com/67324487/217620719-c6b71286-8c8e-4e08-8deb-4c9d4577262d.png" alt="drawing" width="500"/>
</div>


<br>


