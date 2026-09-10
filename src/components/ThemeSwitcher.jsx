import React from 'react';

export const THEMES = [
  {
    id: 'obsidian',
    name: 'Obsidian Gold (Default)',
    desc: 'Deep obsidian navy with gold accents & premium dark contrast',
    primaryColor: '#0a111a',
    accentColor: '#ffb703',
    cardColor: '#152233',
    badge: 'Popular'
  },
  {
    id: 'emerald',
    name: 'Emerald Sports Green',
    desc: 'Classic European racing green & stadium turf aesthetic',
    primaryColor: '#041a12',
    accentColor: '#10b981',
    cardColor: '#0e3b2b',
    badge: 'Exchange'
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire Blue',
    desc: 'Midnight oceanic blue with vibrant electric cyan highlights',
    primaryColor: '#060e1e',
    accentColor: '#38bdf8',
    cardColor: '#132446',
    badge: 'Pro'
  },
  {
    id: 'neon',
    name: 'Cyberpunk Neon Violet',
    desc: 'High-energy night arcade, crash & aviator style synthwave',
    primaryColor: '#0f091f',
    accentColor: '#ec4899',
    cardColor: '#221842',
    badge: 'Casino'
  },
  {
    id: 'crimson',
    name: 'Ruby Crimson Red',
    desc: 'Luxurious Macau high-roller velvet red & dragon gold',
    primaryColor: '#18080c',
    accentColor: '#fb7185',
    cardColor: '#32101b',
    badge: 'VIP'
  },
  {
    id: 'light',
    name: 'Classic Clean Light',
    desc: 'Crisp day mode with high-contrast sharp exchange back/lay odds',
    primaryColor: '#f1f5f9',
    accentColor: '#0284c7',
    cardColor: '#ffffff',
    badge: 'Day Mode'
  }
];

export default function ThemeSwitcher({ currentTheme, onSelectTheme, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box theme-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <i className="fa-solid fa-palette text-gold"></i> Choose Color Theme
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Theme Picker">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body theme-modal-body">
          <p className="theme-modal-intro">
            Personalize your sportsbook interface. The color scheme updates instantly across all odds tables, sidebars, charts, and betslips.
          </p>

          <div className="theme-cards-grid">
            {THEMES.map(t => {
              const isSelected = currentTheme === t.id;
              return (
                <div 
                  key={t.id} 
                  className={`theme-palette-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    onSelectTheme(t.id);
                  }}
                >
                  <div className="theme-color-swatches">
                    <span className="swatch" style={{ background: t.primaryColor }} title="Primary Background"></span>
                    <span className="swatch" style={{ background: t.cardColor }} title="Card Surface"></span>
                    <span className="swatch" style={{ background: t.accentColor }} title="Accent Highlight"></span>
                  </div>

                  <div className="theme-info">
                    <div className="theme-name">
                      <span>{t.name}</span>
                      <span className="theme-pill-badge">{t.badge}</span>
                      {isSelected && <i className="fa-solid fa-circle-check text-success"></i>}
                    </div>
                    <div className="theme-desc">{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="theme-modal-footer">
            <button className="btn-close-theme" onClick={onClose}>
              Done / Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Floating Widget for easy instant switching from anywhere
export function ThemeFloatingToggle({ currentTheme, onOpenModal, onNextTheme }) {
  const currentObj = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  return (
    <div className="theme-floating-bar" title="Click to change theme palette">
      <button 
        className="theme-floating-btn" 
        onClick={onOpenModal}
        aria-label="Change Color Theme"
      >
        <i className="fa-solid fa-palette"></i>
        <span className="tf-label">{currentObj.name.split(' ')[0]}</span>
        <span className="tf-dot" style={{ background: currentObj.accentColor }}></span>
      </button>
      <button 
        className="theme-cycle-btn" 
        onClick={(e) => {
          e.stopPropagation();
          onNextTheme();
        }}
        title="Quick cycle to next theme"
        aria-label="Next Theme"
      >
        <i className="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
  );
}
