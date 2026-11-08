import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export interface TechTool {
  id: string;
  name: string;
  cat: string;
  brandColor: string;
  icon: React.ReactNode;
}

export const allTechTools: TechTool[] = [
  {
    id: 'apollo',
    name: 'Apollo.io',
    cat: 'Lead Sourcing',
    brandColor: '#F97316',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Apollo.io logo">
        <rect width="48" height="48" rx="12" fill="#0F172A" />
        <path fill="#F97316" d="M24 9l10.5 24h-5.6l-2.3-5.8h-5.2L19.1 33h-5.6L24 9zm-1.2 13.8h2.4l-1.2-3.3-1.2 3.3z" />
        <circle cx="34" cy="13" r="3.2" fill="#FBBF24" />
        <path d="M37 28c4-4 4-11-1-15" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
      </svg>
    )
  },
  {
    id: 'hunter',
    name: 'Hunter.io',
    cat: 'Deliverability',
    brandColor: '#FF5722',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Hunter.io logo">
        <rect width="48" height="48" rx="12" fill="#FF5722" />
        <path fill="#FFFFFF" d="M15 14h6.5v8h5v-8H33v20h-6.5v-8h-5v8H15V14z" />
        <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    cat: 'Spend Intel',
    brandColor: '#0668E1',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Meta Ads logo">
        <rect width="48" height="48" rx="12" fill="#0668E1" />
        <path fill="#FFFFFF" d="M32 16c-2.8 0-5.3 1.6-6.6 4-1.3-2.4-3.8-4-6.6-4-4.4 0-8 3.6-8 8s3.6 8 8 8c3.1 0 5.8-1.8 7-4.4l-2.7-1.5c-.8 1.7-2.5 2.8-4.3 2.8-2.7 0-5-2.2-5-5s2.3-5 5-5c2 0 3.6 1.1 4.5 2.9l3 6h3.4l3-6c.9-1.8 2.5-2.9 4.5-2.9 2.7 0 5 2.2 5 5s-2.3 5-5 5c-1.8 0-3.5-1.1-4.3-2.8l-2.7 1.5c1.2 2.6 3.9 4.4 7 4.4 4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
      </svg>
    )
  },
  {
    id: 'gmail',
    name: 'Gmail',
    cat: 'Inbox Triage',
    brandColor: '#EA4335',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Gmail logo">
        <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="rgba(26,17,13,0.12)" strokeWidth="1" />
        <path fill="#4285F4" d="M12 37V19l12 9 12-9v18c0 1.1-.9 2-2 2H14c-1.1 0-2-.9-2-2z" />
        <path fill="#34A853" d="M34 11h2c1.1 0 2 .9 2 2v24h-4V11z" />
        <path fill="#EA4335" d="M36 13L24 22 12 13V12c0-1.7 1.9-2.7 3.3-1.7L24 17l8.7-6.7c1.4-1 3.3 0 3.3 1.7v1z" />
        <path fill="#FBBC04" d="M12 11h-2c-1.1 0-2 .9-2 2v24h4V11z" />
      </svg>
    )
  },
  {
    id: 'calendly',
    name: 'Calendly',
    cat: 'Scheduling',
    brandColor: '#006BFF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Calendly logo">
        <rect width="48" height="48" rx="12" fill="#006BFF" />
        <path fill="#FFFFFF" d="M24 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18.5c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5c1.8 0 3.4.7 4.6 1.9l-2 2c-.7-.7-1.6-1.1-2.6-1.1-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7c1 0 1.9-.4 2.6-1.1l2 2c-1.2 1.2-2.8 1.9-4.6 1.9z" />
      </svg>
    )
  },
  {
    id: 'zoom',
    name: 'Zoom',
    cat: 'Partner Calls',
    brandColor: '#2D8CFF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Zoom logo">
        <rect width="48" height="48" rx="12" fill="#2D8CFF" />
        <path fill="#FFFFFF" d="M13 17c0-1.7 1.3-3 3-3h12c1.7 0 3 1.3 3 3v14c0 1.7-1.3 3-3 3H16c-1.7 0-3-1.3-3-3V17zm20 3.8l6-4.2v14.8l-6-4.2V20.8z" />
      </svg>
    )
  },
  {
    id: 'slack',
    name: 'Slack',
    cat: 'Direct Comms',
    brandColor: '#E01E5A',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Slack logo">
        <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="rgba(26,17,13,0.12)" strokeWidth="1" />
        <path fill="#E01E5A" d="M18 20.5a2.5 2.5 0 0 1-2.5-2.5v-5a2.5 2.5 0 0 1 5 0v5a2.5 2.5 0 0 1-2.5 2.5zm0 1.5a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1 0-5h5a2.5 2.5 0 0 1 2.5 2.5z" />
        <path fill="#36C5F0" d="M27.5 18a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 0 5h-5A2.5 2.5 0 0 1 27.5 18zm-1.5 0a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 2.5-2.5z" />
        <path fill="#2EB67D" d="M30 27.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 2.5-2.5zm0-1.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 0 5h-5A2.5 2.5 0 0 1 30 26z" />
        <path fill="#ECB22E" d="M20.5 30a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1 0-5h5a2.5 2.5 0 0 1 2.5 2.5zm1.5 0a2.5 2.5 0 0 1-2.5-2.5v-5a2.5 2.5 0 0 1 5 0v5a2.5 2.5 0 0 1-2.5 2.5z" />
      </svg>
    )
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    cat: 'Contract Redlines',
    brandColor: '#4285F4',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Google Docs logo">
        <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="rgba(26,17,13,0.12)" strokeWidth="1" />
        <path fill="#4285F4" d="M30 6H14c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V16l-8-10z" />
        <path fill="#A1C2FA" d="M30 6v10h10" />
        <path fill="#FFFFFF" d="M16 22h16v2.5H16zm0 6h16v2.5H16zm0 6h10v2.5H16z" />
      </svg>
    )
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    cat: 'Live Pipeline',
    brandColor: '#0F9D58',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Google Sheets logo">
        <rect width="48" height="48" rx="12" fill="#FFFFFF" stroke="rgba(26,17,13,0.12)" strokeWidth="1" />
        <path fill="#0F9D58" d="M30 6H14c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V16l-8-10z" />
        <path fill="#87CEAC" d="M30 6v10h10" />
        <path fill="#FFFFFF" d="M16 20h16v16H16z" />
        <path fill="#0F9D58" d="M18 22h12v3H18zm0 5h12v3H18zm0 5h12v3H18z" />
        <path fill="#0F9D58" d="M23 20h2v16h-2z" />
      </svg>
    )
  },
  {
    id: 'excel',
    name: 'Excel',
    cat: 'Financial Models',
    brandColor: '#107C41',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Microsoft Excel logo">
        <rect width="48" height="48" rx="12" fill="#107C41" />
        <path fill="#33C481" d="M28 6v12h12" />
        <path fill="#185C37" d="M6 14h20v20H6z" />
        <path fill="#FFFFFF" d="M11.5 19.5l3 4.5-3 4.5h2.5l1.8-3 1.8 3h2.4l-3-4.5 3-4.5h-2.4l-1.8 3-1.8-3z" />
      </svg>
    )
  },
  {
    id: 'notion',
    name: 'Notion',
    cat: 'Central Hub',
    brandColor: '#000000',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Notion logo">
        <rect width="48" height="48" rx="12" fill="#000000" />
        <path fill="#FFFFFF" d="M13.5 13.5l14.2-2.5 6.3 1.5v22l-14.2 2.5-6.3-1.5v-22zm5.2 4.5v12.8l2.2.5V21l6.8 9.8 2.5.5V18.5l-2.2-.5v10l-6.8-9.8-2.5-.5z" />
      </svg>
    )
  },
  {
    id: 'trello',
    name: 'Trello',
    cat: 'Sprint Boards',
    brandColor: '#0079BF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Trello logo">
        <rect width="48" height="48" rx="12" fill="#0079BF" />
        <rect x="13" y="13" width="9.5" height="22" rx="2.5" fill="#FFFFFF" />
        <rect x="25.5" y="13" width="9.5" height="15" rx="2.5" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'canva',
    name: 'Canva',
    cat: 'Media Kits',
    brandColor: '#7D2AE8',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Canva logo">
        <defs>
          <linearGradient id="canvaOpt1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#canvaOpt1)" />
        <path fill="#FFFFFF" d="M26.5 15.5c-5 0-9 3.6-9 8.5s4 8.5 9 8.5c3 0 5.4-1.2 7-3l-2.4-2.3c-1.2 1.3-2.8 2.1-4.6 2.1-3.2 0-5.7-2.3-5.7-5.3s2.5-5.3 5.7-5.3c1.8 0 3.4.8 4.6 2.1l2.4-2.3c-1.6-1.8-4-3-7-3z" />
      </svg>
    )
  },
  {
    id: 'capcut',
    name: 'CapCut',
    cat: 'Hook Audits',
    brandColor: '#00E5FF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="CapCut logo">
        <rect width="48" height="48" rx="12" fill="#000000" />
        <path fill="#FFFFFF" d="M12 15h12l-5 8h-7zm12 0h12l-5 8h-7z" />
        <path fill="#00E5FF" d="M12 33h12l-5-8h-7zm12 0h12l-5-8h-7z" />
      </svg>
    )
  },
  {
    id: 'buffer',
    name: 'Buffer',
    cat: 'Distribution',
    brandColor: '#231F20',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="Buffer logo">
        <rect width="48" height="48" rx="12" fill="#231F20" />
        <path fill="#FFFFFF" d="M24 12l-11 5.5 11 5.5 11-5.5L24 12zm-11 9.5l11 5.5 11-5.5v3.2l-11 5.5-11-5.5V21.5zm0 7.5l11 5.5 11-5.5v3.2l-11 5.5-11-5.5V29z" />
      </svg>
    )
  },
  {
    id: 'lastpass',
    name: 'LastPass',
    cat: 'Safe Vault',
    brandColor: '#D32D27',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-label="LastPass logo">
        <rect width="48" height="48" rx="12" fill="#D32D27" />
        <circle cx="15" cy="24" r="3.5" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
        <circle cx="33" cy="24" r="3.5" fill="#FFFFFF" />
        <rect x="38" y="15" width="2.8" height="18" rx="1.4" fill="#FFFFFF" />
      </svg>
    )
  }
];

