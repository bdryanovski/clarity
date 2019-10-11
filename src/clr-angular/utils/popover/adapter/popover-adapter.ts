/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, Optional, OnInit, OnDestroy, Output, Inject, HostBinding } from '@angular/core';
import { ClrPopoverEventsService } from '../providers/popover-events.service';
import { ClrPopoverPositionService } from '../providers/popover-position.service';
import { ClrPopoverToggleService } from '../providers/popover-toggle.service';
import { ClrPopoverPosition } from '../interfaces/popover-position.interface';
import { IfOpenService } from '../../conditional/if-open.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UNIQUE_ID, UNIQUE_ID_PROVIDER } from '../../id-generator/id-generator.service';
import { findPositionString, findPositionObject, validPosition } from '../position-operators';
/**
 * The popover adapter should be used as a translation between the smart popovers advanced component
 * and the old-style popovers. It can be used as API backward compatibility tool, of for simplified
 * deployments where the smart popovers advanced features and flexibility is not needed.
 *
 * Note: It does not cover all possible positioning capabilities offered by smart popovers.
 */

@Component({
  selector: 'clr-popover-adapter',
  template: `
      <div
        style="display:inline-block"
        clrPopoverAnchor
        clrPopoverOpenCloseButton>
          <ng-content select="[clrAnchorPoint]"></ng-content>
      </div>
      <div
        [id]="popoverId"
        *clrPopoverContent="openState at smartPosition; outsideClickToClose: _outsideClickToClose; scrollToClose: _scrollToClose;">
          <ng-content></ng-content>
      </div>
  `,
  providers: [UNIQUE_ID_PROVIDER, ClrPopoverEventsService, ClrPopoverPositionService, ClrPopoverToggleService],
})
export class ClrPopoverAdapter implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  popoverId: string;

  private _outsideClickToClose: boolean = true;
  private _scrollToClose: boolean = true;

  constructor(
    @Inject(UNIQUE_ID) id: string,
    private toggleService: ClrPopoverToggleService,
    @Optional() private ifOpen: IfOpenService,
    public positionService: ClrPopoverPositionService
  ) {
    this.popoverId = `clr-popover-${id}`;
  }

  ngOnInit() {
    // Sync with optional externally defined *ifOpen
    if (this.ifOpen) {
      this.subs.push(
        this.toggleService.openChange.subscribe(change => {
          this.ifOpen.open = change;
        })
      );
    }
    // Listen for new position and propagate to outside component with the help
    // of clrSmartPositionReady
    this.subs.push(
      this.positionService.smartPosition.subscribe(finalPosition => {
        this._smartPositionReady.next(findPositionString(finalPosition));
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  @Input('clrOutsideClickToClose')
  set clrOutsideClickToClose(state: boolean) {
    this._outsideClickToClose = !!state;
  }

  @Input('clrScrollToClose')
  set clrScrollToClose(state: boolean) {
    this._scrollToClose = !!state;
  }

  @Input('clrDefaultPosition') defaultPosition: string = 'right-middle';

  // The initially requested position.
  private _position: string;
  @Input('clrPosition')
  set position(position: string) {
    if (validPosition(position)) {
      this._position = position;
      return;
    }

    this._position = this.defaultPosition;
  }

  get position() {
    return this._position;
  }

  @Input('clrOpenState')
  set openState(state: boolean) {
    this.toggleService.open = state;
  }

  @HostBinding('class.clr-open')
  get openState(): boolean {
    return this.toggleService.open;
  }

  public get smartPosition(): ClrPopoverPosition {
    return findPositionObject(this.position);
  }

  private _smartPositionReady: BehaviorSubject<string> = new BehaviorSubject(null);
  @Output('clrSmartPositionReady') smartPositionReady: Observable<string> = this._smartPositionReady.asObservable();
}
