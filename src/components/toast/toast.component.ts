import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <div *ngFor="let toast of toastService.toasts()"
        class="pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm toast-animate"
        [ngClass]="{
          'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200': toast.type === 'success',
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200': toast.type === 'error',
          'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200': toast.type === 'warning',
          'bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200': toast.type === 'info'
        }">
        <span class="material-symbols-outlined shrink-0" [ngClass]="{
          'text-green-600': toast.type === 'success',
          'text-red-600': toast.type === 'error',
          'text-amber-600': toast.type === 'warning',
          'text-primary': toast.type === 'info'
        }">
          {{ toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'info' }}
        </span>
        <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
        <button type="button" (click)="toastService.dismiss(toast.id)"
          class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