interface WorkflowPhase {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  benchmark: string;
  tools: { name: string; icon: React.ReactNode }[];
}

const workflowPhases: WorkflowPhase[] = [
  {
    number: '01',
    title: 'Lead Sourcing & PR',
    subtitle: 'Verified Brand Prospecting',
    summary: 'Querying enterprise databases to pinpoint direct corporate contacts for brand partnerships and PR directors with active UGC budgets.',
    benchmark: '35–70+ weekly verified pitches',
    tools: [
      { name: 'Apollo.io', icon: allTechTools[0].icon },
      { name: 'Hunter.io', icon: allTechTools[1].icon },
      { name: 'Meta Ads', icon: allTechTools[2].icon }
    ]
  },
  {
    number: '02',
    title: 'Inbound Triage & Syncs',
    subtitle: 'Executive Inbox Zero',
    summary: 'Continuous monitoring of your creator business email. We filter low-ball spam, escalate lucrative sponsor deals, and book strategy calls.',
    benchmark: '< 2-hour response turnaround',
    tools: [
      { name: 'Gmail', icon: allTechTools[3].icon },
      { name: 'Calendly', icon: allTechTools[4].icon },
      { name: 'Zoom', icon: allTechTools[5].icon },
      { name: 'Slack', icon: allTechTools[6].icon }
    ]
  },
  {
    number: '03',
    title: 'Deal Defense & P&L',
    subtitle: 'Contract & Rate Modeling',
    summary: 'Every contract is stripped and scrutinized. Cathy redlines perpetual licensing traps, caps exclusivity, and structures compliant invoicing.',
    benchmark: 'Accountant-grade terms audit',
    tools: [
      { name: 'Google Docs', icon: allTechTools[7].icon },
      { name: 'Google Sheets', icon: allTechTools[8].icon },
      { name: 'Excel', icon: allTechTools[9].icon }
    ]
  },
  {
    number: '04',
    title: 'Delivery & Vault',
    subtitle: 'Production & Zero Leakage',
    summary: 'Dedicated Notion operating portals, Kanban sprint staging, video hook compliance, and encrypted credential vaults with zero password exposure.',
    benchmark: 'Zero creator credential exposure',
    tools: [
      { name: 'Notion', icon: allTechTools[10].icon },
      { name: 'Trello', icon: allTechTools[11].icon },
      { name: 'Canva', icon: allTechTools[12].icon },
      { name: 'LastPass', icon: allTechTools[15].icon }
    ]
  }
];

