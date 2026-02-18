
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <app-sidebar></app-sidebar>
      <main class="flex-1 flex flex-col h-full relative overflow-hidden">
        <!-- Main Scrollable Area -->
        <div class="flex-1 overflow-y-auto">
           <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AppComponent {}
