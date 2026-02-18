
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  // Global State Signals
  activeScenario = signal('Base Case Growth');
  currentStep = signal(1);
  
  // Mock Data for Dashboard
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

  // Loans State
  loans = signal([
    { 
      id: 'LN-2024-001', 
      name: 'Term Loan A', 
      type: 'Main Facility', 
      year: '2025 (Forecast)', 
      principal: 500000, 
      rate: 5.50, 
      balance: 1700000,
      icon: 'request_quote',
      colorClass: 'bg-blue-100 text-primary'
    },
    { 
      id: 'LN-2024-002', 
      name: 'Revolving Credit Line', 
      type: 'Secondary Facility', 
      year: '2025 (Forecast)', 
      principal: 200000, 
      rate: 6.25, 
      balance: 0,
      icon: 'credit_card',
      colorClass: 'bg-purple-100 text-purple-600'
    }
  ]);

  constructor() {}
}
