type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-md border border-border-subtle bg-surface-low px-2 py-0.5 font-mono text-xs text-muted-variant">
      {children}
    </span>
  );
}
