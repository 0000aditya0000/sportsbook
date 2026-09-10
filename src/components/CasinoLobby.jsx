import React, { useState } from 'react';

const CASINO_PROVIDERS_SCREENSHOT5 = [
  { id: 'all', label: 'ALL' },
  { id: 'recent', label: 'RECENT' },
  { id: 'fantasy11', label: 'FANTASY11', badge: 'NEW' },
  { id: 'randora', label: 'RANDORA', badge: 'NEW' },
  { id: 'mac88', label: 'MAC88' },
  { id: 'crash88', label: 'CRASH88 GAMING' },
  { id: 'fungames', label: 'FUN GAMES' },
  { id: 'royal', label: 'ROYAL GAMING' },
  { id: 'fusion', label: 'ROYAL GAMING FUSION' },
  { id: 'virtuals', label: 'ROYAL GAMING VIRTUALS' },
  { id: 'crashlive', label: 'CRASH LIVE' }
];

const CASINO_CATEGORIES_SCREENSHOT5 = [
  { id: 'all', label: 'ALL', icon: 'fa-table-cells-large' },
  { id: 'dragon-tiger', label: 'Dragon Tiger', icon: 'fa-dragon' },
  { id: 'aviator', label: 'Aviator', icon: 'fa-jet-fighter' },
  { id: 'mines', label: 'Mines', icon: 'fa-bomb' },
  { id: 'andar-bahar', label: 'Andar Bahar', icon: 'fa-diamond' },
  { id: 'teenpatti', label: 'Teenpatti', icon: 'fa-heart' },
  { id: 'lottery', label: 'Lottery', icon: 'fa-dharmachakra' },
  { id: 'live-poker', label: 'Live Poker', icon: 'fa-coins' },
  { id: 'casual', label: 'Casual Games', icon: 'fa-gamepad' },
  { id: 'scratch', label: 'Scratch Cards', icon: 'fa-ticket' },
  { id: 'live-stream', label: 'Live Stream', icon: 'fa-video' }
];

const CASINO_GAMES_GRID = [
  { id: 'g1', title: 'YAKUZA HONOR', category: 'casual', provider: 'MAC88', bgGrad: 'from-amber' },
  { id: 'g2', title: 'HAND CRICKET', category: 'casual', provider: 'Fun Games', badge: 'VS', bgGrad: 'from-blue' },
  { id: 'g3', title: 'LIGHTNING ROULETTE', category: 'casual', provider: 'Evolution', badge: 'VIRTUAL', bgGrad: 'from-gold' },
  { id: 'g4', title: 'DRAGON TOWER', category: 'casual', provider: 'SmartSoft', bgGrad: 'from-orange' },
  { id: 'g5', title: 'PACKS', category: 'casual', provider: 'Crash Live', bgGrad: 'from-cyan' },
  { id: 'g6', title: 'NAUGHTY BUTTON', category: 'casual', provider: 'Crash88', badge: '4.72x', bgGrad: 'from-pink' },
  { id: 'g7', title: 'LAS VEGAS BLACKJACK', category: 'live-poker', provider: 'Royal Gaming', bgGrad: 'from-emerald' },
  { id: 'g8', title: 'RACE TRACK', category: 'casual', provider: 'Fun Games', bgGrad: 'from-green' },
  { id: 'g9', title: 'TOWER RUSH', category: 'casual', provider: 'SmartSoft', bgGrad: 'from-amber' },
  { id: 'g10', title: 'PICK 3', category: 'lottery', provider: 'Royal Virtuals', bgGrad: 'from-purple' },
  { id: 'g11', title: 'SKY FALL', category: 'aviator', provider: 'Crash Live', bgGrad: 'from-blue' },
  { id: 'g12', title: 'MARBLE PLINKO', category: 'mines', provider: 'MAC88', bgGrad: 'from-slate' },
  { id: 'g13', title: 'AVIATOR CLASSIC', category: 'aviator', provider: 'Spribe', badge: 'HOT', bgGrad: 'from-red' },
  { id: 'g14', title: 'DRAGON TIGER PRO', category: 'dragon-tiger', provider: 'AE Sexy', bgGrad: 'from-rose' },
  { id: 'g15', title: 'TEEN PATTI 1 DAY', category: 'teenpatti', provider: 'Royal Gaming', badge: '1 DAY', bgGrad: 'from-amber' }
];

export default function CasinoLobby({ onLaunchGame }) {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchGameQuery, setSearchGameQuery] = useState('');

  const filteredGames = CASINO_GAMES_GRID.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = !searchGameQuery || g.title.toLowerCase().includes(searchGameQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="casino-lobby-page" id="casinoLobbySection">
      {/* Title & Game Search Bar (Screenshot 5) */}
      <div className="casino-top-bar">
        <h1 className="casino-page-title">CASINO</h1>
        <div className="casino-search-wrapper">
          <input 
            type="text" 
            placeholder="Search Games"
            value={searchGameQuery}
            onChange={(e) => setSearchGameQuery(e.target.value)}
            className="casino-search-input"
          />
        </div>
      </div>

      {/* Provider Horizontal Filter Ribbon (Screenshot 5) */}
      <div className="casino-provider-ribbon">
        {CASINO_PROVIDERS_SCREENSHOT5.map(p => (
          <button
            key={p.id}
            className={`prov-ribbon-btn ${selectedProvider === p.id ? 'active' : ''}`}
            onClick={() => setSelectedProvider(p.id)}
          >
            <span>{p.label}</span>
            {p.badge && <span className="prov-mini-badge">{p.badge}</span>}
          </button>
        ))}
      </div>

      {/* Game Categories Horizontal Icons Bar (Screenshot 5) */}
      <div className="casino-category-icons-bar">
        {CASINO_CATEGORIES_SCREENSHOT5.map(cat => (
          <button
            key={cat.id}
            className={`cat-icon-card ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <i className={`fa-solid ${cat.icon}`}></i>
            <span className="cat-icon-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Game Cards Grid (Screenshot 5) */}
      <div className="casino-cards-grid">
        {filteredGames.map(game => (
          <div 
            key={game.id} 
            className={`casino-rich-card ${game.bgGrad}`}
            onClick={() => onLaunchGame(game.title, game.provider)}
          >
            {game.badge && <span className="game-corner-badge">{game.badge}</span>}
            <div className="crc-visual-glow"></div>
            <div className="crc-content">
              <div className="crc-title">{game.title}</div>
              <div className="crc-provider">{game.provider}</div>
            </div>
            <button className="crc-play-hover-btn">
              <i className="fa-solid fa-play"></i> PLAY
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
