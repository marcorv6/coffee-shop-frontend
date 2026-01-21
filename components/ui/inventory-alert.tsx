import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingDown, Package, ChevronRight } from "lucide-react";

interface InventoryAlertProps {
  name: string;
  current: string;
  target: string;
  severity: "critical" | "warning" | "normal";
  onClick?: () => void;
}

export function InventoryAlert({
  name,
  current,
  target,
  severity,
  onClick,
}: InventoryAlertProps) {
  const icons = {
    critical: AlertTriangle,
    warning: TrendingDown,
    normal: Package,
  };

  const styles = {
    critical: {
      bg: "bg-destructive/10 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/15",
      icon: "bg-destructive/20 text-destructive",
      title: "text-destructive",
      subtitle: "text-destructive/70",
    },
    warning: {
      bg: "bg-warning/10 border-warning/20 hover:border-warning/40 hover:bg-warning/15",
      icon: "bg-warning/20 text-warning-foreground",
      title: "text-warning-foreground",
      subtitle: "text-warning-foreground/70",
    },
    normal: {
      bg: "bg-muted border-border hover:border-[var(--border-hover)] hover:bg-[var(--muted-hover)]",
      icon: "bg-muted text-foreground-muted",
      title: "text-foreground",
      subtitle: "text-foreground-muted",
    },
  };

  const Icon = icons[severity];
  const style = styles[severity];

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 group",
        style.bg,
        onClick && "cursor-pointer active:scale-[0.99]"
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
      <div
        className={cn(
          "size-10 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
          style.icon
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className={cn("text-sm font-bold", style.title)}>{name}</p>
        <p className={cn("text-xs", style.subtitle)}>
          Restante: {current} / Objetivo: {target}
        </p>
      </div>
      {onClick && (
        <ChevronRight
          className={cn(
            "h-5 w-5 transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
            style.title
          )}
        />
      )}
    </div>
  );
}
