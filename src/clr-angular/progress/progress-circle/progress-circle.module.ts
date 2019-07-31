/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ClrProgressCircle } from './progress-circle';

export const CLR_PROGRESS_CIRCLE_DIRECTIVES: Type<any>[] = [ClrProgressCircle];

@NgModule({
  imports: [CommonModule],
  declarations: [CLR_PROGRESS_CIRCLE_DIRECTIVES],
  exports: [CLR_PROGRESS_CIRCLE_DIRECTIVES],
})
export class ClrProgressCircleModule {}
