/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';

const sizeCube = 72;
/**
 * Magic number is making the circle a little less
 * so when it reach 100% it stay the correct color
 */
const MAGIC_NUMBER = 0.1;

@Component({
  selector: 'clr-progress-circle',
  template: `
  <div class="progressCircle">
    <svg class="progressCircleImage" [attr.viewBox]="viewBox">
      <circle class="__base" [attr.cx]="cXY" [attr.cy]="cXY" [attr.r]="R" />
      <circle class="__value" [attr.cx]="cXY" [attr.cy]="cXY" [attr.r]="R" 
        [attr.stroke-dashoffset]="strokeDashoffset"
      />
    </svg>
    <label class="progressLabel" aria-live="polite">{{ clrValue }}% </label>
  </div>
  `,
})
export class ClrProgressCircle {
  private _clrValue: number = 0;
  @Input('clrValue')
  get clrValue() {
    return this._clrValue;
  }
  set clrValue(value: number) {
    this.strokeDashoffset = this.strokeDasharray * (1 - value / 100) - MAGIC_NUMBER || this.strokeDasharray;
    this._clrValue = value;
  }

  viewBox = `0 0 ${sizeCube} ${sizeCube}`;

  // 33
  R = Math.floor(sizeCube / 2 - 5 / 2);
  cXY = sizeCube / 2;
  strokeDasharray = 2 * Math.PI * this.R;
  strokeDashoffset = this.strokeDasharray;

  ngOnInit() {
    this.strokeDashoffset = this.strokeDasharray * (1 - this.clrValue / 100) - MAGIC_NUMBER || this.strokeDasharray;
  }
}
