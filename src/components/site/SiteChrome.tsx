import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail, Phone, MapPin, Sun, Moon } from 'lucide-react';
import { MaLogo } from '../MaLogo';
import { motion } from 'framer-motion';
import ctaLogo3d from '@/assets/cta-logo3d.png';
import navLogoImg from '@/assets/Ma_footer_logo_132x33.png';
import navLogoDarkImg from '@/assets/Ma_nav_logo_dark.png';
import footerLogoImg from '@/assets/Ma_footer_logo_200x160.png';
import footerLogoDarkImg from '@/assets/Ma_footer_logo_dark.png';
import { useTheme } from '@/hooks/use-theme';

// Injecting precise fonts matching the mockup
export const fontStyles = `
  
  body {
    font-family: 'Space Grotesk', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .glass-card {
    background: var(--glass-card-bg, linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%));
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-card-border, rgba(0,0,0,0.06));
  }
`;

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Perfectly mimicking the continuous loop 'M' logo
export const Logo = ({ className = "w-8 h-8", light = false }) => (
  <MaLogo className={className} />
);

export const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-center gap-4 mb-8 md:mb-10">
    <div className="relative flex items-center justify-center shrink-0 w-6 h-6">
      <div className="absolute inset-0 border-[1.5px] border-[#8B5CF6]/40 rounded-full animate-[spin_4s_linear_infinite] border-dashed"></div>
      <div className="absolute w-3.5 h-3.5 bg-[#8B5CF6]/30 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-[#8B5CF6] relative z-10 shadow-[0_0_10px_#8B5CF6]"></div>
    </div>
    <span className="text-[14px] md:text-[15px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold text-[var(--site-fg)]">
      {children}
    </span>
  </motion.div>
);

// The shipped logo pairs a purple/blue gradient mark with a near-black #494949
// "ma.ai" wordmark, so on the dark background both the wordmark and the
// multiply blend disappear. Swap in the light-wordmark variant via the .dark
// class instead: same intrinsic size, so nothing reflows, and the switch is
// pure CSS so it follows the theme toggle instantly.
const ThemedLogo = ({
  light,
  dark,
  className,
  loading,
}: {
  light: string;
  dark: string;
  className: string;
  loading: 'eager' | 'lazy';
}) => (
  <>
    <img src={light} alt="MA Logo" className={`${className} mix-blend-multiply dark:hidden`} loading={loading} />
    <img src={dark} alt="MA Logo" className={`${className} hidden dark:block`} loading={loading} />
  </>
);

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Brands', to: '/brands' },
  { label: 'Work', to: '/work' },
  { label: 'Team', to: '/team' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
] as const;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Toggle theme'}
      className="relative w-11 h-11 rounded-full border border-[var(--site-border)] flex items-center justify-center text-[var(--site-fg)] hover:bg-[#8B5CF6] hover:text-[#111111] hover:border-[#8B5CF6] transition-all duration-300 overflow-hidden"
    >
      {mounted && (
        <motion.div
          key={theme}
          initial={{ y: theme === 'dark' ? -20 : 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: theme === 'dark' ? 20 : -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      )}
    </button>
  );
};

