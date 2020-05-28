/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { NgControlService } from '../providers/ng-control.service';
import { NgControl } from '@angular/forms';
import { IfControlStateService, CONTROL_STATE } from './if-control-state.service';

@Directive({ selector: '[clrIfError]' })
export class ClrIfError {
  private subscriptions: Subscription[] = [];
  private displayed = false;
  private control: NgControl;

  @Input('clrIfError') error: string;

  constructor(
    @Optional() private ifControlStateService: IfControlStateService,
    @Optional() private ngControlService: NgControlService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    if (!this.ifControlStateService) {
      throw new Error('clrIfError can only be used within a form control container element like clr-input-container');
    }

    this.subscriptions.push(
      this.ngControlService.controlChanges.subscribe(control => {
        this.control = control;
      })
    );
    this.subscriptions.push(
      this.ifControlStateService.statusChanges.subscribe((state: CONTROL_STATE) => {
        this.displayError(state);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * @param state CONTROL_STATE or boolean
   */
  private displayError(state: CONTROL_STATE) {
    const INVALID = CONTROL_STATE.INVALID === state;

    if (INVALID && this.displayed === false) {
      let options = {};
      if (this.error && this.control && this.control.hasError(this.error)) {
        options = { error: this.control.getError(this.error) };
      }
      this.container.createEmbeddedView(this.template, options);
    } else if (!INVALID) {
      this.container.clear();
    }
    this.displayed = INVALID;
  }
}
