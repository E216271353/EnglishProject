import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login-page/login';
import LevelTest from './test-page/levelTest';
import Menu from './menu-page/menu';
import ReadingGame from './reading-game/readingGame';
import type { JSX } from 'react';

// קומפוננטה פנימית שבודקת הרשאות
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('token');
  
  // אם אין טוקן בזיכרון, נחזיר את המשתמש לדף הלוגין
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // אם יש טוקן, נציג לו את הדף שהוא ביקש
  return children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* דף לוגין - פתוח לכולם */}
      <Route path="/" element={<Login />} />

      {/* דפים מוגנים - רק למי שמחובר */}
      <Route 
        path="/levelTest" 
        element={
          <PrivateRoute>
            <LevelTest />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/menu" 
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/reading" 
        element={
          <PrivateRoute>
            <ReadingGame />
          </PrivateRoute>
        } 
      />
      
      {/* ברירת מחדל - אם המשתמש הקיש כתובת שלא קיימת, נחזיר אותו ללוגין */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;