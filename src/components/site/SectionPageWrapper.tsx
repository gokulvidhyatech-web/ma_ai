import type { ReactNode } from 'react';
import { SiteNav, SiteFooter, fontStyles } from '@/components/site/SiteChrome';
import { AmbientOrb } from '@/components/site/AmbientOrb';

/**
 * Wraps a standalone section page with the same shell as MaLanding:
 * AmbientOrb + SiteNav + spacer + children + SiteFooter.
 * Use this so every /route page feels identical to scrolling to that
 * section on the homepage — same background, nav, and footer.
 */
export const SectionPageWrapper = ({ children }: { children: ReactNode }) => (
  <>
    <style>{fontStyles}</style>
    <div
      className="min-h-screen scroll-smooth transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: 'var(--site-bg)', backgroundImage: 'var(--site-bg-image, none)', color: 'var(--site-fg)', WebkitTextFillColor: 'inherit' }}
    >
      <div className="dark:hidden"><AmbientOrb /></div>
      <SiteNav />
      <main>
        {/* Spacer so content clears the fixed nav bar */}
        <div className="pt-28" />
        {children}
      </main>
      <SiteFooter />
    </div>
  </>
);
