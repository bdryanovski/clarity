/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { NgControlService } from '../providers/ng-control.service';

export enum CONTROL_STATE {
  UNTOUCHED = 'UNTOUCHED',
  TOUCHED = 'TOUCHED',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Injectable()
export class IfControlStateService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private control: NgControl;

  // Implement our own status changes observable, since Angular controls don't
  private _statusChanges: Subject<CONTROL_STATE> = new Subject();
  get statusChanges(): Observable<CONTROL_STATE> {
    return this._statusChanges.asObservable();
  }

  constructor(private ngControlService: NgControlService) {
    // Wait for the control to be available
    this.subscriptions.push(
      this.ngControlService.controlChanges.subscribe(control => {
        if (control) {
          this.control = control;
          // Subscribe to the status change events, only after touched
          // and emit the control
          this.subscriptions.push(
            this.control.statusChanges.subscribe(() => {
              this.sendValidity();
            })
          );
        }
      })
    );
  }

  private sendValidity() {
    let state = CONTROL_STATE.UNTOUCHED;
    if (this.control.touched) {
      state = CONTROL_STATE.TOUCHED;
      // These status values are mutually exclusive, so a control
      // cannot be both valid AND invalid or invalid AND disabled.
      switch (this.control.status) {
        case 'VALID':
          state = CONTROL_STATE.VALID;
          break;
        case 'INVALID':
          state = CONTROL_STATE.INVALID;
          break;
      }
    }
    this._statusChanges.next(state);
  }

  // Allows a control to push a status check upstream, such as on blur
  triggerStatusChange() {
    if (this.control) {
      this.sendValidity();
    }
  }

  // Clean up subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
