import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { ToastService } from '../../services/toast.service';
import { PageLayoutComponent } from '../layout/page-layout.component';
import type { LoanEntry } from '../../models/forecast-config.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageLayoutComponent],
  template: `
    <app-page-layout
      title="Debits Configuration"
      subtitle="Configure loan details. Each loan applies to a specific year. Enter the year, net change (increase/decrease), ending balance, and interest rate."
      breadcrumb="Forecast » Debits"
      [showFooter]="true">
      <div footerLeft>
        <button routerLink="/actuals" class="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">arrow_back</span> Back
        </button>
      </div>
      <div footerRight>
        <button routerLink="/assumptions" class="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-md transition-all flex items-center gap-2">
          Next: Assumptions <span class="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 w-full">
        <div class="flex-1 flex flex-col gap-8 min-w-0">
        <!-- Loans Summary -->
        @if (service.yearsWithLoans().length > 0) {
          <div class="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span class="text-xs font-semibold text-slate-500 uppercase">Loans for years:</span>
            @for (y of service.yearsWithLoans(); track y) {
              <span class="px-2 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium">{{ y }}</span>
            }
          </div>
        }

        <!-- Loan Cards -->
        <div class="flex flex-col gap-6">
          @for (loan of service.loans(); track loan.id) {
            <div class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div class="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-lg flex items-center justify-center bg-blue-100 text-primary dark:bg-primary/20">
                    <span class="material-symbols-outlined">request_quote</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 dark:text-white">Loan {{ $index + 1 }}</h3>
                    <p class="text-xs text-slate-500">ID: {{ loan.id }}</p>
                  </div>
                </div>
                <button type="button" (click)="removeLoan(loan.id)" class="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Remove loan">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>

              <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Year -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Year</label>
                  <span class="text-xs text-slate-500">Fiscal year this loan applies to</span>
                  <select [ngModel]="loan.year" (ngModelChange)="onLoanYearChange(loan.id, $event)"
                    class="w-full h-11 pl-3 pr-10 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
                    @for (y of validYears(); track y) {
                      <option [value]="y">{{ y }}</option>
                    }
                  </select>
                  @if (isYearInvalid(loan.year)) {
                    <span class="text-xs text-red-600">Year must be in {{ range().min }}–{{ range().max }}</span>
                  }
                </div>

                <!-- Increase or Decrease -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                    <span>Increase or Decrease</span>
                    <span class="text-xs text-slate-400 font-normal">Net change in loan balance</span>
                  </label>
                  <span class="text-xs text-slate-500">Positive = new borrowing, negative = repayment</span>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                    <input type="number" [ngModel]="loan.increaseOrDecrease" (ngModelChange)="onLoanChange(loan.id, 'increaseOrDecrease', $event)"
                      class="w-full h-11 pl-7 pr-12 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-mono text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white"
                      placeholder="0">
                  </div>
                </div>

                <!-- Ending Balance -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-bold text-slate-900 dark:text-white">Ending Balance</label>
                  <span class="text-xs text-slate-500">Loan balance at end of year</span>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white font-bold font-mono">$</span>
                    <input type="number" [ngModel]="loan.endingBalance" (ngModelChange)="onLoanChange(loan.id, 'endingBalance', $event)"
                      min="0"
                      class="w-full h-11 pl-7 pr-3 rounded-lg border-primary/30 bg-primary/5 dark:bg-primary/10 text-sm font-mono font-bold text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white"
                      placeholder="0">
                  </div>
                  @if (loan.endingBalance < 0) {
                    <span class="text-xs text-red-600">Must be non-negative</span>
                  }
                </div>

                <!-- Interest Rate -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Interest Rate</label>
                  <span class="text-xs text-slate-500">Annual rate as % (e.g. 8 for 8%)</span>
                  <div class="relative">
                    <input type="number" [ngModel]="loan.interestRate" (ngModelChange)="onLoanChange(loan.id, 'interestRate', $event)"
                      min="0" step="0.01"
                      class="w-full h-11 pl-3 pr-8 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-mono text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white"
                      placeholder="0">
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                  </div>
                  @if (loan.interestRate < 0) {
                    <span class="text-xs text-red-600">Must be non-negative</span>
                  }
                </div>
              </div>
            </div>
          }

          <button type="button" (click)="addLoan()"
            class="w-full rounded-xl border-2 border-dashed border-slate-300 hover:border-primary bg-transparent py-6 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-primary transition-all">
            <div class="size-10 rounded-full bg-slate-100 flex items-center justify-center"><span class="material-symbols-outlined">add</span></div>
            <span class="font-bold text-sm">Add Another Loan</span>
          </button>
        </div>
        </div>

        <!-- Right Summary Sidebar -->
        <aside class="w-full lg:w-[320px] flex-shrink-0 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-8 hidden lg:flex self-start">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-900 dark:text-white">Debits Summary</h3>
            <span class="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">Live</span>
          </div>

          <div class="flex flex-col gap-3">
            @for (y of service.yearsWithLoans(); track y) {
              <div class="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">account_balance</span>
                <div class="flex-1">
                  <div class="flex justify-between mb-1"><span class="text-sm font-bold text-slate-900 dark:text-white">{{ y }}</span></div>
                  <div class="flex justify-between items-end">
                    <span class="text-xs text-slate-500">Total Debt</span>
                    <span class="text-sm font-bold text-slate-900 dark:text-white font-mono"><span class="text-slate-500">$</span>{{ totalDebtForYear(y) | number:'1.0-0' }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        </aside>
      </div>
    </app-page-layout>
  `
})
export class LoansComponent implements OnInit {
  service = inject(FinancialService);
  toast = inject(ToastService);

  ngOnInit() {
    const cfg = this.service.config();
    const current = this.service.loans().length;
    if (current < cfg.numLoans) {
      for (let i = current; i < cfg.numLoans; i++) {
        this.service.addLoan();
      }
    }
  }

  range = () => this.service.validLoanYearRange();

  validYears = computed(() => {
    const { min, max } = this.service.validLoanYearRange();
    const years: number[] = [];
    for (let y = min; y <= max; y++) years.push(y);
    return years;
  });

  totalDebtForYear(year: number): number {
    return this.service.loans()
      .filter(l => l.year === year)
      .reduce((sum, l) => sum + (l.endingBalance || 0), 0);
  }

  isYearInvalid(year: number): boolean {
    const { min, max } = this.service.validLoanYearRange();
    return year < min || year > max;
  }

  addLoan() {
    this.service.addLoan();
    this.toast.info('New loan added. Fill in the details below.');
  }

  removeLoan(id: string) {
    if (this.service.loans().length <= 1) return;
    this.service.removeLoan(id);
  }

  onLoanYearChange(id: string, value: string | number) {
    const year = typeof value === 'number' ? value : parseInt(String(value), 10);
    if (!isNaN(year)) this.service.updateLoan(id, { year });
  }

  onLoanChange(id: string, field: keyof LoanEntry, value: unknown) {
    if (field === 'id') {
      this.service.updateLoan(id, { [field]: value } as Partial<LoanEntry>);
      return;
    }
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    if (!isNaN(num)) {
      this.service.updateLoan(id, { [field]: num } as Partial<LoanEntry>);
    }
  }
}
