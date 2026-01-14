'use client';

import { create } from 'zustand';
import { AutomationPlan, AutomationRequest, ChannelConfig } from '../lib/types';

export type AutomationStatus = 'idle' | 'generating' | 'ready' | 'error';

interface AutomationState {
  request: AutomationRequest;
  plan: AutomationPlan | null;
  status: AutomationStatus;
  error: string | null;
  updateRequest: <K extends keyof AutomationRequest>(key: K, value: AutomationRequest[K]) => void;
  updateChannel: (slug: ChannelConfig['slug'], update: Partial<ChannelConfig>) => void;
  setPlan: (plan: AutomationPlan) => void;
  setStatus: (status: AutomationStatus) => void;
  setError: (error: string | null) => void;
}

const defaultChannels: ChannelConfig[] = [
  {
    slug: 'meta',
    name: 'Meta Suite',
    enabled: true,
    budgetSplit: 28,
    cadence: 'daily',
    automationLevel: 'autopilot'
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn',
    enabled: true,
    budgetSplit: 22,
    cadence: 'daily',
    automationLevel: 'copilot'
  },
  {
    slug: 'google',
    name: 'Google Ads',
    enabled: true,
    budgetSplit: 18,
    cadence: 'weekly',
    automationLevel: 'autopilot'
  },
  {
    slug: 'email',
    name: 'Lifecycle Email',
    enabled: true,
    budgetSplit: 14,
    cadence: 'weekly',
    automationLevel: 'autopilot'
  },
  {
    slug: 'seo',
    name: 'SEO',
    enabled: false,
    budgetSplit: 8,
    cadence: 'weekly',
    automationLevel: 'assist'
  },
  {
    slug: 'tiktok',
    name: 'TikTok',
    enabled: false,
    budgetSplit: 4,
    cadence: 'daily',
    automationLevel: 'assist'
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    enabled: false,
    budgetSplit: 4,
    cadence: 'weekly',
    automationLevel: 'assist'
  },
  {
    slug: 'x',
    name: 'X (Twitter)',
    enabled: false,
    budgetSplit: 2,
    cadence: 'daily',
    automationLevel: 'assist'
  }
];

const defaultRequest: AutomationRequest = {
  brandName: 'NovaFusion',
  brandVoice: 'Confident, visionary, data-backed',
  product: 'AI-powered marketing OS for high-growth SaaS',
  primaryAudience: 'B2B revenue leaders scaling from Series A to Series C',
  uniqueValue: 'Full-funnel autonomation with provable ROI & human-in-the-loop controls',
  goals: ['Pipeline velocity', 'Demand creation', 'Retention uplift'],
  channels: defaultChannels,
  monthlyBudget: 25000,
  kpiFocus: 'revenue',
  warmupPeriodWeeks: 3,
  experimentPercentage: 18,
  assets: ['Case study repository', 'Product onboarding videos', 'Founders narrative'],
  marketingStack: 'HubSpot CRM, Marketo, Salesforce, Webflow, Ads Manager, GA4',
  constraints: 'Respect regulated industries compliance & maintain brand guardianship'
};

export const useAutomationStore = create<AutomationState>((set) => ({
  request: defaultRequest,
  plan: null,
  status: 'idle',
  error: null,
  updateRequest: (key, value) =>
    set((state) => ({
      request: { ...state.request, [key]: value }
    })),
  updateChannel: (slug, update) =>
    set((state) => ({
      request: {
        ...state.request,
        channels: state.request.channels.map((channel) =>
          channel.slug === slug ? { ...channel, ...update } : channel
        )
      }
    })),
  setPlan: (plan) => set({ plan, status: 'ready', error: null }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'error' })
}));
