'use client';

import { AutomationPlan } from '../lib/types';

interface Props {
  plan: AutomationPlan;
}

export function PlanOverview({ plan }: Props) {
  return (
    <div className="blur-card" style={{ padding: '1.75rem', display: 'grid', gap: '1.4rem' }}>
      <div>
        <span className="tag">Agent Verdict</span>
        <h2 style={{ margin: '0.55rem 0 0', fontSize: '1.35rem', fontWeight: 600 }}>Automation blueprint</h2>
        <p style={{ margin: '0.4rem 0 0', color: 'rgba(148,163,184,0.82)', lineHeight: 1.6 }}>{plan.summary}</p>
      </div>
      <div className="blur-card" style={{ padding: '1.3rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Positioning</h3>
        <p style={{ margin: '0.4rem 0 0', color: 'rgba(148,163,184,0.82)', lineHeight: 1.6 }}>
          {plan.positioningStatement}
        </p>
      </div>
      <div className="grid-2">
        <div className="blur-card" style={{ padding: '1.2rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Narrative hooks</h4>
          <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem', color: 'rgba(148,163,184,0.85)' }}>
            {plan.narrativeHooks.map((hook) => (
              <li key={hook} style={{ marginBottom: '0.55rem', lineHeight: 1.5 }}>
                {hook}
              </li>
            ))}
          </ul>
        </div>
        <div className="blur-card" style={{ padding: '1.2rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Activation moments</h4>
          <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem', color: 'rgba(148,163,184,0.85)' }}>
            {plan.activationMoments.map((moment) => (
              <li key={moment} style={{ marginBottom: '0.55rem', lineHeight: 1.5 }}>
                {moment}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="blur-card" style={{ padding: '1.2rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Observability spine</h4>
        <div className="grid-2" style={{ marginTop: '0.75rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
              Dashboards
            </p>
            <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', color: 'rgba(148,163,184,0.85)' }}>
              {plan.observability.dashboards.map((item) => (
                <li key={item} style={{ marginBottom: '0.45rem', lineHeight: 1.45 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
              Alerts & Success
            </p>
            <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', color: 'rgba(148,163,184,0.85)' }}>
              {[...plan.observability.alerts, ...plan.observability.successCriteria].map((item) => (
                <li key={item} style={{ marginBottom: '0.45rem', lineHeight: 1.45 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="blur-card" style={{ padding: '1.2rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Rollout control</h4>
        <p style={{ margin: '0.55rem 0 0', color: 'rgba(148,163,184,0.85)' }}>{plan.warmupStrategy}</p>
        <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem', color: 'rgba(148,163,184,0.85)' }}>
          {plan.escalationMatrix.map((item) => (
            <li key={item} style={{ marginBottom: '0.45rem', lineHeight: 1.45 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
