/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';

const MEDIUM = 36;
const SMALL = 24;
const MINI = 18;

@Component({
  selector: 'clr-circle-progress',
  template: `
    <clr-wc-circular-progress [size]="size" [progress]="clrProgress">
      <ng-content select=".clr-circle-progress-status"></ng-content>
      <ng-content select=".clr-circle-progress-label"></ng-content>
    </clr-wc-circular-progress>

  `,
  host: {
    '[attr.aria-live]': 'setAriaLive',
    '[attr.aria-busy]': 'true',
  },
})
export class ClrCircleProgress {
  @HostBinding('class.clr-circle-progress')
  get rootClass() {
    return true;
  }

  get size() {
    if (this._small === true) {
      return SMALL;
    }
    if (this._mini === true) {
      return MINI;
    }
    return MEDIUM;
  }

  /**
   * Medium
   */
  private _medium: boolean;
  get mediumClass() {
    /** Default size will be medium */
    if (this._small !== true && this._mini !== true) {
      return true;
    }
    return this._medium;
  }

  @Input('clrMedium')
  set clrMedium(value: boolean | string) {
    this._medium = isBooleanAttributeSet(value);
  }

  /**
   * Small
   */
  private _small: boolean;
  @HostBinding('class.clr-circle-progress-sm-size')
  get smallClass() {
    return this._small;
  }

  @Input('clrSmall')
  set clrSmall(value: boolean | string) {
    this._small = isBooleanAttributeSet(value);
  }

  /**
   * Mini
   */
  private _mini: boolean;
  @HostBinding('class.clr-circle-progress-mini-size')
  get miniClass() {
    return this._mini;
  }

  @Input('clrMini')
  set clrMini(value: boolean | string) {
    this._mini = isBooleanAttributeSet(value);
  }

  @Input() clrProgress: Number = 0;

  // Aria Live

  /**
   * By default aria-live will be set to `polite` .
   * To change is it you need to set clrAssertive or clrOff to TRUE
   *
   * There is priority:
   *   Default: polite
   *   Asertive
   *   Off
   *
   * In case when for some reason you have clrAssertive=TRUE and clrOff=TRUE,
   * we gonna set `assertive` as value of aria-live.
   *
   */
  @Input('clrAssertive') assertive: boolean;
  @Input('clrOff') off: boolean;

  get setAriaLive() {
    if (isBooleanAttributeSet(this.assertive)) {
      return 'assertive';
    }
    if (isBooleanAttributeSet(this.off)) {
      return 'off';
    }
    return 'polite';
  }
}
