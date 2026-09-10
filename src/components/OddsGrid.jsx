import React from 'react';

export default function OddsGrid({
  events,
  title,
  icon,
  iconClass,
  flashStates,
  onSelectOdds,
  onSelectEvent
}) {
  if (!events || events.length === 0) return null;

  return (
    <div className="sport-sub-block">
      <div className="sport-sub-header">
        <div className="ssh-title">
          <i className={`fa-solid ${icon} ${iconClass || ''}`}></i> {title}
        </div>
        <div className="ssh-actions">
          <button className="pill-btn active">+ Live</button>
          <button className="pill-btn">+ Virtual</button>
          <button className="pill-btn">+ Premium</button>
        </div>
      </div>

      <div className="event-rows-list">
        {events.map(event => {
          const o1Back = event.odds.team1.back !== null ? event.odds.team1.back.toFixed(2) : "-";
          const o1BackVol = event.odds.team1.backVol || "";
          const o1Lay = event.odds.team1.lay !== null ? event.odds.team1.lay.toFixed(2) : "-";
          const o1LayVol = event.odds.team1.layVol || "";

          const oxBack = event.odds.draw.back !== null ? event.odds.draw.back.toFixed(2) : "-";
          const oxBackVol = event.odds.draw.backVol || "";
          const oxLay = event.odds.draw.lay !== null ? event.odds.draw.lay.toFixed(2) : "-";
          const oxLayVol = event.odds.draw.layVol || "";

          const o2Back = event.odds.team2.back !== null ? event.odds.team2.back.toFixed(2) : "-";
          const o2BackVol = event.odds.team2.backVol || "";
          const o2Lay = event.odds.team2.lay !== null ? event.odds.team2.lay.toFixed(2) : "-";
          const o2LayVol = event.odds.team2.layVol || "";

          // Check flash animation states
          const f1Back = flashStates[`${event.id}-1-back`] || '';
          const f1Lay = flashStates[`${event.id}-1-lay`] || '';
          const fxBack = flashStates[`${event.id}-x-back`] || '';
          const fxLay = flashStates[`${event.id}-x-lay`] || '';
          const f2Back = flashStates[`${event.id}-2-back`] || '';
          const f2Lay = flashStates[`${event.id}-2-lay`] || '';

          return (
            <div key={event.id} className="event-row">
              <div className="event-info-col">
                <div className="event-time-box">
                  <span className="time-day">{event.time.split(" ")[0]}</span>
                  <span className="time-val">{event.time.split(" ").slice(1).join(" ")}</span>
                  {event.isLive && (
                    <span className="live-tag-pill">
                      <span className="live-dot-mini"></span> LIVE
                    </span>
                  )}
                </div>

                <div className="event-name-details">
                  <div className="team-row" onClick={() => onSelectEvent(event)}>
                    <span>{event.team1}</span>
                  </div>
                  <div className="team-row" onClick={() => onSelectEvent(event)}>
                    <span>{event.team2}</span>
                  </div>
                  <div className="event-market-badges">
                    {event.badges.map(b => (
                      <span key={b} className={`badge-pill badge-${b.toLowerCase()}`}>
                        {b}
                      </span>
                    ))}
                    {event.hasStream && (
                      <i className="fa-solid fa-tv stream-icon" title="Live Video Streaming Available"></i>
                    )}
                  </div>
                </div>
              </div>

              <div className="event-odds-grid">
                {/* 1 Home */}
                <div className="odds-pair">
                  <button 
                    className={`odds-cell back-cell ${o1Back === '-' ? 'empty-cell' : ''} ${f1Back}`}
                    onClick={() => onSelectOdds(event, event.team1, '1', 'BACK', event.odds.team1.back)}
                  >
                    <span className="odds-val">{o1Back}</span>
                    <span className="odds-vol">{o1BackVol}</span>
                  </button>
                  <button 
                    className={`odds-cell lay-cell ${o1Lay === '-' ? 'empty-cell' : ''} ${f1Lay}`}
                    onClick={() => onSelectOdds(event, event.team1, '1', 'LAY', event.odds.team1.lay)}
                  >
                    <span className="odds-val">{o1Lay}</span>
                    <span className="odds-vol">{o1LayVol}</span>
                  </button>
                </div>

                {/* X Draw */}
                <div className="odds-pair">
                  <button 
                    className={`odds-cell back-cell ${oxBack === '-' ? 'empty-cell' : ''} ${fxBack}`}
                    onClick={() => onSelectOdds(event, 'The Draw', 'X', 'BACK', event.odds.draw.back)}
                  >
                    <span className="odds-val">{oxBack}</span>
                    <span className="odds-vol">{oxBackVol}</span>
                  </button>
                  <button 
                    className={`odds-cell lay-cell ${oxLay === '-' ? 'empty-cell' : ''} ${fxLay}`}
                    onClick={() => onSelectOdds(event, 'The Draw', 'X', 'LAY', event.odds.draw.lay)}
                  >
                    <span className="odds-val">{oxLay}</span>
                    <span className="odds-vol">{oxLayVol}</span>
                  </button>
                </div>

                {/* 2 Away */}
                <div className="odds-pair">
                  <button 
                    className={`odds-cell back-cell ${o2Back === '-' ? 'empty-cell' : ''} ${f2Back}`}
                    onClick={() => onSelectOdds(event, event.team2, '2', 'BACK', event.odds.team2.back)}
                  >
                    <span className="odds-val">{o2Back}</span>
                    <span className="odds-vol">{o2BackVol}</span>
                  </button>
                  <button 
                    className={`odds-cell lay-cell ${o2Lay === '-' ? 'empty-cell' : ''} ${f2Lay}`}
                    onClick={() => onSelectOdds(event, event.team2, '2', 'LAY', event.odds.team2.lay)}
                  >
                    <span className="odds-val">{o2Lay}</span>
                    <span className="odds-vol">{o2LayVol}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
