import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "Normal" | "Mild dehydration" | "High kidney strain";
  description: string;
}

export const StatusIndicator = ({ status, description }: StatusIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "Normal":
        return "bg-status-normal text-foreground";
      case "Mild dehydration":
        return "bg-status-warning text-background";
      case "High kidney strain":
        return "bg-status-danger text-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getGlowColor = () => {
    switch (status) {
      case "Normal":
        return "shadow-status-normal/50";
      case "Mild dehydration":
        return "shadow-status-warning/50";
      case "High kidney strain":
        return "shadow-status-danger/50";
      default:
        return "";
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-8 relative overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-muted-foreground">Kidney Health Status</h3>
          <div className={cn(
            "h-3 w-3 rounded-full animate-pulse-slow",
            getGlowColor(),
            getStatusColor().split(" ")[0]
          )} />
        </div>
        <div className={cn(
          "inline-flex px-6 py-3 rounded-full text-lg font-semibold shadow-lg",
          getStatusColor(),
          getGlowColor()
        )}>
          {status}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
    </Card>
  );
};
