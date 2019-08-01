/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { isBooleanAttributeSet } from '../../utils/component/is-boolean-attribute-set';

/**
 * How to get new numbers if needed
 *
 * Basic size is squre with size 72 (S).
 * Sw is the circle width in our case this is 5
 * R is the radios of the circle
 * R = ( S / 2 - Sw / 2)
 * cx & xy are half the circle size (S/2)
 *
 * stroke-dasharray = 2 * Math.PI * R
 *
 * To calculate the offset
 *
 * stroke-dashoffset = stroke-dasharray * ( 1 - (value / 100) ) - MAGIC_NUMBER;
 *
 * when value could be between 1 and 100
 */
const STROKE_DASHARRAY: number = 207.345;

/**
 * Magic number is making the circle a little less
 * so when it reach 100% it stay the correct color
 */
const MAGIC_NUMBER: number = 0.1;
/**
 * @NOTE: When making changes to this sizes please update them also
 * into _progress-circle.clarity.scss
 */

@Component({
  selector: 'clr-progress-circle',
  template: `
    <svg class="progress-circle-svg" viewBox="0 0 72 72">
      <circle class="__base" cx="36" cy="36" r="33" />
      <circle class="__value" cx="36" cy="36" r="33" 
        [attr.stroke-dashoffset]="strokeDashoffset"
      />
    </svg>
    <label class="progress-circle-label" aria-live="polite">{{ clrValue }}% </label>
  `,
})
export class ClrProgressCircle implements OnInit {
  private _clrValue: number = 0;
  @Input('clrValue')
  get clrValue() {
    return this._clrValue;
  }
  set clrValue(value: number) {
    this.strokeDashoffset = this.calculateOffset();
    this._clrValue = value;
  }

  // Basic class
  @HostBinding('class.progress-circle')
  get progressCircleClass() {
    return true;
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

  // 207.345
  private strokeDashoffset: number = STROKE_DASHARRAY;

  ngOnInit() {
    this.strokeDashoffset = this.calculateOffset();
  }

  calculateOffset() {
    return STROKE_DASHARRAY * (1 - this.clrValue / 100) - MAGIC_NUMBER || STROKE_DASHARRAY;
  }
}
