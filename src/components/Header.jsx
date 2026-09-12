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
          <div className="logo-text classic-logo">
            <span className="logo-rollix">ROLLIX</span>
            <span className="logo-lotus-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M12 3c1.5 2.2 2.2 4.2 2.2 5.8 0 1.2-.5 2.2-1.4 2.8.9.4 1.6 1.2 2 2.2.6-1.2 1.6-2.2 2.8-2.8-1.8 3.2-1.4 5.8.2 7.6-2.2-.4-4.2.2-5.8 1.6-1.6-1.4-3.6-2-5.8-1.6 1.6-1.8 2-4.4.2-7.6 1.2.6 2.2 1.6 2.8 2.8.4-1 1.1-1.8 2-2.2-.9-.6-1.4-1.6-1.4-2.8C9.8 7.2 10.5 5.2 12 3z" fill="url(#lotusGoldGrad)"/>
                <defs>
                  <linearGradient id="lotusGoldGrad" x1="0" y1="0" x2="24" y2="24">
                    <stop stopColor="#ffe082"/>
                    <stop offset="0.5" stopColor="#ffb300"/>
                    <stop offset="1" stopColor="#ff8f00"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="logo-book">BOOK</span>
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
        <div className="header-user-status desktop-only-flex">
          <div className="user-login-sub">
            Login as <b className="text-gold">Demo User</b>
          </div>
          <div className="user-time-stamp">
            Sep 12th, 2026 (GMT +05:30)
          </div>
        </div>

        <button className="header-icon-pill notification-pill" onClick={() => alert("2 unread notifications.")} aria-label="Notifications">
          <i className="fa-solid fa-bell"></i>
          <span className="notif-badge">2</span>
        </button>

        <button className="btn-head-deposit-classic" onClick={onOpenDeposit} title="Instant Deposit">
          Deposit
        </button>

        <div className="header-balance-pill" onClick={onOpenAccount} title="Account">
          <span className="hbp-balance">₹ {(mainBalance || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          <span className="hbp-avatar" aria-hidden="true"><i className="fa-solid fa-user"></i></span>
        </div>

        <div className="header-desktop-extras desktop-only-flex">
          <button className="btn-head-fund btn-head-withdraw" onClick={onOpenWithdraw} title="Instant Withdraw">
            <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
          </button>
          <button 
            className="header-theme-btn" 
            onClick={onOpenTheme} 
            title="Change Color Theme"
          >
            <i className="fa-solid fa-palette text-gold"></i>
          </button>
          <button className="header-icon-pill" onClick={onToggleSound} title={soundEnabled ? "Mute Sound" : "Enable Sound"}>
            <i className={soundEnabled ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
