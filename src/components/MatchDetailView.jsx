import React, { useState } from 'react';

const STAKE_PRESETS = [
  { label: '100', val: 100 },
  { label: '500', val: 500 },
  { label: '1,000', val: 1000 },
  { label: '5,000', val: 5000 },
  { label: '10,000', val: 10000 },
  { label: '50,000', val: 50000 },
  { label: '1,00,000', val: 100000 },
  { label: '5,00,000', val: 500000 }
];

function InlineBetBox({
  selection,
  onUpdateOdds,
  onUpdateStake,
  onApplyPreset,
  onClear,
  onPlace
}) {
  if (!selection) return null;
  const profit = selection.betType === 'BACK'
    ? (selection.stake || 0) * (selection.odds - 1)
    : (selection.stake || 0);
  const isBack = selection.betType === 'BACK';

  return (
    <div className={`inline-bet-box ${isBack ? 'back-mode' : 'lay-mode'}`}>
      <div className="ibb-inputs">
        <div className="ibb-field">
          <label>Odds</label>
          <input
            type="number"
            step="0.01"
            value={selection.odds}
            onChange={(e) => onUpdateOdds(selection.id, e.target.value)}
          />
        </div>
        <div className="ibb-field">
          <div className="ibb-label-row">
            <label>Stake</label>
            <span className="max-hint">Max Bet : 2</span>
          </div>
          <input
            type="number"
            value={selection.stake || 0}
            onChange={(e) => onUpdateStake(selection.id, e.target.value)}
          />
        </div>
      </div>

      <div className="ibb-presets">
        {STAKE_PRESETS.map(p => (
          <button key={p.val} type="button" onClick={() => onUpdateStake(selection.id, (selection.stake || 0) + p.val)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="ibb-tools">
        <button type="button" className="ibb-min" onClick={() => onUpdateStake(selection.id, 100)}>MIN</button>
        <button type="button" className="ibb-max" onClick={() => onApplyPreset('max')}>MAX</button>
        <button type="button" className="ibb-edit" onClick={() => alert('Customize stake buttons')}>Edit Stakes</button>
        <button type="button" className="ibb-clear" onClick={onClear}>Clear</button>
      </div>

      <div className="ibb-actions">
        <button type="button" className="ibb-cancel" onClick={onClear}>Cancel Bet</button>
        <button type="button" className="ibb-place" onClick={onPlace}>
          Place Bet
          <span>Profit : {profit.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}

export default function MatchDetailView({
  match,
  onBack,
  onSelectOdds,
  onSelectFancy,
  activeSelection,
  onUpdateOdds,
  onUpdateStake,
  onApplyPreset,
  onClearSlip,
  onPlaceBet,
  openBetsCount = 0,
  onOpenBets
}) {
  const [premiumFilter, setPremiumFilter] = useState('all');
  const [inns, setInns] = useState('1st INNS');
  const [streamOpen, setStreamOpen] = useState(false);
  const [bookmakerSuspended] = useState(true);
  const [scoreCollapsed, setScoreCollapsed] = useState(false);

  const team1 = match.team1 || 'Team A';
  const team2 = match.team2 || 'Team B';

  // Classic mobile: 1 Back + 1 Lay (best price)
  const runners = [
    {
      name: team1,
      key: '1',
      back: match.odds?.team1?.back ?? 1.65,
      backVol: match.odds?.team1?.backVol || '398K',
      lay: match.odds?.team1?.lay ?? 1.68,
      layVol: match.odds?.team1?.layVol || '19K'
    },
    {
      name: team2,
      key: '2',
      back: match.odds?.team2?.back ?? 2.46,
      backVol: match.odds?.team2?.backVol || '13K',
      lay: match.odds?.team2?.lay ?? 2.52,
      layVol: match.odds?.team2?.layVol || '8K'
    }
  ];

  const premiumMarkets = [
    { id: 'winner', title: 'WINNER (INCL. SUPER OVER)', options: [
      { name: `${team1}`, price: 1.72 },
      { name: `${team2}`, price: 2.18 }
    ]}
  ];

  const isSelFor = (runnerName, betType) =>
    activeSelection && activeSelection.runnerName === runnerName && activeSelection.betType === betType;

  return (
    <div className="match-detail-page classic-match-detail">
      <div className="match-detail-topbar">
        <button className="btn-detail-back" onClick={onBack} title="Back">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="md-title-block">
          <span className="live-play-bubble"><i className="fa-solid fa-play"></i></span>
          <span className="md-title-text">{team1} vs {team2}</span>
          <span className="md-info-btn"><i className="fa-solid fa-circle-info"></i></span>
        </div>
      </div>

      <div className="md-action-row">
        <button className="md-action-btn" onClick={() => setStreamOpen(!streamOpen)}>
          Live stream <i className={`fa-solid fa-chevron-${streamOpen ? 'up' : 'down'}`}></i>
        </button>
        <button className="md-action-btn" onClick={onOpenBets}>
          Open Bets{openBetsCount > 0 ? ` (${openBetsCount})` : ''}
        </button>
      </div>

      {streamOpen && (
        <div className="md-stream-panel">
          <i className="fa-solid fa-circle-play"></i>
          <span>Live stream ready</span>
        </div>
      )}

      <div className={`md-scoreboard ${scoreCollapsed ? 'collapsed' : ''}`}>
        {!scoreCollapsed && (
          <div className="run-rate-chart-card">
            <div className="rrc-header">
              <span className="rrc-label">RUN RATE</span>
              <select className="rrc-select" value={inns} onChange={(e) => setInns(e.target.value)}>
                <option value="1st INNS">1st INNS</option>
                <option value="2nd INNS">2nd INNS</option>
              </select>
            </div>
            <div className="rrc-graph-canvas">
              <svg viewBox="0 0 700 130" className="chart-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 50, 80, 110].map(y => (
                  <line key={y} x1="40" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                ))}
                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18].map((o, i) => (
                  <text key={o} x={50 + i * 65} y="125" fill="#94a3b8" fontSize="10">{o}</text>
                ))}
                <path d="M50,110 Q115,95 180,85 T310,72 T440,58 T570,42 T650,30 L650,110 L50,110 Z" fill="url(#chartGrad)" />
                <path d="M50,110 Q115,95 180,85 T310,72 T440,58 T570,42 T650,30" fill="none" stroke="#e11d48" strokeWidth="2.5" />
                <circle cx="650" cy="30" r="4" fill="#fb7185" />
              </svg>
            </div>
          </div>
        )}
        <button className="mds-collapse" onClick={() => setScoreCollapsed(!scoreCollapsed)} aria-label="Toggle run rate">
          <i className={`fa-solid fa-chevron-${scoreCollapsed ? 'down' : 'up'}`}></i>
        </button>
      </div>

      {/* Match Odds */}
      <div className="market-ladder-card classic-market">
        <div className="mlc-header">
          <div className="mlc-title-group">
            <i className="fa-regular fa-star"></i>
            <span className="mlc-name">Match Odds</span>
            <span className="mlc-limits">( MIN:100 MAX:2 )</span>
          </div>
          <button type="button" className="cashout-btn-green">Cashout : ₹0</button>
        </div>
        <div className="classic-odds-cols">
          <span className="spacer"></span>
          <span className="back-lbl-main">BACK</span>
          <span className="lay-lbl-main">LAY</span>
        </div>
        {runners.map(r => (
          <React.Fragment key={r.key}>
            <div className="ladder-row classic-row">
              <div className="ladder-runner-name">{r.name}</div>
              <div className="depth-cells-group classic-pair">
                <button
                  type="button"
                  className={`depth-cell back-cell ${isSelFor(r.name, 'BACK') ? 'selected' : ''}`}
                  onClick={() => onSelectOdds(match, r.name, r.key, 'BACK', r.back)}
                >
                  <span className="d-price">{Number(r.back).toFixed(2)}</span>
                  <span className="d-vol">{r.backVol}</span>
                </button>
                <button
                  type="button"
                  className={`depth-cell lay-cell ${isSelFor(r.name, 'LAY') ? 'selected' : ''}`}
                  onClick={() => onSelectOdds(match, r.name, r.key, 'LAY', r.lay)}
                >
                  <span className="d-price">{Number(r.lay).toFixed(2)}</span>
                  <span className="d-vol">{r.layVol}</span>
                </button>
              </div>
            </div>
            {isSelFor(r.name, 'BACK') || isSelFor(r.name, 'LAY') ? (
              <InlineBetBox
                selection={activeSelection}
                onUpdateOdds={onUpdateOdds}
                onUpdateStake={onUpdateStake}
                onApplyPreset={onApplyPreset}
                onClear={onClearSlip}
                onPlace={onPlaceBet}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>

      {/* Bookmaker */}
      <div className="market-ladder-card classic-market">
        <div className="mlc-header">
          <div className="mlc-title-group">
            <i className="fa-regular fa-star"></i>
            <span className="mlc-name">BOOKMAKER</span>
            <span className="mlc-limits">( MIN:100 MAX:20K )</span>
          </div>
        </div>
        {bookmakerSuspended ? (
          <div className="suspended-overlay-block classic-suspended">
            {runners.map(r => (
              <div key={r.key} className="suspended-full-bar" aria-label={`${r.name} suspended`}>
                - SUSPENDED -
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Premium Market */}
      <div className="premium-market-block">
        <div className="pm-header">Premium Market</div>
        <div className="pm-filters">
          {['all', 'match', 'innings', 'over', 'player', 'other'].map(f => (
            <button
              key={f}
              className={`pm-filter ${premiumFilter === f ? 'active' : ''}`}
              onClick={() => setPremiumFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="pm-limits">MIN: 100 MAX: 100K</div>
        {premiumMarkets.map(m => (
          <div key={m.id} className="pm-market">
            <div className="pm-market-title">{m.title}</div>
            {m.options.map(opt => (
              <div key={opt.name} className="pm-option-row">
                <span>{opt.name}</span>
                <button
                  className="depth-cell back-cell"
                  onClick={() => onSelectOdds(match, opt.name, 'P', 'BACK', opt.price)}
                >
                  <span className="d-price">{opt.price.toFixed(2)}</span>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
