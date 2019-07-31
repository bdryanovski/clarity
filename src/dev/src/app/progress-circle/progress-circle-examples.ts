/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-progress-circle-examples-demo',
  templateUrl: './progress-circle-examples.html',
  styleUrls: ['./progress-circle-dev.scss'],
})
export class ProgressCircleExamplesDemo {
  updateValue: number;
  intervalHolder;

  constructor() {
    this.updateValue = 0;

    this.intervalHolder = setInterval(() => {
      this.updateValue = this.updateValue + 1;
      if (this.updateValue > 100) {
        this.updateValue = 0;
      }
    }, 80);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHolder);
  }
}
