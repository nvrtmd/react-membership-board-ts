import BoardPage from 'pages/BoardPage';
import HomePage from 'pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/list" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
