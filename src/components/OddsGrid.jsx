import React from 'react';

const BADGE_META = {
  MO: { label: 'MO', title: 'Match Odds' },
  BM: { label: 'BM', title: 'Bookmaker' },
  F: { label: 'F', title: 'Fancy' },
  P: { label: 'P', title: 'Premium' }
};

function OddsCell({ value, vol, side, flash, onClick, disabled }) {
  const empty = value === '-' || value === null || value === undefined;
  return (
    <button
      type="button"
      className={`odds-cell ${side}-cell ${empty ? 'empty-cell' : ''} ${flash || ''}`}
      onClick={empty || disabled ? undefined : onClick}
      disabled={empty || disabled}
    >
      <span className="odds-val">{empty ? '–' : value}</span>
      {!empty && vol ? <span className="odds-vol">{vol}</span> : null}
    </button>
  );
}

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
    <div className="sport-sub-block classic-odds-block">
      <div className="sport-sub-header">
        <div className="ssh-title">
          <i className={`fa-solid ${icon} ${iconClass || ''}`}></i> {title}
        </div>
        <div className="ssh-actions">
          <button type="button" className="pill-btn">+ Live</button>
          <button type="button" className="pill-btn">+ Virtual</button>
          <button type="button" className="pill-btn">+ Premium</button>
        </div>
      </div>

      <div className="event-rows-list">
        {events.map(event => {
          const o1Back = event.odds.team1.back !== null ? event.odds.team1.back.toFixed(2) : '-';
          const o1Lay = event.odds.team1.lay !== null ? event.odds.team1.lay.toFixed(2) : '-';
          const oxBack = event.odds.draw.back !== null ? event.odds.draw.back.toFixed(2) : '-';
          const oxLay = event.odds.draw.lay !== null ? event.odds.draw.lay.toFixed(2) : '-';
          const o2Back = event.odds.team2.back !== null ? event.odds.team2.back.toFixed(2) : '-';
          const o2Lay = event.odds.team2.lay !== null ? event.odds.team2.lay.toFixed(2) : '-';

          const timeParts = (event.time || '').split(' ');
          const dayLabel = timeParts[0] || '';
          const timeLabel = timeParts.slice(1).join(' ');

          return (
            <div key={event.id} className="event-row classic-event-row">
              <div className="event-info-col">
                <div className="event-time-box">
                  <span className="time-day">{dayLabel}</span>
                  <span className="time-val">{timeLabel}</span>
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
                    {(event.badges || []).map(b => {
                      const meta = BADGE_META[b] || { label: b };
                      return (
                        <span
                          key={b}
                          className={`mkt-badge badge-${String(b).toLowerCase()}`}
                          title={meta.title || b}
                        >
                          {meta.label}
                        </span>
                      );
                    })}
                    {event.hasStream && (
                      <span className="mkt-badge badge-tv" title="Live Stream">
                        <i className="fa-solid fa-tv"></i>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="event-odds-grid">
                <div className="odds-pair">
                  <OddsCell
                    value={o1Back}
                    vol={event.odds.team1.backVol}
                    side="back"
                    flash={flashStates[`${event.id}-1-back`]}
                    onClick={() => onSelectOdds(event, event.team1, '1', 'BACK', event.odds.team1.back)}
                  />
                  <OddsCell
                    value={o1Lay}
                    vol={event.odds.team1.layVol}
                    side="lay"
                    flash={flashStates[`${event.id}-1-lay`]}
                    onClick={() => onSelectOdds(event, event.team1, '1', 'LAY', event.odds.team1.lay)}
                  />
                </div>
                <div className="odds-pair">
                  <OddsCell
                    value={oxBack}
                    vol={event.odds.draw.backVol}
                    side="back"
                    flash={flashStates[`${event.id}-x-back`]}
                    onClick={() => onSelectOdds(event, 'The Draw', 'X', 'BACK', event.odds.draw.back)}
                  />
                  <OddsCell
                    value={oxLay}
                    vol={event.odds.draw.layVol}
                    side="lay"
                    flash={flashStates[`${event.id}-x-lay`]}
                    onClick={() => onSelectOdds(event, 'The Draw', 'X', 'LAY', event.odds.draw.lay)}
                  />
                </div>
                <div className="odds-pair">
                  <OddsCell
                    value={o2Back}
                    vol={event.odds.team2.backVol}
                    side="back"
                    flash={flashStates[`${event.id}-2-back`]}
                    onClick={() => onSelectOdds(event, event.team2, '2', 'BACK', event.odds.team2.back)}
                  />
                  <OddsCell
                    value={o2Lay}
                    vol={event.odds.team2.layVol}
                    side="lay"
                    flash={flashStates[`${event.id}-2-lay`]}
                    onClick={() => onSelectOdds(event, event.team2, '2', 'LAY', event.odds.team2.lay)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
