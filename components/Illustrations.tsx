import React from 'react';

export const BobaCharacterIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Cup */}
    <path d="M25,20 H75 L70,80 H30 Z" fill="#F5E6D3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Tea */}
    <path d="M26,25 H74 L69.5,78 H30.5 Z" fill="#C68A5A" />
    {/* Straw */}
    <rect x="65" y="5" width="6" height="30" fill="#60A5FA" stroke="currentColor" strokeWidth="2" rx="3" />
    {/* Boba Pearls */}
    <circle cx="38" cy="70" r="4" fill="#4A2E2C" />
    <circle cx="50" cy="75" r="5" fill="#4A2E2C" />
    <circle cx="62" cy="68" r="4" fill="#4A2E2C" />
    <circle cx="45" cy="60" r="3" fill="#4A2E2C" />
    <circle cx="58" cy="55" r="4" fill="#4A2E2C" />
    {/* Face */}
    <circle cx="42" cy="40" r="3" fill="currentColor" />
    <circle cx="58" cy="40" r="3" fill="currentColor" />
    <path d="M45,50 Q50,58 55,50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="35" cy="45" r="4" fill="#FBBF24" opacity="0.6" />
    <circle cx="65" cy="45" r="4" fill="#FBBF24" opacity="0.6" />
  </svg>
);

export const CelebrationBobaIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Sparkles */}
        <path d="M15 10 L 20 15 L 15 20 L 10 15 Z" fill="#FBBF24" />
        <path d="M85 20 L 90 25 L 85 30 L 80 25 Z" fill="#FBBF24" />
        <circle cx="25" cy="5" r="3" fill="#60A5FA" />
        <circle cx="75" cy="10" r="4" fill="#34D399" />

        {/* Cup */}
        <path d="M25,20 H75 L70,80 H30 Z" fill="#F5E6D3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        {/* Tea */}
        <path d="M26,25 H74 L69.5,78 H30.5 Z" fill="#C68A5A" />
        {/* Straw */}
        <rect x="65" y="5" width="6" height="30" fill="#60A5FA" stroke="currentColor" strokeWidth="2" rx="3" />
        {/* Boba Pearls */}
        <circle cx="38" cy="70" r="4" fill="#4A2E2C" />
        <circle cx="50" cy="75" r="5" fill="#4A2E2C" />
        <circle cx="62" cy="68" r="4" fill="#4A2E2C" />
        <circle cx="45" cy="60" r="3" fill="#4A2E2C" />
        <circle cx="58" cy="55" r="4" fill="#4A2E2C" />
        {/* Face */}
        <path d="M40,40 Q42,35 44,40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M56,40 Q58,35 60,40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M42,50 Q50,62 58,50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
);

export const BobaPearlIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="10" cy="10" r="8" fill="currentColor" />
    <circle cx="7" cy="7" r="2" fill="white" opacity="0.3" />
  </svg>
);

export const ShakerIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 90 L 35 25 C 35 15, 65 15, 65 25 L 70 90 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M30 28 L 70 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <path d="M42 25 L 42 10 C 42 5, 58 5, 58 10 L 58 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const ShavedIceIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 80 H 80 Q 85 60, 50 60 Q 15 60, 20 80 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M30 60 Q 50 20, 70 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M40 80 L 45 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <path d="M60 80 L 55 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const RobotIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="25" y="30" width="50" height="50" rx="5" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="40" y="15" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="40" cy="55" r="5" stroke="currentColor" fill="none" strokeWidth="3" />
    <circle cx="60" cy="55" r="5" stroke="currentColor" fill="none" strokeWidth="3" />
    <path d="M45 70 Q 50 75, 55 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M35 15 L 30 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M65 15 L 70 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
