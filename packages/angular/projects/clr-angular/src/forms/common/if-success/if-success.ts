/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgControlService } from '../providers/ng-control.service';
import { IfSuccessService } from './if-success.service';
import { Subscription } from 'rxjs';

@Directive({ selector: '[clrIfSuccess]' })
export class ClrIfSuccess {
  private subscriptions: Subscription[] = [];
  private displayed = false;
  private control: NgControl;

  @Input('clrIfSuccess') success: string;

  constructor(
    @Optional() private ifSuccessService: IfSuccessService,
    @Optional() private ngControlService: NgControlService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    if (!this.ifSuccessService) {
      throw new Error('clrIfSuccess can only be used within a form control container element like clr-input-container');
    }

    this.subscriptions.push(
      this.ngControlService.controlChanges.subscribe(control => {
        this.control = control;
      })
    );

    this.subscriptions.push(
      this.ifSuccessService.statusChanges.subscribe(state => {
        this.displaySuccess(state);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private displaySuccess(valid: boolean) {
    if (valid && !this.displayed) {
      this.container.createEmbeddedView(this.template);
      this.displayed = true;
    } else if (!valid) {
      this.container.clear();
      this.displayed = false;
    }
  }
}
