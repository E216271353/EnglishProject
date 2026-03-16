import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login-page/login';
import LevelTest from './test-page/levelTest';
import Menu from './menu-page/menu';
import ReadingGame from './reading-game/readingGame';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/levelTest" element={<LevelTest />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/reading" element={<ReadingGame />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
