import {
  ArchitectureComponent,
  ClientBrief,
  PlanningReport,
  RiskItem,
  SprintLineItem,
  SprintPlan,
  TeamRole,
} from "./types";

const INDUSTRY_ARCH_HEURISTICS: Record<string, ArchitectureComponent[]> = {
  finance: [
    {
      name: "Client Experience Layer",
      responsibilities: [
        "Next.js web portal with role-based views",
        "Responsive design with WCAG AA support",
        "Secure session handling with short-lived tokens",
      ],
      technology: "Next.js 14, React Server Components, Edge Runtime",
    },
    {
      name: "Application Services",
      responsibilities: [
        "Domain-driven APIs for portfolio, trading, and reporting",
        "Policy orchestration and approval workflows",
        "Integration connectors for core banking services",
      ],
      technology: "Node.js (Nest/Fastify), GraphQL federation, OpenAPI contracts",
    },
    {
      name: "Data & Analytics",
      responsibilities: [
        "Immutable event store for transactional data",
        "Real-time risk scoring and anomaly detection",
        "Self-service analytics with governed data marts",
      ],
      technology: "Kafka, PostgreSQL, dbt, Superset/Looker",
    },
    {
      name: "Security & Compliance",
      responsibilities: [
        "Zero-trust gateway with adaptive policies",
        "Continuous compliance monitoring and evidence trails",
        "Secrets management with hardware-backed storage",
      ],
      technology: "Auth0/Okta, OPA, HashiCorp Vault, Drata/Scytale",
    },
  ],
  healthcare: [
    {
      name: "Unified Care Platform",
      responsibilities: [
        "Scheduling, care plan, and clinician collaboration tools",
        "Patient-facing portal with accessibility-first design",
        "Offline support for critical workflows",
      ],
      technology: "Next.js 14, React Native companion app, tRPC",
    },
    {
      name: "Clinical Data Services",
      responsibilities: [
        "FHIR-compliant API gateway",
        "Consent tracking with immutable audit trail",
        "Interoperability adapters for EMR/EHR systems",
      ],
      technology: "HAPI FHIR, AWS HealthLake/Azure API for FHIR",
    },
    {
      name: "Intelligence Plane",
      responsibilities: [
        "Predictive analytics for care pathways",
        "Automated alerting for patient vitals",
        "Customizable dashboards for operational reporting",
      ],
      technology: "Python ML services, Snowflake, Apache Superset",
    },
    {
      name: "Security & Compliance",
      responsibilities: [
        "PHI encryption and tokenization strategy",
        "Fine-grained RBAC mapped to clinical roles",
        "HIPAA and HITRUST continuous controls monitoring",
      ],
      technology: "Okta, AWS KMS, Lacework, Drata",
    },
  ],
  retail: [
    {
      name: "Experience Platform",
      responsibilities: [
        "Personalized storefront with experimentation hooks",
        "Unified customer profile and loyalty integration",
        "Headless CMS for merchandising teams",
      ],
      technology: "Next.js 14, Vercel Edge, Contentful/Sanity",
    },
    {
      name: "Commerce Engine",
      responsibilities: [
        "Order orchestration with resilient inventory syncing",
        "Payment abstraction with regional providers",
        "Promotions and pricing rules service",
      ],
      technology: "Node.js microservices, Temporal workflows, REST/GraphQL",
    },
    {
      name: "Data Activation",
      responsibilities: [
        "360° customer analytics & segmentation",
        "Real-time recommendation streaming",
        "CDP integration with marketing automation",
      ],
      technology: "BigQuery/Snowflake, Segment, dbt, Vertex AI",
    },
    {
      name: "Security & Compliance",
      responsibilities: [
        "PCI-DSS compliant payment boundary",
        "Automated bot and fraud mitigation",
        "Data residency guardrails per region",
      ],
      technology: "Cloud Armor, Shape Security, Vault, PCI tokenization",
    },
  ],
};

