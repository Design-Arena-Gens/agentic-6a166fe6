'use client';

import { FormEvent, useState } from 'react';
import { useAutomationStore } from '../store/useAutomationStore';
import { automationRequestSchema } from '../lib/schema';

export function RequestForm() {
  const { request, updateRequest, setPlan, setStatus, setError } = useAutomationStore();
  const [localAssets, setLocalAssets] = useState(request.assets.join('\n'));
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      ...request,
      assets: localAssets
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    const parsed = automationRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setError('Please complete required fields before generating the plan.');
      return;
    }

    setStatus('generating');
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) {
        throw new Error(`Agent returned status ${response.status}`);
      }

      const plan = await response.json();
      setPlan(plan);
    } catch (error) {
      console.error('Failed to generate plan', error);
      setError(
        error instanceof Error ? error.message : 'Unexpected error while generating automation plan.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="blur-card" style={{ padding: '1.8rem', display: 'grid', gap: '1.4rem' }}>
      <div>
        <span className="tag">Command Center</span>
        <h2 style={{ margin: '0.5rem 0 0', fontSize: '1.4rem', fontWeight: 600 }}>
          Describe your marketing organism
        </h2>
        <p style={{ margin: '0.45rem 0 0', color: 'rgba(148,163,184,0.82)', lineHeight: 1.5 }}>
          The agent designs autonomous playbooks from brand DNA, audiences, and operating constraints.
        </p>
      </div>
      <div className="grid-2">
        <TextField
          label="Brand / Venture Name"
          value={request.brandName}
          onChange={(value) => updateRequest('brandName', value)}
          required
        />
        <TextField
          label="Brand Voice"
          value={request.brandVoice}
          onChange={(value) => updateRequest('brandVoice', value)}
          required
        />
        <TextField
          label="Hero Product / Offer"
          value={request.product}
          onChange={(value) => updateRequest('product', value)}
          required
        />
        <TextField
          label="Primary Audience"
          value={request.primaryAudience}
          onChange={(value) => updateRequest('primaryAudience', value)}
          required
        />
        <TextField
          label="Unique Value Proposition"
          value={request.uniqueValue}
          onChange={(value) => updateRequest('uniqueValue', value)}
          required
        />
        <TextField
          label="Operating Constraints"
          value={request.constraints}
          onChange={(value) => updateRequest('constraints', value)}
          placeholder="Compliance, regulated industries, brand tone guardrails..."
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>
          Strategic Goals
        </label>
        <div style={{ marginTop: '0.7rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {goalOptions.map((goal) => {
            const selected = request.goals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                onClick={() => {
                  const nextGoals = selected
                    ? request.goals.filter((item) => item !== goal)
                    : [...request.goals, goal];
                  updateRequest('goals', nextGoals);
                }}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '999px',
                  border: selected ? '1px solid rgba(96,165,250,0.7)' : '1px solid rgba(148,163,184,0.35)',
                  background: selected ? 'rgba(59,130,246,0.18)' : 'rgba(13,17,23,0.55)',
                  color: selected ? '#e0f2fe' : 'rgba(148,163,184,0.85)',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid-2">
        <NumberField
          label="Monthly Budget ($)"
          value={request.monthlyBudget}
          onChange={(value) => updateRequest('monthlyBudget', value)}
          min={100}
          step={100}
        />
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>
            KPI Focus
          </label>
          <select
            value={request.kpiFocus}
            onChange={(event) => updateRequest('kpiFocus', event.target.value as typeof request.kpiFocus)}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.7rem 0.8rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(13,17,23,0.55)',
              color: '#f0f6fc'
            }}
          >
            <option value="revenue">Revenue</option>
            <option value="leads">Leads</option>
            <option value="traffic">Traffic</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>
        <NumberField
          label="Warm-up Period (weeks)"
          value={request.warmupPeriodWeeks}
          onChange={(value) => updateRequest('warmupPeriodWeeks', value)}
          min={1}
          max={12}
        />
        <NumberField
          label="Experimentation Budget (%)"
          value={request.experimentPercentage}
          onChange={(value) => updateRequest('experimentPercentage', value)}
          min={0}
          max={50}
        />
      </div>
      <div className="grid-2">
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>Core assets</label>
          <textarea
            value={localAssets}
            onChange={(event) => setLocalAssets(event.target.value)}
            rows={6}
            placeholder="Case studies, webinars, blogs, creative libraries..."
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.8rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(13,17,23,0.55)',
              color: '#f0f6fc',
              resize: 'vertical'
            }}
          />
        </div>
        <TextAreaField
          label="Marketing stack / integrations"
          value={request.marketingStack}
          onChange={(value) => updateRequest('marketingStack', value)}
          rows={6}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: '0.6rem',
          padding: '0.95rem 1.2rem',
          borderRadius: '12px',
          border: '1px solid rgba(96,165,250,0.45)',
          background: isSubmitting
            ? 'linear-gradient(90deg, rgba(59,130,246,0.35), rgba(37,99,235,0.2))'
            : 'linear-gradient(90deg, rgba(59,130,246,0.7), rgba(37,99,235,0.6))',
          color: '#f8fafc',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: isSubmitting ? 'progress' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem'
        }}
      >
        {isSubmitting ? 'Synthesizing agentic plan…' : 'Generate autonomous strategy'}
      </button>
    </form>
  );
}

const goalOptions = [
  'Pipeline velocity',
  'Demand creation',
  'Retention uplift',
  'Product adoption',
  'Community activation',
  'Category dominance',
  'Lead volume',
  'Revenue efficiency'
];

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

function TextField({ label, value, onChange, placeholder, required }: TextFieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>
        {label}
        {required && <span style={{ color: '#f87171' }}> *</span>}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          padding: '0.7rem 0.8rem',
          borderRadius: '12px',
          border: '1px solid rgba(148,163,184,0.35)',
          background: 'rgba(13,17,23,0.55)',
          color: '#f0f6fc'
        }}
      />
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function NumberField({ label, value, onChange, min, max, step }: NumberFieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          padding: '0.7rem 0.8rem',
          borderRadius: '12px',
          border: '1px solid rgba(148,163,184,0.35)',
          background: 'rgba(13,17,23,0.55)',
          color: '#f0f6fc'
        }}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

function TextAreaField({ label, value, onChange, rows = 4 }: TextAreaFieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)' }}>{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          padding: '0.8rem',
          borderRadius: '12px',
          border: '1px solid rgba(148,163,184,0.35)',
          background: 'rgba(13,17,23,0.55)',
          color: '#f0f6fc',
          resize: 'vertical'
        }}
      />
    </div>
  );
}
