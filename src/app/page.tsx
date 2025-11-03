'use client';

import { useState } from "react";
import { PlanningForm } from "@/components/planner/planning-form";
import { PlanOutput } from "@/components/planner/plan-output";
import { createPlanningReport } from "@/lib/planner";
import type { ClientBrief, PlanningReport } from "@/lib/types";

export default function Home() {
  const [brief, setBrief] = useState<ClientBrief | null>(null);
  const [report, setReport] = useState<PlanningReport | null>(null);

  const handleGenerate = (clientBrief: ClientBrief) => {
    setBrief(clientBrief);
    setReport(createPlanningReport(clientBrief));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white py-16">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 xl:flex-row">
        <div className="w-full xl:w-[42%]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-slate-900/90 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-50 shadow-lg shadow-slate-900/20">
              Enterprise Planning Engine
            </span>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Turn Forbes-tier requirements into an actionable, secure delivery
                blueprint.
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Codify strategy, architecture, security, and sprint roadmaps in one
                artifact that stands up to executive scrutiny. Built for internal
                planning teams with a security-first mandate.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <PlanningForm onGenerate={handleGenerate} />
          </div>
        </div>
        <div className="w-full xl:w-[58%]">
          <PlanOutput brief={brief} report={report} />
        </div>
      </main>
    </div>
  );
}
