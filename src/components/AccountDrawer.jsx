import React from 'react';

export default function AccountDrawer({
  isOpen,
  onClose,
  mainBalance,
  exposure,
  bonus = 0,
  onOpenDeposit,
  onOpenWithdraw,
  onViewOpenBets,
  onOpenTheme,
  onSelectPage
}) {
  return (
    <>
      <div 
        className={`account-drawer-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      <div className={`account-drawer-panel ${isOpen ? 'active' : ''}`}>
        {/* Drawer Header with Demo User (Screenshot 1) */}
        <div className="drawer-header">
          <div className="user-profile-header">
            <div className="user-avatar-large">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="user-meta">
              <span className="user-name">Demo User</span>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Account Panel">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          {/* Balance Information Card (Screenshot 1) */}
          <div className="balance-info-card">
            <div className="bic-title">
              <i className="fa-solid fa-building-columns"></i> Balance Information
            </div>

            <div className="bic-main-amount">
              <span className="bic-label">BALANCE</span>
              <span className="bic-val">₹ {mainBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="bic-sub-grid">
              <div className="bic-sub-item">
                <span className="bic-sub-label">BONUS</span>
                <span className="bic-sub-val">₹ {bonus.toFixed(2)}</span>
              </div>
              <div className="bic-sub-item">
                <span className="bic-sub-label">NET EXPOSURE</span>
                <span className="bic-sub-val text-danger">₹ {exposure.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Deposit & Withdraw Buttons (Green & Red from Screenshot 1) */}
            <div className="bic-btn-grid">
              <button className="btn-bic-deposit" onClick={onOpenDeposit}>
                <i className="fa-solid fa-credit-card"></i> Deposit
              </button>
              <button className="btn-bic-withdraw" onClick={onOpenWithdraw}>
                <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
              </button>
            </div>
          </div>

          {/* Statements Menu List (Screenshot 1) */}
          <div className="drawer-section-heading">Statements</div>
          <div className="drawer-menu-list">
            <div className="drawer-link" onClick={() => onSelectPage('transactions')}>
              <div className="dl-icon"><i className="fa-solid fa-arrow-right-arrow-left"></i></div>
              <div className="dl-label">Transaction</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('open-bets')}>
              <div className="dl-icon"><i className="fa-solid fa-dice"></i></div>
              <div className="dl-label">Open Bets</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('pnl')}>
              <div className="dl-icon"><i className="fa-solid fa-chart-line"></i></div>
              <div className="dl-label">Betting Profit & Loss</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('statement')}>
              <div className="dl-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
              <div className="dl-label">Account Statement</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('affiliate')}>
              <div className="dl-icon"><i className="fa-solid fa-users-gear"></i></div>
              <div className="dl-label">Affiliate Program</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('bonus')}>
              <div className="dl-icon"><i className="fa-solid fa-gift"></i></div>
              <div className="dl-label">Bonus Statement</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('turnover')}>
              <div className="dl-icon"><i className="fa-solid fa-wallet"></i></div>
              <div className="dl-label">Deposit Turnover</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('turnover-history')}>
              <div className="dl-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
              <div className="dl-label">Turnover History</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
          </div>

          {/* Account Settings (Screenshot 1 + Theme Option) */}
          <div className="drawer-section-heading">Account Settings</div>
          <div className="drawer-menu-list">
            <div className="drawer-link" onClick={onOpenTheme}>
              <div className="dl-icon"><i className="fa-solid fa-palette text-gold"></i></div>
              <div className="dl-label">Theme & Appearance</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('settings')}>
              <div className="dl-icon"><i className="fa-solid fa-gear"></i></div>
              <div className="dl-label">Settings</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
            <div className="drawer-link" onClick={() => onSelectPage('security')}>
              <div className="dl-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <div className="dl-label">2FA</div>
              <i className="fa-solid fa-chevron-right dl-arr"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