const DEFAULT_ARCHITECTURE: ArchitectureComponent[] = [
  {
    name: "Experience Edge",
    responsibilities: [
      "Composable web experience optimized for Core Web Vitals",
      "A/B experimentation and feature flag support",
      "Progressive enhancement for global access",
    ],
    technology: "Next.js 14, Vercel Edge Functions, LaunchDarkly",
  },
  {
    name: "Service Mesh",
    responsibilities: [
      "API gateway with global traffic management",
      "Domain-driven microservice coordination",
      "Observability with distributed tracing",
    ],
    technology: "Node.js, gRPC/GraphQL, Istio/Linkerd, OpenTelemetry",
  },
  {
    name: "Data Foundation",
    responsibilities: [
      "Operational data store with schematized domains",
      "Analytics warehouse with governed pipelines",
      "Event streaming backbone for integrations",
    ],
    technology: "PostgreSQL, Snowflake/BigQuery, Kafka/PubSub",
  },
  {
    name: "Security Platform",
    responsibilities: [
      "Continuous verification and adaptive MFA",
      "Centralized secrets management",
      "Security posture monitoring with automated evidence",
    ],
    technology: "Okta/Auth0, Vault, Wiz/Panoptica, Jit/Snyk",
  },
];

const DELIVERY_CADENCE_WEEKS: Record<string, number> = {
  weekly: 1,
  biweekly: 2,
  monthly: 4,
};

const BASE_ROLES: TeamRole[] = [
  {
    title: "Engagement Director",
    responsibilities: [
      "Accountable for stakeholder alignment and executive reporting",
      "Owns financial governance and ensures measurable ROI",
    ],
    allocation: "fractional",
  },
  {
    title: "Delivery Lead / Scrum Master",
    responsibilities: [
      "Runs agile ceremonies and removes delivery blockers",
      "Owns roadmap visibility and dependency management",
    ],
    allocation: "full-time",
  },
  {
    title: "Lead Solution Architect",
    responsibilities: [
      "Owns target architecture and design governance",
      "Chairs architecture review board and ensures compliance",
    ],
    allocation: "full-time",
  },
  {
    title: "Principal Software Engineer",
    responsibilities: [
      "Guides engineering excellence and code quality standards",
      "Leads implementation of complex architectural components",
    ],
    allocation: "full-time",
  },
  {
    title: "Product Strategist",
    responsibilities: [
      "Translates business goals into actionable product outcomes",
      "Prioritizes backlog in partnership with client product leads",
    ],
    allocation: "part-time",
  },
  {
    title: "Senior QA Engineer",
    responsibilities: [
      "Establishes automated testing strategy across layers",
      "Operates release gates and quality risk assessments",
    ],
    allocation: "full-time",
  },
];

const SECURITY_POSTURE_BY_PRIORITY = (
  priorities: string[],
  industry: string,
) => {
  const posture: string[] = [
    "Embed security champions in every squad with threat-model-first design reviews.",
    "Implement SDLC security gates with automated evidence capture feeding compliance dashboards.",
  ];

  if (priorities.includes("zero-trust")) {
    posture.push(
      "Adopt zero-trust network segmentation with identity-aware proxies across all environments.",
    );
  }

  if (priorities.includes("sast-dast")) {
    posture.push(
      "Codify SAST/DAST pipelines with automated break-glass approval flows for high-severity findings.",
    );
  }

  if (priorities.includes("supply-chain")) {
    posture.push(
      "Introduce signed artifact pipelines and SBOM generation on every build for supply-chain assurance.",
    );
  }

  if (industry === "finance") {
    posture.push(
      "Align risk posture with SOX and SOC 2 controls, leveraging continuous monitoring to satisfy auditors.",
    );
  }

  if (industry === "healthcare") {
    posture.push(
      "Ensure HIPAA/HITRUST controls are mapped to each release with automated PHI handling verification.",
    );
  }

  return posture;
};

const buildBacklogHighlights = (brief: ClientBrief): SprintLineItem[] => {
  const highlights: SprintLineItem[] = brief.keyFeatures.slice(0, 5).map(
    (feature, index) => ({
      title: `Feature ${index + 1}: ${feature}`,
      description: `Operationalize "${feature}" with production-ready quality bars, integrating with existing estates where required.`,
      acceptanceCriteria: [
        "Design approved by architecture review board",
        "Automated test coverage above 80% on critical paths",
        "Security and compliance requirements documented and signed off",
      ],
    }),
  );

  highlights.push({
    title: "Observability Baseline",
    description:
      "Implement golden signals dashboards and end-to-end tracing for proactive reliability management.",
    acceptanceCriteria: [
      "Define SLOs aligned to business KPIs",
      "Dashboards published to operations playbooks",
      "On-call runbooks validated via game-day exercises",
    ],
  });

  return highlights;
};

