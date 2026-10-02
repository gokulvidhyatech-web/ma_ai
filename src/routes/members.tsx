import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { PageShell, Section } from '@/components/site/PageShell';
import { Instagram } from 'lucide-react';
import team1 from '@/assets/team-1.jpg';
import teamPrarthana from '@/assets/team-prarthana.jpg';
import teamMeena from '@/assets/team-meena.jpg';
import teamVinay from '@/assets/1ebc6027-b395-4200-8c9d-b996c087f377.JPG.jpeg';
import teamSouvik from '@/assets/Souvik seal - ceo.jpeg';

// AI Creators
import imgAdithya from '@/assets/ai_creators/Adithya Krishna - ai creator.jpeg';
import imgAjith from '@/assets/ai_creators/Ajith ( ai creator ).jpeg';
import imgImran from '@/assets/ai_creators/SYED IMRAN ai creator.jpeg';
import imgUnknown from '@/assets/ai_creators/WhatsApp Image 2026-09-10 at 00.15.49.jpeg';
import imgAyush from '@/assets/ai_creators/ayush - ai creator.jpeg';
import imgAmarnath from '@/assets/ai_creators/Amarnath - ai creator.png';
import imgTibin from '@/assets/ai_creators/Tibin ai creator.png';
import imgDarshita from '@/assets/ai_creators/Darshita Maheswari.png';

export const Route = createFileRoute('/members')({
  head: () => ({
    meta: [
      { title: 'Members — The team behind ma.ai' },
      { name: 'description', content: 'Meet the major figures and the broader team behind ma.ai.' },
    ],
  }),
  component: MembersPage,
});

const majorFigures = [
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
    image: imgAjith,
    imagePosition: 'object-center'
  }
];

const gridMembers: { name: string; role: string; image: string; imagePosition?: string; imageScale?: string; hoverScale?: string }[] = [
  { name: 'Adithya Krishna', role: 'AI Creator', image: imgAdithya },
  { name: 'Ajith', role: 'AI Creator', image: teamSouvik },
  { name: 'Syed Imran', role: 'AI Creator', image: imgImran, imagePosition: 'object-center' },
  { name: 'Ayush', role: 'AI Creator', image: imgAyush },
  { name: 'Monish', role: 'AI Creator', image: imgUnknown },
  { name: 'Amarnath', role: 'AI Creator', image: imgAmarnath },
  { name: 'Tibin', role: 'AI Creator', image: imgTibin },
  { name: 'Darshita Maheswari', role: 'AI Creator', image: imgDarshita, imagePosition: 'object-top', imageScale: 'scale-[1.35]', hoverScale: 'group-hover:scale-[1.45]' },
];

const TOTAL_GRID_SLOTS = 20;

function MembersPage() {
  return (
    <PageShell
      eyebrow="The Team"
      title="The minds"
      accent="behind ma.ai"
      intro="A team of strategists, creators and engineers building AI with purpose."
    >
      <Section>
        {/* Major Figures Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {majorFigures.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="bg-[#0B0B13] rounded-[24px] overflow-hidden group relative border border-white/5 shadow-2xl"
            >
              <div className="absolute bottom-0 left-0 w-full h-[50%] rounded-b-[24px] border-b-[2px] border-x-[2px] border-transparent bg-gradient-to-t from-[#8B5CF6]/30 to-transparent p-[1px] z-30 pointer-events-none" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'destination-out' }}></div>
              <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

              <div className="h-[320px] sm:h-[380px] overflow-hidden relative bg-[#0B0B13]">
                <img loading="lazy" decoding="async" src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.imagePosition || 'object-top'} opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-[transform,opacity,filter] duration-700 will-change-transform`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B13] via-[#0B0B13]/70 to-transparent z-10"></div>
              </div>

              <div className="p-6 sm:p-8 relative z-20 -mt-24">
                <h3 className="text-[24px] font-bold text-white mb-2 tracking-[-0.02em]">{member.name}</h3>
                <p className="text-[#8B5CF6] text-[12px] font-bold mb-8 tracking-[0.05em]">{member.role}</p>

                <div className="space-y-1 mb-8">
                  <p className="text-gray-400 text-[13px] font-light leading-[1.6] line-clamp-4">{member.bio}</p>
                </div>
              </div>

                <a href={`https://instagram.com/${member.ig}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6] transition-all cursor-pointer backdrop-blur-sm z-30">
                  <Instagram size={18} />
                </a>
            </motion.div>
          ))}
        </div>

        {/* Members Grid section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-[32px] md:text-[48px] font-bold text-[var(--site-fg)] mb-12 tracking-[-0.04em]">Members</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {/* Filled member cards */}
            {gridMembers.map((member, i) => (
              <motion.div
                key={`member-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="aspect-square bg-[#0B0B13] border border-[var(--site-border)] rounded-2xl relative overflow-hidden group hover:border-[#8B5CF6] transition-all duration-300"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={member.image}
                  alt={member.name || 'Team member'}
                  className={`w-full h-full object-cover origin-top ${member.imagePosition || 'object-top'} ${member.imageScale || ''} grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 ${member.hoverScale || 'group-hover:scale-110'} transition-[transform,opacity,filter] duration-500 will-change-transform`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20">
                  <h4 className="text-white font-semibold text-sm md:text-base truncate">{member.name || '—'}</h4>
                  {member.role && (
                    <p className="text-[#8B5CF6] text-[10px] md:text-xs font-medium tracking-wider uppercase mt-0.5">{member.role}</p>
                  )}
                </div>
              </motion.div>
            ))}


          </div>
        </motion.div>
      </Section>
    </PageShell>
  );
}
