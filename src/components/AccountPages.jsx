import React, { useState } from 'react';

export default function AccountPages({
  isOpen,
  onClose,
  initialPage = 'transactions',
  user,
  openBets = [],
  onCashoutBet,
  onOpenDeposit,
  onOpenWithdraw
}) {
  const [activeTab, setActiveTab] = useState(initialPage);
  const [copiedLink, setCopiedLink] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [dateFilter, setDateFilter] = useState('7d');
  const [txnTypeFilter, setTxnTypeFilter] = useState('all');
  const [pnlSportFilter, setPnlSportFilter] = useState('all');

  // Keep synced if initialPage changes when opened
  React.useEffect(() => {
    if (initialPage) {
      setActiveTab(initialPage);
    }
  }, [initialPage]);

  if (!isOpen) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText('https://rollixbook.exchange/ref/DEMO8892');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Mock Data for Statements & Ledgers
  const mockTransactions = [
    { id: "TXN-99401", date: "10 Sep 2026, 09:15", type: "DEPOSIT", channel: "Instant UPI (GPay)", amount: 50000, status: "SUCCESS", balanceAfter: 145280.00 },
    { id: "TXN-99388", date: "09 Sep 2026, 21:40", type: "BET_WON", channel: "England vs Pakistan (Match Odds)", amount: 18500, status: "SUCCESS", balanceAfter: 95280.00 },
    { id: "TXN-99342", date: "09 Sep 2026, 18:22", type: "WITHDRAWAL", channel: "IMPS Bank Transfer (HDFC)", amount: 25000, status: "SUCCESS", balanceAfter: 76780.00 },
    { id: "TXN-99210", date: "08 Sep 2026, 16:05", type: "BET_PLACED", channel: "Pakistan vs India 6 Over Runs", amount: 5000, status: "SUCCESS", balanceAfter: 101780.00 },
    { id: "TXN-99150", date: "07 Sep 2026, 14:10", type: "BONUS", channel: "Weekly VIP Turnover Cashback", amount: 2500, status: "SUCCESS", balanceAfter: 106780.00 },
    { id: "TXN-99080", date: "06 Sep 2026, 11:30", type: "DEPOSIT", channel: "IMPS Instant Wire", amount: 70000, status: "SUCCESS", balanceAfter: 104280.00 }
  ];

  const mockPnlRecords = [
    { id: "PNL-812", date: "09 Sep 2026", sport: "Cricket", match: "England vs Pakistan", market: "Match Odds - England", stake: 10000, pnl: 8500, roi: "+85%", result: "WON" },
    { id: "PNL-811", date: "09 Sep 2026", sport: "Football", match: "Uruguay vs Colombia", market: "Over 2.5 Goals", stake: 4000, pnl: -4000, roi: "-100%", result: "LOST" },
    { id: "PNL-810", date: "08 Sep 2026", sport: "Cricket", match: "Pakistan vs India", market: "10 Over Runs Lay 83", stake: 6000, pnl: 6000, roi: "+100%", result: "WON" },
    { id: "PNL-809", date: "08 Sep 2026", sport: "Tennis", match: "Alcaraz vs Sinner", market: "Set 1 Winner - Sinner", stake: 5000, pnl: 4200, roi: "+84%", result: "WON" },
    { id: "PNL-808", date: "07 Sep 2026", sport: "Casino", match: "Aviator X Multiplier", market: "Cashout @ 3.42x", stake: 2000, pnl: 4840, roi: "+242%", result: "WON" },
    { id: "PNL-807", date: "07 Sep 2026", sport: "Cricket", match: "Essex W vs Yorkshire W", market: "Match Odds - Yorkshire Lay", stake: 3000, pnl: -3420, roi: "-114%", result: "LOST" }
  ];

  const mockLedger = [
    { date: "10-09-2026 09:15", ref: "DEP/UPI/88921", desc: "Instant UPI Deposit (UTR: 3290192830)", debit: null, credit: 50000.00, balance: 145280.00 },
    { date: "09-09-2026 21:40", ref: "SETTLE/ENG-PAK", desc: "Match Odds Settlement Won: England", debit: null, credit: 18500.00, balance: 95280.00 },
    { date: "09-09-2026 18:22", ref: "WTH/IMPS/77102", desc: "Withdrawal to HDFC Bank A/c **4920", debit: 25000.00, credit: null, balance: 76780.00 },
    { date: "09-09-2026 15:30", ref: "BET/ENG-PAK/01", desc: "Bet Placed: Back England @ 1.85", debit: 10000.00, credit: null, balance: 101780.00 },
    { date: "08-09-2026 19:10", ref: "COMM/PROMO/09", desc: "0% Commission Rebate Credit", debit: null, credit: 450.00, balance: 111780.00 },
    { date: "08-09-2026 16:05", ref: "BET/PAK-IND/06", desc: "Session Bet: Lay 83 Runs", debit: 6000.00, credit: null, balance: 111330.00 }
  ];

  const mockAffiliates = [
    { user: "vip_trader_99", joined: "01 Sep 2026", turnover: 450000, comm: 15750.00, status: "Active" },
    { user: "cricket_king_in", joined: "28 Aug 2026", turnover: 320000, comm: 11200.00, status: "Active" },
    { user: "mumbai_exchange", joined: "24 Aug 2026", turnover: 890000, comm: 31150.00, status: "Active" },
    { user: "sports_ace77", joined: "18 Aug 2026", turnover: 180000, comm: 6300.00, status: "Active" },
    { user: "delhi_pro_bettor", joined: "12 Aug 2026", turnover: 640000, comm: 22400.00, status: "Active" }
  ];

  const mockTurnoverCycles = [
    { id: "CYC-04", deposit: 50000, required: 50000, achieved: 62400, date: "Active Cycle", status: "COMPLETED (124%)" },
    { id: "CYC-03", deposit: 70000, required: 70000, achieved: 88500, date: "08 Sep 2026", status: "COMPLETED (126%)" },
    { id: "CYC-02", deposit: 30000, required: 30000, achieved: 34200, date: "01 Sep 2026", status: "COMPLETED (114%)" },
    { id: "CYC-01", deposit: 25000, required: 25000, achieved: 31000, date: "24 Aug 2026", status: "COMPLETED (124%)" }
  ];

  const navItems = [
    { id: 'transactions', label: 'Transactions', icon: 'fa-arrow-right-arrow-left', badge: '6' },
    { id: 'open-bets', label: 'Open Bets', icon: 'fa-dice', badge: openBets.length ? String(openBets.length) : null },
    { id: 'pnl', label: 'Betting P&L', icon: 'fa-chart-line', badge: '+₹42.3K' },
    { id: 'statement', label: 'Account Statement', icon: 'fa-file-invoice-dollar' },
    { id: 'affiliate', label: 'Affiliate Program', icon: 'fa-users-gear', badge: '35%' },
    { id: 'bonus', label: 'Bonus Statement', icon: 'fa-gift', badge: '₹5,000' },
    { id: 'turnover', label: 'Deposit Turnover', icon: 'fa-wallet', badge: '121%' },
    { id: 'turnover-history', label: 'Turnover History', icon: 'fa-clock-rotate-left' },
    { id: 'settings', label: 'Settings & KYC', icon: 'fa-gear' },
    { id: 'security', label: 'Security & 2FA', icon: 'fa-shield-halved', badge: 'Active' }
  ];

  return (
    <div className="account-modal-backdrop" onClick={onClose}>
      <div className="account-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="account-topbar">
          <div className="account-user-brief">
            <div className="aub-avatar">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="aub-details">
              <div className="aub-name">
                <span>Demo User</span>
                <span className="aub-uid">#RB-889210</span>
                <span className="aub-vip-badge"><i className="fa-solid fa-crown"></i> Diamond VIP</span>
              </div>
              <div className="aub-meta">
                <span>Main Wallet: <b className="text-success">₹ {user.mainBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</b></span>
                <span className="dot-sep">•</span>
                <span>Exposure: <b className="text-danger">₹ {user.exposure.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</b></span>
                <span className="dot-sep">•</span>
                <span>KYC: <b className="text-success"><i className="fa-solid fa-circle-check"></i> Level 2 Verified</b></span>
              </div>
            </div>
          </div>

          <div className="account-topbar-actions">
            <button className="btn-account-fund btn-acc-dep" onClick={onOpenDeposit}>
              <i className="fa-solid fa-wallet"></i> Deposit
            </button>
            <button className="btn-account-fund btn-acc-wth" onClick={onOpenWithdraw}>
              <i className="fa-solid fa-money-bill-transfer"></i> Withdraw
            </button>
            <button className="btn-account-close" onClick={onClose} aria-label="Close Account Panel">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Master Body: Nav Sidebar + Content Tab */}
        <div className="account-view-layout">
          {/* Sub Navigation Sidebar */}
          <div className="account-nav-sidebar">
            <div className="account-nav-list">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`account-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <i className={`fa-solid ${item.icon} acc-nav-icon`}></i>
                  <span className="acc-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`acc-nav-badge ${item.id === 'pnl' ? 'badge-profit' : item.id === 'open-bets' ? 'badge-open' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Content Area */}
          <div className="account-content-area">
            {/* ================= 1. TRANSACTIONS TAB ================= */}
            {activeTab === 'transactions' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-arrow-right-arrow-left text-gold"></i> Transaction History</h2>
                    <p className="ach-sub">Comprehensive record of all deposits, withdrawals, and wager settlements.</p>
                  </div>
                  <div className="ach-controls">
                    <div className="filter-pill-group">
                      {['all', 'deposit', 'withdrawal', 'bet'].map(t => (
                        <button 
                          key={t}
                          className={`filter-pill ${txnTypeFilter === t ? 'active' : ''}`}
                          onClick={() => setTxnTypeFilter(t)}
                        >
                          {t.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <button className="btn-action-outline" onClick={() => alert('Exporting CSV statement...')}>
                      <i className="fa-solid fa-file-excel"></i> Export CSV
                    </button>
                  </div>
                </div>

                {/* Summary Stat Cards */}
                <div className="stat-cards-grid">
                  <div className="stat-card">
                    <span className="sc-label">Total Deposits (30D)</span>
                    <span className="sc-val text-success">₹ 1,20,000.00</span>
                    <span className="sc-sub">2 Successful Transactions</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Total Withdrawals (30D)</span>
                    <span className="sc-val text-info">₹ 25,000.00</span>
                    <span className="sc-sub">Processed to HDFC Bank</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Net Gaming Cashflow</span>
                    <span className="sc-val text-gold">+₹ 95,000.00</span>
                    <span className="sc-sub">Healthy Positive Balance</span>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Txn Ref ID</th>
                        <th>Type</th>
                        <th>Channel / Narration</th>
                        <th className="text-right">Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map(tx => (
                        <tr key={tx.id}>
                          <td>{tx.date}</td>
                          <td><span className="code-badge">{tx.id}</span></td>
                          <td>
                            <span className={`txn-badge badge-${tx.type.toLowerCase()}`}>
                              {tx.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td>{tx.channel}</td>
                          <td className={`text-right font-mono font-bold ${tx.type === 'DEPOSIT' || tx.type === 'BET_WON' || tx.type === 'BONUS' ? 'text-success' : 'text-danger'}`}>
                            {tx.type === 'WITHDRAWAL' || tx.type === 'BET_PLACED' ? '-' : '+'}₹ {tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td>
                            <span className="status-pill status-success">
                              <i className="fa-solid fa-check"></i> {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= 2. OPEN BETS TAB ================= */}
            {activeTab === 'open-bets' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-dice text-gold"></i> Active Open Bets</h2>
                    <p className="ach-sub">Currently matched exchange orders and live in-play wagers.</p>
                  </div>
                  <div className="ach-controls">
                    <span className="open-count-indicator">
                      <b>{openBets.length}</b> Live Bets In Play
                    </span>
                  </div>
                </div>

                {openBets.length === 0 ? (
                  <div className="empty-account-box">
                    <i className="fa-solid fa-receipt empty-icon"></i>
                    <h3>No Active Bets Found</h3>
                    <p>Select odds from the exchange or cricket session markets to place bets.</p>
                  </div>
                ) : (
                  <div className="acc-table-card">
                    <table className="acc-data-table">
                      <thead>
                        <tr>
                          <th>Placed At</th>
                          <th>Match & Event</th>
                          <th>Runner / Selection</th>
                          <th>Type</th>
                          <th className="text-center">Odds</th>
                          <th className="text-right">Stake</th>
                          <th className="text-right">Potential Return</th>
                          <th className="text-right">Cashout</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {openBets.map(bet => {
                          const isBack = bet.type === 'BACK';
                          const potential = isBack ? bet.profit : bet.liability;
                          return (
                            <tr key={bet.id}>
                              <td className="text-muted font-mono text-xs">Today, Live</td>
                              <td className="font-bold">{bet.match}</td>
                              <td><span className="runner-highlight">{bet.runner}</span></td>
                              <td>
                                <span className={`bet-type-tag ${isBack ? 'tag-back' : 'tag-lay'}`}>
                                  {bet.type}
                                </span>
                              </td>
                              <td className="text-center font-mono font-bold">{bet.odds.toFixed(2)}</td>
                              <td className="text-right font-mono">₹ {bet.stake.toLocaleString('en-IN')}</td>
                              <td className={`text-right font-mono font-bold ${isBack ? 'text-success' : 'text-danger'}`}>
                                {isBack ? `+₹${potential.toLocaleString('en-IN')}` : `-₹${potential.toLocaleString('en-IN')}`}
                              </td>
                              <td className="text-right font-mono text-success font-bold">
                                ₹ {bet.cashoutVal?.toLocaleString('en-IN') || bet.stake}
                              </td>
                              <td className="text-center">
                                <button 
                                  className="btn-acc-cashout"
                                  onClick={() => onCashoutBet(bet.id, bet.cashoutVal || bet.stake)}
                                >
                                  Cashout
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ================= 3. BETTING P&L TAB ================= */}
            {activeTab === 'pnl' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-chart-line text-gold"></i> Betting Profit & Loss</h2>
                    <p className="ach-sub">Detailed breakdown of realized returns across all sports and gaming sessions.</p>
                  </div>
                  <div className="ach-controls">
                    <div className="filter-pill-group">
                      {['all', 'cricket', 'football', 'tennis', 'casino'].map(s => (
                        <button 
                          key={s}
                          className={`filter-pill ${pnlSportFilter === s ? 'active' : ''}`}
                          onClick={() => setPnlSportFilter(s)}
                        >
                          {s.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Metrics Cards */}
                <div className="stat-cards-grid">
                  <div className="stat-card">
                    <span className="sc-label">Net Realized P&L</span>
                    <span className="sc-val text-success">+₹ 42,390.00</span>
                    <span className="sc-sub"><i className="fa-solid fa-arrow-trend-up"></i> +29.18% Portfolio Gain</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Win Rate</span>
                    <span className="sc-val text-info">68.4%</span>
                    <span className="sc-sub">52 Won / 24 Lost</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Exchange Commission</span>
                    <span className="sc-val text-gold">₹ 0.00</span>
                    <span className="sc-sub">0% Commission VIP Promotion</span>
                  </div>
                </div>

                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Sport</th>
                        <th>Match / Market</th>
                        <th className="text-right">Total Stake</th>
                        <th className="text-right">Net P&L</th>
                        <th className="text-center">ROI</th>
                        <th className="text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPnlRecords.map(p => (
                        <tr key={p.id}>
                          <td>{p.date}</td>
                          <td><span className="sport-chip">{p.sport}</span></td>
                          <td>
                            <div className="table-match-title">{p.match}</div>
                            <div className="table-market-sub text-muted">{p.market}</div>
                          </td>
                          <td className="text-right font-mono">₹ {p.stake.toLocaleString('en-IN')}</td>
                          <td className={`text-right font-mono font-bold ${p.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                            {p.pnl >= 0 ? `+₹ ${p.pnl.toLocaleString('en-IN')}` : `-₹ ${Math.abs(p.pnl).toLocaleString('en-IN')}`}
                          </td>
                          <td className={`text-center font-mono font-bold ${p.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                            {p.roi}
                          </td>
                          <td className="text-center">
                            <span className={`status-pill ${p.result === 'WON' ? 'status-success' : 'status-danger'}`}>
                              {p.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= 4. ACCOUNT STATEMENT TAB ================= */}
            {activeTab === 'statement' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-file-invoice-dollar text-gold"></i> Account Statement</h2>
                    <p className="ach-sub">Official accounting ledger tracking running balances and audited statements.</p>
                  </div>
                  <div className="ach-controls">
                    <button className="btn-action-outline" onClick={() => window.print()}>
                      <i className="fa-solid fa-print"></i> Print Statement
                    </button>
                  </div>
                </div>

                <div className="statement-ledger-summary">
                  <div className="sls-item">
                    <span className="sls-lbl">Opening Balance</span>
                    <span className="sls-num">₹ 1,00,000.00</span>
                  </div>
                  <div className="sls-item">
                    <span className="sls-lbl">Total Credits</span>
                    <span className="sls-num text-success">+₹ 68,950.00</span>
                  </div>
                  <div className="sls-item">
                    <span className="sls-lbl">Total Debits</span>
                    <span className="sls-num text-danger">-₹ 41,000.00</span>
                  </div>
                  <div className="sls-item">
                    <span className="sls-lbl">Closing Balance</span>
                    <span className="sls-num text-gold font-bold">₹ 1,45,280.00</span>
                  </div>
                </div>

                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Ref Number</th>
                        <th>Narration / Details</th>
                        <th className="text-right">Debit (₹)</th>
                        <th className="text-right">Credit (₹)</th>
                        <th className="text-right">Running Balance (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLedger.map((row, idx) => (
                        <tr key={idx}>
                          <td className="font-mono text-xs">{row.date}</td>
                          <td><span className="code-badge">{row.ref}</span></td>
                          <td>{row.desc}</td>
                          <td className="text-right font-mono text-danger font-bold">
                            {row.debit ? `-₹ ${row.debit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '-'}
                          </td>
                          <td className="text-right font-mono text-success font-bold">
                            {row.credit ? `+₹ ${row.credit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '-'}
                          </td>
                          <td className="text-right font-mono font-bold">
                            ₹ {row.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= 5. AFFILIATE PROGRAM TAB ================= */}
            {activeTab === 'affiliate' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-users-gear text-gold"></i> Affiliate & Partner Program</h2>
                    <p className="ach-sub">Earn up to 35% weekly commission on all trading volume and casino turnover.</p>
                  </div>
                  <div className="ach-controls">
                    <span className="affiliate-tier-badge">
                      <i className="fa-solid fa-gem text-info"></i> Diamond Affiliate (35% Tier)
                    </span>
                  </div>
                </div>

                {/* Referral Link Card */}
                <div className="affiliate-share-box">
                  <div className="asb-left">
                    <span className="asb-title">Your Exclusive Referral Link</span>
                    <span className="asb-desc">Share this link with your players. Commissions are credited weekly directly into your main wallet.</span>
                    <div className="ref-input-group">
                      <input 
                        type="text" 
                        readOnly 
                        value="https://rollixbook.exchange/ref/DEMO8892" 
                        className="ref-link-input"
                      />
                      <button className="btn-copy-ref" onClick={handleCopyRef}>
                        <i className={`fa-solid ${copiedLink ? 'fa-check' : 'fa-copy'}`}></i>
                        {copiedLink ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                  <div className="asb-right">
                    <div className="qr-box-mini">
                      <i className="fa-solid fa-qrcode qr-icon-large"></i>
                      <span>Scan to Join</span>
                    </div>
                  </div>
                </div>

                {/* Affiliate Stats */}
                <div className="stat-cards-grid">
                  <div className="stat-card">
                    <span className="sc-label">Total Referrals</span>
                    <span className="sc-val text-info">124</span>
                    <span className="sc-sub">86 Active This Week</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Total Volume Generated</span>
                    <span className="sc-val text-gold">₹ 52,40,000.00</span>
                    <span className="sc-sub">Across Exchange & Live Casino</span>
                  </div>
                  <div className="stat-card">
                    <span className="sc-label">Total Commission Paid</span>
                    <span className="sc-val text-success">₹ 1,82,450.00</span>
                    <span className="sc-sub">Next Payout: Monday</span>
                  </div>
                </div>

                {/* Referred Players Ledger */}
                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Player Username</th>
                        <th>Joined Date</th>
                        <th className="text-right">30D Turnover</th>
                        <th className="text-right">Your 35% Commission</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAffiliates.map((aff, i) => (
                        <tr key={i}>
                          <td className="font-bold">{aff.user}</td>
                          <td>{aff.joined}</td>
                          <td className="text-right font-mono">₹ {aff.turnover.toLocaleString('en-IN')}</td>
                          <td className="text-right font-mono font-bold text-success">
                            +₹ {aff.comm.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td>
                            <span className="status-pill status-success">{aff.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= 6. BONUS STATEMENT TAB ================= */}
            {activeTab === 'bonus' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-gift text-gold"></i> Bonus Statement & Rollover</h2>
                    <p className="ach-sub">Track your promotional funds, wagering rollover progress, and unlocked cash rewards.</p>
                  </div>
                </div>

                {/* Bonus Rollover Progress Card */}
                <div className="bonus-progress-card">
                  <div className="bpc-header">
                    <div className="bpc-title">
                      <span className="bpc-badge">ACTIVE BONUS</span>
                      <h3>100% Sportsbook Welcome Bonus</h3>
                    </div>
                    <span className="bpc-amount">₹ 5,000.00</span>
                  </div>

                  <div className="bpc-progress-bar-container">
                    <div className="bpc-bar-labels">
                      <span>Rollover Completed: ₹32,500 / ₹50,000</span>
                      <span className="font-bold text-gold">65%</span>
                    </div>
                    <div className="bpc-track">
                      <div className="bpc-fill" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div className="bpc-meta-footer">
                    <span><i className="fa-regular fa-clock"></i> Expires in <b>4 days 18 hours</b></span>
                    <span>Required Turnover: <b>10x on odds &gt; 1.50</b></span>
                  </div>
                </div>

                {/* Available Claimable Bonuses */}
                <h3 className="section-sub-title">Available Special Rewards</h3>
                <div className="rewards-grid">
                  <div className="reward-card">
                    <div className="rc-icon"><i className="fa-solid fa-coins text-gold"></i></div>
                    <div className="rc-info">
                      <h4>Weekly Cricket Cashback</h4>
                      <p>Receive 10% net refund on all Asian Cup matches.</p>
                    </div>
                    <button className="btn-claim-bonus" onClick={() => alert('Cashback Claimed: ₹1,450 credited!')}>
                      Claim ₹1,450
                    </button>
                  </div>
                  <div className="reward-card">
                    <div className="rc-icon"><i className="fa-solid fa-plane-departure text-danger"></i></div>
                    <div className="rc-info">
                      <h4>Aviator Free Bet Pass</h4>
                      <p>5 Free Flight rounds on Crash Aviator X.</p>
                    </div>
                    <button className="btn-claim-bonus" onClick={() => alert('5 Free Flight Passes Activated!')}>
                      Activate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 7. DEPOSIT TURNOVER TAB ================= */}
            {activeTab === 'turnover' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-wallet text-gold"></i> Deposit Turnover Status</h2>
                    <p className="ach-sub">Anti-Money Laundering (AML) 1.0x deposit wagering status for zero-fee instant withdrawals.</p>
                  </div>
                  <div className="ach-controls">
                    <span className="status-pill status-success">
                      <i className="fa-solid fa-shield-check"></i> Withdrawal Eligible
                    </span>
                  </div>
                </div>

                {/* Turnover Gauge Card */}
                <div className="turnover-gauge-card">
                  <div className="tg-metric-row">
                    <div className="tg-item">
                      <span className="tg-label">Total Deposits Made</span>
                      <span className="tg-val">₹ 1,20,000.00</span>
                    </div>
                    <div className="tg-item">
                      <span className="tg-label">Required 1x Turnover</span>
                      <span className="tg-val text-info">₹ 1,20,000.00</span>
                    </div>
                    <div className="tg-item">
                      <span className="tg-label">Wagered Turnover Done</span>
                      <span className="tg-val text-success">₹ 1,45,280.00</span>
                    </div>
                    <div className="tg-item">
                      <span className="tg-label">Turnover Ratio</span>
                      <span className="tg-val text-gold">121.06%</span>
                    </div>
                  </div>

                  <div className="tg-progress-bar">
                    <div className="tg-fill" style={{ width: '100%' }}></div>
                  </div>
                  <div className="tg-note text-success">
                    <i className="fa-solid fa-circle-check"></i> All deposit turnover obligations have been satisfied. Instant withdrawals are unlocked with 0% deduction.
                  </div>
                </div>

                <div className="turnover-category-breakdown">
                  <h3>Turnover Distribution By Vertical</h3>
                  <div className="tcb-grid">
                    <div className="tcb-card">
                      <div className="tcb-title"><i className="fa-solid fa-baseball text-danger"></i> Cricket Exchange</div>
                      <div className="tcb-amt">₹ 82,400.00</div>
                      <div className="tcb-share">56.7% of total</div>
                    </div>
                    <div className="tcb-card">
                      <div className="tcb-title"><i className="fa-solid fa-futbol text-info"></i> Football & Tennis</div>
                      <div className="tcb-amt">₹ 38,000.00</div>
                      <div className="tcb-share">26.1% of total</div>
                    </div>
                    <div className="tcb-card">
                      <div className="tcb-title"><i className="fa-solid fa-dice text-gold"></i> Live Casino & Crash</div>
                      <div className="tcb-amt">₹ 24,880.00</div>
                      <div className="tcb-share">17.2% of total</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 8. TURNOVER HISTORY TAB ================= */}
            {activeTab === 'turnover-history' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-clock-rotate-left text-gold"></i> Turnover History Log</h2>
                    <p className="ach-sub">Historical record of all past deposit rollover fulfillment cycles.</p>
                  </div>
                </div>

                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Cycle Reference</th>
                        <th>Deposit Amount</th>
                        <th>Target Turnover</th>
                        <th>Achieved Wagering</th>
                        <th>Completed Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTurnoverCycles.map(c => (
                        <tr key={c.id}>
                          <td><span className="code-badge">{c.id}</span></td>
                          <td className="font-mono">₹ {c.deposit.toLocaleString('en-IN')}</td>
                          <td className="font-mono text-muted">₹ {c.required.toLocaleString('en-IN')}</td>
                          <td className="font-mono font-bold text-success">₹ {c.achieved.toLocaleString('en-IN')}</td>
                          <td>{c.date}</td>
                          <td>
                            <span className="status-pill status-success">
                              <i className="fa-solid fa-check"></i> {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= 9. SETTINGS & KYC TAB ================= */}
            {activeTab === 'settings' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-gear text-gold"></i> Account Profile & Preferences</h2>
                    <p className="ach-sub">Manage personal security details, verification documents, and display preferences.</p>
                  </div>
                </div>

                <div className="settings-grid-layout">
                  {/* Personal Info & KYC Card */}
                  <div className="settings-box">
                    <div className="sb-header">
                      <h3><i className="fa-solid fa-id-card"></i> Personal Verification (KYC)</h3>
                      <span className="kyc-verified-pill">
                        <i className="fa-solid fa-circle-check"></i> Verified Level 2
                      </span>
                    </div>
                    <div className="sb-body">
                      <div className="info-field-row">
                        <span className="ifr-label">Legal Name:</span>
                        <span className="ifr-val font-bold">Demo User</span>
                      </div>
                      <div className="info-field-row">
                        <span className="ifr-label">Registered Mobile:</span>
                        <span className="ifr-val font-mono">+91 98765 43210</span>
                      </div>
                      <div className="info-field-row">
                        <span className="ifr-label">Email Address:</span>
                        <span className="ifr-val">demo.user@rollixbook.exchange</span>
                      </div>
                      <div className="info-field-row">
                        <span className="ifr-label">Government ID:</span>
                        <span className="ifr-val">Aadhaar (******3912) & PAN Approved</span>
                      </div>
                    </div>
                  </div>

                  {/* Trading & Odds Preferences */}
                  <div className="settings-box">
                    <div className="sb-header">
                      <h3><i className="fa-solid fa-sliders"></i> Exchange Preferences</h3>
                    </div>
                    <div className="sb-body">
                      <div className="form-toggle-row">
                        <div>
                          <div className="ftr-title">Odds Display Format</div>
                          <div className="ftr-sub">Decimal (1.85) / Fractional (17/20)</div>
                        </div>
                        <select className="pref-select" defaultValue="decimal">
                          <option value="decimal">Decimal (1.85)</option>
                          <option value="fractional">Fractional (17/20)</option>
                          <option value="american">American (-118)</option>
                        </select>
                      </div>

                      <div className="form-toggle-row">
                        <div>
                          <div className="ftr-title">Sound Effects</div>
                          <div className="ftr-sub">Audio chime on odds ticks and placed bets</div>
                        </div>
                        <input type="checkbox" defaultChecked className="switch-checkbox" />
                      </div>

                      <div className="form-toggle-row">
                        <div>
                          <div className="ftr-title">Quick Bet 1-Click Mode</div>
                          <div className="ftr-sub">Place bets immediately without confirmation</div>
                        </div>
                        <input type="checkbox" className="switch-checkbox" />
                      </div>
                    </div>
                  </div>

                  {/* Password Change */}
                  <div className="settings-box full-span">
                    <div className="sb-header">
                      <h3><i className="fa-solid fa-key"></i> Security: Change Password</h3>
                    </div>
                    <div className="sb-body">
                      <div className="password-form-grid">
                        <input type="password" placeholder="Current Password" className="input-styled" />
                        <input type="password" placeholder="New Password" className="input-styled" />
                        <input type="password" placeholder="Confirm New Password" className="input-styled" />
                        <button className="btn-save-settings" onClick={() => alert('Password updated successfully!')}>
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= 10. SECURITY & 2FA TAB ================= */}
            {activeTab === 'security' && (
              <div className="acc-tab-content">
                <div className="acc-content-header">
                  <div className="ach-title-group">
                    <h2><i className="fa-solid fa-shield-halved text-gold"></i> Security & Two-Factor Authentication</h2>
                    <p className="ach-sub">Manage Google Authenticator 2FA and view active authorized device sessions.</p>
                  </div>
                </div>

                {/* 2FA Status Card */}
                <div className="twofa-status-card">
                  <div className="tfa-icon-col">
                    <i className="fa-solid fa-mobile-screen-button text-gold"></i>
                  </div>
                  <div className="tfa-info-col">
                    <div className="tfa-title">Two-Factor Authentication (TOTP)</div>
                    <p className="tfa-desc">Protect your funds with Google Authenticator or Microsoft Authenticator verification on withdrawals and logins.</p>
                  </div>
                  <div className="tfa-toggle-col">
                    <button 
                      className={`btn-2fa-toggle ${twoFactorEnabled ? 'enabled' : 'disabled'}`}
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      <i className={`fa-solid ${twoFactorEnabled ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                      {twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>

                {/* Active Authorized Sessions */}
                <h3 className="section-sub-title">Active Login Sessions</h3>
                <div className="acc-table-card">
                  <table className="acc-data-table">
                    <thead>
                      <tr>
                        <th>Device & Browser</th>
                        <th>IP Address</th>
                        <th>Location</th>
                        <th>Last Active</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-bold"><i className="fa-brands fa-windows text-info"></i> Windows 11 / Chrome 128</div>
                          <span className="current-device-tag">CURRENT SESSION</span>
                        </td>
                        <td className="font-mono">103.142.188.42</td>
                        <td>Mumbai, India</td>
                        <td className="text-success font-bold">Now</td>
                        <td className="text-center text-muted">-</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-bold"><i className="fa-brands fa-apple text-muted"></i> iPhone 15 Pro / Safari Mobile</div>
                        </td>
                        <td className="font-mono">152.58.21.90</td>
                        <td>Delhi, India</td>
                        <td>Yesterday, 22:15</td>
                        <td className="text-center">
                          <button className="btn-term-session" onClick={() => alert('Session terminated.')}>
                            Terminate
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
