import React from 'react';

export default function MobileBottomNav({
  activeTab,
  onSelectTab,
  slipCount,
  onOpenMobileSlip,
  onOpenAccount
}) {
  return (
    <nav className="mobile-bottom-bar">
      <button 
        className={`m-bottom-item ${activeTab === 'inplay' ? 'active' : ''}`}
        onClick={() => onSelectTab('all')}
      >
        <div className="m-icon"><i className="fa-solid fa-fire"></i></div>
        <span className="m-label">InPlay</span>
      </button>

      <button 
        className={`m-bottom-item ${activeTab === 'cricket' ? 'active' : ''}`}
        onClick={() => onSelectTab('cricket')}
      >
        <div className="m-icon"><i className="fa-solid fa-trophy"></i></div>
        <span className="m-label">Sports</span>
      </button>

      <button 
        className={`m-bottom-item ${activeTab === 'casino' ? 'active' : ''}`}
        onClick={() => onSelectTab('casino')}
      >
        <div className="m-icon"><i className="fa-solid fa-dice"></i></div>
        <span className="m-label">Casino</span>
      </button>

      <button className="m-bottom-item slip-trigger" onClick={onOpenMobileSlip}>
        <div className="m-icon">
          <i className="fa-solid fa-receipt"></i>
          {slipCount > 0 && <span className="m-slip-count">{slipCount}</span>}
        </div>
        <span className="m-label">Betslip</span>
      </button>

      <button className="m-bottom-item" onClick={onOpenAccount}>
        <div className="m-icon"><i className="fa-solid fa-user"></i></div>
        <span className="m-label">Account</span>
      </button>
    </nav>
  );
}
