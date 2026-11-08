import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  ZoomIn,
  X,
  MessageSquare,
  Mail,
  Linkedin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  category: 'ugc' | 'founder' | 'agency';
  platform: 'x' | 'linkedin' | 'upwork' | 'email' | 'chat';
  platformLabel: string;
  avatar?: string;
  quote: string;
  date?: string;
  rating?: number;
  highlightMetric?: string;
  screenshot: string;
  screenshots?: { src: string; caption: string }[];
  accentColor?: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: 'jaclyn-forero',
    name: 'Jaclyn Forero',
    role: 'UGC Creator + Creative Strategist · @jaclynforero',
    category: 'ugc',
    platform: 'x',
    platformLabel: 'X (Twitter)',
    avatar: '/assets/aistudio/jaclyn_forero_05bb126a.jpg',
    quote:
      'My VA helps me manage all the apps, emails, and outreach. Couldn’t do it without her. @cathyzamora_ — She secured 100+ deals on InSense (4.7 rating), 43 on Cohley, 40+ on Upwork, and even a $2k+ influencer mattress deal!',
    date: 'Verified Creator Partner',
    rating: 5,
    highlightMetric: '100+ InSense Deals · $2k Collabs',
    screenshot: '/assets/aistudio/Jaclyn_Forero_e6f0e0db.png',
    screenshots: [
      {
        src: '/assets/aistudio/Jaclyn_Forero_e6f0e0db.png',
        caption: '100+ Deals on InSense, Cohley, and Upwork outreach management'
      },
      {
        src: '/assets/aistudio/Jaclyn_Forero_3_ec5392ed.png',
        caption: 'Huge shoutout to Cathy: "Gets me amazing UGC deals & keeps me organized"'
      },
      {
        src: '/assets/aistudio/Jaclyn_Forero_4_eb058429.png',
        caption: 'Secured $2,000+ high-ticket brand collaboration upgrade'
      }
    ]
  },
  {
    id: 'samuel-wyndham',
    name: 'Samuel Wyndham',
    role: 'Solutions Architect & Tech Advocate · 1st Connection',
    category: 'founder',
    platform: 'linkedin',
    platformLabel: 'LinkedIn Recommendation',
    avatar: '/assets/aistudio/imgi_1_1777514872565_8ea6f590.png',
    quote:
      'I worked with Cathy for over a year during which time Cathy was able to work independently and master many business systems. I would happily work with her again and would recommend using her services for tasks big and small - she is able to learn new things really easily and is a pleasure to work with.',
    date: 'May 19, 2025 · Direct Manager',
    rating: 5,
    highlightMetric: '1+ Year Long-Term Retainer',
    screenshot: '/assets/aistudio/Samuel_Wyndham_68d85786.png'
  },
  {
    id: 'pink-shell-studio',
    name: 'Pink Shell Studio',
    role: 'UGC Agency · @PinkShellStudio',
    category: 'agency',
    platform: 'x',
    platformLabel: 'X (Twitter) Verified',
    avatar: '/assets/aistudio/Pink_Shell_Studio_Logo_d2a7857d.jpg',
    quote:
      'Creators looking for a VA, I can highly recommend @cathyzamora_ who has done a great job for us recently! #ugccommunity #ugc',
    date: 'Jul 11, 2025 · 1,286 Views',
    rating: 5,
    highlightMetric: 'Agency Endorsement',
    screenshot: '/assets/aistudio/Pink_Shell_Studio_0c09e612.png'
  },
  {
    id: 'jan-avila',
    name: 'Jan Avila',
    role: 'Bilingual UGC Creator · @creatingwithjan',
    category: 'ugc',
    platform: 'x',
    platformLabel: 'X (Twitter)',
    avatar: '/assets/aistudio/jan_avila_avatar.png',
    quote:
      '@cathyzamora_, my virtual assistant, changed the game for me when we started working together. she got me multiple collabs with big name brands on cohley & insense after i had been on those platforms for months with no luck 🥹 she’s also able to manage day to day tasks for me & remind me of little, but important things that are easy to for me to forget. she has been a great addition to my team, im so thankful for her! 💕',
    date: 'Jun 12, 2025 · Verified Tweet',
    rating: 5,
    highlightMetric: 'Multiple Cohley & InSense Collabs',
    screenshot: '/assets/aistudio/Jan_Avila_7c22b637.png'
  },
  {
    id: 'jessica-millis',
    name: 'Jessica Millis',
    role: 'UGC Creator | Ad Creatives · byjesskay.com',
    category: 'ugc',
    platform: 'email',
    platformLabel: 'Direct Client Email Review',
    avatar: '/assets/aistudio/Jessica_Millis_c23627e3.jpg',
    quote:
      'Cathy got me some really good deals right off the bat, she has clear communication and works hard to get you your desired results. It was a pleasure working with her as my first VA.',
    date: 'Direct Client Review',
    rating: 5,
    highlightMetric: 'Instant Deal Acceleration',
    screenshot: '/assets/aistudio/Jessica_Millis_0b094130.png'
  },
  {
    id: 'mattias-johanna',
    name: 'Mattias & Johanna',
    role: 'Everbound Explorers · Digital Founders',
    category: 'founder',
    platform: 'upwork',
    platformLabel: 'Upwork 5.0 Star Contract',
    avatar: '/assets/aistudio/imgi_2_473990524_593110870190238_8661038198604882527_n_180405c7.jpg',
    quote:
      'Super happy to work with Cathy! She listened to all our request and needs and managed to provide a great design for our site. She even put up with all [our requests]. A pleasure to work with!',
    date: 'May 2, 2025 · 5.0 Star Verified',
    rating: 5,
    highlightMetric: '5.0 / 5.0 Rating',
    screenshot: '/assets/aistudio/Mattias___Johanna_-_Everbound_Explorers_8f06fe31.png'
  },
  {
    id: 'angelene-susana',
    name: 'Angelene Susana',
    role: 'Content Creator & Brand Partner',
    category: 'ugc',
    platform: 'chat',
    platformLabel: 'Direct Client Chat Receipt',
    avatar: '/assets/aistudio/angelene_susasna_cca921d0.jpg',
    quote:
      'Cathy has been such an amazing VA, very communicative and she’s also polite and professional!',
    date: 'Verified Client Chat',
    rating: 5,
    highlightMetric: 'Polite & Professional Operations',
    screenshot: '/assets/aistudio/Angelene_Susana_3e294323.png'
  },
  {
    id: 'michael-stockin',
    name: 'Michael Stockin (Mike Stock)',
    role: 'Founder & Commercial Executive',
    category: 'founder',
    platform: 'chat',
    platformLabel: 'Direct Founder Messaging',
    avatar: '/assets/aistudio/michael_stockin_avatar.png',
    quote:
      'Thanks Cathy! You’re wonderful. I was just telling my dad yesterday about how great it has been working with someone from the Philippines like you. I definitely want to go back into business at some point in the future and do a business model with more people overseas. 🥹',
    date: 'Verified Client Message',
    rating: 5,
    highlightMetric: 'Global Operations Trust',
    screenshot: '/assets/aistudio/Michael_Stockin_6df3fbf9.png'
  }
];

