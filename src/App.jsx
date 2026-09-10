import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Sidebar from './components/Sidebar';
import CricketTracker from './components/CricketTracker';
import OddsGrid from './components/OddsGrid';
import MatchDetailView from './components/MatchDetailView';
import CasinoLobby from './components/CasinoLobby';
import BetSlip from './components/BetSlip';
import AccountDrawer from './components/AccountDrawer';
import AccountPages from './components/AccountPages';
import { DepositModal, GameModal } from './components/Modals';
import MobileBottomNav from './components/MobileBottomNav';
import ThemeSwitcher, { THEMES, ThemeFloatingToggle } from './components/ThemeSwitcher';
import { INITIAL_DATA } from './data/mockData';
import { playOddsTickSound, playChirpSound, playWinChime } from './utils/audio';

export default function App() {
  // App Data & Live Odds
  const [data, setData] = useState(INITIAL_DATA);
  const [flashStates, setFlashStates] = useState({});

  // Filter & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSport, setActiveSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null); // When viewing match detail view (Screenshot 2, 3, 4)

  // User State
  const [user, setUser] = useState({
    mainBalance: 145280.00,
    exposure: 8450.00,
    bonus: 0.00,
    soundEnabled: true
  });

  // Betslip State
  const [selections, setSelections] = useState([]);
  const [openBets, setOpenBets] = useState([
    { id: "88921", match: "England vs Pakistan", runner: "England", type: "BACK", odds: 1.85, stake: 5000, profit: 4250, cashoutVal: 4100 },
    { id: "88922", match: "Essex W vs Yorkshire W", runner: "Yorkshire W", type: "LAY", odds: 2.14, stake: 3000, liability: 3420, cashoutVal: 2850 }
  ]);
  const [slipTab, setSlipTab] = useState('slip');
  const [quickBetActive, setQuickBetActive] = useState(false);

  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('rollix_theme') || localStorage.getItem('maxlotus_theme') || 'obsidian');
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : `dark-theme theme-${theme}`;
    localStorage.setItem('rollix_theme', theme);
  }, [theme]);

  const handleCycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex].id;
    setTheme(nextTheme);
    showToast(`Color Theme: ${THEMES[nextIndex].name}`, 'info');
  };

  // UI Panels State
  const [showAccountDrawer, setShowAccountDrawer] = useState(false);
  const [accountModal, setAccountModal] = useState({ isOpen: false, page: 'transactions' });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileSlip, setShowMobileSlip] = useState(false);
  const [showCricketTracker, setShowCricketTracker] = useState(true);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [gameModal, setGameModal] = useState({ isOpen: false, game: null });
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Real-Time Odds Fluctuation Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const sports = ['cricket', 'football', 'tennis'];
        const randomSport = sports[Math.floor(Math.random() * sports.length)];
        const list = prevData[randomSport];
        if (!list || list.length === 0) return prevData;

        const liveEvents = list.filter(e => e.isLive);
        if (liveEvents.length === 0) return prevData;

        const event = liveEvents[Math.floor(Math.random() * liveEvents.length)];
        const outcomes = ['team1', 'team2'];
        if (event.odds.draw && event.odds.draw.back !== null) outcomes.push('draw');
        const targetOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        const side = Math.random() > 0.5 ? 'back' : 'lay';

        const currentVal = event.odds[targetOutcome][side];
        if (!currentVal) return prevData;

        const delta = (Math.random() * 0.04 - 0.02);
        let newVal = +(currentVal + delta).toFixed(2);
        if (newVal < 1.02) newVal = 1.02;

        const key = `${event.id}-${targetOutcome === 'team1' ? '1' : targetOutcome === 'team2' ? '2' : 'x'}-${side}`;
        const flashClass = delta > 0 ? 'flash-up' : 'flash-down';

        setFlashStates(prev => ({ ...prev, [key]: flashClass }));
        if (user.soundEnabled) {
          playOddsTickSound(delta > 0 ? 880 : 440);
        }

        setTimeout(() => {
          setFlashStates(prev => ({ ...prev, [key]: '' }));
        }, 800);

        return {
          ...prevData,
          [randomSport]: prevData[randomSport].map(ev => {
            if (ev.id !== event.id) return ev;
            return {
              ...ev,
              odds: {
                ...ev.odds,
                [targetOutcome]: {
                  ...ev.odds[targetOutcome],
                  [side]: newVal
                }
              }
            };
          })
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [user.soundEnabled]);

  // Handle Odds Selection
  const handleSelectOdds = (event, runnerName, outcomeType, betType, odds) => {
    if (!odds || odds <= 1) return;

    if (quickBetActive) {
      handleQuickBet(event, runnerName, betType, odds, 1000);
      return;
    }

    setSelections(prev => {
      const idx = prev.findIndex(s => s.eventId === event.id && s.runnerName === runnerName && s.betType === betType);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].odds = odds;
        showToast(`Updated odds for ${runnerName} to ${odds.toFixed(2)}`, 'info');
        return updated;
      } else {
        playChirpSound(540);
        showToast(`Added ${betType} selection: ${runnerName} @ ${odds.toFixed(2)}`, 'success');
        return [
          {
            id: 'sel-' + Date.now() + Math.random().toString(36).substr(2, 4),
            eventId: event.id,
            matchName: `${event.team1} vs ${event.team2}`,
            runnerName,
            outcomeType,
            betType,
            odds: Number(odds),
            stake: 1000
          },
          ...prev
        ];
      }
    });

    setSlipTab('slip');
    if (window.innerWidth <= 992) {
      setShowMobileSlip(true);
    }
  };

  // Add Cricket Fancy Session Bet
  const handleAddFancyBet = (marketTitle, fancyType, runsLine, rate) => {
    if (quickBetActive) {
      handleQuickBet({ id: 'fancy-ses' }, `${marketTitle} (${runsLine} runs)`, fancyType === 'YES' ? 'BACK' : 'LAY', 2.00, 1000);
      return;
    }

    setSelections(prev => [
      {
        id: 'sel-f-' + Date.now(),
        eventId: 'fancy-ses',
        matchName: selectedMatch ? `${selectedMatch.team1} vs ${selectedMatch.team2}` : 'India vs Pakistan',
        runnerName: `${marketTitle} - ${fancyType} (${runsLine} Runs)`,
        outcomeType: fancyType,
        betType: fancyType === 'YES' ? 'BACK' : 'LAY',
        odds: 2.00,
        stake: 1000,
        isFancy: true
      },
      ...prev
    ]);

    playChirpSound(600);
    showToast(`Added Fancy ${fancyType} on ${marketTitle} @ ${runsLine} Runs`, 'success');
    setSlipTab('slip');
    if (window.innerWidth <= 992) {
      setShowMobileSlip(true);
    }
  };

  // Quick Bet Execution
  const handleQuickBet = (event, runnerName, betType, odds, stake) => {
    const liability = betType === 'BACK' ? stake : stake * (odds - 1);
    if (liability > user.mainBalance) {
      showToast('Insufficient balance for 1-Click Bet!', 'error');
      return;
    }

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance - liability,
      exposure: prev.exposure + liability
    }));

    const betId = Math.floor(10000 + Math.random() * 90000).toString();
    setOpenBets(prev => [
      {
        id: betId,
        match: event.team1 ? `${event.team1} vs ${event.team2}` : '1-Click Match',
        runner: runnerName,
        type: betType,
        odds,
        stake,
        profit: betType === 'BACK' ? stake * (odds - 1) : stake,
        cashoutVal: Math.round(stake * 0.98)
      },
      ...prev
    ]);

    playWinChime();
    showToast(`1-Click Placed: ${runnerName} (${betType}) @ ${odds.toFixed(2)} for ₹${stake}`, 'success');
  };

  // Slip Modifications
  const handleAdjustOdds = (selId, delta) => {
    setSelections(prev => prev.map(s => {
      if (s.id !== selId) return s;
      return { ...s, odds: Math.max(1.01, +(s.odds + delta).toFixed(2)) };
    }));
  };

  const handleUpdateOdds = (selId, newOdds) => {
    const val = parseFloat(newOdds);
    if (!isNaN(val) && val >= 1.01) {
      setSelections(prev => prev.map(s => s.id === selId ? { ...s, odds: val } : s));
    }
  };

  const handleUpdateStake = (selId, newStake) => {
    const val = parseFloat(newStake);
    setSelections(prev => prev.map(s => s.id === selId ? { ...s, stake: isNaN(val) ? 0 : val } : s));
  };

  const handleApplyPreset = (preset) => {
    if (selections.length === 0) return;
    setSelections(prev => prev.map(s => {
      if (preset === 'max') {
        return { ...s, stake: Math.floor(user.mainBalance / Math.max(1, prev.length)) };
      } else {
        return { ...s, stake: s.stake + Number(preset) };
      }
    }));
    playChirpSound(440);
  };

  const handleRemoveSelection = (selId) => {
    setSelections(prev => prev.filter(s => s.id !== selId));
  };

  const handleClearSlip = () => {
    setSelections([]);
    showToast('Cleared Bet Slip', 'info');
  };

  // Place Bet
  const handlePlaceBet = () => {
    if (selections.length === 0) return;

    let requiredExposure = 0;
    selections.forEach(sel => {
      if (sel.betType === 'BACK') {
        requiredExposure += sel.stake;
      } else {
        requiredExposure += sel.stake * (sel.odds - 1);
      }
    });

    if (requiredExposure > user.mainBalance) {
      showToast('Insufficient Balance for this Exposure!', 'error');
      return;
    }

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance - requiredExposure,
      exposure: prev.exposure + requiredExposure
    }));

    const newBets = selections.map(sel => ({
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      match: sel.matchName,
      runner: sel.runnerName,
      type: sel.betType,
      odds: sel.odds,
      stake: sel.stake,
      profit: sel.betType === 'BACK' ? sel.stake * (sel.odds - 1) : sel.stake,
      liability: sel.betType === 'LAY' ? sel.stake * (sel.odds - 1) : sel.stake,
      cashoutVal: Math.round(sel.stake * 0.95)
    }));

    setOpenBets(prev => [...newBets, ...prev]);
    setSelections([]);
    playWinChime();
    showToast(`Order Matched! ${newBets.length} Exchange Bet(s) placed.`, 'success');

    if (window.innerWidth <= 992) {
      setShowMobileSlip(false);
    }
  };

  // Cashout Bet
  const handleCashoutBet = (betId, amount) => {
    const bet = openBets.find(b => b.id === betId);
    if (!bet) return;

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance + amount,
      exposure: Math.max(0, prev.exposure - bet.stake)
    }));

    setOpenBets(prev => prev.filter(b => b.id !== betId));
    playWinChime();
    showToast(`Successfully cashed out ₹${amount.toLocaleString('en-IN')}!`, 'success');
  };

  const handleCashoutAll = () => {
    if (openBets.length === 0) {
      showToast('No active bets to cashout.', 'info');
      return;
    }
    const total = openBets.reduce((acc, b) => acc + (b.cashoutVal || 0), 0);

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance + total,
      exposure: 0
    }));

    setOpenBets([]);
    playWinChime();
    showToast(`Full Cashout: ₹${total.toLocaleString('en-IN')} credited to wallet!`, 'success');
    setSlipTab('slip');
  };

  // Deposit & Withdrawal Handlers
  const handleSubmitDeposit = (amount) => {
    setUser(prev => ({ ...prev, mainBalance: prev.mainBalance + amount }));
    setDepositModalOpen(false);
    playWinChime();
    showToast(`Deposit Successful! ₹${amount.toLocaleString('en-IN')} added via Instant UPI.`, 'success');
  };

  const handleOpenWithdraw = () => {
    const amt = prompt("Enter withdrawal amount (₹):", "5000");
    if (amt && Number(amt) <= (user.mainBalance - user.exposure)) {
      setUser(prev => ({ ...prev, mainBalance: prev.mainBalance - Number(amt) }));
      showToast(`Withdrawal of ₹${Number(amt).toLocaleString('en-IN')} initiated to bank!`, 'success');
    } else if (amt) {
      showToast('Withdrawal amount exceeds available balance!', 'error');
    }
  };

  // Filter Logic
  const filterList = (list) => {
    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(e => 
      e.team1.toLowerCase().includes(q) || 
      e.team2.toLowerCase().includes(q) || 
      e.league.toLowerCase().includes(q)
    );
  };

  const filteredCricket = filterList(data.cricket);
  const filteredFootball = filterList(data.football);
  const filteredTennis = filterList(data.tennis);
  const filteredUpcoming = filterList(data.upcomingCricket);

  const showCricket = (activeSport === 'all' || activeSport === 'cricket');
  const showFootball = (activeSport === 'all' || activeSport === 'football');
  const showTennis = (activeSport === 'all' || activeSport === 'tennis');
  const showCasino = (activeSport === 'casino' || activeCategory === 'casino' || activeSport === 'aviator' || activeSport === 'slots');

  return (
    <div className="app-root">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <i className={`fa-solid ${t.type === 'success' ? 'fa-circle-check' : t.type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info'}`}></i>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Master Header */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        mainBalance={user.mainBalance}
        exposure={user.exposure}
        soundEnabled={user.soundEnabled}
        onToggleSound={() => setUser(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
        onOpenAccount={() => setShowAccountDrawer(true)}
        onToggleMobileMenu={() => setShowMobileSidebar(prev => !prev)}
        onOpenDeposit={() => setDepositModalOpen(true)}
        onOpenWithdraw={handleOpenWithdraw}
        onOpenTheme={() => setThemeModalOpen(true)}
      />

      {/* Category Nav Ribbon */}
      <CategoryNav 
        activeCat={activeCategory}
        onSelectCat={(cat) => {
          setActiveCategory(cat);
          setActiveSport(cat === 'home' || cat === 'multi' ? 'all' : cat);
          setSelectedMatch(null);
        }}
      />

      {/* Master 3-Column Layout */}
      <div className="master-layout-container">
        {/* Left Sidebar */}
        <Sidebar 
          activeSport={activeSport}
          onSelectSport={(s) => {
            setActiveSport(s);
            setSelectedMatch(null);
            setShowMobileSidebar(false);
          }}
          isOpen={showMobileSidebar}
          onCloseMobile={() => setShowMobileSidebar(false)}
          onOpenSessionTracker={() => {
            setSelectedMatch(data.cricket[0]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Center Content */}
        <main className="center-content">
          {/* Deep Match View (Screenshot 2, 3, 4) */}
          {selectedMatch ? (
            <MatchDetailView 
              match={selectedMatch}
              onBack={() => setSelectedMatch(null)}
              onSelectOdds={handleSelectOdds}
              onSelectFancy={handleAddFancyBet}
            />
          ) : showCasino ? (
            /* Casino Lobby Page (Screenshot 5) */
            <CasinoLobby 
              onLaunchGame={(title, provider) => {
                setGameModal({ isOpen: true, game: { title, provider } });
              }}
            />
          ) : (
            <>
              {/* Promo Hero */}
              <section className="hero-banner-card">
                <div className="hero-banner-content">
                  <div className="hero-badge">
                    <i className="fa-solid fa-crown"></i> ASIA'S #1 LIQUIDITY EXCHANGE
                  </div>
                  <h1 className="hero-title">Play More. Win Bigger. Zero Delay.</h1>
                  <p className="hero-subtitle">
                    Back & Lay on Live InPlay Markets with Unlimited Payouts & 0% Bookmaker Margins.
                  </p>
                  <div className="hero-actions">
                    <button className="btn-hero-primary" onClick={() => setSelectedMatch(data.cricket[0])}>
                      <i className="fa-solid fa-baseball-bat-ball"></i> Open InPlay Match Center
                    </button>
                    <button className="btn-hero-secondary" onClick={() => setActiveSport('casino')}>
                      <i className="fa-solid fa-dice"></i> Explore Live Casino
                    </button>
                  </div>
                </div>
                <div className="hero-banner-visual">
                  <div className="hero-chip-stack">
                    <span className="floating-chip chip-1">1.05</span>
                    <span className="floating-chip chip-2">100x</span>
                    <span className="floating-chip chip-3">LAY 2.10</span>
                  </div>
                </div>
              </section>

              {/* InPlay Exchange Master Section */}
              <section className="exchange-market-section">
                <div className="section-banner inplay-banner">
                  <div className="banner-title-group">
                    <i className="fa-solid fa-circle-play banner-icon-live"></i>
                    <span className="banner-title-text">InPlay Exchange</span>
                    <span className="banner-active-pill">
                      <span className="radar-pulse"></span> 17 LIVE
                    </span>
                  </div>
                  <div className="banner-tools">
                    <button className="tool-pill active"><i className="fa-solid fa-plus"></i> All</button>
                    <button className="tool-pill"><i className="fa-solid fa-bolt"></i> Live</button>
                    <button className="tool-pill"><i className="fa-solid fa-vr-cardboard"></i> Virtual</button>
                    <button className="tool-pill"><i className="fa-solid fa-crown"></i> Premium</button>
                  </div>
                </div>

                {/* 6-Column Header */}
                <div className="odds-table-header">
                  <div className="col-head col-info">EVENT DETAILS</div>
                  <div className="col-head col-odds-group col-1">
                    <span className="pair-title">1 (HOME)</span>
                    <div className="pair-labels">
                      <span className="back-lbl">BACK</span>
                      <span className="lay-lbl">LAY</span>
                    </div>
                  </div>
                  <div className="col-head col-odds-group col-x">
                    <span className="pair-title">X (DRAW)</span>
                    <div className="pair-labels">
                      <span className="back-lbl">BACK</span>
                      <span className="lay-lbl">LAY</span>
                    </div>
                  </div>
                  <div className="col-head col-odds-group col-2">
                    <span className="pair-title">2 (AWAY)</span>
                    <div className="pair-labels">
                      <span className="back-lbl">BACK</span>
                      <span className="lay-lbl">LAY</span>
                    </div>
                  </div>
                </div>

                {/* Cricket Block */}
                {showCricket && (
                  <OddsGrid 
                    events={filteredCricket}
                    title="Cricket"
                    icon="fa-baseball-bat-ball"
                    iconClass="text-cricket"
                    flashStates={flashStates}
                    onSelectOdds={handleSelectOdds}
                    onSelectEvent={(e) => setSelectedMatch(e)}
                  />
                )}

                {/* Football Block */}
                {showFootball && (
                  <OddsGrid 
                    events={filteredFootball}
                    title="Football"
                    icon="fa-futbol"
                    iconClass="text-football"
                    flashStates={flashStates}
                    onSelectOdds={handleSelectOdds}
                    onSelectEvent={(e) => setSelectedMatch(e)}
                  />
                )}

                {/* Tennis Block */}
                {showTennis && (
                  <OddsGrid 
                    events={filteredTennis}
                    title="Tennis"
                    icon="fa-table-tennis-paddle-ball"
                    iconClass="text-tennis"
                    flashStates={flashStates}
                    onSelectOdds={handleSelectOdds}
                    onSelectEvent={(e) => setSelectedMatch(e)}
                  />
                )}
              </section>

              {/* Upcoming Events Section (Screenshot 1) */}
              {activeSport === 'all' && (
                <section className="exchange-market-section">
                  <div className="section-banner upcoming-banner">
                    <div className="banner-title-group">
                      <i className="fa-regular fa-clock banner-icon-upcoming"></i>
                      <span className="banner-title-text">Upcoming Events</span>
                      <span className="banner-active-pill">NEXT 24H</span>
                    </div>
                    <div className="banner-tools">
                      <button className="tool-pill active"><i className="fa-solid fa-calendar-day"></i> Today</button>
                      <button className="tool-pill"><i className="fa-solid fa-forward"></i> Tomorrow</button>
                    </div>
                  </div>

                  <OddsGrid 
                    events={filteredUpcoming}
                    title="Upcoming Matches"
                    icon="fa-baseball-bat-ball"
                    iconClass="text-cricket"
                    flashStates={flashStates}
                    onSelectOdds={handleSelectOdds}
                    onSelectEvent={(e) => setSelectedMatch(e)}
                  />
                </section>
              )}
            </>
          )}

          {/* Regulatory Trust Strip */}
          <section className="trust-footer-strip">
            <div className="trust-item"><i className="fa-solid fa-shield-halved"></i> 256-Bit SSL Encrypted</div>
            <div className="trust-item"><i className="fa-solid fa-building-columns"></i> Instant UPI & Bank Transfer</div>
            <div className="trust-item"><i className="fa-solid fa-certificate"></i> Curacao eGaming #365/JAZ</div>
            <div className="trust-item"><i className="fa-solid fa-user-check"></i> 18+ Responsible Gaming</div>
          </section>
        </main>

        {/* Right Rail: Betting Slip */}
        <BetSlip 
          selections={selections}
          openBets={openBets}
          activeTab={slipTab}
          onTabChange={setSlipTab}
          quickBetActive={quickBetActive}
          onToggleQuickBet={setQuickBetActive}
          onAdjustOdds={handleAdjustOdds}
          onUpdateOdds={handleUpdateOdds}
          onUpdateStake={handleUpdateStake}
          onApplyPreset={handleApplyPreset}
          onRemoveSelection={handleRemoveSelection}
          onClearSlip={handleClearSlip}
          onPlaceBet={handlePlaceBet}
          onCashoutBet={handleCashoutBet}
          onCashoutAll={handleCashoutAll}
          isOpenMobile={showMobileSlip}
          onCloseMobile={() => setShowMobileSlip(false)}
        />
      </div>

      {/* Account Drawer (Screenshot 1) */}
      <AccountDrawer 
        isOpen={showAccountDrawer}
        onClose={() => setShowAccountDrawer(false)}
        mainBalance={user.mainBalance}
        exposure={user.exposure}
        bonus={user.bonus}
        onOpenDeposit={() => {
          setShowAccountDrawer(false);
          setDepositModalOpen(true);
        }}
        onOpenWithdraw={() => {
          setShowAccountDrawer(false);
          handleOpenWithdraw();
        }}
        onViewOpenBets={() => {
          setShowAccountDrawer(false);
          setAccountModal({ isOpen: true, page: 'open-bets' });
        }}
        onOpenTheme={() => {
          setShowAccountDrawer(false);
          setThemeModalOpen(true);
        }}
        onSelectPage={(page) => {
          setShowAccountDrawer(false);
          setAccountModal({ isOpen: true, page });
        }}
      />

      {/* Account Management & Statements Center (All 10 Pages) */}
      <AccountPages 
        isOpen={accountModal.isOpen}
        initialPage={accountModal.page}
        onClose={() => setAccountModal({ isOpen: false, page: 'transactions' })}
        user={user}
        openBets={openBets}
        onCashoutBet={handleCashoutBet}
        onOpenDeposit={() => {
          setAccountModal(prev => ({ ...prev, isOpen: false }));
          setDepositModalOpen(true);
        }}
        onOpenWithdraw={() => {
          handleOpenWithdraw();
        }}
      />

      {/* Color Theme Switcher Modal */}
      <ThemeSwitcher 
        currentTheme={theme}
        onSelectTheme={(newTheme) => {
          setTheme(newTheme);
          setThemeModalOpen(false);
          showToast(`Theme updated to ${newTheme.toUpperCase()}`, 'success');
        }}
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />

      {/* Deposit Modal */}
      <DepositModal 
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        onSubmitDeposit={handleSubmitDeposit}
      />

      {/* Game Modal */}
      <GameModal 
        isOpen={gameModal.isOpen}
        onClose={() => setGameModal({ isOpen: false, game: null })}
        game={gameModal.game}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        activeTab={activeSport}
        onSelectTab={(tab) => {
          setActiveSport(tab);
          setSelectedMatch(null);
        }}
        slipCount={selections.length}
        onOpenMobileSlip={() => setShowMobileSlip(true)}
        onOpenAccount={() => setShowAccountDrawer(true)}
      />

      {/* Floating Theme Quick Switcher */}
      <ThemeFloatingToggle 
        currentTheme={theme}
        onOpenModal={() => setThemeModalOpen(true)}
        onNextTheme={handleCycleTheme}
      />
    </div>
  );
}
