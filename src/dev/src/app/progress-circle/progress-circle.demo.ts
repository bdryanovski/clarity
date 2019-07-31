/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-progress-circle-demo',
  template: `
        <h2>Progress Circle</h2>
        <ul>
            <li><a [routerLink]="['./progress-circle-examples']">Progress Circle Examples</a></li>
        </ul>
        <router-outlet></router-outlet>
    `,
})
export class ProgressCircleDemo {}
