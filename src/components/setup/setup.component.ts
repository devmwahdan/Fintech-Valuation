import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../services/financial.service';
import { ToastService } from '../../services/toast.service';
import { PageLayoutComponent } from '../layout/page-layout.component';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PageLayoutComponent],
  template: `
    <app-page-layout
      title="Forecast Setup"
      subtitle="Define the core parameters for your balance sheet model. All inputs will adapt dynamically to your choices."
      breadcrumb="Configuration">
      <div class="flex flex-col items-center py-4">
        <div class="w-full max-w-[640px] bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <form class="p-6 md:p-8 space-y-8" (ngSubmit)="onSubmit()">
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Starting Actual Year
                <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help" title="First fiscal year of your historical data">info</span>
              </label>
              <div class="relative max-w-[200px]">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <span class="material-symbols-outlined text-xl">calendar_today</span>
                </span>
                <input type="number" [(ngModel)]="startingYear" name="startingYear"
                  min="2000" max="2100"
                  class="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm shadow-sm"
                  (ngModelChange)="onStartingYearChange($event)">
              </div>
            </div>

            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Actual Years
                <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help" title="How many years of historical data (3–5)">info</span>
              </label>
              <div class="grid grid-cols-3 gap-3">
                @for (opt of [3, 4, 5]; track opt) {
                  <label class="cursor-pointer relative group">
                    <input type="radio" name="actualYears" [value]="opt" [checked]="actualYears() === opt"
                      (change)="onActualYearsChange(opt)" class="peer sr-only">
                    <div class="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 peer-checked:text-primary">
                      <div class="flex flex-col items-center justify-center gap-1">
                        <span class="text-lg font-bold text-slate-900 dark:text-white peer-checked:text-primary">{{ opt }} Years</span>
                        <span class="text-xs text-slate-500">{{ opt === 3 ? 'Standard' : opt === 4 ? 'Extended' : 'Deep Dive' }}</span>
                      </div>
                    </div>
                    <div class="absolute top-2 right-2 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span class="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                  </label>
                }
              </div>
            </div>

            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Forecasting Years
              </label>
              <div class="flex items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span class="text-slate-900 dark:text-white font-bold">3 Years</span>
                <span class="text-xs text-slate-500">(Fixed output period)</span>
              </div>
            </div>

            <div class="space-y-3">
              <label class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Debits / Loans
                <span class="material-symbols-outlined text-slate-400 text-[18px] cursor-help" title="How many loan facilities to configure">info</span>
              </label>
              <div class="flex items-center gap-4">
                <div class="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm w-fit">
                  <button type="button" (click)="decrementLoans()" [disabled]="numLoans() <= 1"
                    class="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg border-r border-slate-200 dark:border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="material-symbols-outlined text-lg align-middle">remove</span>
                  </button>
                  <input type="number" [ngModel]="numLoans()" (ngModelChange)="onNumLoansChange($event)" name="numLoans"
                    min="1" max="20"
                    class="w-16 text-center border-none bg-transparent p-0 text-slate-900 dark:text-white font-semibold focus:ring-0 appearance-none">
                  <button type="button" (click)="incrementLoans()"
                    class="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg border-l border-slate-200 dark:border-slate-700 transition-colors">
                    <span class="material-symbols-outlined text-lg align-middle">add</span>
                  </button>
                </div>
                <span class="text-sm text-slate-500">Loans to configure</span>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
              <p class="text-sm text-slate-700 dark:text-slate-300">
                <strong>Preview:</strong> You will enter actual data for years
                <strong>{{ yearRangePreview() }}</strong>, then configure debits and receive a 3-year forecast for
                <strong>{{ forecastYearsPreview() }}</strong>.
              </p>
            </div>

            <div class="pt-4">
              <button type="submit" routerLink="/actuals"
                class="w-full flex justify-center items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-primary-hover transition-all">
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
    </app-page-layout>
  `
})
export class SetupComponent {
  service = inject(FinancialService);
  toast = inject(ToastService);

  startingYear = signal(2021);
  actualYears = signal<3 | 4 | 5>(3);
  numLoans = signal(2);

  yearRangePreview = computed(() => {
    const start = this.startingYear();
    const count = this.actualYears();
    return `${start} – ${start + count - 1}`;
  });

  forecastYearsPreview = computed(() => {
    const start = this.startingYear();
    const count = this.actualYears();
    const fcstStart = start + count;
    return `${fcstStart} – ${fcstStart + 2}`;
  });

  constructor() {
    const cfg = this.service.config();
    this.startingYear.set(cfg.startingYear);
    this.actualYears.set(cfg.actualYears);
    this.numLoans.set(cfg.numLoans);
  }

  onStartingYearChange(val: number) {
    this.startingYear.set(val);
    this.service.updateConfig({ startingYear: val });
  }

  onActualYearsChange(val: 3 | 4 | 5) {
    this.actualYears.set(val);
    this.service.updateConfig({ actualYears: val });
  }

  onNumLoansChange(val: number) {
    const n = Math.max(1, Math.min(20, Math.round(val)));
    this.numLoans.set(n);
    this.service.updateConfig({ numLoans: n });
  }

  incrementLoans() {
    const n = Math.min(20, this.numLoans() + 1);
    this.numLoans.set(n);
    this.service.updateConfig({ numLoans: n });
  }

  decrementLoans() {
    const n = Math.max(1, this.numLoans() - 1);
    this.numLoans.set(n);
    this.service.updateConfig({ numLoans: n });
  }

  onSubmit() {
    this.service.updateConfig({
      startingYear: this.startingYear(),
      actualYears: this.actualYears(),
      numLoans: this.numLoans()
    });
    this.service.setCurrentActualYear(this.service.actualYearsList()[0] ?? null);
    this.toast.success('Configuration saved. Proceeding to data entry.');
  }
}
