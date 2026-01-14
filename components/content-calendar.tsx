'use client';

import { ContentCalendarEntry } from '../lib/types';

interface Props {
  entries: ContentCalendarEntry[];
}

export function ContentCalendar({ entries }: Props) {
  return (
    <div className="blur-card" style={{ padding: '1.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="tag">Execution Timeline</span>
          <h3 style={{ margin: '0.45rem 0 0', fontSize: '1.2rem', fontWeight: 600 }}>
            Hyper-personalized calendar
          </h3>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.8)' }}>
          Next {entries.length} automation moments
        </div>
      </div>
      <div
        style={{
          marginTop: '1.2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem'
        }}
      >
        {entries.map((entry) => (
          <div
            key={`${entry.channel}-${entry.day}-${entry.theme}`}
            className="blur-card"
            style={{
              padding: '1.2rem',
              border: '1px solid rgba(148,163,184,0.16)',
              borderLeft: '3px solid rgba(59,130,246,0.45)',
              display: 'grid',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="channel-chip">{entry.channel.toUpperCase()}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(148,163,184,0.85)' }}>{entry.day}</span>
            </div>
            <div style={{ fontWeight: 600 }}>{entry.theme}</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>{entry.automation}</div>
            <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>Asset: {entry.asset}</div>
            <div style={{ fontSize: '0.78rem', color: '#fcd34d' }}>CTA: {entry.cta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
