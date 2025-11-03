export type DeliveryCadence = "weekly" | "biweekly" | "monthly";

export type BudgetLevel = "lean" | "standard" | "enterprise";

export interface SecurityPriority {
  id: string;
  label: string;
  description: string;
}

export interface ComplianceRequirement {
  id: string;
  label: string;
}

export interface ClientBrief {
  organizationName: string;
  projectName: string;
  industry: string;
  primaryObjective: string;
  keyFeatures: string[];
  integrationNotes: string;
  compliance: string[];
  timeline: "accelerated" | "standard" | "extended";
  budget: BudgetLevel;
  deliveryCadence: DeliveryCadence;
  targetRegions: string[];
  securityPriorities: string[];
  additionalNotes: string;
}

export interface SprintLineItem {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

export interface SprintPlan {
  sprintNumber: number;
  objective: string;
  keyActivities: string[];
  deliverables: string[];
  qaFocus: string;
}

export interface ArchitectureComponent {
  name: string;
  responsibilities: string[];
  technology: string;
  notes?: string;
}

export interface TeamRole {
  title: string;
  responsibilities: string[];
  allocation: "full-time" | "part-time" | "fractional";
}

export interface RiskItem {
  category: string;
  description: string;
  mitigation: string;
}

export interface PlanningReport {
  executiveSummary: string[];
  guidingPrinciples: string[];
  architecture: ArchitectureComponent[];
  securityStrategy: {
    posture: string[];
    controls: string[];
    governance: string[];
  };
  deliveryPlan: {
    cadence: DeliveryCadence;
    sprintLengthWeeks: number;
    backlogHighlights: SprintLineItem[];
    sprintSchedule: SprintPlan[];
  };
  teamStructure: TeamRole[];
  qualityStrategy: {
    automation: string[];
    nonFunctional: string[];
    releaseManagement: string[];
  };
  riskRegister: RiskItem[];
  successMetrics: string[];
}