const deriveRisks = (brief: ClientBrief): RiskItem[] => {
  const risks: RiskItem[] = [
    {
      category: "Integration",
      description:
        "Vendor APIs and legacy platforms may have ambiguous SLAs impacting delivery sequencing.",
      mitigation:
        "Front-load joint architectural sessions with partner teams and secure sandbox access in Sprint 0.",
    },
    {
      category: "Security",
      description:
        "Evolving threat landscape could invalidate initial controls design mid-execution.",
      mitigation:
        "Operate continuous threat modeling workshops and maintain red-team alignment on planned releases.",
    },
  ];

  if (brief.timeline === "accelerated") {
    risks.push({
      category: "Timeline",
      description:
        "Accelerated milestones introduce compression risk on quality gates and change management.",
      mitigation:
        "Protect timeboxes for QA, enforce definition of done expansion, and enable parallel workstream staffing.",
    });
  }

  if (brief.budget === "lean") {
    risks.push({
      category: "Budget",
      description:
        "Lean budget profile may limit availability of specialized SMEs required for compliance and security hardening.",
      mitigation:
        "Establish clear RACI and tap fractional SMEs during critical path activities only.",
    });
  }

  if (brief.compliance.length > 0) {
    risks.push({
      category: "Compliance",
      description:
        "Multiple compliance regimes can create conflicting evidence requirements across regions.",
      mitigation:
        "Stand up centralized compliance control matrix and automate evidence collection through CI/CD hooks.",
    });
  }

  return risks;
};

const sprintObjectiveFromTimeline = (
  index: number,
  brief: ClientBrief,
): string => {
  const focusAreas = [
    "Establish program governance and baseline architecture runway",
    "Release minimum lovable product for stakeholder validation",
    "Expand core capabilities with integration hardening",
    "Harden security posture and operational excellence",
    "Scale for global rollout with production readiness sign-off",
  ];

  if (brief.timeline === "accelerated" && index === 1) {
    return "Compress discovery and delivery streams to land the first marketable increment by Sprint 2.";
  }

  if (brief.timeline === "extended" && index >= 3) {
    return "Sequence complex integrations while maturing compliance automation and operational readiness.";
  }

  if (index === 0) {
    return `Translate ${brief.primaryObjective.toLowerCase()} into a funded roadmap with signed-off governance.`;
  }

  return focusAreas[index] ?? "Advance roadmap aligned with measurable KPIs.";
};

const generateSprintSchedule = (brief: ClientBrief): SprintPlan[] => {
  const cadenceWeeks =
    DELIVERY_CADENCE_WEEKS[brief.deliveryCadence] ?? 2;
  const totalDurationWeeks =
    brief.timeline === "accelerated"
      ? 10
      : brief.timeline === "extended"
        ? 20
        : 14;
  const sprintCount = Math.max(
    4,
    Math.round(totalDurationWeeks / cadenceWeeks),
  );

  return Array.from({ length: sprintCount }).map((_, index) => {
    const sprintNumber = index + 1;
    return {
      sprintNumber,
      objective: sprintObjectiveFromTimeline(index, brief),
      keyActivities: buildSprintActivities(sprintNumber, brief),
      deliverables: buildSprintDeliverables(sprintNumber, brief),
      qaFocus: sprintNumber <= 2
        ? "Shift-left automation coverage and contract testing baselines."
        : sprintNumber <= 4
          ? "Performance, chaos engineering and compliance regression sweeps."
          : "Run release simulations, DR drills, and blue/green validation.",
    };
  });
};

const buildSprintActivities = (
  sprintNumber: number,
  brief: ClientBrief,
): string[] => {
  const activities: string[] = [];

  if (sprintNumber === 1) {
    activities.push(
      "Sprint 0 governance kickoff with stakeholder alignment workshops.",
      "Architectural runway, environment provisioning, and baseline backlog refinement.",
    );
  } else {
    activities.push(
      "Feature development across prioritized value streams.",
      "Weekly architecture review board with decision record updates.",
    );
  }

  if (brief.securityPriorities.includes("supply-chain")) {
    activities.push(
      "Secure supply-chain hardening with SBOM publication and dependency governance.",
    );
  }

  if (brief.compliance.length) {
    activities.push(
      `Compliance control validation for ${brief.compliance.join(", ")}.`,
    );
  }

  activities.push("Executive steering updates with KPI progression snapshots.");

  return activities;
};

const buildSprintDeliverables = (
  sprintNumber: number,
  brief: ClientBrief,
): string[] => {
  const deliverables: string[] = [];

  if (sprintNumber === 1) {
    deliverables.push(
      "Program charter, RACI, and operating model playbook",
      "Architecture decision log and target state blueprint v1",
      "Secure CI/CD pipelines with automated quality gates",
    );
  } else if (sprintNumber === 2) {
    deliverables.push(
      "First customer-verifiable increment deployed to staging",
      "Observability baseline dashboards and alerting runbooks",
    );
  } else {
    deliverables.push(
      `Value stream increments validated against Definition of Done for ${brief.keyFeatures[0] ?? "priority feature"}.`,
    );
  }

  if (sprintNumber === 4) {
    deliverables.push("Operational readiness assessment and go-live runbook.");
  }

  return deliverables;
};

