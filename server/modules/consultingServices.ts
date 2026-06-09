export interface ConsultingPackage {
  id: string;
  name: string;
  type: "strategy" | "implementation" | "optimization" | "training";
  price: number;
  duration: string;
  deliverables: string[];
  clientCount: number;
  revenue: number;
}

/**
 * Generiert Consulting-Pakete
 */
export function generateConsultingPackages(): ConsultingPackage[] {
  return [
    {
      id: "pkg_1",
      name: "Strategy Audit",
      type: "strategy",
      price: 2997,
      duration: "2 weeks",
      deliverables: [
        "Current state analysis",
        "Opportunity assessment",
        "12-month roadmap",
      ],
      clientCount: 15,
      revenue: 44955,
    },
    {
      id: "pkg_2",
      name: "Done-For-You Setup",
      type: "implementation",
      price: 9997,
      duration: "4 weeks",
      deliverables: [
        "Full system setup",
        "Content generation",
        "Automation configuration",
        "Training",
      ],
      clientCount: 8,
      revenue: 79976,
    },
    {
      id: "pkg_3",
      name: "Performance Optimization",
      type: "optimization",
      price: 5997,
      duration: "3 weeks",
      deliverables: [
        "Conversion analysis",
        "A/B testing",
        "Revenue optimization",
      ],
      clientCount: 12,
      revenue: 71964,
    },
  ];
}

/**
 * Berechnet Consulting-Kapazität und Auslastung
 */
export function calculateConsultingCapacity(
  hoursPerWeek: number,
  hourlyRate: number,
  weeksPerYear: number
): {
  maxClients: number;
  maxRevenue: number;
  utilizationRate: number;
} {
  const maxRevenue = hoursPerWeek * hourlyRate * weeksPerYear;
  const maxClients = Math.floor((hoursPerWeek * 4) / 20); // Assuming 20 hours per client per month

  return {
    maxClients,
    maxRevenue: Math.round(maxRevenue),
    utilizationRate: 85, // Assumed 85% utilization
  };
}

/**
 * Generiert White-Label-Optionen
 */
export function generateWhiteLabelOptions(): {
  option: string;
  monthlyFee: number;
  commission: number;
  support: string;
}[] {
  return [
    {
      option: "Basic White Label",
      monthlyFee: 500,
      commission: 20,
      support: "Email support",
    },
    {
      option: "Premium White Label",
      monthlyFee: 1500,
      commission: 30,
      support: "Priority support + training",
    },
    {
      option: "Enterprise White Label",
      monthlyFee: 5000,
      commission: 40,
      support: "Dedicated account manager",
    },
  ];
}

/**
 * Generiert Agency-Partnership-Modelle
 */
export function generateAgencyPartnerships(): {
  model: string;
  revenue_share: number;
  minimumCommitment: number;
  support: string;
}[] {
  return [
    {
      model: "Referral Partner",
      revenue_share: 20,
      minimumCommitment: 0,
      support: "Marketing materials",
    },
    {
      model: "Reseller",
      revenue_share: 40,
      minimumCommitment: 5000,
      support: "Training + support",
    },
    {
      model: "Strategic Partner",
      revenue_share: 50,
      minimumCommitment: 20000,
      support: "Co-marketing + dedicated support",
    },
  ];
}
