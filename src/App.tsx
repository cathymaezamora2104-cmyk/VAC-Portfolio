import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Mail,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  Users,
  Compass,
  FileCheck,
  Send,
  Zap,
  TrendingUp,
  FileText,
  Clock,
  Menu,
  X,
  Check,
  ExternalLink,
  Lock,
  Workflow,
  Instagram,
  Linkedin
} from 'lucide-react';
import { TechAutomationSection } from './components/TechAutomationSection';
import { BrandLogo } from './components/BrandLogo';
import { ReviewsBentoSection } from './components/ReviewsBentoSection';

const IosEmoji = ({
  name,
  alt,
  className = "w-4 h-4"
}: {
  name: 'sparkles' | 'handshake' | 'briefcase' | 'white-heart' | 'rocket' | 'love-letter';
  alt: string;
  className?: string;
}) => (
  <img
    src={`/assets/emojis/apple/${name}.png`}
    alt={alt}
    className={`inline-block object-contain select-none pointer-events-none align-middle ${className}`}
    loading="eager"
    draggable={false}
  />
);

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'expertise', label: 'expertise' },
  { id: 'team', label: 'team' },
  { id: 'roster', label: 'collaborations' },
  { id: 'calculator', label: 'calculator' },
  { id: 'workflows', label: 'workflows' },
  { id: 'services', label: 'services' },
  { id: 'case-studies', label: 'case studies' },
  { id: 'reviews', label: 'reviews' },
  { id: 'credentials', label: 'credentials' }
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState<number | null>(0);

  // Track window scroll progress and active section scrollspy
  useEffect(() => {
    const sectionIds = [
      'about',
      'expertise',
      'team',
      'roster',
      'calculator',
      'workflows',
      'services',
      'case-studies',
      'reviews',
      'credentials'
    ];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Collaborations Showcase View Mode (Continuous Ticker or Full Grid)
  const [rosterViewMode, setRosterViewMode] = useState<'ticker' | 'grid'>('ticker');

  // Calculator State (Rates strictly constrained between $189 and $450)
  // Measured per week (scaling from 35 to 70+ weekly pitches)
  const [weeklyPitches, setWeeklyPitches] = useState<number>(50);
  const [platformsCount, setPlatformsCount] = useState<number>(4);
  const [includeContractAudit, setIncludeContractAudit] = useState<boolean>(true);
  const [includeInboxTriage, setIncludeInboxTriage] = useState<boolean>(true);
  const [includeInvoicingAdmin, setIncludeInvoicingAdmin] = useState<boolean>(false);
  const [selectedTierPreset, setSelectedTierPreset] = useState<'custom' | 'starter' | 'growth' | 'executive'>('growth');

  // Lead Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    niche: 'Beauty & Skincare',
    note: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);

  // Calculate Retainer strictly within $189 to $450
  const computeRetainer = (): number => {
    if (selectedTierPreset === 'starter') return 189;
    if (selectedTierPreset === 'growth') return 295;
    if (selectedTierPreset === 'executive') return 450;

    // Custom volume calculation formula based on weekly pitch volume:
    let calculated = 189;
    // Volume adjustments ($18 per 5 weekly pitches above 35 baseline)
    const extraWeekly = Math.max(0, weeklyPitches - 35);
    calculated += Math.round((extraWeekly / 5) * 18);

    // Platform scope adjustments ($20 per platform over 2)
    const extraPlatforms = Math.max(0, platformsCount - 2);
    calculated += extraPlatforms * 20;

    // Operational features
    if (includeContractAudit) calculated += 35;
    if (includeInboxTriage) calculated += 30;
    if (includeInvoicingAdmin) calculated += 25;

    // Strictly clamp between $189 and $450
    return Math.min(450, Math.max(189, calculated));
  };

  const calculatedRate = computeRetainer();

  const handlePresetSelect = (preset: 'starter' | 'growth' | 'executive') => {
    setSelectedTierPreset(preset);
    if (preset === 'starter') {
      setWeeklyPitches(35);
      setPlatformsCount(2);
      setIncludeContractAudit(false);
      setIncludeInboxTriage(false);
      setIncludeInvoicingAdmin(false);
    } else if (preset === 'growth') {
      setWeeklyPitches(50);
      setPlatformsCount(4);
      setIncludeContractAudit(true);
      setIncludeInboxTriage(true);
      setIncludeInvoicingAdmin(false);
    } else if (preset === 'executive') {
      setWeeklyPitches(70);
      setPlatformsCount(7);
      setIncludeContractAudit(true);
      setIncludeInboxTriage(true);
      setIncludeInvoicingAdmin(true);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.handle.trim()) {
      errors.handle = 'Social handle or portfolio link is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateProposalEmailUrl = () => {
    const subject = encodeURIComponent(`New Creator Proposal: ${formData.name || 'Creator'} ($${calculatedRate}/mo Retainer)`);
    const body = encodeURIComponent(
`Hi Cathy,

I would like to lock in this creator operations package with Virtually Ask Cath:

• Creator Name: ${formData.name}
• Email: ${formData.email}
• Social Handle / Portfolio: ${formData.handle}
• Primary Niche: ${formData.niche}
• Selected Tier: ${selectedTierPreset.toUpperCase()}
• Weekly Pitch Volume: ${weeklyPitches} pitches/week (~${weeklyPitches * 4} monthly outreach applications)
• Active Platforms: ${platformsCount} platforms
• Rigorous Contract Defense Audit: ${includeContractAudit ? 'Yes (Included)' : 'No'}
• Daily Priority Inbox Triage: ${includeInboxTriage ? 'Yes (Included)' : 'No'}
• Dedicated Invoicing Administration: ${includeInvoicingAdmin ? 'Yes (Included)' : 'No'}
• Estimated Retainer: $${calculatedRate}/month

Looking forward to speaking with you on our discovery call!

Best regards,
${formData.name}
${formData.email}`
    );
    return `mailto:cathymaezamora2104@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleLockInRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      const emailUrl = generateProposalEmailUrl();
      try {
        window.location.href = emailUrl;
      } catch (err) {
        console.error(err);
      }
    }
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Discovery & Needs Assessment Call',
      lead: 'Strategic Evaluation with Cathy',
      desc: 'A comprehensive 30-minute private video session where Cathy audits your active creator revenue streams, historical pitch response rates, current platform presence, and critical administrative bottlenecks.',
      deliverable: 'Audited Creator Operations Snapshot & Custom Pitch Platform Matrix',
      timeline: 'Day 1'
    },
    {
      num: '02',
      title: 'Tailored Proposal & Retainer Structure',
      lead: 'Capped & Transparent Investment',
      desc: 'Within 24 hours of our discovery session, you receive a transparent operational agreement strictly matched to your pitching volume and platform scope ($189 to $450/month). Zero hidden retainers or surprise add-ons.',
      deliverable: 'Structured Engagement Brief with Exact Outreach SLA & Application Targets',
      timeline: 'Day 2'
    },
    {
      num: '03',
      title: 'Formal Contract Signing',
      lead: 'Mutual Protection & NDA Enclosure',
      desc: 'Execution of a secure, legally sound creator management agreement outlining confidentiality, intellectual property autonomy, communication turnaround times, and strict data safeguards.',
      deliverable: 'Fully Executed Services Agreement & Confidentiality Safeguard',
      timeline: 'Day 3'
    },
    {
      num: '04',
      title: 'Automated 19-Question Intake System',
      lead: 'Capturing Your Exact Voice & Guardrails',
      desc: 'Our battle-tested intake framework documents your exact conversational tone, pitch hooks, past high-performing UGC examples, blacklisted sponsor categories, minimum usage rate baselines, and commercial boundaries.',
      deliverable: 'Master Creator Voice Codex & Platform Brand Dossier',
      timeline: 'Day 4-5'
    },
    {
      num: '05',
      title: 'System & Workspace Setup',
      lead: 'Notion, Trello & Pipeline Infrastructure',
      desc: 'Cathy establishes your dedicated operations dashboard across Notion, Trello, and live trackers. Integration of Apollo, Hunter.io, and marketplace portal credentials with synchronized specialist assignments.',
      deliverable: 'Live Central Operations Portal + Daily Application Log',
      timeline: 'Day 5-6'
    },
    {
      num: '06',
      title: 'Execution & Weekly Operations Reporting',
      lead: 'Unlimited Platform Applications & Deal Defense',
      desc: 'Daily tailored applications deployed across targeted platforms. Inbound brand messages filtered, lowball terms intercepted, usage rights redlined, and a concise Friday KPI summary delivered straight to your inbox.',
      deliverable: 'Weekly Executive Report: Pitches Deployed, Open Deals, Contract Audits',
      timeline: 'Ongoing Weekly'
    }
  ];

  const caseStudies = [
    {
      title: "Protecting a Credentialed Pharmacist Creator's Brand",
      subtitle: "Healthcare Authority & Strict Usage Terms Defense",
      tag: "Contract Safeguard & Compliance",
      challenge: "A licensed clinical pharmacist producing evidence-based health UGC was inundated with ambiguous wellness brand contracts. Unvetted brands were attempting to bury perpetual digital likeness rights, worldwide digital ad whitelisting, and strict clinical liability clauses into low-tier agreements.",
      strategy: "Cathy instituted an ironclad commercial deal framework: eliminated all perpetual usage rights, instituted mandatory 60-day digital paid-ad expiration windows, removed personal medical liability language, and mandated upfront script review.",
      result: "Successfully doubled paid brand collaboration volume within a single quarter while fully shielding the creator's clinical license, maintaining complete creative control, and preventing uncompensated ad reuse across TikTok and Meta."
    },
    {
      title: "Turning Free Offers into Paid Deals",
      subtitle: "Scope-First Quoting & Gifted Outreach Counter-Strategies",
      tag: "Revenue Conversion & Deal Scoping",
      challenge: "An influential beauty and wellness creator was receiving dozens of DM inquiries weekly offering 'free products in exchange for 3 dedicated organic videos and raw footage.' Replying manually consumed hours with near-zero financial return.",
      strategy: "We built an automated triage system that filtered incoming gifting PR emails through a customized scope-first value counter-deck. Cathy formulated tiered commercial packages articulating production overhead, organic conversion value, and usage licensing fees.",
      result: "Converted 68% of incoming gifted inquiries into high-tier paid partnerships. The creator eliminated hours of unpaid content fatigue while securing predictable, recurring brand sponsorships across multiple quarters."
    },
    {
      title: "Racing Seasonal Budget Windows",
      subtitle: "Nurse-Practitioner Rodeo & High-Velocity Holiday Campaign Capture",
      tag: "Multi-Platform Application Speed",
      challenge: "During peak holiday promotional cycles, corporate healthcare and apparel brands open creator RFP windows for as little as 24 to 48 hours. Because this nurse practitioner worked rigorous 12-hour hospital shifts, high-ticket casting calls were repeatedly missed.",
      strategy: "Backed by VAC's synchronized specialist team, Cathy maintained active continuous monitoring across Insense, Cohley, and direct brand inboxes. Custom audition reads and brand-aligned hook submissions were dispatched within 2 hours of RFP postings.",
      result: "Captured 100% of target holiday campaign briefs during peak retail windows. The creator secured premier tier-one brand partnerships without interrupting or sacrificing a single hospital clinical rotation."
    }
  ];

  const getCreatorAvatarFallback = (initials: string) => {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="100%" height="100%" rx="80" fill="%231A110D"/><circle cx="80" cy="80" r="76" fill="none" stroke="%23EF516F" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.85"/><circle cx="80" cy="62" r="28" fill="%232E1D17"/><path d="M34 136c0-25 20.6-45 46-45s46 20 46 45" fill="%232E1D17"/><text x="50%" y="67%" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="28" fill="%23FFFFFF" letter-spacing="1">${initials}</text><text x="50%" y="87%" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="8.5" fill="%239EC8ED" letter-spacing="1.5">VERIFIED</text></svg>`;
  };

  const collaborators = [
    {
      name: 'Samuel Wyndham',
      handle: '@samuel-wyndham',
      link: 'https://www.linkedin.com/in/samuel-wyndham-172416115/',
      platform: 'LinkedIn' as const,
      niche: 'CEO of Biz365 · B2B SaaS Growth & Executive Leadership',
      initials: 'SW',
      photo: '/assets/aistudio/imgi_1_1777514872565_8ea6f590.png',
      backupPhoto: '/assets/aistudio/imgi_1_1777514872565_8ea6f590.png',
      objectPosition: 'center 15%',
      alt: 'Portrait of Samuel Wyndham, CEO of Biz365',
      highlight: 'Executive Retainer & Scale Strategy'
    },
    {
      name: 'Jaclyn Forero',
      handle: '@jaclyn.forero',
      link: 'https://www.instagram.com/jaclyn.forero/',
      platform: 'Instagram' as const,
      niche: 'Beauty & Lifestyle UGC Creator',
      initials: 'JF',
      photo: '/assets/aistudio/jaclyn_forero_05bb126a.jpg',
      backupPhoto: '/assets/images/creators/jaclyn_forero.jpg',
      objectPosition: 'center 15%',
      alt: 'Headshot of Jaclyn Forero',
      highlight: 'Continuous Outreach Engine'
    },
    {
      name: 'Agrifino Edralin',
      handle: '@griffcreates_',
      link: 'https://www.instagram.com/griffcreates_/',
      platform: 'Instagram' as const,
      niche: 'Commercial Video & Creative Direction',
      initials: 'AE',
      photo: '/assets/aistudio/agrifino_064d8762.jpg',
      backupPhoto: '/assets/images/creators/agrifino_edralin.jpg',
      objectPosition: 'center 20%',
      alt: 'Headshot of Agrifino Edralin',
      highlight: 'Contract Terms Defense'
    },
    {
      name: 'Jen Wolfenbarger',
      handle: '@j_and_j_beauty',
      link: 'https://www.tiktok.com/@j_and_j_beauty',
      platform: 'TikTok' as const,
      niche: 'Beauty & Daily Routine Specialist',
      initials: 'JW',
      photo: '/assets/aistudio/jen_wolfenbarger_d404f0b4.jpg',
      backupPhoto: '/assets/images/creators/jen_wolfenbarger.jpg',
      objectPosition: 'center 20%',
      alt: 'Headshot of Jen Wolfenbarger',
      highlight: 'PR Gifting Conversion'
    },
    {
      name: 'HeatherH Creates',
      handle: '@heatherh.creates',
      link: 'https://www.tiktok.com/@heatherh.creates',
      platform: 'TikTok' as const,
      niche: 'TikTok Hook Strategy & Viral UGC',
      initials: 'HC',
      photo: '/assets/aistudio/heather_395b9a18.png',
      backupPhoto: '/assets/images/creators/heatherh_creates.png',
      objectPosition: 'center 15%',
      alt: 'Headshot of HeatherH Creates',
      highlight: 'High-Velocity Submissions'
    },
    {
      name: 'Michelle Carlile',
      handle: '@mi_carli',
      link: 'https://www.instagram.com/mi_carli',
      platform: 'Instagram' as const,
      niche: 'Wellness, Fashion & Brand Partnerships',
      initials: 'MC',
      photo: '/assets/aistudio/Michelle_858fa902.jpg',
      backupPhoto: '/assets/images/creators/michelle_carlile.jpg',
      objectPosition: 'center 15%',
      alt: 'Headshot of Michelle Carlile',
      highlight: 'Long-Term Retainer Scaling'
    },
    {
      name: 'Leon Taylor',
      handle: '@leon_ugc',
      link: 'https://www.instagram.com/leon_ugc/',
      platform: 'Instagram' as const,
      niche: 'Men’s Grooming & Commercial Video',
      initials: 'LT',
      photo: '/assets/aistudio/leon_taylor_e45fe755.jpg',
      backupPhoto: '/assets/images/creators/leon_taylor.jpg',
      objectPosition: 'center 8%',
      alt: 'Headshot of Leon Taylor',
      highlight: 'Brand Deal Scoping & Defense'
    },
    {
      name: 'Angelene Susana',
      handle: '@angelenessna',
      link: 'https://www.instagram.com/angelenessna/',
      platform: 'Instagram' as const,
      niche: 'Aesthetic Lifestyle & Fashion UGC',
      initials: 'AS',
      photo: '/assets/aistudio/angelene_susasna_cca921d0.jpg',
      backupPhoto: '/assets/images/creators/angelene_susana.jpg',
      objectPosition: 'center 18%',
      alt: 'Headshot of Angelene Susana',
      highlight: 'Marketplace Casting Sync'
    },
    {
      name: 'Keren Levand',
      handle: '@imkerenl',
      link: 'https://www.instagram.com/imkerenl/',
      platform: 'Instagram' as const,
      niche: 'High-Impact Brand Ambassador & UGC',
      initials: 'KL',
      photo: '/assets/aistudio/keren_levand_79b2f0f2.jpg',
      backupPhoto: '/assets/images/creators/keren_levand.jpg',
      objectPosition: 'center 20%',
      alt: 'Headshot of Keren Levand',
      highlight: 'Usage Rights Protection'
    },
    {
      name: 'Dr. Krystal Conner',
      handle: '@drkrystalconner',
      link: 'https://www.instagram.com/drkrystalconner/',
      platform: 'Instagram' as const,
      niche: 'Executive Coach, Keynote & Authority',
      initials: 'KC',
      photo: '/assets/aistudio/Krystal_ee61201e.jpg',
      backupPhoto: '/assets/images/creators/dr_krystal_conner.jpg',
      objectPosition: 'center 15%',
      alt: 'Headshot of Dr. Krystal Conner',
      highlight: 'Licensing & Speaking Defense'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0ED] text-[#1A110D] font-sans selection:bg-[#EF516F]/25 selection:text-[#1A110D]">
      {/* Thin Fixed Scroll Progress Bar at the very top of the navigation bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[rgba(26,17,13,0.15)] pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll progress"
      >
        <div
          className="h-full bg-gradient-to-r from-[#EF516F] via-[#9EC8ED] to-[#EF516F] transition-[width] duration-100 ease-out shadow-[0_0_10px_rgba(239,81,111,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 1. STICKY GLASSMORPHISM NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#F5F0ED]/90 backdrop-blur-xl border-b border-[rgba(26,17,13,0.08)] transition-all duration-200 shadow-[0_1px_3px_rgba(26,17,13,0.02)]">
        {/* Synchronized progress accent line along the bottom border of the header */}
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] bg-gradient-to-r from-[#EF516F] via-[#9EC8ED] to-[#EF516F] transition-[width] duration-100 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Logo: Official Transparent VAC Branding Logo */}
          <a
            href="#"
            className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="VAC · Virtually Ask Cath"
          >
            <BrandLogo className="h-8 sm:h-9 md:h-10 w-auto transition-opacity hover:opacity-90" />
          </a>

          {/* Desktop Nav Links in Frosted Island Capsule */}
          <nav className="hidden xl:flex items-center p-1 bg-white/80 backdrop-blur-md rounded-full border border-[rgba(26,17,13,0.08)] shadow-[0_2px_10px_rgba(26,17,13,0.04)]">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3.5 py-1.5 text-xs tracking-tight rounded-full transition-all duration-200 lowercase whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1A110D] text-white shadow-xs font-semibold'
                      : 'text-[#4A3B35] font-medium hover:text-[#EF516F] hover:bg-[#EF516F]/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#calculator"
              className="btn-interactive-coral group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-[#EF516F] to-[#E53B5E] hover:from-[#1A110D] hover:to-[#1A110D] rounded-full shadow-sm hover:shadow-md hover:shadow-[#EF516F]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap lowercase"
            >
              <span>book discovery call</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1A110D] hover:text-[#EF516F] focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-b border-[rgba(26,17,13,0.15)] bg-[#F5F0ED] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2.5 text-sm font-semibold tracking-wide text-[#4A3B35] lowercase">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    href={`#${item.id}`}
                    className={`py-2 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#1A110D] text-white font-semibold shadow-xs'
                        : 'hover:text-[#EF516F] hover:bg-[#EF516F]/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#EF516F]" />}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-[rgba(26,17,13,0.1)] mt-2">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  href="#calculator"
                  className="btn-interactive-coral w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider text-white bg-[#EF516F] hover:bg-[#1A110D] rounded-full transition-all duration-300 lowercase shadow-sm"
                >
                  <span>book discovery call</span>
                  <IosEmoji name="handshake" alt="Handshake" className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO SECTION (Asymmetric Editorial Layout) */}
        <section id="about" className="relative pt-12 pb-20 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden bg-[#F5F0ED]">
          {/* Subtle Ambient Ethereal Glow Backdrops */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9EC8ED]/35 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#EF516F]/15 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Editorial Value Proposition */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EF516F]/10 text-[#1A110D] text-xs font-semibold tracking-wider lowercase rounded-[20px] border border-[#EF516F]/30 mb-6 shadow-xs">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/20">
                    <IosEmoji name="sparkles" alt="Sparkles" className="w-3 h-3" />
                  </span>
                  <span>operating continuously since january 2024 · 3 solid years of creator operations · dti registered</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1A110D] font-heading lowercase leading-[1.08] mb-4">
                  you create. <br />
                  <span className="font-editorial-italic font-semibold text-[#EF516F]">i handle the business</span> behind it.
                </h1>

                <p className="font-editorial-italic font-semibold text-[#1A110D] text-base sm:text-lg mb-6 lowercase">
                  “giving you the structural freedom to create, while your backend stays bulletproof.”
                </p>

                <p className="text-lg sm:text-xl text-[#4A3B35] leading-relaxed mb-8 max-w-2xl font-normal">
                  Operating continuously since January 2024 (marking 3 solid years of specialized expertise as of 2027), I build custom outreach engines, protect your deal terms, and run the compliant backend that keeps your creator business booked, protected, and fully paid.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                  <a
                    href="#calculator"
                    className="btn-interactive-coral inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold tracking-wider lowercase text-white bg-[#EF516F] hover:bg-[#1A110D] hover:shadow-[0_12px_28px_rgba(239,81,111,0.38)] transition-all duration-300 rounded-[20px] shadow-md text-center group"
                  >
                    <span>book a discovery call</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#calculator"
                    className="btn-lift inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold tracking-wider lowercase text-[#1A110D] bg-white hover:bg-[#9EC8ED]/25 hover:border-[#9EC8ED] border border-[#9EC8ED]/70 transition-all duration-300 rounded-[20px] text-center group shadow-xs"
                  >
                    <Calculator className="w-4 h-4 text-[#EF516F] group-hover:text-[#1A110D] transition-colors" />
                    <span>calculate your retainer</span>
                  </a>
                </div>

                {/* Micro Guarantee Note */}
                <div className="flex items-center gap-3 text-xs text-[#4A3B35] border-t border-[rgba(26,17,13,0.12)] pt-4 w-full">
                  <ShieldCheck className="w-4 h-4 text-[#EF516F] shrink-0" />
                  <span>Strict Capped Retainers ($189 - $450/mo) · Rigorous Terms Audit · Zero Creator Overhead</span>
                </div>

                {/* Direct Social Channels & Hyperlinks */}
                <div className="flex flex-wrap items-center gap-2.5 pt-5 w-full">
                  <span className="text-xs font-semibold text-[#4A3B35] lowercase">
                    connect directly:
                  </span>

                  {/* Gmail Direct */}
                  <a
                    href="mailto:cathymaezamora2104@gmail.com?subject=Inquiry%20from%20Virtually%20Ask%20Cath%20Portfolio"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] hover:bg-[#EF516F]/5 text-[#1A110D] hover:text-[#EF516F] text-xs font-medium transition-all duration-200 shadow-2xs group"
                    title="Send Email to cathymaezamora2104@gmail.com"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#EF516F]" />
                    <span>gmail</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/cathy-mae-zamora-9459872a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 text-[#1A110D] hover:text-[#0A66C2] text-xs font-medium transition-all duration-200 shadow-2xs group"
                    title="Connect with Cathy on LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>linkedin</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com/cathyzamora_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#1A110D] hover:bg-[#1A110D]/5 text-[#1A110D] text-xs font-medium transition-all duration-200 shadow-2xs group"
                    title="Follow @cathyzamora_ on X"
                  >
                    <svg className="w-3.5 h-3.5 text-[#1A110D] fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>x.com</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Founder Portrait Frame with Editorial Luxury Styling */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Outer Luxury Framing with Architectural Corner Accents */}
                  <div className="relative border border-[#9EC8ED]/50 p-3 sm:p-4 bg-white/95 shadow-2xl rounded-[20px] group">
                    {/* Top Architectural Corner Marks (Bespoke Coral Pink & Dream Blue accents) */}
                    <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#EF516F]" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#9EC8ED]" />

                    {/* Image Container with Editorial Matting */}
                    <div className="overflow-hidden aspect-[3/4] relative bg-[#F5F0ED] border border-[#9EC8ED]/30 rounded-[16px]">
                      <img
                        src="/assets/aistudio/ZAMORA__CATHY_MAE_8r__1__6e6b4b1a.jpg"
                        alt="Cathy Mae Zamora · Founder & Lead Strategist"
                        className="w-full h-full object-cover object-[center_18%] group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src !== '/src/assets/images/cathy_mae_zamora_portrait.jpg') {
                            target.src = '/src/assets/images/cathy_mae_zamora_portrait.jpg';
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                      {/* Top-Right Editorial Trust Pill */}
                      <div className="absolute top-3 right-3 backdrop-blur-md bg-white/95 border border-[#9EC8ED]/60 text-[#1A110D] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-[12px] shadow-sm">
                        Strategic Lead
                      </div>
                      
                      {/* Subtitle tag directly inside photo bottom */}
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-[#1A110D]/90 border border-white/20 p-3.5 rounded-[12px]">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-extrabold tracking-tight text-sm font-heading text-white">Cathy Mae Zamora</p>
                          <span className="text-[10px] font-mono-numbers text-[#9EC8ED] uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded-xs font-bold">
                            Since Jan 2024
                          </span>
                        </div>
                        <p className="text-white/90 text-[11px] leading-tight font-light">
                          Founder & Creator Operations Lead · BS Accountancy (Holy Trinity College) · SGV & Co. Trained
                        </p>
                      </div>
                    </div>

                    {/* Bottom Architectural Corner Marks */}
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#9EC8ED]" />
                    <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#EF516F]" />
                  </div>

                  {/* Decorative Architectural Offset Shadow Grid */}
                  <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full border border-[#9EC8ED]/30 -z-10 rounded-[20px]" />
                </div>
              </div>
            </div>

            {/* Social Proof Bar Grid */}
            <div className="mt-16 pt-10 border-t border-[rgba(26,17,13,0.2)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                <div className="flex flex-col border-l-2 border-[#EF516F] pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight">3 years</span>
                  <span className="text-xs uppercase tracking-wider text-[#4A3B35] font-semibold mt-1">
                    Continuous Operations
                  </span>
                  <span className="text-[11px] text-[#4A3B35] mt-0.5">
                    Delivering high-ticket creator operations continuously since January 2024
                  </span>
                </div>

                <div className="flex flex-col border-l-2 border-[#9EC8ED] pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight">masterclass</span>
                  <span className="text-xs uppercase tracking-wider text-[#4A3B35] font-semibold mt-1">
                    Marketplace Execution
                  </span>
                  <span className="text-[11px] text-[#4A3B35] mt-0.5">
                    Insense, Cohley, Vidsy, Brkaway, Backstage, Popfly
                  </span>
                </div>

                <div className="flex flex-col border-l-2 border-[#EF516F] pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight">specialized</span>
                  <span className="text-xs uppercase tracking-wider text-[#4A3B35] font-semibold mt-1">
                    Outreach Systems
                  </span>
                  <span className="text-[11px] text-[#4A3B35] mt-0.5">
                    Custom B2B list building & direct PR pitching pipelines
                  </span>
                </div>

                <div className="flex flex-col border-l-2 border-[#9EC8ED] pl-4 sm:pl-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight">unlimited</span>
                  <span className="text-xs uppercase tracking-wider text-[#4A3B35] font-semibold mt-1">
                    Targeted Pitching
                  </span>
                  <span className="text-[11px] text-[#4A3B35] mt-0.5">
                    Tailored applications scaled per creator availability
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE FOUNDER'S PERSPECTIVE (Why Work With Cathy?) */}
        <section id="expertise" className="py-20 sm:py-24 lg:py-28 bg-white border-y border-[rgba(26,17,13,0.12)] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="white-heart" alt="White Heart" className="w-3 h-3" />
                </span>
                <span>the founder's perspective · operating continuously since january 2024</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                why work with Cathy? <span className="font-editorial-italic font-semibold text-[#EF516F]">precision over guesswork.</span>
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#4A3B35] mt-2 tracking-wide lowercase">
                operating continuously since january 2024 · 3 solid years of high-ticket creator operations, rigorous contract defense, and custom outreach engines.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Editorial Personal Letter */}
              <div className="lg:col-span-7 space-y-6 text-[#1A110D] leading-relaxed text-base sm:text-lg font-normal">
                <p className="first-letter:text-5xl first-letter:font-editorial-italic first-letter:font-semibold first-letter:text-[#EF516F] first-letter:mr-3 first-letter:float-left">
                  Most creators start making content for freedom and creative expression, only to find themselves drowning in unpaid admin: wading through 40-item PR gift inquiries, negotiating complex 12-page brand contracts on their phone between shoots, and losing valuable deals simply because an application closed while they were filming.
                </p>

                <p>
                  Since founding <strong>Virtually Ask Cath (VAC) in January 2024</strong>, I have spent 3 solid years establishing and delivering high-ticket creator operations that eliminate administrative chaos and protect commercial leverage. Prior to launching VAC, my professional foundation was formed in <strong>BS Accountancy at Holy Trinity College</strong> and demanding audit fieldwork at <strong>SGV & Co. (Ernst & Young Philippines)</strong>. Audit training teaches you one uncompromising rule: <em>precision protects value</em>.
                </p>

                <p>
                  In the creator economy, this rigorous accounting mindset translates into stopping lowball brand offers, eliminating uncompensated perpetual usage rights, catching hidden digital likeness exploitation, and recovering lost seasonal campaign budgets. Operating continuously since January 2024, our proven systems ensure you remain an artist and an entrepreneur, never your own stressed-out admin assistant.
                </p>

                <div className="pt-4 border-t border-[rgba(26,17,13,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-heading font-extrabold text-xl text-[#1A110D] tracking-tight">Cathy Mae Zamora</p>
                    <p className="text-xs uppercase tracking-wider text-[#4A3B35]">founder & lead strategist · continuous high-ticket operations since jan 2024 (3 solid years)</p>
                    <p className="font-script text-2xl sm:text-3xl text-[#EF516F] mt-2 font-bold tracking-wide">“p.s. i’m rooting for you ♡”</p>
                  </div>
                  <div className="text-xs font-mono-numbers px-3.5 py-1.5 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-[20px] text-[#4A3B35] self-start sm:self-center shadow-xs">
                    BN No. 8435804
                  </div>
                </div>
              </div>

              {/* Contrast Card: Solo Chaos vs VAC Structured System */}
              <div className="lg:col-span-5 bg-[#F5F0ED] border-2 border-[#9EC8ED]/40 p-6 sm:p-8 rounded-[20px] shadow-sm">
                <h3 className="text-sm font-extrabold font-heading lowercase tracking-tight text-[#1A110D] mb-6 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#EF516F]" />
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#EF516F]/10">
                    <IosEmoji name="briefcase" alt="Briefcase" className="w-3.5 h-3.5" />
                  </span>
                  <span>the operational contrast</span>
                </h3>

                <div className="space-y-6">
                  {/* The Solo Reality */}
                  <div className="pb-5 border-b border-[rgba(26,17,13,0.15)]">
                    <span className="text-xs font-extrabold font-heading tracking-tight text-red-600 block mb-2">
                      The Solitary Creator Reality
                    </span>
                    <ul className="text-xs text-[#4A3B35] space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>Accepting gifted products hoping it somehow leads to a paid deal.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>Signing away perpetual digital whitelisting and AI likeness for flat fees.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>Missing high-ticket seasonal Q4 casting calls during filming or travel.</span>
                      </li>
                    </ul>
                  </div>

                  {/* The VAC Standard */}
                  <div>
                    <span className="text-xs font-extrabold font-heading tracking-tight text-[#1A110D] block mb-2">
                      The VAC Structured Ecosystem
                    </span>
                    <ul className="text-xs text-[#1A110D] space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#EF516F] shrink-0 mt-0.5" />
                        <span>Scope-first quoting framework that turns PR gifting into paid retainers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#EF516F] shrink-0 mt-0.5" />
                        <span>Audit-grade contract redlines protecting usage rights and ad exclusivity.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#EF516F] shrink-0 mt-0.5" />
                        <span>Synchronized platform pitching deploying unlimited tailored applications daily.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE TEAM BEHIND THE SERVICE (Cathy + 4 Operations Support Specialists) */}
        <section id="team" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="handshake" alt="Handshake" className="w-3 h-3" />
                </span>
                <span>collaborative architecture</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                the team behind the service: <span className="font-editorial-italic font-semibold text-[#EF516F]">Cathy + 4 operations specialists</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                Cathy Mae Zamora is the sole strategist, creative lead, and master brain behind every client campaign. The team operates flexibly behind the scenes, where members are dynamically assigned per client depending on current project demands, handling clean input/output execution while Cathy oversees all strategies, negotiations, and pivots.
              </p>
            </div>

            {/* Primary Strategic Lead Card: Cathy Mae Zamora (Master Brain) */}
            <div className="bg-white border-2 border-[#9EC8ED]/40 p-6 sm:p-8 rounded-[20px] mb-10 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Circular Lead Portrait */}
                  <div className="relative shrink-0">
                    <img
                      src="/assets/aistudio/ZAMORA__CATHY_MAE_8r__1__6e6b4b1a.jpg"
                      alt="Cathy Mae Zamora · Founder & Creator Operations Lead"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-[center_18%] border-2 border-[#EF516F] p-1 bg-white shadow-md hover:scale-[1.03] transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src !== '/src/assets/images/cathy_mae_zamora_portrait.jpg') {
                          target.src = '/src/assets/images/cathy_mae_zamora_portrait.jpg';
                        }
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#1A110D] text-white p-1 rounded-full shadow-sm" title="Sole Strategist & Master Brain">
                      <Award className="w-4 h-4 text-[#EF516F]" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EF516F] text-white text-xs font-semibold tracking-wider lowercase rounded-xl mb-2 shadow-xs">
                      sole strategist · creative lead · master brain
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A110D] font-heading tracking-tight">
                      Cathy Mae Zamora
                    </h3>
                    <p className="text-xs font-medium text-[#4A3B35] mt-0.5">
                      Founder & Creator Operations Lead · BS Accountancy, SGV & Co. Trained
                    </p>
                    <p className="text-xs sm:text-sm text-[#4A3B35] mt-3 max-w-2xl font-light leading-relaxed">
                      Every pitch strategy, pricing model, negotiation counter, and contract redline originates directly from Cathy. She personally orchestrates client onboarding, audits brand terms, and directs operations specialists on execution tasks to guarantee zero dropped deals.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-center sm:self-auto">
                  <div className="px-5 py-3.5 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-[20px] text-center shadow-xs">
                    <span className="text-xs font-bold text-[#1A110D] uppercase tracking-wider block">
                      Dynamic Team Deployment
                    </span>
                    <span className="text-[11px] text-[#4A3B35] block mt-0.5 max-w-[200px]">
                      Specialists assigned flexibly based on your weekly volume surges
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Operations Support Specialists Grid with Circular Photos & Exact Backgrounds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Specialist 1: Benedick B. */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] p-6 rounded-[20px] hover:border-[#9EC8ED] text-center group flex flex-col items-center justify-start hover:shadow-[0_12px_28px_rgba(158,200,237,0.25)]">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src="/assets/aistudio/Benedick_B._00d68309.jpeg"
                    alt="Benedick B."
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#9EC8ED]/50 p-1 bg-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Benedick B.
                </h4>
                <p className="text-xs text-[#4A3B35] mt-2 leading-relaxed font-normal max-w-xs">
                  Licensed Professional Teacher and Graduated in Bachelor of Science in Information Technology (Management Information Systems)
                </p>
              </div>

              {/* Specialist 2: Jean T. */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] p-6 rounded-[20px] hover:border-[#9EC8ED] text-center group flex flex-col items-center justify-start hover:shadow-[0_12px_28px_rgba(158,200,237,0.25)]">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src="/src/assets/images/jean_t_financial_management.jpg"
                    alt="Jean T."
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#9EC8ED]/50 p-1 bg-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-lg font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Jean T.
                </h4>
                <p className="text-xs text-[#4A3B35] mt-2 leading-relaxed font-normal max-w-xs">
                  B.S. Financial Management Graduate
                </p>
              </div>

              {/* Specialist 3: Joemari M. */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] p-6 rounded-[20px] hover:border-[#9EC8ED] text-center group flex flex-col items-center justify-start hover:shadow-[0_12px_28px_rgba(158,200,237,0.25)]">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src="/assets/aistudio/Joemari_M._5b25b8ba.jpeg"
                    alt="Joemari M."
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#9EC8ED]/50 p-1 bg-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Joemari M.
                </h4>
                <p className="text-xs text-[#4A3B35] mt-2 leading-relaxed font-normal max-w-xs">
                  Bachelor of Science in Information Technology Graduate
                </p>
              </div>

              {/* Specialist 4: Sofia S. */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] p-6 rounded-[20px] hover:border-[#9EC8ED] text-center group flex flex-col items-center justify-start hover:shadow-[0_12px_28px_rgba(158,200,237,0.25)]">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src="/src/assets/images/sofia_s_bsed.jpg"
                    alt="Sofia S."
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#9EC8ED]/50 p-1 bg-white shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-lg font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Sofia S.
                </h4>
                <p className="text-xs text-[#4A3B35] mt-2 leading-relaxed font-normal max-w-xs">
                  Graduating now in BSEd English
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. UNIFIED SELECTED COLLABORATIONS (MOVING EDITORIAL TICKER & GRID) */}
        <section id="collaborations" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[rgba(26,17,13,0.12)] relative overflow-hidden">
          {/* Invisible anchor for backward compatibility with #roster links */}
          <div id="roster" className="scroll-mt-24 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5 mb-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="sparkles" alt="✨" className="w-2.5 h-2.5" />
                </span>
                <span>creator operations &amp; brand deal representation</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight leading-tight">
                selected <span className="font-editorial-italic font-semibold text-[#EF516F]">collaborations</span>
              </h2>
              <p className="font-script text-2xl sm:text-3xl text-[#EF516F] font-bold mt-2 tracking-wide">
                “every creator protected, always ♡”
              </p>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                An editorial showcase of top-tier creators, authority influencers, and founders who partner with Cathy Mae Zamora and VAC for pitch engine deployment, brand deal defenses, and compliant backend operations.
              </p>

              {/* View Switch Controls */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="inline-flex p-1 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-[20px] shadow-xs">
                  <button
                    onClick={() => setRosterViewMode('ticker')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[16px] transition-all ${
                      rosterViewMode === 'ticker'
                        ? 'bg-[#EF516F] text-white shadow-sm'
                        : 'text-[#4A3B35] hover:text-[#1A110D]'
                    }`}
                  >
                    Moving Ticker (Continuous)
                  </button>
                  <button
                    onClick={() => setRosterViewMode('grid')}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[16px] transition-all ${
                      rosterViewMode === 'grid'
                        ? 'bg-[#EF516F] text-white shadow-sm'
                        : 'text-[#4A3B35] hover:text-[#1A110D]'
                    }`}
                  >
                    Editorial Grid
                  </button>
                </div>
                <span className="text-[11px] text-[#4A3B35] font-light italic">
                  {rosterViewMode === 'ticker'
                    ? '• Hover ticker to pause marquee'
                    : '• 10 Featured Client & Creator Profiles'}
                </span>
              </div>
            </div>
          </div>

          {/* MODE 1: MOVING EDITORIAL TICKER (CONTINUOUS HORIZONTAL MARQUEE) */}
          {rosterViewMode === 'ticker' && (
            <div className="relative w-full overflow-hidden py-4">
              {/* Left & Right Luxury Fade Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

              {/* Continuous Marquee Track */}
              <div className="collaborator-ticker-track animate-marquee-smooth flex items-center gap-6 py-6 px-4">
                {[...collaborators, ...collaborators].map((c, idx) => (
                  <div
                    key={`${c.name}-${idx}`}
                    className="collaborator-card w-[290px] sm:w-[320px] shrink-0 bg-[#F5F0ED] border border-[rgba(26,17,13,0.12)] rounded-[20px] p-6 sm:p-7 shadow-sm hover:border-[#EF516F] transition-all duration-300 group cursor-pointer flex flex-col justify-between ticker-card-glow"
                  >
                    {/* Top Creator Avatar & Platform Badge */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <img
                          src={c.photo}
                          alt={c.alt}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #EF516F',
                            objectPosition: c.objectPosition || 'center'
                          }}
                          className="bg-[#1A110D] shadow-md transition-transform duration-300 group-hover:scale-[1.03]"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (c.backupPhoto && !target.src.includes(c.backupPhoto) && !target.src.includes('data:image')) {
                              target.src = c.backupPhoto;
                            } else {
                              target.onerror = null;
                              target.src = getCreatorAvatarFallback(c.initials);
                            }
                          }}
                        />
                        {/* Mini Social Indicator Badge */}
                        <div
                          className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#1A110D] text-white border border-[#9EC8ED]/40 shadow-sm flex items-center justify-center"
                          title={`${c.platform} Profile`}
                        >
                          {c.platform === 'Instagram' ? (
                            <Instagram className="w-3.5 h-3.5 text-[#EF516F]" />
                          ) : c.platform === 'LinkedIn' ? (
                            <Linkedin className="w-3.5 h-3.5 text-[#EF516F]" />
                          ) : (
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#EF516F]">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.61 6.32 6.34 6.34 0 0 0 6.34 6.36 6.34 6.34 0 0 0 6.34-6.36V9.89a8.28 8.28 0 0 0 4.78 1.49V7.95a4.83 4.83 0 0 1-1.6-.26z" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Creator Name & Handle */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight group-hover:text-[#EF516F] transition-colors leading-snug">
                        {c.name}
                      </h3>
                      <p className="font-mono-numbers text-xs text-[#4A3B35] mt-1 font-medium">
                        {c.handle}
                      </p>
                      <p className="text-xs text-[#4A3B35] mt-2 line-clamp-1">
                        {c.niche}
                      </p>
                    </div>

                    {/* Direct Social Link Button */}
                    <div className="mt-6 pt-4 border-t border-[rgba(26,17,13,0.15)]">
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${c.name}'s ${c.platform} profile in a new tab`}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-white hover:bg-[#EF516F] text-[#1A110D] hover:text-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] text-xs font-semibold rounded-xl transition-all duration-300 group/btn shadow-xs"
                      >
                        <span className="flex items-center gap-2">
                          {c.platform === 'Instagram' ? (
                            <Instagram className="w-3.5 h-3.5 text-[#1A110D] group-hover/btn:text-white transition-colors" />
                          ) : c.platform === 'LinkedIn' ? (
                            <Linkedin className="w-3.5 h-3.5 text-[#1A110D] group-hover/btn:text-white transition-colors" />
                          ) : (
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#1A110D] group-hover/btn:text-white transition-colors">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.61 6.32 6.34 6.34 0 0 0 6.34-6.36V9.89a8.28 8.28 0 0 0 4.78 1.49V7.95a4.83 4.83 0 0 1-1.6-.26z" />
                            </svg>
                          )}
                          <span>View {c.platform}</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#4A3B35] group-hover/btn:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 2: ASYMMETRIC 3x3 EDITORIAL GRID */}
          {rosterViewMode === 'grid' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {collaborators.map((c) => (
                  <div
                    key={c.name}
                    className="collaborator-card bg-[#F5F0ED] border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] rounded-[20px] p-6 sm:p-7 shadow-sm transition-all duration-300 group flex flex-col justify-between ticker-card-glow"
                  >
                    <div>
                      {/* Avatar & Platform Icon */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative shrink-0">
                          <img
                            src={c.photo}
                            alt={c.alt}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '2px solid #EF516F',
                              objectPosition: c.objectPosition || 'center'
                            }}
                            className="bg-[#1A110D] shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              if (c.backupPhoto && !target.src.includes(c.backupPhoto) && !target.src.includes('data:image')) {
                                target.src = c.backupPhoto;
                              } else {
                                target.onerror = null;
                                target.src = getCreatorAvatarFallback(c.initials);
                              }
                            }}
                          />
                          <div
                            className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#1A110D] text-white border border-[#9EC8ED]/40 shadow-sm flex items-center justify-center"
                            title={`${c.platform} Profile`}
                          >
                            {c.platform === 'Instagram' ? (
                              <Instagram className="w-3.5 h-3.5 text-[#EF516F]" />
                            ) : c.platform === 'LinkedIn' ? (
                              <Linkedin className="w-3.5 h-3.5 text-[#EF516F]" />
                            ) : (
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#EF516F]">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.61 6.32 6.34 6.34 0 0 0 6.34-6.36V9.89a8.28 8.28 0 0 0 4.78 1.49V7.95a4.83 4.83 0 0 1-1.6-.26z" />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight group-hover:text-[#EF516F] transition-colors leading-snug">
                            {c.name}
                          </h3>
                          <p className="font-mono-numbers text-xs text-[#4A3B35] mt-0.5 font-medium">
                            {c.handle}
                          </p>
                          <span className="inline-block text-[11px] uppercase tracking-wider text-[#EF516F] font-semibold mt-1">
                            {c.platform}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-[rgba(26,17,13,0.15)] pt-3 mb-6">
                        <p className="text-xs text-[#4A3B35] leading-relaxed">
                          {c.niche}
                        </p>
                      </div>
                    </div>

                    {/* Direct Social Link */}
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${c.name}'s ${c.platform} profile in a new tab`}
                      className="inline-flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-[#EF516F] text-[#1A110D] hover:text-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] text-xs font-semibold rounded-xl transition-all duration-300 group/btn mt-auto shadow-xs"
                    >
                      <span className="flex items-center gap-2">
                        {c.platform === 'Instagram' ? (
                          <Instagram className="w-4 h-4 text-[#1A110D] group-hover/btn:text-white transition-colors" />
                        ) : c.platform === 'LinkedIn' ? (
                          <Linkedin className="w-4 h-4 text-[#1A110D] group-hover/btn:text-white transition-colors" />
                        ) : (
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#1A110D] group-hover/btn:text-white transition-colors">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-6.61 6.32 6.34 6.34 0 0 0 6.34-6.36V9.89a8.28 8.28 0 0 0 4.78 1.49V7.95a4.83 4.83 0 0 1-1.6-.26z" />
                          </svg>
                        )}
                        <span className="font-mono-numbers text-[11px]">{c.handle}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider group-hover/btn:translate-x-1 transition-transform">
                        <span>View Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Invitation Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
            <div className="card-lift p-6 sm:p-8 bg-[#F5F0ED] border border-[#9EC8ED]/50 hover:border-[#EF516F] rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold lowercase tracking-wider text-[#4A3B35] inline-flex items-center gap-1.5 mb-1">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                    <IosEmoji name="sparkles" alt="✨" className="w-2.5 h-2.5" />
                  </span>
                  <span>bespoke representation &amp; operations</span>
                </span>
                <h4 className="text-lg sm:text-2xl font-extrabold font-heading lowercase tracking-tight text-[#1A110D]">
                  ready to <span className="font-editorial-italic font-semibold text-[#1A110D]">protect your terms</span> &amp; scale your pitch volume?
                </h4>
                <p className="text-xs text-[#4A3B35] mt-1 max-w-xl font-normal leading-relaxed">
                  Join our portfolio of top-tier creators. Cathy personally audits inbound proposals, pitches targeted brand deals daily, and ensures you are fully paid on time.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#calculator"
                  className="btn-interactive-coral inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider lowercase text-white bg-[#EF516F] hover:bg-[#1A110D] hover:text-white transition-all duration-300 rounded-[20px] shadow-sm group"
                >
                  <span>calculate your retainer</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 group-hover:scale-110 transition-transform">
                    <IosEmoji name="briefcase" alt="💼" className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE INVESTMENT CALCULATOR (Rate Tiers: $189 to $450) */}
        <section id="calculator" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] border-y border-[rgba(26,17,13,0.12)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="briefcase" alt="💼" className="w-2.5 h-2.5" />
                </span>
                <span>transparent investment structure</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                interactive <span className="font-editorial-italic font-semibold text-[#EF516F]">retainer calculator</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                Select your required outreach volume and operational coverage to calculate your monthly retainer. Transparent, predictable tiers ranging strictly from <span className="font-semibold text-[#1A110D]">$189 to $450/month</span> with zero hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Calculator Sliders & Selectors */}
              <div className="lg:col-span-7 bg-white border border-[rgba(26,17,13,0.12)] p-6 sm:p-8 rounded-[20px] shadow-sm">
                {/* Preset Tier Buttons */}
                <div className="mb-8">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B35] block mb-3">
                    Fast Preset Tier Selection
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handlePresetSelect('starter')}
                      className={`py-3 px-3 text-center border rounded-xl transition-all text-xs font-semibold ${
                        selectedTierPreset === 'starter'
                          ? 'bg-[#EF516F] text-white border-[#EF516F] shadow-sm'
                          : 'bg-[#F5F0ED] text-[#1A110D] border-[rgba(26,17,13,0.12)] hover:border-[#EF516F]'
                      }`}
                    >
                      <span className="block font-heading font-extrabold text-sm lowercase">essential</span>
                      <span className="font-mono-numbers block mt-1 text-[11px] opacity-90">35 / wk · $189 / mo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePresetSelect('growth')}
                      className={`py-3 px-3 text-center border rounded-xl transition-all text-xs font-semibold ${
                        selectedTierPreset === 'growth'
                          ? 'bg-[#EF516F] text-white border-[#EF516F] shadow-sm'
                          : 'bg-[#F5F0ED] text-[#1A110D] border-[rgba(26,17,13,0.12)] hover:border-[#EF516F]'
                      }`}
                    >
                      <span className="block font-heading font-extrabold text-sm lowercase">growth</span>
                      <span className="font-mono-numbers block mt-1 text-[11px] opacity-90">50 / wk · $295 / mo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePresetSelect('executive')}
                      className={`py-3 px-3 text-center border rounded-xl transition-all text-xs font-semibold ${
                        selectedTierPreset === 'executive'
                          ? 'bg-[#EF516F] text-white border-[#EF516F] shadow-sm'
                          : 'bg-[#F5F0ED] text-[#1A110D] border-[rgba(26,17,13,0.12)] hover:border-[#EF516F]'
                      }`}
                    >
                      <span className="block font-heading font-extrabold text-sm lowercase">executive</span>
                      <span className="font-mono-numbers block mt-1 text-[11px] opacity-90">70+ / wk · $450 / mo</span>
                    </button>
                  </div>
                </div>

                {/* Slider 1: Weekly Pitches & Monthly Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#1A110D] block">
                        Targeted Pitching Volume (Per Week)
                      </label>
                      <span className="text-[11px] text-[#4A3B35]">
                        Yields ~{weeklyPitches * 4} tailored applications per month
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#1A110D] font-mono-numbers block">
                        {weeklyPitches} Pitches / Wk
                      </span>
                      <span className="text-[11px] text-[#4A3B35] font-mono-numbers block">
                        ~{weeklyPitches * 4} / month total
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="75"
                    step="5"
                    value={weeklyPitches}
                    onChange={(e) => {
                      setWeeklyPitches(Number(e.target.value));
                      setSelectedTierPreset('custom');
                    }}
                    className="w-full h-2 bg-[rgba(26,17,13,0.15)] rounded-lg appearance-none cursor-pointer accent-[#EF516F]"
                  />
                  <div className="flex justify-between text-[11px] text-[#4A3B35] mt-1 font-mono-numbers">
                    <span>35 / wk (140 / mo)</span>
                    <span>50 / wk (200 / mo)</span>
                    <span>70+ / wk (280+ / mo)</span>
                  </div>
                </div>

                {/* Slider 2: Platforms Covered */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1A110D]">
                      Platform Ecosystem Coverage
                    </label>
                    <span className="text-xs font-bold text-[#1A110D] font-mono-numbers">
                      {platformsCount} Marketplaces
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={platformsCount}
                    onChange={(e) => {
                      setPlatformsCount(Number(e.target.value));
                      setSelectedTierPreset('custom');
                    }}
                    className="w-full h-2 bg-[rgba(26,17,13,0.15)] rounded-lg appearance-none cursor-pointer accent-[#EF516F]"
                  />
                  <div className="flex justify-between text-[11px] text-[#4A3B35] mt-1 font-mono-numbers">
                    <span>1 Platform</span>
                    <span>4 Core Portals</span>
                    <span>8 Full Marketplaces</span>
                  </div>
                </div>

                {/* Checkboxes: Operational Services */}
                <div className="space-y-3 pt-4 border-t border-[rgba(26,17,13,0.2)]">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3B35] block">
                    Operational Modules Included
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-[rgba(26,17,13,0.2)] rounded-xl cursor-pointer hover:border-[#1A110D] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeContractAudit}
                      onChange={(e) => {
                        setIncludeContractAudit(e.target.checked);
                        setSelectedTierPreset('custom');
                      }}
                      className="w-4 h-4 text-[#EF516F] rounded border-gray-300 focus:ring-[#EF516F] accent-[#EF516F]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#1A110D] block">Deal Terms & Usage Rights Redlines</span>
                      <span className="text-[#4A3B35]">Audit every contract for perpetual licensing, whitelisting, and likeness exclusivity.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-[rgba(26,17,13,0.2)] rounded-xl cursor-pointer hover:border-[#1A110D] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeInboxTriage}
                      onChange={(e) => {
                        setIncludeInboxTriage(e.target.checked);
                        setSelectedTierPreset('custom');
                      }}
                      className="w-4 h-4 text-[#EF516F] rounded border-gray-300 focus:ring-[#EF516F] accent-[#EF516F]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#1A110D] block">Inbound Brand Triage & Gifted-to-Paid Countering</span>
                      <span className="text-[#4A3B35]">Filter spam inquiries, protect your calendar, and deploy scope-first quotes.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-[rgba(26,17,13,0.2)] rounded-xl cursor-pointer hover:border-[#1A110D] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeInvoicingAdmin}
                      onChange={(e) => {
                        setIncludeInvoicingAdmin(e.target.checked);
                        setSelectedTierPreset('custom');
                      }}
                      className="w-4 h-4 text-[#EF516F] rounded border-gray-300 focus:ring-[#EF516F] accent-[#EF516F]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#1A110D] block">Professional Invoicing & Receivables Follow-Up</span>
                      <span className="text-[#4A3B35]">Timely billing dispatches and overdue tracking handled with strict operational separation.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Right Column: Calculated Retainer Card & Direct Booking Form */}
              <div className="lg:col-span-5 bg-white border border-[rgba(26,17,13,0.15)] p-6 sm:p-8 rounded-[20px] shadow-sm">
                <div className="border-b border-[rgba(26,17,13,0.2)] pb-6 mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#4A3B35] font-semibold block">
                    Calculated Monthly Retainer Tier
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl sm:text-5xl font-bold text-[#1A110D] font-mono-numbers">
                      ${calculatedRate}
                    </span>
                    <span className="text-sm text-[#4A3B35] font-medium">/ month total</span>
                  </div>

                  {/* Volume Metrics Dual Breakdown */}
                  <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#9EC8ED]/20 border border-[#9EC8ED]/40 rounded-xl">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4A3B35] block font-semibold">Weekly Pitch Volume</span>
                      <span className="text-xs font-bold text-[#1A110D] font-mono-numbers">{weeklyPitches} Pitches / Wk</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4A3B35] block font-semibold">Monthly Total Output</span>
                      <span className="text-xs font-bold text-[#1A110D] font-mono-numbers">~{weeklyPitches * 4} Pitches / Mo</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A3B35] mt-3">
                    *Guaranteed strict price cap: Monthly retainers are permanently fixed between $189 (minimum baseline) and $450 (maximum comprehensive tier).
                  </p>
                  <p className="font-script text-xl text-[#EF516F] font-bold text-center mt-3 tracking-wide">
                    you'll finish it, promise ♡
                  </p>
                </div>

                {/* Form to Lock In Rate */}
                {!formSubmitted ? (
                  <form onSubmit={handleLockInRate} className="space-y-4">
                    <h4 className="text-base font-extrabold font-heading lowercase tracking-tight text-[#1A110D]">
                      lock in this rate with Cathy
                    </h4>

                    <div>
                      <label className="text-xs font-semibold text-[#1A110D] block mb-1">
                        Creator Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-3 py-2 text-xs border rounded-xl text-[#1A110D] focus:outline-none focus:ring-1 focus:ring-[#EF516F] ${
                          formErrors.name ? 'border-red-500 bg-red-50/30' : 'border-[rgba(26,17,13,0.15)] bg-[#F5F0ED]'
                        }`}
                      />
                      {formErrors.name && (
                        <span className="text-[11px] text-red-600 mt-1 block">{formErrors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1A110D] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="alex@creatorstudio.com"
                        className={`w-full px-3 py-2 text-xs border rounded-xl text-[#1A110D] focus:outline-none focus:ring-1 focus:ring-[#EF516F] ${
                          formErrors.email ? 'border-red-500 bg-red-50/30' : 'border-[rgba(26,17,13,0.15)] bg-[#F5F0ED]'
                        }`}
                      />
                      {formErrors.email && (
                        <span className="text-[11px] text-red-600 mt-1 block">{formErrors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1A110D] block mb-1">
                        Social Handle / Portfolio URL *
                      </label>
                      <input
                        type="text"
                        name="handle"
                        value={formData.handle}
                        onChange={handleFormChange}
                        placeholder="@alexcreates / tiktok.com/@alex"
                        className={`w-full px-3 py-2 text-xs border rounded-xl text-[#1A110D] focus:outline-none focus:ring-1 focus:ring-[#EF516F] ${
                          formErrors.handle ? 'border-red-500 bg-red-50/30' : 'border-[rgba(26,17,13,0.15)] bg-[#F5F0ED]'
                        }`}
                      />
                      {formErrors.handle && (
                        <span className="text-[11px] text-red-600 mt-1 block">{formErrors.handle}</span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1A110D] block mb-1">
                        Primary Content Niche
                      </label>
                      <select
                        name="niche"
                        value={formData.niche}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 text-xs border border-[rgba(26,17,13,0.15)] bg-[#F5F0ED] text-[#1A110D] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#EF516F]"
                      >
                        <option>Beauty & Skincare</option>
                        <option>Healthcare & Medical (Credentialed)</option>
                        <option>Fitness & Wellness</option>
                        <option>Tech & SaaS Tools</option>
                        <option>Lifestyle & Parenting</option>
                        <option>B2B & Executive Thought Leadership</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn-interactive-coral w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#EF516F] hover:bg-[#1A110D] hover:text-white transition-all duration-300 rounded-[20px] shadow-sm flex items-center justify-center gap-2 mt-4 group"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Lock In This Rate (${calculatedRate}/mo · {weeklyPitches} Pitches/Wk)</span>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 group-hover:scale-110 transition-transform">
                        <IosEmoji name="love-letter" alt="💌" className="w-3.5 h-3.5" />
                      </span>
                    </button>
                    <p className="text-[11px] text-center text-[#4A3B35]">
                      No upfront billing · Cathy reviews each applicant within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-12 h-12 bg-[#EF516F]/15 border border-[#EF516F] text-[#1A110D] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight">
                      rate reserved for {formData.name} <span className="font-script font-bold text-2xl text-[#EF516F]">♡</span>
                    </h4>
                    <p className="text-xs text-[#4A3B35] leading-relaxed max-w-sm mx-auto">
                      Your proposal for <strong className="text-[#1A110D]">{weeklyPitches} pitches/week</strong> at <strong className="text-[#1A110D] font-mono-numbers">${calculatedRate}/month</strong> has been formulated! We opened your email client with all specifications addressed directly to <strong className="text-[#1A110D]">cathymaezamora2104@gmail.com</strong>.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={generateProposalEmailUrl()}
                        className="btn-interactive-coral inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold lowercase tracking-wider text-white bg-[#EF516F] hover:bg-[#1A110D] rounded-full shadow-md transition-all duration-300 group"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>send proposal to Cathy's inbox</span>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                          <IosEmoji name="love-letter" alt="💌" className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-[11px] text-[#4A3B35] hover:text-[#1A110D] block mx-auto underline pt-3 transition-colors"
                    >
                      Modify Parameters & Recalculate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CLIENT JOURNEY & AUTOMATED WORKFLOW (Interactive Step-by-Step) */}
        <section id="workflows" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="rocket" alt="🚀" className="w-2.5 h-2.5" />
                </span>
                <span>seamless onboarding</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                client journey &amp; <span className="font-editorial-italic font-semibold text-[#EF516F]">automated workflow</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                From our first discovery call to ongoing weekly operations, experience a systematic, friction-free onboarding designed by an audit-trained operations lead.
              </p>
            </div>

            {/* Interactive Step Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
              {workflowSteps.map((step, idx) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`p-3 text-left border rounded-[16px] transition-all ${
                    activeWorkflowStep === idx
                      ? 'bg-[#EF516F] border-[#EF516F] shadow-sm text-white'
                      : 'bg-white border-[rgba(26,17,13,0.12)] text-[#4A3B35] hover:bg-[#9EC8ED]/20'
                  }`}
                >
                  <span className={`text-[11px] font-mono-numbers font-bold block ${
                    activeWorkflowStep === idx ? 'text-white/90' : 'text-[#4A3B35]'
                  }`}>
                    STEP {step.num}
                  </span>
                  <span className="text-xs font-semibold line-clamp-1 mt-0.5">
                    {step.title.split('&')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Workflow Display Card */}
            <div className="bg-white border border-[rgba(26,17,13,0.12)] p-6 sm:p-10 rounded-[20px] shadow-sm transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-[#EF516F] text-white text-xs font-bold font-mono-numbers rounded-xl">
                      STEP {workflowSteps[activeWorkflowStep].num}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4A3B35]">
                      Timeline: {workflowSteps[activeWorkflowStep].timeline}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mb-2">
                    {workflowSteps[activeWorkflowStep].title}
                  </h3>
                  <p className="text-xs font-medium text-[#4A3B35] uppercase tracking-wider mb-4">
                    {workflowSteps[activeWorkflowStep].lead}
                  </p>
                  <p className="text-sm sm:text-base text-[#4A3B35] font-light leading-relaxed mb-6">
                    {workflowSteps[activeWorkflowStep].desc}
                  </p>

                  <div className="bg-[#F5F0ED] border border-[#9EC8ED]/60 p-4 rounded-xl">
                    <span className="text-[11px] font-bold text-[#4A3B35] uppercase tracking-wider block mb-1">
                      Key Deliverable Produced:
                    </span>
                    <span className="text-xs font-semibold text-[#1A110D]">
                      {workflowSteps[activeWorkflowStep].deliverable}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#F5F0ED] border border-[#9EC8ED]/40 p-6 rounded-[20px] text-center">
                  <Workflow className="w-10 h-10 text-[#EF516F] mx-auto mb-3" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A110D] block mb-1">
                    Synchronized Execution
                  </span>
                  <p className="text-xs text-[#4A3B35] leading-relaxed mb-4">
                    Every step is audited directly by Cathy Mae Zamora to guarantee absolute fidelity to your brand tone.
                  </p>
                  <div className="flex justify-between items-center text-xs border-t border-[rgba(26,17,13,0.2)] pt-3">
                    <button
                      type="button"
                      disabled={activeWorkflowStep === 0}
                      onClick={() => setActiveWorkflowStep((prev) => Math.max(0, prev - 1))}
                      className="text-[#4A3B35] hover:text-[#1A110D] disabled:opacity-30 text-xs font-semibold transition-colors"
                    >
                      ← Previous Step
                    </button>
                    <button
                      type="button"
                      disabled={activeWorkflowStep === workflowSteps.length - 1}
                      onClick={() => setActiveWorkflowStep((prev) => Math.min(workflowSteps.length - 1, prev + 1))}
                      className="text-[#1A110D] hover:text-[#EF516F] disabled:opacity-30 text-xs font-semibold transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CORE SERVICES & EXECUTION (Structured Cards) */}
        <section id="services" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] border-y border-[rgba(26,17,13,0.12)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="briefcase" alt="💼" className="w-2.5 h-2.5" />
                </span>
                <span>operational pillars</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                core services &amp; <span className="font-editorial-italic font-semibold text-[#EF516F]">specialized execution</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                High-touch, strategic creator operations designed to maximize your deal volume, safeguard your intellectual property, and remove administrative friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Client Acquisition & Unlimited Platform Pitching */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.18)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-numbers font-bold text-white px-2.5 py-1 bg-[#EF516F] rounded-xl">
                      PILLAR 01
                    </span>
                    <TrendingUp className="w-5 h-5 text-[#EF516F]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mb-3">
                    client acquisition &amp; <span className="font-editorial-italic font-semibold text-[#1A110D]">unlimited platform pitching</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A3B35] font-normal leading-relaxed mb-6">
                    Targeted list building via Instagram, Apollo, Hunter.io, and Meta Ads Library. Unlimited, tailored creator applications dispatched across key marketplace portals including Insense, Cohley, Vidsy, Brkaway, Vidovo, Backstage, and Popfly.
                  </p>
                  <ul className="text-xs text-[#1A110D] space-y-2 border-t border-[rgba(26,17,13,0.15)] pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Direct PR & brand marketing contact extraction (verified emails)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Custom hook and angle alignment for every marketplace pitch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Zero application caps · daily submissions scaled to your availability</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3B35]">
                  Focus: High-Ticket Paid Partnerships
                </div>
              </div>

              {/* Card 2: Negotiation & Deal Protection */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.18)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-numbers font-bold text-[#1A110D] px-2.5 py-1 bg-[#9EC8ED] rounded-xl">
                      PILLAR 02
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#9EC8ED]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mb-3">
                    negotiation &amp; <span className="font-editorial-italic font-semibold text-[#1A110D]">deal protection</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A3B35] font-normal leading-relaxed mb-6">
                    Audit-level contract scrutiny applied to all inbound deals. We specialize in converting gifting requests into paid agreements, safeguarding usage rights duration, limiting ad whitelisting terms, and blocking unauthorized AI likeness clauses.
                  </p>
                  <ul className="text-xs text-[#1A110D] space-y-2 border-t border-[rgba(26,17,13,0.15)] pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Systematic scope-first quoting counter-proposals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>30/60/90-day strict paid digital ad whitelisting boundaries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Strict redlines protecting personal brand and professional licenses</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3B35]">
                  Focus: Intellectual Property Safeguard
                </div>
              </div>

              {/* Card 3: Creator Operations & Professional Invoicing */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.18)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-numbers font-bold text-white px-2.5 py-1 bg-[#EF516F] rounded-xl">
                      PILLAR 03
                    </span>
                    <FileText className="w-5 h-5 text-[#EF516F]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mb-3">
                    creator operations &amp; <span className="font-editorial-italic font-semibold text-[#1A110D]">professional invoicing</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A3B35] font-normal leading-relaxed mb-6">
                    Total administrative clarity: professional Gmail triage to achieve Inbox Zero, operational task workflows, delivery deadline tracking, and clean financial administration handled completely separate from official registration credentials.
                  </p>
                  <ul className="text-xs text-[#1A110D] space-y-2 border-t border-[rgba(26,17,13,0.15)] pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Complete separation between client billing and official registration details</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Milestone-based receivables and payment follow-up schedules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Automated delivery tracking via Notion & Trello workspaces</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3B35]">
                  Focus: Clean Financial Administration
                </div>
              </div>

              {/* Card 4: Creative Strategy & Positioning */}
              <div className="card-lift bg-white border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.18)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-numbers font-bold text-[#1A110D] px-2.5 py-1 bg-[#9EC8ED] rounded-xl">
                      PILLAR 04
                    </span>
                    <Sparkles className="w-5 h-5 text-[#9EC8ED]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mb-3">
                    creative strategy &amp; <span className="font-editorial-italic font-semibold text-[#1A110D]">positioning</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A3B35] font-normal leading-relaxed mb-6">
                    Sharpen your commercial positioning with niche tone-matching, high-converting concept briefs, script hooks drafting, and fast audition read reviews to maximize brand approval rates on first pass.
                  </p>
                  <ul className="text-xs text-[#1A110D] space-y-2 border-t border-[rgba(26,17,13,0.2)] pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Niche-tailored creator media kit & concept one-pagers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Audition hook script drafting designed to stop the scroll</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EF516F]" />
                      <span>Competitor ad analysis using live Meta Ads Library insights</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4A3B35]">
                  Focus: Brand Positioning & Conversion
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TECH & AUTOMATION STACK (Interactive Communicative Pipeline Showcase) */}
        <TechAutomationSection />

        {/* 9. FEATURED CASE STUDIES (Interactive Accordion Cards - NO specific dollar figures) */}
        <section id="case-studies" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] border-y border-[rgba(26,17,13,0.12)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="sparkles" alt="✨" className="w-2.5 h-2.5" />
                </span>
                <span>verified field outcomes</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                featured <span className="font-editorial-italic font-semibold text-[#EF516F]">case studies</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                Real operational challenges resolved through disciplined systems, rigorous contract defense, and high-velocity platform execution.
              </p>
            </div>

            <div className="space-y-4">
              {caseStudies.map((cs, idx) => {
                const isOpen = activeCaseStudy === idx;
                return (
                  <div
                    key={cs.title}
                    className="card-lift border border-[rgba(26,17,13,0.12)] hover:border-[#EF516F] bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.15)]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCaseStudy(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-xs font-mono-numbers font-bold text-white px-2.5 py-1 bg-[#EF516F] rounded-xl w-fit">
                          CASE 0{idx + 1}
                        </span>
                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#1A110D] font-heading tracking-tight">
                            {cs.title}
                          </h3>
                          <span className="text-xs text-[#4A3B35] font-medium block sm:inline sm:ml-2">
                            {cs.subtitle}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#1A110D] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-6 pt-2 border-t border-[rgba(26,17,13,0.2)] bg-white space-y-5 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-4 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-xl">
                            <span className="text-xs font-extrabold font-heading tracking-tight text-[#1A110D] block mb-2">
                              The Critical Challenge
                            </span>
                            <p className="text-xs text-[#4A3B35] leading-relaxed">
                              {cs.challenge}
                            </p>
                          </div>

                          <div className="p-4 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-xl">
                            <span className="text-xs font-extrabold font-heading tracking-tight text-[#1A110D] block mb-2">
                              Strategic VAC Intervention
                            </span>
                            <p className="text-xs text-[#4A3B35] leading-relaxed">
                              {cs.strategy}
                            </p>
                          </div>

                          <div className="p-4 bg-[#F5F0ED] border border-[#9EC8ED]/40 rounded-xl">
                            <span className="text-xs font-extrabold font-heading tracking-tight text-[#1A110D] block mb-2">
                              Operational Outcome
                            </span>
                            <p className="text-xs text-[#1A110D] font-medium leading-relaxed">
                              {cs.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9B. VERIFIED CLIENT REVIEWS & TESTIMONIALS (Bento Grid Layout & Hover Lift) */}
        <ReviewsBentoSection />

        {/* 10. CREDENTIALS & LEGAL TRUST (Authority Footnote Cards) */}
        <section id="credentials" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider lowercase text-[#4A3B35] inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/15">
                  <IosEmoji name="white-heart" alt="🤍" className="w-2.5 h-2.5" />
                </span>
                <span>institutional trust &amp; compliance · continuously operating since january 2024</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase mt-2 tracking-tight leading-tight">
                credentials &amp; <span className="font-editorial-italic font-semibold text-[#EF516F]">legal foundation</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
                Virtually Ask Cath (VAC) is an officially registered, compliant consultancy personally operated and directed by Cathy Mae Zamora, delivering high-ticket creator operations continuously since January 2024 (marking 3 solid years of dedicated expertise as of 2027).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Owner & Lead */}
              <div className="card-lift bg-[#F5F0ED] border border-[#9EC8ED]/40 hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.2)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EF516F]/15 text-[#EF516F] flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B35] block">
                    Leadership & Longevity
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mt-1 mb-2">
                    Cathy Mae Zamora
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EF516F]/15 text-[#EF516F] text-[11px] font-semibold uppercase tracking-wider rounded-xl mb-3">
                    Operating Continuously Since Jan 2024 (3 Solid Years)
                  </div>
                  <p className="text-xs text-[#4A3B35] leading-relaxed mb-4">
                    Owner, Lead Strategist & Creator Operations Lead. Delivering high-ticket creator operations continuously since January 2024 (marking 3 solid years of expertise as of 2027). Personally handles discovery, strategy, deal structuring, and contract negotiations.
                  </p>
                </div>
                <div className="text-[11px] text-[#4A3B35] pt-4 border-t border-[rgba(26,17,13,0.15)]">
                  3 Solid Years of continuous operations since Jan 2024 · Audit-grade rigor.
                </div>
              </div>

              {/* Card 2: DTI Registration */}
              <div className="card-lift bg-[#F5F0ED] border border-[#9EC8ED]/40 hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.2)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EF516F]/15 text-[#EF516F] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B35] block">
                    Business Registration
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mt-1 mb-2">
                    dti registered enterprise
                  </h3>
                  <div className="text-xs text-[#1A110D] space-y-1.5 mb-4">
                    <p><strong>Business Name:</strong> Virtually Ask Cath (VAC)</p>
                    <p><strong>BN No.:</strong> 8435804</p>
                    <p><strong>Validity:</strong> Valid thru August 2031</p>
                    <p><strong>Scope:</strong> National Business Name Scope</p>
                  </div>
                </div>
                <div className="text-[11px] text-[#4A3B35] pt-4 border-t border-[rgba(26,17,13,0.15)]">
                  Registered under Department of Trade and Industry, Philippines.
                </div>
              </div>

              {/* Card 3: Academic & Compliance Foundation */}
              <div className="card-lift bg-[#F5F0ED] border border-[#9EC8ED]/40 hover:border-[#EF516F] p-6 sm:p-8 rounded-[20px] shadow-sm hover:shadow-[0_12px_28px_rgba(239,81,111,0.2)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EF516F]/15 text-[#EF516F] flex items-center justify-center mb-4">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B35] block">
                    Audit & Compliance
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight mt-1 mb-2">
                    accountancy &amp; tax background
                  </h3>
                  <div className="text-xs text-[#1A110D] space-y-1.5 mb-4">
                    <p><strong>Education:</strong> BS Accountancy (Holy Trinity College)</p>
                    <p><strong>Audit Experience:</strong> SGV & Co. (General Santos City)</p>
                    <p><strong>Tax Compliance:</strong> BIR Registered professional compliance</p>
                    <p className="text-[11px] text-[#4A3B35] italic">
                      *Note: Invoicing and operational services are managed with strict separation from official registration credentials.
                    </p>
                  </div>
                </div>
                <div className="text-[11px] text-[#4A3B35] pt-4 border-t border-[rgba(26,17,13,0.15)]">
                  Strict accounting standards applied to commercial agreements.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FOOTER & FINAL CALL TO ACTION */}
        <section className="py-20 sm:py-24 lg:py-28 bg-[#1A110D] text-[#F5F0ED] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#EF516F] mb-4">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EF516F]/20">
                <IosEmoji name="love-letter" alt="💌" className="w-2.5 h-2.5" />
              </span>
              <span className="tracking-wide lowercase">scale with absolute peace of mind</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading lowercase tracking-tight max-w-2xl mx-auto leading-tight mb-6 text-[#F5F0ED]">
              ready to stop drowning in admin &amp; <span className="font-editorial-italic font-semibold text-[#EF516F]">scale your revenue?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F5F0ED]/85 max-w-xl mx-auto font-normal leading-relaxed mb-10">
              Partner with Cathy Mae Zamora and VAC for high-impact boutique creator operations, contract defense, and predictable revenue scaling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
              <a
                href="#calculator"
                className="btn-interactive-coral group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold lowercase tracking-wider text-white bg-[#EF516F] hover:bg-white hover:text-[#1A110D] transition-all duration-300 rounded-[20px] shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>book your discovery call</span>
              </a>
              <a
                href="mailto:cathymaezamora2104@gmail.com"
                className="btn-lift group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-bold lowercase tracking-wider text-white bg-white/10 hover:bg-[#9EC8ED] hover:text-[#1A110D] border border-white/20 transition-all duration-300 rounded-[20px]"
              >
                <Mail className="w-4 h-4 text-[#9EC8ED] group-hover:text-[#1A110D] transition-colors" />
                <span>email Cathy directly</span>
              </a>
            </div>

            {/* Direct Social Channels & Reachout Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="text-xs font-semibold text-[#F5F0ED]/70 lowercase">
                direct channels:
              </span>

              {/* Gmail Direct */}
              <a
                href="mailto:cathymaezamora2104@gmail.com?subject=Inquiry%20from%20Virtually%20Ask%20Cath%20Portfolio"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#EF516F] hover:text-white border border-white/20 text-[#F5F0ED] text-xs font-medium transition-all duration-300 group shadow-sm"
                title="Email Cathy at cathymaezamora2104@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-[#EF516F] group-hover:text-white transition-colors" />
                <span>gmail</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/cathy-mae-zamora-9459872a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#0A66C2] hover:text-white border border-white/20 text-[#F5F0ED] text-xs font-medium transition-all duration-300 group shadow-sm"
                title="Connect with Cathy on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#9EC8ED] group-hover:text-white transition-colors" />
                <span>linkedin</span>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/cathyzamora_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-[#1A110D] border border-white/20 text-[#F5F0ED] text-xs font-medium transition-all duration-300 group shadow-sm"
                title="Follow @cathyzamora_ on X"
              >
                <svg className="w-3.5 h-3.5 text-[#F5F0ED] group-hover:text-[#1A110D] fill-current transition-colors" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>x.com</span>
              </a>
            </div>


            {/* Editorial Sign-off Note */}
            <p className="font-script text-3xl sm:text-4xl text-[#EF516F] mb-10 font-bold tracking-wide">
              “p.s. i’m rooting for you ♡”
            </p>

            {/* Quiet Footer Footnotes */}
            <div className="border-t border-white/15 pt-10 text-xs text-[#F5F0ED]/75 space-y-4">
              <div className="flex flex-wrap justify-center gap-6 font-medium text-white/80 lowercase">
                <a href="#about" className="hover:text-[#EF516F] transition-colors">about</a>
                <a href="#expertise" className="hover:text-[#EF516F] transition-colors">expertise</a>
                <a href="#team" className="hover:text-[#EF516F] transition-colors">team</a>
                <a href="#roster" className="hover:text-[#EF516F] transition-colors font-medium">collaborations</a>
                <a href="#calculator" className="hover:text-[#EF516F] transition-colors">calculator</a>
                <a href="#workflows" className="hover:text-[#EF516F] transition-colors">workflows</a>
                <a href="#services" className="hover:text-[#EF516F] transition-colors">services</a>
                <a href="#case-studies" className="hover:text-[#EF516F] transition-colors">case studies</a>
                <a href="#reviews" className="hover:text-[#EF516F] transition-colors">reviews</a>
                <a href="#credentials" className="hover:text-[#EF516F] transition-colors">credentials</a>
              </div>

              <p className="text-[11px] leading-relaxed max-w-2xl mx-auto text-[#F5F0ED]/70">
                Virtually Ask Cath (VAC) is a private, bespoke creator management and operations agency personally owned and led by Cathy Mae Zamora, operating continuously since January 2024 (marking 3 solid years of dedicated high-ticket creator operations as of 2027). DTI Certificate of Business Name Registration No. 8435804 (valid through August 2031). Invoicing operations are provided as independent client administrative services and maintained separate from official registration credentials.
              </p>

              <div className="text-[11px] text-[#F5F0ED]/50 pt-2">
                © {new Date().getFullYear()} Cathy Mae Zamora · Virtually Ask Cath (VAC). All rights reserved.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