export const SiteNav = ({ 
  showNav = true, 
  transparentOnTop = false 
}: { 
  showNav?: boolean;
  transparentOnTop?: boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isTransparentTop = !scrolled && transparentOnTop && !open;

  return (
    <div style={{
      opacity: showNav ? 1 : 0,
      pointerEvents: showNav ? 'auto' : 'none',
      transition: 'opacity 1s ease-in-out'
    }}>
      <nav className={`fixed top-0 w-full z-[101] transition-all duration-300 ${scrolled || open ? 'backdrop-blur-xl border-b border-[var(--site-border)]' : (transparentOnTop ? 'border-transparent' : 'border-b border-[var(--site-border)]')}`} style={{ backgroundColor: scrolled || open ? 'color-mix(in srgb, var(--site-bg) 90%, transparent)' : (transparentOnTop ? 'transparent' : 'var(--site-bg)') }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 h-[80px] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer select-none" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {/* Force the dark mode (white text) logo when transparent on top so it contrasts with the dark video */}
            <ThemedLogo light={isTransparentTop ? navLogoDarkImg : navLogoImg} dark={navLogoDarkImg} className="w-[120px] h-auto" loading="eager" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium" style={{ color: isTransparentTop ? 'rgba(255,255,255,0.8)' : 'var(--site-muted)' }}>
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => {
                  if (item.to === '/') {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="hover:opacity-100 transition-colors"
                style={{ color: 'inherit' }}
                activeProps={{ style: { color: isTransparentTop ? '#ffffff' : 'var(--site-fg)', fontWeight: 'bold' } }}
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ color: isTransparentTop ? '#ffffff' : 'var(--site-fg)' }}>
              <ThemeToggle />
            </div>
            <Link
              to="/contact"
              style={{
                borderColor: isTransparentTop ? 'rgba(255,255,255,0.6)' : 'var(--site-fg)',
                color: isTransparentTop ? '#ffffff' : undefined
              }}
              className={`ml-2 px-6 py-2.5 rounded-[40px] border-[1.5px] font-bold hover:bg-[#111111] hover:text-[#A78BFA] hover:border-[#111111] transition-all flex items-center gap-2 ${!isTransparentTop ? 'text-[var(--site-fg)]' : ''}`}
            >
              Let's talk <ArrowRight size={16} />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${isTransparentTop ? 'border-white/40 text-white hover:bg-white/10' : 'border-[var(--site-border)] text-[var(--site-fg)]'}`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-[100] border-t border-[var(--site-border)] px-5 py-8 overflow-y-auto" style={{ backgroundColor: 'var(--site-bg)' }}>
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => {
                  setOpen(false);
                  if (item.to === '/') {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="py-4 border-b border-[var(--site-border)] text-[18px] font-bold tracking-[-0.03em] uppercase"
                style={{ color: 'var(--site-fg)' }}
                activeProps={{ style: { color: 'var(--site-fg)' } }}
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#111111] text-[#8B5CF6] text-[13px] tracking-[0.08em] uppercase font-semibold"
          >
            Let's talk <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};



const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); setEmail(''); }}
      className="flex relative"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); setSent(false); }}
        placeholder="Your email address"
        aria-label="Your email address"
        className="w-full border rounded-lg px-4 py-3 text-[14px] focus:outline-none shadow-sm transition-colors duration-300"
        style={{ backgroundColor: 'var(--site-input-bg)', borderColor: 'var(--site-input-border)', color: 'var(--site-fg)' }}
      />
      <button type="submit" aria-label="Subscribe" className="absolute right-1 top-1 bottom-1 bg-[#111111] text-[#8B5CF6] px-5 rounded-md hover:bg-[#8B5CF6] hover:text-[#111111] transition-colors flex items-center justify-center shadow-md">
        <ArrowRight size={18} />
      </button>
      {sent && (
        <p className="absolute -bottom-6 left-0 text-[12px] font-semibold" style={{ color: 'var(--site-fg)' }}>Thanks — you're on the list.</p>
      )}
    </form>
  );
};

