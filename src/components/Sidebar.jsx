import React, { useState } from 'react';

const FOOTBALL_LEAGUES = [
  "Bolivian Cup",
  "CONMEBOL Copa Libertadores",
  "US MLS",
  "Uruguayan Cup",
  "Saudi Professional League",
  "English Sky Bet Championship"
];

const CRICKET_LEAGUES = [
  "One Day Matches",
  "International Twenty20 Matches",
  "South Africa / First Class Series",
  "International / T20 Africa Continent Cup",
  "European T20 Premier League"
];

export default function Sidebar({ 
  activeSport, 
  onSelectSport, 
  isOpen, 
  onOpenSessionTracker 
}) {
  const [drilldownSport, setDrilldownSport] = useState(null); // 'football' | 'cricket' | null

  const handleSportClick = (sportId) => {
    if (sportId === 'football' || sportId === 'cricket') {
      setDrilldownSport(sportId);
    } else {
      setDrilldownSport(null);
    }
    onSelectSport(sportId);
  };

  return (
    <aside className={`sidebar-left ${isOpen ? 'mobile-open' : ''}`}>
      {/* Top Matches & Sports Main Anchors (Screenshot 1 & 2) */}
      <div className="sidebar-top-anchors">
        <div 
          className={`anchor-item ${activeSport === 'all' && !drilldownSport ? 'active' : ''}`}
          onClick={() => {
            setDrilldownSport(null);
            onSelectSport('all');
          }}
        >
          <i className="fa-regular fa-star text-gold"></i>
          <span>Top Matches</span>
        </div>
        <div 
          className="anchor-item"
          onClick={() => {
            setDrilldownSport(null);
            onSelectSport('all');
          }}
        >
          <i className="fa-solid fa-house"></i>
          <span>Sports</span>
        </div>
      </div>

      {/* Drill-down View (Screenshot 1, 2, 3) */}
      {drilldownSport ? (
        <div className="sidebar-drilldown-block">
          {/* Active Sport Title */}
          <div className="drilldown-current-sport">
            <i className={`fa-solid ${drilldownSport === 'cricket' ? 'fa-baseball-bat-ball text-cricket' : 'fa-futbol text-football'}`}></i>
            <span>{drilldownSport === 'cricket' ? 'Cricket' : 'Football'}</span>
          </div>

          {/* Previous Button */}
          <button className="btn-sidebar-previous" onClick={() => setDrilldownSport(null)}>
            <i className="fa-solid fa-chevron-left"></i> Previous
          </button>

          {/* League Hierarchy List */}
          <div className="drilldown-leagues-list">
            {(drilldownSport === 'cricket' ? CRICKET_LEAGUES : FOOTBALL_LEAGUES).map((league, idx) => (
              <div 
                key={idx} 
                className="league-item-row"
                onClick={() => alert(`Filtering matches for ${league}`)}
              >
                <span>{league}</span>
                <i className="fa-solid fa-chevron-right arr-right"></i>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Standard Sport List */
        <div className="sidebar-sports-list">
          <div className={`sidebar-item ${activeSport === 'all' ? 'active' : ''}`} onClick={() => handleSportClick('all')}>
            <div className="sb-icon"><i className="fa-solid fa-globe"></i></div>
            <span className="sb-name">All Sports</span>
            <span className="sb-count">24</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'cricket' ? 'active' : ''}`} onClick={() => handleSportClick('cricket')}>
            <div className="sb-icon cricket-icon"><i className="fa-solid fa-baseball-bat-ball"></i></div>
            <span className="sb-name">Cricket</span>
            <span className="sb-count live-num">8</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'football' ? 'active' : ''}`} onClick={() => handleSportClick('football')}>
            <div className="sb-icon football-icon"><i className="fa-solid fa-futbol"></i></div>
            <span className="sb-name">Football</span>
            <span className="sb-count live-num">5</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'tennis' ? 'active' : ''}`} onClick={() => handleSportClick('tennis')}>
            <div className="sb-icon tennis-icon"><i className="fa-solid fa-table-tennis-paddle-ball"></i></div>
            <span className="sb-name">Tennis</span>
            <span className="sb-count live-num">4</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'horse-racing' ? 'active' : ''}`} onClick={() => handleSportClick('horse-racing')}>
            <div className="sb-icon horse-icon"><i className="fa-solid fa-horse-head"></i></div>
            <span className="sb-name">Horse Racing</span>
            <span className="sb-count">12</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'greyhound' ? 'active' : ''}`} onClick={() => handleSportClick('greyhound')}>
            <div className="sb-icon hound-icon"><i className="fa-solid fa-paw"></i></div>
            <span className="sb-name">Greyhound Racing</span>
            <span className="sb-count">9</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'sportsbook' ? 'active' : ''}`} onClick={() => handleSportClick('sportsbook')}>
            <div className="sb-icon trophy-icon"><i className="fa-solid fa-trophy"></i></div>
            <span className="sb-name">Sportsbook Premium</span>
            <span className="sb-tag">0%</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'casino' ? 'active' : ''}`} onClick={() => handleSportClick('casino')}>
            <div className="sb-icon casino-icon"><i className="fa-solid fa-dice-d20"></i></div>
            <span className="sb-name">Live Casino</span>
            <span className="sb-tag hot-tag">HOT</span>
          </div>
          <div className={`sidebar-item ${activeSport === 'aviator' ? 'active' : ''}`} onClick={() => handleSportClick('aviator')}>
            <div className="sb-icon aviator-icon"><i className="fa-solid fa-plane-departure"></i></div>
            <span className="sb-name">Aviator Crash</span>
            <span className="sb-tag gold-tag">x999</span>
          </div>
        </div>
      )}

      {/* Feature Shortcuts */}
      <div className="sidebar-section-divider">
        <span>EXCHANGE FEATURES</span>
      </div>
      <div className="sidebar-shortcuts">
        <button className="shortcut-pill" onClick={onOpenSessionTracker}>
          <i className="fa-solid fa-bolt text-gold"></i> Live Cricket Fancy (Session)
        </button>
        <button className="shortcut-pill" onClick={() => handleSportClick('cricket')}>
          <i className="fa-solid fa-shield-halved text-accent"></i> 0% Commission Bookmakers
        </button>
      </div>

      {/* WhatsApp VIP Support Box */}
      <div className="whatsapp-support-box">
        <div className="wa-icon-glow">
          <i className="fa-brands fa-whatsapp"></i>
        </div>
        <div className="wa-info">
          <div className="wa-title">24/7 VIP Support</div>
          <div className="wa-sub">Instant Deposit & Withdrawal</div>
        </div>
        <a 
          href="https://wa.me/?text=Hi%20RollixBook%20Exchange%20VIP" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="wa-chat-btn"
        >
          Chat Now
        </a>
      </div>
    </aside>
  );
}
