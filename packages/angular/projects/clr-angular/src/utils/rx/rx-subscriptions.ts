/*
 * Copyright (c) 2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Handle Rx Subscriptions and Unsubscriptions for better
 *
 * @example
 *
 * private subscriptions = new RxSubscription()
 *
 * subscriptions.subscribe = (new Subscriptions...)
 *
 * ngDestroy() { this.subscriptions.unsubscribe() }
 */
@Injectable()
export class RxSubscription {
  _subscriptions: Subscription[] = [];

  set subscribe(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  get subscriptions(): Subscription[] {
    return this._subscriptions;
  }

  unsubscribe() {
    this._subscriptions.forEach(function (subscribtion: Subscription) {
      if (subscribtion && typeof subscribtion.unsubscribe) {
        subscribtion.unsubscribe();
      }
    });
  }
}
