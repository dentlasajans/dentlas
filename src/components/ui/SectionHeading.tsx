import { ReactNode } from 'react';

export const SectionHeading = ({ children, subtitle }: { children: ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    {subtitle && (
      <p className="text-brand text-xs uppercase tracking-[0.3em] font-bold mb-4">
        {subtitle}
      </p>
    )}
    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
      {children}
    </h2>
  </div>
);
