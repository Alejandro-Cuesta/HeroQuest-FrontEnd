import React from 'react';
import Header from '../components/UI/Header';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => {
  return (
    <div className="register-page">
      <Header />
      <main className="register-page__content">
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;