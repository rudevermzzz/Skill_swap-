import React from 'react';

interface SkillSwapLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const SkillSwapLogo: React.FC<SkillSwapLogoProps> = ({ 
  className = "w-9 h-9", 
  size,
  showText = false,
  textColor = "text-slate-900"
}) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <defs>
          <linearGradient id="ssCompBlueGrad" x1="15%" y1="10%" x2="90%" y2="70%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="ssCompTealGrad" x1="10%" y1="30%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <filter id="ssCompShadowTop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="4" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.3" />
          </filter>
          <filter id="ssCompShadowBottom" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-1" dy="-3" stdDeviation="4" floodColor="#047857" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* TOP BLUE PERSON & RIGHT ARROW */}
        <g filter="url(#ssCompShadowTop)">
          <circle cx="78" cy="38" r="17" fill="url(#ssCompBlueGrad)" />
          <path
            d="M 72 62
               C 70 82, 88 104, 122 104
               C 142 104, 156 96, 160 88
               L 160 97
               L 186 80
               L 160 63
               L 160 72
               C 146 72, 128 76, 110 68
               C 88 58, 80 46, 72 62 Z"
            fill="url(#ssCompBlueGrad)"
          />
        </g>

        {/* BOTTOM GREEN PERSON & LEFT ARROW */}
        <g filter="url(#ssCompShadowBottom)">
          <circle cx="122" cy="162" r="17" fill="url(#ssCompTealGrad)" />
          <path
            d="M 128 138
               C 130 118, 112 96, 78 96
               C 58 96, 44 104, 40 112
               L 40 103
               L 14 120
               L 40 137
               L 40 128
               C 54 128, 72 124, 90 132
               C 112 142, 120 154, 128 138 Z"
            fill="url(#ssCompTealGrad)"
          />
        </g>
      </svg>

      {showText && (
        <span className={`text-xl font-black tracking-tight ${textColor}`}>
          Skill<span className="text-cyan-600">Swap</span>
        </span>
      )}
    </div>
  );
};
