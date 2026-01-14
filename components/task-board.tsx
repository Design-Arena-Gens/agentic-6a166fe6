'use client';

import { GeneratedTask } from '../lib/types';

const badgeClass: Record<GeneratedTask['impact'], string> = {
  high: 'badge-success',
  medium: 'badge-warning',
  low: 'badge-danger'
};

interface Props {
  tasks: GeneratedTask[];
}

export function TaskBoard({ tasks }: Props) {
  return (
    <div className="blur-card" style={{ padding: '1.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="tag">Agent Backlog</span>
          <h3 style={{ margin: '0.4rem 0 0', fontSize: '1.2rem', fontWeight: 600 }}>Operational queue</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem', fontSize: '0.82rem', color: 'rgba(148,163,184,0.78)' }}>
          <span>Queued: {tasks.filter((task) => task.status === 'queued').length}</span>
          <span>Running: {tasks.filter((task) => task.status === 'running').length}</span>
          <span>Completed: {tasks.filter((task) => task.status === 'completed').length}</span>
        </div>
      </div>
      <div style={{ marginTop: '1.2rem', display: 'grid', gap: '1rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="blur-card"
            style={{
              padding: '1.2rem',
              border: '1px solid rgba(148,163,184,0.16)',
              borderLeft:
                task.status === 'completed'
                  ? '3px solid rgba(16,185,129,0.65)'
                  : task.status === 'running'
                  ? '3px solid rgba(59,130,246,0.65)'
                  : '3px solid rgba(148,163,184,0.35)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: '1.02rem' }}>{task.title}</div>
              <span className={`channel-chip ${badgeClass[task.impact]}`}>{task.impact.toUpperCase()}</span>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'rgba(148,163,184,0.85)' }}>
              {task.description}
            </div>
            <div
              style={{
                marginTop: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.6rem', color: 'rgba(148,163,184,0.75)' }}>
                <span className="channel-chip">{task.channel.toUpperCase()}</span>
                <span>Owner: {task.owner === 'agent' ? 'Agent' : 'Human partner'}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', color: 'rgba(148,163,184,0.75)' }}>
                <span>Status: {task.status}</span>
                <span>ETA: {task.etaHours}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
