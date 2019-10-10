/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, HostListener, ChangeDetectorRef } from '@angular/core';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';

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
  constructor(private smartToggleService: ClrPopoverToggleService, private cdr: ChangeDetectorRef) {}

  private _ariaDescribedBy: string = '';
  public set ariaDescribedBy(value: string) {
    if (this._ariaDescribedBy !== value) {
      this._ariaDescribedBy = value;
      this.cdr.detectChanges();
    }
  }
  public get ariaDescribedBy() {
    return this._ariaDescribedBy;
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  showTooltip(): void {
    this.smartToggleService.open = true;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hideTooltip(): void {
    this.smartToggleService.open = false;
  }
}
