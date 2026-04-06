import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, Linkedin, X, Mail, Facebook, Youtube } from 'lucide-react';
import { toast } from 'sonner';

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', path: '/' },
  { id: 'features', label: 'Solutions', path: '/#features' },
  { id: 'contact', label: 'Contact', path: '/#contact' },
];

export const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

export const scrollTo = (id: string, navigate?: (path: string) => void) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (navigate) {
    navigate(`/#${id}`);
  }
};

export const FloatingNav = ({ activeSection, visible, onNavClick }: { activeSection: string; visible: boolean; onNavClick?: (id: string) => void }) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    if (onNavClick) onNavClick(id);
    scrollTo(id, navigate);
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[80] hidden lg:flex"
        >
          <div className="liquid-glass-strong rounded-full px-2 py-2 flex items-center gap-1">
            <Link to="/" className="flex items-center gap-2 px-3 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="logo" className="w-32 h-10 object-contain" />
            </Link>
            <div className="w-px h-5 bg-white/15 mx-1" />
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium relative transition-all duration-300 ${activeSection === item.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/15 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
            <div className="w-px h-5 bg-white/15 mx-1" />
            <Link to="/synterax">
              <button className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-all font-mono tracking-widest uppercase">
               SynteraX
              </button>
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/xpqoyzqk', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('success');
        toast.success('Strategy Journal Subscription confirmed!');
      } else {
        setStatus('idle');
        toast.error('Subscription failed.');
      }
    } catch (err) {
      setStatus('idle');
      toast.error('An error occurred.');
    }
  };

  return (
    <footer id="footer" className="relative z-10 py-16">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          className="liquid-glass-strong rounded-[2.5rem] p-10 lg:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="logo" className="w-48 h-16 object-contain" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">A powerful integration engine that unifies systems, automates processes, and keeps your business running in perfect sync.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <AnimatePresence mode="wait">
                  {status !== 'success' && (
                    <motion.input
                      key="input"
                      initial={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="flex-1 bg-white/5 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors"
                    />
                  )}
                </AnimatePresence>
                
                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  className={`liquid-glass rounded-full px-5 py-2.5 text-white text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                    status === 'success' ? 'bg-[#78C3AA]/20 text-[#78C3AA] w-full border border-[#78C3AA]/30' : ''
                  }`}
                  whileHover={status === 'success' ? {} : { scale: 1.05 }}
                  whileTap={status === 'success' ? {} : { scale: 0.95 }}
                  layout
                >
                  {status === 'success' ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                      <Zap size={14} className="fill-[#78C3AA]" />
                      Thanks for subscribing
                    </motion.span>
                  ) : status === 'submitting' ? (
                    'Syncing...'
                  ) : (
                    <Mail size={16} />
                  )}
                </motion.button>
              </form>
            </div>
            {[
              { title: 'Product', links: [{ label: 'Features', id: 'features' }, { label: 'Pricing', id: 'pricing' }, { label: 'Demo', id: 'demo' }] },
              { title: 'Company', links: [{ label: 'About', id: 'about' }, { label: 'Blog', id: 'blog' }, { label: 'Contact', id: 'contact' }] },
              { title: 'Legal', links: [{ label: 'Privacy Policy', path: '/privacy' }, { label: 'Terms of Service', path: '/terms' }, { label: 'Cookie Policy', path: '/cookies' }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white text-sm font-medium mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      {l.path ? (
                        <Link to={l.path} className="text-white/50 text-sm hover:text-white/80 transition-colors">{l.label}</Link>
                      ) : (
                        <button
                          onClick={() => l.id && scrollTo(l.id, navigate)}
                          className="text-white/50 text-sm hover:text-white/80 transition-colors text-left"
                        >
                          {l.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest">© 2026 SynteraTek. All rights reserved.</p>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              {[
                { Icon: XIcon, url: 'https://x.com/synteratek' },
                { Icon: Linkedin, url: '#' },
                { Icon: Facebook, url: 'https://www.facebook.com/synteratek/' },
                { Icon: Youtube, url: 'https://www.youtube.com/@SynteraTek' },
                { Icon: PinterestIcon, url: 'https://www.pinterest.com/synteratek/' }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-[#78C3AA] hover:bg-[#78C3AA]/10 transition-all"
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: string) => {
    localStorage.setItem('cookie-consent', consent);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] w-[92%] max-w-xl"
        >
          <div className="liquid-glass-strong rounded-2xl sm:rounded-full p-5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 px-1 sm:px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#78C3AA] animate-pulse shrink-0" />
              <p className="text-white/80 text-[11px] sm:text-[11px] leading-tight font-medium text-center sm:text-left">
                Our <span className="text-[#78C3AA]">Orchestration Cookies</span> optimize your sync experience.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto max-w-[280px] sm:max-w-none">
              <button
                onClick={() => handleConsent('deny')}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                Deny
              </button>
              <button
                onClick={() => handleConsent('accept')}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#78C3AA] text-black text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#78C3AA]/20"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Layout = ({ children, activeSection, onNavClick }: { children: React.ReactNode; activeSection: string; onNavClick?: (id: string) => void }) => {
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // If we have a hash on mount (like from a cross-page navigation), scroll to it after a short delay
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    
    const handleScroll = () => setShowFloatingNav(window.scrollY > window.innerHeight * 0.7 || location.pathname !== '/');
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (location.pathname !== '/') setShowFloatingNav(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.hash]);

  return (
    <div className="relative bg-background min-h-screen scroll-smooth">
      <video autoPlay loop muted playsInline className="fixed inset-0 w-full h-full object-cover z-0" src={VIDEO_SRC} />
      <div className="fixed inset-0 bg-black/60 z-[1]" />
      <FloatingNav activeSection={activeSection} visible={showFloatingNav} onNavClick={onNavClick} />
      <div className="relative z-10">{children}</div>
      <Footer />
      <CookieBanner />
    </div>
  );
};

const PinterestIcon = ({ size = 24, ...props }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width={size} 
    height={size} 
    {...props}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.992 3.992-.283 1.194.598 2.169 1.775 2.169 2.128 0 3.768-2.244 3.768-5.482 0-2.868-2.061-4.872-5.003-4.872-3.411 0-5.411 2.558-5.411 5.2 0 1.03.396 2.135.891 2.735a.366.366 0 0 1 .084.348c-.092.383-.298 1.214-.338 1.378-.053.21-.176.255-.405.15-1.507-.699-2.447-2.895-2.447-4.66 0-3.791 2.755-7.275 7.945-7.275 4.17 0 7.411 2.97 7.411 6.942 0 4.143-2.613 7.476-6.241 7.476-1.219 0-2.365-.634-2.757-1.381 0 0-.603 2.296-.75 2.857-.272 1.04-.1 2.338-.1 2.338C10.59 23.837 11.29 24 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z"/>
  </svg>
);

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
