'use client';

import React, { useState } from 'react';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.5 7.1l.1.1 6.2 5.2C36.9 39 44 34 44 24c0-1.3-.1-2.5-.4-3.5z"/>
  </svg>
);

function BrandLogo() {
  return (
    <div className="auth-brand classic-logo">
      <span className="logo-rollix">ROLLIX</span>
      <span className="logo-lotus-mark" aria-hidden="true">✦</span>
      <span className="logo-book">BOOK</span>
    </div>
  );
}

function AuthShell({ children, onClose, onBack, showBackLabel }) {
  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="auth-top-row">
          <button type="button" className="auth-back-btn" onClick={onBack || onClose}>
            <i className="fa-solid fa-arrow-left"></i>
            {showBackLabel ? <span>Back</span> : null}
          </button>
          <button type="button" className="auth-close-btn" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <BrandLogo />
        {children}
      </div>
    </div>
  );
}

export function LoginModal({ isOpen, onClose, onSwitchRegister, onLoginSuccess, onToast }) {
  const [loginWith, setLoginWith] = useState('username');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const finishLogin = (profile) => {
    onLoginSuccess(profile);
    onToast?.(`Welcome, ${profile.displayName}!`, 'success');
    onClose();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const id = userId.trim().toLowerCase();
    const pass = password.trim();

    // Dummy accounts
    if ((id === 'demo' || id === 'demo user' || id === '9876543210') && (pass === 'demo123' || pass === '123456')) {
      finishLogin({
        username: 'Demo User',
        displayName: 'Demo User',
        phone: '9876543210',
        mainBalance: 145280,
        exposure: 8450,
        bonus: 2500
      });
      return;
    }

    if (id && pass.length >= 4) {
      finishLogin({
        username: userId.trim(),
        displayName: userId.trim(),
        phone: '',
        mainBalance: 10000,
        exposure: 0,
        bonus: 500
      });
      return;
    }

    setError('Use demo / demo123 or Demo login');
  };

  const handleDemoLogin = () => {
    finishLogin({
      username: 'Demo User',
      displayName: 'Demo User',
      phone: '9876543210',
      mainBalance: 145280,
      exposure: 8450,
      bonus: 2500
    });
  };

  const handleGoogle = () => {
    finishLogin({
      username: 'google.user',
      displayName: 'Google User',
      phone: '',
      mainBalance: 5000,
      exposure: 0,
      bonus: 100
    });
  };

  return (
    <AuthShell onClose={onClose} onBack={onClose}>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="auth-login-row">
          <div className="auth-field">
            <label>Login with</label>
            <div className="auth-select-wrap">
              <button
                type="button"
                className="auth-select"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                {loginWith === 'username' ? 'Username' : 'Phone Number'}
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              {dropdownOpen && (
                <div className="auth-select-menu">
                  <button
                    type="button"
                    className={loginWith === 'username' ? 'active' : ''}
                    onClick={() => { setLoginWith('username'); setDropdownOpen(false); }}
                  >
                    Username
                  </button>
                  <button
                    type="button"
                    className={loginWith === 'phone' ? 'active' : ''}
                    onClick={() => { setLoginWith('phone'); setDropdownOpen(false); }}
                  >
                    Phone Number
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="auth-field">
            <label>{loginWith === 'phone' ? 'Phone' : 'User ID'}</label>
            <input
              className="auth-input"
              type={loginWith === 'phone' ? 'tel' : 'text'}
              placeholder={loginWith === 'phone' ? 'Enter phone' : 'Enter username'}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
            />
          </div>
        </div>

        <div className="auth-field">
          <div className="auth-input-icon-wrap">
            <input
              className="auth-input"
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="button" className="auth-eye" onClick={() => setShowPass((v) => !v)} aria-label="Toggle password">
              <i className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
          </div>
        </div>

        <button type="button" className="auth-link-underline" onClick={() => onToast?.('Use demo / demo123', 'info')}>
          Forgot Password/Username
        </button>

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className="auth-btn auth-btn-primary">Login</button>
        <button type="button" className="auth-btn auth-btn-demo" onClick={handleDemoLogin}>Demo login</button>

        <p className="auth-switch-text">
          New User?{' '}
          <button type="button" className="auth-link-underline" onClick={onSwitchRegister}>
            Create an Account
          </button>
        </p>

        <div className="auth-divider"><span>or continue with</span></div>

        <button type="button" className="auth-btn auth-btn-google" onClick={handleGoogle}>
          <GoogleIcon /> Google
        </button>
      </form>
    </AuthShell>
  );
}

export function RegisterModal({ isOpen, onClose, onSwitchLogin, onRegisterSuccess, onToast }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [campaign, setCampaign] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const canRegister = otpVerified && username.trim().length >= 3 && password.length >= 4 && password === confirm;

  const handleGetOtp = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setOtpSent(true);
    setOtp('1234');
    onToast?.('Dummy OTP sent: 1234', 'success');
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === '1234') {
      setOtpVerified(true);
      setError('');
      onToast?.('OTP verified', 'success');
    } else {
      setError('Invalid OTP. Use 1234');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!canRegister) {
      setError('Verify OTP and fill all required fields');
      return;
    }
    onRegisterSuccess({
      username: username.trim(),
      displayName: username.trim(),
      phone: phone.trim(),
      mainBalance: 1000,
      exposure: 0,
      bonus: 100,
      campaignCode: campaign.trim()
    });
    onToast?.('Account created (demo)', 'success');
    onClose();
  };

  return (
    <AuthShell onClose={onClose} onBack={onSwitchLogin} showBackLabel>
      <form className="auth-form auth-register-form" onSubmit={handleRegister}>
        <div className="auth-phone-row">
          <div className="auth-ccode">
            +91 <i className="fa-solid fa-chevron-down"></i>
          </div>
          <input
            className="auth-input"
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
        </div>

        <button type="button" className="auth-btn auth-btn-muted" onClick={handleGetOtp}>
          Get OTP
        </button>

        <div className="auth-input-icon-wrap auth-otp-wrap">
          <input
            className="auth-input"
            type="text"
            placeholder={otpSent ? 'Enter OTP' : 'OTP'}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpSent}
          />
          <button type="button" className="auth-inline-verify" onClick={handleVerifyOtp} disabled={!otpSent}>
            Verify OTP
          </button>
        </div>
        {otpVerified && <div className="auth-ok-hint"><i className="fa-solid fa-circle-check"></i> Phone verified</div>}

        <input
          className="auth-input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="auth-input-icon-wrap">
          <input
            className="auth-input"
            type={showPass ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="auth-eye" onClick={() => setShowPass((v) => !v)}>
            <i className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </button>
        </div>

        <div className="auth-input-icon-wrap">
          <input
            className="auth-input"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Enter your confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="button" className="auth-eye" onClick={() => setShowConfirm((v) => !v)}>
            <i className={`fa-solid ${showConfirm ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </button>
        </div>

        <input
          className="auth-input"
          type="text"
          placeholder="Enter Campaign Code"
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
        />

        {error && <div className="auth-error">{error}</div>}

        <button type="submit" className={`auth-btn auth-btn-muted ${canRegister ? 'ready' : ''}`} disabled={!canRegister}>
          Register
        </button>

        <p className="auth-switch-text">
          Already have account?{' '}
          <button type="button" className="auth-link-underline" onClick={onSwitchLogin}>
            Sign in
          </button>
        </p>

        <div className="auth-divider"><span>or continue with</span></div>

        <button
          type="button"
          className="auth-btn auth-btn-google"
          onClick={() => {
            onRegisterSuccess({
              username: 'google.user',
              displayName: 'Google User',
              phone: '',
              mainBalance: 5000,
              exposure: 0,
              bonus: 100
            });
            onToast?.('Signed in with Google (demo)', 'success');
            onClose();
          }}
        >
          <GoogleIcon /> Google
        </button>
      </form>
    </AuthShell>
  );
}
