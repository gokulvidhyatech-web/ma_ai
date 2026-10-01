import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Volume2, VolumeX, X } from 'lucide-react';
import { SectionPageWrapper } from '@/components/site/SectionPageWrapper';
import { fadeInUp } from '@/components/site/SiteChrome';

interface VideoItem {
  id: number;
  title: string;
  type: string;
  duration: string;
  video: string;
  desc: string;
}

const worksData: VideoItem[] = [
  { id: 1, title: 'Showreel 1', type: 'Showreel / Brand Films', duration: '01:00', video: '/videos/showreel-Brandfilms/MA AI BRAND FILM (1) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.', featured: true },
  { id: 2, title: 'Showreel 2', type: 'Showreel / Brand Films', duration: '00:45', video: '/videos/showreel-Brandfilms/SHOW REEL HD (2) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 3, title: 'Showreel 3', type: 'Showreel / Brand Films', duration: '01:15', video: '/videos/showreel-Brandfilms/SHOWREEL 2 (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 4, title: 'Showreel 4', type: 'Showreel / Brand Films', duration: '00:30', video: '/videos/showreel-Brandfilms/UGC.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 5, title: 'Hotel Feature', type: 'Client Case Studies', duration: '00:45', video: '/videos/Client Case Studies/HOTEL 1 (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 6, title: 'Katha Story', type: 'Client Case Studies', duration: '01:10', video: '/videos/Client Case Studies/KATHA  (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 7, title: 'Manali High Res', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/MANALI HIGH RES (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 8, title: 'Ranthambore Final', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/RANTHAMBORE FINAL   (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 9, title: 'Tadoba March', type: 'Client Case Studies', duration: '01:45', video: '/videos/Client Case Studies/TADOBA 30 MARCH (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 10, title: 'Micro Drama 1', type: 'Micro Drama Series', duration: '03:20', video: '/videos/Micro Drama Series/ANIMATION (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 11, title: 'Hadaza Reel', type: 'Social Media Vertical Content', duration: '00:15', video: '/videos/Social Media Vertical Content/HADAZA REEL FY.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 12, title: 'Realistic Vertical', type: 'Social Media Vertical Content', duration: '00:30', video: '/videos/Social Media Vertical Content/REALSTIC .mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 13, title: 'Campus Shoes', type: 'VFX Content', duration: '01:12', video: '/videos/VFX Content/CAMPUS SHOES HD.mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 14, title: 'Fast Paced Ad', type: 'VFX Content', duration: '00:40', video: '/videos/VFX Content/FAST PACED AD  (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 15, title: 'Rare Rabbit AI Model', type: 'VFX Content', duration: '00:25', video: '/videos/VFX Content/RARE RABBIT AI MODEL AD .mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
  { id: 16, title: 'Golden Matrimonial', type: 'YouTube Video', duration: '00:58', video: '/videos/YouTube Video/Found Through Trust - goldenmatrimonial (1) (1).mp4', desc: 'A showcase of AI-crafted stories, films and experiences.' },
];

const categories = [
  { name: 'Showreel / Brand Films', match: 'Showreel / Brand Films' },
  { name: 'Client Case Studies', match: 'Client Case Studies' },
  { name: 'Micro Drama Series', match: 'Micro Drama Series' },
  { name: 'Social Media Vertical Content', match: 'Social Media Vertical Content' },
  { name: 'VFX Content', match: 'VFX Content' },
  { name: 'YouTube Video', match: 'YouTube Video' },
];

function VideoCard({ p, index, onPlayFullscreen }: { p: VideoItem; index: number; onPlayFullscreen: (videoUrl: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[20px] overflow-hidden border border-[var(--site-border)] transition-shadow hover:shadow-xl cursor-pointer flex flex-col"
      style={{ backgroundColor: 'var(--site-bg)' }}
      onClick={() => onPlayFullscreen(p.video)}
    >
      <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-[#05050A]">
        <video
          ref={videoRef}
          src={p.video}
          muted={isMuted}
          playsInline
          loop={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--site-muted)' }}>
          {p.type} / {p.duration}
        </p>
        <h3 className="text-[22px] md:text-[26px] font-bold tracking-tight mb-3" style={{ color: 'var(--site-fg)' }}>{p.title}</h3>
        <p className="text-[14px] mb-6 flex-grow leading-relaxed" style={{ color: 'var(--site-muted)' }}>{p.desc}</p>

        <div className="flex items-center text-[12px] font-bold tracking-widest uppercase mt-auto" style={{ color: 'var(--site-fg)' }}>
          VIEW VIDEO <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}

export default function OurWorksPage() {
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  return (
    <SectionPageWrapper>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none dark:hidden" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/8 blur-[140px] pointer-events-none dark:hidden" />

        <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12 md:mb-16">
            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold mb-8 tracking-[-0.04em] leading-[0.9] max-w-[1000px]" style={{ color: 'var(--site-fg)' }}>
              Where ideas<br />come alive.
            </h1>
            <p className="text-[16px] md:text-[18px] font-normal leading-[1.5] max-w-[500px]" style={{ color: 'var(--site-muted)' }}>
              A showcase of AI-crafted stories, films and experiences built for brands that want to move first.
            </p>
          </motion.div>

          <hr className="border-[var(--site-border)] mb-12" />

          {categories.map((cat) => {
            const catVideos = worksData.filter((w) => w.type === cat.match);
            if (catVideos.length === 0) return null;
            return (
              <div key={cat.match} className="mb-16">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-[24px] md:text-[32px] font-bold tracking-[-0.03em] mb-8"
                  style={{ color: 'var(--site-fg)' }}
                >
                  {cat.name}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catVideos.map((work, i) => (
                    <VideoCard key={work.id} p={work} index={i} onPlayFullscreen={setFullscreenVideo} />
                  ))}
                </div>
              </div>
            );
          })}
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
    </SectionPageWrapper>
  );
}
