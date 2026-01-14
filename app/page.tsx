'use client';

import { useAutomationStore } from '../store/useAutomationStore';
import { RequestForm } from '../components/request-form';
import { ChannelMatrix } from '../components/channel-matrix';
import { StatusBanner } from '../components/status-banner';
import { PlanOverview } from '../components/plan-overview';
import { KPITable } from '../components/kpi-table';
import { ContentCalendar } from '../components/content-calendar';
import { TaskBoard } from '../components/task-board';

export default function Home() {
  const { request, updateChannel, plan, status } = useAutomationStore();

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem', display: 'grid', gap: '2rem' }}>
      <header style={{ display: 'grid', gap: '1.1rem' }}>
        <div className="tag">Omniscient Marketing Agent</div>
        <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 700, lineHeight: 1.12 }}>
          Deploy an autonomous growth team that runs Meta, LinkedIn, Google, email & more for you.
        </h1>
        <p style={{ margin: 0, maxWidth: '760px', color: 'rgba(148,163,184,0.82)', fontSize: '1.07rem', lineHeight: 1.6 }}>
          Feed the agent your brand DNA and it orchestrates campaigns, content, ads, nurture, analytics, and
          guardrails—like a Meta Business Suite, LinkedIn scheduler, lifecycle engine and growth ops desk fused together.
        </p>
        <StatusBanner />
      </header>

      <RequestForm />

      <ChannelMatrix channels={request.channels} onUpdate={updateChannel} />

      {status === 'ready' && plan ? (
        <section style={{ display: 'grid', gap: '1.8rem' }}>
          <PlanOverview plan={plan} />
          <KPITable data={plan.kpiProjections} />
          <ContentCalendar entries={plan.contentCalendar} />
          <TaskBoard tasks={plan.taskBacklog} />
        </section>
      ) : null}
    </main>
  );
}
