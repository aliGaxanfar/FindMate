import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Signup() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    // Decode the token to get user information (optional)
    const user = JSON.parse(atob(token.split('.')[1]));
    const { email, name } = user;

    // Save user data to the backend
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();
      if (data.success) {
        // Store user in localStorage and navigate to the questionnaire
        localStorage.setItem('user', JSON.stringify({ email, name }));
        navigate('/questionnaire');
      } else {
        alert('Failed to save user data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFailure = (error) => {
    console.error('Google Login Failed:', error);
    alert('Google Login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="633875969109-3gd6fpt2gtg3a204rmt6le3mnkmkegaj.apps.googleusercontent.com">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Signup</h2>
        <p>Sign up with your Google account to continue.</p>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
