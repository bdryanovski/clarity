/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClrCircleProgress } from './circle-progress';

import '@clr/base/components/clr-wc-circular-progress';

export const CLR_CIRCLE_PROGRESS_DIRECTIVES: Type<any>[] = [ClrCircleProgress];

@NgModule({
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CLR_CIRCLE_PROGRESS_DIRECTIVES],
  exports: [CLR_CIRCLE_PROGRESS_DIRECTIVES],
})
export class ClrCircleProgressModule {}
