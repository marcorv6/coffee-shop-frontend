import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    type: "up" | "down" | "neutral";
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  onClick,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card p-6 rounded-xl border-2 border-border shadow-sm transition-all duration-200",
        onClick
          ? "cursor-pointer hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:shadow-sm active:scale-[0.99]"
          : "hover:border-[var(--border-hover)]"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={cn(
            "p-2 rounded-lg transition-transform duration-200",
            iconBgColor,
            onClick && "group-hover:scale-110"
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        {trend && (
          <span
            className={cn(
              "text-sm font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full transition-colors",
              trend.type === "up" && "text-success bg-success/10",
              trend.type === "down" && "text-destructive bg-destructive/10",
              trend.type === "neutral" && "text-foreground-muted bg-muted"
            )}
          >
            {trend.type === "up" && <TrendingUp className="h-3 w-3" />}
            {trend.type === "down" && <TrendingDown className="h-3 w-3" />}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-foreground-muted text-sm font-medium">{title}</p>
      <p className="text-2xl font-black mt-1">{value}</p>
    </div>
  );
}