export const createPlanningReport = (brief: ClientBrief): PlanningReport => {
  const architecture =
    INDUSTRY_ARCH_HEURISTICS[brief.industry] ?? DEFAULT_ARCHITECTURE;

  const executiveSummary = [
    `Engage ${brief.organizationName} on the ${brief.projectName} initiative with a discovery-to-launch runway tailored for Forbes-tier expectations.`,
    `Primary objective focuses on ${brief.primaryObjective.trim()}. We will structure our roadmap to deliver demonstrable value every ${brief.deliveryCadence}.`,
    `Program success hinges on accelerated enablement of ${brief.keyFeatures.slice(0, 2).join(", ") || "core differentiators"} while safeguarding compliance for ${brief.compliance.join(", ") || "enterprise standards"}.`,
    `Rollout will prioritize ${brief.targetRegions.join(", ") || "core markets"} with stakeholder alignment anchored in sprint-based executive reviews and transparent KPIs.`,
  ];

  const guidingPrinciples = [
    "Security-first delivery with automated guardrails embedded in every pipeline.",
    "Transparent governance with executive-ready reporting and measurable KPIs.",
    "Incremental value delivery through dual-track discovery and continuous deployment.",
  ];

  const securityStrategy = {
    posture: SECURITY_POSTURE_BY_PRIORITY(
      brief.securityPriorities,
      brief.industry,
    ),
    controls: [
      "OWASP ASVS Level 2 baselines enforced across services.",
      "Secrets rotation policy with just-in-time access for engineers.",
      "Continuous compliance evidence collection mapped to sprint increments.",
      "24/7 observability including anomaly detection and audit logging.",
    ],
    governance: [
      "Monthly CISO steering committee with risk register review.",
      "Quarterly red-team exercises aligned to critical business journeys.",
      "Security scorecard integrated into sprint review definition of done.",
    ],
  };

  const deliveryPlan = {
    cadence: brief.deliveryCadence,
    sprintLengthWeeks:
      DELIVERY_CADENCE_WEEKS[brief.deliveryCadence] ?? 2,
    backlogHighlights: buildBacklogHighlights(brief),
    sprintSchedule: generateSprintSchedule(brief),
  };

  const teamStructure: TeamRole[] = [
    ...BASE_ROLES,
    {
      title: "Cloud & Platform Engineer",
      responsibilities: [
        "Automates infrastructure as code and establishes platform guardrails.",
        "Owns cost optimization and environment reliability.",
      ],
      allocation: "full-time",
    },
    {
      title: "Security Engineer",
      responsibilities: [
        "Maintains threat models, penetration testing cadence, and vulnerability management.",
        "Partners with compliance to align control evidence with audit requirements.",
      ],
      allocation: brief.securityPriorities.length > 1 ? "full-time" : "part-time",
    },
  ];

  const qualityStrategy = {
    automation: [
      "Adopt contract testing across critical integrations with nightly regression suites.",
      "Implement visual regression and accessibility linting in CI.",
      "Stand up performance benchmarking with load, soak, and chaos experiments.",
    ],
    nonFunctional: [
      "Define NFR scorecards (latency, availability, compliance) with threshold alerts.",
      "Run game-day simulations before every production deployment window.",
      "Codify rollback and disaster recovery drills aligned to RTO/RPO commitments.",
    ],
    releaseManagement: [
      "Blue/green deployment strategy with feature flag kill-switches.",
      "Change advisory board syncs integrated into sprint reviews.",
      "Automated release notes and stakeholder comms triggered from CI/CD.",
    ],
  };

  const riskRegister = deriveRisks(brief);

  const successMetrics = [
    "90-day time-to-first-value with executive adoption of program scorecards.",
    ">95% sprint predictability measured via planned vs delivered story points.",
    "Zero high-severity security findings aging beyond SLA and full audit readiness.",
    "Customer satisfaction scores above benchmark for Forbes-class engagements.",
  ];

  return {
    executiveSummary,
    guidingPrinciples,
    architecture,
    securityStrategy,
    deliveryPlan,
    teamStructure,
    qualityStrategy,
    riskRegister,
    successMetrics,
  };
};
