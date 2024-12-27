import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redirect to dashboard after login (mock)
    window.location.href = '/dashboard';
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login to Azure WVD
      </button>
    </div>
  );
}

export default Login;
