import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Link, useLocation } from '@tanstack/react-router';
import { SiteNav, SiteFooter, fontStyles } from '@/components/site/SiteChrome';
import { AmbientOrb } from '@/components/site/AmbientOrb';

import { StorySection } from '@/components/site/StorySection';
import { BrandsSection } from '@/components/site/BrandsSection';
import { WorksSection } from '@/components/site/WorksSection';
import { TeamSection } from '@/components/site/TeamSection';
import { ServicesSection, HomeFaqSection } from '@/components/site/ServicesSection';
const showReelVideo = '/videos/SHOW REEL HD .mp4';

import navLogoDarkImg from '@/assets/Ma_nav_logo_dark.png';

const HeroSection = ({ introPhase }: { introPhase: 'video' | 'nav' | 'complete' }) => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const hasSeekedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (!hasSeekedRef.current && video.duration > 3) {
        video.currentTime = video.duration - 3;
        hasSeekedRef.current = true;
      }
    };

    const handleCanPlay = () => {
      video.playbackRate = 1;
      setVideoReady(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (video.readyState >= 3) {
      if (!hasSeekedRef.current && video.duration > 3) {
        video.currentTime = video.duration - 3;
        hasSeekedRef.current = true;
      }
      handleCanPlay();
    } else {
      video.addEventListener('canplaythrough', handleCanPlay);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  // Handle video play based on introPhase
  useEffect(() => {
    const introVideo = introVideoRef.current;
    const heroVideo = heroVideoRef.current;
    
    if (introVideo && videoReady) {
      if (introPhase !== 'complete') {
        introVideo.play().catch(() => {});
      } else {
        introVideo.pause();
      }
    }
    
    if (heroVideo) {
      if (introPhase === 'complete') {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    }
  }, [introPhase, videoReady]);

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    if (!heroVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && introPhase === 'complete') {
          heroVideo.play().catch(() => { });
        } else {
          heroVideo.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroVideo);
    return () => observer.disconnect();
  }, [introPhase]);

  const contentOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const pointerEvents = useTransform(scrollY, (v) => (v > 50 ? 'none' : 'auto'));

  return (
    <section className="relative min-h-[100svh] bg-[#111111] flex flex-col overflow-hidden">
      <video
        ref={introVideoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          objectPosition: 'center',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          opacity: introPhase !== 'complete' && videoReady ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
        suppressHydrationWarning
      >
        <source src={showReelVideo} type="video/mp4" suppressHydrationWarning />
      </video>

      <video
        ref={heroVideoRef}
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          objectPosition: 'center',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          opacity: introPhase === 'complete' ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
        suppressHydrationWarning
      >
        <source src={showReelVideo} type="video/mp4" suppressHydrationWarning />
      </video>

      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <motion.div 
        style={{ 
          opacity: introPhase === 'complete' ? contentOpacity : 0,
          transition: 'opacity 1s ease-in-out'
        }} 
        className="relative z-10 flex-grow flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 md:pt-0"
      >
        <div className="max-w-[700px]">
          <h1 className="text-[36px] sm:text-[50px] md:text-[64px] font-medium text-white leading-[1.1] mb-6 drop-shadow-md tracking-tight">
            We build worlds<br />that move you.
          </h1>
          <p className="text-white/90 text-[14px] md:text-[16px] leading-[1.6] max-w-[500px] mb-8 font-light drop-shadow-md">
            We partner with ambitious brands to create AI-powered solutions that drive impact, automate complexity, and shape the future.
          </p>
          <Link to="/work" className="inline-flex px-8 py-3.5 bg-white text-black font-semibold text-[12px] tracking-[0.1em] uppercase hover:bg-[#8B5CF6] hover:text-black transition-colors duration-300">
            Explore our work
          </Link>
        </div>
      </motion.div>

      <motion.div 
        style={{ 
          opacity: introPhase === 'complete' ? contentOpacity : 0, 
          pointerEvents: introPhase === 'complete' ? pointerEvents : 'none',
          transition: 'opacity 1s ease-in-out'
        }} 
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block"
      >
        <Link to="/services" className="px-6 py-3 rounded-[30px] bg-white text-black text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#8B5CF6] transition-colors shadow-lg">
          What we do
        </Link>
      </motion.div>

      <motion.div 
        style={{ 
          opacity: introPhase === 'complete' ? contentOpacity : 0, 
          pointerEvents: introPhase === 'complete' ? pointerEvents : 'none',
          transition: 'opacity 1s ease-in-out'
        }} 
        className="absolute bottom-10 left-6 md:left-16 lg:left-24 z-20 flex gap-6 md:gap-10"
      >
        <a href="https://www.instagram.com/ma.ai.creative" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-colors">
          Instagram
        </a>
        <a href="https://www.linkedin.com/company/ma-ai-in/home/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-colors">
          LinkedIn
        </a>
      </motion.div>
    </section>
  );
};

let hasPlayedIntro = false;

export default function MaLanding() {
  const location = useLocation();
  const [introPhase, setIntroPhase] = useState<'video' | 'nav' | 'complete'>(
    hasPlayedIntro ? 'complete' : 'video'
  );

  useEffect(() => {
    if (introPhase === 'complete') {
      hasPlayedIntro = true;
    }
    // Prevent scrolling while intro is playing
    if (introPhase !== 'complete' && introPhase !== 'nav') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    
    // Chain each phase to the next with its own timeout
    let timer: ReturnType<typeof setTimeout> | undefined;
    
    if (introPhase === 'video') {
      timer = setTimeout(() => setIntroPhase('nav'), 3000); // 3s after video starts
    } else if (introPhase === 'nav') {
      timer = setTimeout(() => setIntroPhase('complete'), 2000); // 2s after nav appears
    }
    
    return () => { if (timer) clearTimeout(timer); };
  }, [introPhase]);

  useEffect(() => {
    // Map pathnames to section IDs
    const pathToId: Record<string, string> = {
      '/about': 'about',
      '/brands': 'brands',
      '/work': 'work',
      '/team': 'team',
      '/services': 'services',
      '/faq': 'faq'
    };

    const sectionId = pathToId[location.pathname];
    
    // Custom smooth scroll function to prevent native lag
    const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    if (sectionId) {
      // Larger timeout to ensure DOM is fully rendered and main thread is unblocked
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Adjust for any fixed header height if needed, e.g., element.offsetTop - 80
          const targetPosition = element.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetPosition, 1000); // 1000ms duration for smoother feel
        }
      }, 300);
    } else if (location.pathname === '/') {
      setTimeout(() => {
        smoothScrollTo(0, 1000);
      }, 300);
    }
  }, [location.pathname]);

  return (
    <>
      <style>{fontStyles}</style>
      <div className="min-h-screen transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: 'var(--site-bg)', backgroundImage: 'var(--site-bg-image, none)', color: 'var(--site-fg)', WebkitTextFillColor: 'inherit' }}>
        <AmbientOrb />
        <SiteNav showNav={introPhase === 'nav' || introPhase === 'complete'} transparentOnTop={true} />
        <main>
          <HeroSection introPhase={introPhase} />
          <StorySection />
          <BrandsSection />
          <WorksSection />
          <TeamSection />
          <ServicesSection />
          <HomeFaqSection />
        </main>
        <SiteFooter hideCta />
      </div>
    </>
  );
}