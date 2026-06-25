"use client";

import { useState } from "react";
import SiteImageSlotCard from "@/components/admin/SiteImageSlotCard";

export type FotoSlot = {
  key: string;
  label: string;
  ratio: number;
  ratioLabel: string;
  size: string;
  currentSrc: string;
  overridden: boolean;
};
export type FotoGroup = { group: string; slots: FotoSlot[] };

/** Foto Website — tab antar-grup section (Beranda, Tim, Layanan, Menu …). */
export default function FotoTabs({ groups }: { groups: FotoGroup[] }) {
  const [active, setActive] = useState(0);
  const current = groups[active] ?? groups[0];

  return (
    <div>
      {/* Segmented tabs */}
      <div className="mb-8 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.group}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                on
                  ? "bg-ad-text text-ad-bg shadow-[0_4px_14px_-4px_var(--ad-shadow)]"
                  : "bg-ad-panel text-ad-muted ring-1 ring-inset ring-ad-border hover:text-ad-text hover:ring-ad-border-strong"
              }`}
            >
              {g.group}
              <span
                className={`rounded-full px-1.5 py-px text-[10.5px] font-semibold tabular-nums ${
                  on ? "bg-ad-bg/20 text-ad-bg" : "bg-ad-accent-weak text-ad-accent"
                }`}
              >
                {g.slots.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid kartu grup aktif */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {current.slots.map((s) => (
          <SiteImageSlotCard
            key={s.key}
            slotKey={s.key}
            label={s.label}
            ratio={s.ratio}
            ratioLabel={s.ratioLabel}
            size={s.size}
            currentSrc={s.currentSrc}
            overridden={s.overridden}
          />
        ))}
      </div>
    </div>
  );
}
