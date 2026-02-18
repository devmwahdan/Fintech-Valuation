
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actuals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-1 h-full overflow-hidden">
      <!-- Sub-sidebar for Years -->
      <aside class="w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
        <div class="p-6">
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Timeline</h2>
          <nav class="flex flex-col gap-2">
            <!-- Active 2021 -->
            <a href="#" class="group flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 border border-primary/20">
              <div class="text-primary"><span class="material-symbols-outlined fill-1">calendar_today</span></div>
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-primary">2021 (Actual)</span>
                <span class="text-[10px] text-primary/80 font-medium">Editing Now</span>
              </div>
              <span class="ml-auto material-symbols-outlined text-primary text-[18px]">chevron_right</span>
            </a>
            <!-- 2022 -->
            <a href="#" class="group flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent">
              <div class="text-slate-400 group-hover:text-slate-600"><span class="material-symbols-outlined">calendar_today</span></div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-slate-600 dark:text-slate-300">2022 (Actual)</span>
                <span class="text-[10px] text-slate-400">Pending Input</span>
              </div>
            </a>
             <!-- 2023 -->
            <a href="#" class="group flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent">
              <div class="text-slate-400 group-hover:text-slate-600"><span class="material-symbols-outlined">calendar_today</span></div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-slate-600 dark:text-slate-300">2023 (Actual)</span>
                <span class="text-[10px] text-slate-400">Pending Input</span>
              </div>
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main Input Area -->
      <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark relative p-8">
        <div class="max-w-5xl mx-auto pb-24">
          <div class="flex items-end justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">2021 Financial Actuals</h2>
              <p class="text-slate-500 mt-2">Enter the confirmed historical data for the fiscal year ending Dec 31, 2021.</p>
            </div>
            <button class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">upload</span> Import CSV
            </button>
          </div>

          <!-- Income Statement -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-green-500 rounded-full mr-1"></span> Income Statement
              </h3>
              <span class="text-xs font-mono bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">USD (Thousands)</span>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <!-- Revenue -->
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex justify-between">Revenue</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" value="1250000">
                </div>
              </div>
              <!-- COGS -->
              <div class="group">
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex justify-between">COGS</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-right focus:ring-primary focus:border-primary" value="840000">
                </div>
              </div>
              <!-- Calculated Field -->
              <div class="group col-span-1 md:col-span-2">
                <label class="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">Gross Profit (Calculated)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                  <input type="text" readonly value="410,000" class="w-full pl-7 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-bold text-right font-mono">
                   <span class="absolute right-36 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">32.8% Margin</span>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Balance Sheet Section -->
          <section class="mb-8 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span class="w-1 h-6 bg-blue-500 rounded-full mr-1"></span> Balance Sheet
              </h3>
             </div>
             <div class="p-6">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Assets</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div class="group">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cash</label>
                    <div class="relative">
                       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                       <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-right font-mono text-slate-900 dark:text-white focus:ring-primary focus:border-primary" placeholder="0.00">
                    </div>
                  </div>
                   <div class="group">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Accounts Receivable</label>
                    <div class="relative">
                       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                       <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-right font-mono text-slate-900 dark:text-white focus:ring-primary focus:border-primary" placeholder="0.00">
                    </div>
                  </div>
                   <div class="group">
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Inventory</label>
                    <div class="relative">
                       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                       <input type="number" class="w-full pl-7 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-right font-mono text-slate-900 dark:text-white focus:ring-primary focus:border-primary" placeholder="0.00">
                    </div>
                  </div>
                </div>
             </div>
          </section>
        </div>
        
        <!-- Sticky Bottom Bar -->
        <div class="absolute bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 p-4 shadow-lg z-30">
          <div class="max-w-5xl mx-auto flex justify-between items-center">
             <button class="px-6 py-2.5 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors">Save Draft</button>
             <button routerLink="/loans" class="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all flex items-center gap-2">
                Next: Loans
                <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
             </button>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ActualsComponent {}
