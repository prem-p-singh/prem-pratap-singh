interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg border border-border p-6 ${
        hover ? "transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
