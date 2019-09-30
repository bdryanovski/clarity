/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, Inject, Injector, Input, Optional } from '@angular/core';
import { AbstractPopover } from '../common/abstract-popover';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';
import { UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';

import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverPosition } from '../../utils/popover/interfaces/popover-position.interface';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { Subscription } from 'rxjs';

const POSITIONS: string[] = ['bottom-left', 'bottom-right', 'top-left', 'top-right', 'right', 'left'];

const SIZES: string[] = ['xs', 'sm', 'md', 'lg'];

let clrTooltipIds = 0;

// @TODO rework this later on
const SIMPLE_TO_SMART_POSITIONS: { [input: string]: ClrPopoverPosition } = {
  'top-left': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  },
  'top-right': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.START,
  },
  right: {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
  'bottom-right': {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.START,
  },
  'bottom-left': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  },
  left: {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
  default: {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.START,
  },
};

@Component({
  selector: 'clr-tooltip-content',
  template: `
    <div class="tooltip tooltip-extend"
      [id]="popoverId"
      [attr.aria-hidden]="!open"
      [attr.id]="popoverId"
      *clrPopoverContent="open at smartPosition; outsideClickToClose: true; scrollToClose: true">
      <div class="tooltip-content tooltip-content-extend" [ngClass]="[positionClass, sizeClass]">
        <ng-content></ng-content>
      </div>
    </div>
    `,
  styles: [
    '.tooltip-extend { position: absolute !important }',
    '.tooltip-content-extend { visibility: visible; opacity: 1 }',
  ],
  host: {
    // @TODO remove commented code
    //'[class.tooltip-content]': 'true',
    //'[style.opacity]': '1',
    '[attr.role]': '"tooltip"',
    '[id]': 'popoverId',
  },
})
export class ClrTooltipContent extends AbstractPopover {
  private subscriptions: Subscription[] = [];

  public smartPosition: ClrPopoverPosition = {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  };

  constructor(
    injector: Injector,
    @Optional()
    @Inject(POPOVER_HOST_ANCHOR)
    parentHost: ElementRef,
    @Inject(UNIQUE_ID) public uniqueId: string,
    // @TODO do I need this service ?
    private tooltipIdService: TooltipIdService,
    // Smart PopOver
    private smartToggleService: ClrPopoverToggleService,
    @Inject(UNIQUE_ID) public popoverId: string
  ) {
    super(injector, parentHost);

    if (!parentHost) {
      throw new Error('clr-tooltip-content should only be used inside of a clr-tooltip');
    }

    this.subscriptions.push(
      this.smartToggleService.openChange.subscribe(openState => {
        this.open = openState;
      })
    );

    this.popoverId = 'clr-tooltip-' + clrTooltipIds++;

    // Defaults
    this.position = 'right';
    this.size = 'sm';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public get open() {
    return this.smartToggleService.open;
  }

  public set open(open: boolean) {
    if (!!open !== this.smartToggleService.open) {
      this.smartToggleService.open = !!open;
    }
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

  private _position: string;
  @Input('clrPosition')
  set position(position: string) {
    // Ugh
    if (position && POSITIONS.indexOf(position) > -1) {
      this._position = position;
    } else {
      this._position = 'right';
    }

    this.smartPosition = SIMPLE_TO_SMART_POSITIONS[position];

    if (this.smartPosition === undefined) {
      throw new Error('clr-tooltip-content got unknown clrPosition');
    }

    this._position = position;
  }

  get position() {
    return this._position;
  }

  get positionClass() {
    return 'tooltip-' + this.position;
  }

  private _size: string;

  get size() {
    return this._size;
  }

  @Input('clrSize')
  set size(size: string) {
    if (size && SIZES.includes(size)) {
      this._size = size;
    } else {
      this._size = 'sm';
    }
  }

  get sizeClass() {
    return 'tooltip-' + this.size;
  }
}