export const TechAutomationSection: React.FC = () => {
  return (
    <section id="workflows" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] relative overflow-hidden border-b border-[rgba(26,17,13,0.12)]">
      {/* Subtle ambient blur glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#9EC8ED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-[#EF516F]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF516F]/10 border border-[#EF516F]/30 text-xs font-semibold text-[#1A110D] mb-4 shadow-2xs">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/20">
              <Sparkles className="w-2.5 h-2.5 text-[#EF516F]" />
            </span>
            <span className="lowercase tracking-wider">quiet backend operations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight leading-tight">
            tech &amp; <span className="font-editorial-italic font-semibold text-[#EF516F]">automation stack</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
            Operating quietly behind the scenes. We integrate 16 modern enterprise systems into a seamless 4-phase backend that keeps your business booked, protected, and paid.
          </p>
        </div>

        {/* Clean 4-Phase Operational Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {workflowPhases.map((phase) => (
            <div
              key={phase.number}
              className="card-lift bg-white rounded-[22px] p-6 border border-[rgba(26,17,13,0.1)] shadow-sm hover:border-[#EF516F] flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Phase Number & Tool Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono-numbers font-bold text-[#EF516F] bg-[#EF516F]/10 px-2.5 py-1 rounded-lg">
                    PHASE {phase.number}
                  </span>
                  
                  {/* Mini Tool Avatar Stack */}
                  <div className="flex items-center -space-x-1.5">
                    {phase.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="w-6 h-6 rounded-md bg-white border border-[rgba(26,17,13,0.1)] p-0.5 shadow-2xs"
                        title={tool.name}
                      >
                        {tool.icon}
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-[#1A110D] font-heading tracking-tight mb-1">
                  {phase.title}
                </h3>
                <p className="text-xs font-semibold text-[#4A3B35]/80 lowercase tracking-wide mb-3">
                  {phase.subtitle}
                </p>

                <p className="text-xs text-[#4A3B35] leading-relaxed font-normal mb-6">
                  {phase.summary}
                </p>
              </div>

              {/* Benchmark Pill */}
              <div className="pt-3 border-t border-[rgba(26,17,13,0.08)] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EF516F] shrink-0" />
                <span className="text-[11px] font-semibold text-[#1A110D] tracking-tight">
                  {phase.benchmark}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Animated Moving Marquee Stream ("liked moving") */}
        <div className="relative pt-2">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#4A3B35]/80 lowercase inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#EF516F]" />
              <span>16 connected systems running 24/7 (hover to pause stream):</span>
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-[rgba(26,17,13,0.08)] shadow-xs">
            {/* Smooth Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5F0ED] via-[#F5F0ED]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5F0ED] via-[#F5F0ED]/80 to-transparent z-10 pointer-events-none" />

            {/* Smooth Infinite Marquee Stream */}
            <div className="animate-marquee-smooth flex items-center gap-4 py-2 px-4">
              {[...allTechTools, ...allTechTools, ...allTechTools].map((tool, idx) => (
                <div
                  key={`${tool.id}-${idx}`}
                  className="shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[rgba(26,17,13,0.08)] hover:border-[#EF516F] hover:shadow-md hover:scale-105 transition-all duration-300 shadow-2xs group cursor-default"
                >
                  <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-[#1A110D] group-hover:text-[#EF516F] transition-colors whitespace-nowrap">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-[#4A3B35]/70 uppercase tracking-wider font-medium whitespace-nowrap">
                      {tool.cat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechAutomationSection;
