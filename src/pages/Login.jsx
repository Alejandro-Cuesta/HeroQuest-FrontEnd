import React from 'react';
import Header from '../components/UI/Header';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <div className="login-page">
      <Header />
      <main className="login-page__content">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;