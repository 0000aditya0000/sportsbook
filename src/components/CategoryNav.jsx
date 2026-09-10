import React from 'react';

const CATEGORIES = [
  { id: 'all', label: 'HOME', icon: 'fa-house' },
  { id: 'multi', label: 'MULTI MARKETS', icon: 'fa-layer-group' },
  { id: 'cricket', label: 'CRICKET', icon: 'fa-baseball-bat-ball', badgeCount: '8 LIVE' },
  { id: 'sportsbook', label: 'SPORTSBOOK', icon: 'fa-trophy' },
  { id: 'casino', label: 'CASINO', icon: 'fa-dice' },
  { id: 'fantasy11', label: 'FANTASY11', icon: 'fa-users-viewfinder', badge: 'NEW' },
  { id: 'randora', label: 'RANDORA', icon: 'fa-gem', badge: 'HOT' },
  { id: 'football', label: 'FOOTBALL', icon: 'fa-futbol', badgeCount: '5 LIVE' },
  { id: 'tennis', label: 'TENNIS', icon: 'fa-table-tennis-paddle-ball', badgeCount: '4 LIVE' },
  { id: 'horse-racing', label: 'HORSE RACING', icon: 'fa-horse' },
  { id: 'greyhound', label: 'GREYHOUND', icon: 'fa-paw' },
  { id: 'aviator', label: 'AVIATOR', icon: 'fa-jet-fighter' },
  { id: 'slots', label: 'SLOTS', icon: 'fa-cubes' },
  { id: 'binary', label: 'BINARY', icon: 'fa-chart-candlestick' }
];

export default function CategoryNav({ activeCat, onSelectCat }) {
  return (
    <nav className="category-nav-bar">
      <div className="category-nav-scroll">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`cat-pill ${activeCat === cat.id ? 'active' : ''} ${cat.badge ? 'has-badge' : ''}`}
            onClick={() => onSelectCat(cat.id)}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            <span>{cat.label}</span>
            {cat.badgeCount && <span className="nav-count-badge">{cat.badgeCount}</span>}
            {cat.badge && <span className="pill-badge pulse-badge">{cat.badge}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
}
