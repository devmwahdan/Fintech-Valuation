
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assumptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="flex-none px-8 py-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 flex justify-between items-start gap-4">
         <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-slate-500 text-sm mb-1">
               <span>Forecasts</span> <span class="material-symbols-outlined text-[12px]">chevron_right</span> <span class="text-primary font-medium">Assumptions</span>
            </div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">4. Forecast Assumptions</h1>
            <p class="text-slate-500 text-sm">Configure your base case scenario for the next 3 fiscal years.</p>
         </div>
         <div class="flex items-center gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Last saved: 2 min ago</span>
            <button routerLink="/dashboard" class="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-sm">
               <span class="material-symbols-outlined text-[18px]">play_arrow</span> Run Forecast
            </button>
         </div>
      </header>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8">
         <div class="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
            <!-- Scenario Selector -->
            <div class="flex flex-wrap items-end gap-6 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
               <div class="flex flex-col gap-1.5 min-w-[240px]">
                  <label class="text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">Select Scenario</label>
                  <div class="relative">
                     <select class="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white h-10 pl-3 pr-10 text-sm focus:ring-primary focus:border-primary">
                        <option>Base Case (Default)</option>
                        <option>Upside Scenario</option>
                     </select>
                     <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"><span class="material-symbols-outlined text-sm">expand_more</span></div>
                  </div>
               </div>
               <div class="h-10 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
               <div class="flex items-center gap-4">
                  <div class="flex flex-col gap-1"><span class="text-slate-500 text-xs">Start Date</span> <span class="text-slate-900 dark:text-white text-sm font-medium">Jan 2024</span></div>
                  <div class="flex flex-col gap-1"><span class="text-slate-500 text-xs">End Date</span> <span class="text-slate-900 dark:text-white text-sm font-medium">Dec 2026</span></div>
               </div>
            </div>

            <!-- Operating Assumptions -->
            <section class="flex flex-col gap-4">
               <div class="flex items-center gap-2 px-1">
                  <div class="bg-primary/10 p-1.5 rounded-lg text-primary"><span class="material-symbols-outlined text-[20px]">settings</span></div>
                  <h2 class="text-lg font-bold text-slate-900 dark:text-white">Operating Assumptions</h2>
               </div>
               <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
                  <div class="overflow-x-auto">
                     <table class="w-full min-w-[800px] border-collapse">
                        <thead>
                           <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                              <th class="px-6 py-4 text-left w-[35%]"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</span></th>
                              <th class="px-6 py-4 text-left w-[20%]"><span class="text-sm font-bold text-primary">2024 Forecast</span></th>
                              <th class="px-6 py-4 text-left w-[20%]"><span class="text-sm font-bold text-slate-700 dark:text-slate-300">2025 Forecast</span></th>
                              <th class="px-6 py-4 text-left w-[20%]"><span class="text-sm font-bold text-slate-700 dark:text-slate-300">2026 Forecast</span></th>
                              <th class="px-4 py-4 w-[5%] text-center"><span class="text-xs font-bold text-slate-500 uppercase">Trend</span></th>
                           </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                           <!-- Revenue Growth -->
                           <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">Revenue Growth</span> <span class="text-xs text-slate-500">% change YoY</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="12.5" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="10.0" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="8.5" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-4 py-3 text-center"><div class="flex items-end justify-center h-8 gap-0.5 opacity-60"><div class="w-1.5 bg-primary h-[80%] rounded-t-sm"></div><div class="w-1.5 bg-primary h-[60%] rounded-t-sm"></div><div class="w-1.5 bg-primary h-[40%] rounded-t-sm"></div></div></td>
                           </tr>
                           <!-- COGS -->
                           <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td class="px-6 py-4"><div class="flex flex-col"><span class="text-sm font-medium text-slate-900 dark:text-white">COGS</span> <span class="text-xs text-slate-500">% of Revenue</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="42.0" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="41.5" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-6 py-3"><div class="relative"><input type="number" value="41.0" class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-right pr-8 h-10"><span class="absolute right-3 top-2.5 text-slate-400 text-xs font-medium">%</span></div></td>
                              <td class="px-4 py-3 text-center"><div class="flex items-end justify-center h-8 gap-0.5 opacity-60"><div class="w-1.5 bg-slate-400 h-[60%] rounded-t-sm"></div><div class="w-1.5 bg-slate-400 h-[58%] rounded-t-sm"></div><div class="w-1.5 bg-slate-400 h-[56%] rounded-t-sm"></div></div></td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>
         </div>
      </div>
    </div>
  `
})
export class AssumptionsComponent {}
