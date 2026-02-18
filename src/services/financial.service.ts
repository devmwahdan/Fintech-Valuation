import { Injectable, signal, computed } from '@angular/core';
import type { ForecastConfig, YearActualData, LoanEntry, ForecastAssumption } from '../models/forecast-config.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  // Configuration State
  config = signal<ForecastConfig>({
    startingYear: 2021,
    actualYears: 3,
    forecastYears: 3,
    numLoans: 2
  });

  // Derived: list of actual years
  actualYearsList = computed(() => {
    const cfg = this.config();
    const years: number[] = [];
    for (let i = 0; i < cfg.actualYears; i++) {
      years.push(cfg.startingYear + i);
    }
    return years;
  });

  // Derived: list of forecast years
  forecastYearsList = computed(() => {
    const cfg = this.config();
    const start = cfg.startingYear + cfg.actualYears;
    return [start, start + 1, start + 2];
  });

  // Derived: valid year range for loans (actual + forecast)
  validLoanYearRange = computed(() => {
    const cfg = this.config();
    const min = cfg.startingYear;
    const max = cfg.startingYear + cfg.actualYears + cfg.forecastYears - 1;
    return { min, max };
  });

  // Per-year actual data (keyed by year)
  yearActuals = signal<Record<number, Partial<YearActualData>>>({});

  // Loans (debits)
  loans = signal<LoanEntry[]>([
    { id: 'LN-001', year: 2024, increaseOrDecrease: 500000, endingBalance: 1700000, interestRate: 5.5 },
    { id: 'LN-002', year: 2025, increaseOrDecrease: 200000, endingBalance: 0, interestRate: 6.25 }
  ]);

  // Forecast assumptions per year
  forecastAssumptions = signal<Record<number, Partial<ForecastAssumption>>>({});

  // UI State
  activeScenario = signal('Base Case Growth');
  currentStep = signal(1);
  currentActualYear = signal<number | null>(null);

  // Dashboard mock data (can be replaced with computed from actuals + assumptions)
  dashboardData = signal({
    cash: { act: 1250000, fcst24: 1450000, fcst25: 1850000, fcst26: 2100000, growth: 16.0 },
    ar: { act: 840000, fcst24: 920000, fcst25: 1050000, fcst26: 1180000, growth: 9.5 },
    fixedAssets: { act: 3500000, fcst24: 4100000, fcst25: 4000000, fcst26: 3850000, growth: -3.7 },
    totalAssets: { act: 5590000, fcst24: 6470000, fcst25: 6900000, fcst26: 7130000, growth: 15.7 },
    stLoans: { act: 500000, fcst24: 450000, fcst25: 400000, fcst26: 350000, growth: -10.0 },
    ltDebt: { act: 2000000, fcst24: 2800000, fcst25: 2600000, fcst26: 2400000, growth: 40.0 },
    equity: { act: 3090000, fcst24: 3220000, fcst25: 3900000, fcst26: 4380000, growth: 4.2 },
    metrics: {
      currentRatio: { act: 1.68, fcst24: 1.82, fcst25: 1.95, fcst26: 2.10 },
      dso: { act: 45, fcst24: 42, fcst25: 40, fcst26: 38 },
      roe: { act: 12.5, fcst24: 14.1, fcst25: 15.8, fcst26: 16.5 }
    }
  });

  constructor() {}

  updateConfig(partial: Partial<ForecastConfig>) {
    this.config.update(c => ({ ...c, ...partial }));
  }

  setCurrentActualYear(year: number | null) {
    this.currentActualYear.set(year);
  }

  addLoan() {
    const cfg = this.config();
    const range = this.validLoanYearRange();
    const id = `LN-${Date.now()}`;
    this.loans.update(list => [...list, {
      id,
      year: cfg.startingYear + cfg.actualYears,
      increaseOrDecrease: 0,
      endingBalance: 0,
      interestRate: 0
    }]);
  }

  removeLoan(id: string) {
    this.loans.update(list => list.filter(l => l.id !== id));
  }

  updateLoan(id: string, partial: Partial<LoanEntry>) {
    this.loans.update(list =>
      list.map(l => l.id === id ? { ...l, ...partial } : l)
    );
  }

  /** Years that have at least one loan */
  yearsWithLoans = computed(() => {
    const set = new Set<number>();
    for (const loan of this.loans()) {
      set.add(loan.year);
    }
    return Array.from(set).sort((a, b) => a - b);
  });
}
