/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable, Optional, Renderer2 } from '@angular/core';
import { LayoutService } from './layout.service';

const CLASS_ERROR = 'clr-error';
const CLASS_SUCCESS = 'clr-success';

export type ClrControlClassOptions = {
  invalid?: boolean;
  valid?: boolean;
  grid?: boolean;
  additional?: string;
};

@Injectable()
export class ControlClassService {
  className = '';

  constructor(@Optional() private layoutService: LayoutService) {}

  controlClass(options: ClrControlClassOptions = { invalid: false, valid: false, grid: false, additional: '' }) {
    const controlClasses = [this.className, options.additional];
    if (options.invalid && !options.valid) {
      controlClasses.push(CLASS_ERROR);
    }
    if (options.valid && !options.invalid) {
      controlClasses.push(CLASS_SUCCESS);
    }

    if (options.grid && this.layoutService && this.className.indexOf('clr-col') === -1) {
      controlClasses.push(`clr-col-md-${this.layoutService.maxLabelSize - this.layoutService.labelSize} clr-col-12`);
    }
    return controlClasses.join(' ').trim();
  }

  // We want to remove the column classes from the input up to the container
  initControlClass(renderer: Renderer2, element: HTMLElement) {
    if (element && element.className) {
      this.className = element.className;
      const klasses = element.className.split(' ');
      klasses.forEach(klass => {
        if (klass.startsWith('clr-col')) {
          renderer.removeClass(element, klass);
        }
      });
    }
  }
}
