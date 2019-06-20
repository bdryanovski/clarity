/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

const EXAMPLE = `
<span clrSpinner>
    Loading data...
</span>
`;

const EXAMPLE1 = `
<span  class="spinner-inline" clrSpinner>Downloading ...</span>
<span>
    Downloading ...
</span>
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
