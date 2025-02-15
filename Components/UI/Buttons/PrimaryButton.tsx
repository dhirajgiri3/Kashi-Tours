import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  variant?: 'default' | 'gradient';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  icon = true,
  variant = 'default',
  className = '',
  ...props 
}) => {
  return (
    <button
      type="button"
      className={`
        group
        relative flex items-center justify-center overflow-hidden
        transition-all duration-300 ease-out
        ${variant === 'gradient' 
          ? 'bg-[radial-gradient(65.28%_65.28%_at_50%_100%,rgba(218,165,32,0.8)_0%,rgba(218,165,32,0)_100%),linear-gradient(0deg,#DAA520,#B8860B)]'
          : 'bg-gold'
        }
        hover:bg-gold-dark
        rounded-[0.75rem] border-none outline-none
        py-3 px-4 text-base font-medium leading-normal 
        active:scale-95 animate-button-glow
        backdrop-filter backdrop-blur-xl
        ${className}`}
      {...props}
    >
      <span className="
        absolute top-0 right-0 h-4 w-4
        inline-block transition-all duration-500
        bg-[radial-gradient(100%_75%_at_55%,rgba(255,215,0,0.5)_0%,rgba(218,165,32,0)_100%)]
        shadow-[0_0_3px_rgba(0,0,0,0.3)]
        rounded-bl-[0.5rem] rounded-tr-[0.75rem]
        group-hover:animate-fold-corner
        after:content-[''] after:absolute after:top-0 after:right-0
        after:w-[150%] after:h-[150%] after:rotate-45
        after:-translate-y-[18px] after:bg-white/20
        after:pointer-events-none
        backdrop-filter backdrop-blur-xl
      "/>
      
      <div className="overflow-hidden w-full h-full pointer-events-none absolute z-[1]">
        {[...Array(10)].map((_, i) => (
          <i key={i} 
             style={{
               left: `${[10, 30, 25, 44, 50, 75, 88, 58, 98, 65][i]}%`,
               animationDuration: `${[2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]}s`,
               animationDelay: `${[0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]}s`,
               opacity: [1, 0.7, 0.8, 0.6, 1, 0.5, 0.9, 0.8, 0.6, 1][i]
             }}
             className="absolute -bottom-[10px] w-[2px] h-[2px] bg-gold-light rounded-full animate-floating-points"
          />
        ))}
      </div>

      <span className="
        z-[2] relative w-full
        text-white/90 flex items-center justify-center gap-1.5
        text-sm font-medium leading-normal
        transition-colors duration-200
        group-hover:text-white/80
      ">
        {icon && (
          <svg
            className="w-[18px] h-[18px] transition-all duration-300
                       stroke-white group-hover:stroke-white/90
                       group-hover:animate-[dasharray_1s_linear_forwards,filled_0.1s_linear_forwards_0.95s]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          >
            <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
