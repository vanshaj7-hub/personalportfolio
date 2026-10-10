type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          className="fill-surface-low stroke-border-subtle"
          strokeWidth="1"
        />
        <path
          d="M9 22V10h7.2c3.1 0 5 1.8 5 4.6 0 2.1-1.1 3.6-2.9 4.2L22 22h-3.2l-3.1-4.8H12.2V22H9zm3.2-7.6h3.6c1.4 0 2.2-.7 2.2-1.8s-.8-1.8-2.2-1.8h-3.6v3.6z"
          fill="#4edea3"
        />
        <rect
          x="21"
          y="8"
          width="3"
          height="3"
          rx="0.5"
          fill="#4edea3"
          opacity="0.55"
        />
        <rect
          x="21"
          y="13"
          width="3"
          height="10"
          rx="1"
          fill="#e0e3e5"
          opacity="0.2"
        />
      </svg>
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight text-foreground">
          PortfolioVanshaj
        </span>
      )}
    </span>
  );
}
