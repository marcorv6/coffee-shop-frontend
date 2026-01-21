import { cn } from "@/lib/utils";

interface StaffMember {
  name: string;
  role: string;
  avatar?: string;
  hoursWorked: string;
}

interface StaffCardProps {
  staff: StaffMember[];
  onManageSchedules?: () => void;
  onStaffClick?: (member: StaffMember) => void;
}

export function StaffCard({
  staff,
  onManageSchedules,
  onStaffClick,
}: StaffCardProps) {
  return (
    <div className="bg-card rounded-xl border-2 border-border shadow-sm overflow-hidden transition-all duration-200 hover:border-[var(--border-hover)]">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <h3 className="text-lg font-bold">Personal Activo</h3>
        <div className="flex items-center gap-2">
          <span className="size-2 bg-success rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-foreground-muted uppercase">
            Sesión en Vivo
          </span>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {staff.map((member) => (
          <div
            key={member.name}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 border-border transition-all duration-200 group",
              onStaffClick
                ? "cursor-pointer hover:border-primary/50 hover:bg-muted/50 hover:shadow-md active:scale-[0.98] active:shadow-sm"
                : "hover:border-[var(--border-hover)]"
            )}
            onClick={() => onStaffClick?.(member)}
            tabIndex={onStaffClick ? 0 : undefined}
            role={onStaffClick ? "button" : undefined}
            onKeyDown={
              onStaffClick
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onStaffClick(member);
                    }
                  }
                : undefined
            }
          >
            <div
              className={cn(
                "size-12 rounded-full bg-primary/10 bg-cover bg-center border-2 border-transparent flex items-center justify-center transition-all duration-200",
                onStaffClick
                  ? "group-hover:border-primary/30 group-hover:scale-105"
                  : ""
              )}
              style={
                member.avatar
                  ? { backgroundImage: `url('${member.avatar}')` }
                  : undefined
              }
            >
              {!member.avatar && (
                <span className="text-primary font-bold text-sm">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate transition-colors group-hover:text-primary">
                {member.name}
              </p>
              <p className="text-xs text-foreground-muted">{member.role}</p>
            </div>
            <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              {member.hoursWorked}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-muted/50 text-center border-t border-border">
        <button
          onClick={onManageSchedules}
          className="text-sm font-bold text-foreground-muted transition-all duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-4 py-2 -mx-4 -my-2 hover:bg-muted"
        >
          Gestionar Todos los Horarios
        </button>
      </div>
    </div>
  );
}
