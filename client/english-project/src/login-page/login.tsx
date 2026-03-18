import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login, signUp } from '../services/user.service';
import type { User, UserLogin, UserSignUp } from '../types/user';
import { useUserLevel } from '../context/UserLevelContext';
import { getUserLevel } from '../services/currentUserLevel.service';

const Login = () => {
  const navigate = useNavigate();
  const { setUserLevels } = useUserLevel();
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({}); // State חדש לשגיאות
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  // פונקציית ולידציה - בודקת את הנתונים לפני השליחה
  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.email) {
      newErrors.email = 'חובה להזין כתובת אימייל';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'פורמט האימייל אינו תקין';
    }

    if (!formData.password) {
      newErrors.password = 'חובה להזין סיסמה';
    } else if (formData.password.length < 8) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 8 תווים';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'הסיסמה חייבת לכלול אות גדולה, אות קטנה ומספר';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'חובה להזין שם מלא';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // מנקה את השגיאה של השדה הספציפי כשהמשתמש מתחיל להקליד
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="auth-card">
        <div className="decorative-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="auth-header">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-icon">📚</span>
            </div>
          </div>
          <h1 className="auth-title">English Learning</h1>
          <p className="auth-subtitle">
            {isLogin ? '🌟 Welcome Back, Young Scholar! 🌟' : '🎉 Join Our Learning Adventure! 🎉'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setErrors({}); }}
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setErrors({}); }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}


          <button
            type="submit"
            className="submit-btn"
            onClick={async (e) => {
              e.preventDefault();
              if (!validate()) return; // אם הוולידציה נכשלה - לא שולח לשרת

try {
  if (isLogin) {
    const userLogin = { 
      email: formData.email, 
      password: formData.password 
    };
    
    // קוראים לשרת ומקבלים את האובייקט המלא
    const response: any = await login(userLogin);
    
    // בדיקה: אם השרת החזיר אובייקט עם שדה Token (באות גדולה או קטנה)
    const token = response.token || response.Token;
    const userData = response.user || response.User;

    if (token && userData) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userData.id.toString());
      sessionStorage.setItem('username', userData.username);
      
      // Fetch and set user levels immediately after login
      try {
        const levels = await getUserLevel(userData.id);
        if (levels) {
          setUserLevels({
            grammarLevel: levels.grammarLevel,
            vocabularyLevel: levels.vocabularyLevel,
            readingLevel: levels.readingLevel
          });
        }
      } catch (err) {
        console.warn('Could not fetch user levels during login:', err);
      }
      
      navigate('/menu');
    }
  } else {
    const userSignUp: UserSignUp = { 
      username: formData.fullName, 
      email: formData.email, 
      password: formData.password 
    };
    const response: any = await signUp(userSignUp);
    const token = response.token || response.Token;
    const userData = response.user || response.User;

    if (token && userData) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userData.id.toString());
      sessionStorage.setItem('username', userData.username);
      navigate('/levelTest');
    }
  }
} catch (error: any) {
  console.error("פרטי השגיאה:", error);
  
  // Handle different types of errors in Hebrew
  let errorMessage = '';
  
  if (error.response) {
    // Server responded with error status
    const serverError = error.response.data;
    
    if (typeof serverError === 'string') {
      errorMessage = serverError;
    } else if (serverError?.message) {
      errorMessage = serverError.message;
    } else if (error.response.status === 401) {
      errorMessage = isLogin ? 'אימייל או סיסמה שגויים' : 'יצירת החשבון נכשלה';
    } else if (error.response.status === 400) {
      errorMessage = isLogin ? 'פרטי התחברות שגויים' : 'נתוני הרשמה לא תקינים';
    } else {
      errorMessage = 'אירעה שגיאה. אנא נסה שנית.';
    }
  } else if (error.request) {
    // Request made but no response
    errorMessage = 'לא ניתן להתחבר לשרת. אנא בדוק את החיבור שלך.';
  } else {
    // Something else happened
    errorMessage = 'אירעה שגיאה בלתי צפויה.';
  }
  
  setErrors({ server: errorMessage });
}
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          {errors.server && <p className="error-text server-error" style={{textAlign: 'center'}}>{errors.server}</p>}
        </form>

        <div className="fun-fact">
          <div className="divider">
            <span>✨ Did you know? ✨</span>
          </div>
          <p className="fact-text">
            {isLogin
              ? 'Learning a new language improves your memory! 🧠'
              : 'English is spoken by over 1.5 billion people worldwide! 🌍'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;