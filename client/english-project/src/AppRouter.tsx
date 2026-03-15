import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login-page/login';
import LevelTest from './test-page/levelTest';
import Menu from './menu-page/menu';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/levelTest" element={<LevelTest />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
