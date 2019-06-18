/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

const EXAMPLE = `
<div clrSpinner>
    Loading data...
</div>
`;

const EXAMPLE1 = `
<div  class="spinner-inline" clrSpinner>Downloading ...</div>
<div>
    Downloading ...
</div>
`;

@Component({
  selector: 'clr-spinner-component',
  templateUrl: './spinner-component.html',
  styleUrls: ['./spinner.demo.scss'],
})
export class SpinnerComponentDemo {
  example = EXAMPLE;
  example1 = EXAMPLE1;
}
