/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, ChangeDetectorRef } from '@angular/core';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { TooltipSyncService } from './providers/tooltip-sync.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[clrTooltipTrigger]',
  host: {
    tabindex: '0',
    '[class.tooltip-trigger]': 'true',
    '[attr.aria-describedby]': 'ariaDescribedBy',
    '[attr.role]': '"button"',
  },
})
export class ClrTooltipTrigger {
  private subscriptions: Subscription[] = [];
  public ariaDescribedBy: string = '';

  constructor(
    private smartToggleService: ClrPopoverToggleService,
    private tooltipSync: TooltipSyncService,
    private cdr: ChangeDetectorRef
  ) {
    // Update the aria described by with the new ID
    this.subscriptions.push(
      this.tooltipSync.id.subscribe(change => {
        this.ariaDescribedBy = change;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  @HostListener('mouseenter', ['$event'])
  @HostListener('focus', ['$event'])
  showTooltip($event): void {
    this.smartToggleService.toggleWithEvent($event);
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('blur', ['$event'])
  hideTooltip($event): void {
    this.smartToggleService.toggleWithEvent($event);
  }
}
