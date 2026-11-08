import React from 'react';

interface BrandLogoProps {
  className?: string;
  inverted?: boolean;
  alt?: string;
}

/**
 * Official VAC (Virtually Ask Cath) Branding Logo
 * Uses the client's authentic transparent PNG asset:
 * /assets/aistudio/VAC-Navbar-Transparent-HQ_3a69ec76.png
 * Features zero background boxes, authentic brand colors, and clean dark-mode inversion.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-8 sm:h-9 md:h-10 w-auto',
  inverted = false,
  alt = 'VAC · Virtually Ask Cath'
}) => {
  return (
    <img
      src="/assets/aistudio/VAC-Navbar-Transparent-HQ_3a69ec76.png"
      alt={alt}
      className={`object-contain transition-all duration-200 select-none pointer-events-auto ${
        inverted ? 'brightness-0 invert opacity-95 hover:opacity-100' : 'hover:opacity-90'
      } ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export default BrandLogo;

