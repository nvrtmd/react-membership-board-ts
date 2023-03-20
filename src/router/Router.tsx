import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/etc/HomePage';
import { AboutPage } from 'pages/etc/AboutPage';
import { ListPage as PostListPage } from 'pages/board/ListPage';
import { PostPage } from 'pages/board/PostPage';
import { CreatePage } from 'pages/board/CreatePage';
import { ModifyPage } from 'pages/board/ModifyPage';
import { SignUpPage } from 'pages/auth/SignUpPage';
import { SignInPage } from 'pages/auth/SignInPage';
import { PrivateRoutes } from 'router/PrivateRoutes';
import { MyPostsPage } from 'pages/member/MyPostsPage';
import { MyInfoPage } from 'pages/member/MyInfoPage';
import { Layout } from 'components/layouts/Layout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/board/list" element={<PostListPage />} />
          <Route path="/board/:postIdx" element={<PostPage />} />
          <Route path="/board/create" element={<CreatePage />} />
          <Route path="/board/modify/:postIdx" element={<ModifyPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/member/posts" element={<MyPostsPage />} />
            <Route path="/member/info" element={<MyInfoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
