import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinancialService } from '../../services/financial.service';
import { PageLayoutComponent } from '../layout/page-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PageLayoutComponent],
  template: `
    <app-page-layout
      title="3-Year Forecast Output"
      [subtitle]="'Projecting financial health for ' + forecastRangeLabel() + ' based on your actual data and configured assumptions.'"
      [breadcrumb]="'Scenarios » ' + service.activeScenario()"
      [showActions]="true">
      <div actions class="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
        <button class="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm min-h-[44px] touch-manipulation">
          <span class="material-symbols-outlined text-base sm:text-lg text-green-600">table_view</span>
          Export
        </button>
        <button routerLink="/assumptions" class="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-md shadow-primary/20 min-h-[44px] touch-manipulation">
          <span class="material-symbols-outlined text-base sm:text-lg">tune</span>
          Assumptions
        </button>
      </div>

      <!-- Year Tabs -->
      <div class="flex flex-wrap justify-center sm:justify-start gap-2 mb-6 overflow-x-auto pb-2">
        @for (y of service.forecastYearsList(); track y; let i = $index) {
          <span class="px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap"
            [class.bg-primary]="i === 0"
            [class.text-white]="i === 0"
            [class.bg-slate-100]="i !== 0"
            [class.dark:bg-slate-800]="i !== 0"
            [class.text-slate-600]="i !== 0"
            [class.dark:text-slate-300]="i !== 0">
            {{ y }}
          </span>
        }
      </div>

      <!-- Controls Toolbar -->
      <div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 mb-6 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
          <div class="relative group flex-1 min-w-0">
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Active Scenario</label>
            <button class="flex items-center justify-between w-full min-w-0 sm:w-64 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <span class="flex items-center gap-2">
                <span class="size-2 rounded-full bg-green-500"></span>
                {{ service.activeScenario() }}
              </span>
              <span class="material-symbols-outlined text-lg text-slate-500">expand_more</span>
            </button>
          </div>
          <div class="h-10 w-px bg-slate-200 dark:bg-slate-700 hidden md:block self-end mb-1"></div>
          <div class="relative">
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Forecast Range</label>
            <div class="flex items-center px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
              <span class="material-symbols-outlined text-lg mr-2 text-slate-500">date_range</span>
              FY {{ forecastRangeLabel() }}
            </div>
          </div>
        </div>
        <div class="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex items-center border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
          <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-700 shadow-sm rounded-md text-sm font-medium text-primary dark:text-white transition-all">
            <span class="material-symbols-outlined text-lg">table_chart</span>
            Table View
          </button>
          <button class="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-md">
            <span class="material-symbols-outlined text-lg">ssid_chart</span>
            Chart View
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th class="px-6 py-4 font-semibold text-slate-900 dark:text-white min-w-[200px]">Line Item</th>
                <th class="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right w-40">FY {{ lastActualYear() }} (Act)</th>
                @for (y of service.forecastYearsList(); track y; let i = $index) {
                  <th class="px-6 py-4 font-bold text-right w-40 border-l border-slate-200 dark:border-slate-700"
                    [class.text-primary]="i === 0"
                    [class.bg-primary/5]="i === 0"
                    [class.dark:bg-primary/10]="i === 0"
                    [class.border-primary/10]="i === 0"
                    [class.text-slate-900]="i !== 0"
                    [class.dark:text-white]="i !== 0">
                    FY {{ y }} (Fcst)
                  </th>
                }
                <th class="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right w-32">YoY Growth</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <!-- Assets Header -->
              <tr class="bg-slate-50/80 dark:bg-slate-800/30">
                <td class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2" [attr.colspan]="4 + service.forecastYearsList().length">
                  <span class="material-symbols-outlined text-base">account_balance_wallet</span>
                  Forecasted Balance Sheet - Assets
                </td>
              </tr>
              <!-- Row: Cash -->
              <tr class="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white pl-10">Cash & Equivalents</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-500">{{ service.dashboardData().cash.act | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums font-medium text-slate-900 dark:text-white bg-primary/5 dark:bg-primary/10 border-l border-primary/10 group-hover:bg-blue-100/30">{{ service.dashboardData().cash.fcst24 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().cash.fcst25 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().cash.fcst26 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <span class="material-symbols-outlined text-xs mr-1">trending_up</span> {{ service.dashboardData().cash.growth }}%
                  </span>
                </td>
              </tr>
              <!-- Row: Fixed Assets -->
              <tr class="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white pl-10">Fixed Assets (Net)</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-500">{{ service.dashboardData().fixedAssets.act | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums font-medium text-slate-900 dark:text-white bg-primary/5 dark:bg-primary/10 border-l border-primary/10 group-hover:bg-blue-100/30">{{ service.dashboardData().fixedAssets.fcst24 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().fixedAssets.fcst25 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().fixedAssets.fcst26 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <span class="material-symbols-outlined text-xs mr-1">trending_flat</span> {{ service.dashboardData().fixedAssets.growth }}%
                  </span>
                </td>
              </tr>
              <!-- Row: Total Assets -->
              <tr class="bg-slate-50 dark:bg-slate-800/50 font-semibold border-t border-slate-200 dark:border-slate-700">
                <td class="px-6 py-4 text-slate-900 dark:text-white pl-10">Total Assets</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-500">{{ service.dashboardData().totalAssets.act | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-primary bg-primary/5 dark:bg-primary/10 border-l border-primary/10">{{ service.dashboardData().totalAssets.fcst24 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().totalAssets.fcst25 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().totalAssets.fcst26 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right">
                  <span class="text-green-600 text-xs font-bold">+{{ service.dashboardData().totalAssets.growth }}%</span>
                </td>
              </tr>

              <!-- Liabilities Header -->
              <tr class="bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700">
                <td class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2" [attr.colspan]="4 + service.forecastYearsList().length">
                  <span class="material-symbols-outlined text-base">receipt_long</span>
                  Liabilities & Equity
                </td>
              </tr>
              <!-- Row: Long Term Debt -->
              <tr class="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white pl-10">Long-term Debt</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-500">{{ service.dashboardData().ltDebt.act | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums font-medium text-slate-900 dark:text-white bg-primary/5 dark:bg-primary/10 border-l border-primary/10 group-hover:bg-blue-100/30">{{ service.dashboardData().ltDebt.fcst24 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().ltDebt.fcst25 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().ltDebt.fcst26 | number:'1.0-0' }}</td>
                <td class="px-6 py-4 text-right">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    <span class="material-symbols-outlined text-xs mr-1">trending_up</span> +{{ service.dashboardData().ltDebt.growth }}%
                  </span>
                </td>
              </tr>

              <!-- Metrics Header -->
              <tr class="bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700">
                <td class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2" [attr.colspan]="4 + service.forecastYearsList().length">
                  <span class="material-symbols-outlined text-base">monitoring</span>
                  Key Metrics
                </td>
              </tr>
              <!-- Row: ROE -->
              <tr class="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white pl-10">Return on Equity (ROE)</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-500">{{ service.dashboardData().metrics.roe.act }}%</td>
                <td class="px-6 py-4 text-right tabular-nums font-medium text-slate-900 dark:text-white bg-primary/5 dark:bg-primary/10 border-l border-primary/10 group-hover:bg-blue-100/30">{{ service.dashboardData().metrics.roe.fcst24 }}%</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().metrics.roe.fcst25 }}%</td>
                <td class="px-6 py-4 text-right tabular-nums text-slate-900 dark:text-white">{{ service.dashboardData().metrics.roe.fcst26 }}%</td>
                <td class="px-6 py-4 text-right">
                  <span class="material-symbols-outlined text-green-500 text-sm">arrow_upward</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-500">
            <span class="font-semibold text-slate-700 dark:text-slate-300">Note:</span> Figures are projected estimates. Forecast years: <span class="font-mono">{{ forecastRangeLabel() }}</span>.
          </p>
          <div class="flex items-center gap-2">
            <button class="text-xs font-medium text-primary hover:underline">Download Full Report</button>
            <span class="text-slate-300">|</span>
            <button class="text-xs font-medium text-slate-500 hover:text-slate-900">View Audit Log</button>
          </div>
        </div>
      </div>
    </app-page-layout>
  `
})
export class DashboardComponent {
  service = inject(FinancialService);

  lastActualYear = computed(() => {
    const cfg = this.service.config();
    return cfg.startingYear + cfg.actualYears - 1;
  });

  forecastRangeLabel = computed(() => {
    const years = this.service.forecastYearsList();
    if (years.length === 0) return '—';
    if (years.length === 1) return String(years[0]);
    return years[0] + ' – ' + years[years.length - 1];
  });
}
