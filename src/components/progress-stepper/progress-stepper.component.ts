import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FinancialService } from '../../services/financial.service';

const STEPS = [
  { path: '/setup', label: 'Configuration', step: 1 },
  { path: '/actuals', label: 'Actuals Data', step: 2 },
  { path: '/loans', label: 'Debits', step: 3 },
  { path: '/assumptions', label: 'Assumptions', step: 4 },
  { path: '/dashboard', label: 'Results', step: 5 },
] as const;

@Component({
  selector: 'app-progress-stepper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="w-full max-w-[1440px] mx-auto">
      <div class="flex items-center justify-between mb-4 px-2">
        <p class="text-slate-900 dark:text-white text-base font-semibold">{{ currentStepLabel() }}</p>
        <span class="text-slate-500 text-sm font-medium">{{ progressPercent() }}% Completed</span>
      </div>
      <div class="relative h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out" [style.width.%]="progressPercent()"></div>
      </div>
      <div class="hidden md:flex justify-between mt-3 text-xs font-medium px-1 gap-1">
        @for (s of steps; track s.path) {
          <a [routerLink]="s.path" [class]="getStepClass(s)"
            class="flex-1 text-center py-1.5 rounded-md transition-colors min-w-0 truncate">
            {{ s.label }}
          </a>
        }
      </div>
    </div>
  `
})
export class ProgressStepperComponent {
  private router = inject(Router);
  private financial = inject(FinancialService);

  steps = STEPS;

  currentStepIndex = computed(() => {
    const url = this.router.url.split('?')[0].replace(/^#/, '') || '/';
    if (url === '/' || url === '') return 4; // Dashboard
    const idx = STEPS.findIndex(s => url.startsWith(s.path));
    return idx >= 0 ? idx : 0;
  });

  currentStepLabel = computed(() => {
    const idx = this.currentStepIndex();
    const s = STEPS[idx];
    return s ? `Step ${s.step} of 5: ${s.label}` : 'Balance Sheet Forecast';
  });

  progressPercent = computed(() => {
    const idx = this.currentStepIndex();
    return Math.round(((idx + 0.5) / 5) * 100);
  });

  getStepClass(step: typeof STEPS[number]) {
    const idx = this.currentStepIndex();
    const stepIdx = STEPS.findIndex(s => s.path === step.path);
    const isActive = stepIdx === idx;
    const isPast = stepIdx < idx;
    return {
      'text-primary font-bold': isActive,
      'text-green-600 dark:text-green-400': isPast && !isActive,
      'text-slate-500 hover:text-slate-700 dark:hover:text-slate-400': !isActive && !isPast,
    };
  }
}
