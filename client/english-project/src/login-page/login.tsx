import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login, signUp } from '../services/user.service';
import type { User, UserLogin } from '../types/user';


const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      console.log('Sign Up:', formData);
    }
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Theme Toggle Button */}
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

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
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
                required={!isLogin}
              />
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
              required
            />
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
              required
            />
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
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            onClick={async (e) => {
              e.preventDefault();
              try {
                if (isLogin) {
                  const userLogin: UserLogin = { email: formData.email, password: formData.password };
                  const user = await login(userLogin);
                  sessionStorage.setItem('userId', user.id.toString());
                  sessionStorage.setItem('username', user.username);
                  navigate('/levelTest');
                } else {
                  const newUser: Partial<User> = { email: formData.email, password: formData.password, username: formData.fullName };
                  const user = await signUp(newUser as User);
                  sessionStorage.setItem('userId', user.id.toString());
                  sessionStorage.setItem('username', user.username);
                  navigate('/levelTest');
                }
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Fun Facts Section */}
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
