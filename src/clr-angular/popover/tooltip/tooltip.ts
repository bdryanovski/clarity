/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, ContentChild, ViewChild } from '@angular/core';
import { UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';

// @TODO maybe won't need it
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';

// Smart popover
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrPopoverAdapter } from '../../utils/popover/adapter/popover-adapter';
import { ClrTooltipContent } from './tooltip-content';
import { ClrTooltipTrigger } from './tooltip-trigger';

const DEFAULT_POSITION = 'bottom-right';

@Component({
  selector: 'clr-tooltip',
  template: `
    <clr-popover-adapter
      [clrPosition]="position"
      [clrOpenState]="openState"
      (clrSmartPositionReady)="updatedPosition($event)"
      >
        <ng-container clrAnchorPoint>
            <ng-content select="[clrTooltipTrigger]"></ng-content>
        </ng-container>
        <div class="tooltip">
          <ng-content select="clr-tooltip-content"></ng-content>
        </div>
    </clr-popover-adapter>
  `,
  providers: [
    // Smart Popover
    ClrPopoverToggleService,
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    UNIQUE_ID_PROVIDER,
    // @TODO remove lines below later
    IfOpenService,
    { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
  ],
})
export class ClrTooltip {
  public position: string = DEFAULT_POSITION;
  private openState: boolean = false;

  constructor(private smartToggleService: ClrPopoverToggleService) {
    this.smartToggleService.openChange.subscribe(change => {
      this.openState = change;
    });
  }

  @ViewChild(ClrPopoverAdapter, { static: false })
  popoverAdapter: ClrPopoverAdapter;

  @ContentChild(ClrTooltipTrigger, { static: false })
  tooltipTrigger: ClrTooltipTrigger;
  ngAfterViewInit() {
    if (![undefined, ''].includes(this.content.id)) {
      this.tooltipTrigger.ariaDescribedBy = this.content.id;
    }
  }

  private _content: ClrTooltipContent;
  @ContentChild(ClrTooltipContent, { static: false })
  set content(content: ClrTooltipContent) {
    if (!content) {
      return;
    }
    this._content = content;
    this.position = this._content.position;
  }
  get content() {
    return this._content;
  }

  updatedPosition(position: string) {
    if (this.content) {
      this.content.finalizePosition(position);
    }
  }
}
