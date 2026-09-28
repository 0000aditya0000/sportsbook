'use client';

import React, { useState } from 'react';
import { CASINO_GAMES, PROVIDER_BANNERS } from '../data/casinoMedia';

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

export default function CasinoLobby({ onLaunchGame }) {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchGameQuery, setSearchGameQuery] = useState('');

  const filteredGames = CASINO_GAMES.filter(g => {
    const matchesCat = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesSearch = !searchGameQuery || g.title.toLowerCase().includes(searchGameQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="casino-lobby-page" id="casinoLobbySection">
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

      <div className="provider-banner-grid casino-page-providers">
        {PROVIDER_BANNERS.map(p => (
          <button
            key={p.id}
            type="button"
            className="provider-banner"
            style={{
              '--prov-accent': p.accent,
              backgroundImage: `linear-gradient(90deg, ${p.accent} 0%, ${p.accent}ee 38%, transparent 72%), url(${p.image})`
            }}
            onClick={() => setSelectedProvider(p.id)}
          >
            <span className="pb-name">{p.name}</span>
          </button>
        ))}
      </div>

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

      <div className="casino-cards-grid">
        {filteredGames.map(game => (
          <div 
            key={game.id} 
            className="casino-rich-card has-image"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.78) 100%), url(${game.image})` }}
            onClick={() => onLaunchGame(game.title, game.provider)}
          >
            {game.badge && <span className="game-corner-badge">{game.badge}</span>}
            <img className="crc-img-fallback" src={game.image} alt="" loading="lazy" />
            <div className="crc-content">
              <div className="crc-title">{game.title}</div>
              <div className="crc-provider">{game.provider}</div>
            </div>
            <button type="button" className="crc-play-hover-btn">
              <i className="fa-solid fa-play"></i> PLAY
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
