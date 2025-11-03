"use client";

import { useState } from "react";
import type { ClientBrief } from "@/lib/types";

const INDUSTRY_OPTIONS = [
  { value: "finance", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare & Life Sciences" },
  { value: "retail", label: "Retail & Ecommerce" },
  { value: "technology", label: "Technology & SaaS" },
  { value: "public-sector", label: "Public Sector" },
];

const TIMELINE_OPTIONS = [
  {
    value: "accelerated",
    label: "Accelerated (<= 12 weeks)",
    description: "Use when speed-to-market is critical.",
  },
  {
    value: "standard",
    label: "Standard (12-16 weeks)",
    description: "Balanced runway with discovery + build tracks.",
  },
  {
    value: "extended",
    label: "Extended (16+ weeks)",
    description: "Supports complex integrations and compliance.",
  },
];

const COMPLIANCE_OPTIONS = [
  { value: "SOC 2", label: "SOC 2 Type II" },
  { value: "ISO 27001", label: "ISO 27001" },
  { value: "HIPAA", label: "HIPAA" },
  { value: "PCI DSS", label: "PCI DSS" },
  { value: "GDPR", label: "GDPR" },
];

const SECURITY_OPTIONS = [
  {
    value: "zero-trust",
    label: "Zero Trust Enforcement",
    description: "Identity-aware proxies, device posture, adaptive MFA.",
  },
  {
    value: "sast-dast",
    label: "SAST & DAST Automation",
    description: "Automated scanning with policy-driven gates.",
  },
  {
    value: "supply-chain",
    label: "Supply Chain Integrity",
    description: "SBOM, signed builds, dependency governance.",
  },
  {
    value: "data-protection",
    label: "Advanced Data Protection",
    description: "Field-level encryption, tokenization, data lineage.",
  },
];

const REGION_OPTIONS = [
  "North America",
  "Europe, Middle East & Africa",
  "Asia-Pacific",
  "Latin America",
];

const BUDGET_OPTIONS = [
  { value: "lean", label: "Lean (optimize for ROI)" },
  { value: "standard", label: "Standard (balanced investment)" },
  { value: "enterprise", label: "Enterprise (premium resourcing)" },
];

const DELIVERY_CADENCE_OPTIONS = [
  { value: "weekly", label: "Weekly Increments" },
  { value: "biweekly", label: "Bi-weekly Sprints" },
  { value: "monthly", label: "Monthly Program Increments" },
];

type FormState = {
  organizationName: string;
  projectName: string;
  industry: string;
  primaryObjective: string;
  keyFeatures: string;
  integrationNotes: string;
  compliance: string[];
  timeline: "accelerated" | "standard" | "extended";
  budget: "lean" | "standard" | "enterprise";
  deliveryCadence: "weekly" | "biweekly" | "monthly";
  targetRegions: string[];
  securityPriorities: string[];
  additionalNotes: string;
};

const DEFAULT_STATE: FormState = {
  organizationName: "",
  projectName: "",
  industry: "technology",
  primaryObjective:
    "Launch a digital platform that modernizes the current customer experience while enabling future product experiments.",
  keyFeatures: [
    "Enterprise-grade authentication with delegated administration",
    "Personalized analytics dashboards for executive stakeholders",
    "Integration hub for legacy ERP and CRM platforms",
  ].join("\n"),
  integrationNotes:
    "Must unify data from Salesforce, SAP, and a custom legacy stack. External vendor APIs have variable reliability.",
  compliance: ["SOC 2", "ISO 27001"],
  timeline: "standard",
  budget: "enterprise",
  deliveryCadence: "biweekly",
  targetRegions: ["North America", "Europe, Middle East & Africa"],
  securityPriorities: ["zero-trust", "sast-dast"],
  additionalNotes:
    "Executive steering committee expects weekly narrative summaries with measurable KPIs.",
};

interface PlanningFormProps {
  onGenerate: (brief: ClientBrief) => void;
}

export function PlanningForm({ onGenerate }: PlanningFormProps) {
  const [formState, setFormState] = useState<FormState>(DEFAULT_STATE);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleMultiValue = (key: keyof FormState, value: string) => {
    setFormState((prev) => {
      const current = new Set<string>(
        Array.isArray(prev[key]) ? (prev[key] as string[]) : [],
      );
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }

      return {
        ...prev,
        [key]: Array.from(current),
      } as FormState;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const brief: ClientBrief = {
      organizationName:
        formState.organizationName.trim() || "Client Organization",
      projectName: formState.projectName.trim() || "Digital Transformation",
      industry: formState.industry,
      primaryObjective: formState.primaryObjective,
      keyFeatures: formState.keyFeatures
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      integrationNotes: formState.integrationNotes,
      compliance: formState.compliance,
      timeline: formState.timeline,
      budget: formState.budget,
      deliveryCadence: formState.deliveryCadence,
      targetRegions: formState.targetRegions,
      securityPriorities: formState.securityPriorities,
      additionalNotes: formState.additionalNotes,
    };

    onGenerate(brief);
    setTimeout(() => setSubmitting(false), 300);
  };

  return (
    <form
      className="space-y-10 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-xl shadow-slate-600/5 backdrop-blur"
      onSubmit={handleSubmit}
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Client Organization
          </label>
          <input
            type="text"
            value={formState.organizationName}
            onChange={(event) => updateField("organizationName", event.target.value)}
            placeholder="e.g. Orion Capital Partners"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Initiative Name
          </label>
          <input
            type="text"
            value={formState.projectName}
            onChange={(event) => updateField("projectName", event.target.value)}
            placeholder="e.g. Falcon Digital Core"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Primary Objective
          </label>
          <textarea
            value={formState.primaryObjective}
            onChange={(event) => updateField("primaryObjective", event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
          <p className="text-xs text-slate-500">
            Frame measurable business outcomes and transformation goals.
          </p>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Signature Features (one per line)
          </label>
          <textarea
            value={formState.keyFeatures}
            onChange={(event) => updateField("keyFeatures", event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
          <p className="text-xs text-slate-500">
            These inform backlog highlights and architectural priorities.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Industry Context
          </label>
          <select
            value={formState.industry}
            onChange={(event) =>
              updateField("industry", event.target.value as FormState["industry"])
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          >
            {INDUSTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Timeline Target
          </label>
          <div className="space-y-3">
            {TIMELINE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  formState.timeline === option.value
                    ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={formState.timeline === option.value}
                  onChange={() =>
                    updateField("timeline", option.value as FormState["timeline"])
                  }
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-slate-700">
                    {option.label}
                  </span>
                  <span className="text-xs text-slate-500">{option.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Investment Profile
          </label>
          <select
            value={formState.budget}
            onChange={(event) =>
              updateField("budget", event.target.value as FormState["budget"])
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-600">
            Integration & Legacy Considerations
          </label>
          <textarea
            value={formState.integrationNotes}
            onChange={(event) =>
              updateField("integrationNotes", event.target.value)
            }
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-600">
              Compliance Targets
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {COMPLIANCE_OPTIONS.map((option) => {
                const checked = formState.compliance.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      checked
                        ? "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span>{option.label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMultiValue("compliance", option.value)}
                      className="h-4 w-4"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-600">
              Operating Regions
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {REGION_OPTIONS.map((region) => {
                const checked = formState.targetRegions.includes(region);
                return (
                  <label
                    key={region}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      checked
                        ? "border-purple-500 bg-purple-50/80 ring-2 ring-purple-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span>{region}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMultiValue("targetRegions", region)}
                      className="h-4 w-4"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">
            Security Priorities
          </label>
          <div className="grid gap-3 lg:grid-cols-2">
            {SECURITY_OPTIONS.map((option) => {
              const checked = formState.securityPriorities.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                    checked
                      ? "border-sky-500 bg-sky-50/80 ring-2 ring-sky-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggleMultiValue("securityPriorities", option.value)
                    }
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    <span className="block font-semibold text-slate-700">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-600">
              Delivery Cadence
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {DELIVERY_CADENCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    updateField(
                      "deliveryCadence",
                      option.value as FormState["deliveryCadence"],
                    )
                  }
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    formState.deliveryCadence === option.value
                      ? "border-indigo-500 bg-indigo-50/80 font-semibold text-indigo-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-600">
              Additional Notes
            </label>
            <textarea
              value={formState.additionalNotes}
              onChange={(event) =>
                updateField("additionalNotes", event.target.value)
              }
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-2xl bg-slate-900 px-6 py-5 text-slate-100 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Delivery Guardrails
          </p>
          <p className="mt-1 text-sm text-slate-200">
            Plans are generated with security-first principles, dual-track agile,
            and Forbes-grade stakeholder communications baked in.
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-400"
        >
          {submitting ? "Generating..." : "Generate Program Blueprint"}
        </button>
      </div>
    </form>
  );
}
