/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Output, ElementRef, ContentChild, ViewChild, Optional, EventEmitter } from '@angular/core';
import { UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';

// @TODO maybe won't need it
import { TooltipIdService } from './providers/tooltip-id.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';

// Smart popover
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';
import { ClrPopoverAdapter } from '../../utils/popover/adapter/popover-adapter';
import { ClrTooltipContent } from './tooltip-content';

@Component({
  selector: 'clr-tooltip',
  template: `
    <clr-popover-adapter
      [clrPosition]="position"
      [clrOpenOnHover]="openOnHover"
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
    // TODO: consider centralizing the unique id string on a service that provides ariaAttributes that need it
    // AriaService in layout/tabs/providers might be a good starting point.
    TooltipIdService,
  ],
})
export class ClrTooltip {
  private openOnHover: boolean = true;
  constructor() {}

  @ViewChild(ClrPopoverAdapter, { static: false })
  private popoverAdapter: ClrPopoverAdapter;

  private _content: ClrTooltipContent;
  @ContentChild(ClrTooltipContent, { static: false })
  set content(content: ClrTooltipContent) {
    if (!content) {
      return;
    }
    this._content = content;
    this.position = content.position;
  }

  public position: string = 'bottom-left';
  updatedPosition(position: string) {
    if (this._content) {
      console.log('Position updated ', position, this._content.popoverId);

      this._content.finalizePosition(position);
    }
  }
}
