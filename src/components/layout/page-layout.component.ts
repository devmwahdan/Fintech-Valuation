import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col min-h-full bg-background-light dark:bg-background-dark">
      @if (showHeader) {
        <header class="flex-shrink-0 px-6 md:px-8 py-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <div class="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div class="flex flex-col gap-2 min-w-0">
              @if (breadcrumb) {
                <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  {{ breadcrumb }}
                </div>
              }
              <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{{ title }}</h1>
              @if (subtitle) {
                <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl">{{ subtitle }}</p>
              }
            </div>
            @if (showActions) {
              <div class="flex items-center gap-3 flex-shrink-0">
                <ng-content select="[actions]"></ng-content>
              </div>
            }
          </div>
        </header>
      }

      <main class="flex-1">
        <div class="px-6 md:px-8 py-6">
          <div class="max-w-[1440px] mx-auto w-full">
            <ng-content></ng-content>
          </div>
        </div>

        @if (showFooter) {
          <footer class="px-6 md:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <div class="max-w-[1440px] mx-auto flex justify-between items-center gap-4">
              <ng-content select="[footerLeft]"></ng-content>
              <ng-content select="[footerRight]"></ng-content>
            </div>
          </footer>
        }
      </main>
    </div>
  `
})
export class PageLayoutComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() breadcrumb = '';
  @Input() showHeader = true;
  @Input() showActions = false;
  @Input() showFooter = false;
  @Input() fullHeight = false;
}
