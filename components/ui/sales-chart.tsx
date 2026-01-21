"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const timeRanges = ["Últimos 7 días", "Últimos 30 días"];

export function SalesChart() {
  const [selectedRange, setSelectedRange] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const dataPoints = [
    { x: 0, y: 250, value: "$890" },
    { x: 200, y: 230, value: "$1,120" },
    { x: 400, y: 120, value: "$1,450" },
    { x: 600, y: 150, value: "$1,280" },
    { x: 800, y: 50, value: "$1,680" },
  ];

  return (
    <div className="bg-card p-8 rounded-xl border-2 border-border shadow-sm transition-all duration-200 hover:border-[var(--border-hover)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold">Resumen de Ventas</h3>
          <p className="text-sm text-foreground-muted">
            Crecimiento de ingresos vs. semana pasada
          </p>
        </div>
        <div className="flex gap-2">
          {timeRanges.map((range, i) => (
            <button
              key={range}
              onClick={() => setSelectedRange(i)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200",
                selectedRange === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-foreground-muted hover:bg-[var(--muted-hover)] hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-[300px] w-full mt-4">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d="M0,250 Q100,220 200,230 T400,120 T600,150 T800,50 L800,300 L0,300 Z"
            fill="url(#gradient)"
            className="transition-opacity duration-300"
          />
          {/* Line */}
          <path
            d="M0,250 Q100,220 200,230 T400,120 T600,150 T800,50"
            fill="none"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeWidth="4"
            className="transition-all duration-300"
          />
          {/* Interactive points */}
          {dataPoints.map((point, i) => (
            <g key={i}>
              {/* Larger invisible hover area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="20"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Visible point */}
              <circle
                cx={point.x}
                cy={point.y}
                fill="var(--primary)"
                r={hoveredPoint === i ? 10 : 6}
                className="transition-all duration-200"
                style={{
                  filter:
                    hoveredPoint === i
                      ? "drop-shadow(0 0 8px var(--primary))"
                      : "none",
                }}
              />
              {/* Tooltip */}
              {hoveredPoint === i && (
                <g>
                  <rect
                    x={point.x - 35}
                    y={point.y - 45}
                    width="70"
                    height="30"
                    rx="6"
                    fill="var(--foreground)"
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={point.x}
                    y={point.y - 25}
                    textAnchor="middle"
                    fill="var(--background)"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {point.value}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
        <div className="flex justify-between mt-4 px-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, i) => (
            <span
              key={day}
              className={cn(
                "text-xs font-bold transition-colors duration-200",
                hoveredPoint !== null && Math.floor(hoveredPoint * 1.4) === i
                  ? "text-primary"
                  : "text-foreground-muted"
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
