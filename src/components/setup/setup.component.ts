
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinancialService } from '../../services/financial.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col items-center justify-start pt-8 pb-12 px-4 sm:px-6 w-full">
      <!-- Progress Bar -->
      <div class="w-full max-w-[960px] mb-10">
        <div class="flex items-center justify-between mb-4 px-2">
          <p class="text-slate-900 dark:text-white text-base font-semibold">Step 1 of 5: Configuration</p>
          <span class="text-slate-500 text-sm font-medium">20% Completed</span>
        </div>
        <div class="relative h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-primary rounded-full" style="width: 20%;"></div>
        </div>
        <div class="hidden md:flex justify-between mt-3 text-xs font-medium text-slate-500 px-1">
          <span class="text-primary font-bold">Configuration</span>
          <span>Actuals Data</span>
          <span>Loans</span>
          <span>Assumptions</span>
          <span>Results</span>
        </div>
      </div>

      <!-- Config Card -->
      <div class="w-full max-w-[640px] bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="bg-primary/10 p-2 rounded-lg text-primary">
              <span class="material-symbols-outlined">settings_suggest</span>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Forecast Setup</h1>
          </div>
          <p class="text-slate-500 text-base leading-relaxed pl-12">
            Define the core parameters for your balance sheet model before importing data.
          </p>
        </div>
        <hr class="border-slate-100 dark:border-slate-800"/>
        
        <form class="px-8 py-8 space-y-8">
          <!-- Year Input -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              First Year of Actuals
              <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help">info</span>
            </label>
            <div class="relative max-w-[200px]">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <span class="material-symbols-outlined text-xl">calendar_today</span>
              </span>
              <input type="number" value="2021" class="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm">
            </div>
          </div>

          <!-- Duration Selection -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Historical Duration
              <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help">info</span>
            </label>
            <div class="grid grid-cols-3 gap-3">
              <!-- 3 Years -->
              <label class="cursor-pointer relative group">
                <input type="radio" name="duration" value="3" checked class="peer sr-only">
                <div class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 peer-checked:text-primary">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <span class="text-lg font-bold text-slate-900 dark:text-white peer-checked:text-primary">3 Years</span>
                    <span class="text-xs text-slate-500">Standard</span>
                  </div>
                </div>
                <div class="absolute top-2 right-2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span class="material-symbols-outlined text-lg">check_circle</span>
                </div>
              </label>
              <!-- 4 Years -->
              <label class="cursor-pointer relative group">
                <input type="radio" name="duration" value="4" class="peer sr-only">
                <div class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 peer-checked:text-primary">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <span class="text-lg font-bold text-slate-900 dark:text-white peer-checked:text-primary">4 Years</span>
                    <span class="text-xs text-slate-500">Extended</span>
                  </div>
                </div>
                 <div class="absolute top-2 right-2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span class="material-symbols-outlined text-lg">check_circle</span>
                </div>
              </label>
              <!-- 5 Years -->
              <label class="cursor-pointer relative group">
                <input type="radio" name="duration" value="5" class="peer sr-only">
                <div class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 peer-checked:text-primary">
                  <div class="flex flex-col items-center justify-center gap-1">
                    <span class="text-lg font-bold text-slate-900 dark:text-white peer-checked:text-primary">5 Years</span>
                    <span class="text-xs text-slate-500">Deep Dive</span>
                  </div>
                </div>
                 <div class="absolute top-2 right-2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span class="material-symbols-outlined text-lg">check_circle</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Counter -->
          <div class="space-y-3">
             <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Active Loan Facilities
              <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help">info</span>
            </label>
            <div class="flex items-center gap-4">
              <div class="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm w-fit">
                <button type="button" class="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg border-r border-slate-200 dark:border-slate-700 transition-colors">
                  <span class="material-symbols-outlined text-lg align-middle">remove</span>
                </button>
                <input type="number" value="2" class="w-16 text-center border-none bg-transparent p-0 text-slate-900 dark:text-white font-semibold focus:ring-0 appearance-none">
                <button type="button" class="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg border-l border-slate-200 dark:border-slate-700 transition-colors">
                  <span class="material-symbols-outlined text-lg align-middle">add</span>
                </button>
              </div>
              <span class="text-sm text-slate-500">Facilities to configure</span>
            </div>
          </div>

          <div class="pt-6">
            <button routerLink="/actuals" class="w-full flex justify-center items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-primary-hover transition-all">
              Start Data Entry
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
            <p class="text-center mt-4 text-xs text-slate-400">
              You can always adjust these settings later in the configuration tab.
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SetupComponent {
  service = inject(FinancialService);
}