export const ReviewsBentoSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ugc' | 'founder' | 'agency'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [activeJaclynScreenshot, setActiveJaclynScreenshot] = useState(0);

  const filteredReviews = reviewsData.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.category === selectedFilter;
  });

  const renderPlatformIcon = (platform: ReviewItem['platform']) => {
    switch (platform) {
      case 'x':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />;
      case 'upwork':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#14A800]" />;
      case 'email':
        return <Mail className="w-3.5 h-3.5 text-[#EF516F]" />;
      case 'chat':
        return <MessageSquare className="w-3.5 h-3.5 text-[#9EC8ED]" />;
      default:
        return <Star className="w-3.5 h-3.5 text-[#EF516F]" />;
    }
  };

  /* Render Card Components */
  const renderJaclynCard = (keyPrefix = 'jaclyn') => (
    <div
      key={`${keyPrefix}-jaclyn`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/jaclyn_forero_05bb126a.jpg"
              alt="Jaclyn Forero"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EF516F]/25 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Jaclyn Forero
                </h3>
                <span className="inline-flex items-center text-blue-500" title="Verified Creator">
                  <CheckCircle2 className="w-4 h-4 fill-blue-500 text-white" />
                </span>
              </div>
              <p className="text-xs text-[#4A3B35]">
                UGC Creator + Creative Strategy · <span className="font-medium text-[#1A110D]">@jaclynforero</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F0ED] rounded-full border border-[rgba(26,17,13,0.08)] text-[11px] font-semibold text-[#1A110D] shrink-0">
            {renderPlatformIcon('x')}
            <span>3 Tweets</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-xs font-bold text-[#1A110D] ml-2">100+ Deals Secured</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#1A110D] leading-relaxed mb-4 font-normal">
          “My VA helps me manage all the apps, emails, and outreach. <strong className="font-semibold text-[#EF516F]">Couldn't do it without her. @cathyzamora_</strong> Huge shoutout to Cathy for being an incredible VA—she gets me amazing UGC deals, keeps me organized, and secured an influencer collaboration for over $2k!”
        </blockquote>
      </div>

      <div className="bg-[#F5F0ED] p-3 rounded-xl border border-[rgba(26,17,13,0.08)] mt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A3B35] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#EF516F]" />
            Verified Receipts
          </span>
          <div className="flex gap-1">
            {reviewsData[0].screenshots?.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveJaclynScreenshot(idx);
                }}
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-all ${
                  activeJaclynScreenshot === idx
                    ? 'bg-[#1A110D] text-white'
                    : 'bg-white text-[#4A3B35] hover:bg-white/80'
                }`}
              >
                #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative rounded-lg overflow-hidden border border-black/10 bg-white group/shot cursor-pointer"
          onClick={() =>
            setLightboxImage({
              src: reviewsData[0].screenshots![activeJaclynScreenshot].src,
              title: `Jaclyn Forero - Receipt #${activeJaclynScreenshot + 1}`
            })
          }
        >
          <img
            src={reviewsData[0].screenshots![activeJaclynScreenshot].src}
            alt="Jaclyn Forero Verified Tweet Proof"
            className="w-full h-36 object-contain bg-white transition-transform duration-300 group-hover/shot:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
            <ZoomIn className="w-4 h-4" />
            <span>Click to Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSamuelCard = (keyPrefix = 'samuel') => (
    <div
      key={`${keyPrefix}-samuel`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/imgi_1_1777514872565_8ea6f590.png"
              alt="Samuel Wyndham"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#0A66C2]/30 shadow-sm shrink-0"
            />
            <div>
              <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                Samuel Wyndham
              </h3>
              <p className="text-xs text-[#4A3B35]">Solutions Architect · 1st Connection</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] shrink-0" title="LinkedIn Recommendation">
            <Linkedin className="w-4 h-4 fill-current" />
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">1+ Year Direct Retainer</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “I worked with Cathy for over a year during which time Cathy was able to work independently and master many business systems. I would happily work with her again and would recommend using her services for tasks big and small - she is able to learn new things really easily and is a pleasure to work with.”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Samuel_Wyndham_68d85786.png',
            title: 'Samuel Wyndham - LinkedIn Recommendation'
          })
        }
      >
        <img
          src="/assets/aistudio/Samuel_Wyndham_68d85786.png"
          alt="Samuel Wyndham LinkedIn Recommendation Screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderPinkShellCard = (keyPrefix = 'pinkshell') => (
    <div
      key={`${keyPrefix}-pinkshell`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Pink_Shell_Studio_Logo_d2a7857d.jpg"
              alt="Pink Shell Studio Logo"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-500/20 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Pink Shell Studio
                </h3>
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white" />
              </div>
              <p className="text-xs text-[#4A3B35]">UGC Agency · @PinkShellStudio</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#1A110D]/5 text-[#1A110D] shrink-0" title="X Post">
            {renderPlatformIcon('x')}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">Agency Partner</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “Creators looking for a VA, I can highly recommend <strong className="font-semibold text-[#EF516F]">@cathyzamora_</strong> who has done a great job for us recently! #ugccommunity #ugc”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Pink_Shell_Studio_0c09e612.png',
            title: 'Pink Shell Studio - Verified Tweet Recommendation'
          })
        }
      >
        <img
          src="/assets/aistudio/Pink_Shell_Studio_0c09e612.png"
          alt="Pink Shell Studio Tweet Recommendation Screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderJanAvilaCard = (keyPrefix = 'jan') => (
    <div
      key={`${keyPrefix}-jan`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/jan_avila_avatar.png"
              alt="Jan Avila"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EF516F]/30 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                  Jan Avila 🇲🇽
                </h3>
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white" />
              </div>
              <p className="text-xs text-[#4A3B35]">Bilingual UGC Creator · @creatingwithjan</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#1A110D]/5 text-[#1A110D] shrink-0">
            {renderPlatformIcon('x')}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">Game-Changing Growth</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “@cathyzamora_, my virtual assistant, changed the game for me when we started working together. she got me multiple collabs with big name brands on cohley &amp; insense... she has been a great addition to my team, im so thankful for her! 💕”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Jan_Avila_7c22b637.png',
            title: 'Jan Avila - Verified Tweet Endorsement'
          })
        }
      >
        <img
          src="/assets/aistudio/Jan_Avila_7c22b637.png"
          alt="Jan Avila Verified Tweet Endorsement Screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderJessicaMillisCard = (keyPrefix = 'jessica') => (
    <div
      key={`${keyPrefix}-jessica`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Jessica_Millis_c23627e3.jpg"
              alt="Jessica Millis UGC Creator"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EF516F]/20 shrink-0"
            />
            <div>
              <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                Jessica Millis
              </h3>
              <p className="text-xs text-[#4A3B35]">UGC Creator · byjesskay.com</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#EF516F]/10 text-[#EF516F] shrink-0" title="Direct Email Review">
            <Mail className="w-4 h-4" />
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">First-Time VA Success</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “Cathy got me some really good deals right off the bat, she has clear communication and works hard to get you your desired results. It was a pleasure working with her as my first VA.”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Jessica_Millis_0b094130.png',
            title: 'Jessica Millis - Client Email Review'
          })
        }
      >
        <img
          src="/assets/aistudio/Jessica_Millis_0b094130.png"
          alt="Jessica Millis Email Review Screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderMattiasJohannaCard = (keyPrefix = 'mattias') => (
    <div
      key={`${keyPrefix}-mattias`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/imgi_2_473990524_593110870190238_8661038198604882527_n_180405c7.jpg"
              alt="Mattias &amp; Johanna - Everbound Explorers"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#14A800]/30 shadow-sm shrink-0"
            />
            <div>
              <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                Mattias &amp; Johanna
              </h3>
              <p className="text-xs text-[#4A3B35]">Everbound Explorers · Web Design</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#14A800]/10 text-[#14A800] shrink-0" title="Upwork Verified">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#14A800] text-[#14A800]" />
          ))}
          <span className="text-[11px] font-bold text-[#14A800] ml-1.5">5.0 Fixed Price Contract</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “Super happy to work with Cathy! She listened to all our request and needs and managed to provide a great design for our site. She even put up with all [our requests]. A pleasure to work with!”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Mattias___Johanna_-_Everbound_Explorers_8f06fe31.png',
            title: 'Mattias & Johanna - Upwork 5.0 Star Review'
          })
        }
      >
        <img
          src="/assets/aistudio/Mattias___Johanna_-_Everbound_Explorers_8f06fe31.png"
          alt="Upwork 5-star review from Mattias and Johanna"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderAngeleneCard = (keyPrefix = 'angelene') => (
    <div
      key={`${keyPrefix}-angelene`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/angelene_susasna_cca921d0.jpg"
              alt="Angelene Susana"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EF516F]/30 shadow-sm shrink-0"
            />
            <div>
              <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                Angelene Susana
              </h3>
              <p className="text-xs text-[#4A3B35]">Content Creator · Direct Client</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#9EC8ED]/20 text-[#1A110D] shrink-0" title="Direct Chat">
            <MessageSquare className="w-4 h-4" />
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">Polite &amp; Professional</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “Cathy has been such an amazing VA, very communicative and she's also polite and professional! 👍 ❤️ 🥳”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Angelene_Susana_3e294323.png',
            title: 'Angelene Susana - Direct Client Feedback'
          })
        }
      >
        <img
          src="/assets/aistudio/Angelene_Susana_3e294323.png"
          alt="Angelene Susana chat screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderMichaelStockinCard = (keyPrefix = 'michael') => (
    <div
      key={`${keyPrefix}-michael`}
      className="bento-card flex flex-col justify-between group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/michael_stockin_avatar.png"
              alt="Michael Stockin"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#9EC8ED]/40 shadow-sm shrink-0"
            />
            <div>
              <h3 className="text-base font-extrabold text-[#1A110D] font-heading tracking-tight">
                Michael Stockin
              </h3>
              <p className="text-xs text-[#4A3B35]">Client Executive &amp; Founder</p>
            </div>
          </div>

          <span className="p-1.5 rounded-full bg-[#1A110D]/5 text-[#1A110D] shrink-0" title="Direct Message">
            <MessageSquare className="w-4 h-4" />
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#EF516F] text-[#EF516F]" />
          ))}
          <span className="text-[11px] font-bold text-[#1A110D] ml-1.5">Executive Trust</span>
        </div>

        <blockquote className="text-xs sm:text-sm text-[#4A3B35] leading-relaxed mb-4">
          “Thanks Cathy! You’re wonderful. I was just telling my dad yesterday about how great it has been working with someone from the Philippines like you. I definitely want to do a business model with more people overseas.”
        </blockquote>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-black/10 bg-[#F5F0ED] group/img cursor-pointer"
        onClick={() =>
          setLightboxImage({
            src: '/assets/aistudio/Michael_Stockin_6df3fbf9.png',
            title: 'Michael Stockin - Direct Client Message'
          })
        }
      >
        <img
          src="/assets/aistudio/Michael_Stockin_6df3fbf9.png"
          alt="Michael Stockin messaging feedback screenshot"
          className="w-full h-32 object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
          <ZoomIn className="w-4 h-4" />
          <span>View Proof</span>
        </div>
      </div>
    </div>
  );

  const renderFeatureCard = (keyPrefix = 'feature') => (
    <div
      key={`${keyPrefix}-feature`}
      className="bento-card bg-gradient-to-br from-[#1A110D] to-[#2B1D16] text-[#F5F0ED] flex flex-col justify-between p-6"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-[#EF516F]">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Operations Standard</span>
          </div>
          <img
            src="/assets/aistudio/VAC-Logo-Trimmed.png"
            alt="VAC"
            className="h-5 sm:h-5.5 w-auto object-contain brightness-0 invert opacity-95 select-none"
          />
        </div>
        <h3 className="text-xl font-extrabold font-heading tracking-tight mb-2 text-white">
          Zero Hidden Fees. 100% Retainer Protection.
        </h3>
        <p className="text-xs text-[#F5F0ED]/80 leading-relaxed mb-6 font-normal">
          Every review represents a real contract protected, pitch engine deployed, or revenue milestone secured by Cathy Mae Zamora and VAC.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xl font-extrabold text-[#EF516F] font-mono-numbers block">
              3+ Years
            </span>
            <span className="text-[10px] text-[#F5F0ED]/70 uppercase tracking-wider block mt-0.5">
              Continuous Operations
            </span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xl font-extrabold text-[#9EC8ED] font-mono-numbers block">
              5.0 / 5.0
            </span>
            <span className="text-[10px] text-[#F5F0ED]/70 uppercase tracking-wider block mt-0.5">
              Verified Client Satisfaction
            </span>
          </div>
        </div>
      </div>

      <a
        href="#calculator"
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#EF516F] hover:bg-white hover:text-[#1A110D] rounded-full transition-all duration-300 mt-2 text-center"
      >
        <span>Calculate Your Monthly Retainer</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );

  return (
    <section id="reviews" className="py-20 sm:py-24 lg:py-28 bg-[#F5F0ED] border-y border-[rgba(26,17,13,0.12)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[rgba(26,17,13,0.1)] text-xs font-semibold text-[#EF516F] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EF516F]" />
            <span className="tracking-wider uppercase text-[10px]">Verified Proof &amp; Real Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A110D] font-heading lowercase tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-2">
            <span>what creators &amp; founders</span>
            <span className="font-editorial-italic font-semibold text-[#EF516F]">say about</span>
            <img
              src="/assets/aistudio/VAC-Logo-Trimmed.png"
              alt="VAC · Virtually Ask Cath"
              className="h-7 sm:h-9 md:h-10 lg:h-11 w-auto inline-block object-contain -mt-1 select-none transition-transform duration-200 hover:scale-105"
            />
          </h2>

          <p className="font-script text-2xl sm:text-3xl text-[#EF516F] font-bold mt-2 tracking-wide">
            “unfiltered receipts from clients who scale with us ♡”
          </p>

          <p className="text-sm sm:text-base text-[#4A3B35] mt-3 font-normal leading-relaxed">
            Real screenshot receipts, direct tweets, LinkedIn recommendations, and messaging feedback from clients working directly with Cathy Mae Zamora and our boutique operations desk.
          </p>

          {/* View Mode & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex p-1 bg-white border border-[rgba(26,17,13,0.1)] rounded-[20px] shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('marquee')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[16px] transition-all ${
                  viewMode === 'marquee'
                    ? 'bg-[#EF516F] text-white shadow-sm'
                    : 'text-[#4A3B35] hover:text-[#1A110D]'
                }`}
              >
                Auto-Scrolling Feed (Live)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[16px] transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#EF516F] text-white shadow-sm'
                    : 'text-[#4A3B35] hover:text-[#1A110D]'
                }`}
              >
                Full Bento Grid
              </button>
            </div>
            <span className="text-[11px] text-[#4A3B35] font-light italic">
              {viewMode === 'marquee'
                ? '• Hover feed to pause scrolling · Click any receipt to inspect'
                : '• All 8 Verified Reviews & Endorsements'}
            </span>
          </div>

          {/* Category Filter Pills (When Grid Mode is Selected) */}
          {viewMode === 'grid' && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-200">
              {[
                { id: 'all', label: 'All Reviews (8)' },
                { id: 'ugc', label: 'UGC & Creators' },
                { id: 'founder', label: 'Founders & Execs' },
                { id: 'agency', label: 'Agencies' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 lowercase tracking-wide ${
                    selectedFilter === tab.id
                      ? 'bg-[#1A110D] text-white shadow-xs'
                      : 'bg-white text-[#4A3B35] border border-[rgba(26,17,13,0.08)] hover:border-[#EF516F] hover:text-[#EF516F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MODE 1: CONTINUOUS AUTO-SCROLLING VERTICAL MARQUEE FEED (30s infinite scroll, pauses on hover) */}
        {viewMode === 'marquee' && (
          <div className="reviews-scroll-container rounded-2xl relative">
            {/* Top & Bottom Luxury Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#F5F0ED] via-[#F5F0ED]/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#F5F0ED] via-[#F5F0ED]/90 to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-2">
              
              {/* COLUMN 1: Upward Continuous Track */}
              <div className="reviews-track">
                {[
                  renderJaclynCard('c1-a'),
                  renderPinkShellCard('c1-a'),
                  renderMattiasJohannaCard('c1-a'),
                  renderJaclynCard('c1-b'),
                  renderPinkShellCard('c1-b'),
                  renderMattiasJohannaCard('c1-b')
                ]}
              </div>

              {/* COLUMN 2: Upward Continuous Track (Staggered Speed for organic flow) */}
              <div className="reviews-track-slow hidden md:flex">
                {[
                  renderSamuelCard('c2-a'),
                  renderJanAvilaCard('c2-a'),
                  renderMichaelStockinCard('c2-a'),
                  renderSamuelCard('c2-b'),
                  renderJanAvilaCard('c2-b'),
                  renderMichaelStockinCard('c2-b')
                ]}
              </div>

              {/* COLUMN 3: Upward Continuous Track */}
              <div className="reviews-track hidden lg:flex">
                {[
                  renderJessicaMillisCard('c3-a'),
                  renderAngeleneCard('c3-a'),
                  renderFeatureCard('c3-a'),
                  renderJessicaMillisCard('c3-b'),
                  renderAngeleneCard('c3-b'),
                  renderFeatureCard('c3-b')
                ]}
              </div>

            </div>
          </div>
        )}

        {/* MODE 2: STATIC FULL BENTO GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="bento-grid-container animate-in fade-in duration-300">
            {(selectedFilter === 'all' || selectedFilter === 'ugc') && renderJaclynCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'founder') && renderSamuelCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'agency') && renderPinkShellCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'ugc') && renderJanAvilaCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'ugc') && renderJessicaMillisCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'founder') && renderMattiasJohannaCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'ugc') && renderAngeleneCard('grid')}
            {(selectedFilter === 'all' || selectedFilter === 'founder') && renderMichaelStockinCard('grid')}
            {renderFeatureCard('grid')}
          </div>
        )}

      </div>

      {/* FULL-SIZE SCREENSHOT LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,17,13,0.1)] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EF516F]" />
                <h4 className="text-sm sm:text-base font-extrabold text-[#1A110D] font-heading">
                  {lightboxImage.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#1A110D] transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-[#F5F0ED] rounded-xl p-2 sm:p-4">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>

            <div className="pt-3 text-center">
              <span className="text-xs text-[#4A3B35]">
                Verified client screenshot receipt · All rights reserved to respective creators &amp; Virtually Ask Cath
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsBentoSection;
