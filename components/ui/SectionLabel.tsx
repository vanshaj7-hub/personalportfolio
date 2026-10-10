type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-widest text-tertiary ${className}`}
    >
      {children}
    </p>
  );
}
