import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { MobileMenuService } from '../../services/mobile-menu.service';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'pie_chart', step: 5 },
  { path: '/setup', label: 'Forecast Setup', icon: 'settings_suggest', step: 1 },
  { path: '/actuals', label: 'Historical Data', icon: 'database', step: 2 },
  { path: '/loans', label: 'Debits', icon: 'account_balance', step: 3 },
  { path: '/assumptions', label: 'Assumptions', icon: 'trending_up', step: 4 },
] as const;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Mobile overlay -->
    @if (mobileMenu.open()) {
      <div class="md:hidden fixed inset-0 bg-black/50 z-40" (click)="mobileMenu.close()"></div>
    }

    <!-- Sidebar -->
    <aside [class.translate-x-0]="mobileMenu.open()" [class.-translate-x-full]="!mobileMenu.open()"
      class="fixed md:relative inset-y-0 left-0 z-50 md:z-auto w-64 flex flex-col bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto shrink-0 transition-transform duration-300 ease-out md:translate-x-0">
      <div class="flex flex-col gap-4 p-4">
        <div class="flex items-center justify-between">
          <div class="flex gap-3 items-center px-2">
            <div class="bg-gradient-to-br from-primary to-blue-400 size-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div class="flex flex-col">
              <h1 class="text-slate-900 dark:text-white text-sm font-bold leading-none">FinanceFlow</h1>
              <span class="text-[10px] text-slate-500 font-medium mt-1">Balance Sheet Tool</span>
            </div>
          </div>
          <button type="button" (click)="mobileMenu.close()" class="md:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav class="flex flex-col gap-1 mt-6">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path" (click)="mobileMenu.close()"
              routerLinkActive="bg-primary/10 text-primary" [routerLinkActiveOptions]="{exact: item.path === '/dashboard'}"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <span class="relative">
                <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">{{ item.icon }}</span>
                @if (isStepComplete(item.step)) {
                  <span class="absolute -top-1 -right-1 size-3.5 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-[10px]">check</span>
                  </span>
                }
              </span>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </a>
          }
        </nav>
      </div>

      <div class="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-white dark:ring-slate-800">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-IrpXAOQb76Juo2i_W2A4lQjxDxuPtQbPlkC9iDy1FKq0aNvFp2z8ZGReovZaCE4MFUzpR_LNV7O6L621h0DFb2nr0IvopoYP0syQwlKnfXRYsn7ILVBNLuBw0im9MzvEqhHLR3DrfLghIV3dkx5Ep-k3YrmEWltE3U08nx4cJZwviBie_cX_F-QzTlxZXOHGD0w0_jGoyqbCF62zqpdNZCofcvUhrn_c34-kvxLxcV25sUce6I-Hks57AYkpimqf8iqA1EgQjcCz" alt="User" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-semibold text-slate-900 dark:text-white">Jane Doe</span>
              <span class="text-[10px] text-slate-500">Financial Analyst</span>
            </div>
          </div>
          <button type="button" class="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1.5 w-full px-1">
            <span class="material-symbols-outlined text-[14px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private router = inject(Router);
  mobileMenu = inject(MobileMenuService);
  navItems = NAV_ITEMS;

  currentStepIndex = computed(() => {
    const url = this.router.url.split('?')[0];
    if (url === '/' || url === '' || url.includes('dashboard')) return 5;
    if (url.includes('setup')) return 1;
    if (url.includes('actuals')) return 2;
    if (url.includes('loans')) return 3;
    if (url.includes('assumptions')) return 4;
    return 0;
  });

  isStepComplete(step: number): boolean {
    return this.currentStepIndex() > step;
  }
}
