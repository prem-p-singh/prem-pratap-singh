interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`glass-card text-card-foreground p-6 ${
        hover ? "glow-hover hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
