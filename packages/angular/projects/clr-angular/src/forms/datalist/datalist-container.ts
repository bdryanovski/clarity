/**
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Optional, ContentChild } from '@angular/core';
import { ControlClassService } from '../common/providers/control-class.service';
import { LayoutService } from '../common/providers/layout.service';
import { ControlIdService } from '../common/providers/control-id.service';
import { FocusService } from '../common/providers/focus.service';
import { IfErrorService } from '../common/if-error/if-error.service';
import { NgControlService } from '../common/providers/ng-control.service';
import { DatalistIdService } from './providers/datalist-id.service';
import { ClrAbstractContainer } from '../common/abstract-container';
import { IfSuccessService } from '../common/if-success/if-success.service';
import { ClrControlSuccess } from '../common/success';

@Component({
  selector: 'clr-datalist-container',
  template: `
    <ng-content select="label"></ng-content>
    <label *ngIf="!label && addGrid()"></label>
    <div class="clr-control-container" [ngClass]="controlClass()">
      <div class="clr-input-wrapper">
        <div class="clr-input-group" [class.clr-focus]="focus">
          <ng-content select="[clrDatalistInput]"></ng-content>
          <ng-content select="datalist"></ng-content>
        </div>
        <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle" aria-hidden="true"></clr-icon>
        <clr-icon
          *ngIf="valid && controllSuccessComponent"
          class="clr-validate-icon"
          shape="check-circle"
          aria-hidden="true"
        ></clr-icon>
      </div>
      <ng-content select="clr-control-helper" *ngIf="!invalid && !valid"></ng-content>
      <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
      <ng-content select="clr-control-success" *ngIf="valid"></ng-content>
    </div>
  `,
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-form-control-disabled]': 'control?.disabled',
    '[class.clr-row]': 'addGrid()',
  },
  providers: [
    ControlClassService,
    LayoutService,
    ControlIdService,
    FocusService,
    IfErrorService,
    NgControlService,
    DatalistIdService,
    IfSuccessService,
  ],
})
export class ClrDatalistContainer extends ClrAbstractContainer {
  focus = false;

  @ContentChild(ClrControlSuccess) controllSuccessComponent: ClrControlSuccess;

  constructor(
    ifSuccessService: IfSuccessService,
    controlClassService: ControlClassService,
    @Optional() layoutService: LayoutService,
    ifErrorService: IfErrorService,
    ngControlService: NgControlService,
    private focusService: FocusService
  ) {
    super(ifErrorService, ifSuccessService, layoutService, controlClassService, ngControlService);

    this.subscriptions.push(this.focusService.focusChange.subscribe(state => (this.focus = state)));
  }
}
