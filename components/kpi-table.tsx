'use client';

import { KPIProjection } from '../lib/types';

interface Props {
  data: KPIProjection[];
}

export function KPITable({ data }: Props) {
  return (
    <div className="blur-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="tag">Revenue Intelligence</span>
          <h3 style={{ margin: '0.4rem 0 0', fontSize: '1.2rem', fontWeight: 600 }}>KPI projections</h3>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.8)' }}>
          Confidence weighted by channel automation & budget
        </div>
      </div>
      <div style={{ marginTop: '1.2rem', overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '560px'
          }}
        >
          <thead>
            <tr style={{ textAlign: 'left', fontSize: '0.82rem', color: 'rgba(148,163,184,0.85)' }}>
              <th style={{ padding: '0.7rem 0.6rem', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>Metric</th>
              <th style={{ padding: '0.7rem 0.6rem', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>Baseline</th>
              <th style={{ padding: '0.7rem 0.6rem', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>Target</th>
              <th style={{ padding: '0.7rem 0.6rem', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>Window</th>
              <th style={{ padding: '0.7rem 0.6rem', borderBottom: '1px solid rgba(148,163,184,0.25)' }}>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.metric} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                <td style={{ padding: '0.75rem 0.6rem', fontWeight: 500 }}>{row.metric}</td>
                <td style={{ padding: '0.75rem 0.6rem', color: '#38bdf8' }}>{row.baseline.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.6rem', color: '#4ade80' }}>{row.target.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.6rem', color: 'rgba(148,163,184,0.85)' }}>{row.timeframe}</td>
                <td style={{ padding: '0.75rem 0.6rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: 'rgba(59,130,246,0.18)',
                      border: '1px solid rgba(59,130,246,0.25)',
                      borderRadius: '999px',
                      padding: '0.25rem 0.7rem'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }} />
                    {(row.confidence * 100).toFixed(0)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
