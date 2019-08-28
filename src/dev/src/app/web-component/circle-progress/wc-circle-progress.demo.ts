/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

const PROGRESS_INTERVAL = 100;
const PROGRESS_STEP = 1;

@Component({
  templateUrl: './wc-circle-progress.demo.html',
  styleUrls: ['./wc-circle-progress.demo.scss'],
})
export class WcCircleProgressDemo {
  pctComplete = 10;
  private progressInterval;

  constructor() {
    this.progressInterval = setInterval(() => {
      this.pctComplete = this.pctComplete + PROGRESS_STEP;
      if (this.pctComplete >= 100) {
        this.pctComplete = 0;
      }
    }, PROGRESS_INTERVAL);
  }
}
