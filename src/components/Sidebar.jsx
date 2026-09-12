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

const SPORT_ITEMS = [
  { id: 'cricket', label: 'Cricket', icon: 'fa-baseball-bat-ball', tone: 'cricket' },
  { id: 'football', label: 'Football', icon: 'fa-futbol', tone: 'football' },
  { id: 'tennis', label: 'Tennis', icon: 'fa-table-tennis-paddle-ball', tone: 'tennis' },
  { id: 'horse-racing', label: 'Horse Racing', icon: 'fa-horse-head', tone: 'horse' },
  { id: 'greyhound', label: 'Greyhound Racing', icon: 'fa-dog', tone: 'hound' },
  { id: 'sportsbook', label: 'Sportsbook', icon: 'fa-trophy', tone: 'trophy' },
  { id: 'casino', label: 'Casino', icon: 'fa-heart', tone: 'casino' },
  { id: 'aviator', label: 'Aviator', icon: 'fa-rocket', tone: 'aviator' },
  { id: 'slots', label: 'Slot Games', icon: 'fa-dice', tone: 'slots' },
  { id: 'binary', label: 'Binary', icon: 'fa-chart-column', tone: 'binary' },
  { id: 'politics', label: 'Politics', icon: 'fa-landmark', tone: 'politics' },
  { id: 'table-tennis', label: 'Table Tennis', icon: 'fa-table-tennis-paddle-ball', tone: 'tt' },
  { id: 'basketball', label: 'Basketball', icon: 'fa-basketball', tone: 'basket' },
  { id: 'baseball', label: 'Baseball', icon: 'fa-baseball', tone: 'baseball' },
  { id: 'hockey', label: 'Ice Hockey', icon: 'fa-hockey-puck', tone: 'hockey' },
  { id: 'volleyball', label: 'Volleyball', icon: 'fa-volleyball', tone: 'volley' },
  { id: 'kabaddi', label: 'Kabaddi', icon: 'fa-people-arrows', tone: 'kabaddi' },
  { id: 'promotions', label: 'Promotions', icon: 'fa-bullhorn', tone: 'promo' },
  { id: 'rules', label: 'Game Rules', icon: 'fa-clipboard-list', tone: 'rules' }
];

export default function Sidebar({ 
  activeSport, 
  onSelectSport, 
  isOpen, 
  onCloseMobile,
  onOpenSessionTracker 
}) {
  const [drilldownSport, setDrilldownSport] = useState(null);

  const handleSportClick = (sportId) => {
    if (sportId === 'football' || sportId === 'cricket') {
      setDrilldownSport(sportId);
    } else {
      setDrilldownSport(null);
    }
    if (sportId !== 'promotions' && sportId !== 'rules' && sportId !== 'politics') {
      onSelectSport(sportId === 'table-tennis' ? 'tennis' : sportId === 'hockey' || sportId === 'basketball' || sportId === 'baseball' || sportId === 'volleyball' || sportId === 'kabaddi' || sportId === 'binary' ? 'all' : sportId);
    }
    if (sportId === 'promotions' || sportId === 'rules') {
      alert(sportId === 'promotions' ? 'Promotions coming soon' : 'Game Rules');
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="mobile-sidebar-backdrop active" 
          onClick={onCloseMobile} 
          aria-label="Close Mobile Menu"
        />
      )}

      <aside className={`sidebar-left ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-mobile-header">
          <div className="smh-brand classic-logo">
            <span className="logo-rollix">ROLLIX</span>
            <span className="logo-lotus-mark" aria-hidden="true">✦</span>
            <span className="logo-book">BOOK</span>
          </div>
          <button className="smh-close-btn" onClick={onCloseMobile} aria-label="Close Menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {drilldownSport ? (
          <div className="sidebar-drilldown-block">
            <div className="drilldown-current-sport">
              <i className={`fa-solid ${drilldownSport === 'cricket' ? 'fa-baseball-bat-ball text-cricket' : 'fa-futbol text-football'}`}></i>
              <span>{drilldownSport === 'cricket' ? 'Cricket' : 'Football'}</span>
            </div>
            <button className="btn-sidebar-previous" onClick={() => setDrilldownSport(null)}>
              <i className="fa-solid fa-chevron-left"></i> Previous
            </button>
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
          <div className="sidebar-sports-list classic-sport-list">
            {SPORT_ITEMS.map(item => (
              <div
                key={item.id}
                className={`sidebar-item tone-${item.tone} ${activeSport === item.id ? 'active' : ''}`}
                onClick={() => handleSportClick(item.id)}
              >
                <div className={`sb-icon tone-${item.tone}`}>
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className="sb-name">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="sidebar-shortcuts desktop-only-flex">
          <button className="shortcut-pill" onClick={onOpenSessionTracker}>
            <i className="fa-solid fa-bolt text-gold"></i> Live Cricket Fancy
          </button>
        </div>
      </aside>
    </>
  );
}
