/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, ngOnInit, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';

const sizeCube = 72;
/**
 * Magic number is making the circle a little less
 * so when it reach 100% it stay the correct color
 */
const MAGIC_NUMBER = 0.1;

@Component({
  selector: 'clr-progress-circle',
  template: `
    <svg class="progress-circle-svg" [attr.viewBox]="viewBox">
      <circle class="__base" [attr.cx]="cXY" [attr.cy]="cXY" [attr.r]="R" />
      <circle class="__value" [attr.cx]="cXY" [attr.cy]="cXY" [attr.r]="R" 
        [attr.stroke-dashoffset]="strokeDashoffset"
      />
    </svg>
    <label class="progress-circle-label" aria-live="polite">{{ clrValue }}% </label>
  `,
})
export class ClrProgressCircle implements ngOnInit {
  @HostBinding('class.progress-circle')
  get progressCircleClass() {
    return true;
  }

  private _clrValue: number = 0;
  @Input('clrValue')
  get clrValue(): string {
    return this._clrValue;
  }
  set clrValue(value: number): void {
    this.strokeDashoffset = this.calculateOffset();
    this._clrValue = value;
  }

  // Medium size
  private _medium: boolean;
  @HostBinding('class.progress-circle-md')
  get mediumClass() {
    return this._medium;
  }

  @Input('clrMedium')
  set clrMedium(value: boolean | string) {
    this._medium = isBooleanAttributeSet(value);
  }

  // Small size
  private _small: boolean;
  @HostBinding('class.progress-circle-sm')
  get smallClass() {
    return this._small;
  }

  @Input('clrSmall')
  set clrSmall(value: boolean | string) {
    this._small = isBooleanAttributeSet(value);
  }

  private viewBox: string = `0 0 ${sizeCube} ${sizeCube}`;

  // 33

  // Math time
  private R: number = Math.floor(sizeCube / 2 - 5 / 2);
  private cXY: number = sizeCube / 2;
  private strokeDasharray: number = 2 * Math.PI * this.R;
  private strokeDashoffset: number = this.strokeDasharray;

  ngOnInit() {
    this.strokeDashoffset = this.calculateOffset();
  }

  calculateOffset() {
    return this.strokeDasharray * (1 - this.clrValue / 100) - MAGIC_NUMBER || this.strokeDasharray;
  }
}
