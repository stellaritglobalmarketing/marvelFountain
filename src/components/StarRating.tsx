import { Star } from "lucide-react";

export default function StarRating({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 text-gold ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}
