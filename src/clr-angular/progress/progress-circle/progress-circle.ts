/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input } from '@angular/core';

const sizeCube = 120;
const MAGICAL_NUMBER = 0.1;

@Component({
  selector: 'clr-progress-circle',
  template: `
  <div class="progressCircle">
    <svg class="progressCircleImage" [attr.viewBox]="viewBox">
      <circle class="__base" cx="60" cy="60" [attr.r]="R" />
      <circle class="__value" cx="60" cy="60" [attr.r]="R" 
        [attr.data-progress]="clrValue"
        [attr.stroke-dashoffset]="storkeDashoffset"
      />
    </svg>
    <label class="progressLabel" aria-live="polite">{{ clrValue }}% </label>
  </div>
  `,
  styleUrls: ['./_progress-circle.clarity.scss'],
})
export class ClrProgressCircle {
  private _clrValue: number = 0;
  @Input('clrValue')
  get clrValue() {
    return this._clrValue;
  }
  set clrValue(value: number) {
    this.storkeDashoffset = this.strokeDasharray * (1 - value / 100) - MAGICAL_NUMBER || this.strokeDasharray;
    this._clrValue = value;
  }

  viewBox = `0 0 ${sizeCube} ${sizeCube}`;

  // 54
  R = Math.round(sizeCube / 2 - 8 / 2);
  strokeDasharray = 2 * Math.PI * this.R;
  storkeDashoffset = this.strokeDasharray;

  ngOnInit() {
    this.storkeDashoffset = this.strokeDasharray * (1 - this.clrValue / 100) - MAGICAL_NUMBER || this.strokeDasharray;
  }
}
