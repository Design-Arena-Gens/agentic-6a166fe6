'use client';

import { useAutomationStore } from '../store/useAutomationStore';

export function StatusBanner() {
  const { status, error } = useAutomationStore();

  if (status === 'idle' && !error) {
    return (
      <div
        className="blur-card"
        style={{
          padding: '1.1rem 1.4rem',
          borderLeft: '3px solid rgba(59,130,246,0.65)',
          color: 'rgba(148,163,184,0.85)',
          fontSize: '0.88rem'
        }}
      >
        Plug in brand intel, tune the channels, then let the agent birth your omnichannel machine.
      </div>
    );
  }

  if (status === 'generating') {
    return (
      <div
        className="blur-card"
        style={{
          padding: '1.1rem 1.4rem',
          borderLeft: '3px solid rgba(59,130,246,0.65)',
          color: '#bfdbfe',
          fontSize: '0.88rem'
        }}
      >
        Synthesizing plan, stitching automations, aligning guardrails… hold tight.
      </div>
    );
  }

  if (status === 'error' && error) {
    return (
      <div
        className="blur-card"
        style={{
          padding: '1.1rem 1.4rem',
          borderLeft: '3px solid rgba(239,68,68,0.65)',
          color: '#fecaca',
          fontSize: '0.88rem'
        }}
      >
        {error}
      </div>
    );
  }

  return null;
}
