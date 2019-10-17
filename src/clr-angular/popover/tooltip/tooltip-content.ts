/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';
import { validPosition } from './tooltip-operators';

const SIZES: string[] = ['xs', 'sm', 'md', 'lg'];

@Component({
  selector: 'clr-tooltip-content',
  template: `
      <ng-content></ng-content>
    `,
  host: {
    '[class.tooltip-content]': 'true',
    '[attr.role]': '"tooltip"',
    '[id]': 'id',
    '[style.opacity]': '1',
    '[style.visibility]': '"visible"',
    '[style.display]': '"block"',
  },
})
export class ClrTooltipContent {
  constructor(
    parentHost: ElementRef,
    @Inject(UNIQUE_ID) public uniqueId: string,
    private renderer: Renderer2,
    private el: ElementRef,
    private tooltipIdService: TooltipIdService
  ) {
    if (!parentHost) {
      throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
    }

    // Defaults
    this.position = 'right';
    this.size = 'sm';

    // Set the default id in case consumer does not supply a custom id.
    this.updateId(uniqueId);
  }

  private _position: string;

  get position() {
    return this._position;
  }

  get id(): string {
    return this._id;
  }

  @Input()
  set id(value: string) {
    value ? this.updateId(value) : this.updateId('');
  }
  private _id;

  private updateId(id: string) {
    this._id = id;
    this.tooltipIdService.updateId(id);
  }

  @Input('clrPosition')
  set position(position: string) {
    // Skip position change when it's not needed.
    if ([undefined, null, this.position].includes(position)) {
      return;
    }
    // Ugh
    this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);
    if (validPosition(position)) {
      this._position = position;
    } else {
      this._position = 'top-right';
    }
    // Ugh
    this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.position);
  }

  private _size: string;

  get size() {
    return this._size;
  }

  @Input('clrSize')
  set size(size: string) {
    if ([undefined, null, this.size].includes(size)) {
      return;
    }
    // Ugh
    this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);
    if (size && SIZES.includes(size)) {
      this._size = size;
    } else {
      this._size = 'sm';
    }
    // Ugh
    this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this.size);
  }
}
