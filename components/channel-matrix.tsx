'use client';

import { ElementType, Fragment } from 'react';
import {
  BoltIcon,
  CursorArrowRaysIcon,
  EnvelopeIcon,
  GlobeAsiaAustraliaIcon,
  MegaphoneIcon,
  PlayCircleIcon,
  SparklesIcon,
  Square2StackIcon
} from '@heroicons/react/24/outline';
import { ChannelConfig } from '../lib/types';

const channelIconMap: Record<ChannelConfig['slug'], { icon: ElementType; accent: string }> = {
  meta: { icon: MegaphoneIcon, accent: 'rgba(59,130,246,0.2)' },
  linkedin: { icon: Square2StackIcon, accent: 'rgba(37,99,235,0.2)' },
  google: { icon: GlobeAsiaAustraliaIcon, accent: 'rgba(255,159,10,0.2)' },
  email: { icon: EnvelopeIcon, accent: 'rgba(16,185,129,0.22)' },
  seo: { icon: SparklesIcon, accent: 'rgba(249,115,22,0.2)' },
  tiktok: { icon: PlayCircleIcon, accent: 'rgba(236,72,153,0.2)' },
  youtube: { icon: CursorArrowRaysIcon, accent: 'rgba(220,38,38,0.22)' },
  x: { icon: BoltIcon, accent: 'rgba(148,163,184,0.22)' }
};

interface Props {
  channels: ChannelConfig[];
  onUpdate: (slug: ChannelConfig['slug'], update: Partial<ChannelConfig>) => void;
}

export function ChannelMatrix({ channels, onUpdate }: Props) {
  return (
    <div className="blur-card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="tag">Channel Orchestration</span>
          <h2 style={{ margin: '0.45rem 0 0.2rem', fontSize: '1.4rem', fontWeight: 600 }}>
            Activate capability stack
          </h2>
          <p style={{ margin: 0, color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.9rem' }}>
            Toggle channels, automation depth, and budget splits. Agent resolves conflicts
            automatically.
          </p>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(148, 163, 184, 0.8)' }}>
          Budget coverage: {channels.filter((c) => c.enabled).reduce((acc, c) => acc + c.budgetSplit, 0)}
          %
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1.1rem' }}>
        {channels.map((channel) => {
          const { icon: Icon, accent } = channelIconMap[channel.slug];
          return (
            <Fragment key={channel.slug}>
              <div
                className="blur-card"
                style={{
                  borderRadius: '16px',
                  padding: '1.35rem',
                  borderColor: channel.enabled ? 'rgba(59, 130, 246, 0.4)' : undefined,
                  background: channel.enabled
                    ? 'linear-gradient(120deg, rgba(59,130,246,0.18), rgba(13,17,23,0.85))'
                    : 'rgba(13,17,23,0.6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: accent,
                        display: 'grid',
                        placeItems: 'center'
                      }}
                    >
                      <Icon style={{ width: '22px', height: '22px', color: '#dbeafe' }} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{channel.name}</h3>
                      <p style={{ margin: '0.25rem 0 0', color: 'rgba(148, 163, 184, 0.8)', fontSize: '0.85rem' }}>
                        Automation: {channel.automationLevel.toUpperCase()} • Cadence:{' '}
                        {channel.cadence.charAt(0).toUpperCase() + channel.cadence.slice(1)}
                      </p>
                    </div>
                  </div>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.82rem'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={channel.enabled}
                      onChange={(event) => onUpdate(channel.slug, { enabled: event.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    Enabled
                  </label>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.1rem'
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.82 }}>Automation level</label>
                    <select
                      value={channel.automationLevel}
                      onChange={(event) =>
                        onUpdate(channel.slug, {
                          automationLevel: event.target.value as ChannelConfig['automationLevel']
                        })
                      }
                      style={{
                        width: '100%',
                        marginTop: '0.35rem',
                        padding: '0.6rem 0.7rem',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#f0f6fc',
                        borderRadius: '10px',
                        border: '1px solid rgba(148,163,184,0.35)'
                      }}
                    >
                      <option value="assist">Assist</option>
                      <option value="copilot">Copilot</option>
                      <option value="autopilot">Autopilot</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.82 }}>Cadence</label>
                    <select
                      value={channel.cadence}
                      onChange={(event) =>
                        onUpdate(channel.slug, {
                          cadence: event.target.value as ChannelConfig['cadence']
                        })
                      }
                      style={{
                        width: '100%',
                        marginTop: '0.35rem',
                        padding: '0.6rem 0.7rem',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#f0f6fc',
                        borderRadius: '10px',
                        border: '1px solid rgba(148,163,184,0.35)'
                      }}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Biweekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.82 }}>
                      Budget allocation (%)
                    </label>
                    <input
                      type="number"
                      value={channel.budgetSplit}
                      min={0}
                      max={100}
                      onChange={(event) =>
                        onUpdate(channel.slug, { budgetSplit: Number(event.target.value) })
                      }
                      style={{
                        width: '100%',
                        marginTop: '0.35rem',
                        padding: '0.6rem 0.7rem',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#f0f6fc',
                        borderRadius: '10px',
                        border: '1px solid rgba(148,163,184,0.35)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
