import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col min-h-full bg-background-light dark:bg-background-dark">
      @if (showHeader) {
        <header class="flex-shrink-0 px-4 sm:px-6 md:px-8 py-4 md:py-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <div class="max-w-[1440px] mx-auto flex flex-col gap-4 items-center md:items-stretch text-center md:text-left">
            <div class="flex flex-col gap-2 min-w-0 w-full md:w-auto">
              @if (breadcrumb) {
                <div class="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                  {{ breadcrumb }}
                </div>
              }
              <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{{ title }}</h1>
              @if (subtitle) {
                <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto md:mx-0">{{ subtitle }}</p>
              }
            </div>
            @if (showActions) {
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 flex-shrink-0 w-full md:w-auto">
                <ng-content select="[actions]"></ng-content>
              </div>
            }
          </div>
        </header>
      }

      <main class="flex-1 min-w-0">
        <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full">
          <div class="max-w-[1440px] w-full mx-auto">
            <ng-content></ng-content>
          </div>
        </div>

        @if (showFooter) {
          <footer class="px-4 sm:px-6 md:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <div class="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4">
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 order-2 sm:order-1">
                <ng-content select="[footerLeft]"></ng-content>
              </div>
              <div class="flex flex-wrap items-center justify-end gap-2 sm:gap-3 order-1 sm:order-2">
                <ng-content select="[footerRight]"></ng-content>
              </div>
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
