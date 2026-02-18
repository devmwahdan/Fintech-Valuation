
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinancialService } from '../../services/financial.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full min-h-full">
      <!-- Main Content -->
      <div class="flex-1 p-6 lg:p-10 flex flex-col gap-8 min-w-0">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
             <span>Forecast</span> <span class="material-symbols-outlined text-xs">chevron_right</span> <span class="text-primary font-semibold">Debt & Loan Config</span>
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Debt & Loan Configuration</h1>
            <p class="text-slate-500 max-w-2xl">Configure existing debt schedules and new borrowings.</p>
          </div>
        </div>

        <!-- Wizard Steps -->
        <div class="flex items-center gap-2 mb-2 overflow-x-auto pb-2">
           <div class="flex items-center gap-2">
              <div class="size-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">check</span></div>
              <span class="text-sm font-medium text-slate-600 whitespace-nowrap">Assets</span>
           </div>
           <div class="h-0.5 w-8 bg-slate-200"></div>
           <div class="flex items-center gap-2">
              <div class="size-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">check</span></div>
              <span class="text-sm font-medium text-slate-600 whitespace-nowrap">Liabilities</span>
           </div>
           <div class="h-0.5 w-8 bg-slate-200"></div>
           <div class="flex items-center gap-2">
              <div class="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
              <span class="text-sm font-bold text-primary whitespace-nowrap">Debt Config</span>
           </div>
        </div>

        <!-- Loan Cards List -->
        <div class="flex flex-col gap-6">
          @for(loan of service.loans(); track loan.id) {
            <div class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group">
              <div class="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div class="flex items-center gap-3">
                   <div class="size-10 rounded-lg flex items-center justify-center" [ngClass]="loan.colorClass">
                      <span class="material-symbols-outlined">{{loan.icon}}</span>
                   </div>
                   <div>
                      <h3 class="font-semibold text-slate-900 dark:text-white">{{loan.name}}</h3>
                      <p class="text-xs text-slate-500">{{loan.type}} • ID: #{{loan.id}}</p>
                   </div>
                </div>
                <div class="flex gap-2">
                   <button class="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors"><span class="material-symbols-outlined">content_copy</span></button>
                   <button class="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"><span class="material-symbols-outlined">delete</span></button>
                </div>
              </div>
              
              <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <!-- Year -->
                 <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Fiscal Year</label>
                    <select class="w-full h-11 pl-3 pr-10 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
                      <option>{{loan.year}}</option>
                      <option>2026 (Forecast)</option>
                    </select>
                 </div>
                 <!-- Principal -->
                 <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                       <span>Principal Change</span>
                       <span class="text-xs text-slate-400 font-normal">Inc/Dec</span>
                    </label>
                    <div class="relative">
                       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                       <input type="text" [value]="loan.principal | number" class="w-full h-11 pl-7 pr-12 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-mono text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
                    </div>
                 </div>
                  <!-- Rate -->
                 <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Interest Rate</label>
                    <div class="relative">
                       <input type="text" [value]="loan.rate" class="w-full h-11 pl-3 pr-8 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-mono text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
                       <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                    </div>
                 </div>
                 <!-- Ending Balance -->
                 <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-bold text-slate-900 dark:text-white">Ending Balance</label>
                    <div class="relative">
                       <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white font-bold font-mono">$</span>
                       <input type="text" [value]="loan.balance | number" class="w-full h-11 pl-7 pr-3 rounded-lg border-primary/30 bg-primary/5 dark:bg-primary/10 text-sm font-mono font-bold text-right focus:border-primary focus:ring-primary text-slate-900 dark:text-white">
                    </div>
                 </div>
              </div>
            </div>
          }

          <button class="w-full rounded-xl border-2 border-dashed border-slate-300 hover:border-primary bg-transparent py-6 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-primary transition-all">
             <div class="size-10 rounded-full bg-slate-100 flex items-center justify-center"><span class="material-symbols-outlined">add</span></div>
             <span class="font-bold text-sm">Add Another Loan</span>
          </button>
        </div>

        <div class="flex items-center justify-between pt-6 mt-4 border-t border-slate-200 dark:border-slate-700">
           <button routerLink="/actuals" class="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
             <span class="material-symbols-outlined text-lg">arrow_back</span> Back
           </button>
           <button routerLink="/assumptions" class="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-md transition-all flex items-center gap-2">
             Next: Assumptions <span class="material-symbols-outlined text-lg">arrow_forward</span>
           </button>
        </div>
      </div>

      <!-- Right Summary Sidebar -->
      <div class="w-full lg:w-[360px] bg-white dark:bg-surface-dark border-l border-slate-200 dark:border-slate-700 lg:h-auto p-6 flex flex-col gap-8 hidden lg:flex">
         <div>
            <div class="flex justify-between items-center mb-4">
               <h3 class="font-bold text-slate-900 dark:text-white">Forecast Summary</h3>
               <span class="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">Live</span>
            </div>
            
            <div class="flex flex-col gap-3">
               <!-- 2024 -->
               <div class="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <span class="material-symbols-outlined text-green-500 text-[20px] mt-0.5">check_circle</span>
                  <div class="flex-1">
                     <div class="flex justify-between mb-1"><span class="text-sm font-bold text-slate-900 dark:text-white">2024 (Actual)</span> <span class="text-xs text-slate-500">Complete</span></div>
                     <div class="flex justify-between items-end"><span class="text-xs text-slate-500">Total Debt</span> <span class="text-sm font-bold text-slate-900 dark:text-white font-mono">$1,200,000</span></div>
                     <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden"><div class="bg-primary h-full w-[40%]"></div></div>
                  </div>
               </div>
               <!-- 2025 -->
               <div class="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
                  <span class="material-symbols-outlined text-primary text-[20px] mt-0.5 animate-pulse">sync</span>
                  <div class="flex-1 relative z-10">
                     <div class="flex justify-between mb-1"><span class="text-sm font-bold text-slate-900 dark:text-white">2025 (Forecast)</span> <span class="text-xs text-primary font-medium">Editing</span></div>
                     <div class="flex justify-between items-end"><span class="text-xs text-slate-500">Total Debt</span> <span class="text-sm font-bold text-primary font-mono">$1,700,000</span></div>
                     <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden"><div class="bg-primary h-full w-[65%]"></div></div>
                  </div>
               </div>
            </div>
         </div>

         <div class="p-4 rounded-xl bg-[#101622] text-white shadow-lg relative overflow-hidden">
            <div class="relative z-10">
               <h4 class="text-sm font-medium text-gray-300 mb-1">Weighted Avg. Interest Rate</h4>
               <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-bold font-mono">5.2%</span>
                  <span class="text-xs text-green-400 flex items-center"><span class="material-symbols-outlined text-[12px]">trending_down</span> -0.3%</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  `
})
export class LoansComponent {
  service = inject(FinancialService);
}
