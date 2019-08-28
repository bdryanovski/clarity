/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { ROUTING } from './wc-circle-progress.demo.routing';
import { WcCircleProgressDemo } from './wc-circle-progress.demo';

import '@clr/base/components/clr-wc-circular-progress';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [WcCircleProgressDemo],
  exports: [WcCircleProgressDemo],
})
export class WcCircleProgressDemoModule {}
