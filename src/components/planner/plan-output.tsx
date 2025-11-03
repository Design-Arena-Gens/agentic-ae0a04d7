import type { ReactNode } from "react";
import type { ClientBrief, PlanningReport } from "@/lib/types";

interface PlanOutputProps {
  brief: ClientBrief | null;
  report: PlanningReport | null;
}

export function PlanOutput({ brief, report }: PlanOutputProps) {
  if (!brief || !report) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/50 text-center text-sm text-slate-500">
        Craft a client brief to generate an enterprise-grade delivery blueprint.
      </div>
    );
  }

  return (
    <article className="space-y-10 rounded-3xl border border-slate-200 bg-white px-10 py-12 shadow-2xl shadow-slate-600/10">
      <header className="space-y-3 border-b border-slate-100 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Strategic Program Blueprint
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          {brief.projectName} · {brief.organizationName}
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Industry:{" "}
          <span className="font-medium capitalize text-slate-700">
            {friendlyIndustryLabel(brief.industry)}
          </span>{" "}
          · Delivery Cadence:{" "}
          <span className="font-medium">
            {friendlyCadenceLabel(report.deliveryPlan.cadence)} (
            {report.deliveryPlan.sprintLengthWeeks}-week sprint)
          </span>{" "}
          · Compliance:{" "}
          <span className="font-medium">
            {brief.compliance.length
              ? brief.compliance.join(", ")
              : "Enterprise best practice"}
          </span>
        </p>
      </header>

      <Section title="Executive Summary" layout="two-column">
        <BulletList items={report.executiveSummary} />
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-50">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Guiding Principles
          </p>
          <BulletList items={report.guidingPrinciples} variant="light" />
        </div>
      </Section>

      <Section title="Target Architecture">
        <div className="grid gap-4 lg:grid-cols-2">
          {report.architecture.map((component) => (
            <div
              key={component.name}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
            >
              <h3 className="text-sm font-semibold text-slate-800">
                {component.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {component.technology}
              </p>
              <BulletList items={component.responsibilities} size="sm" />
              {component.notes ? (
                <p className="mt-2 rounded-lg bg-white px-3 py-2 text-xs text-slate-500">
                  {component.notes}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Security & Compliance Posture">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Security Directives">
            <BulletList items={report.securityStrategy.posture} size="sm" />
          </Card>
          <Card title="Control Framework">
            <BulletList items={report.securityStrategy.controls} size="sm" />
          </Card>
          <Card title="Governance Rhythm">
            <BulletList items={report.securityStrategy.governance} size="sm" />
          </Card>
        </div>
      </Section>

      <Section title="Delivery Operating System">
        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Backlog Highlights">
            <div className="space-y-4">
              {report.deliveryPlan.backlogHighlights.map((item) => (
                <div key={item.title} className="space-y-2 rounded-xl bg-white p-4">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.description}</p>
                  <BulletList items={item.acceptanceCriteria} size="xs" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="xl:col-span-2" title="Sprint Roadmap">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {report.deliveryPlan.sprintSchedule.map((sprint) => (
                <div
                  key={sprint.sprintNumber}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <span>Sprint {sprint.sprintNumber}</span>
                    <span>{friendlyCadenceLabel(report.deliveryPlan.cadence)}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {sprint.objective}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-500">
                      Key Activities
                    </p>
                    <BulletList items={sprint.keyActivities} size="xs" />
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-500">
                      Definition of Done
                    </p>
                    <BulletList items={sprint.deliverables} size="xs" />
                  </div>
                  <p className="mt-2 rounded-lg bg-slate-900/80 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-100">
                    QA Focus · {sprint.qaFocus}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Team Composition">
        <div className="grid gap-3 md:grid-cols-2">
          {report.teamStructure.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
                  {role.title}
                </h3>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  {role.allocation}
                </span>
              </div>
              <BulletList items={role.responsibilities} size="xs" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Quality Engineering">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Automation Blueprint">
            <BulletList items={report.qualityStrategy.automation} size="sm" />
          </Card>
          <Card title="Non-Functional Readiness">
            <BulletList items={report.qualityStrategy.nonFunctional} size="sm" />
          </Card>
          <Card title="Release Management">
            <BulletList items={report.qualityStrategy.releaseManagement} size="sm" />
          </Card>
        </div>
      </Section>

      <Section title="Risk Register & Success Metrics">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Risk Portfolio">
            <div className="space-y-3">
              {report.riskRegister.map((risk) => (
                <div
                  key={risk.category}
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {risk.category}
                  </p>
                  <p className="mt-1 font-medium text-slate-700">
                    {risk.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Mitigation: <span className="text-slate-600">{risk.mitigation}</span>
                  </p>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Success Measures">
            <BulletList items={report.successMetrics} size="sm" />
            <div className="mt-4 rounded-xl bg-emerald-500/10 px-4 py-3 text-xs text-emerald-900">
              Program Governance: Weekly executive reports, monthly steering committee, and data-backed KPI dashboards.
            </div>
          </Card>
        </div>
      </Section>

      <footer className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-500">
        <p>
          Next Steps: align with client stakeholders on scope confirmation, refine budget envelopes, and schedule Sprint 0 enablement with security &
          compliance workstreams. This blueprint is ready to socialize with C-suite sponsors and program leadership.
        </p>
      </footer>
    </article>
  );
}

function Section({
  title,
  children,
  layout,
}: {
  title: string;
  children: ReactNode;
  layout?: "two-column";
}) {
  return (
    <section className="space-y-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <div className="h-px flex-1 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
      </div>
      <div
        className={
          layout === "two-column"
            ? "grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
            : "space-y-4"
        }
      >
        {children}
      </div>
    </section>
  );
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BulletList({
  items,
  variant = "default",
  size = "md",
}: {
  items: string[];
  variant?: "default" | "light";
  size?: "xs" | "sm" | "md";
}) {
  if (!items?.length) return null;

  const sizeClasses =
    size === "xs"
      ? "text-xs leading-relaxed"
      : size === "sm"
        ? "text-sm leading-relaxed"
        : "text-sm leading-relaxed";

  const bulletColor =
    variant === "light" ? "before:bg-slate-200" : "before:bg-slate-400";

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative pl-4 text-slate-600 ${sizeClasses} before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full ${bulletColor}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function friendlyIndustryLabel(industry: string) {
  const mapping: Record<string, string> = {
    finance: "Financial Services",
    healthcare: "Healthcare & Life Sciences",
    retail: "Retail & Ecommerce",
    technology: "Technology & SaaS",
    "public-sector": "Public Sector",
  };
  return mapping[industry] ?? "Enterprise";
}

function friendlyCadenceLabel(cadence: string) {
  const mapping: Record<string, string> = {
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    monthly: "Monthly",
  };
  return mapping[cadence] ?? "Bi-weekly";
}
