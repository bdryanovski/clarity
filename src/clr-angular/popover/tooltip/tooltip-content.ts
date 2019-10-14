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
import { IfOpenService } from '../../utils/conditional/if-open.service';

import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { TooltipSyncService } from './providers/tooltip-sync.service';

import { Subscription } from 'rxjs';

import { validPosition } from '../../utils/popover/position-operators';

const SIZES: string[] = ['xs', 'sm', 'md', 'lg'];

// TODO remove this just keep it until all positions are validated
const POSITIONS: string[] = ['left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];

const MAP_POSITION_TO_CLASS = {
  'top-left': 'left',
  'left-top': 'left',
  'top-right': 'right',
  'right-top': 'right',
};

function calculatePositionClass(position: string): string {
  if (Object.keys(MAP_POSITION_TO_CLASS).includes(position)) {
    return MAP_POSITION_TO_CLASS[position];
  }
  return position;
}

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
  private lastClass: string = '';

  constructor(
    injector: Injector,
    parentHost: ElementRef,
    @Inject(UNIQUE_ID) public popoverId: string,
    private smartToggleService: ClrPopoverToggleService,
    @Optional() private ifOpen: IfOpenService,
    private tooltipSync: TooltipSyncService,
    private cdr: ChangeDetectorRef
  ) {
    super(injector, parentHost);

    if (!parentHost) {
      throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
    }

    this.tooltipSync.updateId(popoverId);

    /* No need to to subscribe to ID changes - they origin from this component */
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
  // ID

  private _id;
  @Input()
  set id(value: string) {
    value ? this.tooltipSync.updateId(value) : this.tooltipSync.updateId('');
  }

  get id(): string {
    return this._id;
  }

  // POSITION

  updatePosition(position: string) {
    if (position !== this._position) {
      this.position = position;
      this.cdr.detectChanges();
    }
  }

  private _position: string;
  @Input('clrPosition')
  set position(position: string) {
    // Don't try to remove class without a name - it won't work
    if (this.lastClass !== '') {
      this.renderer.removeClass(this.el.nativeElement, this.lastClass);
    }

    if (this.validPosition(position)) {
      this._position = position;
    } else {
      this._position = 'right';
    }

    this.lastClass = 'tooltip-' + calculatePositionClass(this._position);

    this.renderer.addClass(this.el.nativeElement, this.lastClass);
  }

  get position() {
    return this._position;
  }

  validPosition(position: string): boolean {
    return validPosition(position) || ['left', 'right'].includes(position);
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
