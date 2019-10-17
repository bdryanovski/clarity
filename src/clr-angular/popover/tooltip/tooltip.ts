/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, Input, Output, ContentChild, EventEmitter } from '@angular/core';
import { UNIQUE_ID_PROVIDER, UNIQUE_ID } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverPosition } from '../../utils/popover/interfaces/popover-position.interface';
import { findPositionObject } from './tooltip-operators';

import { Subscription } from 'rxjs';
import { ClrTooltipContent } from './tooltip-content';

const DEFAULT_POSITION = 'top-right';

@Component({
  selector: 'clr-tooltip',
  template: `
    <div
      style="display:inline-block"
      clrPopoverAnchor
      clrPopoverOpenCloseButton>
        <ng-content select="[clrTooltipTrigger]"></ng-content>
    </div>
    <div
      [id]="id"
      *clrPopoverContent="openState at smartPosition; outsideClickToClose: true; scrollToClose: true;"
      >
        <div class="tooltip">
          <ng-content select="clr-tooltip-content"></ng-content>
        </div>
    </div>
    `,
  providers: [
    UNIQUE_ID_PROVIDER,
    TooltipIdService,
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    ClrPopoverToggleService,
  ],
})
export class ClrTooltip {
  private subscriptions: Subscription[] = [];
  private smartPosition: ClrPopoverPosition = findPositionObject(DEFAULT_POSITION);

  constructor(
    @Inject(UNIQUE_ID) id: string,
    private positionService: ClrPopoverPositionService,
    private toggleService: ClrPopoverToggleService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.positionService.smartPosition.subscribe(position => {
        if (position !== null) {
          this.smartPosition = position;
          /**
           * @TODO send the string position to the ClrTooltipPosition so the classes
           * could be updated when the position is changed
           * this.tooltipContentn.position = findPositionString(position)  // must return 'top-left' or something
           */
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  @Output() clrOpenChanged = new EventEmitter();
  @Input('clrTooltipOpen')
  set openState(state: boolean) {
    this.toggleService.open = state;
    this.clrOpenChanged.emit(state);
  }

  /**
   * Read the position from clrTooltipContent and get the smartPosition object
   */
  private _tooltipContent: ClrTooltipContent;
  @ContentChild(ClrTooltipContent, { static: false })
  set tooltipContent(content: ClrTooltipContent) {
    if (!content) {
      return;
    }
    this._tooltipContent = content;
    this.smartPosition = findPositionObject(this._tooltipContent.position);
  }

  get tooltipContent() {
    return this._tooltipContent;
  }
}
