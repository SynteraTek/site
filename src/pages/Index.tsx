import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout, scrollTo, NAV_ITEMS } from '@/components/layout/Layout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';
import {
  Link as LinkIcon, Download, GitBranch, BookOpen, ArrowRight, Twitter, Linkedin, Instagram,
  Menu, Plus, Network, Layers, Repeat, Activity, MessageCircle, Star, Check,
  ChevronDown, Mail, MapPin, Phone, ArrowUpRight, X, Play, Users, Zap, Globe,
  Database, RefreshCw, Server, AlertCircle, Terminal, Facebook
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { toast } from 'sonner';
import { useInView, useActiveSection, useCountUp } from '@/hooks/use-scroll-animation';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';



// Stagger children animation wrapper
const StaggerContainer = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
    }}
  >
    {children}
  </motion.div>
);

const FadeUp = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

const ScaleIn = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Mobile Menu ────────────────────────────────────────────────
const MobileMenu = ({ isOpen, onClose, activeSection, onNavClick }: { isOpen: boolean; onClose: () => void; activeSection: string; onNavClick: (id: string) => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm z-[100] liquid-glass-strong flex flex-col"
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" className="w-32 h-10 object-contain" />
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:scale-105 transition-transform">
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <button
                    onClick={() => { onNavClick(item.id); scrollTo(item.id); onClose(); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="p-6">
            <Link to="/synterax" onClick={onClose}>
              <button className="w-full liquid-glass-strong rounded-full py-4 text-white font-medium hover:scale-105 active:scale-95 transition-transform">
                SynteraX
              </button>
            </Link>
            <div className="flex items-center justify-center gap-4 mt-6">
              {[
                { Icon: XIcon, url: 'https://x.com/synteratek' },
                { Icon: Linkedin, url: '#' },
                { Icon: Facebook, url: 'https://www.facebook.com/synteratek/' }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all"
                >
                  <item.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);



// ─── Hero ─────────────────────────────────────────────────────────
const HeroSection = ({ onMenuOpen, activeSection, onNavClick }: { onMenuOpen: () => void; activeSection: string; onNavClick: (id: string) => void }) => (
  <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" src={VIDEO_SRC} />
    <div className="absolute inset-0 bg-black/30 z-[1]" />

    {/* Left Panel */}
    <div className="relative z-10 w-full lg:w-[52%] min-h-screen flex flex-col p-4 lg:p-6">
      <div className="absolute inset-4 lg:inset-6 liquid-glass-strong rounded-3xl z-0" />

      <nav className="relative z-10 flex items-center justify-between px-6 pt-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-40 h-16 object-contain" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-2">
          {/* Desktop inline nav */}
          <div className="hidden lg:flex items-center gap-1 liquid-glass rounded-full px-2 py-1 mr-2">
            {NAV_ITEMS.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavClick(item.id); scrollTo(item.id); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium relative transition-all duration-300 ${activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="hero-nav-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={onMenuOpen}
            className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm hover:scale-105 transition-transform"
          >
            <Menu size={16} />
            Menu
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">
        <motion.h1
          className="text-5xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.05]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Orchestrating the<br />
          core of <em className="font-serif not-italic text-white/80 italic">Intelligent</em> Workflows
        </motion.h1>
        <Link to="/synterax">
          <motion.button
            className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-white font-medium hover:scale-105 active:scale-95 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SynteraX
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight size={14} />
            </span>
          </motion.button>
        </Link>
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {['System Integration', 'Workflow Sync', 'Business Automation'].map((t, i) => (
            <motion.span
              key={t}
              className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 cursor-pointer hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Right Panel (desktop) */}
    <div className="relative z-10 hidden lg:flex w-[48%] min-h-screen flex-col p-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3">
          {[
            { Icon: XIcon, url: 'https://x.com/synteratek' },
            { Icon: Linkedin, url: '#' },
            { Icon: Facebook, url: 'https://www.facebook.com/synteratek/' }
          ].map((item, i) => (
            <motion.a
              key={i} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <item.Icon size={14} />
            </motion.a>
          ))}
        </div>
        <motion.button className="liquid-glass rounded-full p-3 text-white" whileHover={{ scale: 1.1, rotate: 15 }}>
          <Zap size={16} />
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-6 self-end"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="liquid-glass rounded-2xl p-5 w-56">
          <h3 className="text-white text-sm font-medium mb-1">Enter our ecosystem</h3>
          <p className="text-white/60 text-xs leading-relaxed">Join hundreds of organizations scaling productivity with SynteraTek.</p>
        </div>
      </motion.div>

      <motion.div
        className="mt-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="liquid-glass rounded-[2.5rem] p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { icon: '/hero icons.svg', title: 'Real-time Sync', desc: 'Continuous data flow between platforms' },
              { icon: '/hero icons (2).svg', title: 'Workflow Intel', desc: 'Predictive automation for complex tasks' },
            ].map((card, i) => (
              <motion.div key={card.title} className="liquid-glass rounded-3xl p-5" whileHover={{ scale: 1.03, y: -2 }}>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <img src={card.icon} alt={card.title} className="w-8 h-8 object-contain" />
                </div>
                <h4 className="text-white text-sm font-medium">{card.title}</h4>
                <p className="text-white/50 text-xs mt-1">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="liquid-glass rounded-3xl p-4 flex items-center gap-4" whileHover={{ scale: 1.02 }}>
            <img src="/hero.png" alt="Unified Integration Engine" width={96} height={64} className="w-24 h-16 object-cover rounded-2xl" />
            <div className="flex-1">
              <h4 className="text-white text-sm font-medium">Unified Integration Engine</h4>
              <p className="text-white/50 text-xs mt-1">Connect ERP, CRM, and SaaS in one layer</p>
            </div>
            <motion.button
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0"
              whileHover={{ scale: 1.2, rotate: 90 }}
            >
              <Plus size={14} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Stat Counter ─────────────────────────────────────────────────
const StatCounter = ({ end, suffix, label, className }: { end: number; suffix: string; label: string; className?: string }) => {
  const { ref, isInView } = useInView();
  const count = useCountUp(end, 2000, true, isInView);
  return (
    <div ref={ref} className={className}>
      <p className="text-5xl lg:text-6xl font-medium text-white tracking-tight">{count}{suffix}</p>
      <p className="text-white/50 text-sm mt-2 font-display">{label}</p>
    </div>
  );
};

// ─── About ────────────────────────────────────────────────────────
const AboutSection = () => (
  <section id="about" className="relative py-16 lg:py-24">
    <div className="container max-w-6xl mx-auto px-6">

      {/* ── ROW 1: Brand tag (left) + Big headline (right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-14 items-start mb-8">
        <motion.div
          className="flex items-center gap-2 lg:pt-2 flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Zap size={18} className="text-[#78C3AA]" />
          <span className="text-white/55 text-sm font-medium font-display tracking-tight uppercase">SynteraTek Platform</span>
        </motion.div>

        <motion.h2
          className="text-3xl lg:text-3xl xl:text-3xl font-medium tracking-[-0.03em] text-white leading-[1.2]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          We are SynteraTek - a next-generation integration layer creating unified workflows for modern enterprises with specialized architecture and a global execution focus.
        </motion.h2>
      </div>

      {/* ── ROW 2: 3-column bento grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

        {/* LEFT: Gradient 230+ card */}
        <motion.div
          className="liquid-glass rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group min-h-[400px]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="relative z-10">
            <StatCounter end={230} suffix="+" label="" />
          </div>

          {/* Central Image Focal Point */}
          <motion.div
            className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 my-6 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/about.png"
              alt="Systems Synchronized"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <div className="relative z-10">
            <p className="text-white text-base font-semibold font-display">Systems Synchronized</p>
            <p className="text-white/50 text-xs mt-2 leading-relaxed font-display">Complex ERP/CRM integrations, triggered API events, and data-first automation layers.</p>
          </div>
        </motion.div>

        {/* CENTER: Stacked — Workflow + 98% + Countries */}
        <div className="flex flex-col gap-3">
          {/* Workflow card */}
          <motion.div
            className="liquid-glass rounded-2xl p-5 relative overflow-hidden"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold font-display leading-snug">Cross-Platform Orchestration</p>
                <p className="text-white/45 text-xs mt-1.5 leading-relaxed">From Salesforce to SAP - synchronize state and collaborate instantly.</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0 mt-0.5">
                {[Layers, Zap, Globe].map((Icon, i) => (
                  <motion.div key={i} className="w-6 h-6 liquid-glass rounded-lg flex items-center justify-center" whileHover={{ scale: 1.2 }}>
                    <Icon size={11} className="text-white/65" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 98% stat */}
          <motion.div
            className="liquid-glass-strong rounded-2xl px-6 py-6 relative overflow-hidden flex-1"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-2xl"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <StatCounter end={99} suffix="%" label="" />
            <p className="text-white text-sm font-semibold font-display mt-0.5">Uptime Reliability</p>
            <p className="text-white/40 text-xs mt-2 leading-relaxed">Enterprise-grade SLAs across all modules - we ensure your automation never stops.</p>
          </motion.div>

          {/* Countries */}
          <motion.div
            className="liquid-glass rounded-2xl p-5 relative overflow-hidden"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <p className="text-white text-sm font-semibold font-display mb-1">Global System Monitoring</p>
            <p className="text-white/40 text-[11px] leading-relaxed mb-10 max-w-[180px]">Connecting nodes across the US, Europe, and Asia in a unified intelligent layer.</p>
            {/* Flag stack + count - positioned in right side bottom corner */}
            <div className="absolute bottom-5 right-5 flex items-center">
              {/* 4 overlapping flags */}
              {['us', 'gb', 'de', 'jp'].map((code, i) => (
                <motion.div
                  key={code}
                  className="relative rounded-full overflow-hidden border-2 border-black/40"
                  style={{
                    marginLeft: i === 0 ? 0 : -12,
                    zIndex: i,
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.2, zIndex: 20, y: -2 }}
                >
                  <img
                    src={`https://flagcdn.com/w80/${code}.png`}
                    alt={code}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              {/* 31+ badge (total 35+) */}
              <motion.div
                className="flex items-center justify-center rounded-full text-white text-[10px] font-bold font-display border-2 border-white/20"
                style={{
                  marginLeft: -12,
                  zIndex: 10,
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
              >
                31+
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.div
            className="liquid-glass rounded-3xl p-8 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[400px] group"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="relative z-10">
              <StatCounter end={500} suffix="M" label="" />
            </div>

            <motion.div
              className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 my-6 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/about2.png"
                alt="Data Points Daily"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F1C]/40 via-transparent to-transparent" />
            </motion.div>

            <div className="relative z-10">
              <p className="text-white text-sm font-semibold font-display">Data Points Daily</p>
              <p className="text-white/50 text-xs mt-1.5 leading-relaxed">Our platform handles massive data throughput with zero latency and full integrity.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);


// ─── How It Works ─────────────────────────────────────────────────
const HowItWorksSection = () => {
  const steps = [
    { number: '01', title: 'Connect Your Systems', desc: 'Integrate your essential business tools—CRMs, ERPs, accounting platforms, databases, and communication systems—into a single connected ecosystem. SynteraTek establishes a secure, scalable foundation where all systems can communicate effortlessly.' },
    { number: '02', title: 'Automate Intelligent Workflows', desc: 'Design and deploy cross-platform workflows that move data, trigger actions, and execute processes automatically. Our intelligent orchestration layer ensures real-time synchronization and eliminates manual operations.' },
    { number: '03', title: 'Monitor & Optimize Operations', desc: 'Gain full visibility into your integrations and workflows through a centralized command dashboard. Track performance, analyze workflow execution, and optimize processes using real-time insights and automation intelligence.' },
  ];

  return (
    <section id="how-it-works" className="relative py-20 lg:py-32 overflow-hidden min-h-[80vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE: Headline & Content */}
          <div className="flex flex-col h-full justify-center items-start py-12 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              <h2 className="text-5xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05] mb-6">
                Intelligent Integration <br />
                <span className="text-[#78C3AA]">in Action.</span>
              </h2>
              <p className="text-white/50 text-md max-w-lg font-display leading-relaxed mb-10">
                Unifying your business systems into a single intelligent workflow layer, SynteraEngineX V2.1 automates processes, synchronizes data, and powers operational efficiency across platforms.
              </p>
              
              <motion.button
                onClick={() => scrollTo('pricing')}
                className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-white font-medium hover:scale-105 active:scale-95 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Now
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </motion.button>
            </motion.div>
            
            {/* Background atmospheric glow */}
            <div className="absolute -inset-10 bg-[#78C3AA]/5 rounded-full blur-[120px] opacity-20 pointer-events-none" />
          </div>

          {/* RIGHT SIDE: Perfect Curve & Aligned Text Items */}
          <div className="relative min-h-[600px] flex items-center lg:pl-4">
            <div className="absolute left-0 top-0 h-full w-[240px] pointer-events-none hidden lg:block overflow-visible">
              <svg viewBox="0 0 240 800" className="w-full h-full overflow-visible">
                {/* Background path */}
                <path
                  d="M 60 100 C 260 250, 260 550, 60 700"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Marching Ants Tech Line */}
                <motion.path
                  d="M 60 100 C 260 250, 260 550, 60 700"
                  stroke="#78C3AA"
                  strokeWidth="3"
                  strokeDasharray="12 18"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  animate={{ strokeDashoffset: [0, -60] }}
                  transition={{
                    pathLength: { duration: 2.5, ease: "easeInOut" },
                    strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ opacity: 0.9, filter: 'drop-shadow(0 0 10px rgba(120,195,170,0.4))' }}
                />
              </svg>
            </div>

            {/* Steps Container */}
            <div className="flex flex-col gap-24 lg:gap-32 w-full relative z-20">
              {steps.map((s, i) => (
                <motion.div
                  key={s.number}
                  className={`flex items-center gap-10 lg:gap-14 group relative ${i === 1 ? 'lg:pl-40' : ''}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * i }}
                >
                  {/* The Number Circle - Centered on Arc */}
                  <motion.div
                    className="w-14 h-14 lg:w-20 lg:h-20 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl flex items-center justify-center text-xl lg:text-2xl font-semibold font-display text-white relative group-hover:border-[#78C3AA]/60 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-shrink-0"
                  >
                    {/* Circle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-[#78C3AA]/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    {s.number}
                  </motion.div>

                  {/* The Text Content - Polished Visibility */}
                  <div className="flex-1 transition-all duration-500 max-w-sm">
                    <h3 className="text-2xl lg:text-3xl xl:text-3xl font-medium tracking-tight text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                      {s.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white transition-all duration-500 text-[8px] lg:text-[14px] leading-relaxed font-display drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// ─── Demo Dashboard ───────────────────────────────────────────────
const DemoSection = () => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'historical'>('realtime');
  const [throughput, setThroughput] = useState(6800);
  const [cpuLoad, setCpuLoad] = useState(14.5);
  const [events, setEvents] = useState([
    { id: 1, type: 'Sync', desc: 'SAP -> Salesforce Sync Success', time: 'Just now' },
    { id: 2, type: 'Trigger', desc: 'Auto-invoice generated (ERP)', time: '2s ago' },
    { id: 3, type: 'Shield', desc: 'Zero-Trust Handshake verified', time: '5s ago' },
    { id: 4, type: 'Sync', desc: 'Slack notification dispatched', time: '8s ago' },
  ]);

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => prev + (Math.random() > 0.5 ? 5 : -5));
      setCpuLoad(prev => parseFloat((prev + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { time: '09:00', throughput: 4500 }, { time: '10:00', throughput: 5200 },
    { time: '11:00', throughput: 4800 }, { time: '12:00', throughput: 6100 },
    { time: '13:00', throughput: 5900 }, { time: '14:00', throughput: 7200 },
    { time: '15:00', throughput: throughput },
  ];

  const signals = [
    { name: 'Salesforce API', status: 'Online', latency: '12ms', color: '#78C3AA' },
    { name: 'SAP S/4HANA', status: 'Syncing', latency: '45ms', color: '#white' },
    { name: 'Workday ERP', status: 'Online', latency: '18ms', color: '#78C3AA' },
    { name: 'Azure Active Directory', status: 'Secure', latency: '22ms', color: '#78C3AA' },
  ];

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden bg-black/20">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6"
          >
            <Terminal size={12} className="text-[#78C3AA]" />
            <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Interactive Dashboard</span>
          </motion.div>
          <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-6">
            Intelligent <em className="font-serif italic text-white/80">Command</em> Center
          </h2>
          <p className="text-white/40 text-lg lg:text-xl font-display max-w-2xl mx-auto leading-relaxed">
            A real-time visual logic layer for all your enterprise integrations and automated business workflows.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass-strong rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative"
        >
          {/* Enhanced Header Bar */}
          <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5 cursor-pointer group">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] group-hover:scale-125 transition-transform" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] group-hover:scale-125 transition-transform" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] group-hover:scale-125 transition-transform" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest hidden md:block">Core Engine v4.2.0 (Stable Access)</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#78C3AA]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#78C3AA] animate-ping opacity-75" />
                </div>
                <span className="text-[10px] font-mono text-white/60">Live Feed</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-[10px] font-mono text-white/40">Load: <span className="text-[#78C3AA]">{cpuLoad}%</span></div>
              <div className="text-[10px] font-mono text-white/40">Uptime: 99.9%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">
            {/* Sidebar Stats & Event Log */}
            <div className="lg:col-span-3 p-6 flex flex-col gap-8 bg-black/40 border-r border-white/5">
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Operational Health</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[11px] text-white/60">Sync Efficiency</p>
                      <p className="text-xs font-mono text-[#78C3AA]">99.8%</p>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '99.8%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#78C3AA]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[11px] text-white/60">Data Consistency</p>
                      <p className="text-xs font-mono text-white">100%</p>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-white/20" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Event Log</p>
                <div className="space-y-3 max-h-[180px] overflow-hidden relative">
                  {events.map((e, idx) => (
                    <motion.div 
                      key={e.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1 - idx * 0.2, x: 0 }}
                      className="flex gap-3 text-[10px] p-2.5 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${e.type === 'Shield' ? 'bg-blue-400' : 'bg-[#78C3AA]'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/80 leading-tight">{e.desc}</p>
                        <p className="text-[9px] text-white/30 mt-1 uppercase font-mono">{e.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Signal Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {signals.map((s) => (
                    <motion.div 
                      key={s.name} 
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all text-center group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Syncing' ? 'bg-white animate-pulse' : 'bg-[#78C3AA]'}`} />
                      </div>
                      <p className="text-[10px] text-white/80 font-medium truncate">{s.name.split(' ')[0]}</p>
                      <p className="text-[8px] text-white/30 font-mono mt-1">{s.latency}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content: Advanced Visualizer */}
            <div className="lg:col-span-9 p-6 lg:p-8 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-[#78C3AA]/10 border border-[#78C3AA]/20">
                    <Activity size={20} className="text-[#78C3AA]" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-medium tracking-tight">System Throughput</h3>
                    <p className="text-white/40 text-[11px] font-display">Simulated aggregate of all connected organizational nodes</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 liquid-glass rounded-xl p-1 border border-white/10">
                  <button 
                    onClick={() => setActiveTab('realtime')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-semibold tracking-widest uppercase transition-all ${activeTab === 'realtime' ? 'bg-[#78C3AA] text-black' : 'text-white/40 hover:text-white'}`}
                  >
                    Live
                  </button>
                  <button 
                    onClick={() => setActiveTab('historical')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-semibold tracking-widest uppercase transition-all ${activeTab === 'historical' ? 'bg-[#78C3AA] text-black' : 'text-white/40 hover:text-white'}`}
                  >
                    Logs
                  </button>
                </div>
              </div>

              <div className="relative liquid-glass rounded-3xl p-6 border border-white/5 flex-1 min-h-[350px]">
                <div className="absolute top-6 left-6 z-20 flex gap-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Current OPS</span>
                      <span className="text-2xl font-semibold text-white tracking-tighter">{throughput.toLocaleString()}</span>
                   </div>
                   <div className="h-10 w-px bg-white/10 mx-2" />
                   <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Status</span>
                      <span className="text-xs font-semibold text-[#78C3AA] py-0.5 px-2 rounded-full bg-[#78C3AA]/10 uppercase tracking-widest border border-[#78C3AA]/20 mt-1">Nominal</span>
                   </div>
                </div>

                <div className="h-[320px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#78C3AA" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#78C3AA" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(255,255,255,0.03)" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontStyle: 'mono' }}
                        dy={20}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontStyle: 'mono' }}
                      />
                      <Tooltip 
                        cursor={{ stroke: '#78C3AA', strokeWidth: 1 }}
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.9)', 
                          borderColor: 'rgba(120,195,170,0.3)',
                          borderRadius: '16px',
                          fontSize: '11px',
                          backdropFilter: 'blur(12px)',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                        }}
                        itemStyle={{ color: '#78C3AA' }}
                      />
                      <Area 
                        type="monotoneX" 
                        dataKey="throughput" 
                        stroke="#78C3AA" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorThroughput)" 
                        animationDuration={1500}
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                {[
                  { label: 'Connectors', val: '500+', accent: true },
                  { label: 'Uptime', val: '99.99%', accent: false },
                  { label: 'Latent-Avg', val: '14ms', accent: false },
                  { label: 'Data/Sec', val: '2.4 GB', accent: true },
                ].map((m) => (
                  <div key={m.label} className="p-4 liquid-glass rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-default">
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1.5 font-mono">{m.label}</p>
                    <p className={`text-lg font-medium tracking-tighter ${m.accent ? 'text-[#78C3AA]' : 'text-white'}`}>{m.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// ─── Features (Capabilities) ───────────────────────────────────────
const FeatureCard = ({ title, desc, image, large, index }: { title: string; desc: string; image: string; large?: boolean; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className={`${large ? 'md:col-span-3' : 'md:col-span-2'} relative group`}
  >
    <div className="h-full liquid-glass rounded-[2.5rem] border border-white/5 p-4 flex flex-col transition-all duration-700 hover:border-[#78C3AA]/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* Image Container with Premium Styling */}
      <div className="relative aspect-[16/10] rounded-[1.8rem] overflow-hidden mb-8 border border-white/10 group-hover:border-[#78C3AA]/30 transition-all duration-700">
        {/* The Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out select-none"
        />
        
        {/* Subtle Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />

        {/* HUD Elements Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="liquid-glass rounded-full px-2.5 py-1 flex items-center gap-2 border border-white/10 backdrop-blur-md">
            <div className="w-1 h-1 rounded-full bg-[#78C3AA] shadow-[0_0_5px_#78C3AA]" />
            <span className="text-[8px] text-white/60 font-mono tracking-widest uppercase">Analysis Core</span>
          </div>
        </div>

        {/* Animated Corner Hint */}
        <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-transparent to-[#78C3AA]/20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Text Content */}
      <div className="px-3 pb-4">
        <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-[#78C3AA] transition-colors duration-500 flex items-center justify-between">
          {title}
          <ArrowUpRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#78C3AA]" />
        </h3>
        <p className="text-white/40 text-sm lg:text-base leading-relaxed font-display line-clamp-3">
          {desc}
        </p>
      </div>

      {/* Background Decorative Bloom */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#78C3AA]/5 blur-[60px] rounded-full group-hover:bg-[#78C3AA]/10 transition-colors duration-700" />
    </div>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      title: 'Unified System Integration',
      desc: 'Seamlessly connect CRMs, ERPs, databases, and third-party applications into a centralized ecosystem, enabling smooth communication and eliminating data silos across your organization.',
      image: '/platform images (3).png',
      large: false,
    },
    {
      title: 'Intelligent Workflow Orchestration',
      desc: 'Design and automate complex workflows across multiple platforms using smart triggers, logic-driven actions, and real-time execution to streamline operations and reduce manual effort.',
      image: '/platform images (4).png',
      large: false,
    },
    {
      title: 'Real-Time Data Synchronization',
      desc: 'Ensure consistent and accurate data flow across all connected systems with real-time synchronization, minimizing delays, preventing errors, and improving operational efficiency across teams.',
      image: '/platform images (5).png',
      large: false,
    },
    {
      title: 'Integration Monitoring & Insights',
      desc: 'Monitor system integrations, workflow execution, and performance metrics through a centralized dashboard, providing actionable insights and visibility into your entire automation infrastructure.',
      image: '/platform images (6).png',
      large: true,
    },
    {
      title: 'Scalable Automation Architecture',
      desc: 'Built for growth, the platform supports scalable integrations and workflows, allowing businesses to expand automation capabilities and handle increasing complexity without compromising performance.',
      image: '/platform images (7).png',
      large: true,
    },
  ];

  return (
    <section id="features" className="relative py-24 lg:py-40 bg-black/40 border-y border-white/5 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#78C3AA]/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-8">
            <Zap size={14} className="text-[#78C3AA]" />
            <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Unmatched Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-8">
            Next-Gen Capabilities for <em className="font-serif italic text-white/80">Modern Enterprises.</em>
          </h2>
          <p className="text-white/40 text-md font-display leading-relaxed max-w-2xl">
           SynteraEngineX V2.1 empowers businesses with advanced system connectivity, workflow orchestration, and real-time operational intelligence—all within a unified automation layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-10">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────
const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "SynteraEngineX V2.1 completely transformed how our systems communicate. What used to take hours of manual work now runs automatically and flawlessly.",
      image: "/M1.png",
      name: "Oliver Grant",
      role: "Operations Director",
    },
    {
      text: "The level of automation and control we gained is incredible. It feels like we finally have a true command center for our business operations.",
      image: "/M2.png",
      name: "Ethan Caldwell",
      role: "IT & Systems Architect",
    },
    {
      text: "Integration used to be our biggest challenge. SynteraTek made everything seamless, and our workflows are now faster, smarter, and far more reliable.",
      image: "/M3.png",
      name: "Lucas Whitmore",
      role: "CTO, TechFlow",
    },
    {
      text: "The real-time synchronization and monitoring features gave us full visibility into our processes. It’s a game-changer for operational efficiency.",
      image: "/M4.jpeg",
      name: "Nathaniel Brooks",
      role: "CEO, Nexo Arts",
    },
    {
      text: "I love how intuitive yet powerful the platform is. We connected all our tools and automated workflows without complexity.",
      image: "/w1.png",
      name: "Charlotte Reeves",
      role: "Operations Lead",
    },
    {
      text: "SynteraEngineX feels like the backbone of our operations now. Everything runs smoothly, and our team can focus on what truly matters.",
      image: "/W2.png",
      name: "Amelia Kensington",
      role: "Systems Manager",
    },
    {
      text: "The automation capabilities are next-level. We reduced errors, saved time, and significantly improved how our systems work together.",
      image: "/M5.jpeg",
      name: "Harrison Cole",
      role: "Data Architect",
    },
    {
      text: "They delivered a solution that exceeded expectations. SynteraTek is not just a tool; it's a strategic platform.",
      image: "/W3.png",
      name: "Evelyn Harper",
      role: "Strategy Director",
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section id="testimonials" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA]" />
            <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Social Proof</span>
          </div>
          <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-6">
            Loved by <em className="font-serif italic text-white/80">creators</em>
          </h2>
          <p className="text-white/40 text-lg lg:text-xl font-display leading-relaxed">
            Join hundreds of organizations building the future of automated enterprise.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[840px] overflow-hidden lg:px-4">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </div>

      {/* Background Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-[#78C3AA]/5 via-transparent to-transparent pointer-events-none opacity-30 blur-[120px]" />
    </section>
  );
};

// ─── Pricing ──────────────────────────────────────────────────────
const PricingSection = () => {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: 'Starter', price: 0, icon: Zap, desc: 'Essential connectivity', features: ['3 System connectors', 'Real-time synchronization', 'Basic monitoring', 'Standard export'], stripeLink: '' },
    { name: 'Business', price: annual ? 49 : 59, icon: Zap, desc: 'For scaling organizational workflows', features: ['Unlimited connectors', 'Advanced logic rules', 'Priority processing', 'Webhook integration', 'Custom dashboards'], popular: true, stripeLink: annual ? 'https://buy.stripe.com/test_fZucN58s71iPdR2d0GcQU02' : 'https://buy.stripe.com/test_aFa8wP9wb0eL3co8KqcQU00' },
    { name: 'Enterprise', price: annual ? 149 : 199, icon: Globe, desc: 'Full-scale intelligent layer', features: ['Everything in Business', 'Team access control', 'API management', 'Dedicated hosting', '24/7 Priority support'], stripeLink: annual ? 'https://buy.stripe.com/test_7sY7sL7o32mT5kwbWCcQU03' : 'https://buy.stripe.com/test_eVqbJ14bRbXt5kwgcScQU01' },
  ];
  return (
    <section id="pricing" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <StaggerContainer className="text-center mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA]" />
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Offers</span>
            </div>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl lg:text-5xl font-medium tracking-tight text-white mb-8">
              Simple <em className="font-serif italic text-white/80">pricing</em>
            </h2>
          </FadeUp>
          <FadeUp>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-xs transition-colors ${!annual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${annual ? 'bg-[#78C3AA]/40' : 'bg-white/10'}`}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-white shadow-xl"
                  animate={{ x: annual ? 24 : 0 }}
                />
              </button>
              <span className={`text-xs transition-colors ${annual ? 'text-white' : 'text-white/40'}`}>
                Annual <span className="text-[9px] text-[#78C3AA] font-bold">— SAVE 20%</span>
              </span>
            </div>
          </FadeUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className="relative group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={`liquid-glass rounded-[2rem] p-8 flex flex-col h-full border transition-all duration-500 ${p.popular ? 'border-[#78C3AA]/40 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.3)]' : 'border-white/5'}`}>

                <div className="flex items-center justify-between mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.popular ? 'bg-[#78C3AA] text-black' : 'bg-white/5 text-white/40'}`}>
                    {(() => { const Icon = p.icon; return <Icon size={20} />; })()}
                  </div>
                  {p.popular && <span className="text-[9px] text-[#78C3AA] font-bold uppercase tracking-widest bg-[#78C3AA]/10 px-2 py-0.5 rounded-full border border-[#78C3AA]/20">Popular</span>}
                </div>

                <h3 className="text-white text-xl font-medium mb-2">{p.name}</h3>
                <p className="text-white/30 text-[13px] mb-6 font-display leading-relaxed line-clamp-1">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <motion.span
                    key={p.price}
                    className="text-white text-4xl lg:text-5xl font-medium"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {p.price === 0 ? 'Free' : `$${p.price}`}
                  </motion.span>
                  <span className="text-white/20 text-sm font-display">/mo</span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-white/50 text-sm leading-snug">
                      <Check size={14} className={p.popular ? 'text-[#78C3AA] mt-0.5' : 'text-white/20 mt-0.5'} />
                      <span className="flex-1">{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => p.stripeLink ? window.open(p.stripeLink, '_blank') : scrollTo('contact')}
                  className={`w-full liquid-glass-strong rounded-full px-8 py-4 flex items-center justify-center gap-3 font-medium hover:scale-105 active:scale-95 transition-transform ${p.popular ? 'text-[#78C3AA]' : 'text-white'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {p.name === 'Starter' ? 'Start Exploring' : 'Select Plan'}
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center ${p.popular ? 'bg-[#78C3AA]/20 text-[#78C3AA]' : 'bg-white/15 text-white'}`}>
                    <ArrowRight size={14} />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────
const FAQSection = () => {
  const faqs = [
    { q: 'What problem does SynteraEngineX V2.1 solve?', a: 'From our experience, it eliminates the chaos of disconnected systems by bringing everything into one unified workflow, saving time and reducing manual errors.' },
    { q: 'Is it difficult to integrate with existing tools?', a: 'Not at all. We were able to connect our existing systems quickly, and the process felt smooth without disrupting our current operations.' },
    { q: 'Can it handle complex workflows across multiple platforms?', a: 'Yes, absolutely. We’ve automated multi-step workflows across different systems, and everything runs seamlessly without constant monitoring.' },
    { q: 'How does it improve operational efficiency?', a: 'We noticed a significant reduction in manual tasks and delays. Processes that used to take hours are now automated and completed in real time.' },
    { q: 'Do we get visibility into system performance and workflows?', a: 'Definitely. The dashboard gives us clear insights into integrations, workflow status, and overall system performance, which helps us make better decisions.' },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 lg:py-24 overflow-hidden border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Heading & Feature Image */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA]" />
                <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Assistance</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-6">
                Common <em className="font-serif italic text-white/80">questions</em>
              </h2>
              <p className="text-white/40 text-base lg:text-lg font-display leading-relaxed max-w-md">
                Find answers to frequent inquiries about our system orchestration layer and workflow automation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group max-w-md"
            >
              <img
                src="/common questions.png"
                alt="Common Questions"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>

          {/* Right: Compact Interactive Accordion */}
          <div className="flex flex-col">
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  className={`liquid-glass rounded-2xl overflow-hidden border transition-all duration-500 ${open === i ? 'border-[#78C3AA]/30 bg-white/[0.04]' : 'border-white/5'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 lg:p-6 text-left text-white group"
                  >
                    <span className="flex items-center gap-4 lg:gap-6">
                      <span className={`text-[11px] font-mono transition-colors duration-300 ${open === i ? 'text-[#78C3AA]' : 'text-white/20'}`}>0{i + 1}</span>
                      <span className={`text-base lg:text-lg font-medium tracking-tight transition-colors duration-300 ${open === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{f.q}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: open === i ? 180 : 0 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open === i ? 'bg-[#78C3AA] text-black' : 'bg-white/5 text-white/40'}`}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence mode="wait">
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 pl-14 lg:pl-16">
                          <p className="text-white/50 text-base leading-relaxed max-w-xl font-display">{f.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ─── Blog ─────────────────────────────────────────────────────────
const BlogSection = () => {

  const [selectedPost, setSelectedPost] = useState<null | any>(null);

  const posts = [
    {
      title: 'The Future of System Orchestration',
      excerpt: 'How intelligent layers are reshaping the $200B enterprise software market.',
      date: 'Mar 2026',
      tag: 'Automation',
      readTime: '6 min read',
      image: '/journals.png',
      content: `The enterprise software world is undergoing a silent revolution. While specialized tools like Salesforce, SAP, and Trello remain essential for day-to-day operations, the core value of a modern organization is shifting toward the orchestration layer. This is the intelligence that connects, synchronizes, and animates otherwise static silos of information. As businesses scale, the friction between these systems grows exponentially if not managed by a unified automation platform.

      At SynteraTek, we've spent the last three years building proprietary connectors and state management engines that ensure business logic is preserved across over 500 different platforms. We believe that true efficiency isn't just about moving data from point A to point B, but about maintaining structural integrity across your entire organizational workflow. When an account is updated in your CRM, the change should ripple through your ERP, project management tools, and service dashboards instantly and accurately.
      
      Operations teams are now utilizing unified dashboards to monitor thousands of cross-platform events in real-time, tasks that previously required countless hours of manual oversight and multi-login verification. This fundamental shift is empowering smaller organizations to operate with the same technological agility and efficiency as Fortune 500 enterprises. By removing the manual labor of synchronization, companies can refocus their human talent on high-level strategy and creative problem-solving rather than administrative data entry.

      In the next decade, we expect the orchestration layer to become the "brain" of the enterprise. It won't just be a bridge; it will be an active participant in decision-making, using AI to predict bottlenecks before they happen and suggesting optimizations to the workflow itself. SynteraTek is at the forefront of this evolution, ensuring that our clients are prepared for a future where systems are not just connected, but are truly harmonious and intelligent.`
    },
    {
      title: 'Bridging ERP and CRM Silos',
      excerpt: 'A deep dive into our multi-directional synchronization engine.',
      date: 'Feb 2026',
      tag: 'Tech',
      readTime: '8 min read',
      image: '/journals (2).png',
      content: `Bridging the gap between front-office sales and back-office logistics is the ultimate challenge for digital transformation in the modern era. Sales teams thrive on high-velocity data and customer interaction peaks, while logistics and fulfillment require steady, accurate, and predictable states. When these two worlds are disconnected, the results are missed deadlines, dissatisfied customers, and wasted operational resources. A simple API hook is no longer sufficient; a multi-directional synchronization engine is required.

      Our latest technical update introduces "Continuous State Mapping"—a process that ensures data integrity even during system outages or high-latency events. By utilizing a distributed event queue, we can now synchronize complex record types across legacy SAP environments and modern cloud-based Salesforce instances with sub-millisecond precision. These aren't just simple triggers; they are intelligent synchronization rules that respond to business logic in real-time, adapting to the nuances of each platform's data models.
      
      This technology is currently being used by multinational distributors to coordinate global shipping and inventory with warehouse management systems across three continents. Every purchase event is mapped to an inventory unit, a shipping label, and a financial ledger entry automatically, ensuring full transparency from the moment of purchase to final delivery. This visibility reduces errors by 40% and increases fulfillment speed by nearly double compared to traditional manual or semi-automated processes.

      By bridging these silos, organizations create a "single source of truth" that everyone can rely on. Sales can promise delivery dates with confidence, while operations can plan capacity without second-guessing their data. As we move closer to a fully integrated business environment, the ability to bridge ERP and CRM systems will transition from a competitive advantage to a basic operational requirement. SynteraTek is here to help you make that transition seamless and successful.`
    },
    {
      title: 'Security in Automated Data Flows',
      excerpt: 'Understanding end-to-end encryption in cross-platform triggers.',
      date: 'Jan 2026',
      tag: 'Security',
      readTime: '6 min read',
      image: '/journals (3).png',
      content: `In an era where data regulations like GDPR, SOC2, and CCPA determine whether a company can even operate in certain markets, security is as critical as efficiency. Automated workflows, by their nature, move sensitive information across multiple third-party boundaries, creating potential security risks if not handled correctly. Every synchronization event in the SynteraTek ecosystem is governed by a zero-trust architecture, ensuring that every byte of data is protected at rest and in transit.

      In this guide, we explore how our "Encryption-First" sync engine handles sensitive PII and financial metadata without ever storing it on our own centralized servers longer than absolutely necessary for the transfer. We discuss the transition from traditional, vulnerable Webhooks to secure, scoped API tokens and how teams can set up granular role-based access control. This ensures that only the necessary services have access to specific data fields, minimizing the surface area for potential breaches.
      
      Understanding these security principles allows for more robust organizational scaling where automation doesn't come at the cost of vulnerability. Our platform enforces compliance standards across every connector you deploy, automatically scanning for insecure endpoints and protecting against credential leakage. By automating security alongside your workflows, you can scale your operations with the confidence that your customers' data is protected by industry-leading standards and practices.

      The future of secure automation lies in transparency and isolation. By isolating data streams and providing comprehensive audit logs for every sync event, SynteraTek allows security teams to monitor exactly how information is flowing through the enterprise. As cyber threats evolve, our platform continues to adapt, integrating new encryption standards and detection algorithms to keep your business safe while it moves at the speed of light.`
    },
    {
      title: 'AI-Driven Process Discovery',
      excerpt: 'Using machine learning to automatically map organizational workflows.',
      date: 'Dec 2025',
      tag: 'Insight',
      readTime: '7 min read',
      image: '/journals (4).png',
      content: `For many enterprises, the greatest hurdle to automation is not the technology itself, but a lack of clarity regarding existing processes. Over years of growth, workflows become organic, undocumented, and often inefficient, with key steps living only in the minds of long-term employees. AI-driven process discovery changes this dynamic by automatically mapping the actual "digital footprint" of work within your organization, providing an objective view of how tasks are handled across different departments.

      Using machine learning algorithms, SynteraTek can analyze interaction patterns across your connected systems to identify recurring workflows and hidden bottlenecks. This isn't just about seeing what happened; it's about understanding the logic behind the events. Our engine can reconstruct complex flowcharts from server logs and API calls, highlighting areas where manual intervention is causing delays or where data is being re-entered multiple times across different software.
      
      Once a process is discovered and mapped, our platform suggests the most effective automation strategies to streamline it. This might include replacing a manual approval step with an automated rule or creating a direct sync between two disconnected databases. This proactive approach significantly reduces the time and cost associated with business process re-engineering, allowing companies to transition from "is-state" to "to-be-state" in a fraction of the time traditionally required by consulting teams.

      Furthermore, AI-driven discovery ensures that automation is built on a foundation of reality, not assumptions. It documents the edge cases and exceptions that manual documentation often misses, ensuring that the resulting automated workflows are resilient and reliable. As organizations continue to evolve, the ability to continuously discover and optimize processes will be the key to maintaining a competitive edge in a rapidly changing global market.`
    },
    {
      title: 'Scaling Distributed Workflows',
      excerpt: 'How to maintain reliability across global system environments.',
      date: 'Nov 2025',
      tag: 'Scale',
      readTime: '9 min read',
      image: '/journals (5).png',
      content: `As organizations expand globally, the complexity of managing workflows across different regions and time zones grows exponentially. Distributed workflow architecture is the solution to this challenge, allowing systems to operate independently while remaining perfectly synchronized with the global enterprise. This requires a level of reliability and performance that traditional centralized systems simply cannot provide, especially when dealing with unstable network conditions or varying regulatory requirements.

      Scaling these workflows involves more than just adding more server capacity; it requires a fundamental rethink of how data consistency is handled. SynteraTek utilizes a "multi-region sync pulse" that allows regional systems to operate with low-latency local data while reaching "eventual consistency" with the global headquarters. This ensures that your branch office in Singapore can continue to function even if the connection to the main ERP in London is temporarily interrupted, with all changes syncing automatically once the connection is restored.
      
      We also focus on handling high-concurrency events—scenarios where thousands of workflow triggers are activated simultaneously. Our platform uses an elastic architectural pattern that scales resources up or down on-demand, ensuring that performance remains consistent regardless of the load. This is particularly critical for businesses with seasonal peaks or high-growth environments where yesterday's infrastructure is no longer sufficient for today's data volume.

      Building for scale also means building for reliability. Every distributed workflow in the SynteraTek platform includes built-in retry logic, error handling, and dead-letter queues. This ensures that no data is lost even if a third-party service goes offline. By providing this level of robustness, we allow our clients to build global operations on a digital foundation that is as strong as it is flexible, capable of supporting thousands of integrations without breaking a sweat.`
    },
    {
      title: 'Next-Gen API Management',
      excerpt: 'Moving beyond REST to real-time event-driven architectures.',
      date: 'Oct 2025',
      tag: 'Network',
      readTime: '5 min read',
      image: '/journals (6).png',
      content: `The era of static, RESTful API integrations is slowly giving way to a more dynamic, event-driven future. Modern business doesn't happen in batch updates; it happens in real-time events. Next-gen API management is focused on creating a reactive architecture where every micro-change in one system can trigger a localized or global response instantly. This requires moving beyond simple CRUD (Create, Read, Update, Delete) patterns toward highly specific event streams.

      At SynteraTek, we are pioneering the use of "Smart Subscriptions" that allow your systems to listen only for the events that matter to them. Instead of polling an endpoint every few minutes to see if a status has changed, your downstream services receive a "push" notification the millisecond a change occurs. This reduces network overhead, decreases latency, and enables true real-time synchronization across your entire business ecosystem, from customer support to warehouse fulfillment.
      
      We also provide a unified governance layer for all your APIs, regardless of whether they are modern GraphQL endpoints or legacy SOAP services. This management layer provides a single point of visibility for security monitoring, rate limiting, and performance analytics. It allows IT leaders to understand which integrations are the most critical and which might be underperforming, providing the data needed to make informed decisions about future infrastructure investments.

      As we move toward an increasingly interconnected world, the ability to manage complex API landscapes will be a defining characteristic of successful enterprises. SynteraTek's next-gen management tools simplify this complexity, providing a high-fidelity interface for building, monitoring, and scaling your digital connections. We are committed to providing the tools that power the next generation of intelligent, reactive business systems.`
    }
  ];

  return (
    <section id="blog" className="relative py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA]" />
              <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Journals</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-medium tracking-tight text-white leading-tight"
            >
              The <em className="font-serif italic text-white/80">SynteraTek</em> cases
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-lg font-display max-w-xs md:text-right"
          >
            Insights into the intersection of system architecture, workflow automation, and enterprise intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)]">
          {posts.map((p, i) => {
            let columnSpan = 'md:col-span-6 lg:col-span-3'; // Default (1/4 width)
            if (i === 0) columnSpan = 'md:col-span-12 lg:col-span-8'; // 2/3 width
            if (i === 1) columnSpan = 'md:col-span-6 lg:col-span-4';  // 1/3 width

            const isFeatured = i === 0;

            return (
              <motion.div
                key={p.title}
                onClick={() => setSelectedPost(p)}
                className={`group cursor-pointer relative overflow-hidden liquid-glass rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:border-[#78C3AA]/30 hover:shadow-[0_0_40px_rgba(120,195,170,0.1)] hover:-translate-y-1 flex flex-col ${columnSpan}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Redesigned Image Design: Framed look */}
                <div className={`relative p-3 ${isFeatured ? 'flex-1 min-h-[250px]' : 'aspect-[11/8]'}`}>
                  <div className="w-full h-full relative overflow-hidden rounded-[1.8rem] border border-white/10 group-hover:border-[#78C3AA]/20 transition-colors">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ${isFeatured ? 'opacity-90' : 'opacity-70'}`} />
                  </div>
                  
                  {/* Category Badge - Adjusted */}
                  <div className="absolute top-7 left-7">
                    <span className="bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] text-[#78C3AA] font-bold uppercase tracking-widest border border-white/10 group-hover:border-[#78C3AA]/40 transition-colors">
                      {p.tag}
                    </span>
                  </div>

                  {isFeatured && (
                    <div className="absolute bottom-8 left-8 right-8 z-10 hidden md:block">
                       <h3 className="text-2xl lg:text-3xl font-medium text-white mb-3 leading-tight group-hover:text-[#78C3AA] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-white/60 text-base leading-relaxed max-w-2xl line-clamp-2">
                        {p.excerpt}
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Section (for non-featured or mobile) */}
                <div className={`p-7 flex flex-col justify-between ${isFeatured ? 'md:hidden bg-black/40' : 'flex-1 bg-gradient-to-b from-transparent to-white/[0.02]'}`}>
                  <div>
                    {!isFeatured && (
                      <>
                        <h3 className="text-lg font-medium text-white mb-2.5 group-hover:text-[#78C3AA] transition-colors leading-tight line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-white/40 text-[13px] leading-relaxed mb-5 line-clamp-3">
                          {p.excerpt}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-[9px] font-mono uppercase tracking-widest">{p.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-white/40 text-[9px] font-mono uppercase tracking-widest">{p.readTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#78C3AA] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider">Read More</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>

                {/* Interaction Overlay for Featured on Desktop */}
                {isFeatured && (
                  <div className="absolute top-6 right-6 z-20 hidden md:flex">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white/40 group-hover:bg-[#78C3AA] group-hover:text-black group-hover:border-[#78C3AA] transition-all duration-500">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Blog Detail Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="w-[92vw] sm:max-w-3xl p-0 overflow-hidden liquid-glass-strong border-white/10 text-white rounded-[2rem] sm:rounded-[2.5rem] bg-black/90 [&>button]:left-4 [&>button]:right-auto">
          {selectedPost ? (
            <div className="flex flex-col max-h-[90vh]">
              {/* Modal Hero Image */}
              <div className="relative h-48 sm:h-72 md:h-96 w-full flex-shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <span className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[8px] sm:text-[10px] text-white/80 font-mono uppercase tracking-widest border border-white/10">{selectedPost.date}</span>
                    <span className="bg-[#78C3AA]/20 backdrop-blur-md rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[8px] sm:text-[10px] text-[#78C3AA] font-bold uppercase tracking-widest border border-[#78C3AA]/30">{selectedPost.tag}</span>
                    <span className="text-white/40 text-[8px] sm:text-[10px] font-mono uppercase tracking-widest ml-auto">{selectedPost.readTime}</span>
                  </div>
                  <DialogTitle className="text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight">
                    {selectedPost.title}
                  </DialogTitle>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="p-5 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1">
                <div className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed space-y-4 sm:space-y-6">
                  {selectedPost.content.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#78C3AA]/10 p-1 border border-[#78C3AA]/20">
                      <div className="w-full h-full rounded-full bg-[#78C3AA] flex items-center justify-center">
                        <Users size={18} className="text-black" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white text-sm sm:text-base font-semibold">SynteraTek Operations</p>
                      <p className="text-white/40 text-xs sm:text-sm">Strategic Automation Specialists</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {[Twitter, Linkedin].map((Icon, i) => (
                      <button key={i} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#78C3AA] hover:bg-[#78C3AA]/10 transition-all border border-white/5 hover:border-[#78C3AA]/30">
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};


// ─── Marquee ──────────────────────────────────────────────────────
const MarqueeSection = () => {
  const items = [
    "SYSTEM INTEGRATION", "WORKFLOW SYNC", "BUSINESS AUTOMATION", "ORCHESTRATION LAYER", 
    "UNIFIED DATA", "DATA INTEGRITY", "SLOT FLOWS", "ENTERPRISE SYNC"
  ];
  
  return (
    <div className="py-6 bg-[#78C3AA]/5 border-y border-[#78C3AA]/10 overflow-hidden whitespace-nowrap selective-glass">
      <div className="flex animate-marquee">
        <div className="flex gap-16 sm:gap-24 items-center">
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-sm sm:text-lg md:text-xl font-serif text-[#78C3AA]/60 tracking-[0.4em] uppercase">
                {item}
              </span>
              <span className="text-[#78C3AA]/20 font-bold font-mono">//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ─── Contact ──────────────────────────────────────────────────────
const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };

    let widgetId: string | null = null;
    const renderWidget = () => {
      if ((window as any).turnstile && turnstileRef.current && !widgetId) {
        widgetId = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAAC0BTd6PXMLcH3hK',
          callback: 'onTurnstileSuccess',
          theme: 'dark'
        });
      }
    };

    if ((window as any).turnstile) {
      renderWidget();
    } else {
      const checkScript = setInterval(() => {
        if ((window as any).turnstile) {
          renderWidget();
          clearInterval(checkScript);
        }
      }, 500);
      return () => { 
        clearInterval(checkScript); 
        delete (window as any).onTurnstileSuccess; 
      };
    }

    return () => { 
      delete (window as any).onTurnstileSuccess; 
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      toast.error('Identity verification required', {
        description: 'Please complete the challenge to submit the request.'
      });
      return;
    }
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/mdapwnqe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        toast.success('Strategy Consultation Initialized');
      } else {
        setStatus('error');
        toast.error('Submission failed. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
      toast.error('An error occurred.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Contact Info & Map */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-white/10 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA]" />
                <span className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase">Get In Touch</span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-medium tracking-tight text-white mb-6 leading-tight">
                Ready to <em className="font-serif italic text-white/80">connect</em>?
              </h2>
              <p className="text-white/40 text-lg lg:text-xl font-display leading-relaxed">
                Have questions or a project in mind? Our integration architects are ready to help.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: 'Email', value: 'info@synteratek.com' },
                { icon: Phone, label: 'Phone', value: '+1 213-550-3785' },
                { icon: MapPin, label: 'Head office', value: '2987 Glendale Blvd, Los Angeles, CA 90039, United States' },
                { icon: Globe, label: 'Global', value: 'Support 24/7' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="liquid-glass rounded-2xl p-5 flex items-start gap-4 group hover:bg-white/[0.03] transition-colors cursor-default"
                >
                  <div className="w-10 h-10 rounded-full bg-[#78C3AA]/10 flex items-center justify-center text-[#78C3AA] group-hover:bg-[#78C3AA] group-hover:text-black transition-all shrink-0 mt-0.5">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-[3.5/1] rounded-3xl overflow-hidden liquid-glass border border-white/10"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.215597020662!2d-118.26677492428088!3d34.11522987313335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c0dab50c8819%3A0xb66c2d107ce5b731!2s2987%20Glendale%20Blvd%2C%20Los%20Angeles%2C%20CA%2090039%2C%20USA!5e0!3m2!1sen!2slk!4v1775210413646!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
            </motion.div>
          </div>

          {/* Right: Contact Form or Success State */}
          <div className="flex flex-col justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="liquid-glass-strong rounded-[2.5rem] p-8 lg:p-12 border border-[#78C3AA]/20 text-center shadow-[0_0_50px_rgba(120,195,170,0.1)]"
                >
                  <div className="w-20 h-20 rounded-full bg-[#78C3AA]/10 flex items-center justify-center text-[#78C3AA] mx-auto mb-8 border border-[#78C3AA]/20">
                    <Check size={40} />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6">
                    Consultation <em className="font-serif italic text-white/80">Scheduled</em>
                  </h2>
                  <p className="text-white/40 text-base lg:text-lg font-display leading-relaxed mb-8">
                    Your integration scope has been received. An orchestration specialist will contact you at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button 
                    onClick={() => { setStatus('idle'); setFormData({ firstName: '', lastName: '', email: '', message: '' }); }}
                    className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-all"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="liquid-glass-strong rounded-[2.5rem] p-8 lg:p-12 border border-white/10"
                >
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] uppercase tracking-widest font-mono px-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Your first name"
                          className="w-full bg-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none border border-white/5 focus:border-[#78C3AA]/30 focus:bg-white/[0.08] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/40 text-[10px] uppercase tracking-widest font-mono px-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Your last name"
                          className="w-full bg-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none border border-white/5 focus:border-[#78C3AA]/30 focus:bg-white/[0.08] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/40 text-[10px] uppercase tracking-widest font-mono px-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your@gmail.com"
                        className="w-full bg-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none border border-white/5 focus:border-[#78C3AA]/30 focus:bg-white/[0.08] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/40 text-[10px] uppercase tracking-widest font-mono px-2">Integration Needs</label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your systems and automation goals..."
                        className="w-full bg-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 outline-none border border-white/5 focus:border-[#78C3AA]/30 focus:bg-white/[0.08] transition-all resize-none"
                      />
                    </div>

                    <div 
                      ref={turnstileRef}
                      className="mb-6 flex justify-center scale-90 sm:scale-[0.85] transition-all min-h-[65px]"
                    ></div>

                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full liquid-glass-strong rounded-full px-8 py-5 flex items-center justify-center gap-3 text-white font-medium hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {status === 'submitting' ? 'Synchronizing...' : 'Initialize Consultation'}
                      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <ArrowRight size={14} />
                      </span>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

    {/* Decorative Elements */}
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#78C3AA]/5 rounded-full blur-[120px] pointer-events-none opacity-30" />
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#78C3AA]/5 rounded-full blur-[120px] pointer-events-none opacity-30" />
    </section>
  );
};




// ─── Main ─────────────────────────────────────────────────────────

const SECTION_IDS = ['hero', 'about', 'how-it-works', 'demo', 'features', 'testimonials', 'pricing', 'faq', 'blog', 'contact'];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOverride, setActiveOverride] = useState('');
  const scrollActive = useActiveSection(SECTION_IDS);
  
  // Map sections to their parent nav items
  const activeSection = (() => {
    if (activeOverride) return activeOverride;
    if (['about', 'how-it-works', 'demo'].includes(scrollActive)) return 'about';
    if (['features', 'testimonials', 'pricing', 'faq', 'blog'].includes(scrollActive)) return 'features';
    return scrollActive;
  })();

  useEffect(() => {
    if (scrollActive) setActiveOverride('');
  }, [scrollActive]);

  const handleNavClick = (id: string) => {
    setActiveOverride(id);
  };

  useEffect(() => {
    document.title = "SynteraTek.com - System Integration & Automation Platform";
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <Layout activeSection={activeSection} onNavClick={handleNavClick}>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} onNavClick={handleNavClick} />
      
      <HeroSection onMenuOpen={() => setMenuOpen(true)} activeSection={activeSection} onNavClick={handleNavClick} />
      <AboutSection />
      <HowItWorksSection />
      <DemoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
      <MarqueeSection />
    </Layout>
  );
};

export default Index;

const XIcon = ({ size = 24, ...props }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width={size} 
    height={size} 
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z"/>
  </svg>
);
