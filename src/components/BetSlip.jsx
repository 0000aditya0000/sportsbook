import React, { useState } from 'react';

export default function BetSlip({
  selections,
  openBets,
  activeTab,
  onTabChange,
  quickBetActive,
  onToggleQuickBet,
  onAdjustOdds,
  onUpdateOdds,
  onUpdateStake,
  onApplyPreset,
  onRemoveSelection,
  onClearSlip,
  onPlaceBet,
  onCashoutBet,
  onCashoutAll,
  isOpenMobile,
  onCloseMobile
}) {
  const [streamExpanded, setStreamExpanded] = useState(false);
  const [creditExpanded, setCreditExpanded] = useState(false);

  // Active primary selection (when single bet mode as in Screenshot 4)
  const currentSel = selections[0] || null;

  const currentOdds = currentSel ? currentSel.odds : 1.72;
  const currentStake = currentSel ? currentSel.stake : 0;
  const currentProfit = currentSel 
    ? (currentSel.betType === 'BACK' ? currentStake * (currentOdds - 1) : currentStake)
    : 0;

  const stakePresetsGrid = [
    { label: '100', val: 100 },
    { label: '500', val: 500 },
    { label: '1,000', val: 1000 },
    { label: '5,000', val: 5000 },
    { label: '10,000', val: 10000 },
    { label: '50,000', val: 50000 },
    { label: '1,00,000', val: 100000 },
    { label: '5,00,000', val: 500000 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="mobile-slip-backdrop active" 
          onClick={onCloseMobile} 
          aria-label="Close Mobile Bet Slip"
        />
      )}

      <aside className={`sidebar-right ${isOpenMobile ? 'mobile-open' : ''}`}>
        <div className="betslip-card">
          {/* Mobile Header & Handle Bar */}
          <div className="mobile-slip-header-bar">
            <div className="msh-drag-pill"></div>
            <div className="msh-row">
              <span className="msh-title">
                <i className="fa-solid fa-receipt text-gold"></i> Bet Slip ({selections.length})
              </span>
              <button className="msh-close-btn" onClick={onCloseMobile} aria-label="Close Slip">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Accordion 1: Live Stream (Screenshot 2, 3, 4) */}
        <div className="betslip-accordion-box">
          <div 
            className="bs-acc-header"
            onClick={() => setStreamExpanded(!streamExpanded)}
          >
            <span><i className="fa-solid fa-tv text-accent"></i> LIVE STREAM</span>
            <i className={`fa-solid ${streamExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          {streamExpanded && (
            <div className="bs-acc-body stream-body">
              <div className="mock-stream-player">
                <i className="fa-solid fa-circle-play pulse-play"></i>
                <span>Live Streaming Feed Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Available Credit */}
        <div className="betslip-accordion-box">
          <div 
            className="bs-acc-header"
            onClick={() => setCreditExpanded(!creditExpanded)}
          >
            <span><i className="fa-solid fa-coins text-gold"></i> AVAILABLE CREDIT</span>
            <i className={`fa-solid ${creditExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          {creditExpanded && (
            <div className="bs-acc-body credit-body">
              <div className="credit-line">
                <span>Credit Limit:</span> <b>₹5,00,000</b>
              </div>
              <div className="credit-line">
                <span>Utilized:</span> <b className="text-danger">₹8,450</b>
              </div>
            </div>
          )}
        </div>

        {/* Betslip Navigation Tabs (Screenshot 2, 3, 4) */}
        <div className="betslip-mode-tabs">
          <button 
            className={`bs-mode-btn ${activeTab === 'slip' ? 'active' : ''}`}
            onClick={() => onTabChange('slip')}
          >
            Betslip {selections.length > 0 && `(${selections.length})`}
          </button>
          <button 
            className={`bs-mode-btn ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => onTabChange('open')}
          >
            Open Bets {openBets.length > 0 && `(${openBets.length})`}
          </button>
          <button 
            className="bs-mode-btn edit-stakes-btn"
            onClick={() => alert('Stake configuration dialog opened')}
          >
            Edit Stakes
          </button>
          <button className="mobile-close-slip-btn" onClick={onCloseMobile}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* SLIP VIEW */}
        {activeTab === 'slip' && (
          <div className="slip-view-content">
            {selections.length === 0 ? (
              <div className="empty-slip-state">
                <p className="empty-state-italic">Place bet to see it here</p>
              </div>
            ) : (
              <div className="keypad-betslip-container">
                {/* Active Selection Header */}
                <div className="active-sel-header">
                  <div className="ash-title">{currentSel.runnerName}</div>
                  <div className="ash-sub">{currentSel.matchName}</div>
                </div>

                {/* Odds and Stake Direct Inputs (Screenshot 4) */}
                <div className="direct-inputs-grid">
                  <div className="di-col">
                    <label>Odds</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={currentOdds}
                      onChange={(e) => onUpdateOdds(currentSel.id, e.target.value)}
                      className="di-input"
                    />
                  </div>
                  <div className="di-col">
                    <div className="di-label-row">
                      <label>Stake</label>
                      <span className="max-bet-hint">Max Bet : 2</span>
                    </div>
                    <input 
                      type="number" 
                      value={currentStake}
                      onChange={(e) => onUpdateStake(currentSel.id, e.target.value)}
                      className="di-input"
                    />
                  </div>
                </div>

                {/* 8-Button Preset Keypad (Screenshot 4) */}
                <div className="keypad-stake-grid">
                  {stakePresetsGrid.map(btn => (
                    <button 
                      key={btn.val}
                      className="keypad-stake-btn"
                      onClick={() => onUpdateStake(currentSel.id, (currentStake || 0) + btn.val)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Action Row: MIN, MAX, Edit Stakes, Clear */}
                <div className="keypad-action-row">
                  <button className="kar-btn btn-min" onClick={() => onUpdateStake(currentSel.id, 100)}>MIN</button>
                  <button className="kar-btn btn-max" onClick={() => onApplyPreset('max')}>MAX</button>
                  <button className="kar-btn btn-edit" onClick={() => alert('Customize preset buttons')}>Edit Stakes</button>
                  <button className="kar-btn btn-clear" onClick={onClearSlip}>Clear</button>
                </div>

                {/* Final Submit & Cancel Bar (Screenshot 4) */}
                <div className="keypad-submit-row">
                  <button className="btn-cancel-bet" onClick={onClearSlip}>
                    Cancel Bet
                  </button>
                  <button className="btn-confirm-place" onClick={onPlaceBet}>
                    <span>Place Bet</span>
                    <span className="profit-tag">Profit : {currentProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OPEN BETS VIEW */}
        {activeTab === 'open' && (
          <div className="open-bets-view">
            {openBets.length === 0 ? (
              <div className="empty-slip-state">
                <p>No active open bets currently.</p>
              </div>
            ) : (
              openBets.map(bet => (
                <div key={bet.id} className={`open-bet-card ${bet.type.toLowerCase()}-card`}>
                  <div className="ob-header">
                    <span className={`ob-type ${bet.type.toLowerCase()}-tag`}>{bet.type}</span>
                    <span className="ob-match">{bet.match}</span>
                  </div>
                  <div className="ob-runner">{bet.runner}</div>
                  <div className="ob-metrics">
                    <div>Odds: <b>{bet.odds.toFixed(2)}</b></div>
                    <div>Stake: <b>₹{bet.stake.toLocaleString('en-IN')}</b></div>
                    <div>Return: <b className="text-success">₹{Math.round(bet.profit || 0).toLocaleString('en-IN')}</b></div>
                  </div>
                  <div className="ob-footer">
                    <span className="ob-status matched">Matched #{bet.id}</span>
                    <button className="btn-cashout-mini" onClick={() => onCashoutBet(bet.id, bet.cashoutVal)}>
                      Cashout ₹{bet.cashoutVal.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        </div>
      </aside>
    </>
  );
}
