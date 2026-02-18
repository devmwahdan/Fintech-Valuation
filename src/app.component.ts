import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProgressStepperComponent } from './components/progress-stepper/progress-stepper.component';
import { ToastComponent } from './components/toast/toast.component';
import { MobileMenuService } from './services/mobile-menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ProgressStepperComponent, ToastComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <app-sidebar></app-sidebar>
      <main class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <header class="flex-shrink-0 flex items-center gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 pt-[max(0.75rem,env(safe-area-inset-top))] bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <button type="button" (click)="mobileMenu.openMenu()"
            class="md:hidden flex-shrink-0 p-2.5 -ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open menu">
            <span class="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[24px]">menu</span>
          </button>
          <div class="flex-1 min-w-0">
            <app-progress-stepper></app-progress-stepper>
          </div>
        </header>
        <!-- Page content -->
        <div class="flex-1 min-h-0 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
    <app-toast></app-toast>
  `
})
export class AppComponent {
  mobileMenu = inject(MobileMenuService);
}
