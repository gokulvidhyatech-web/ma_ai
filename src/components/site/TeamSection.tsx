import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Users, ArrowRight, Instagram } from 'lucide-react';
import { SectionEyebrow, fadeInUp } from '@/components/site/SiteChrome';
import { useTheme } from '@/hooks/use-theme';

import teamMeena from '@/assets/team-meena.jpg';
import teamPrarthana from '@/assets/team-prarthana.jpg';
import teamVinay from '@/assets/1ebc6027-b395-4200-8c9d-b996c087f377.JPG.jpeg';
import teamSouvik from '@/assets/ai_creators/Ajith ( ai creator ).jpeg';
import teamOrbit from '@/assets/team-orbit.jpg';
import teamOrbitWhite from '@/assets/team-orbit-white-theme.png';

interface Props {
  standalone?: boolean;
}

export const TeamSection = ({ standalone }: Props) => {
  const { theme } = useTheme();

  const team = [
    {
      name: 'Meena Chabbria',
      role: 'Founder & Chief Everything Officer',
      bio: 'The one who started it all — quite literally. Meena is sales, strategy and spotlight energy rolled into one person.',
      ig: 'meena_chhabbria',
      image: teamMeena,
      imagePosition: 'object-center'
    },
    {
      name: 'Prarthana Chabbria',
      role: 'Co-Founder & Head of Operations (Certified Diva Boss)',
      bio: 'Runs the entire operation on caffeine, precision and zero patience for anything less than excellent.',
      ig: 'Prarthana_chabbria',
      image: teamPrarthana
    },
    {
      name: 'Vinay Sakhrani',
      role: 'Co-Founder & Creative Director',
      bio: 'Leads the creative across every project. Measured by default, relentless when the work calls for it.',
      ig: 'Vinay_sakhrani',
      image: teamVinay
    },
    {
      name: 'Souvik Seal',
      role: 'Co-Founder & CEO',
      bio: 'The brain of the operation, in the most literal sense. Souvik lives life on Sop\'s and runs on spreadsheets, and cold hard data.',
      ig: 'seal.souvik',
      image: teamSouvik,
      imagePosition: 'object-center'
    }
  ];

  return (
    <section
      id="team"
      className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-300 ${standalone ? '' : 'border-t border-[var(--site-border)]'}`}
      style={{ backgroundColor: 'var(--site-bg)' }}
    >
      <div className="absolute right-[-45%] sm:right-[-10%] top-[2%] sm:top-[-8%] w-[1100px] max-w-[160%] sm:max-w-[85%] pointer-events-none select-none z-0">
        <img src={teamOrbitWhite} alt="" aria-hidden="true" loading="lazy" className="w-full h-auto opacity-40 sm:opacity-80 dark:hidden" />
        <img src={teamOrbit} alt="" aria-hidden="true" loading="lazy" className="w-full h-auto opacity-40 sm:opacity-80 hidden dark:block" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--site-bg) 0%, transparent 40%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--site-bg) 0%, transparent 40%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--site-bg) 0%, transparent 15%)' }}></div>
      </div>

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none dark:hidden" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/8 blur-[140px] pointer-events-none dark:hidden" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-10 md:mb-14">
          <SectionEyebrow>04 / The team</SectionEyebrow>
          <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.04em] leading-[0.9]" style={{ color: 'var(--site-fg)' }}>The minds</h2>
          <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold mb-8 tracking-[-0.04em] leading-[0.9]" style={{ color: 'var(--site-fg)' }}>behind ma.ai</h2>
          <div className="h-[2px] w-20 bg-[#8B5CF6]/40 mb-6"></div>
          <p className="text-[18px] max-w-[450px] font-normal leading-[1.5]" style={{ color: 'var(--site-muted)' }}>
            A team of strategists, creators and engineers building AI with purpose.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="bg-[#0B0B13] rounded-[24px] overflow-hidden group relative border border-white/5 shadow-2xl"
            >
              <div className="absolute bottom-0 left-0 w-full h-[50%] rounded-b-[24px] border-b-[2px] border-x-[2px] border-transparent bg-gradient-to-t from-[#7C3AED]/30 to-transparent p-[1px] z-30 pointer-events-none" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'destination-out' }}></div>
              <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#7C3AED]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

              <div className="h-[320px] sm:h-[380px] overflow-hidden relative bg-[#0B0B13]">
                <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.imagePosition || 'object-top'} grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-[20%] group-hover:scale-105 transition-all duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B13] via-[#0B0B13]/70 to-transparent z-10"></div>
              </div>

              <div className="p-6 sm:p-8 relative z-20 -mt-24">
                <h3 className="text-[24px] font-bold text-white mb-2 tracking-[-0.02em]">{member.name}</h3>
                <p className="text-[#7C3AED] text-[12px] font-bold mb-8 tracking-[0.05em]">{member.role}</p>

                <div className="space-y-1 mb-8">
                  <p className="text-gray-400 text-[13px] font-light leading-[1.6] line-clamp-4">{member.bio}</p>
                </div>
              </div>

                <a href={`https://instagram.com/${member.ig}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] transition-all cursor-pointer backdrop-blur-sm z-30">
                  <Instagram size={18} />
                </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-[var(--site-border)] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden transition-colors duration-300"
          style={{ color: 'var(--site-fg)' }}
        >
          <div className="absolute left-0 top-0 w-[30%] h-full bg-gradient-to-r from-[#8B5CF6]/5 to-transparent pointer-events-none"></div>

          <div className="flex items-center gap-4 sm:gap-8 mb-6 md:mb-0 relative z-10">
            <div className="w-[72px] h-[72px] flex items-center justify-center relative">
              <div className="absolute inset-0 border border-[var(--site-border)] rounded-full border-dashed"></div>
              <div className="absolute inset-2 border border-[var(--site-border)] rounded-full"></div>
              <div className="absolute inset-3 border border-[#8B5CF6]/20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--site-bg)' }}>
                <Users size={24} style={{ color: 'var(--site-fg)' }} />
              </div>
            </div>

            <div className="border-l border-[var(--site-border)] pl-4 sm:pl-8">
              <h4 className="text-[19px] sm:text-[24px] font-bold leading-tight tracking-[-0.02em]" style={{ color: 'var(--site-fg)' }}>Different minds.</h4>
              <h4 className="text-[19px] sm:text-[24px] font-bold leading-tight tracking-[-0.02em]" style={{ color: 'var(--site-fg)' }}>One shared purpose.</h4>
            </div>
          </div>

          <Link to="/members" className="hover:opacity-70 transition-colors flex items-center gap-4 border-b pb-2 text-[13px] tracking-[0.08em] uppercase font-semibold relative z-10 group" style={{ color: 'var(--site-fg)', borderColor: 'var(--site-muted)' }}>
            View more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--site-muted)' }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
