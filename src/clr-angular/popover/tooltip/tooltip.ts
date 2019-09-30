/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Inject, Component, ElementRef } from '@angular/core';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';

// @TODO maybe won't need it
import { TooltipIdService } from './providers/tooltip-id.service';
import { IfOpenService } from '../../utils/conditional/if-open.service';
import { POPOVER_HOST_ANCHOR } from '../common/popover-host-anchor.token';

// Smart popover
import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';

@Component({
  selector: 'clr-tooltip',
  // @TODO can I remove the div ?
  template: `
      <div clrPopoverAnchor clrPopoverOpenCloseButton>
        <ng-content></ng-content>
      </div>
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
export class ClrTooltip {}
