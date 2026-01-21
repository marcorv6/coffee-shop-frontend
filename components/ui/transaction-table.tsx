import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  items: string;
  status: "completed" | "preparing" | "cancelled";
  total: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onViewAll?: () => void;
  onRowClick?: (transaction: Transaction) => void;
}

const statusStyles = {
  completed: "bg-success/10 text-success",
  preparing: "bg-warning/10 text-warning-foreground",
  cancelled: "bg-muted text-foreground-muted",
};

const statusLabels = {
  completed: "Completado",
  preparing: "En Preparación",
  cancelled: "Anulado",
};

export function TransactionTable({
  transactions,
  onViewAll,
  onRowClick,
}: TransactionTableProps) {
  return (
    <div className="bg-card rounded-xl border-2 border-border shadow-sm overflow-hidden transition-all duration-200 hover:border-[var(--border-hover)]">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <h3 className="text-lg font-bold">Transacciones Recientes</h3>
        <button
          onClick={onViewAll}
          className="text-primary text-sm font-bold transition-all duration-200 hover:text-[var(--primary-hover)] hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 -mx-2 -my-1"
        >
          Ver Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-foreground-muted uppercase tracking-wider">
                ID Pedido
              </th>
              <th className="px-6 py-3 text-xs font-bold text-foreground-muted uppercase tracking-wider">
                Artículo
              </th>
              <th className="px-6 py-3 text-xs font-bold text-foreground-muted uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-xs font-bold text-foreground-muted uppercase tracking-wider">
                Total
              </th>
              {onRowClick && <th className="px-6 py-3 w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className={cn(
                  "transition-all duration-200 group",
                  onRowClick
                    ? "cursor-pointer hover:bg-muted/50 active:bg-muted"
                    : "hover:bg-muted/30"
                )}
                onClick={() => onRowClick?.(tx)}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRowClick(tx);
                        }
                      }
                    : undefined
                }
              >
                <td className="px-6 py-4 text-sm font-medium">{tx.id}</td>
                <td className="px-6 py-4 text-sm text-foreground-muted">
                  {tx.items}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-transform duration-200",
                      statusStyles[tx.status]
                    )}
                  >
                    {statusLabels[tx.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">{tx.total}</td>
                {onRowClick && (
                  <td className="px-6 py-4">
                    <ChevronRight className="h-4 w-4 text-foreground-muted transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
