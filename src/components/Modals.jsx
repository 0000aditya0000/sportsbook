import React, { useState } from 'react';

export function DepositModal({ isOpen, onClose, onSubmitDeposit }) {
  const [amount, setAmount] = useState(5000);
  const [method, setMethod] = useState('upi');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title">
            <i className="fa-solid fa-building-columns text-accent"></i> Instant Deposit
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="payment-methods-grid">
            <div 
              className={`method-card ${method === 'upi' ? 'active' : ''}`}
              onClick={() => setMethod('upi')}
            >
              <i className="fa-solid fa-mobile-screen text-success"></i>
              <span>UPI Instant</span>
              <small>GPay / PhonePe / Paytm</small>
            </div>
            <div 
              className={`method-card ${method === 'imps' ? 'active' : ''}`}
              onClick={() => setMethod('imps')}
            >
              <i className="fa-solid fa-landmark text-accent"></i>
              <span>IMPS / NEFT</span>
              <small>Direct Bank Wire</small>
            </div>
            <div 
              className={`method-card ${method === 'crypto' ? 'active' : ''}`}
              onClick={() => setMethod('crypto')}
            >
              <i className="fa-brands fa-bitcoin text-gold"></i>
              <span>Crypto</span>
              <small>USDT / BTC Instant</small>
            </div>
          </div>

          <div className="form-group">
            <label>Enter Amount (₹):</label>
            <input 
              type="number" 
              value={amount} 
              min={500} 
              step={500} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input-styled" 
            />
          </div>

          <div className="quick-amount-chips">
            <button type="button" className="preset-chip" onClick={() => setAmount(1000)}>₹1,000</button>
            <button type="button" className="preset-chip" onClick={() => setAmount(5000)}>₹5,000</button>
            <button type="button" className="preset-chip" onClick={() => setAmount(10000)}>₹10,000</button>
            <button type="button" className="preset-chip" onClick={() => setAmount(50000)}>₹50,000</button>
          </div>

          <button className="btn-submit-deposit" onClick={() => onSubmitDeposit(amount)}>
            <i className="fa-solid fa-bolt"></i> Generate Instant UPI QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export function GameModal({ isOpen, onClose, game }) {
  const [multiplier, setMultiplier] = useState(1.00);
  const [isRunning, setIsRunning] = useState(false);
  const [statusText, setStatusText] = useState('Demo Ready');

  if (!isOpen || !game) return null;

  const startCrashSim = () => {
    if (isRunning) return;
    setIsRunning(true);
    let cur = 1.00;
    const target = +(1.2 + Math.random() * 4).toFixed(2);
    setStatusText('RISING...');

    const interval = setInterval(() => {
      cur += 0.05;
      setMultiplier(+(cur.toFixed(2)));
      if (cur >= target) {
        clearInterval(interval);
        setIsRunning(false);
        setStatusText(`CRASHED @ x${target.toFixed(2)}`);
      }
    }, 70);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box game-modal-box">
        <div className="modal-header">
          <div className="modal-title">
            <i className="fa-solid fa-gamepad text-gold"></i> {game.title}
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body game-modal-body">
          <div className="game-simulator-screen">
            <div className="sim-brand">{game.provider} GAMING</div>
            <div className="sim-display-canvas">
              <div className="crash-multiplier">x{multiplier.toFixed(2)}</div>
              <div className="crash-status-text">{statusText}</div>
            </div>
            <div className="sim-controls">
              <button className="btn-sim-bet" onClick={startCrashSim} disabled={isRunning}>
                <i className="fa-solid fa-play"></i> {isRunning ? 'In Flight...' : 'Start Demo Round'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
