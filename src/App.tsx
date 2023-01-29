import HomePage from 'pages/HomePage';
import { ListPage as PostListPage } from 'pages/board/ListPage';
import { PostPage } from 'pages/board/PostPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignupPage } from 'pages/auth/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/list" element={<PostListPage />} />
        <Route path="/board/:postIdx" element={<PostPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
