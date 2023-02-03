import HomePage from 'pages/HomePage';
import { ListPage as PostListPage } from 'pages/board/ListPage';
import { PostPage } from 'pages/board/PostPage';
import { CreatePage } from 'pages/board/CreatePage';
import { ModifyPage } from 'pages/board/ModifyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUpPage } from 'pages/auth/SignUpPage';
import { SignInPage } from 'pages/auth/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/list" element={<PostListPage />} />
        <Route path="/board/:postIdx" element={<PostPage />} />
        <Route path="/board/create" element={<CreatePage />} />
        <Route path="/board/modify/:postIdx" element={<ModifyPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
