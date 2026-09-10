import React from 'react';

export default function Header({
  searchQuery,
  onSearchChange,
  mainBalance,
  exposure,
  soundEnabled,
  onToggleSound,
  onOpenAccount,
  onToggleMobileMenu,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenTheme
}) {
  return (
    <header className="master-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onToggleMobileMenu} aria-label="Toggle Navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="rollix-icon-wrapper">
            <svg viewBox="0 0 38 38" className="rollix-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="rollixGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd54f" />
                  <stop offset="50%" stopColor="#ffb300" />
                  <stop offset="100%" stopColor="#ff8f00" />
                </linearGradient>
                <linearGradient id="rollixCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              {/* Isometric Hexagon Frame */}
              <path d="M19 2L35 10.5V27.5L19 36L3 27.5V10.5L19 2Z" fill="#0d1827" stroke="url(#rollixGold)" strokeWidth="2" />
              {/* Top Isometric Facet */}
              <path d="M19 2L35 10.5L19 19L3 10.5L19 2Z" fill="url(#rollixGold)" fillOpacity="0.3" />
              {/* Left Isometric Facet */}
              <path d="M3 10.5L19 19V36L3 27.5V10.5Z" fill="url(#rollixCyan)" fillOpacity="0.22" />
              {/* Rolling Dynamic 'R' Mark */}
              <path d="M14 11H22C24.5 11 26.5 12.8 26.5 15C26.5 17.2 24.5 19 22 19H17.5V27H14V11Z" fill="url(#rollixGold)" />
              <path d="M19 19L26.5 27H21.5L16 20.5H19Z" fill="url(#rollixGold)" />
              <rect x="17" y="14" width="5" height="2.8" rx="1" fill="#0d1827" />
              {/* Tech/Rolling Accent Nodes */}
              <circle cx="10" cy="8" r="1.4" fill="#ffd54f" />
              <circle cx="28" cy="8" r="1.4" fill="#38bdf8" />
              <circle cx="19" cy="31" r="1.6" fill="#ffd54f" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-rollix">ROLLIX</span><span className="logo-book">BOOK</span>
            <span className="logo-tag">EXCHANGE</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar-container">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            placeholder="Search Events (At least 3 letters)..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off" 
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => onSearchChange('')}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* User Status Ticker */}
        <div className="header-user-status">
          <div className="user-login-sub">
            Login as <b className="text-gold">Demo User</b>
          </div>
          <div className="user-time-stamp">
            Sep 10th, 2026 (GMT +05:30) 09:25:52
          </div>
        </div>

        {/* Balance & Exposure Pill */}
        <div className="header-balance-summary" onClick={onOpenAccount}>
          <div className="hb-line">
            <span>Available Balance:</span> <b>₹ {mainBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
          </div>
          <div className="hb-line exposure-hb">
            <span>Exposure:</span> <b className="text-danger">₹ {exposure.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
          </div>
        </div>

        {/* Quick Deposit & Withdraw Buttons */}
        <div className="header-quick-funds">
          <button className="btn-head-fund btn-head-deposit" onClick={onOpenDeposit} title="Instant Deposit">
            <i className="fa-solid fa-wallet"></i> Deposit
          </button>
          <button className="btn-head-fund btn-head-withdraw" onClick={onOpenWithdraw} title="Instant Withdraw">
            <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
          </button>
        </div>

        {/* Color Theme Selector Trigger */}
        <button 
          className="header-theme-btn" 
          onClick={onOpenTheme} 
          title="Change Color Theme (Obsidian, Emerald, Sapphire, Neon, Ruby, Light)"
        >
          <i className="fa-solid fa-palette text-gold"></i>
          <span className="header-theme-text">Theme</span>
        </button>

        {/* Sound Toggle */}
        <button className="header-icon-pill" onClick={onToggleSound} title={soundEnabled ? "Mute Sound" : "Enable Sound"}>
          <i className={soundEnabled ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"}></i>
        </button>

        {/* Notifications */}
        <button className="header-icon-pill notification-pill" onClick={() => alert("2 unread trade confirmations.")}>
          <i className="fa-solid fa-bell"></i>
          <span className="notif-badge">2</span>
        </button>

        {/* Account Trigger */}
        <button className="btn-head-account" onClick={onOpenAccount}>
          <i className="fa-solid fa-gear"></i> Account
        </button>
      </div>
    </header>
  );
}
