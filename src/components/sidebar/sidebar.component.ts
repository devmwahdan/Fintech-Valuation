
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="flex w-64 flex-col bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto shrink-0 z-20 hidden md:flex">
      <div class="flex flex-col gap-4 p-4">
        <!-- Logo Area -->
        <div class="flex gap-3 items-center px-2">
          <div class="bg-gradient-to-br from-primary to-blue-400 size-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-[20px]">analytics</span>
          </div>
          <div class="flex flex-col">
            <h1 class="text-slate-900 dark:text-white text-sm font-bold leading-none">FinanceFlow</h1>
            <span class="text-[10px] text-slate-500 font-medium mt-1">Balance Sheet Tool</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-col gap-1 mt-6">
          <a routerLink="/dashboard" routerLinkActive="bg-primary/10 text-primary" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">pie_chart</span>
            <span class="text-sm font-medium">Dashboard</span>
          </a>
          
          <div class="pt-4 pb-2 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Configuration</div>

          <a routerLink="/setup" routerLinkActive="bg-primary/10 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">settings_suggest</span>
            <span class="text-sm font-medium">Forecast Setup</span>
          </a>
          
          <a routerLink="/actuals" routerLinkActive="bg-primary/10 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">database</span>
            <span class="text-sm font-medium">Historical Data</span>
          </a>

          <a routerLink="/loans" routerLinkActive="bg-primary/10 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">account_balance</span>
            <span class="text-sm font-medium">Debt & Loans</span>
          </a>

          <a routerLink="/assumptions" routerLinkActive="bg-primary/10 text-primary" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <span class="material-symbols-outlined group-[.text-primary]:filled text-[20px]">trending_up</span>
            <span class="text-sm font-medium">Assumptions</span>
          </a>
        </div>
      </div>

      <!-- Bottom User Section -->
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
          <button class="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1.5 w-full px-1">
            <span class="material-symbols-outlined text-[14px]">logout</span> 
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {}