export const SiteFooter = ({ hideCta = false }: { hideCta?: boolean }) => {
  const emails = [
    'meena.chabbria@maonline.ai',
    'prarthana.chabbria@maonline.ai',
    'vinay.sakhrani@maonline.ai',
    'souvik.seal@maonline.ai',
    'harsh.gulwani@maonline.ai',
  ];
  const [emailIndex, setEmailIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setEmailIndex((prev) => (prev + 1) % emails.length);
        setFade(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="pt-16 md:pt-20 transition-colors duration-300" style={{ backgroundColor: 'var(--site-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
      {!hideCta && (
      <>
        <SectionEyebrow>START SOMETHING LOUD</SectionEyebrow>

        <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[90px] xl:text-[110px] font-bold leading-[0.9] tracking-[-0.05em] mb-12 md:mb-16 w-full" style={{ color: 'var(--site-fg)' }}>
          Bring the brief.<br />We'll bring the Future.
        </h2>

        <hr className="border-[var(--site-border)]" />

        <div className="py-10 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <a
            href={`mailto:${emails[emailIndex]}`}
            className="text-[18px] md:text-[20px] font-medium hover:opacity-70 transition-all duration-400"
            style={{ color: 'var(--site-fg)', opacity: fade ? 1 : 0 }}
          >
            {emails[emailIndex]}
          </a>

          <Link to="/contact" className="group px-8 py-4 rounded-[40px] bg-[#111111] text-white hover:opacity-90 transition-opacity text-[13px] tracking-[0.08em] uppercase font-bold flex items-center justify-center gap-3">
            MAKE IT MOVE <ArrowRight size={15} className="text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>


      </>
      )}

        {/* Restored Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16 mb-16 md:mb-20">

          <div className="col-span-2 lg:col-span-2 lg:pr-12">
            <Link to="/" className="flex items-center gap-4 mb-6">
              <ThemedLogo light={footerLogoImg} dark={footerLogoDarkImg} className="w-[80px] md:w-[100px] h-auto" loading="lazy" />
            </Link>
            <p className="text-[14px] mb-8 md:mb-12 font-normal leading-[1.5]" style={{ color: 'var(--site-muted)' }}>
              A team of strategists, creators and engineers building AI with purpose.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 md:mb-8 text-[12px] tracking-widest uppercase border-b-[2px] inline-block pb-2" style={{ color: 'var(--site-fg)', borderColor: 'var(--site-fg)' }}>Company</h4>
            <ul className="space-y-4 text-[14px] font-medium" style={{ color: 'var(--site-muted)' }}>
              <li><Link to="/about" className="hover:opacity-80 transition-colors">About us</Link></li>
              <li><Link to="/work" className="hover:opacity-80 transition-colors">Our work</Link></li>
              <li><Link to="/about" className="hover:opacity-80 transition-colors">Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 md:mb-8 text-[12px] tracking-widest uppercase border-b-[2px] inline-block pb-2" style={{ color: 'var(--site-fg)', borderColor: 'var(--site-fg)' }}>Services</h4>
            <ul className="space-y-4 text-[14px] font-medium" style={{ color: 'var(--site-muted)' }}>
              <li><Link to="/services" className="hover:opacity-80 transition-colors">AI Strategy</Link></li>
              <li><Link to="/services" className="hover:opacity-80 transition-colors">Product Design</Link></li>
              <li><Link to="/services" className="hover:opacity-80 transition-colors">Engineering</Link></li>
              <li><Link to="/services" className="hover:opacity-80 transition-colors">Data & Intelligence</Link></li>
              <li><Link to="/services" className="hover:opacity-80 transition-colors">Brand & Experience</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 md:mb-8 text-[12px] tracking-widest uppercase border-b-[2px] inline-block pb-2" style={{ color: 'var(--site-fg)', borderColor: 'var(--site-fg)' }}>Resources</h4>
            <ul className="space-y-4 text-[14px] font-medium" style={{ color: 'var(--site-muted)' }}>
              <li><Link to="/work" className="hover:opacity-80 transition-colors">Case studies</Link></li>
              <li><Link to="/faq" className="hover:opacity-80 transition-colors">FAQs</Link></li>
            </ul>
          </div>

        </div>

        {/* Restored Connect & Newsletter row */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="max-w-[300px] flex flex-col">
            <h4 className="font-bold mb-6 text-[12px] tracking-widest uppercase border-b-[2px] inline-block pb-2 self-start" style={{ color: 'var(--site-fg)', borderColor: 'var(--site-fg)' }}>Connect</h4>
            <div className="flex gap-4 mt-auto">
              <a href="https://www.instagram.com/ma.ai.creative" target="_blank" rel="noreferrer noopener" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-colors" style={{ backgroundColor: 'var(--site-surface)', borderColor: 'var(--site-border)', color: 'var(--site-fg)' }}><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/ma-ai-in/home/" target="_blank" rel="noreferrer noopener" className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-colors" style={{ backgroundColor: 'var(--site-surface)', borderColor: 'var(--site-border)', color: 'var(--site-fg)' }}><Linkedin size={20} /></a>
            </div>
          </div>

        </div>
      </div>

      {/* The Bottom Banner */}
      <div className="w-full bg-[#8B5CF6] py-6 px-5 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <span className="text-[#111111] text-[12px] md:text-[13px] tracking-[0.1em] uppercase font-bold">ma.ai / 2026</span>
          <span className="text-[#111111] text-[12px] tracking-widest hidden md:inline">|</span>
          <div className="hidden md:flex gap-4 items-center text-[11px] font-bold uppercase tracking-widest text-[#111111]">
            <Link to="/privacy" className="hover:opacity-60 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-60 transition-opacity">Terms of Service</Link>
            <Link to="/cookies" className="hover:opacity-60 transition-opacity">Cookie Policy</Link>
          </div>
        </div>
        <span className="text-[#111111] text-[12px] md:text-[13px] tracking-[0.1em] uppercase font-bold">ADVERTISING AFTER THE ALGORITHM.</span>
      </div>
    </footer>
  );
};
