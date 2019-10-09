/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  Optional,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';

import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { Subscription } from 'rxjs';

import { validPosition } from '../../utils/popover/position-operators';

const SIZES: string[] = ['xs', 'sm', 'md', 'lg'];
// TODO remove this just keep it until all positions are validated
const POSITIONS: string[] = ['left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];

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
export class ClrTooltipContent extends AbstractPopover implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    injector: Injector,
    parentHost: ElementRef,
    @Inject(UNIQUE_ID) public popoverId: string,
    private tooltipIdService: TooltipIdService,
    private smartToggleService: ClrPopoverToggleService,
    @Optional() private ifOpen: IfOpenService,
    private cdr: ChangeDetectorRef
  ) {
    super(injector, parentHost);

    if (!parentHost) {
      throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
    }

    this.updateId(popoverId);

    // Defaults
    this.position = 'right';
    this.size = 'sm';
  }

  ngOnInit() {
    // Inform ifOpenService for changes
    this.subscriptions.push(
      this.smartToggleService.openChange.subscribe(openState => {
        if (this.ifOpen) {
          this.ifOpen.open = openState;
        }
      })
    );
  }

  ngOnDestroy() {
    // Clear all subscriptions
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  finalizePosition(position: string) {
    console.log('Require update of positions new ', position, ' old ', this.position);
    if (position !== this.position) {
      this._position = position;
      this.cdr.detectChanges();
    }
  }

  // ID

  private _id;
  @Input()
  set id(value: string) {
    value ? this.updateId(value) : this.updateId('');
  }

  get id(): string {
    return this._id;
  }

  private updateId(id: string) {
    this._id = id;
    this.tooltipIdService.updateId(id);
  }

  // POSITION

  private _position: string;
  @Input('clrPosition')
  set position(position: string) {
    this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.position);

    console.log('clrPosition before ', this._position);

    if (validPosition(position)) {
      this._position = position;
    } else {
      this._position = 'right';
    }

    console.log('clrPosition after', this._position);

    this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this._position);
  }

  get position(): string {
    return this._position;
  }

  // SIZE

  private _size: string;

  @Input('clrSize')
  set size(size: string) {
    this.renderer.removeClass(this.el.nativeElement, 'tooltip-' + this.size);

    if (size && SIZES.includes(size)) {
      this._size = size;
    } else {
      this._size = 'sm';
    }

    this.renderer.addClass(this.el.nativeElement, 'tooltip-' + this._size);
  }

  get size(): string {
    return this._size;
  }
}
