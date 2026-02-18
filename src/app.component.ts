import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProgressStepperComponent } from './components/progress-stepper/progress-stepper.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ProgressStepperComponent, ToastComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <app-sidebar></app-sidebar>
      <main class="flex-1 flex flex-col h-full min-w-0 pl-14 md:pl-0 overflow-hidden">
        <!-- Global header: progress stepper -->
        <header class="flex-shrink-0 px-6 md:px-8 py-4 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <app-progress-stepper></app-progress-stepper>
        </header>
        <!-- Page content -->
        <div class="flex-1 min-h-0 overflow-y-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
    <app-toast></app-toast>
  `
})
export class AppComponent {}
