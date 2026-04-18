import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card className={cn(
      "group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
      className
    )}>
      <div className="space-y-4">
        <div className="text-primary transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  );
};
