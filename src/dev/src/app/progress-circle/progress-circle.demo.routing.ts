/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgressCircleDemo } from './progress-circle.demo';
import { ProgressCircleExamplesDemo } from './progress-circle-examples';

const ROUTES: Routes = [
  {
    path: '',
    component: ProgressCircleDemo,
    children: [
      { path: '', redirectTo: 'progress-circle-examples', pathMatch: 'full' },
      { path: 'progress-circle-examples', component: ProgressCircleExamplesDemo },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
