/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TooltipSyncService {
  private _id: Subject<string> = new Subject<string>();
  private _position: Subject<string> = new Subject<string>();

  // ID
  updateId(value: string) {
    this._id.next(value);
  }
  get id(): Observable<string> {
    return this._id.asObservable();
  }

  // POSITION
  updatePosition(value: string) {
    this._position.next(value);
  }

  get position(): Observable<string> {
    return this._position.asObservable();
  }
}
