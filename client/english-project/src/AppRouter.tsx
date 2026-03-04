import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login-page/login';
import LevelTest from './test-page/levelTest';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/level-test" element={<LevelTest />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
