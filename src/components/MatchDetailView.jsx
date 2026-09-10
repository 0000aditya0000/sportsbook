import React, { useState } from 'react';

export default function MatchDetailView({
  match,
  onBack,
  onSelectOdds,
  onSelectFancy
}) {
  const [activeMarketTab, setActiveMarketTab] = useState('fancy'); // 'fancy' | 'premium'
  const [fancySubTab, setFancySubTab] = useState('sessions'); // 'all' | 'sessions' | 'wp' | 'extra' | 'oddeven'
  const [inns, setInns] = useState('1st INNS');
  const [bookmakerSuspended, setBookmakerSuspended] = useState(true);

  // Depth ladder odds for 3 Back & 3 Lay columns (Screenshot 3 & 4)
  const depthOdds = {
    team1: {
      name: match.team1 || 'Rotterdam Dockers',
      back: [
        { price: 1.72, vol: '45K' },
        { price: 1.73, vol: '20K' },
        { price: 1.76, vol: '18.3M' }
      ],
      lay: [
        { price: 1.78, vol: '540K' },
        { price: 1.80, vol: '22K' },
        { price: 1.82, vol: '172K' }
      ]
    },
    team2: {
      name: match.team2 || 'Glasgow Cosmic',
      back: [
        { price: 2.24, vol: '16K' },
        { price: 2.26, vol: '2K' },
        { price: 2.28, vol: '422K' }
      ],
      lay: [
        { price: 2.30, vol: '3K' },
        { price: 2.32, vol: '13.9M' },
        { price: 2.38, vol: '14K' }
      ]
    }
  };

  // Sessions Table from Screenshot 2
  const sessionRows = [
    { id: 's1', title: '6 Over Runs GC Adv', layRuns: 51, backRuns: 53, min: '100', max: '100K' },
    { id: 's2', title: '6 Over Runs RD Adv', layRuns: 51, backRuns: 53, min: '100', max: '100K' },
    { id: 's3', title: '10 Over Runs GC Adv', layRuns: 81, backRuns: 83, min: '100', max: '100K' },
    { id: 's4', title: '10 Over Runs RD Adv', layRuns: 81, backRuns: 83, min: '100', max: '100K' },
    { id: 's5', title: '15 Over Runs GC Adv', layRuns: 122, backRuns: 124, min: '100', max: '100K' },
    { id: 's6', title: '15 Over Runs RD Adv', layRuns: 122, backRuns: 124, min: '100', max: '100K' },
    { id: 's7', title: '20 Over Runs GC Adv', layRuns: 169, backRuns: 172, min: '100', max: '100K' }
  ];

  return (
    <div className="match-detail-page">
      {/* Top Header Bar with Breadcrumb */}
      <div className="match-detail-topbar">
        <button className="btn-detail-back" onClick={onBack} title="Return to Match Feed">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="md-title-block">
          <span className="live-play-bubble"><i className="fa-solid fa-play"></i></span>
          <span className="md-title-text">{depthOdds.team1.name} vs {depthOdds.team2.name}</span>
          <span className="md-info-btn" title="Market Rules & Liquidity Info"><i className="fa-solid fa-circle-info"></i></span>
        </div>
        <div className="md-meta-timestamp">10 SEP | 15:00</div>
      </div>

      {/* Interactive Run Rate Chart Widget (Screenshot 3 & 4) */}
      <div className="run-rate-chart-card">
        <div className="rrc-header">
          <span className="team-l">{depthOdds.team1.name}</span>
          <div className="rrc-center">
            <span className="rrc-label">RUN RATE</span>
            <select className="rrc-select" value={inns} onChange={(e) => setInns(e.target.value)}>
              <option value="1st INNS">1st INNS</option>
              <option value="2nd INNS">2nd INNS</option>
            </select>
          </div>
          <span className="team-r">{depthOdds.team2.name}</span>
        </div>

        {/* Dynamic SVG Run Rate Visual Graph */}
        <div className="rrc-graph-canvas">
          <svg viewBox="0 0 700 130" className="chart-svg">
            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Horizontal Grid lines */}
            <line x1="40" y1="20" x2="680" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="40" y1="50" x2="680" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="40" y1="80" x2="680" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="40" y1="110" x2="680" y2="110" stroke="rgba(255,255,255,0.15)" />

            {/* Overs labels */}
            <text x="50" y="125" fill="#64748b" fontSize="10">0</text>
            <text x="115" y="125" fill="#64748b" fontSize="10">2</text>
            <text x="180" y="125" fill="#64748b" fontSize="10">4</text>
            <text x="245" y="125" fill="#64748b" fontSize="10">6</text>
            <text x="310" y="125" fill="#64748b" fontSize="10">8</text>
            <text x="375" y="125" fill="#64748b" fontSize="10">10</text>
            <text x="440" y="125" fill="#64748b" fontSize="10">12</text>
            <text x="505" y="125" fill="#64748b" fontSize="10">14</text>
            <text x="570" y="125" fill="#64748b" fontSize="10">16</text>
            <text x="635" y="125" fill="#64748b" fontSize="10">18</text>

            {/* Run Rate Curve Path */}
            <path 
              d="M50,110 Q115,95 180,85 T310,72 T440,58 T570,42 T650,30 L650,110 L50,110 Z" 
              fill="url(#chartGrad)" 
            />
            <path 
              d="M50,110 Q115,95 180,85 T310,72 T440,58 T570,42 T650,30" 
              fill="none" 
              stroke="#f43f5e" 
              strokeWidth="2.5" 
            />
            {/* Live point */}
            <circle cx="650" cy="30" r="4" fill="#fb7185" />
          </svg>
        </div>
      </div>

      {/* MARKET ODDS LADDER: 3 Back & 3 Lay Depth Columns (Screenshot 3 & 4) */}
      <div className="market-ladder-card">
        <div className="mlc-header">
          <div className="mlc-title-group">
            <i className="fa-regular fa-star text-gold"></i>
            <span className="mlc-name">Match Odds</span>
            <span className="cashout-badge-c">C</span>
            <span className="mlc-limits">( MIN:100 MAX:2 )</span>
          </div>
          <div className="depth-column-labels">
            <span className="back-lbl-main">BACK</span>
            <span className="lay-lbl-main">LAY</span>
          </div>
        </div>

        <div className="ladder-scroll-wrapper">
          {/* Team 1 Row */}
          <div className="ladder-row">
            <div className="ladder-runner-name">{depthOdds.team1.name}</div>
            <div className="depth-cells-group">
              {/* 3 Back Cells */}
              {depthOdds.team1.back.map((b, i) => (
                <button 
                  key={i} 
                  className="depth-cell back-cell"
                  onClick={() => onSelectOdds(match, depthOdds.team1.name, '1', 'BACK', b.price)}
                >
                  <span className="d-price">{b.price.toFixed(2)}</span>
                  <span className="d-vol">{b.vol}</span>
                </button>
              ))}

              {/* 3 Lay Cells */}
              {depthOdds.team1.lay.map((l, i) => (
                <button 
                  key={i} 
                  className="depth-cell lay-cell"
                  onClick={() => onSelectOdds(match, depthOdds.team1.name, '1', 'LAY', l.price)}
                >
                  <span className="d-price">{l.price.toFixed(2)}</span>
                  <span className="d-vol">{l.vol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Team 2 Row */}
          <div className="ladder-row">
            <div className="ladder-runner-name">{depthOdds.team2.name}</div>
            <div className="depth-cells-group">
              {/* 3 Back Cells */}
              {depthOdds.team2.back.map((b, i) => (
                <button 
                  key={i} 
                  className="depth-cell back-cell"
                  onClick={() => onSelectOdds(match, depthOdds.team2.name, '2', 'BACK', b.price)}
                >
                  <span className="d-price">{b.price.toFixed(2)}</span>
                  <span className="d-vol">{b.vol}</span>
                </button>
              ))}

              {/* 3 Lay Cells */}
              {depthOdds.team2.lay.map((l, i) => (
                <button 
                  key={i} 
                  className="depth-cell lay-cell"
                  onClick={() => onSelectOdds(match, depthOdds.team2.name, '2', 'LAY', l.price)}
                >
                  <span className="d-price">{l.price.toFixed(2)}</span>
                  <span className="d-vol">{l.vol}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOOKMAKER MARKET (Screenshot 3 & 4) */}
      <div className="market-ladder-card">
        <div className="mlc-header">
          <div className="mlc-title-group">
            <i className="fa-regular fa-star text-gold"></i>
            <span className="mlc-name">BOOKMAKER</span>
            <span className="cashout-badge-c">C</span>
            <span className="mlc-limits">( MIN:100 MAX:50K )</span>
          </div>
          <button 
            className="toggle-suspension-btn" 
            onClick={() => setBookmakerSuspended(!bookmakerSuspended)}
            title="Simulate Market State"
          >
            {bookmakerSuspended ? "Unsuspend" : "Suspend"}
          </button>
        </div>

        {bookmakerSuspended ? (
          <div className="suspended-overlay-block">
            <div className="suspended-row">
              <span className="susp-team">{depthOdds.team1.name}</span>
              <div className="susp-cell-banner">SUSPENDED</div>
            </div>
            <div className="suspended-row">
              <span className="susp-team">{depthOdds.team2.name}</span>
              <div className="susp-cell-banner">SUSPENDED</div>
            </div>
          </div>
        ) : (
          <div className="ladder-row">
            <div className="ladder-runner-name">{depthOdds.team1.name}</div>
            <div className="depth-cells-group">
              <button className="depth-cell back-cell" onClick={() => onSelectOdds(match, depthOdds.team1.name, '1', 'BACK', 1.76)}>
                <span className="d-price">1.76</span>
                <span className="d-vol">100K</span>
              </button>
              <button className="depth-cell lay-cell" onClick={() => onSelectOdds(match, depthOdds.team1.name, '1', 'LAY', 1.78)}>
                <span className="d-price">1.78</span>
                <span className="d-vol">100K</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FANCY MARKET VS PREMIUM MARKET SECTION (Screenshot 2) */}
      <div className="fancy-premium-container">
        {/* Main Tab Switch */}
        <div className="fp-main-tabs">
          <button 
            className={`fp-tab ${activeMarketTab === 'fancy' ? 'active' : ''}`}
            onClick={() => setActiveMarketTab('fancy')}
          >
            Fancy Market
          </button>
          <button 
            className={`fp-tab ${activeMarketTab === 'premium' ? 'active' : ''}`}
            onClick={() => setActiveMarketTab('premium')}
          >
            Premium Market
          </button>
        </div>

        {activeMarketTab === 'fancy' && (
          <>
            {/* Sub-Filters: All, Sessions, W/P Market, Extra Market, Odd/Even */}
            <div className="fancy-filter-ribbon">
              {['all', 'sessions', 'wp', 'extra', 'oddeven'].map(sub => (
                <button
                  key={sub}
                  className={`f-sub-btn ${fancySubTab === sub ? 'active' : ''}`}
                  onClick={() => setFancySubTab(sub)}
                >
                  {sub === 'all' ? 'All' :
                   sub === 'sessions' ? 'Sessions' :
                   sub === 'wp' ? 'W/P Market' :
                   sub === 'extra' ? 'Extra Market' : 'Odd/Even'}
                </button>
              ))}
            </div>

            {/* SESSIONS TABLE (Screenshot 2) */}
            <div className="sessions-table-card">
              <div className="st-header">
                <span className="st-title">Sessions <i className="fa-solid fa-circle-info"></i></span>
                <div className="st-cols-guide">
                  <span className="lay-lbl-guide">NO (LAY)</span>
                  <span className="back-lbl-guide">YES (BACK)</span>
                  <span className="limits-lbl-guide">LIMITS</span>
                </div>
              </div>

              <div className="sessions-list-body">
                {sessionRows.map(row => (
                  <div key={row.id} className="session-item-row">
                    <div className="session-name-cell">
                      <span className="ladder-icon">目</span>
                      <span className="session-title-text">{row.title}</span>
                    </div>

                    <div className="session-odds-block">
                      {/* NO (Pink) */}
                      <button 
                        className="session-cell lay-cell"
                        onClick={() => onSelectFancy(row.title, 'NO', row.layRuns, 100)}
                      >
                        <span className="s-runs">{row.layRuns}</span>
                        <span className="s-rate">100</span>
                      </button>

                      {/* YES (Blue) */}
                      <button 
                        className="session-cell back-cell"
                        onClick={() => onSelectFancy(row.title, 'YES', row.backRuns, 100)}
                      >
                        <span className="s-runs">{row.backRuns}</span>
                        <span className="s-rate">100</span>
                      </button>
                    </div>

                    <div className="session-limits-cell">
                      <div>Min Bet :{row.min}</div>
                      <div>Max Bet :{row.max}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
