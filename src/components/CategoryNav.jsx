import React from 'react';

const CATEGORIES = [
  { id: 'all', label: 'HOME', icon: 'fa-house', color: 'red' },
  { id: 'multi', label: 'MULTI MARKETS', icon: 'fa-layer-group', color: 'purple' },
  { id: 'cricket', label: 'CRICKET', icon: 'fa-baseball-bat-ball', color: 'maroon', badgeCount: '8' },
  { id: 'sportsbook', label: 'SPORTSBOOK', icon: 'fa-trophy', color: 'gold' },
  { id: 'casino', label: 'CASINO', icon: 'fa-dice', color: 'teal' },
  { id: 'football', label: 'FOOTBALL', icon: 'fa-futbol', color: 'green' },
  { id: 'tennis', label: 'TENNIS', icon: 'fa-table-tennis-paddle-ball', color: 'lime' },
  { id: 'aviator', label: 'AVIATOR', icon: 'fa-jet-fighter', color: 'orange' },
  { id: 'slots', label: 'SLOTS', icon: 'fa-cubes', color: 'pink' }
];

export default function CategoryNav({ activeCat, onSelectCat }) {
  return (
    <nav className="category-nav-bar">
      <div className="category-nav-scroll">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`cat-pill cat-${cat.color} ${activeCat === cat.id || (cat.id === 'all' && activeCat === 'home') ? 'active' : ''}`}
            onClick={() => onSelectCat(cat.id)}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            <span>{cat.label}</span>
            {cat.badgeCount && <span className="nav-count-badge">{cat.badgeCount}</span>}
          </button>
        ))}
        <button className="cat-promo-link" onClick={() => onSelectCat('casino')}>
          👉 Andar Bahar
        </button>
      </div>
    </nav>
  );
}
