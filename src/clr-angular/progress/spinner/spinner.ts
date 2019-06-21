/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Renderer2, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[clrSpinner]',
  host: {
    class: 'spinner',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-busy]': 'true',
  },
})
export class ClrSpinnerTag implements OnDestroy {
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngOnDestroy(): void {
    this.renderer.setAttribute(this.hostElement.nativeElement, 'aria-busy', 'false');
  }
}
