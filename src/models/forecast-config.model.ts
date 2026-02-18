/** Configuration for the Balance Sheet Forecasting tool */
export interface ForecastConfig {
  startingYear: number;
  actualYears: 3 | 4 | 5;
  forecastYears: 3; // Fixed at 3
  numLoans: number;
}

/** Per-year actual data structure */
export interface YearActualData {
  year: number;
  balanceSheet: {
    revenue: number;
    cogs: number;
    cash: number;
    accountsReceivable: number;
    inventories: number;
    ppe: number;
    accountsPayable: number;
    longTermDebit: number;
    commonEquity: number;
    retainedEarnings: number;
  };
  incomeStatement: {
    growthRate: number;
    inflation: number;
    sgaPercent: number;
    sgaAmount: number;
    other: number;
    cogsPercent: number;
    ebitda: number;
    depreciation: number;
    ebit: number;
    interestExpense: number;
    interestIncome: number;
    ebt: number;
    taxRate: number;
    currentTax: number;
    totalTax: number;
    netIncome: number;
  };
  cashFlow: {
    capitalExpenditure: number;
    other: number;
  };
  workingCapital: {
    depreciationPercent: number;
    capitalExpenditure: number;
  };
}

/** Loan/Debit entry - applies to a specific year */
export interface LoanEntry {
  id: string;
  year: number;
  increaseOrDecrease: number; // Positive = borrowing, negative = repayment
  endingBalance: number;
  interestRate: number;
}

/** Forecast assumption per year */
export interface ForecastAssumption {
  year: number;
  operating: {
    revenueGrowth: number;
    cogsPercent: number;
    sgaPercent: number;
    other: number;
    depreciationPercent: number;
    taxPercent: number;
    dividendPayoutPercent: number;
  };
  investment: {
    capitalExpenditures: number;
    assetDisposalProceeds: number;
  };
  financing: {
    commonEquityChange: number;
    interestIncome: number;
  };
}
