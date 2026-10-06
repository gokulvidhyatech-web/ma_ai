import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Play, Film, Target, PlayCircle, Activity, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { SectionEyebrow, fadeInUp } from '@/components/site/SiteChrome';
import { getCloudinaryVideoUrl } from '@/utils/cloudinary';

const worksData = [
  // Showreel / Brand Films
  { id: 1, title: 'Showreel 1', type: 'Showreel / Brand Films', duration: '01:00', video: '/videos/showreel-Brandfilms/MA AI BRAND FILM (1) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.', featured: true },
  { id: 2, title: 'Showreel 2', type: 'Showreel / Brand Films', duration: '00:45', video: '/videos/showreel-Brandfilms/SHOW REEL HD (2) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 3, title: 'Showreel 3', type: 'Showreel / Brand Films', duration: '01:15', video: '/videos/showreel-Brandfilms/SHOWREEL 2 (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 4, title: 'Showreel 4', type: 'Showreel / Brand Films', duration: '00:30', video: '/videos/showreel-Brandfilms/UGC.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  // Client Case Studies
  { id: 5, title: 'Hotel Feature', type: 'Client Case Studies', duration: '00:45', video: '/videos/Client Case Studies/HOTEL 1 (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 6, title: 'Katha Story', type: 'Client Case Studies', duration: '01:10', video: '/videos/Client Case Studies/KATHA  (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 7, title: 'Manali High Res', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/MANALI HIGH RES (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 8, title: 'Ranthambore Final', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/RANTHAMBORE FINAL   (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 9, title: 'Tadoba March', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/TADOBA 30 MARCH (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  // Micro Drama Series
  { id: 10, title: 'Micro Drama 1', type: 'Micro Drama Series', duration: '03:20', video: '/videos/Micro Drama Series/ANIMATION (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  // Social Media Vertical Content
  { id: 11, title: 'Hadaza Reel', type: 'Social Media Vertical Content', duration: '00:15', video: '/videos/Social Media Vertical Content/HADAZA REEL FY.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 12, title: 'Realistic Vertical', type: 'Social Media Vertical Content', duration: '00:30', video: '/videos/Social Media Vertical Content/REALSTIC .mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  // VFX Content
  { id: 13, title: 'Campus Shoes', type: 'VFX Content', duration: '01:12', video: '/videos/VFX Content/CAMPUS SHOES HD.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 14, title: 'Fast Paced Ad', type: 'VFX Content', duration: '00:40', video: '/videos/VFX Content/FAST PACED AD  (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 15, title: 'Rare Rabbit AI Model', type: 'VFX Content', duration: '00:25', video: '/videos/VFX Content/RARE RABBIT AI MODEL AD .mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  // YouTube Video
  { id: 16, title: 'Golden Matrimonial', type: 'YouTube Video', duration: '00:58', video: '/videos/YouTube Video/Found Through Trust - goldenmatrimonial (1) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
];

function HorizontalVideoCard({ p, index, onPlayFullscreen }: { p: typeof worksData[0], index: number, onPlayFullscreen: (videoUrl: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });

      timerRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 5000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[20px] overflow-hidden bg-[var(--site-bg)] dark:bg-transparent border border-[var(--site-border)] transition-shadow hover:shadow-xl cursor-pointer flex flex-col"
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      onClick={() => onPlayFullscreen(getCloudinaryVideoUrl(p.video))}
    >
      <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-[#05050A]">
        <video
          ref={videoRef}
          src={getCloudinaryVideoUrl(p.video)}
          muted={isMuted}
          playsInline
          loop={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ willChange: 'transform' }}
        />

        <div className={`absolute top-4 right-4 transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-[#8B5CF6] hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        <div className={`absolute top-4 right-4 transition-opacity duration-300 pointer-events-none ${!isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
            <Play size={16} className="text-[#8B5CF6] fill-[#8B5CF6] ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3">
          {p.type} / {p.duration}
        </p>
        <h3 className="text-[22px] md:text-[26px] font-bold text-black dark:text-white tracking-tight mb-3">{p.title}</h3>
        <p className="text-[14px] text-gray-500 mb-6 flex-grow leading-relaxed">{p.desc}</p>

        <div className="flex items-center text-[12px] font-bold text-black dark:text-white tracking-widest uppercase mt-auto">
          VIEW VIDEO <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}

const categories = [
  { name: 'SHOWREEL / BRAND FILMS', icon: <Film size={16} />, match: 'Showreel / Brand Films' },
  { name: 'CLIENT CASE STUDIES', icon: <Target size={16} />, match: 'Client Case Studies' },
  { name: 'MICRO DRAMA SERIES', icon: <PlayCircle size={16} />, match: 'Micro Drama Series' },
  { name: 'SOCIAL MEDIA VERTICAL', icon: <Activity size={16} />, match: 'Social Media Vertical Content' },
  { name: 'YOUTUBE VIDEO', icon: <Play size={16} />, match: 'YouTube Video' },
  { name: 'VFX CONTENT', icon: <Sparkles size={16} />, match: 'VFX Content' },
];

interface Props {
  standalone?: boolean;
}

export const WorksSection = ({ standalone }: Props) => {
  const [category, setCategory] = useState<string | null>('Showreel / Brand Films');
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const visibleWorks = category ? worksData.filter((w) => w.type === category) : worksData;

  return (
    <section
      id="work"
      className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${standalone ? '' : 'border-t border-[var(--site-border)]'}`}
      style={{ backgroundColor: 'var(--site-bg)' }}
    >
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none dark:hidden" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/8 blur-[140px] pointer-events-none dark:hidden" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 md:mb-14">
          <div className="flex flex-col items-start text-left">
            <SectionEyebrow>03 / Works</SectionEyebrow>

            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold mb-8 tracking-[-0.04em] leading-[0.9] max-w-[1000px]" style={{ color: 'var(--site-fg)' }}>
              Where ideas<br />come alive.
            </motion.h2>
          </div>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-[16px] md:text-[18px] font-normal leading-[1.5] max-w-[350px] md:mt-20" style={{ color: 'var(--site-muted)' }}>
            Built for attention.<br />Designed for velocity.
          </motion.p>
        </div>

        <hr className="border-[var(--site-border)] mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="wait">
            {visibleWorks.slice(0, 3).map((work, i) => (
              <HorizontalVideoCard key={work.id} p={work} index={i} onPlayFullscreen={setFullscreenVideo} />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-start gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => {
            const selected = category === cat.match;
            return (
              <button
                type="button"
                key={cat.name}
                aria-pressed={selected}
                onClick={() => setCategory(cat.match)}
                className={`group h-[42px] px-6 rounded-full border ${selected ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white' : 'border-[var(--site-border)] text-[var(--site-fg)] bg-white dark:bg-transparent'} text-[11px] font-bold tracking-widest hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-all duration-300 flex items-center uppercase`}
              >
                <div className="shrink-0 flex items-center justify-center mr-2">{cat.icon}</div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <hr className="border-[var(--site-border)]" />
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[16px] font-normal max-w-[460px]" style={{ color: 'var(--site-muted)' }}>
            Over 120 films, campaigns and AI experiments delivered for brands across 14 markets.
          </p>
          <Link
            to="/ourworks"
            className="group px-8 py-3.5 rounded-[40px] border-[1.5px] border-[var(--site-fg)] bg-transparent text-[var(--site-fg)] font-bold hover:bg-[#111111] hover:text-[#8B5CF6] hover:border-[#111111] transition-all inline-flex items-center gap-3 tracking-[0.08em] text-[13px] uppercase"
          >
            Explore our works
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setFullscreenVideo(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenVideo(null);
              }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-[110] cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={fullscreenVideo}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
