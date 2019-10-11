/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, ContentChild } from '@angular/core';
import { UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';

// @TODO maybe won't need it
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';

// Smart popover
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrTooltipContent } from './tooltip-content';

import { TooltipSyncService } from './providers/tooltip-sync.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clr-tooltip',
  template: `
    <clr-popover-adapter
      [clrPosition]="position"
      [clrOpenState]="openState"
      [clrDefaultPosition]="'right-top'"
      (clrSmartPositionReady)="requestToUpdatePosition($event)"
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
    ClrPopoverToggleService,
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    TooltipSyncService,
    UNIQUE_ID_PROVIDER,
    IfOpenService,
    { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
  ],
})
export class ClrTooltip {
  public position: string;
  private openState: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private smartToggleService: ClrPopoverToggleService, private tooltipSync: TooltipSyncService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.smartToggleService.openChange.subscribe(change => {
        this.openState = change;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _content: ClrTooltipContent;
  @ContentChild(ClrTooltipContent, { static: false })
  set tooltipContent(content: ClrTooltipContent) {
    if (!content) {
      return;
    }
    this._content = content;
    this.position = this._content.position;
  }

  get tooltipContent() {
    return this._content;
  }

  requestToUpdatePosition(position: string) {
    if (position !== null && position !== undefined) {
      this.tooltipContent.updatePosition(position);
    }
  }
}
