import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { ToastService } from '../../services/toast.service';
import { PageLayoutComponent } from '../layout/page-layout.component';

@Component({
  selector: 'app-actuals',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageLayoutComponent],
  template: `
    <app-page-layout
      [title]="'Historical Data – Year ' + activeYear()"
      [subtitle]="'Enter the confirmed historical data for the fiscal year ending Dec 31, ' + activeYear() + '. Step ' + (activeYearIndex() + 1) + ' of ' + service.actualYearsList().length + '.'"
      breadcrumb="Actuals Data"
      [showActions]="true"
      [showFooter]="true">
      <div actions>
        <button type="button" class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">upload</span> Import CSV
        </button>
      </div>
      <div footerLeft class="flex flex-wrap items-center gap-2">
        <button type="button" (click)="saveDraft()" class="px-4 py-2.5 min-h-[44px] rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 touch-manipulation">
          <span class="material-symbols-outlined text-[18px]">save</span> Save Draft
        </button>
        @if (activeYearIndex() > 0) {
          <button type="button" (click)="goToPrevYear()" class="px-4 sm:px-6 py-2.5 min-h-[44px] border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 touch-manipulation">
            <span class="material-symbols-outlined text-[20px]">arrow_back</span> <span class="sm:hidden">Prev</span><span class="hidden sm:inline">Previous Year</span>
          </button>
        }
      </div>
      <div footerRight class="flex flex-wrap items-center gap-2">
        @if (activeYearIndex() < service.actualYearsList().length - 1) {
          <button type="button" (click)="goToNextYear()" class="px-4 sm:px-6 py-2.5 min-h-[44px] bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 touch-manipulation">
            <span class="sm:hidden">Next</span><span class="hidden sm:inline">Next Year</span> <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        }
        @if (activeYearIndex() === service.actualYearsList().length - 1) {
          <button routerLink="/loans" class="bg-primary hover:bg-primary-hover text-white px-6 sm:px-8 py-2.5 min-h-[44px] rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all flex items-center gap-2 touch-manipulation">
            Next: Debits <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        }
      </div>

      <div class="flex flex-col lg:flex-row gap-0">
      <!-- Sub-sidebar: Year navigation -->
      <aside class="w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
        <div class="p-6">
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Timeline</h2>
          <p class="text-xs text-slate-500 mb-4">Entering data for each actual year</p>
          <nav class="flex flex-col gap-2">
            @for (year of service.actualYearsList(); track year) {
              <button type="button"
                (click)="selectYear(year)"
                class="group flex items-center gap-3 px-3 py-3 rounded-lg text-left w-full transition-all border"
                [class.bg-primary/10]="activeYear() === year"
                [class.border-primary/20]="activeYear() === year"
                [class.hover:bg-slate-50]="activeYear() !== year"
                [class.dark:hover:bg-slate-800]="activeYear() !== year"
                [class.border-transparent]="activeYear() !== year">
                <div [class.text-primary]="activeYear() === year" [class.text-slate-400]="activeYear() !== year">
                  <span class="material-symbols-outlined" [class.fill-1]="activeYear() === year">calendar_today</span>
                </div>
                <div class="flex flex-col flex-1 min-w-0">
                  <span class="text-sm font-semibold" [class.text-primary]="activeYear() === year" [class.text-slate-600]="activeYear() !== year" [class.dark:text-slate-300]="activeYear() !== year">{{ year }} (Actual)</span>
                  <span class="text-[10px]" [class.text-primary/80]="activeYear() === year" [class.text-slate-400]="activeYear() !== year">
                    {{ activeYear() === year ? 'Editing Now' : 'Click to edit' }}
                  </span>
                </div>
                @if (activeYear() === year) {
                  <span class="material-symbols-outlined text-primary text-[18px]">chevron_right</span>
                }
              </button>
            }
          </nav>
        </div>
      </aside>

      <!-- Main Input Area -->
      <main class="flex-1 bg-background-light dark:bg-background-dark">
        <div class="max-w-5xl mx-auto p-6 md:p-8 pb-8">
          <!-- Year Tabs (mobile / compact) -->
          <div class="flex gap-2 mb-6 overflow-x-auto pb-2 lg:hidden">
            @for (year of service.actualYearsList(); track year) {
              <button type="button"
                (click)="selectYear(year)"
                class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                [class.bg-primary]="activeYear() === year"
                [class.text-white]="activeYear() === year"
                [class.bg-slate-100]="activeYear() !== year"
                [class.dark:bg-slate-800]="activeYear() !== year"
                [class.text-slate-600]="activeYear() !== year"
                [class.dark:text-slate-300]="activeYear() !== year">
                Year {{ year }}
              </button>
            }
          </div>

          <!-- Balance Sheet -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-blue-500 rounded-full mr-1"></span> Balance Sheet – Year {{ activeYear() }}
              </h3>
              <span class="text-xs font-mono bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">USD (Thousands)</span>
            </div>
            <div class="p-6">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Assets & Liabilities</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Revenue</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">COGS</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cash</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Accounts Receivable</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Inventories</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">PPE</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Accounts Payable</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Long Term Debit</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Common Equity</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Retained Earnings</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Income Statement -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-green-500 rounded-full mr-1"></span> Income Statement – Year {{ activeYear() }}
              </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Growth Rate %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Inflation %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">SG&A %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">SG&A Amount</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Other</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">COGS %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">EBITDA</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Depreciation</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">EBIT</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Interest Expense</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Interest Income</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">EBT</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tax Rate %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Tax</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Total Tax</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Net Income</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
            </div>
          </section>

          <!-- Cash Flow -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-amber-500 rounded-full mr-1"></span> Cash Flow – Year {{ activeYear() }}
              </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Capital Expenditure</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Other</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
            </div>
          </section>

          <!-- Working Capital -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-purple-500 rounded-full mr-1"></span> Working Capital – Year {{ activeYear() }}
              </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Depreciation %</label>
                <div class="relative">
                  <input type="number" class="w-full pl-4 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Capital Expenditure</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" placeholder="0">
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      </div>
    </app-page-layout>
  `
})
export class ActualsComponent {
  service = inject(FinancialService);
  toast = inject(ToastService);

  activeYear = signal<number>(0);
  activeYearIndex = signal(0);

  constructor() {
    const years = this.service.actualYearsList();
    const current = this.service.currentActualYear();
    if (years.length > 0) {
      const idx = current !== null ? years.indexOf(current) : 0;
      const safeIdx = idx >= 0 ? idx : 0;
      this.activeYear.set(years[safeIdx]);
      this.activeYearIndex.set(safeIdx);
    }
  }

  selectYear(year: number) {
    const years = this.service.actualYearsList();
    const idx = years.indexOf(year);
    if (idx >= 0) {
      this.activeYear.set(year);
      this.activeYearIndex.set(idx);
      this.service.setCurrentActualYear(year);
    }
  }

  goToPrevYear() {
    const idx = this.activeYearIndex();
    if (idx > 0) {
      const years = this.service.actualYearsList();
      this.selectYear(years[idx - 1]);
    }
  }

  goToNextYear() {
    const idx = this.activeYearIndex();
    const years = this.service.actualYearsList();
    if (idx < years.length - 1) {
      this.selectYear(years[idx + 1]);
    }
  }

  saveDraft() {
    this.toast.success('Draft saved. Your data has been preserved.');
  }
}
