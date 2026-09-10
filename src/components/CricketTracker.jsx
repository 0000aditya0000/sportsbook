import React, { useState, useEffect } from 'react';

export default function CricketTracker({ onClose, onAddFancyBet }) {
  const [score, setScore] = useState({ runs: 142, wickets: 3, overs: '16.4' });
  const [crr, setCrr] = useState(8.52);
  const [rrr, setRrr] = useState(12.30);
  const [ballsStrip, setBallsStrip] = useState([
    { id: 1, val: '●', type: 'dot' },
    { id: 2, val: '1', type: 'single' },
    { id: 3, val: '4', type: 'boundary' },
    { id: 4, val: 'W', type: 'wicket' },
    { id: 5, val: '2', type: 'single' },
    { id: 6, val: '6', type: 'six' }
  ]);

  // Live ball-by-ball simulation
  useEffect(() => {
    let totalBalls = 100;
    const interval = setInterval(() => {
      totalBalls++;
      const outcomes = ['0', '1', '2', '4', '6', 'W'];
      const roll = outcomes[Math.floor(Math.random() * outcomes.length)];

      setScore(prev => {
        const newRuns = roll === 'W' ? prev.runs : prev.runs + (parseInt(roll) || 0);
        const newWickets = roll === 'W' ? prev.wickets + 1 : prev.wickets;
        const ov = Math.floor(totalBalls / 6);
        const b = totalBalls % 6;
        return { runs: newRuns, wickets: newWickets, overs: `${ov}.${b}` };
      });

      setBallsStrip(prev => {
        let type = 'single';
        if (roll === '0') type = 'dot';
        if (roll === '4') type = 'boundary';
        if (roll === '6') type = 'six';
        if (roll === 'W') type = 'wicket';
        const newBall = { id: Date.now() + Math.random(), val: roll === '0' ? '●' : roll, type };
        const updated = [...prev.slice(1), newBall];
        return updated;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-match-tracker-card" id="liveMatchTracker">
      <div className="tracker-header">
        <div className="tracker-match-info">
          <span className="tracker-league">ASIA CUP T20 • SUPER 4</span>
          <span className="tracker-teams">INDIA vs PAKISTAN</span>
        </div>
        <div className="tracker-status">
          <span className="live-radar-dot"></span> LIVE IN-PLAY (2nd Innings)
        </div>
        <button className="btn-close-tracker" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="tracker-score-body">
        <div className="team-score-block">
          <div className="team-flag">🇮🇳</div>
          <div className="team-details">
            <div className="team-name">India</div>
            <div className="team-runs">182/4 <span className="overs-muted">(20.0 ov)</span></div>
          </div>
        </div>
        <div className="vs-badge">VS</div>
        <div className="team-score-block chasing">
          <div className="team-flag">🇵🇰</div>
          <div className="team-details">
            <div className="team-name">Pakistan (Target 183)</div>
            <div className="team-runs">{score.runs}/{score.wickets} <span className="overs-muted">({score.overs} ov)</span></div>
          </div>
        </div>
      </div>

      <div className="over-strip-container">
        <div className="over-meta">
          <span>Over 17:</span>
          <span className="rr-text">CRR: <b>{crr}</b></span>
          <span className="rr-text">RRR: <b>{rrr}</b></span>
          <span className="target-text">Need <b>{183 - score.runs} off 18</b> balls</span>
        </div>
        <div className="balls-strip">
          {ballsStrip.map(b => (
            <span key={b.id} className={`ball-chip ${b.type}`}>{b.val}</span>
          ))}
        </div>
      </div>

      {/* Fancy Session Markets Grid */}
      <div className="fancy-session-preview">
        <div className="fancy-preview-title">
          <span><i className="fa-solid fa-bolt text-gold"></i> Live Session Fancy Markets (Runs)</span>
          <span className="fancy-note">Rate 100/100 | Zero Deductions</span>
        </div>
        <div className="fancy-cards-row">
          <div className="fancy-market-box">
            <div className="fancy-m-name">17 Over Total Runs (PAK)</div>
            <div className="fancy-dual-btns">
              <button 
                className="fancy-btn lay-no" 
                onClick={() => onAddFancyBet('17 Over Total Runs', 'NO', 148, 100)}
              >
                <span className="f-lbl">NO</span>
                <span className="f-val">148</span>
                <span className="f-rate">100</span>
              </button>
              <button 
                className="fancy-btn back-yes" 
                onClick={() => onAddFancyBet('17 Over Total Runs', 'YES', 150, 100)}
              >
                <span className="f-lbl">YES</span>
                <span className="f-val">150</span>
                <span className="f-rate">100</span>
              </button>
            </div>
          </div>

          <div className="fancy-market-box">
            <div className="fancy-m-name">20 Over Total Innings (PAK)</div>
            <div className="fancy-dual-btns">
              <button 
                className="fancy-btn lay-no" 
                onClick={() => onAddFancyBet('20 Over Total Runs', 'NO', 178, 100)}
              >
                <span className="f-lbl">NO</span>
                <span className="f-val">178</span>
                <span className="f-rate">100</span>
              </button>
              <button 
                className="fancy-btn back-yes" 
                onClick={() => onAddFancyBet('20 Over Total Runs', 'YES', 182, 100)}
              >
                <span className="f-lbl">YES</span>
                <span className="f-val">182</span>
                <span className="f-rate">100</span>
              </button>
            </div>
          </div>

          <div className="fancy-market-box">
            <div className="fancy-m-name">Babar Azam Total Runs</div>
            <div className="fancy-dual-btns">
              <button 
                className="fancy-btn lay-no" 
                onClick={() => onAddFancyBet('Babar Azam Runs', 'NO', 68, 100)}
              >
                <span className="f-lbl">NO</span>
                <span className="f-val">68</span>
                <span className="f-rate">100</span>
              </button>
              <button 
                className="fancy-btn back-yes" 
                onClick={() => onAddFancyBet('Babar Azam Runs', 'YES', 70, 100)}
              >
                <span className="f-lbl">YES</span>
                <span className="f-val">70</span>
                <span className="f-rate">100</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
