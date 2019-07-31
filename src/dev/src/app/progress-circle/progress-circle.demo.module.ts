/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClarityModule } from '@clr/angular';

import { ProgressCircleDemo } from './progress-circle.demo';
import { ProgressCircleExamplesDemo } from './progress-circle-examples';

import { ROUTING } from './progress-circle.demo.routing';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING],
  declarations: [ProgressCircleDemo, ProgressCircleExamplesDemo],
  exports: [ProgressCircleDemo, ProgressCircleExamplesDemo],
})
export class ProgressCircleDemoModule {}
