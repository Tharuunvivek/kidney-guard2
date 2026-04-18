import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
}

export const MetricCard = ({ label, value, unit, icon, trend, className }: MetricCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground">{icon}</div>
        {trend && (
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            trend === "up" && "bg-status-danger/10 text-status-danger",
            trend === "down" && "bg-status-normal/10 text-status-normal",
            trend === "stable" && "bg-muted/50 text-muted-foreground"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
    </Card>
  );
};
