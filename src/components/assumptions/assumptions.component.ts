import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { ToastService } from '../../services/toast.service';
import { PageLayoutComponent } from '../layout/page-layout.component';

@Component({
  selector: 'app-assumptions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageLayoutComponent],
  template: `
    <app-page-layout
      title="Forecast Assumptions"
      subtitle="Configure your base case scenario for the next 3 fiscal years. Each forecast year has its own assumptions."
      breadcrumb="Forecasts » Assumptions"
      [showActions]="true">
      <div actions class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Last saved: 2 min ago</span>
        <button routerLink="/dashboard" (click)="onRunForecast()" class="flex items-center justify-center gap-2 rounded-lg min-h-[44px] px-5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-sm touch-manipulation">
          <span class="material-symbols-outlined text-[18px]">play_arrow</span> Run Forecast
        </button>
      </div>

      <div class="flex flex-col gap-6 sm:gap-8 pb-10">
          <!-- Forecast Year Labels -->
          <div class="flex flex-wrap gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Forecast Years:</span>
            @for (y of service.forecastYearsList(); track y; let i = $index) {
              <span class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
                Forecast Year {{ y }}
              </span>
            }
          </div>

          <!-- Operating Assumptions -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 px-1">
              <div class="bg-primary/10 p-1.5 rounded-lg text-primary"><span class="material-symbols-outlined text-[20px]">settings</span></div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Operating Assumptions</h2>
            </div>
            <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[640px] sm:min-w-[800px] border-collapse">
                  <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th class="px-6 py-4 text-left w-[35%]"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</span></th>
                      @for (y of service.forecastYearsList(); track y; let i = $index) {
                        <th class="px-6 py-4 text-left w-[20%]">
                          <span class="text-sm font-bold" [class.text-primary]="i === 0" [class.text-slate-700]="i !== 0" [class.dark:text-slate-300]="i !== 0">
                            {{ y }} Forecast
                          </span>
                        </th>
                      }
                      <th class="px-4 py-4 w-[5%] text-center"><span class="text-xs font-bold text-slate-500 uppercase">Trend</span></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Revenue Growth %</span> <span class="text-xs text-slate-500">% change YoY</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"><div class="flex items-end justify-center h-8 gap-0.5 opacity-60"><div class="w-1.5 bg-primary h-[80%] rounded-t-sm"></div><div class="w-1.5 bg-primary h-[60%] rounded-t-sm"></div><div class="w-1.5 bg-primary h-[40%] rounded-t-sm"></div></div></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">COGS %</span> <span class="text-xs text-slate-500">% of Revenue</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"><div class="flex items-end justify-center h-8 gap-0.5 opacity-60"><div class="w-1.5 bg-slate-400 h-[60%] rounded-t-sm"></div><div class="w-1.5 bg-slate-400 h-[58%] rounded-t-sm"></div><div class="w-1.5 bg-slate-400 h-[56%] rounded-t-sm"></div></div></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">SG&A %</span> <span class="text-xs text-slate-500">% of Revenue</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Other</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><span class="absolute left-3 top-2.5 text-slate-400">$</span><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pl-7 pr-4 h-10" placeholder="0"></div></td>
                      }
                      <td class="px-4 py-3 text-center"></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Depreciation %</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Tax %</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"></td>
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Dividend Payout %</span></div></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10" placeholder="0"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                      }
                      <td class="px-4 py-3 text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Investment Assumptions -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 px-1">
              <div class="bg-amber-500/10 p-1.5 rounded-lg text-amber-600"><span class="material-symbols-outlined text-[20px]">savings</span></div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Investment Assumptions</h2>
            </div>
            <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[480px] sm:min-w-[600px] border-collapse">
                  <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th class="px-6 py-4 text-left w-[40%]"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</span></th>
                      @for (y of service.forecastYearsList(); track y) {
                        <th class="px-6 py-4 text-left"><span class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ y }}</span></th>
                      }
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><span class="text-sm font-medium text-slate-900 dark:text-white">Capital Expenditures</span></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><span class="absolute left-3 top-2.5 text-slate-400">$</span><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pl-7 pr-4 h-10" placeholder="0"></div></td>
                      }
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><span class="text-sm font-medium text-slate-900 dark:text-white">Asset Disposal Proceeds</span></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><span class="absolute left-3 top-2.5 text-slate-400">$</span><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pl-7 pr-4 h-10" placeholder="0"></div></td>
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Financing Assumptions -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 px-1">
              <div class="bg-green-500/10 p-1.5 rounded-lg text-green-600"><span class="material-symbols-outlined text-[20px]">account_balance</span></div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Financing Assumptions</h2>
            </div>
            <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[480px] sm:min-w-[600px] border-collapse">
                  <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th class="px-6 py-4 text-left w-[40%]"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</span></th>
                      @for (y of service.forecastYearsList(); track y) {
                        <th class="px-6 py-4 text-left"><span class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ y }}</span></th>
                      }
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><span class="text-sm font-medium text-slate-900 dark:text-white">Common Equity Change</span></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><span class="absolute left-3 top-2.5 text-slate-400">$</span><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pl-7 pr-4 h-10" placeholder="0"></div></td>
                      }
                    </tr>
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td class="px-6 py-4"><span class="text-sm font-medium text-slate-900 dark:text-white">Interest Income</span></td>
                      @for (y of service.forecastYearsList(); track y) {
                        <td class="px-6 py-3"><div class="relative"><span class="absolute left-3 top-2.5 text-slate-400">$</span><input type="number" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pl-7 pr-4 h-10" placeholder="0"></div></td>
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
      </div>
    </app-page-layout>
  `
})
export class AssumptionsComponent {
  service = inject(FinancialService);
  toast = inject(ToastService);

  onRunForecast() {
    this.toast.success('Forecast complete! View your results on the dashboard.');
  }
}
